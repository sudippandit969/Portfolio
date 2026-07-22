import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <BlogSection />
      <ResearchSection />
      <ExperienceSection />
      <EducationSection />
      <CertificatesSection />
      <AchievementsSection />
      <ContactSection />
    </div>
  );
}
