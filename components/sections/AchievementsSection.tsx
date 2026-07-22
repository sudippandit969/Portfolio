"use client";

import { achievementsData } from "@/data/achievements";
import { FadeIn } from "@/components/animations/FadeIn";
import { Trophy, Award, ExternalLink, Sparkles, Star } from "lucide-react";

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative bg-slate-50 dark:bg-slate-950 py-24 text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn direction="up">
            <span className="font-mono text-xs font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
              // Honors & Recognition
            </span>
            <h2 className="mt-2 font-sans text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
              Key <span className="text-gradient-cyan">Achievements</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Awards, publication highlights, competition standings, and technology domain honors.
            </p>
          </FadeIn>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {achievementsData.map((item, idx) => (
            <FadeIn key={item.id} delay={idx * 0.08} direction="up">
              <div className="glass-panel glass-panel-hover rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 p-6 flex flex-col justify-between space-y-4 shadow-sm">
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/50 border border-amber-500/30 text-amber-600 dark:text-amber-400">
                        <Trophy className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                        {item.organization} • {item.date}
                      </span>
                    </div>

                    {item.badgeText && (
                      <span className="inline-flex items-center space-x-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 font-mono text-[10px] text-cyan-800 dark:text-cyan-300">
                        <Sparkles className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                        <span>{item.badgeText}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.link && (
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
                    >
                      <span>View Highlight</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}

              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
