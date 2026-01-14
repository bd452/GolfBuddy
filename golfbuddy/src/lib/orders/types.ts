/**
 * Order-related types and schemas
 * Matches Firestore data model from ARCHITECTURE.md
 */

/**
 * Order status - defines the lifecycle of an order
 */
export type OrderStatus =
  | "draft"
  | "awaiting_payment"
  | "paid"
  | "awaiting_videos"
  | "in_review"
  | "delivered"
  | "cancelled"
  | "refunded";

/**
 * Order type
 */
export type OrderType = "async_analysis" | "live_lesson";

/**
 * Coaching categories
 */
export type CoachingCategory = "swing" | "short_game" | "putting" | "course_management";

/**
 * Swing sub-categories
 */
export type SwingSubCategory = "off_the_tee" | "approach" | "both";

/**
 * Short game sub-categories
 */
export type ShortGameSubCategory = "bunker" | "chipping" | "pitching";

/**
 * Video angle for uploads
 */
export type VideoAngle = "face_on" | "down_the_line";

/**
 * Required upload specification
 */
export interface RequiredUpload {
  key: string;
  label: string;
  angle: VideoAngle;
  clubOrDistance?: string;
}

/**
 * Order goals
 */
export type OrderGoal = "distance" | "accuracy" | "consistency" | "scoring";

/**
 * Order document (Firestore: orders/{orderId})
 */
export interface Order {
  orderId: string;
  clientUid: string;
  type: OrderType;
  category: CoachingCategory;
  subCategory?: SwingSubCategory | ShortGameSubCategory;
  goals?: OrderGoal[];
  description: string;
  status: OrderStatus;
  requiredUploads: RequiredUpload[];
  
  // Stripe fields
  stripeCheckoutSessionId?: string;
  stripePaymentIntentId?: string;
  amountCents?: number;
  currency?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  deliveredAt?: Date;
}

/**
 * Upload metadata (Firestore: orders/{orderId}/uploads/{uploadId})
 */
export interface Upload {
  uploadId: string;
  key: string; // matches RequiredUpload.key
  storagePath: string;
  contentType: string;
  sizeBytes: number;
  uploadedAt: Date;
  originalFilename?: string;
}

/**
 * Response video metadata (Firestore: orders/{orderId}/responses/{responseId})
 */
export interface Response {
  responseId: string;
  storagePath: string;
  durationSeconds?: number;
  createdByUid: string; // coach/admin who created it
  createdAt: Date;
}
