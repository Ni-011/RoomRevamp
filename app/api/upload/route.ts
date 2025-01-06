import { NextResponse } from "next/server";
import cloudinary from "@/cloudinary";

export async function POST(req: Request) {
  try {
    // get the image from the form data
    const data = await req.formData();
    const file = data.get("file") as File;

    // check if the file is present
    if (!file) {
      return NextResponse.json({ error: "No file recieved" }, { status: 400 });
    }

    const name = file.name + Date.now() + "_OG.png";

    // upload to cloudinary
    const response = await cloudinary.uploader.upload(name, {
      folder: "roomDesigns",
      resource_type: "auto",
    });

    // return uploaded image url
    return NextResponse.json({ url: response.secure_url });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
