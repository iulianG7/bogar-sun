import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, phone, team } = await req.json();
    console.log({
    firstName,
     lastName,
     phone,
     team,
    });

    const email = `${lastName}.${firstName}`.toLowerCase() + "@bogarsun.com";
    console.log(email);
    const password = `${lastName}.${firstName}2026!`;

    console.log("Email:", email);
    console.log("Password:", password);
    const user = await adminAuth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    await adminDb.collection("workers").doc(user.uid).set({
      uid: user.uid,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      phone,
      team,
      email,
      status: "active",
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      email,
      password,
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