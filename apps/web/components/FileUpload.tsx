"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant?: "light" | "dark";
  onFileChange: (url: string) => void;
  currentFile?: string;
  className?: string;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant = "light",
  onFileChange,
  currentFile,
  className,
}: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentFile || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to ImageKit via API route
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/imagekit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      onFileChange(result.url);
    } catch (error) {
      console.error("Upload error:", error);
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onFileChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {preview ? (
        <div className="relative group">
          <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
            {type === "image" ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={preview}
                className="w-full h-full object-cover"
                controls
              />
            )}
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleClick}
                disabled={isUploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                Replace
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={isUploading}
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className={cn(
            "aspect-video w-full rounded-lg border-2 border-dashed cursor-pointer transition-colors flex flex-col items-center justify-center gap-4",
            variant === "dark"
              ? "border-gray-600 hover:border-gray-500 bg-gray-800"
              : "border-gray-300 hover:border-gray-400 bg-gray-50",
            isUploading && "opacity-50 cursor-not-allowed"
          )}
        >
          {isUploading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          ) : (
            <>
              {type === "image" ? (
                <ImageIcon className="w-12 h-12 text-gray-400" />
              ) : (
                <Upload className="w-12 h-12 text-gray-400" />
              )}
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {placeholder}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Click to upload or drag and drop
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
