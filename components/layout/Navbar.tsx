"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { usePortfolioContext } from "@/context/PortfolioContext";
import { scrollToSection } from "@/lib/utils";
import { Menu, X, Download, Code2, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", target: "about" },
  { label: "Skills", target: "skills" },
  { label: "Projects", target: "projects" },
  { label: "Blogs", target: "blogs" },
  { label: "Research", target: "research" },
  { label: "Experience", target: "experience" },
  { label: "Education", target: "education" },
  { label: "Certificates", target: "certificates" },
  { label: "Achievements", target: "achievements" },
  { label: "Contact", target: "contact" }
];

export function Navbar() {
  const { siteConfig, setIsAdminOpen } = usePortfolioContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (targetId: string) => {
    setMobileMenuOpen(false);
    scrollToSection(targetId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 py-3 shadow-sm dark:shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("hero")}
            className="group flex items-center space-x-2 text-left whitespace-nowrap"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 font-mono text-sm font-bold text-white shadow-glow-cyan transition-transform group-hover:scale-105">
              <Code2 className="h-5 w-5" />
            </div>
            <div className="whitespace-nowrap">
              <span className="block whitespace-nowrap font-mono text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                {siteConfig.name}
              </span>
              <span className="block whitespace-nowrap text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                Software & AI Eng.
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 rounded-full border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 px-4 py-1.5 backdrop-blur-md shadow-sm">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2.5">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="group flex h-9 items-center space-x-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all whitespace-nowrap"
              title="Open Admin CMS Dashboard"
            >
              <Settings className="h-3.5 w-3.5 group-hover:rotate-45 transition-transform" />
              <span className="whitespace-nowrap">Admin CMS</span>
            </button>

            <ThemeToggle />

            <a
              href={siteConfig.resumeUrl}
              download="Sudip_Pandit_Resume.pdf"
              className="inline-flex items-center space-x-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-glow-cyan transition-all hover:scale-105 hover:from-cyan-400 hover:to-blue-500"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 p-2 text-cyan-600 dark:text-cyan-400"
              title="Admin CMS"
            >
              <Settings className="h-5 w-5" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-5 shadow-2xl"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => handleNavClick(item.target)}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <a
                  href={siteConfig.resumeUrl}
                  download="Sudip_Pandit_Resume.pdf"
                  className="w-full flex items-center justify-center space-x-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
