/**
 * Zod schemas for GolfBuddy domain types
 * These schemas validate and type-check data at runtime
 */

import { z } from "zod";

/**
 * Order status - defines the lifecycle of an order
 */
export const orderStatusSchema = z.enum([
  "draft",
  "awaiting_payment",
  "paid",
  "awaiting_videos",
  "in_review",
  "delivered",
  "cancelled",
  "refunded",
]);

/**
 * Order type
 */
export const orderTypeSchema = z.enum(["async_analysis", "live_lesson"]);

/**
 * Coaching categories
 */
export const coachingCategorySchema = z.enum([
  "swing",
  "short_game",
  "putting",
  "course_management",
]);

/**
 * Swing sub-categories
 */
export const swingSubCategorySchema = z.enum([
  "off_the_tee",
  "approach",
  "both",
]);

/**
 * Short game sub-categories
 */
export const shortGameSubCategorySchema = z.enum([
  "bunker",
  "chipping",
  "pitching",
]);

/**
 * Video angle for uploads
 */
export const videoAngleSchema = z.enum(["face_on", "down_the_line"]);

/**
 * Required upload specification
 */
export const requiredUploadSchema = z.object({
  key: z.string(),
  label: z.string(),
  angle: videoAngleSchema,
  clubOrDistance: z.string().optional(),
});

/**
 * Order goals
 */
export const orderGoalSchema = z.enum([
  "distance",
  "accuracy",
  "consistency",
  "scoring",
]);

/**
 * Order document (Firestore: orders/{orderId})
 */
export const orderSchema = z.object({
  orderId: z.string(),
  clientUid: z.string(),
  type: orderTypeSchema,
  category: coachingCategorySchema,
  subCategory: z
    .union([swingSubCategorySchema, shortGameSubCategorySchema])
    .optional(),
  goals: z.array(orderGoalSchema).optional(),
  description: z.string(),
  status: orderStatusSchema,
  requiredUploads: z.array(requiredUploadSchema),

  // Stripe fields
  stripeCheckoutSessionId: z.string().optional(),
  stripePaymentIntentId: z.string().optional(),
  amountCents: z.number().optional(),
  currency: z.string().optional(),

  // Timestamps (can be Date objects or Firestore Timestamps)
  createdAt: z.union([z.date(), z.any()]),
  updatedAt: z.union([z.date(), z.any()]),
  deliveredAt: z.union([z.date(), z.any()]).optional(),
});

/**
 * Upload metadata (Firestore: orders/{orderId}/uploads/{uploadId})
 */
export const uploadSchema = z.object({
  uploadId: z.string(),
  key: z.string(), // matches RequiredUpload.key
  storagePath: z.string(),
  contentType: z.string(),
  sizeBytes: z.number(),
  uploadedAt: z.union([z.date(), z.any()]),
  originalFilename: z.string().optional(),
});

/**
 * Response video metadata (Firestore: orders/{orderId}/responses/{responseId})
 */
export const responseSchema = z.object({
  responseId: z.string(),
  storagePath: z.string(),
  durationSeconds: z.number().optional(),
  createdByUid: z.string(), // coach/admin who created it
  createdAt: z.union([z.date(), z.any()]),
});


