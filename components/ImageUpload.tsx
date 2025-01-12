import React, { useState, useRef } from "react";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from "@/lib/config";

const ImageUpload = () => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.error("Error uploading file:", error);
  };

  const onSuccess = (res: any) => {
    console.log("File uploaded successfully:", res);
    setFile({ filePath: res.filePath });
  };

  function authenticator(): Promise<{ signature: string; expire: number; token: string; }> {
    throw new Error("Function not implemented.");
  }

  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />
    </ImageKitProvider>
  );
};

export default ImageUpload;
