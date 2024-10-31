"use client";

import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";
import { Camera, Upload, X, SwitchCamera } from "lucide-react";
import { ImageCaptureProps } from "../types";
import { useCategory } from "../contexts/CategoryContext";

const ImageCapture: React.FC<ImageCaptureProps> = ({ onImageCapture }) => {
  const { activeCategory } = useCategory();
  const [isCamera, setIsCamera] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      onImageCapture(imageSrc);
      setIsCamera(false);
    }
  }, [onImageCapture]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageCapture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleCameraMode = useCallback(() => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-2"
    >
      {isCamera ? (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="space-y-4"
        >
          <div className="relative">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: facingMode,
              }}
              className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCamera(false)}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full"
            >
              <X className="w-6 h-6 text-gray-700" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleCameraMode}
              className="absolute top-4 left-4 p-2 bg-white/80 rounded-full"
            >
              <SwitchCamera className="w-6 h-6 text-gray-700" />
            </motion.button>
          </div>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={captureImage}
              className="px-6 py-3 text-white rounded-full font-medium shadow-lg flex items-center gap-2"
              style={{ backgroundColor: activeCategory.theme.primary }}
            >
              <Camera className="w-5 h-5" />
              Capture
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCamera(true)}
            className="px-6 py-3 text-white rounded-full font-medium shadow-lg flex items-center gap-2"
            style={{ backgroundColor: activeCategory.theme.primary }}
          >
            <Camera className="w-5 h-5" />
            Open Camera
          </motion.button>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 rounded-full font-medium shadow-lg flex items-center gap-2"
            style={{
              backgroundColor: "white",
              color: activeCategory.theme.primary,
              border: `2px solid ${activeCategory.theme.primary}`,
            }}
          >
            <Upload className="w-5 h-5" />
            Upload from Gallery
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default ImageCapture;
