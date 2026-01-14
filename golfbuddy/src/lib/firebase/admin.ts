/**
 * Firebase Admin SDK initialization
 * Used in server-side code (Route Handlers, Server Actions)
 * 
 * Environment variables required:
 * - FIREBASE_ADMIN_PROJECT_ID
 * - FIREBASE_ADMIN_CLIENT_EMAIL
 * - FIREBASE_ADMIN_PRIVATE_KEY (handle newlines: replace \\n with \n)
 * 
 * IMPORTANT: This module should be marked as server-only
 */

import "server-only";

// TODO: Install firebase-admin package: npm install firebase-admin
// import { initializeApp, getApps, cert } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";
// import { getFirestore } from "firebase-admin/firestore";
// import { getStorage } from "firebase-admin/storage";

const adminConfig = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  // Replace escaped newlines with actual newlines
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

// Placeholder - uncomment when firebase-admin is installed
// const app = getApps().length > 0 
//   ? getApps()[0] 
//   : initializeApp({ credential: cert(adminConfig) });
// 
// export const adminAuth = getAuth(app);
// export const adminDb = getFirestore(app);
// export const adminStorage = getStorage(app);

export { adminConfig };
