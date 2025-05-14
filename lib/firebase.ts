import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDLfqvbq4LvJZ52M7X9L9vp0bK9fM1aGwo",
  authDomain: "portfolio-6040a.firebaseapp.com",
  projectId: "portfolio-6040a",
  storageBucket: "portfolio-6040a.firebasestorage.app",
  messagingSenderId: "554381798763",
  appId: "1:554381798763:web:87ef0076e2addfec2f302e",
  measurementId: "G-YZFLN1KTGX",
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, auth, db, analytics };
