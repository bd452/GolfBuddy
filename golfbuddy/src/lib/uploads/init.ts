/**
 * Upload initialization and validation
 * Server-side logic for managing client video uploads
 */

import "server-only";
import type { OrderStatus } from "@golfbuddy/shared/types";

/**
 * Upload-allowed order statuses
 */
const UPLOAD_ALLOWED_STATUSES: OrderStatus[] = ["paid", "awaiting_videos"];

/**
 * Check if uploads are allowed for a given order status
 */
export function isUploadAllowed(status: OrderStatus): boolean {
  return UPLOAD_ALLOWED_STATUSES.includes(status);
}

/**
 * Generate canonical storage path for client upload
 */
export function getUploadStoragePath(
  clientUid: string,
  orderId: string,
  uploadId: string
): string {
  return `client-uploads/${clientUid}/${orderId}/${uploadId}.mp4`;
}

/**
 * Generate canonical storage path for coach response
 */
export function getResponseStoragePath(
  orderId: string,
  responseId: string
): string {
  return `coach-responses/${orderId}/${responseId}.mp4`;
}

/**
 * Validate upload request
 * Returns true if the user is allowed to upload to the specified order
 */
export async function validateUploadRequest(options: {
  orderId: string;
  clientUid: string;
  uploadKey: string;
}): Promise<{ allowed: boolean; reason?: string; storagePath?: string }> {
  // TODO: Implement when Firebase is configured
  // 1. Fetch order from Firestore
  // 2. Verify order.clientUid === options.clientUid
  // 3. Verify order.status allows uploads
  // 4. Verify uploadKey is in order.requiredUploads
  // 5. Return storage path if allowed

  console.log("validateUploadRequest placeholder", options);
  return { allowed: false, reason: "Not implemented yet" };
}
