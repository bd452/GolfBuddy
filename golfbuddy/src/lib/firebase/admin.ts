/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Firebase Admin SDK (server-only)
 *
 * Usage:
 *   import { getAdminAuth, getAdminDb, getAdminStorage } from "@/lib/firebase/admin";
 *   const auth = getAdminAuth();
 *
 * Requires env vars:
 *   - FIREBASE_ADMIN_CLIENT_EMAIL
 *   - FIREBASE_ADMIN_PRIVATE_KEY
 */

import "server-only";

import type { App } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";
import type { Storage } from "firebase-admin/storage";

// Lazy initialization - nothing runs at module load time
let app: App | null = null;
let initialized = false;

function initializeAdmin(): App | null {
  if (initialized) return app;
  initialized = true;

  // Dynamic imports to avoid top-level side effects
  const { initializeApp, getApps, cert } = require("firebase-admin/app");

  if (getApps().length > 0) {
    app = getApps()[0];
    return app;
  }

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
    return null;
  }

  app = initializeApp({
    credential: cert({
      projectId:
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "golfbuddy-1573d",
      clientEmail,
      privateKey,
    }),
    storageBucket:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
      "golfbuddy-1573d.firebasestorage.app",
  });

  return app;
}

/**
 * Get Firebase Admin Auth instance (lazy initialized)
 */
export function getAdminAuth(): Auth | null {
  const app = initializeAdmin();
  if (!app) return null;
  const { getAuth } = require("firebase-admin/auth");
  return getAuth(app);
}

/**
 * Get Firebase Admin Firestore instance (lazy initialized)
 */
export function getAdminDb(): Firestore | null {
  const app = initializeAdmin();
  if (!app) return null;
  const { getFirestore } = require("firebase-admin/firestore");
  return getFirestore(app);
}

/**
 * Get Firebase Admin Storage instance (lazy initialized)
 */
export function getAdminStorage(): Storage | null {
  const app = initializeAdmin();
  if (!app) return null;
  const { getStorage } = require("firebase-admin/storage");
  return getStorage(app);
}
