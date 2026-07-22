"use client";

import { educationData } from "@/data/education";
import { FadeIn } from "@/components/animations/FadeIn";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";

export function EducationSection() {
  return (
    <section id="education" className="relative bg-slate-50 dark:bg-slate-950 py-24 text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn direction="up">
            <span className="font-mono text-xs font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
              // Academic Qualifications
            </span>
            <h2 className="mt-2 font-sans text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
              Education & <span className="text-gradient-cyan">Credentials</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Academic foundation in Computer Science & Engineering, software design principles, and computational analytics.
            </p>
          </FadeIn>
        </div>

        {/* Education Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {educationData.map((edu, idx) => (
            <FadeIn key={edu.id} delay={idx * 0.1} direction="up">
              <div className="glass-panel glass-panel-hover rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 p-6 flex flex-col justify-between h-full space-y-6 shadow-sm">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center space-x-1 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-1 font-mono text-xs text-slate-700 dark:text-slate-300">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-cyan-600 dark:text-cyan-400" />
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans text-xl font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                    <p className="font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-1">{edu.institution}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{edu.fieldOfStudy} • {edu.location}</p>
                  </div>

                  {edu.gradeOrCgpa && (
                    <div className="inline-flex items-center space-x-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-500/40 px-3 py-1 font-mono text-xs text-emerald-800 dark:text-emerald-300">
                      <Award className="h-3.5 w-3.5" />
                      <span>{edu.gradeOrCgpa}</span>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {edu.description}
                  </p>

                  <div>
                    <h4 className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center">
                      <BookOpen className="h-3.5 w-3.5 mr-1.5 text-cyan-600 dark:text-cyan-400" />
                      Key Coursework
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2.5 py-1 font-mono text-[10px] text-slate-700 dark:text-slate-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
