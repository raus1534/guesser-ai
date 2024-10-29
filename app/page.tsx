"use client";

import { useState } from "react";
import ImageCapture from "./components/ImageCapture";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeImage = async (imageData: string) => {
    try {
      setLoading(true);
      const base64Data = imageData.split(",")[1];
      const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(
        (res) => res.blob()
      );

      const formData = new FormData();
      formData.append("image", blob, "image.jpg");

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze image");
      }

      setResult(data.result);
    } catch (error: any) {
      console.error("Error analyzing image:", error);
      setResult(
        `Error: ${
          error.message || "Failed to analyze image. Please try again."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageCapture = async (capturedImage: string | null) => {
    if (capturedImage) {
      setImage(capturedImage);
      await analyzeImage(capturedImage);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Plant Guesser</h1>

        <ImageCapture onImageCapture={handleImageCapture} />

        {image && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Captured Image:</h2>
            <img
              src={image}
              alt="Captured plant"
              className="w-full max-w-md mx-auto rounded-lg"
            />
          </div>
        )}

        {loading && (
          <div className="text-center">
            <p>Analyzing image...</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Analysis Result:</h2>
            <div className="p-4 bg-gray-100 rounded-lg whitespace-pre-wrap">
              {result}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
