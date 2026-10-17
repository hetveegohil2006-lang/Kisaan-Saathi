import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-functions.js";
import { firebaseConfig } from "../firebase/firebase-config.js";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const askAssistant = httpsCallable(getFunctions(app, "us-central1"), "askFarmAssistant", { timeout: 60000 });
const status = document.getElementById("chatStatus");
const messagesElement = document.getElementById("chatMessages");
const input = document.getElementById("userInput");
const fileInput = document.getElementById("fileInput");
const sendButton = document.getElementById("sendButton");
const toolButtons = [
    document.getElementById("cameraButton"),
    document.getElementById("uploadButton"),
    document.getElementById("voiceButton")
];
const conversation = [];
let currentUser = null;
let selectedImage = null;
let sending = false;

const companionName = localStorage.getItem("aiCompanionName") || "Guide";
document.getElementById("headerTitleText").textContent = `(${companionName})`;

const themes = ["theme-light-yellow", "theme-light-pink", "theme-light-orange", "theme-light-blue", "theme-light-black"];
const savedThemeIndex = Number(localStorage.getItem("kisaan-portal-theme-index"));
if (Number.isInteger(savedThemeIndex) && themes[savedThemeIndex]) {
    document.getElementById("appBody").className = themes[savedThemeIndex];
}

function setStatus(message, state = "") {
    status.textContent = message;
    if (state) status.dataset.state = state;
    else delete status.dataset.state;
}

function appendBubble(text, role) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${role}`;
    bubble.textContent = text;
    messagesElement.appendChild(bubble);
    messagesElement.scrollTop = messagesElement.scrollHeight;
    return bubble;
}

function firebaseErrorMessage(error) {
    const messages = {
        "functions/unauthenticated": "Please sign in again to use the farming assistant.",
        "functions/not-found": "The AI service is not deployed yet. Ask the administrator to deploy Firebase Functions.",
        "functions/failed-precondition": "The AI service is not configured. Ask the administrator to configure its Gemini API key.",
        "functions/resource-exhausted": error.message || "The AI service is busy or you have reached the usage limit. Please try again shortly.",
        "functions/unavailable": error.message || "The AI service is temporarily unavailable. Please try again."
    };
    return messages[error.code] || error.message || "The AI response could not be loaded. Please try again.";
}

function fileToBase64(file) {
    return file.arrayBuffer().then((buffer) => {
        const bytes = new Uint8Array(buffer);
        let binary = "";
        for (let offset = 0; offset < bytes.length; offset += 0x8000) {
            binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
        }
        return btoa(binary);
    });
}

async function sendMessage() {
    if (sending) return;
    const text = input.value.trim();
    const image = selectedImage;
    if (!text && !image) {
        input.focus();
        return;
    }
    if (!currentUser) {
        setStatus("Please sign in to use the farming assistant.", "error");
        return;
    }

    const question = text || "Please examine this crop or plant image and describe the visible signs.";
    const displayText = image ? `${text || "Please examine this image."}\n[Image: ${image.name}]` : text;
    appendBubble(displayText, "user");
    input.value = "";
    selectedImage = null;
    fileInput.value = "";
    sending = true;
    sendButton.disabled = true;
    input.disabled = true;
    toolButtons.forEach((button) => { button.disabled = true; });
    setStatus("KisaanSaathi is preparing your advice…");
    const pendingBubble = appendBubble("Thinking…", "ai");

    try {
        const messages = [...conversation.slice(-4), { role: "user", text: question }];
        const request = { messages };
        if (image) {
            request.image = {
                mimeType: image.type,
                data: await fileToBase64(image)
            };
        }

        const result = await askAssistant(request);
        const answer = result.data?.answer;
        if (typeof answer !== "string" || !answer.trim()) {
            throw new Error("The AI service returned an empty response.");
        }

        pendingBubble.textContent = answer.trim();
        conversation.push(
            { role: "user", text: question },
            { role: "model", text: answer.trim() }
        );
        if (conversation.length > 4) conversation.splice(0, conversation.length - 4);
        setStatus("AI advice is for general guidance. Confirm serious crop issues with a local agriculture expert.", "ready");
    } catch (error) {
        pendingBubble.textContent = firebaseErrorMessage(error);
        setStatus(firebaseErrorMessage(error), "error");
    } finally {
        sending = false;
        sendButton.disabled = false;
        input.disabled = false;
        toolButtons.forEach((button) => { button.disabled = false; });
        input.focus();
    }
}

function openImagePicker(useCamera) {
    if (useCamera && "capture" in fileInput) fileInput.setAttribute("capture", "environment");
    else fileInput.removeAttribute("capture");
    fileInput.click();
}

function getSpeechLanguage() {
    const language = localStorage.getItem("kisaanLang") || localStorage.getItem("aiLanguage") || "en";
    const localeByLanguage = {
        en: "en-IN", hi: "hi-IN", mr: "mr-IN", pa: "pa-IN", gu: "gu-IN",
        bn: "bn-IN", te: "te-IN", ta: "ta-IN", kn: "kn-IN", ml: "ml-IN",
        or: "or-IN", as: "as-IN", ur: "ur-IN"
    };
    return localeByLanguage[language] || "en-IN";
}

document.getElementById("cameraButton").addEventListener("click", () => openImagePicker(true));
document.getElementById("uploadButton").addEventListener("click", () => openImagePicker(false));
document.getElementById("voiceButton").addEventListener("click", () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        setStatus("Voice input is not supported in this browser. You can type your question instead.", "error");
        return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = getSpeechLanguage();
    recognition.onresult = (event) => {
        input.value = event.results[0][0].transcript;
        sendMessage();
    };
    recognition.onerror = (event) => {
        setStatus(`Voice input failed (${event.error}). Please try again or type your question.`, "error");
    };
    try {
        recognition.start();
        setStatus("Listening…");
    } catch (error) {
        setStatus("Could not start voice input. Please allow microphone access or type your question.", "error");
    }
});
fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        selectedImage = null;
        fileInput.value = "";
        setStatus("Choose a JPEG, PNG, or WebP image.", "error");
        return;
    }
    if (file.size > 3 * 1024 * 1024) {
        selectedImage = null;
        fileInput.value = "";
        setStatus("Images must be 3 MB or smaller.", "error");
        return;
    }
    selectedImage = file;
    setStatus(`${file.name} is ready. Add a question or send the image for advice.`);
});
sendButton.addEventListener("click", sendMessage);
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

onAuthStateChanged(auth, (user) => {
    currentUser = user;
    if (user) setStatus("Connected. Ask a farming question or attach a crop photo for advice.", "ready");
    else setStatus("Please sign in to use the farming assistant.", "error");
});
