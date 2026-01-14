/**
 * Auth middleware - require admin/coach role
 * Used in admin Route Handlers and Server Actions
 *
 * IMPORTANT: This module should be marked as server-only
 */

import "server-only";
import { requireUser, type AuthenticatedUser } from "./requireUser";

/**
 * Require authenticated user with coach role
 * Throws if not authenticated or not a coach
 */
export async function requireCoach(): Promise<AuthenticatedUser> {
  const user = await requireUser();

  if (user.role !== "coach" && user.role !== "admin") {
    throw new Error("Coach access required");
  }

  return user;
}

/**
 * Require authenticated user with admin role
 * Throws if not authenticated or not an admin
 */
export async function requireAdmin(): Promise<AuthenticatedUser> {
  const user = await requireUser();

  if (user.role !== "admin") {
    throw new Error("Admin access required");
  }

  return user;
}

/**
 * Check if user has admin/coach privileges without throwing
 */
export async function isAdminOrCoach(): Promise<boolean> {
  try {
    await requireCoach();
    return true;
  } catch {
    return false;
  }
}
