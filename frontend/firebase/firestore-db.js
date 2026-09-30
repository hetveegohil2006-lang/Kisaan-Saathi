import { getApps, initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);

function formatFirestoreError(error) {
    console.error("Firestore operation error:", error);
    if (error.code === "permission-denied") {
        return new Error("Access denied: You do not have permission to access or edit this record.");
    }
    if (error.code === "unauthenticated") {
        return new Error("Authentication required: Please log in to perform this action.");
    }
    if (error.code === "unavailable" || error.code === "deadline-exceeded") {
        return new Error("Network issue: Unable to connect to database. Please check your internet connection.");
    }
    if (error.code === "not-found") {
        return new Error("Record not found.");
    }
    return new Error(error.message || "An unexpected database error occurred.");
}

/**
 * Creates or updates user profile in `users/{uid}`.
 */
export async function createUserProfile(uid, profileData = {}) {
    if (!uid) throw new Error("UID is required to create a user profile.");
    try {
        const userRef = doc(db, "users", uid);
        const existingSnap = await getDoc(userRef);
        const now = serverTimestamp();
        
        const payload = {
            name: profileData.name || "",
            email: profileData.email || "",
            phone: profileData.phone || "",
            state: profileData.state || "",
            district: profileData.district || "",
            language: profileData.language || "en",
            updatedAt: now
        };

        if (!existingSnap.exists()) {
            payload.createdAt = now;
        }

        await setDoc(userRef, payload, { merge: true });
        return { uid, ...payload };
    } catch (error) {
        throw formatFirestoreError(error);
    }
}

/**
 * Fetches user profile from `users/{uid}`.
 */
export async function getUserProfile(uid) {
    if (!uid) throw new Error("UID is required to get a user profile.");
    try {
        const userRef = doc(db, "users", uid);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
            return { uid, ...snapshot.data() };
        }
        return null;
    } catch (error) {
        throw formatFirestoreError(error);
    }
}

/**
 * Updates user profile in `users/{uid}`.
 */
export async function updateUserProfile(uid, updateData = {}) {
    if (!uid) throw new Error("UID is required to update a user profile.");
    try {
        const userRef = doc(db, "users", uid);
        const payload = {
            ...updateData,
            updatedAt: serverTimestamp()
        };
        await setDoc(userRef, payload, { merge: true });
        return { uid, ...payload };
    } catch (error) {
        throw formatFirestoreError(error);
    }
}

/**
 * Adds a farm to `users/{uid}/farms/{farmId}`.
 */
export async function addFarm(uid, farmData = {}) {
    if (!uid) throw new Error("UID is required to add a farm.");
    try {
        const farmsCol = collection(db, "users", uid, "farms");
        const now = serverTimestamp();
        const payload = {
            farmName: farmData.farmName || "My Farm",
            location: farmData.location || "",
            landSize: parseFloat(farmData.landSize) || 0,
            landUnit: farmData.landUnit || "acres",
            soilType: farmData.soilType || "",
            irrigationType: farmData.irrigationType || "",
            createdAt: now,
            updatedAt: now
        };
        const docRef = await addDoc(farmsCol, payload);
        return { id: docRef.id, ...payload };
    } catch (error) {
        throw formatFirestoreError(error);
    }
}

/**
 * Fetches farms from `users/{uid}/farms`.
 */
export async function getFarms(uid) {
    if (!uid) throw new Error("UID is required to get farms.");
    try {
        const farmsCol = collection(db, "users", uid, "farms");
        const snapshot = await getDocs(farmsCol);
        const farms = [];
        snapshot.forEach((docSnap) => {
            farms.push({ id: docSnap.id, ...docSnap.data() });
        });
        return farms;
    } catch (error) {
        throw formatFirestoreError(error);
    }
}

/**
 * Adds a soil report to `users/{uid}/soilReports/{reportId}`.
 */
export async function addSoilReport(uid, reportData = {}) {
    if (!uid) throw new Error("UID is required to add a soil report.");
    try {
        const reportsCol = collection(db, "users", uid, "soilReports");
        const payload = {
            farmId: reportData.farmId || "",
            ph: parseFloat(reportData.ph) || 7.0,
            nitrogen: parseFloat(reportData.nitrogen) || 0,
            phosphorus: parseFloat(reportData.phosphorus) || 0,
            potassium: parseFloat(reportData.potassium) || 0,
            moisture: parseFloat(reportData.moisture) || 0,
            organicCarbon: parseFloat(reportData.organicCarbon) || 0,
            temperature: parseFloat(reportData.temperature) || 0,
            soilHealthScore: reportData.soilHealthScore || "Good",
            recommendedCrops: reportData.recommendedCrops || [],
            createdAt: serverTimestamp()
        };
        const docRef = await addDoc(reportsCol, payload);
        return { id: docRef.id, ...payload };
    } catch (error) {
        throw formatFirestoreError(error);
    }
}

/**
 * Fetches soil reports from `users/{uid}/soilReports`.
 */
export async function getSoilReports(uid, farmId = null) {
    if (!uid) throw new Error("UID is required to get soil reports.");
    try {
        const reportsCol = collection(db, "users", uid, "soilReports");
        let q = reportsCol;
        if (farmId) {
            q = query(reportsCol, where("farmId", "==", farmId));
        }
        const snapshot = await getDocs(q);
        const reports = [];
        snapshot.forEach((docSnap) => {
            reports.push({ id: docSnap.id, ...docSnap.data() });
        });
        return reports;
    } catch (error) {
        throw formatFirestoreError(error);
    }
}

/**
 * Adds an expense to `users/{uid}/expenses/{expenseId}`.
 */
export async function addExpense(uid, expenseData = {}) {
    if (!uid) throw new Error("UID is required to add an expense.");
    const validCategories = [
        "Seeds", "Fertilizer", "Labour", "Irrigation", "Machinery",
        "Fuel", "Transportation", "Pesticides", "Storage", "Other"
    ];
    const category = validCategories.includes(expenseData.category) ? expenseData.category : "Other";
    try {
        const expensesCol = collection(db, "users", uid, "expenses");
        const payload = {
            farmId: expenseData.farmId || "",
            crop: expenseData.crop || "",
            category,
            amount: parseFloat(expenseData.amount) || 0,
            description: expenseData.description || "",
            date: expenseData.date || new Date().toISOString().split("T")[0],
            createdAt: serverTimestamp()
        };
        const docRef = await addDoc(expensesCol, payload);
        return { id: docRef.id, ...payload };
    } catch (error) {
        throw formatFirestoreError(error);
    }
}

/**
 * Fetches expenses from `users/{uid}/expenses`.
 */
export async function getExpenses(uid, farmId = null) {
    if (!uid) throw new Error("UID is required to get expenses.");
    try {
        const expensesCol = collection(db, "users", uid, "expenses");
        let q = expensesCol;
        if (farmId) {
            q = query(expensesCol, where("farmId", "==", farmId));
        }
        const snapshot = await getDocs(q);
        const expenses = [];
        snapshot.forEach((docSnap) => {
            expenses.push({ id: docSnap.id, ...docSnap.data() });
        });
        return expenses;
    } catch (error) {
        throw formatFirestoreError(error);
    }
}

/**
 * Adds a disease report to `users/{uid}/diseaseReports/{reportId}`.
 */
export async function addDiseaseReport(uid, reportData = {}) {
    if (!uid) throw new Error("UID is required to add a disease report.");
    try {
        const reportsCol = collection(db, "users", uid, "diseaseReports");
        const payload = {
            farmId: reportData.farmId || "",
            crop: reportData.crop || "",
            symptoms: reportData.symptoms || "",
            imageUrl: reportData.imageUrl || "",
            suspectedDisease: reportData.suspectedDisease || "",
            confidence: parseFloat(reportData.confidence) || 0,
            recommendation: reportData.recommendation || "",
            createdAt: serverTimestamp()
        };
        const docRef = await addDoc(reportsCol, payload);
        return { id: docRef.id, ...payload };
    } catch (error) {
        throw formatFirestoreError(error);
    }
}

/**
 * Fetches disease reports from `users/{uid}/diseaseReports`.
 */
export async function getDiseaseReports(uid) {
    if (!uid) throw new Error("UID is required to get disease reports.");
    try {
        const reportsCol = collection(db, "users", uid, "diseaseReports");
        const snapshot = await getDocs(reportsCol);
        const reports = [];
        snapshot.forEach((docSnap) => {
            reports.push({ id: docSnap.id, ...docSnap.data() });
        });
        return reports;
    } catch (error) {
        throw formatFirestoreError(error);
    }
}

/**
 * Adds a disaster report to `users/{uid}/disasterReports/{reportId}`.
 */
export async function addDisasterReport(uid, reportData = {}) {
    if (!uid) throw new Error("UID is required to add a disaster report.");
    try {
        const reportsCol = collection(db, "users", uid, "disasterReports");
        const payload = {
            farmId: reportData.farmId || "",
            type: reportData.type || "",
            location: reportData.location || "",
            severity: reportData.severity || "Moderate",
            description: reportData.description || "",
            imageUrl: reportData.imageUrl || "",
            createdAt: serverTimestamp()
        };
        const docRef = await addDoc(reportsCol, payload);
        return { id: docRef.id, ...payload };
    } catch (error) {
        throw formatFirestoreError(error);
    }
}

/**
 * Fetches disaster reports from `users/{uid}/disasterReports`.
 */
export async function getDisasterReports(uid) {
    if (!uid) throw new Error("UID is required to get disaster reports.");
    try {
        const reportsCol = collection(db, "users", uid, "disasterReports");
        const snapshot = await getDocs(reportsCol);
        const reports = [];
        snapshot.forEach((docSnap) => {
            reports.push({ id: docSnap.id, ...docSnap.data() });
        });
        return reports;
    } catch (error) {
        throw formatFirestoreError(error);
    }
}
