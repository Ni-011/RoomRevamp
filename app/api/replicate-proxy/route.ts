import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req: Request) {
  try {
    const requestData = await req.json();

    if (!requestData.input?.image || !requestData.input?.prompt) {
      return NextResponse.json(
        {
          error: "Missing required input fields: image and prompt are required",
        },
        { status: 400 }
      );
    }

    const apiToken = process.env.REPLICATE_API_TOKEN;
    if (!apiToken) {
      console.error("REPLICATE_API_TOKEN is not set");
      return NextResponse.json(
        { error: "Server configuration error: API token is missing" },
        { status: 500 }
      );
    }

    // First, check if we can access the model and get available versions
    try {
      const modelResponse = await fetch(
        "https://api.replicate.com/v1/models/adirik/interior-design",
        {
          headers: {
            Authorization: `Token ${apiToken}`,
          },
        }
      );

      const modelData = await modelResponse.json();
      console.log("Model data:", {
        status: modelResponse.status,
        versions: modelData.versions?.length,
        latestVersion: modelData.latest_version?.id,
      });

      if (!modelResponse.ok) {
        throw new Error(
          `Model access error: ${modelData.detail || "Unknown error"}`
        );
      }

      // Use the latest version from the API response
      const modelVersion = modelData.latest_version?.id;
      if (!modelVersion) {
        throw new Error("No available versions for this model");
      }

      // Create prediction with the latest version
      const replicate = new Replicate({ auth: apiToken });
      const prediction = await replicate.predictions.create({
        version: modelVersion,
        input: {
          image: requestData.input.image,
          prompt: requestData.input.prompt,
          guidance_scale: requestData.input.guidance_scale || 15,
          negative_prompt:
            requestData.input.negative_prompt ||
            "lowres, watermark, banner, logo, watermark, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly, upholstered walls, fabric walls, plush walls, mirror, mirrored, functional, realistic",
          prompt_strength: requestData.input.prompt_strength || 0.8,
          num_inference_steps: requestData.input.num_inference_steps || 50,
        },
      });

      console.log("Prediction created:", {
        id: prediction.id,
        status: prediction.status,
        version: modelVersion,
      });

      return NextResponse.json(prediction);
    } catch (error: any) {
      console.error("Full error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      return NextResponse.json(
        {
          error: error.message || "Failed to create prediction",
          detail: error.response?.data?.detail || error.message,
          timestamp: new Date().toISOString(),
        },
        { status: error.response?.status || 500 }
      );
    }
  } catch (error: any) {
    console.error("Outer error:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
