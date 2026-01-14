/**
 * Email sending utilities using Resend
 *
 * Environment variables required:
 * - RESEND_API_KEY
 * - EMAIL_FROM
 *
 * IMPORTANT: This module should be marked as server-only
 */

import "server-only";

// TODO: Install resend package: npm install resend
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email via Resend
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  // TODO: Implement when Resend is configured
  // await resend.emails.send({
  //   from: process.env.EMAIL_FROM!,
  //   to: options.to,
  //   subject: options.subject,
  //   html: options.html,
  //   text: options.text,
  // });

  console.log("sendEmail placeholder", options);
}

/**
 * Send payment confirmation email
 */
export async function sendPaymentConfirmation(options: {
  to: string;
  orderType: string;
  orderId: string;
}): Promise<void> {
  await sendEmail({
    to: options.to,
    subject: "Payment Confirmed - GolfBuddy",
    html: `
      <h1>Payment Confirmed!</h1>
      <p>Thank you for your ${options.orderType} order.</p>
      <p>Order ID: ${options.orderId}</p>
      <h2>What happens next:</h2>
      <ol>
        <li>Upload your videos following the checklist in your dashboard</li>
        <li>We'll review your swing within 48 hours of receiving all videos</li>
        <li>You'll receive an email when your analysis is ready</li>
      </ol>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">Go to Dashboard</a></p>
    `,
  });
}

/**
 * Send delivery notification email
 */
export async function sendDeliveryNotification(options: {
  to: string;
  orderId: string;
}): Promise<void> {
  await sendEmail({
    to: options.to,
    subject: "Your Golf Analysis is Ready! - GolfBuddy",
    html: `
      <h1>Your Analysis is Ready!</h1>
      <p>Great news! Your personalized golf analysis video is now available.</p>
      <p>Log in to your dashboard to watch your analysis and access your practice drills.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/orders/${options.orderId}">View Your Analysis</a></p>
    `,
  });
}
