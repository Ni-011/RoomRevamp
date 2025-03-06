import { NextResponse } from "next/server";
import Replicate from "replicate";
import cloudinary from "@/cloudinary";
import { db } from "@/config/db";
import { RoomDesigns } from "@/config/schema";
import { useUser } from "@clerk/nextjs";

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
    // image and query
    const input = {
      image: imageUrl,
      prompt:
        "A " + roomType + " with a " + theme + " style interior " + userQuery,
    };

    // using model to generate new image
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );

    // transform user's room
    const base64ImageUrl = await ImageToBase64(output);

    const uploadNewImage = await cloudinary.uploader.upload(base64ImageUrl, {
      folder: "roomDesigns/transformed",
      resource_type: "image",
      format: "jpg",
      quality: "auto",
      fetch_format: "auto",
      public_id: `transformed-${Date.now()}`,
    });

    // save to db
    const debResult = await db
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

    console.log(debResult);
    return NextResponse.json({
      result: uploadNewImage.secure_url,
    });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}

async function ImageToBase64(imageUrl: any) {
  const response = await fetch(imageUrl); // get the image
  const buffer = await response.arrayBuffer(); // convert to buffer
  const base64Raw = Buffer.from(buffer).toString("base64"); // convert to base64
  return "data:image/png;base64," + base64Raw; // return the base64 string
}
