/**
 * Auth middleware - require authenticated user
 * Used in Route Handlers and Server Actions to verify authentication
 * 
 * IMPORTANT: This module should be marked as server-only
 */

import "server-only";

export interface AuthenticatedUser {
  uid: string;
  email: string;
  role: "client" | "coach" | "admin";
}

/**
 * Get the current authenticated user from request headers/cookies
 * Throws if not authenticated
 */
export async function requireUser(): Promise<AuthenticatedUser> {
  // TODO: Implement when Firebase Auth is configured
  // 1. Get session token from cookies
  // 2. Verify token with Firebase Admin
  // 3. Get user role from Firestore or custom claims
  // 4. Return user info or throw if not authenticated
  
  throw new Error("Authentication not implemented yet");
}

/**
 * Get the current user without throwing (returns null if not authenticated)
 */
export async function getUser(): Promise<AuthenticatedUser | null> {
  try {
    return await requireUser();
  } catch {
    return null;
  }
}
