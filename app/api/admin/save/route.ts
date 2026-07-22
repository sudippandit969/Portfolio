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

    const { target, payload } = await req.json();

    if (!target || !payload) {
      return NextResponse.json({ error: "Missing target or payload" }, { status: 400 });
    }

    if (process.env.VERCEL) {
      return NextResponse.json({ success: true, message: "Production mode: Saved in browser session." });
    }

    const dataDir = path.join(process.cwd(), "data");
    let fileName = "";
    let content = "";

    switch (target) {
      case "siteConfig":
        fileName = "siteConfig.ts";
        content = `export interface SiteConfig {
  name: string;
  title: string;
  subtitles: string[];
  bio: string;
  detailedBio: string[];
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  contact: {
    email: string;
    phone?: string;
    locationString: string;
  };
  resumeUrl: string;
  profileImage: string;
  adminPin: string;
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    description: string;
    siteUrl: string;
    ogImage: string;
    keywords: string[];
  };
}

export const siteConfig: SiteConfig = ${JSON.stringify(payload, null, 2)};
`;
        break;

      case "projects":
        fileName = "projects.ts";
        content = `export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  technologies: string[];
  category: "Full Stack" | "AI & Machine Learning" | "Data Analytics & BI" | "Web Applications";
  projectImage: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  status: "Completed" | "Ongoing";
  featured: boolean;
  date: string;
  tags: string[];
  keyFeatures?: string[];
}

export const projectsData: Project[] = ${JSON.stringify(payload, null, 2)};

export const projectCategories = [
  "All",
  "Full Stack",
  "AI & Machine Learning",
  "Data Analytics & BI",
  "Web Applications"
] as const;
`;
        break;

      case "blogs":
        fileName = "blogs.ts";
        content = `export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: "Software Engineering" | "Cloud & DevOps" | "Data Analytics" | "Career & Stories" | "AI Research";
  tags: string[];
  coverImage: string;
  featured: boolean;
  author: string;
}

export const blogsData: BlogPost[] = ${JSON.stringify(payload, null, 2)};

export const blogCategories = [
  "All",
  "Software Engineering",
  "Cloud & DevOps",
  "Data Analytics",
  "Career & Stories",
  "AI Research"
] as const;
`;
        break;

      case "skills":
        fileName = "skills.ts";
        content = `export interface Skill {
  name: string;
  level?: "Expert" | "Advanced" | "Proficient";
  iconName?: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  category: string;
  description: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = ${JSON.stringify(payload, null, 2)};
`;
        break;

      default:
        return NextResponse.json({ error: "Unsupported target file" }, { status: 400 });
    }

    const filePath = path.join(dataDir, fileName);
    fs.writeFileSync(filePath, content, "utf-8");

    return NextResponse.json({ success: true, fileName });
  } catch (error: any) {
    console.error("Failed writing file to disk:", error);
    return NextResponse.json({ error: error?.message || "Failed saving to disk" }, { status: 500 });
  }
}
