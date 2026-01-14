/**
 * Auth module barrel export
 */
export { requireUser, getUser, type AuthenticatedUser } from "./requireUser";
export { requireCoach, requireAdmin, isAdminOrCoach } from "./requireAdmin";
