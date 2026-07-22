import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";
import { ensurePortfolioState, PortfolioTarget, savePortfolioTarget } from "@/lib/portfolio-db";

export async function POST(req: NextRequest) {
  try {
    const adminPinHeader = req.headers.get("x-admin-pin");
    const adminPin = process.env.ADMIN_PIN || siteConfig.adminPin;

    if (adminPinHeader !== adminPin) {
      return NextResponse.json({ error: "Unauthorized: Invalid Admin PIN" }, { status: 401 });
    }

    const { target, payload } = await req.json();

    if (!target || !payload) {
      return NextResponse.json({ error: "Missing target or payload" }, { status: 400 });
    }

    const allowedTargets: PortfolioTarget[] = [
      "siteConfig",
      "projects",
      "skills",
      "certificates",
      "research",
      "experience",
      "education",
      "achievements",
      "socialLinks",
      "blogs"
    ];

    if (!allowedTargets.includes(target as PortfolioTarget)) {
      return NextResponse.json({ error: "Unsupported target" }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        success: true,
        target,
        message: "DATABASE_URL not configured. Changes are available in browser session only."
      });
    }

    await ensurePortfolioState();
    const result = await savePortfolioTarget(target as PortfolioTarget, payload);

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error("Failed saving portfolio data:", error);
    return NextResponse.json({ error: error?.message || "Failed saving portfolio data" }, { status: 500 });
  }
}
