import { NextResponse } from "next/server";
import cloudinary from "@/cloudinary";

export async function POST(req: Request) {
  return NextResponse.json({ result: "hello" });
}
