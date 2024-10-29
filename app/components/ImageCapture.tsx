"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

interface ImageCaptureProps {
  onImageCapture: (image: string | null) => void;
}

const ImageCapture: React.FC<ImageCaptureProps> = ({ onImageCapture }) => {
  const [isCamera, setIsCamera] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      onImageCapture(imageSrc);
      setIsCamera(false);
    }
  };

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

  return (
    <div className="space-y-4">
      {isCamera ? (
        <div className="space-y-4">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full max-w-md mx-auto"
          />
          <div className="flex justify-center gap-4">
            <button
              onClick={captureImage}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Capture
            </button>
            <button
              onClick={() => setIsCamera(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => setIsCamera(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Open Camera
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg"
          >
            Upload from Gallery
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCapture;
