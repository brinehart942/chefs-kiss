import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import config from "@/lib/config";

const imagekit = new ImageKit({
  publicKey: config.env.imagekit.publicKey,
  urlEndpoint: config.env.imagekit.urlEndpoint,
  privateKey: config.env.imagekit.privateKey,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to ImageKit
    const uploadResult = await imagekit.upload({
      file: buffer,
      fileName: `${Date.now()}-${file.name}`,
      folder: `chefs-kiss/${folder}`,
      useUniqueFileName: true,
    });

    return NextResponse.json({
      url: uploadResult.url,
      fileId: uploadResult.fileId,
    });
  } catch (error) {
    console.error("ImageKit upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file to ImageKit" },
      { status: 500 }
    );
  }
}
