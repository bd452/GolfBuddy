/**
 * Upload Initialization API - Prepare for client video uploads
 * POST /api/uploads/init - Get upload authorization and storage paths
 */

import { NextRequest, NextResponse } from "next/server";
// import { requireUser } from "@/lib/auth/requireUser";
// import { validateUploadRequest } from "@/lib/uploads/init";

export async function POST(request: NextRequest) {
  try {
    // TODO: Implement when Firebase is configured
    // const user = await requireUser();
    // const { orderId, uploadKey } = await request.json();
    //
    // const result = await validateUploadRequest({
    //   orderId,
    //   clientUid: user.uid,
    //   uploadKey,
    // });
    //
    // if (!result.allowed) {
    //   return NextResponse.json({ error: result.reason }, { status: 403 });
    // }
    //
    // Return storage path and any signed upload URL if needed

    const body = await request.json();
    console.log("POST /api/uploads/init placeholder", body);

    return NextResponse.json({ error: "Not implemented yet" }, { status: 501 });
  } catch (error) {
    console.error("Error initializing upload:", error);
    return NextResponse.json(
      { error: "Failed to initialize upload" },
      { status: 500 }
    );
  }
}
