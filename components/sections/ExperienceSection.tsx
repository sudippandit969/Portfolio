"use client";

import { experienceData } from "@/data/experience";
import { FadeIn } from "@/components/animations/FadeIn";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative bg-slate-100/60 dark:bg-slate-950 py-24 text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn direction="up">
            <span className="font-mono text-xs font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
              // Professional Journey
            </span>
            <h2 className="mt-2 font-sans text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
              Work <span className="text-gradient-cyan">Experience</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Track record of building scalable web systems, data pipelines, and analytics solutions.
            </p>
          </FadeIn>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-blue-500 to-slate-300 dark:to-slate-800" />

          <div className="space-y-12">
            {experienceData.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <FadeIn key={exp.id} delay={idx * 0.1} direction={isEven ? "right" : "left"}>
                  <div className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""}`}>
                    
                    {/* Timeline Node Point */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-slate-950 border-2 border-cyan-500 shadow-glow-cyan z-10">
                      <Briefcase className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-10" : "md:pl-10"}`}>
                      <div className="glass-panel glass-panel-hover rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 p-6 space-y-4 shadow-sm">
                        
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-3">
                          <span className="inline-flex items-center space-x-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 font-mono text-[11px] text-cyan-800 dark:text-cyan-300">
                            <Calendar className="h-3 w-3 mr-1" />
                            {exp.startDate} - {exp.endDate}
                          </span>
                          <span className="font-mono text-xs text-slate-500 dark:text-slate-400 flex items-center">
                            <MapPin className="h-3 w-3 mr-1 text-slate-400 dark:text-slate-500" />
                            {exp.location}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-sans text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                          <p className="font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">{exp.company}</p>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {exp.description}
                        </p>

                        <div className="space-y-1.5 pt-2">
                          {exp.responsibilities.map((resp, i) => (
                            <div key={i} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-3">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2.5 py-0.5 font-mono text-[10px] text-slate-700 dark:text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                      </div>
                    </div>

                  </div>
                </FadeIn>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
