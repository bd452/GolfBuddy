/**
 * Auth middleware - require authenticated user
 * Used in Route Handlers and Server Actions to verify auth tokens
 *
 * IMPORTANT: This module is server-only (uses Firebase Admin SDK)
 */

import "server-only";
import { cookies } from "next/headers";
// import { adminAuth } from "@/lib/firebase/admin";

/**
 * Authenticated user type
 */
export interface AuthenticatedUser {
  uid: string;
  email: string;
  role: "client" | "coach" | "admin";
}

/**
 * Get the current authenticated user (returns null if not authenticated)
 */
export async function getUser(): Promise<AuthenticatedUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie?.value) {
      return null;
    }

    // TODO: Implement when Firebase Admin is configured
    // const decodedToken = await adminAuth.verifySessionCookie(
    //   sessionCookie.value,
    //   true // checkRevoked
    // );
    //
    // // Fetch user profile from Firestore to get role
    // // For now, return basic user info from token
    // return {
    //   uid: decodedToken.uid,
    //   email: decodedToken.email ?? "",
    //   role: (decodedToken.role as AuthenticatedUser["role"]) ?? "client",
    // };

    console.log("getUser placeholder - session cookie present");
    return null;
  } catch (error) {
    console.error("Error verifying session:", error);
    return null;
  }
}

/**
 * Require authenticated user
 * Throws if not authenticated
 */
export async function requireUser(): Promise<AuthenticatedUser> {
  const user = await getUser();

  if (!user) {
    throw new Error("Authentication required");
  }

  return user;
}

