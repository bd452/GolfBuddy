/**
 * Firebase Admin SDK (server-only)
 *
 * Usage:
 *   import { adminAuth, adminDb, adminStorage } from "@/lib/firebase/admin";
 *
 * Requires env vars:
 *   - FIREBASE_ADMIN_CLIENT_EMAIL
 *   - FIREBASE_ADMIN_PRIVATE_KEY
 */

import "server-only";

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

// Inlined to avoid potential package resolution issues
const PROJECT_ID = "golfbuddy-1573d";
const STORAGE_BUCKET = "golfbuddy-1573d.firebasestorage.app";

// Initialize Admin SDK
if (getApps().length === 0) {
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );

  if (!clientEmail || !privateKey) {
    console.warn(
      "Firebase Admin credentials not set. " +
        "Set FIREBASE_ADMIN_CLIENT_EMAIL and FIREBASE_ADMIN_PRIVATE_KEY."
    );
  } else {
    initializeApp({
      credential: cert({
        projectId: PROJECT_ID,
        clientEmail,
        privateKey,
      }),
      storageBucket: STORAGE_BUCKET,
    });
  }
}

// Export services (will throw if not initialized - that's fine)
export const adminAuth = getApps().length > 0 ? getAuth() : null;
export const adminDb = getApps().length > 0 ? getFirestore() : null;
export const adminStorage = getApps().length > 0 ? getStorage() : null;
