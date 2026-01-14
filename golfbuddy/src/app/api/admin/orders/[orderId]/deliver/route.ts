/**
 * Admin Deliver API - Mark order as delivered
 * POST /api/admin/orders/[orderId]/deliver - Deliver order and notify client
 */

import { NextRequest, NextResponse } from "next/server";
// import { requireCoach } from "@/lib/auth";
// import { sendDeliveryNotification } from "@/lib/email";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    
    // TODO: Implement when Firebase is configured
    // const user = await requireCoach();
    // const { responseId } = await request.json();
    // 
    // 1. Verify response video exists
    // 2. Update order status to "delivered"
    // 3. Set deliveredAt timestamp
    // 4. Send delivery email to client
    // 5. Log admin action for auditing

    const body = await request.json();
    console.log("POST /api/admin/orders/[orderId]/deliver placeholder", { orderId, body });

    return NextResponse.json(
      { error: "Not implemented yet" },
      { status: 501 }
    );
  } catch (error) {
    console.error("Error delivering order:", error);
    return NextResponse.json(
      { error: "Failed to deliver order" },
      { status: 500 }
    );
  }
}
