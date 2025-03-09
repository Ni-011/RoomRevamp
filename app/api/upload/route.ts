import { NextResponse } from "next/server";
import cloudinary from "@/cloudinary";

export async function POST(req: Request) {
  try {
    // Check if this is a remote URL upload or a file upload
    const contentType = req.headers.get("content-type");
    console.log("Upload request content-type:", contentType);

    if (contentType?.includes("application/json")) {
      // Handle remote URL upload
      const body = await req.json();
      console.log("Processing remote URL upload:", body);

      const { imageUrl, isRemoteUrl } = body;

      if (!imageUrl || !isRemoteUrl) {
        console.error("Missing imageUrl or isRemoteUrl flag");
        return NextResponse.json(
          { error: "Missing imageUrl or isRemoteUrl flag" },
          { status: 400 }
        );
      }

      try {
        // Upload from URL to Cloudinary
        console.log(
          "Uploading remote URL to Cloudinary:",
          imageUrl.substring(0, 50) + "..."
        );
        const response = await cloudinary.uploader.upload(imageUrl, {
          folder: "roomDesigns/transformed",
          resource_type: "image",
          format: "jpg",
          quality: "auto",
          fetch_format: "auto",
          public_id: `transformed_${Date.now()}`,
        });

        console.log("Cloudinary upload successful:", response.secure_url);
        return NextResponse.json({
          url: response.secure_url,
          public_id: response.public_id,
          format: response.format,
          width: response.width,
          height: response.height,
        });
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        return NextResponse.json(
          { error: "Failed to upload image to Cloudinary" },
          { status: 500 }
        );
      }
    } else {
      // Original file upload code
      console.log("Processing file upload");
      try {
        const data = await req.formData();
        const file = data.get("file") as File;

        if (!file || !file.type.startsWith("image/")) {
          console.error("Invalid file type:", file?.type);
          return NextResponse.json(
            { error: "Please upload a valid image file" },
            { status: 400 }
          );
        }

        console.log("File details:", {
          name: file.name,
          type: file.type,
          size: file.size,
        });

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const base64String = buffer.toString("base64");
        const dataUrl = `data:${file.type};base64,${base64String}`;

        console.log("Uploading file to Cloudinary");
        const response = await cloudinary.uploader.upload(dataUrl, {
          folder: "roomDesigns",
          resource_type: "image",
          format: "jpg",
          quality: "auto",
          fetch_format: "auto",
          public_id: `room_${Date.now()}`,
        });

        console.log("Cloudinary upload successful:", response.secure_url);
        return NextResponse.json({
          url: response.secure_url,
          public_id: response.public_id,
          original_filename: file.name,
          format: response.format,
          width: response.width,
          height: response.height,
        });
      } catch (formDataError) {
        console.error("Form data processing error:", formDataError);
        return NextResponse.json(
          { error: "Failed to process uploaded file" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
