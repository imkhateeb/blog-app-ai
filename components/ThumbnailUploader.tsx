"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

const ThumbnailUploader = ({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Preview Image
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const imageUrl = (response.data as { url: string }).url;
        onUpload(imageUrl);
        toast.success("Thumbnail uploaded successfully!");
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Upload failed. Try again.");
      } finally {
        setUploading(false);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 w-full h-40 flex flex-col items-center justify-center 
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-100"
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p className="text-gray-500">Uploading...</p>
        ) : isDragActive ? (
          <p className="text-blue-500">Drop the file here...</p>
        ) : (
          <p className="text-gray-500">
            Drag & drop an image, or click to select
          </p>
        )}
      </div>

      {preview && (
        <div className="relative w-full h-40 border rounded-md overflow-hidden">
          <Image
            src={preview}
            alt="Preview"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default ThumbnailUploader;
