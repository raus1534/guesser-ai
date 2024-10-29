import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const googleAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const image = data.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }
    const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

    // Add this check after getting the image
    if (image.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image size exceeds 4MB limit" },
        { status: 400 }
      );
    }

    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

    // Add this check after getting the image
    if (!ALLOWED_TYPES.includes(image.type)) {
      return NextResponse.json(
        { error: "Invalid image type. Please upload JPEG, PNG, or WebP" },
        { status: 400 }
      );
    }

    // Update to use gemini-1.5-flash model
    const model = googleAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      "Analyze this plant image and provide the following information: 1. Plant name (common and scientific) 2. Brief description 3. Care instructions 4. Interesting facts";

    const imageBytes = await image.arrayBuffer();
    const generationResult = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: Buffer.from(imageBytes).toString("base64"),
          mimeType: image.type,
        },
      },
    ]);

    const result = await generationResult.response.text();

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Error analyzing image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze image" },
      { status: 500 }
    );
  }
}
