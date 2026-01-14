/**
 * Orders API - Create and list orders
 * POST /api/orders - Create a new order
 * GET /api/orders - List user's orders
 */

import { NextRequest, NextResponse } from "next/server";
// import { requireUser } from "@/lib/auth";
// import { getRequiredUploads } from "@/lib/orders";

export async function POST(request: NextRequest) {
  try {
    // TODO: Implement when Firebase is configured
    // const user = await requireUser();
    // const body = await request.json();
    // 
    // const order = {
    //   orderId: crypto.randomUUID(),
    //   clientUid: user.uid,
    //   type: body.type,
    //   category: body.category,
    //   subCategory: body.subCategory,
    //   description: body.description,
    //   goals: body.goals,
    //   status: "draft",
    //   requiredUploads: getRequiredUploads(body.category, body.subCategory),
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // };
    // 
    // Save to Firestore
    // Return order

    const body = await request.json();
    console.log("POST /api/orders placeholder", body);
    
    return NextResponse.json(
      { error: "Not implemented yet" },
      { status: 501 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // TODO: Implement when Firebase is configured
    // const user = await requireUser();
    // Query Firestore for user's orders
    // Return orders list

    return NextResponse.json(
      { error: "Not implemented yet" },
      { status: 501 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
