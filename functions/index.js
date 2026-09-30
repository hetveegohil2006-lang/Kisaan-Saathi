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
const database = getFirestore();
const CODE_LIFETIME_MS = 10 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;

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
