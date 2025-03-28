"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@components/Navigation";
import ImageCapture from "@components/ImageCapture";
import { LoadingAnalysis } from "@components/LoadingAnalysis";
import { ResultCard } from "@components/ResultCard";
import { Category } from "@app/types";
import { useCategory } from "./contexts/CategoryContext";

export default function Home() {
  const { activeCategory, setActiveCategory } = useCategory();
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
      formData.append("prompt", activeCategory.prompt);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze image");
      }
      setResult(data.result);
      // eslint-disable-next-line
    } catch (error: any) {
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

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setImage(null);
    setResult(null);
  };

  return (
    <main
      className="min-h-screen transition-colors duration-500 flex flex-col items-center justify-center md:-mt-10"
      style={{
        background: `linear-gradient(to bottom, ${activeCategory.theme.gradient.from}, ${activeCategory.theme.gradient.to})`,
      }}
    >
      <Navigation onCategoryChange={handleCategoryChange} />
      <motion.div
        className="w-full max-w-2xl mx-auto space-y-8 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="text-center space-y-2"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <div className="flex items-center justify-center md:gap-2 gap-1 md:pt-0 pt-2">
            {React.createElement(activeCategory.icon, {
              className: "w-8 h-8 animate-bounce",
              style: { color: activeCategory.theme.primary },
            })}
            <h1 className="md:text-4xl text-3xl font-bold text-gray-800">
              {activeCategory?.name || ""} Identifier
            </h1>
          </div>
          <p className="text-gray-600">
            Upload or take a photo of any{" "}
            {activeCategory?.name?.toLowerCase() || ""} to identify it
          </p>
        </motion.div>
        <ImageCapture onImageCapture={handleImageCapture} />
        {image && (
          <motion.div
            className="space-y-4 p-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-semibold text-gray-800">
              Captured Image:
            </h2>
            <motion.img
              src={image}
              alt={`Captured ${activeCategory?.name.toLowerCase() || ""}`}
              className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            />
          </motion.div>
        )}
        {loading && (
          <LoadingAnalysis
            theme={activeCategory.theme}
            Icon={activeCategory.icon}
          />
        )}
        {result && !loading && (
          <motion.div
            className="space-y-4 p-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-semibold text-gray-800">
              Analysis Result:
            </h2>
            <ResultCard result={result} />
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
