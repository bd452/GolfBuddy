/**
 * Order lifecycle management
 * Handles status transitions and business rules
 */

import "server-only";
import type { OrderStatus } from "./types";

/**
 * Allowed status transitions
 * Maps current status to array of valid next statuses
 */
const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  draft: ["awaiting_payment", "cancelled"],
  awaiting_payment: ["paid", "cancelled"],
  paid: ["awaiting_videos", "refunded"],
  awaiting_videos: ["in_review", "refunded"],
  in_review: ["delivered", "awaiting_videos", "refunded"],
  delivered: ["refunded"],
  cancelled: [],
  refunded: [],
};

/**
 * Check if a status transition is allowed
 */
export function isTransitionAllowed(
  currentStatus: OrderStatus,
  newStatus: OrderStatus
): boolean {
  return ALLOWED_TRANSITIONS[currentStatus]?.includes(newStatus) ?? false;
}

/**
 * Transition an order to a new status
 * Throws if transition is not allowed
 */
export function validateTransition(
  currentStatus: OrderStatus,
  newStatus: OrderStatus
): void {
  if (!isTransitionAllowed(currentStatus, newStatus)) {
    throw new Error(
      `Invalid status transition: ${currentStatus} -> ${newStatus}`
    );
  }
}

/**
 * Get human-friendly status label
 */
export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    draft: "Draft",
    awaiting_payment: "Awaiting Payment",
    paid: "Paid",
    awaiting_videos: "Awaiting Videos",
    in_review: "In Review",
    delivered: "Delivered",
    cancelled: "Cancelled",
    refunded: "Refunded",
  };
  return labels[status] ?? status;
}

/**
 * Get status badge color class
 */
export function getStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    draft: "bg-zinc-100 text-zinc-800",
    awaiting_payment: "bg-yellow-100 text-yellow-800",
    paid: "bg-blue-100 text-blue-800",
    awaiting_videos: "bg-orange-100 text-orange-800",
    in_review: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-zinc-100 text-zinc-800",
    refunded: "bg-red-100 text-red-800",
  };
  return colors[status] ?? "bg-zinc-100 text-zinc-800";
}
