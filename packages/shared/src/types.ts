/**
 * TypeScript types inferred from Zod schemas
 * These types can be used for compile-time type checking
 */

import { z } from "zod";
import {
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

/**
 * Order status - defines the lifecycle of an order
 */
export type OrderStatus = z.infer<typeof orderStatusSchema>;

/**
 * Order type
 */
export type OrderType = z.infer<typeof orderTypeSchema>;

/**
 * Coaching categories
 */
export type CoachingCategory = z.infer<typeof coachingCategorySchema>;

/**
 * Swing sub-categories
 */
export type SwingSubCategory = z.infer<typeof swingSubCategorySchema>;

/**
 * Short game sub-categories
 */
export type ShortGameSubCategory = z.infer<typeof shortGameSubCategorySchema>;

/**
 * Video angle for uploads
 */
export type VideoAngle = z.infer<typeof videoAngleSchema>;

/**
 * Required upload specification
 */
export type RequiredUpload = z.infer<typeof requiredUploadSchema>;

/**
 * Order goals
 */
export type OrderGoal = z.infer<typeof orderGoalSchema>;

/**
 * Order document (Firestore: orders/{orderId})
 */
export type Order = z.infer<typeof orderSchema>;

/**
 * Upload metadata (Firestore: orders/{orderId}/uploads/{uploadId})
 */
export type Upload = z.infer<typeof uploadSchema>;

/**
 * Response video metadata (Firestore: orders/{orderId}/responses/{responseId})
 */
export type Response = z.infer<typeof responseSchema>;

