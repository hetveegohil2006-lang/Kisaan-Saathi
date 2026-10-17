const crypto = require("node:crypto");
const nodemailer = require("nodemailer");
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const { defineSecret } = require("firebase-functions/params");
const { HttpsError, onCall } = require("firebase-functions/v2/https");

initializeApp();

const smtpHost = defineSecret("SMTP_HOST");
const smtpPort = defineSecret("SMTP_PORT");
const smtpUser = defineSecret("SMTP_USER");
const smtpPassword = defineSecret("SMTP_PASSWORD");
const smtpFrom = defineSecret("SMTP_FROM");
const otpSecret = defineSecret("OTP_HMAC_SECRET");
const geminiApiKey = defineSecret("GEMINI_API_KEY");
const database = getFirestore();
const CODE_LIFETIME_MS = 10 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;
const CHAT_RATE_LIMIT = 15;
const CHAT_RATE_WINDOW_MS = 60 * 1000;
const MAX_CHAT_MESSAGES = 10;
const MAX_CHAT_MESSAGE_LENGTH = 4000;
const MAX_CHAT_IMAGE_BASE64_LENGTH = 4 * 1024 * 1024;

function normalizeEmail(email) {
    if (typeof email !== "string") {
        throw new HttpsError("invalid-argument", "Enter a valid email address.");
    }
    const normalized = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
        throw new HttpsError("invalid-argument", "Enter a valid email address.");
    }
    return normalized;
}

function emailDocumentId(email) {
    return crypto.createHash("sha256").update(email).digest("hex");
}

function hashCode(email, code) {
    return crypto.createHmac("sha256", otpSecret.value()).update(`${email}:${code}`).digest("hex");
}

function constantTimeEqual(left, right) {
    const a = Buffer.from(left);
    const b = Buffer.from(right);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function mailTransport() {
    const port = Number(smtpPort.value());
    if (!smtpHost.value() || !smtpUser.value() || !smtpPassword.value() || !smtpFrom.value() || !Number.isInteger(port)) {
        throw new HttpsError("failed-precondition", "Email delivery is not configured. Contact the administrator.");
    }
    return nodemailer.createTransport({
        host: smtpHost.value(),
        port,
        secure: port === 465,
        auth: { user: smtpUser.value(), pass: smtpPassword.value() }
    });
}

exports.sendEmailOtp = onCall(
    { secrets: [smtpHost, smtpPort, smtpUser, smtpPassword, smtpFrom, otpSecret], enforceAppCheck: true },
    async (request) => {
        const email = normalizeEmail(request.data?.email);
        const ref = database.collection("emailOtps").doc(emailDocumentId(email));
        const existing = await ref.get();
        if (existing.exists && Date.now() - existing.data().sentAt.toMillis() < RESEND_COOLDOWN_MS) {
            throw new HttpsError("resource-exhausted", "Please wait one minute before requesting another code.");
        }

        const code = String(crypto.randomInt(100000, 1000000));
        const sentAt = Timestamp.now();
        await ref.set({
            email,
            codeHash: hashCode(email, code),
            expiresAt: Timestamp.fromMillis(Date.now() + CODE_LIFETIME_MS),
            sentAt,
            attempts: 0
        });

        try {
            await mailTransport().sendMail({
                from: smtpFrom.value(),
                to: email,
                subject: "Your KisaanSaathi verification code",
                text: `Your KisaanSaathi verification code is ${code}. It expires in 10 minutes.`,
                html: `<p>Your KisaanSaathi verification code is <strong>${code}</strong>.</p><p>It expires in 10 minutes. If you did not request it, you can ignore this email.</p>`
            });
        } catch (error) {
            await ref.delete();
            console.error("Unable to deliver verification email", error);
            throw new HttpsError("unavailable", "We could not send the verification email. Please try again later.");
        }

        return { sent: true };
    }
);

exports.createEmailAccount = onCall(
    { secrets: [otpSecret], enforceAppCheck: true },
    async (request) => {
        const email = normalizeEmail(request.data?.email);
        const { code, name, password, state } = request.data || {};
        if (typeof code !== "string" || !/^\d{6}$/.test(code)) {
            throw new HttpsError("invalid-argument", "Enter the 6-digit verification code.");
        }
        if (typeof name !== "string" || !name.trim() || typeof state !== "string" || !state) {
            throw new HttpsError("invalid-argument", "Enter your name and select your state.");
        }
        if (typeof password !== "string" || password.length < 6) {
            throw new HttpsError("invalid-argument", "Password must be at least 6 characters.");
        }

        const ref = database.collection("emailOtps").doc(emailDocumentId(email));
        const valid = await database.runTransaction(async (transaction) => {
            const snapshot = await transaction.get(ref);
            if (!snapshot.exists) {
                throw new HttpsError("failed-precondition", "Request a new verification code first.");
            }
            const record = snapshot.data();
            if (record.expiresAt.toMillis() < Date.now()) {
                transaction.delete(ref);
                return "expired";
            }
            if (record.attempts >= MAX_ATTEMPTS) {
                transaction.delete(ref);
                return "locked";
            }
            if (!constantTimeEqual(record.codeHash, hashCode(email, code))) {
                transaction.update(ref, { attempts: record.attempts + 1 });
                return "incorrect";
            }
            transaction.delete(ref);
            return "valid";
        });
        if (valid === "expired") {
            throw new HttpsError("deadline-exceeded", "That code expired. Request a new one.");
        }
        if (valid === "locked") {
            throw new HttpsError("resource-exhausted", "Too many incorrect attempts. Request a new code.");
        }
        if (valid === "incorrect") {
            throw new HttpsError("permission-denied", "That verification code is incorrect.");
        }

        try {
            const user = await getAuth().createUser({
                email,
                password,
                displayName: name.trim(),
                emailVerified: true
            });
            await database.collection("users").doc(user.uid).set({
                name: name.trim(),
                email,
                state,
                preferredLanguage: request.data?.language || "en",
                createdAt: Timestamp.now()
            });
            return { uid: user.uid };
        } catch (error) {
            if (error.code === "auth/email-already-exists") {
                throw new HttpsError("already-exists", "An account already exists for this email. Please log in.");
            }
            console.error("Unable to create verified email account", error);
            throw new HttpsError("internal", "We could not create the account. Please try again.");
        }
    }
);

exports.askFarmAssistant = onCall(
    { secrets: [geminiApiKey], timeoutSeconds: 60 },
    async (request) => {
        if (!request.auth) {
            throw new HttpsError("unauthenticated", "Sign in to use the farming assistant.");
        }

        const messages = request.data?.messages;
        if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_CHAT_MESSAGES) {
            throw new HttpsError("invalid-argument", "Send a recent conversation with up to ten messages.");
        }

        let previousRole = "model";
        let totalCharacters = 0;
        const contents = messages.map((message) => {
            if (!message || !["user", "model"].includes(message.role) ||
                message.role === previousRole || typeof message.text !== "string") {
                throw new HttpsError("invalid-argument", "The conversation format is invalid.");
            }
            const text = message.text.trim();
            if (!text || text.length > MAX_CHAT_MESSAGE_LENGTH) {
                throw new HttpsError("invalid-argument", "Each message must be between 1 and 4,000 characters.");
            }
            totalCharacters += text.length;
            if (totalCharacters > 15000) {
                throw new HttpsError("invalid-argument", "The conversation is too long. Start a new question.");
            }
            previousRole = message.role;
            return { role: message.role, parts: [{ text }] };
        });

        if (messages[0].role !== "user" || messages[messages.length - 1].role !== "user") {
            throw new HttpsError("invalid-argument", "The conversation must end with your question.");
        }

        const image = request.data?.image;
        if (image !== undefined) {
            if (!image || !["image/jpeg", "image/png", "image/webp"].includes(image.mimeType) ||
                typeof image.data !== "string" ||
                image.data.length === 0 ||
                image.data.length > MAX_CHAT_IMAGE_BASE64_LENGTH ||
                !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(image.data) ||
                Buffer.from(image.data, "base64").length > 3 * 1024 * 1024) {
                throw new HttpsError("invalid-argument", "Upload a JPEG, PNG, or WebP image up to 3 MB.");
            }
            contents[contents.length - 1].parts.push({
                inlineData: { mimeType: image.mimeType, data: image.data }
            });
        }

        const apiKey = geminiApiKey.value();
        if (!apiKey) {
            throw new HttpsError("failed-precondition", "The AI assistant is not configured yet. Contact the administrator.");
        }

        const userId = request.auth.uid;
        const rateLimitRef = database.collection("chatRateLimits").doc(userId);
        const now = Date.now();
        const allowed = await database.runTransaction(async (transaction) => {
            const snapshot = await transaction.get(rateLimitRef);
            const record = snapshot.exists ? snapshot.data() : null;
            if (!record || record.resetAt.toMillis() <= now) {
                transaction.set(rateLimitRef, {
                    count: 1,
                    resetAt: Timestamp.fromMillis(now + CHAT_RATE_WINDOW_MS)
                });
                return true;
            }
            if (record.count >= CHAT_RATE_LIMIT) return false;
            transaction.update(rateLimitRef, { count: record.count + 1 });
            return true;
        });
        if (!allowed) {
            throw new HttpsError("resource-exhausted", "You have reached the chat limit. Please wait a minute and try again.");
        }

        let response;
        try {
            response = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-goog-api-key": apiKey
                    },
                    signal: AbortSignal.timeout(45000),
                    body: JSON.stringify({
                        systemInstruction: {
                            parts: [{
                                text: "You are KisaanSaathi, a helpful agriculture assistant for farmers in India. Answer in the language used by the farmer. Give practical, clear steps and ask a brief follow-up when important details are missing. Do not claim certainty when diagnosing crop or leaf images; describe visible signs, explain uncertainty, and suggest confirming serious problems with a local agriculture officer. Do not invent live weather, market prices, or government eligibility details. Keep answers concise and never request passwords, verification codes, or payment."
                            }]
                        },
                        contents,
                        generationConfig: { temperature: 0.4, maxOutputTokens: 800 }
                    })
                }
            );
        } catch (error) {
            console.error("Gemini request failed", error?.name || "unknown error");
            throw new HttpsError("unavailable", "The AI assistant could not be reached. Please try again.");
        }

        if (!response.ok) {
            console.error("Gemini returned HTTP status", response.status);
            if (response.status === 429) {
                throw new HttpsError("resource-exhausted", "The AI assistant is busy. Please try again shortly.");
            }
            if (response.status === 401 || response.status === 403) {
                throw new HttpsError("failed-precondition", "The AI service key is invalid or lacks access.");
            }
            throw new HttpsError("unavailable", "The AI assistant is temporarily unavailable. Please try again.");
        }

        let result;
        try {
            result = await response.json();
        } catch (error) {
            console.error("Gemini returned an invalid response", error?.name || "unknown error");
            throw new HttpsError("unavailable", "The AI assistant returned an unreadable response. Please try again.");
        }
        const answer = result.candidates?.[0]?.content?.parts
            ?.map((part) => part.text || "")
            .join("")
            .trim();
        if (!answer) {
            throw new HttpsError("unavailable", "The AI assistant could not answer that question. Please try another.");
        }
        return { answer };
    }
);
