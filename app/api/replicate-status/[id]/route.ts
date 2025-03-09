import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const predictionId = params.id;
    if (!predictionId) {
      return NextResponse.json(
        { error: "Prediction ID is required" },
        { status: 400 }
      );
    }

    const apiToken = process.env.REPLICATE_API_TOKEN;
    console.log("API Token:", apiToken);
    if (!apiToken) {
      console.error("REPLICATE_API_TOKEN is not set");
      return NextResponse.json(
        { error: "Server configuration error: API token is missing" },
        { status: 500 }
      );
    }

    // Log token format (first few characters only)
    console.log("Token format check:", {
      length: apiToken.length,
      startsWith: apiToken.substring(0, 3),
      isDefined: !!apiToken,
    });

    try {
      // Try raw API call first
      const response = await fetch(
        `https://api.replicate.com/v1/predictions/${predictionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${apiToken}`, // Changed from Bearer to Token
          },
        }
      );

      const data = await response.json();
      console.log("Prediction status response:", {
        status: response.status,
        ok: response.ok,
        headers: Object.fromEntries(response.headers),
      });

      if (!response.ok) {
        throw new Error(
          `Status check failed: ${data.detail || "Unknown error"}`
        );
      }

      return NextResponse.json(data);
    } catch (error: any) {
      console.error("Full error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      return NextResponse.json(
        {
          error: error.message || "Failed to check prediction status",
          detail: error.response?.data?.detail || error.message,
          timestamp: new Date().toISOString(),
        },
        { status: error.response?.status || 500 }
      );
    }
  } catch (error: any) {
    console.error("Error checking prediction:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to check prediction status",
        timestamp: new Date().toISOString(),
      },
      { status: error.status || 500 }
    );
  }
}
