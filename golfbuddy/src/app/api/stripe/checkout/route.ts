/**
 * Stripe Checkout API - Create checkout sessions
 * POST /api/stripe/checkout - Create a checkout session for an order
 */

import { NextRequest, NextResponse } from "next/server";
// import { requireUser } from "@/lib/auth/requireUser";
// import { createCheckoutSession } from "@/lib/stripe/server";

export async function POST(request: NextRequest) {
  try {
    // TODO: Implement when Stripe and Firebase are configured
    // const user = await requireUser();
    // const { orderId, priceId } = await request.json();
    //
    // 1. Validate order ownership and status
    // 2. Create Stripe Checkout session
    // 3. Update order with stripeCheckoutSessionId
    // 4. Return session URL

    const body = await request.json();
    console.log("POST /api/stripe/checkout placeholder", body);

    return NextResponse.json({ error: "Not implemented yet" }, { status: 501 });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
