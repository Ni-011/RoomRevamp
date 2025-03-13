import { NextResponse } from "next/server";
import Replicate from "replicate";
import cloudinary from "@/cloudinary";
import { db } from "@/config/db";
import { RoomDesigns } from "@/config/schema";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  const { imageUrl, roomType, theme, userQuery, userEMail } = await req.json();

  // Validate required fields
  if (!imageUrl || !roomType || !theme || !userQuery) {
    return NextResponse.json(
      {
        error:
          "Missing required fields: imageUrl, roomType, theme, and userQuery are required",
      },
      { status: 400 }
    );
  }

  try {
    console.log("Processing request with image URL:", imageUrl);

    // Call Replicate API
    const input = {
      image: imageUrl,
      prompt:
        "A " + roomType + " with a " + theme + " style interior " + userQuery,
    };

    console.log("Calling Replicate with input:", input);

    try {
      /* 
      // Commenting out the entire Replicate API call for testing
      const output = await replicate.run(
        "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
        { input }
      );

      console.log("Replicate response type:", typeof output);
      console.log("Replicate response:", output);

      // Handle the output directly without array check
      let imageUrl;

      // If it's still an array (for safety), take the first item
      if (Array.isArray(output)) {
        console.log("Output is an array with length:", output.length);
        imageUrl = output[0];
      } else {
        // If it's a string (direct URL)
        imageUrl = output;
      }

      if (!imageUrl) {
        throw new Error("No valid image URL in Replicate response");
      }

      console.log("Using image URL:", imageUrl);

      // Convert to base64 and upload to Cloudinary
      try {
        const base64ImageUrl = await ImageToBase64(imageUrl);
        console.log("Base64 conversion completed");

        try {
          const uploadNewImage = await cloudinary.uploader.upload(
            base64ImageUrl,
            {
              folder: "roomDesigns/transformed",
              resource_type: "image",
              format: "jpg",
              quality: "auto",
              fetch_format: "auto",
              public_id: `transformed-${Date.now()}`,
            }
          );

          console.log(
            "Cloudinary upload successful:",
            uploadNewImage.secure_url
          );

          // Save to database
          const dbResult = await db
            .insert(RoomDesigns)
            .values({
              roomType: String(roomType),
              Theme: String(theme),
              userQuery: userQuery,
              ogImageURL: imageUrl,
              transformedImageURL: uploadNewImage.secure_url,
              userEMail: userEMail,
            })
            .returning({
              id: RoomDesigns.id,
            });

          return NextResponse.json({
            result: uploadNewImage.secure_url,
          });
        } catch (cloudinaryError: any) {
          console.error("Cloudinary upload error:", cloudinaryError);
          throw new Error(
            `Cloudinary upload failed: ${cloudinaryError.message}`
          );
        }
      } catch (base64Error: any) {
        console.error("Base64 conversion error:", base64Error);
        throw new Error(`Base64 conversion failed: ${base64Error.message}`);
      }
      */

      // For testing - just log that this route was called and return an error
      console.log(
        "TESTING: reDesignRoom route was called, but Replicate API call is commented out"
      );
      return NextResponse.json(
        { error: "Replicate API call is disabled for testing" },
        { status: 500 }
      );
    } catch (replicateError: any) {
      console.error("Replicate API error:", replicateError);
      throw new Error(`Replicate API failed: ${replicateError.message}`);
    }
  } catch (e: any) {
    console.error("Full error object:", e);
    return NextResponse.json(
      { error: e.message || "An error occurred" },
      { status: 500 }
    );
  }
}

async function ImageToBase64(imageUrl: string) {
  try {
    console.log("Fetching image from URL:", imageUrl);

    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
    }

    const buffer = await response.arrayBuffer();

    if (buffer.byteLength === 0) {
      throw new Error("Received empty image buffer");
    }

    console.log(`Image fetched successfully, size: ${buffer.byteLength} bytes`);

    const base64Raw = Buffer.from(buffer).toString("base64");
    return "data:image/png;base64," + base64Raw;
  } catch (error) {
    console.error("Error in ImageToBase64:", error);
    throw error;
  }
}
