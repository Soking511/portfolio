import { initializeApp } from "firebase/app";
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

// Initialize Firebase only once
let app;
let db;
let auth;
let analytics = null;

// Initialize on client side only
if (typeof window !== "undefined") {
  try {
    if (!app) {
      app = initializeApp(firebaseConfig);
      // Initialize Firestore with settings that work better in development
      db = getFirestore(app);
      auth = getAuth(app);
      analytics = getAnalytics(app);

      // Log initialization success
      console.log("Firebase initialized successfully");
    }
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
} else {
  // Server-side initialization
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
}

export { app, auth, db, analytics };
