/**
 * @golfbuddy/firebase
 *
 * Firebase client SDK config and initialization.
 * Only import this in client components ("use client").
 */

import FIREBASE_CONFIG from "./constants";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = getApps().length > 0 ? getApp() : initializeApp(FIREBASE_CONFIG);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { app };
