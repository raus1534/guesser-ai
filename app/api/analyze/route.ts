import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const googleAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const image = data.get("image") as File;
    const prompt = data.get("prompt") as string;

    if (!image || !prompt) {
      return NextResponse.json(
        { error: "Image and prompt are required" },
        { status: 400 }
      );
    }

    const model = googleAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
    console.log(result);

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Error analyzing image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze image" },
      { status: 500 }
    );
  }
}
