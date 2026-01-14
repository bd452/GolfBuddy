/**
 * @golfbuddy/firebase
 *
 * Firebase client SDK - initialized and ready to use.
 *
 * Usage:
 *   import { auth, db, storage } from "@golfbuddy/firebase";
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCd-c_chUusleMxuF1a5XIbt5Q8j5rWQ0s",
  authDomain: "golfbuddy-1573d.firebaseapp.com",
  projectId: "golfbuddy-1573d",
  storageBucket: "golfbuddy-1573d.firebasestorage.app",
  messagingSenderId: "431921370418",
  appId: "1:431921370418:web:4f283ffb72ff4cb3f8332b",
  measurementId: "G-XDFTYZZ2YL",
};

// Initialize or get existing app
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export config and app if needed
export { app, firebaseConfig };
