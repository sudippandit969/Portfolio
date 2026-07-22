"use client";

import { usePortfolioContext } from "@/context/PortfolioContext";
import { Typewriter } from "@/components/animations/Typewriter";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { FadeIn } from "@/components/animations/FadeIn";
import { scrollToSection } from "@/lib/utils";
import { Download, ArrowRight, Mail, FileText, ChevronDown, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Image from "next/image";

export function HeroSection() {
  const { siteConfig, socialLinks } = usePortfolioContext();

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Github":
        return <FaGithub className="h-4 w-4" />;
      case "Linkedin":
        return <FaLinkedin className="h-4 w-4" />;
      case "FileText":
        return <FileText className="h-4 w-4" />;
      case "Mail":
        return <Mail className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const nameParts = siteConfig.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 pt-24 pb-16 text-slate-900 dark:text-slate-100 transition-colors duration-300"
    >
      {/* Background canvas particle network */}
      <ParticleBackground />

      {/* Radiant ambient glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[650px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      {/* Giant Background Text */}
      <div className="absolute top-[10vh] left-0 right-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 px-4 text-[16vw] md:text-[13vw] font-black leading-none tracking-tighter">
          <span
            className="text-slate-900 dark:text-white"
            style={{
              WebkitTextFillColor: "transparent",
              WebkitTextStrokeWidth: "6px",
              WebkitTextStrokeColor: "currentColor",
            }}
          >
            {firstName.toUpperCase()}
          </span>
          <span className="text-slate-900 dark:text-white">
            {lastName.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Center Image Cutout */}
      <div className="absolute bottom-[10vh] md:bottom-[15vh] left-1/2 -translate-x-1/2 z-10 w-full max-w-[700px] h-[100vh] flex items-end justify-center pointer-events-none">
        <div className="relative w-full h-full">
          {/* Make sure to replace profile-2.jpg with a transparent PNG cutout of yourself */}
          <Image
            src="/hero-image-1.png"
            alt="Profile"
            fill
            priority
            className="object-contain object-bottom drop-shadow-2xl opacity-90"
          />
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:justify-between h-screen justify-end items-center md:items-end pb-20 md:pb-32 gap-12 md:gap-0 pointer-events-none">

        {/* Left Side Content */}
        <div className="flex flex-col items-start max-w-sm pointer-events-auto">
          <FadeIn delay={0.1} direction="down">
            <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-100/60 dark:bg-cyan-950/40 px-4 py-1.5 backdrop-blur-md mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="font-mono text-xs font-semibold text-cyan-800 dark:text-cyan-300">
                Available for Full-time Roles
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="up">
            <div className="font-sans text-3xl md:text-4xl font-bold mb-3">
              <Typewriter
                key={siteConfig.subtitles.join("-")}
                strings={siteConfig.subtitles}
                typingSpeed={70}
                deletingSpeed={40}
                delayBetween={1800}
                className="text-slate-900 dark:text-white"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.3} direction="up">
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-sans">
              {siteConfig.bio}
            </p>
          </FadeIn>

          <FadeIn delay={0.4} direction="up">
            <button
              onClick={() => scrollToSection("contact")}
              className="group inline-flex items-center space-x-2 rounded-full bg-slate-900 dark:bg-white px-7 py-3.5 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:scale-105 shadow-lg shadow-slate-900/20 dark:shadow-white/20"
            >
              <span>Contact me</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </FadeIn>
        </div>

        {/* Right Side Content */}
        <div className="flex flex-col items-start md:items-end justify-end pointer-events-auto">
          <FadeIn delay={0.5} direction="up" className="flex flex-col gap-3 w-full sm:w-auto">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 hover:-translate-y-0.5 shadow-sm"
              >
                {getSocialIcon(social.icon)}
                <span>{social.name}</span>
              </a>
            ))}

            <button
              onClick={() => scrollToSection("projects")}
              className="flex items-center gap-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 hover:-translate-y-0.5 shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>View Projects</span>
            </button>

            <a
              href={siteConfig.resumeUrl}
              download="Sudip_Pandit_Resume.pdf"
              className="flex items-center gap-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 hover:-translate-y-0.5 shadow-sm"
            >
              <Download className="h-4 w-4" />
              <span>Download Resume</span>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
