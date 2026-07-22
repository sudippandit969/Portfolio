"use client";

import { useState } from "react";
import { usePortfolioContext } from "@/context/PortfolioContext";
import { FadeIn } from "@/components/animations/FadeIn";
import { BookOpen, ExternalLink, Copy, Check, Sparkles, Award } from "lucide-react";

export function ResearchSection() {
  const { research } = usePortfolioContext();
  const [copied, setCopied] = useState(false);
  const paper = research[0]; // Primary Research Square paper

  const handleCopyCitation = () => {
    if (paper?.citation) {
      navigator.clipboard.writeText(paper.citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!paper) return null;

  return (
    <section id="research" className="relative bg-slate-50 dark:bg-slate-950 py-24 text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn direction="up">
            <span className="font-mono text-xs font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
              // Scientific Publications
            </span>
            <h2 className="mt-2 font-sans text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
              Research & <span className="text-gradient-cyan">Publications</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Peer-reviewed computational research focusing on predictive analytics, machine learning decision models, and data preprocessing.
            </p>
          </FadeIn>
        </div>

        {/* Featured Research Card Spotlight */}
        <FadeIn direction="up" delay={0.2}>
          <div className="relative group max-w-4xl mx-auto">
            
            {/* Ambient Border Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 opacity-20 blur-xl group-hover:opacity-40 transition duration-500" />
            
            <div className="relative glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 space-y-6 shadow-sm">
              
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-500/40 text-cyan-700 dark:text-cyan-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                      {paper.publicationPlatform}
                    </span>
                    <span className="text-xs text-slate-500 ml-2">
                      • {paper.publicationDate}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-500/40 px-3 py-1 font-mono text-xs text-emerald-800 dark:text-emerald-400">
                  <Award className="h-3.5 w-3.5" />
                  <span>{paper.status}</span>
                </div>
              </div>

              {/* Title & Author */}
              <div>
                <h3 className="font-sans text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                  {paper.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-slate-600 dark:text-slate-400">
                  Author: <span className="text-cyan-700 dark:text-cyan-300 font-semibold">{paper.authors.join(", ")}</span>
                </p>
              </div>

              {/* Abstract */}
              <div className="rounded-2xl bg-slate-100/80 dark:bg-slate-950/80 p-5 border border-slate-200 dark:border-slate-800/80">
                <h4 className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Abstract Summary
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {paper.abstract}
                </p>
              </div>

              {/* Key Insights Bullet Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {paper.keyInsights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-2 rounded-xl bg-slate-50 dark:bg-slate-950/40 p-3 border border-slate-200 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </div>
                ))}
              </div>

              {/* Technologies Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {paper.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-1 font-mono text-[11px] text-cyan-800 dark:text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Bottom Actions: Read Paper & Copy Citation */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                {paper.citation && (
                  <button
                    onClick={handleCopyCitation}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 px-4 py-2 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400">Citation Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Citation</span>
                      </>
                    )}
                  </button>
                )}

                <a
                  href={paper.doiOrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-glow-cyan transition-all hover:scale-105"
                >
                  <span>Read Full Paper on Research Square</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>

          </div>
        </FadeIn>

      </div>
    </section>
  );
}
