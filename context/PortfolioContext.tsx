"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { siteConfig as defaultSiteConfig, SiteConfig } from "@/data/siteConfig";
import { projectsData as defaultProjectsData, Project } from "@/data/projects";
import { skillsData as defaultSkillsData, SkillCategory } from "@/data/skills";
import { certificatesData as defaultCertificatesData, Certificate } from "@/data/certificates";
import { researchData as defaultResearchData, ResearchPaper } from "@/data/research";
import { experienceData as defaultExperienceData, Experience } from "@/data/experience";
import { educationData as defaultEducationData, Education } from "@/data/education";
import { achievementsData as defaultAchievementsData, Achievement } from "@/data/achievements";
import { socialLinks as defaultSocialLinks, SocialLink } from "@/data/social";
import { blogsData as defaultBlogsData, BlogPost } from "@/data/blogs";

interface PortfolioContextType {
  siteConfig: SiteConfig;
  projects: Project[];
  skills: SkillCategory[];
  certificates: Certificate[];
  research: ResearchPaper[];
  experience: Experience[];
  education: Education[];
  achievements: Achievement[];
  socialLinks: SocialLink[];
  blogs: BlogPost[];
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  authenticateAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  updateSiteConfig: (newConfig: SiteConfig) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addBlog: (blog: BlogPost) => void;
  updateBlog: (id: string, updated: Partial<BlogPost>) => void;
  deleteBlog: (id: string) => void;
  addSkill: (categoryId: string, skill: { name: string; level?: "Expert" | "Advanced" | "Proficient"; highlight?: boolean }) => void;
  deleteSkill: (categoryId: string, skillName: string) => void;
  toggleSkillHighlight: (categoryId: string, skillName: string) => void;
  updateCertificates: (certs: Certificate[]) => void;
  updateResearch: (paper: ResearchPaper) => void;
  updateExperience: (exps: Experience[]) => void;
  updateEducation: (edus: Education[]) => void;
  saveToDisk: (target: string, payload: any) => Promise<boolean>;
  resetToDefault: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [projects, setProjects] = useState<Project[]>(defaultProjectsData);
  const [skills, setSkills] = useState<SkillCategory[]>(defaultSkillsData);
  const [certificates, setCertificates] = useState<Certificate[]>(defaultCertificatesData);
  const [research, setResearch] = useState<ResearchPaper[]>(defaultResearchData);
  const [experience, setExperience] = useState<Experience[]>(defaultExperienceData);
  const [education, setEducation] = useState<Education[]>(defaultEducationData);
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievementsData);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(defaultSocialLinks);
  const [blogs, setBlogs] = useState<BlogPost[]>(defaultBlogsData);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load cached state first, then hydrate from API-backed storage.
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const res = await fetch("/api/portfolio", { cache: "no-store" });
        if (!res.ok) return;

        const data = await res.json();
        const state = data?.state;
        if (!state) return;

        if (state.siteConfig) {
          setSiteConfig(state.siteConfig as SiteConfig);
          localStorage.setItem("sp_siteConfig", JSON.stringify(state.siteConfig));
        }
        if (state.projects) {
          setProjects(state.projects as Project[]);
          localStorage.setItem("sp_projects", JSON.stringify(state.projects));
        }
        if (state.skills) {
          setSkills(state.skills as SkillCategory[]);
          localStorage.setItem("sp_skills", JSON.stringify(state.skills));
        }
        if (state.certificates) {
          setCertificates(state.certificates as Certificate[]);
          localStorage.setItem("sp_certificates", JSON.stringify(state.certificates));
        }
        if (state.research) {
          setResearch(state.research as ResearchPaper[]);
          localStorage.setItem("sp_research", JSON.stringify(state.research));
        }
        if (state.experience) {
          setExperience(state.experience as Experience[]);
          localStorage.setItem("sp_experience", JSON.stringify(state.experience));
        }
        if (state.education) {
          setEducation(state.education as Education[]);
          localStorage.setItem("sp_education", JSON.stringify(state.education));
        }
        if (state.achievements) {
          setAchievements(state.achievements as Achievement[]);
          localStorage.setItem("sp_achievements", JSON.stringify(state.achievements));
        }
        if (state.socialLinks) {
          setSocialLinks(state.socialLinks as SocialLink[]);
          localStorage.setItem("sp_socialLinks", JSON.stringify(state.socialLinks));
        }
        if (state.blogs) {
          setBlogs(state.blogs as BlogPost[]);
          localStorage.setItem("sp_blogs", JSON.stringify(state.blogs));
        }
      } catch (error) {
        console.error("Failed to load portfolio data from API", error);
      }
    };

    try {
      const savedConfig = localStorage.getItem("sp_siteConfig");
      if (savedConfig) setSiteConfig(JSON.parse(savedConfig));

      const savedProjects = localStorage.getItem("sp_projects");
      if (savedProjects) setProjects(JSON.parse(savedProjects));

      const savedSkills = localStorage.getItem("sp_skills");
      if (savedSkills) setSkills(JSON.parse(savedSkills));

      const savedCerts = localStorage.getItem("sp_certificates");
      if (savedCerts) setCertificates(JSON.parse(savedCerts));

      const savedResearch = localStorage.getItem("sp_research");
      if (savedResearch) setResearch(JSON.parse(savedResearch));

      const savedExperience = localStorage.getItem("sp_experience");
      if (savedExperience) setExperience(JSON.parse(savedExperience));

      const savedEducation = localStorage.getItem("sp_education");
      if (savedEducation) setEducation(JSON.parse(savedEducation));

      const savedAchievements = localStorage.getItem("sp_achievements");
      if (savedAchievements) setAchievements(JSON.parse(savedAchievements));

      const savedSocialLinks = localStorage.getItem("sp_socialLinks");
      if (savedSocialLinks) setSocialLinks(JSON.parse(savedSocialLinks));

      const savedBlogs = localStorage.getItem("sp_blogs");
      if (savedBlogs) setBlogs(JSON.parse(savedBlogs));

      const savedAuth = localStorage.getItem("sp_admin_auth");
      if (savedAuth === "true") setIsAuthenticated(true);
    } catch (e) {
      console.error("Failed to load saved state from localStorage", e);
    }

    void loadPortfolioData();
  }, []);

  const authenticateAdmin = (pin: string): boolean => {
    if (pin === siteConfig.adminPin) {
      setIsAuthenticated(true);
      localStorage.setItem("sp_admin_auth", "true");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    setIsAdminOpen(false);
    localStorage.removeItem("sp_admin_auth");
  };

  const updateSiteConfig = (newConfig: SiteConfig) => {
    setSiteConfig(newConfig);
    localStorage.setItem("sp_siteConfig", JSON.stringify(newConfig));
  };

  const addProject = (project: Project) => {
    const next = [project, ...projects];
    setProjects(next);
    localStorage.setItem("sp_projects", JSON.stringify(next));
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    const next = projects.map((p) => (p.id === id ? { ...p, ...updated } : p));
    setProjects(next);
    localStorage.setItem("sp_projects", JSON.stringify(next));
  };

  const deleteProject = (id: string) => {
    const next = projects.filter((p) => p.id !== id);
    setProjects(next);
    localStorage.setItem("sp_projects", JSON.stringify(next));
  };

  const addBlog = (blog: BlogPost) => {
    const next = [blog, ...blogs];
    setBlogs(next);
    localStorage.setItem("sp_blogs", JSON.stringify(next));
  };

  const updateBlog = (id: string, updated: Partial<BlogPost>) => {
    const next = blogs.map((b) => (b.id === id ? { ...b, ...updated } : b));
    setBlogs(next);
    localStorage.setItem("sp_blogs", JSON.stringify(next));
  };

  const deleteBlog = (id: string) => {
    const next = blogs.filter((b) => b.id !== id);
    setBlogs(next);
    localStorage.setItem("sp_blogs", JSON.stringify(next));
  };

  const addSkill = (categoryId: string, skill: { name: string; level?: "Expert" | "Advanced" | "Proficient"; highlight?: boolean }) => {
    const next = skills.map((cat) => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          skills: [...cat.skills, skill]
        };
      }
      return cat;
    });
    setSkills(next);
    localStorage.setItem("sp_skills", JSON.stringify(next));
  };

  const deleteSkill = (categoryId: string, skillName: string) => {
    const next = skills.map((cat) => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          skills: cat.skills.filter((s) => s.name !== skillName)
        };
      }
      return cat;
    });
    setSkills(next);
    localStorage.setItem("sp_skills", JSON.stringify(next));
  };

  const toggleSkillHighlight = (categoryId: string, skillName: string) => {
    const next = skills.map((cat) => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          skills: cat.skills.map((s) => (s.name === skillName ? { ...s, highlight: !s.highlight } : s))
        };
      }
      return cat;
    });
    setSkills(next);
    localStorage.setItem("sp_skills", JSON.stringify(next));
  };

  const updateCertificates = (certs: Certificate[]) => {
    setCertificates(certs);
    localStorage.setItem("sp_certificates", JSON.stringify(certs));
  };

  const updateResearch = (paper: ResearchPaper) => {
    const next = [paper];
    setResearch(next);
    localStorage.setItem("sp_research", JSON.stringify(next));
  };

  const updateExperience = (exps: Experience[]) => {
    setExperience(exps);
    localStorage.setItem("sp_experience", JSON.stringify(exps));
  };

  const updateEducation = (edus: Education[]) => {
    setEducation(edus);
    localStorage.setItem("sp_education", JSON.stringify(edus));
  };

  const saveToDisk = async (target: string, payload: any): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": siteConfig.adminPin
        },
        body: JSON.stringify({ target, payload })
      });
      return res.ok;
    } catch (err) {
      console.error("Save to disk failed", err);
      return false;
    }
  };

  const resetToDefault = () => {
    localStorage.clear();
    setSiteConfig(defaultSiteConfig);
    setProjects(defaultProjectsData);
    setSkills(defaultSkillsData);
    setCertificates(defaultCertificatesData);
    setResearch(defaultResearchData);
    setExperience(defaultExperienceData);
    setEducation(defaultEducationData);
    setAchievements(defaultAchievementsData);
    setSocialLinks(defaultSocialLinks);
    setBlogs(defaultBlogsData);
    setIsAuthenticated(false);
  };

  return (
    <PortfolioContext.Provider
      value={{
        siteConfig,
        projects,
        skills,
        certificates,
        research,
        experience,
        education,
        achievements,
        socialLinks,
        blogs,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        authenticateAdmin,
        logoutAdmin,
        updateSiteConfig,
        addProject,
        updateProject,
        deleteProject,
        addBlog,
        updateBlog,
        deleteBlog,
        addSkill,
        deleteSkill,
        toggleSkillHighlight,
        updateCertificates,
        updateResearch,
        updateExperience,
        updateEducation,
        saveToDisk,
        resetToDefault
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioContext() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolioContext must be used within a PortfolioProvider");
  }
  return context;
}
