"use client";

import { useState } from "react";
import { usePortfolioContext } from "@/context/PortfolioContext";
import { projectCategories, Project } from "@/data/projects";
import { FadeIn } from "@/components/animations/FadeIn";
import { ExternalLink, Search, Layers, X, Sparkles, CheckCircle2, Info } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectsSection() {
  const { projects } = usePortfolioContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Filter projects dynamically
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="relative bg-slate-100/60 dark:bg-slate-950 py-24 text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <FadeIn direction="up">
            <span className="font-mono text-xs font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
              // Portfolio Showcase
            </span>
            <h2 className="mt-2 font-sans text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
              Featured <span className="text-gradient-cyan">Projects</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Explore full-stack web applications, AI biometric models, business intelligence dashboards, and REST API architectures.
            </p>
          </FadeIn>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Tabs */}
          <div className="flex w-full md:w-auto items-center overflow-x-auto pb-2 md:pb-0 space-x-2 scrollbar-none">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all shrink-0 ${
                  selectedCategory === cat
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/80 py-2 pl-10 pr-4 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-md focus:border-cyan-500 focus:outline-none shadow-sm"
            />
          </div>

        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <FadeIn key={project.id} delay={idx * 0.08} direction="up">
              <div className="group relative flex flex-col h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 glass-panel glass-panel-hover overflow-hidden shadow-sm">
                
                {/* Project Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900 dark:bg-slate-950">
                  <Image
                    src={project.projectImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Status & Featured Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="rounded-full bg-slate-950/80 border border-slate-700/80 px-2.5 py-1 font-mono text-[10px] text-cyan-300 backdrop-blur-md">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="flex items-center space-x-1 rounded-full bg-cyan-500/20 border border-cyan-500/50 px-2.5 py-1 font-mono text-[10px] text-cyan-300 backdrop-blur-md">
                        <Sparkles className="h-3 w-3 text-cyan-400" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col justify-between flex-1 p-6 space-y-4">
                  <div>
                    <h3 className="font-sans text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="rounded-md bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      <Info className="h-3.5 w-3.5" />
                      <span>Details</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub Repository"
                          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                        >
                          <FaGithub className="h-4 w-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live Project Demo"
                          className="inline-flex items-center space-x-1 rounded-lg bg-cyan-500/10 border border-cyan-500/40 px-3 py-1.5 text-xs font-mono font-medium text-cyan-700 dark:text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto text-slate-900 dark:text-slate-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase">
                    {activeModalProject.category} • {activeModalProject.date}
                  </span>
                  <h3 className="mt-1 font-sans text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {activeModalProject.title}
                  </h3>
                </div>

                <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-slate-900 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <Image
                    src={activeModalProject.projectImage}
                    alt={activeModalProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-200">Overview</h4>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeModalProject.detailedDescription}
                  </p>
                </div>

                {activeModalProject.keyFeatures && (
                  <div>
                    <h4 className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-200 mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeModalProject.keyFeatures.map((feat, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-1 font-mono text-xs text-cyan-800 dark:text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-4">
                  {activeModalProject.githubUrl && (
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 px-5 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white"
                    >
                      <FaGithub className="h-4 w-4" />
                      <span>View Code</span>
                    </a>
                  )}
                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 rounded-full bg-cyan-500 px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400 shadow-glow-cyan"
                    >
                      <span>Launch Live Demo</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
