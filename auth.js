import { getApps, initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app-check.js";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithEmailAndPassword,
    signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-functions.js";
import { firebaseConfig } from "./firebase-config.js";

const configured = !firebaseConfig.apiKey.startsWith("REPLACE_")
    && !firebaseConfig.projectId.startsWith("REPLACE_")
    && !firebaseConfig.appId.startsWith("REPLACE_");
const status = document.getElementById("authStatus");
let confirmationResult = null;
let recaptchaVerifier = null;
let appCheckInitialized = false;

function showStatus(message, isError = false) {
    status.textContent = message;
    status.dataset.state = isError ? "error" : "success";
}

function getFirebaseServices() {
    if (!configured) {
        throw new Error("Authentication is not configured yet. Follow AUTH_SETUP.md to connect Firebase and SMTP.");
    }

    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    if (!appCheckInitialized) {
        if (!firebaseConfig.appCheckSiteKey || firebaseConfig.appCheckSiteKey.startsWith("REPLACE_")) {
            throw new Error("App Check is not configured yet. Follow AUTH_SETUP.md before requesting verification.");
        }
        initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(firebaseConfig.appCheckSiteKey),
            isTokenAutoRefreshEnabled: true
        });
        appCheckInitialized = true;
    }
    return {
        auth: getAuth(app),
        functions: getFunctions(app, "us-central1")
    };
}

function getChannel() {
    return document.querySelector('input[name="contactMethod"]:checked').value;
}

function getPhoneNumber() {
    const digits = document.getElementById("phone").value.replace(/\D/g, "");
    if (!/^\d{10}$/.test(digits)) {
        throw new Error("Enter a valid 10-digit mobile number.");
    }
    return `+91${digits}`;
}

function setupRecaptcha(auth) {
    if (recaptchaVerifier) {
        recaptchaVerifier.clear();
    }
    recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {});
    return recaptchaVerifier;
}

function storeAccount({ name, phone, email, state }) {
    localStorage.setItem("kisaanSaathiUser", JSON.stringify({ name, phone, email, state }));
    localStorage.setItem("kisaanSaathiLoggedIn", "true");
    localStorage.setItem("kisaanName", name);
}

function getLanguage() {
    return localStorage.getItem("kisaanLang") || localStorage.getItem("aiLanguage") || "en";
}

function handleError(error) {
    const messages = {
        "auth/invalid-credential": "The email or password is incorrect.",
        "auth/invalid-phone-number": "Enter a valid mobile number with country code +91.",
        "auth/too-many-requests": "Too many attempts. Please wait and try again.",
        "auth/email-already-in-use": "An account already exists for this email. Please log in.",
        "auth/weak-password": "Choose a password with at least 6 characters."
    };
    showStatus(messages[error.code] || error.message || "Authentication failed. Please try again.", true);
}

async function sendEmailCode(email) {
    const { functions } = getFirebaseServices();
    const sendCode = httpsCallable(functions, "sendEmailOtp");
    await sendCode({ email });
}

async function sendPhoneCode(phone) {
    const { auth } = getFirebaseServices();
    confirmationResult = await signInWithPhoneNumber(auth, phone, setupRecaptcha(auth));
}

function updateContactMethod() {
    const isEmail = getChannel() === "email";
    const isSignup = Boolean(document.getElementById("signupForm"));
    const emailGroup = document.getElementById("emailGroup");
    if (emailGroup) emailGroup.hidden = !isEmail;
    document.getElementById("phoneGroup").hidden = isEmail;
    document.getElementById("otpGroup").hidden = !isSignup && isEmail;
    document.getElementById("emailPasswordGroup").hidden = !isEmail;
    document.getElementById("phonePasswordNote")?.toggleAttribute("hidden", isEmail);
    const codeHelp = document.getElementById("codeHelp");
    if (codeHelp) {
        codeHelp.textContent = isEmail
            ? "We’ll email a one-time code to verify your address."
            : "We’ll text a one-time code to verify your mobile number.";
    }
    document.getElementById("email").required = isEmail;
    document.getElementById("phone").required = !isEmail;
    document.getElementById("password").required = isEmail;
    document.getElementById("verificationCode").required = isSignup || !isEmail;
    if (document.getElementById("sendOtpButton")) {
        document.getElementById("sendOtpButton").textContent = isEmail ? "Send email code" : "Send SMS code";
    }
    const codeLabel = document.querySelector('label[for="verificationCode"]');
    if (codeLabel) {
        codeLabel.textContent = isEmail ? "Email Verification Code" : "SMS Verification Code";
    }
    confirmationResult = null;
}

async function sendSignupCode() {
    try {
        const channel = getChannel();
        if (channel === "email") {
            const email = document.getElementById("email").value.trim().toLowerCase();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new Error("Enter a valid email address first.");
            }
            await sendEmailCode(email);
            showStatus("A verification code was sent to your email. It expires in 10 minutes.");
        } else {
            await sendPhoneCode(getPhoneNumber());
            showStatus("A verification code was sent by SMS. It expires in a few minutes.");
        }
    } catch (error) {
        handleError(error);
    }
}

async function registerAccount(event) {
    event.preventDefault();
    const submit = document.getElementById("registerButton");
    submit.disabled = true;

    try {
        const name = document.getElementById("fullname").value.trim();
        const state = document.getElementById("state").value;
        const code = document.getElementById("verificationCode").value.trim();
        if (!/^\d{6}$/.test(code)) {
            throw new Error("Enter the 6-digit verification code.");
        }

        if (getChannel() === "email") {
            const email = document.getElementById("email").value.trim().toLowerCase();
            const password = document.getElementById("password").value;
            const { auth, functions } = getFirebaseServices();
            const createAccount = httpsCallable(functions, "createEmailAccount");
            await createAccount({ name, email, state, password, code, language: getLanguage() });
            await signInWithEmailAndPassword(auth, email, password);
            storeAccount({ name, email, phone: "", state });
        } else {
            if (!confirmationResult) {
                throw new Error("Request a text message code before registering.");
            }
            const credential = await confirmationResult.confirm(code);
            storeAccount({ name, phone: credential.user.phoneNumber, email: "", state });
        }

        alert("Account verified and created. Let’s set up your AI companion.");
        window.location.href = "character.html";
    } catch (error) {
        handleError(error);
    } finally {
        submit.disabled = false;
    }
}

async function loginUser(event) {
    event.preventDefault();
    const submit = document.getElementById("loginButton");
    submit.disabled = true;

    try {
        const { auth } = getFirebaseServices();
        if (getChannel() === "email") {
            const email = document.getElementById("email").value.trim().toLowerCase();
            const password = document.getElementById("password").value;
            const credential = await signInWithEmailAndPassword(auth, email, password);
            storeAccount({
                name: credential.user.displayName || email,
                email,
                phone: credential.user.phoneNumber || "",
                state: ""
            });
        } else {
            const code = document.getElementById("verificationCode").value.trim();
            if (!confirmationResult) {
                throw new Error("Request a text message code before logging in.");
            }
            const credential = await confirmationResult.confirm(code);
            storeAccount({
                name: credential.user.displayName || "Farmer",
                phone: credential.user.phoneNumber,
                email: credential.user.email || "",
                state: ""
            });
        }
        window.location.href = "dashboard.html";
    } catch (error) {
        handleError(error);
    } finally {
        submit.disabled = false;
    }
}

document.querySelectorAll('input[name="contactMethod"]').forEach((input) => {
    input.addEventListener("change", updateContactMethod);
});
document.getElementById("sendOtpButton")?.addEventListener("click", sendSignupCode);
document.getElementById("sendLoginOtpButton")?.addEventListener("click", async () => {
    try {
        if (getChannel() === "email") {
            throw new Error("Email sign-in uses your password. Use Forgot Password if you need to reset it.");
        }
        await sendPhoneCode(getPhoneNumber());
        showStatus("A verification code was sent by SMS.");
    } catch (error) {
        handleError(error);
    }
});
document.getElementById("signupForm")?.addEventListener("submit", registerAccount);
document.getElementById("loginForm")?.addEventListener("submit", loginUser);

const languageSelector = document.getElementById("authLanguage");
if (languageSelector) {
    languageSelector.value = getLanguage();
    languageSelector.addEventListener("change", () => {
        window.setPortalLanguage?.(languageSelector.value);
    });
}
document.getElementById("guideMessage").textContent = getLanguage() === "hi"
    ? "नमस्ते! अपनी चुनी हुई भाषा में आगे बढ़ें।"
    : "Choose email or mobile, then request a verification code.";
updateContactMethod();
