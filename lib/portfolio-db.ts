import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/data/siteConfig";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { certificatesData } from "@/data/certificates";
import { researchData } from "@/data/research";
import { experienceData } from "@/data/experience";
import { educationData } from "@/data/education";
import { achievementsData } from "@/data/achievements";
import { socialLinks } from "@/data/social";
import { blogsData } from "@/data/blogs";

const PORTFOLIO_SINGLETON_ID = 1;

export type PortfolioTarget =
  | "siteConfig"
  | "projects"
  | "skills"
  | "certificates"
  | "research"
  | "experience"
  | "education"
  | "achievements"
  | "socialLinks"
  | "blogs";

export interface PortfolioState {
  siteConfig: unknown;
  projects: unknown;
  skills: unknown;
  certificates: unknown;
  research: unknown;
  experience: unknown;
  education: unknown;
  achievements: unknown;
  socialLinks: unknown;
  blogs: unknown;
}

function toJsonValue(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

export function getDefaultPortfolioState(): PortfolioState {
  return {
    siteConfig,
    projects: projectsData,
    skills: skillsData,
    certificates: certificatesData,
    research: researchData,
    experience: experienceData,
    education: educationData,
    achievements: achievementsData,
    socialLinks,
    blogs: blogsData
  };
}

function toCreateData(state: PortfolioState) {
  return {
    id: PORTFOLIO_SINGLETON_ID,
    siteConfig: toJsonValue(state.siteConfig),
    projects: toJsonValue(state.projects),
    skills: toJsonValue(state.skills),
    certificates: toJsonValue(state.certificates),
    research: toJsonValue(state.research),
    experience: toJsonValue(state.experience),
    education: toJsonValue(state.education),
    achievements: toJsonValue(state.achievements),
    socialLinks: toJsonValue(state.socialLinks),
    blogs: toJsonValue(state.blogs)
  };
}

export async function ensurePortfolioState() {
  const defaults = getDefaultPortfolioState();

  return prisma.portfolioContent.upsert({
    where: { id: PORTFOLIO_SINGLETON_ID },
    update: {},
    create: toCreateData(defaults)
  });
}

export async function getPortfolioState() {
  const row = await ensurePortfolioState();

  return {
    siteConfig: row.siteConfig,
    projects: row.projects,
    skills: row.skills,
    certificates: row.certificates,
    research: row.research,
    experience: row.experience,
    education: row.education,
    achievements: row.achievements,
    socialLinks: row.socialLinks,
    blogs: row.blogs
  };
}

export async function savePortfolioTarget(target: PortfolioTarget, payload: unknown) {
  const data = { [target]: toJsonValue(payload) } as Record<string, Prisma.InputJsonValue>;

  const row = await prisma.portfolioContent.update({
    where: { id: PORTFOLIO_SINGLETON_ID },
    data
  });

  return {
    target,
    updatedAt: row.updatedAt
  };
}
