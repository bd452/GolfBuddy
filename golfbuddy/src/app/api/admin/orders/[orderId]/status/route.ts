/**
 * Admin Order Status API - Update order status
 * POST /api/admin/orders/[orderId]/status - Update order status (admin only)
 */

import { NextRequest, NextResponse } from "next/server";
// import { requireCoach } from "@/lib/auth";
// import { validateTransition } from "@/lib/orders";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    // TODO: Implement when Firebase is configured
    // const user = await requireCoach();
    // const { newStatus } = await request.json();
    //
    // 1. Fetch order from Firestore
    // 2. Validate transition is allowed
    // 3. Update order status
    // 4. Log admin action for auditing

    const body = await request.json();
    console.log("POST /api/admin/orders/[orderId]/status placeholder", {
      orderId,
      body,
    });

    return NextResponse.json({ error: "Not implemented yet" }, { status: 501 });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
