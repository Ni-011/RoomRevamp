"use server";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("API route hit");

  try {
    const body = await req.json();
    console.log("Received request body:", body);

    const { user } = body;

    if (!user) {
      console.error("No user data received");
      return NextResponse.json({ error: "No user data" }, { status: 400 });
    }

    console.log("Processing user:", user.primaryEmailAddress?.emailAddress);

    // Check for existing user
    const existingUser = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

    console.log("Existing user check result:", existingUser);

    if (existingUser?.length > 0) {
      return NextResponse.json({
        status: "Exists",
        result: existingUser[0],
      });
    }

    // Create new user
    console.log("Creating new user...");
    const newUser = await db
      .insert(Users)
      .values({
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        imageURL: user?.imageUrl,
      })
      .returning();

    console.log("New user created:", newUser[0]);

    return NextResponse.json({
      status: "New user added",
      result: newUser[0],
    });
  } catch (error: any) {
    console.error("API Error:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      details: error,
    });

    return NextResponse.json(
      {
        error: error.message,
        details: error.stack,
      },
      {
        status: 500,
      }
    );
  }
}
