import { NextResponse } from "next/server";
import { getDefaultPortfolioState, getPortfolioState } from "@/lib/portfolio-db";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, state: getDefaultPortfolioState(), source: "defaults" });
    }

    const state = await getPortfolioState();
    return NextResponse.json({ success: true, state, source: "database" });
  } catch (error: any) {
    console.error("Failed fetching portfolio data:", error);
    return NextResponse.json({ error: error?.message || "Failed to fetch portfolio data" }, { status: 500 });
  }
}
