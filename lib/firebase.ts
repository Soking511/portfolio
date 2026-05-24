import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDLfqvbq4LvJZ52M7X9L9vp0bK9fM1aGwo",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "portfolio-6040a.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "portfolio-6040a",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "portfolio-6040a.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "554381798763",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:554381798763:web:87ef0076e2addfec2f302e",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-YZFLN1KTGX",
};

let app: FirebaseApp | undefined;
let db: Firestore | undefined;

// Static export means this only ever runs in the browser. The typeof window
// guard keeps `next build` happy when the file is statically analyzed.
if (typeof window !== "undefined") {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export { app, db };
