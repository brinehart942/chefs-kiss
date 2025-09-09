"use client";

import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";

import config from "@/lib/config";
import { useRef, useState } from "react";
import { Button } from "./components/ui/button";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Authentication request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string; name: string } | null>(
    null
  );

  const onError = (error: any) => {
    console.log(error);
    toast({
      title: "Image Upload Failed",
      description: `Your image could not be uploaded. Please try again.`,
      variant: "destructive",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: "Image Uploaded Successfully",
      description: `${res.filePath} uploaded successfully!`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        style={{ display: "none" }}
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-file.png"
      />

      <div
        className="form-input flex items-center justify-center cursor-pointer gap-2"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image src="/icons/upload.svg" alt="upload" width={20} height={20} />
        <p className="text-base text-light-100">
          {file ? file.filePath : "Upload File"}
        </p>
      </div>

      {file && (
        <div className="mt-2">
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
            className="rounded"
          />
        </div>
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
