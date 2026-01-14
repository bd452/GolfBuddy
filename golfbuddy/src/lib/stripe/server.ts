/**
 * Stripe server-side utilities
 * Used in Route Handlers for checkout sessions and webhooks
 * 
 * Environment variables required:
 * - STRIPE_SECRET_KEY
 * - STRIPE_WEBHOOK_SECRET
 * - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (client-side)
 * - NEXT_PUBLIC_APP_URL (for success/cancel URLs)
 * 
 * IMPORTANT: This module should be marked as server-only
 */

import "server-only";

// TODO: Install stripe package: npm install stripe
// import Stripe from "stripe";

// Placeholder - uncomment when stripe is installed
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2023-10-16",
// });

/**
 * Create a Checkout Session for an order
 */
export async function createCheckoutSession(options: {
  orderId: string;
  priceId: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}) {
  // TODO: Implement when Stripe is configured
  // const session = await stripe.checkout.sessions.create({
  //   mode: "payment",
  //   payment_method_types: ["card"],
  //   line_items: [{ price: options.priceId, quantity: 1 }],
  //   customer_email: options.customerEmail,
  //   success_url: options.successUrl,
  //   cancel_url: options.cancelUrl,
  //   metadata: { orderId: options.orderId },
  // });
  // return session;
  
  console.log("createCheckoutSession placeholder", options);
  return null;
}

/**
 * Verify Stripe webhook signature
 */
export function verifyWebhookSignature(
  _payload: string | Buffer,
  _signature: string
) {
  // TODO: Implement when Stripe is configured
  // return stripe.webhooks.constructEvent(
  //   _payload,
  //   _signature,
  //   process.env.STRIPE_WEBHOOK_SECRET!
  // );
  
  console.log("verifyWebhookSignature placeholder");
  return null;
}
