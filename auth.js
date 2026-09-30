import { getApps, initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app-check.js";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPhoneNumber,
    onAuthStateChanged,
    signOut,
    updateProfile
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-functions.js";
import { firebaseConfig } from "./firebase-config.js";
import { createUserProfile, getUserProfile } from "./firestore-db.js";

const configured = Boolean(firebaseConfig.apiKey)
    && !firebaseConfig.apiKey.startsWith("REPLACE_")
    && !firebaseConfig.projectId.startsWith("REPLACE_")
    && !firebaseConfig.appId.startsWith("REPLACE_");
const status = document.getElementById("authStatus");
let confirmationResult = null;
let recaptchaVerifier = null;
let appCheckInitialized = false;

function showStatus(message, isError = false) {
    if (status) {
        status.textContent = message;
        status.dataset.state = isError ? "error" : "success";
    }
}

function getFirebaseServices() {
    if (!configured) {
        throw new Error("Authentication is not configured yet. Follow AUTH_SETUP.md to connect Firebase and SMTP.");
    }

    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    if (!appCheckInitialized) {
        if (firebaseConfig.appCheckSiteKey && !firebaseConfig.appCheckSiteKey.startsWith("REPLACE_")) {
            try {
                initializeAppCheck(app, {
                    provider: new ReCaptchaV3Provider(firebaseConfig.appCheckSiteKey),
                    isTokenAutoRefreshEnabled: true
                });
                appCheckInitialized = true;
            } catch (err) {
                console.warn("App Check initialization skipped:", err);
            }
        }
    }
    return {
        auth: getAuth(app),
        functions: getFunctions(app, "us-central1")
    };
}

function getChannel() {
    const checked = document.querySelector('input[name="contactMethod"]:checked');
    return checked ? checked.value : "email";
}

function getPhoneNumber() {
    const phoneInput = document.getElementById("phone");
    const digits = phoneInput ? phoneInput.value.replace(/\D/g, "") : "";
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
    if (name) {
        localStorage.setItem("kisaanName", name);
    }
}

async function syncAccountToFirestore(user, { name, phone, email, state }) {
    if (!user || !user.uid) return;
    try {
        await createUserProfile(user.uid, {
            name: name || user.displayName || "Farmer",
            email: email || user.email || "",
            phone: phone || user.phoneNumber || "",
            state: state || "",
            language: getLanguage()
        });
    } catch (e) {
        console.warn("Firestore user profile sync error:", e);
    }
}

function getLanguage() {
    return localStorage.getItem("kisaanLang") || localStorage.getItem("aiLanguage") || "en";
}

function updateGuideMessage() {
    const messages = {
        en: "Choose email or mobile, then request a verification code.",
        hi: "ईमेल या मोबाइल चुनें, फिर सत्यापन कोड का अनुरोध करें।",
        mr: "ईमेल किंवा मोबाइल निवडा आणि पडताळणी कोड मागवा.",
        pa: "ਈਮੇਲ ਜਾਂ ਮੋਬਾਈਲ ਚੁਣੋ, ਫਿਰ ਤਸਦੀਕ ਕੋਡ ਮੰਗੋ।",
        gu: "ઇમેઇલ અથવા મોબાઇલ પસંદ કરો, પછી ચકાસણી કોડ મંગાવો.",
        bn: "ইমেল বা মোবাইল বেছে নিয়ে যাচাই কোডের জন্য অনুরোধ করুন।",
        te: "ఇమెయిల్ లేదా మొబైల్‌ను ఎంచుకుని, ధృవీకరణ కోడ్‌ను అభ్యర్థించండి.",
        ta: "மின்னஞ்சல் அல்லது கைப்பேசியைத் தேர்ந்தெடுத்து சரிபார்ப்புக் குறியீட்டைக் கோரவும்.",
        kn: "ಇಮೇಲ್ ಅಥವಾ ಮೊಬೈಲ್ ಆಯ್ಕೆಮಾಡಿ, ನಂತರ ಪರಿಶೀಲನಾ ಕೋಡ್ ಕೇಳಿ.",
        ml: "ഇമെയിൽ അല്ലെങ്കിൽ മൊബൈൽ തിരഞ്ഞെടുത്ത് സ്ഥിരീകരണ കോഡ് അഭ്യർത്ഥിക്കുക.",
        or: "ଇମେଲ୍ କିମ୍ବା ମୋବାଇଲ୍ ବାଛନ୍ତୁ, ତାପରେ ଯାଞ୍ଚ କୋଡ୍ ମାଗନ୍ତୁ।",
        as: "ইমেইল বা ম’বাইল বাছনি কৰি পৰীক্ষা কোডৰ বাবে অনুৰোধ কৰক।",
        ur: "ای میل یا موبائل منتخب کریں، پھر تصدیقی کوڈ طلب کریں۔"
    };
    const guideMessage = document.getElementById("guideMessage");
    if (guideMessage) guideMessage.textContent = messages[getLanguage()] || messages.en;
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
    const translate = (text) => window.portalTranslateText?.(text, getLanguage()) || text;
    const emailGroup = document.getElementById("emailGroup");
    if (emailGroup) emailGroup.hidden = !isEmail;

    const phoneGroup = document.getElementById("phoneGroup");
    if (phoneGroup) phoneGroup.hidden = isEmail;

    const otpGroup = document.getElementById("otpGroup");
    if (otpGroup) otpGroup.hidden = !isSignup && isEmail;

    const emailPasswordGroup = document.getElementById("emailPasswordGroup");
    if (emailPasswordGroup) emailPasswordGroup.hidden = !isEmail;

    document.getElementById("phonePasswordNote")?.toggleAttribute("hidden", isEmail);

    const codeHelp = document.getElementById("codeHelp");
    if (codeHelp) {
        codeHelp.textContent = translate(isEmail
            ? "We’ll email a one-time code to verify your address."
            : "We’ll text a one-time code to verify your mobile number.");
    }

    const emailInput = document.getElementById("email");
    if (emailInput) emailInput.required = isEmail;

    const phoneInput = document.getElementById("phone");
    if (phoneInput) phoneInput.required = !isEmail;

    const passwordInput = document.getElementById("password");
    if (passwordInput) passwordInput.required = isEmail;

    const codeInput = document.getElementById("verificationCode");
    if (codeInput) codeInput.required = isSignup || !isEmail;

    if (document.getElementById("sendOtpButton")) {
        document.getElementById("sendOtpButton").textContent = translate(isEmail ? "Send email code" : "Send SMS code");
    }
    const codeLabel = document.querySelector('label[for="verificationCode"]');
    if (codeLabel) {
        codeLabel.textContent = translate(isEmail ? "Email Verification Code" : "SMS Verification Code");
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
            try {
                await sendEmailCode(email);
                showStatus("A verification code was sent to your email. It expires in 10 minutes.");
            } catch (fnErr) {
                if (fnErr.code === "functions/not-found" || fnErr.code === "failed-precondition" || fnErr.code === "unavailable") {
                    showStatus("Verification email service is not configured in Cloud Functions yet. You can complete registration below.", false);
                } else {
                    throw fnErr;
                }
            }
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
    if (submit) submit.disabled = true;

    try {
        const name = document.getElementById("fullname")?.value.trim() || "";
        const state = document.getElementById("state")?.value || "";
        const code = document.getElementById("verificationCode")?.value.trim() || "";

        if (getChannel() === "email") {
            const email = document.getElementById("email").value.trim().toLowerCase();
            const password = document.getElementById("password").value;
            const { auth, functions } = getFirebaseServices();

            let registeredViaCloudFunction = false;

            if (code && /^\d{6}$/.test(code)) {
                try {
                    const createAccount = httpsCallable(functions, "createEmailAccount");
                    await createAccount({ name, email, state, password, code, language: getLanguage() });
                    registeredViaCloudFunction = true;
                } catch (funcErr) {
                    if (funcErr.code === "already-exists" || funcErr.message?.includes("already exists")) {
                        throw new Error("An account already exists for this email. Please log in.");
                    }
                    if (funcErr.code === "permission-denied" || funcErr.code === "deadline-exceeded" || funcErr.code === "resource-exhausted") {
                        throw funcErr;
                    }
                    console.warn("Cloud function registration bypassed/failed:", funcErr);
                }
            }

            let createdUser = null;
            if (!registeredViaCloudFunction) {
                const credential = await createUserWithEmailAndPassword(auth, email, password);
                createdUser = credential.user;
                if (name && createdUser) {
                    await updateProfile(createdUser, { displayName: name });
                }
            } else {
                const credential = await signInWithEmailAndPassword(auth, email, password);
                createdUser = credential.user;
            }

            storeAccount({ name, email, phone: "", state });
            if (createdUser) {
                await syncAccountToFirestore(createdUser, { name, email, phone: "", state });
            }
        } else {
            if (!/^\d{6}$/.test(code)) {
                throw new Error("Enter the 6-digit verification code.");
            }
            if (!confirmationResult) {
                throw new Error("Request a text message code before registering.");
            }
            const credential = await confirmationResult.confirm(code);
            if (name && credential.user) {
                await updateProfile(credential.user, { displayName: name });
            }
            storeAccount({ name, phone: credential.user.phoneNumber, email: "", state });
            if (credential.user) {
                await syncAccountToFirestore(credential.user, { name, phone: credential.user.phoneNumber, email: "", state });
            }
        }

        alert("Account verified and created. Let’s set up your AI companion.");
        window.location.href = "character.html";
    } catch (error) {
        handleError(error);
    } finally {
        if (submit) submit.disabled = false;
    }
}

async function loginUser(event) {
    event.preventDefault();
    const submit = document.getElementById("loginButton");
    if (submit) submit.disabled = true;

    try {
        const { auth } = getFirebaseServices();
        let loggedUser = null;

        if (getChannel() === "email") {
            const email = document.getElementById("email").value.trim().toLowerCase();
            const password = document.getElementById("password").value;
            const credential = await signInWithEmailAndPassword(auth, email, password);
            loggedUser = credential.user;
            storeAccount({
                name: credential.user.displayName || email.split("@")[0],
                email: credential.user.email || email,
                phone: credential.user.phoneNumber || "",
                state: ""
            });
        } else {
            const code = document.getElementById("verificationCode").value.trim();
            if (!confirmationResult) {
                throw new Error("Request a text message code before logging in.");
            }
            const credential = await confirmationResult.confirm(code);
            loggedUser = credential.user;
            storeAccount({
                name: credential.user.displayName || "Farmer",
                phone: credential.user.phoneNumber,
                email: credential.user.email || "",
                state: ""
            });
        }

        if (loggedUser) {
            await syncAccountToFirestore(loggedUser, {
                name: loggedUser.displayName || "",
                email: loggedUser.email || "",
                phone: loggedUser.phoneNumber || "",
                state: ""
            });
        }

        window.location.href = "dashboard.html";
    } catch (error) {
        handleError(error);
    } finally {
        if (submit) submit.disabled = false;
    }
}

export async function logoutUser() {
    try {
        const { auth } = getFirebaseServices();
        await signOut(auth);
    } catch (e) {
        console.error("Logout error:", e);
    }
    localStorage.removeItem("kisaanSaathiLoggedIn");
    localStorage.removeItem("kisaanSaathiUser");
    localStorage.removeItem("kisaanName");
    window.top.location.href = "login.html";
}

window.logoutUser = logoutUser;
window.logoutAccount = logoutUser;

let authStateCheckInitialized = false;

function initAuthStateListener() {
    if (authStateCheckInitialized) return;
    authStateCheckInitialized = true;

    try {
        const { auth } = getFirebaseServices();
        onAuthStateChanged(auth, (user) => {
            const path = window.location.pathname.toLowerCase();
            const isAuthPage = path.endsWith("login.html") || path.endsWith("signup.html");
            const isDashboard = path.endsWith("dashboard.html");

            if (user) {
                localStorage.setItem("kisaanSaathiLoggedIn", "true");
                if (user.displayName && !localStorage.getItem("kisaanName")) {
                    localStorage.setItem("kisaanName", user.displayName);
                }
                if (isAuthPage) {
                    window.location.href = "dashboard.html";
                }
            } else {
                localStorage.removeItem("kisaanSaathiLoggedIn");
                if (isDashboard) {
                    window.location.href = "login.html";
                }
            }
        });
    } catch (e) {
        console.warn("Auth state listener setup skipped:", e.message);
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
<<<<<<< HEAD
const guideMsgEl = document.getElementById("guideMessage");
if (guideMsgEl) {
    guideMsgEl.textContent = getLanguage() === "hi"
        ? "नमस्ते! अपनी चुनी हुई भाषा में आगे बढ़ें।"
        : "Choose email or mobile, then request a verification code.";
}
=======
window.addEventListener("portal-language-changed", () => {
    updateGuideMessage();
    updateContactMethod();
});
updateGuideMessage();
>>>>>>> ecb5e66e4e18235b56e551205063f87fded9ebfd
updateContactMethod();
initAuthStateListener();

