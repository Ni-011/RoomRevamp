import { NextResponse } from "next/server";
import cloudinary from "@/cloudinary";

export async function POST(req: Request) {
  try {
    // get the image from the form data
    const data = await req.formData();
    const file = data.get("file") as File;

    // check if the file is present and is an image
    if (!file || !file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Please upload a valid image file" },
        { status: 400 }
      );
    }

    // Convert the file to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert to base64
    const base64String = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64String}`;

    // upload to cloudinary with image-specific optimizations
    const response = await cloudinary.uploader.upload(dataUrl, {
      folder: "roomDesigns",
      resource_type: "image",
      format: "jpg", // Convert all images to jpg for consistency
      quality: "auto", // Automatic quality optimization
      fetch_format: "auto", // Optimize format for each browser
      public_id: `room_${Date.now()}`,
    });

    // return uploaded image url
    return NextResponse.json({
      url: response.secure_url,
      public_id: response.public_id,
      original_filename: file.name,
      format: response.format,
      width: response.width,
      height: response.height,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
