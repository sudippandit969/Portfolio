import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";
import fs from "fs";
import path from "path";

const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryUploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

async function uploadToCloudinary(file: File): Promise<string> {
  if (!cloudinaryCloudName || !cloudinaryUploadPreset) {
    throw new Error("Cloudinary is not configured.");
  }

  const uploadForm = new FormData();
  uploadForm.append("file", file);
  uploadForm.append("upload_preset", cloudinaryUploadPreset);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`;
  const response = await fetch(uploadUrl, {
    method: "POST",
    body: uploadForm
  });

  const payload = await response.json();
  if (!response.ok || !payload?.secure_url) {
    const message = payload?.error?.message || "Failed to upload to Cloudinary.";
    throw new Error(message);
  }

  return payload.secure_url as string;
}

export async function POST(req: NextRequest) {
  try {
    const adminPinHeader = req.headers.get("x-admin-pin");
    const adminPin = process.env.ADMIN_PIN || siteConfig.adminPin;
    if (adminPinHeader !== adminPin) {
      return NextResponse.json({ error: "Unauthorized: Invalid Admin PIN" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    if (file.type && !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    // Use Cloudinary for persistent storage when configured.
    if (cloudinaryCloudName && cloudinaryUploadPreset) {
      const cloudUrl = await uploadToCloudinary(file);
      return NextResponse.json({ success: true, url: cloudUrl, provider: "cloudinary" });
    }

    // Prevent non-persistent uploads in Vercel production when Cloudinary is missing.
    if (process.env.VERCEL) {
      return NextResponse.json(
        {
          error: "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET to enable persistent uploads in production."
        },
        { status: 500 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create public/uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Clean file extension and name
    const ext = path.extname(file.name) || ".jpg";
    const cleanFileName = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`;
    const filePath = path.join(uploadsDir, cleanFileName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${cleanFileName}`;
    return NextResponse.json({ success: true, url: publicUrl, provider: "local" });
  } catch (error: any) {
    console.error("Failed uploading image:", error);
    return NextResponse.json({ error: error?.message || "Failed uploading image" }, { status: 500 });
  }
}
