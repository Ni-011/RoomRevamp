import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { RoomDesigns } from "@/config/schema";

export async function POST(req: Request) {
  try {
    const {
      roomType,
      theme,
      userQuery,
      ogImageURL,
      transformedImageURL,
      userEMail,
    } = await req.json();

    // Validate required fields
    if (
      !roomType ||
      !theme ||
      !userQuery ||
      !ogImageURL ||
      !transformedImageURL
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to database
    const dbResult = await db
      .insert(RoomDesigns)
      .values({
        roomType: String(roomType),
        Theme: String(theme),
        userQuery: userQuery,
        ogImageURL: ogImageURL,
        transformedImageURL: transformedImageURL,
        userEMail: userEMail,
      })
      .returning({
        id: RoomDesigns.id,
      });

    return NextResponse.json({
      success: true,
      id: dbResult[0].id,
    });
  } catch (error) {
    console.error("Error saving design:", error);
    return NextResponse.json(
      { error: "Failed to save design" },
      { status: 500 }
    );
  }
}
