"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "imageUploader";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative size-20">
        <Image src={value} alt="Uploaded file" fill className="rounded-full" />
        <button
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        toast.success("Upload completed successfully!");
        onChange(res?.[0]?.ufsUrl);
      }}
      onUploadError={(error: Error) => {
        toast.error("Upload failed. Please try again.");
        console.error("Upload error:", error);
      }}
    />
  );
};
