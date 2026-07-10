import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json(
        { success: false, message: "UID lipsă." },
        { status: 400 }
      );
    }

    await adminAuth.deleteUser(uid);

    await adminDb.collection("workers").doc(uid).delete();

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}