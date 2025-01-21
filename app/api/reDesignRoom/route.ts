import { NextResponse } from "next/server";
import Replicate from "replicate";
import cloudinary from "@/cloudinary";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  const { imageUrl, roomType, theme, userQuery } = await req.json();

  try {
    // image and query
    const input = {
      image: imageUrl,
      prompt:
        "A " + roomType + "with a " + theme + "style interior " + userQuery,
    };

    // using model to generate new image
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );

    return NextResponse.json({ result: output });

    // transform user's room

    //convert response url to image and save it

    // save it all to db
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
