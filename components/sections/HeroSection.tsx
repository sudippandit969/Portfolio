"use client";

import { usePortfolioContext } from "@/context/PortfolioContext";
import { Typewriter } from "@/components/animations/Typewriter";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { FadeIn } from "@/components/animations/FadeIn";
import { scrollToSection } from "@/lib/utils";
import { Download, ArrowRight, Mail, FileText, ChevronDown, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export function HeroSection() {
  const { siteConfig, socialLinks } = usePortfolioContext();

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Github":
        return <FaGithub className="h-5 w-5" />;
      case "Linkedin":
        return <FaLinkedin className="h-5 w-5" />;
      case "FileText":
        return <FileText className="h-5 w-5" />;
      case "Mail":
        return <Mail className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

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

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        
        {/* Status Badge */}
        <FadeIn delay={0.1} direction="down">
          <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-100/60 dark:bg-cyan-950/40 px-4 py-1.5 backdrop-blur-md mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="font-mono text-xs font-semibold text-cyan-800 dark:text-cyan-300">
              Available for Full-time Roles & AI Projects
            </span>
            <Sparkles className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400 ml-1" />
          </div>
        </FadeIn>

        {/* Hero Name */}
        <FadeIn delay={0.2} direction="up">
          <h1 className="font-sans text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
            <span className="text-slate-900 dark:text-white">Hi, I'm </span>
            <span className="text-gradient-cyan">{siteConfig.name}</span>
          </h1>
        </FadeIn>

        {/* Animated Subtitle Typing */}
        <FadeIn delay={0.3} direction="up">
          <div className="mt-4 flex items-center justify-center font-mono text-xl text-slate-700 dark:text-slate-300 sm:text-2xl lg:text-3xl min-h-[40px]">
            <span className="text-slate-500 dark:text-slate-400 mr-2">I am a </span>
            <Typewriter
              key={siteConfig.subtitles.join("-")}
              strings={siteConfig.subtitles}
              typingSpeed={70}
              deletingSpeed={40}
              delayBetween={1800}
              className="text-cyan-600 dark:text-cyan-400 font-semibold"
            />
          </div>
        </FadeIn>

        {/* Short Headline Summary */}
        <FadeIn delay={0.4} direction="up">
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg leading-relaxed font-sans">
            {siteConfig.bio}
          </p>
        </FadeIn>

        {/* CTA Action Buttons */}
        <FadeIn delay={0.5} direction="up">
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={siteConfig.resumeUrl}
              download="Sudip_Pandit_Resume.pdf"
              className="group inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-glow-cyan transition-all hover:scale-105 hover:shadow-cyan-500/25"
            >
              <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => scrollToSection("projects")}
              className="group inline-flex items-center space-x-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-200 backdrop-blur-md shadow-sm transition-all hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 hover:scale-105"
            >
              <span>View Projects</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center space-x-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/40 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Me</span>
            </button>
          </div>
        </FadeIn>

        {/* Social Icons Bar */}
        <FadeIn delay={0.6} direction="up">
          <div className="mt-10 flex items-center justify-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 transition-all hover:border-cyan-500/60 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-cyan-600 dark:hover:text-cyan-400 hover:shadow-glow-cyan hover:-translate-y-1 shadow-sm"
              >
                {getSocialIcon(social.icon)}
              </a>
            ))}
          </div>
        </FadeIn>

        {/* Scroll Down Indicator */}
        <FadeIn delay={0.8} direction="up">
          <button
            onClick={() => scrollToSection("about")}
            className="mt-14 inline-flex flex-col items-center text-slate-400 dark:text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group"
            aria-label="Scroll to About Section"
          >
            <span className="font-mono text-xs tracking-widest uppercase mb-1">Scroll Down</span>
            <ChevronDown className="h-5 w-5 animate-bounce text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400" />
          </button>
        </FadeIn>

      </div>
    </section>
  );
}
