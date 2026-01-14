/**
 * Stripe Webhook API - Handle Stripe events
 * POST /api/stripe/webhook - Process Stripe webhook events
 */

import { NextRequest, NextResponse } from "next/server";
// import { verifyWebhookSignature } from "@/lib/stripe";
// import { sendPaymentConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    // TODO: Implement when Stripe is configured
    // const event = verifyWebhookSignature(body, signature);
    // 
    // switch (event.type) {
    //   case "checkout.session.completed":
    //     const session = event.data.object;
    //     const orderId = session.metadata?.orderId;
    //     
    //     // 1. Update order status to "paid" then "awaiting_videos"
    //     // 2. Store Stripe IDs (paymentIntentId, etc.)
    //     // 3. Send confirmation email
    //     break;
    //   
    //   case "payment_intent.succeeded":
    //     // Handle payment success
    //     break;
    //   
    //   default:
    //     console.log(`Unhandled event type: ${event.type}`);
    // }

    console.log("POST /api/stripe/webhook placeholder", { bodyLength: body.length });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
