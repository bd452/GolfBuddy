/**
 * Shared types and schemas for GolfBuddy
 * This package provides Zod schemas and TypeScript types that can be used
 * across web and mobile applications to ensure type safety and runtime validation.
 */

// Export all types
export type {
  OrderStatus,
  OrderType,
  CoachingCategory,
  SwingSubCategory,
  ShortGameSubCategory,
  VideoAngle,
  RequiredUpload,
  OrderGoal,
  Order,
  Upload,
  Response,
} from "./types";

// Export all schemas
export {
  orderStatusSchema,
  orderTypeSchema,
  coachingCategorySchema,
  swingSubCategorySchema,
  shortGameSubCategorySchema,
  videoAngleSchema,
  requiredUploadSchema,
  orderGoalSchema,
  orderSchema,
  uploadSchema,
  responseSchema,
} from "./schemas";


