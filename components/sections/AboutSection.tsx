"use client";

import { usePortfolioContext } from "@/context/PortfolioContext";
import { FadeIn } from "@/components/animations/FadeIn";
import { Code2, Database, Brain, BarChart3, MapPin, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  const { siteConfig } = usePortfolioContext();

  return (
    <section id="about" className="relative bg-slate-100/60 dark:bg-slate-950 py-24 text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn direction="up">
            <span className="font-mono text-xs font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
              // Discover My Background
            </span>
            <h2 className="mt-2 font-sans text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
              About <span className="text-gradient-cyan">Me</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Merging deep software engineering expertise with data analytics and intelligent computational models.
            </p>
          </FadeIn>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Profile Card */}
          <div className="lg:col-span-5">
            <FadeIn direction="right">
              <div className="relative group mx-auto max-w-md">
                {/* Glow Backdrop */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 to-indigo-600 opacity-25 dark:opacity-35 blur-xl group-hover:opacity-50 transition duration-500" />
                
                <div className="relative glass-panel rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 shadow-lg dark:shadow-none space-y-5">
                  {/* Real Profile Image Frame */}
                  <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
                    <Image
                      src={siteConfig.profileImage || "/profile.jpg"}
                      alt={siteConfig.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-mono text-lg font-bold drop-shadow-md">{siteConfig.name}</h3>
                      <p className="font-mono text-xs text-cyan-300 drop-shadow-md">{siteConfig.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-1.5 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-1 text-xs text-slate-700 dark:text-slate-300">
                      <MapPin className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>{siteConfig.location.city}, {siteConfig.location.state}</span>
                    </div>

                    <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
                      Verified Profile
                    </span>
                  </div>

                  {/* Core Focus Tags */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="flex items-center space-x-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 p-2.5 border border-slate-200/80 dark:border-slate-800/80">
                      <Code2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <span className="text-slate-800 dark:text-slate-300">Full Stack Dev</span>
                    </div>
                    <div className="flex items-center space-x-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 p-2.5 border border-slate-200/80 dark:border-slate-800/80">
                      <Brain className="h-4 w-4 text-purple-600 dark:text-purple-400 shrink-0" />
                      <span className="text-slate-800 dark:text-slate-300">AI & ML Solutions</span>
                    </div>
                    <div className="flex items-center space-x-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 p-2.5 border border-slate-200/80 dark:border-slate-800/80">
                      <BarChart3 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="text-slate-800 dark:text-slate-300">Data Analytics & BI</span>
                    </div>
                    <div className="flex items-center space-x-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 p-2.5 border border-slate-200/80 dark:border-slate-800/80">
                      <Database className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="text-slate-800 dark:text-slate-300">SQL & PostgreSQL</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Detailed Narrative & Stats Grid */}
          <div className="lg:col-span-7 space-y-8">
            
            <FadeIn direction="left" delay={0.2}>
              <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {siteConfig.detailedBio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </FadeIn>

            {/* Key Value Points */}
            <FadeIn direction="left" delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    Clean, modular software design with clean architecture & 3NF databases.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    Published peer-reviewed research author in predictive computational models.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    Executive KPI dashboard development with Power BI & Python analytics.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    Biometric face recognition & automated security REST APIs.
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Statistics Cards Grid */}
            <FadeIn direction="up" delay={0.4}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                {siteConfig.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="glass-panel glass-panel-hover rounded-2xl p-4 text-center border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 shadow-sm"
                  >
                    <div className="font-mono text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">
                      {stat.value}
                    </div>
                    <div className="mt-1 font-sans text-xs font-semibold text-slate-900 dark:text-white">
                      {stat.label}
                    </div>
                    <div className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                      {stat.description}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

          </div>

        </div>

      </div>
    </section>
  );
}
