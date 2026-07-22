import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const adminPinHeader = req.headers.get("x-admin-pin");
    if (adminPinHeader !== siteConfig.adminPin) {
      return NextResponse.json({ error: "Unauthorized: Invalid Admin PIN" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
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
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error("Failed uploading image:", error);
    return NextResponse.json({ error: error?.message || "Failed uploading image" }, { status: 500 });
  }
}
