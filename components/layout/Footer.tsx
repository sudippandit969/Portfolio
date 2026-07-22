"use client";

import { siteConfig } from "@/data/siteConfig";
import { socialLinks } from "@/data/social";
import { scrollToSection } from "@/lib/utils";
import { ArrowUp, FileText, Mail, Heart, Code2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export function Footer() {
  const getIcon = (iconName: string) => {
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
        return <Code2 className="h-4 w-4" />;
    }
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-12 overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-3/4 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-200 dark:border-slate-800/60">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 font-mono text-white text-xs font-bold shadow-glow-cyan">
                SP
              </div>
              <span className="font-mono text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              Senior Software Engineer, AI Developer & Data Analytics Specialist creating high-performance web systems, machine learning models, and executive intelligence dashboards.
            </p>
            <div className="text-xs text-slate-500 font-mono">
              📍 {siteConfig.location.address}, {siteConfig.location.state}, {siteConfig.location.country}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollToSection("about")} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  About Me
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("skills")} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Skills & Expertise
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("projects")} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Featured Projects
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("research")} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Research Papers
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Contact & Hire
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & External Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <span className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">{getIcon(link.icon)}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span className="flex items-center space-x-1">
              <span>Engineered with Next.js & React</span>
            </span>
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center space-x-1 rounded-full border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1 text-slate-700 dark:text-slate-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all shadow-sm"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
