"use client";

import { usePortfolioContext } from "@/context/PortfolioContext";
import { FadeIn } from "@/components/animations/FadeIn";
import { Award, ExternalLink, Download, ShieldCheck } from "lucide-react";
import Image from "next/image";

export function CertificatesSection() {
  const { certificates } = usePortfolioContext();

  return (
    <section id="certificates" className="relative bg-slate-100/60 dark:bg-slate-950 py-24 text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn direction="up">
            <span className="font-mono text-xs font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
              // Industry Credentials
            </span>
            <h2 className="mt-2 font-sans text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
              Certifications & <span className="text-gradient-cyan">Badges</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Verified certifications in Cloud Infrastructure, Python Data Science, Django Web Architecture, and Power BI Business Intelligence.
            </p>
          </FadeIn>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, idx) => (
            <FadeIn key={cert.id} delay={idx * 0.08} direction="up">
              <div className="glass-panel glass-panel-hover rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/60 p-6 flex flex-col justify-between h-full space-y-5 shadow-sm">
                
                <div className="space-y-4">
                  {/* Thumbnail / Header */}
                  <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-900 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <Image
                      src={cert.certificateImage}
                      alt={cert.title}
                      fill
                      className="object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 rounded-full bg-slate-950/80 border border-slate-700/80 px-3 py-1 font-mono text-[10px] text-cyan-300 backdrop-blur-md">
                      <ShieldCheck className="h-3 w-3 text-cyan-400" />
                      <span>{cert.issuingOrganization}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Issued: {cert.date} {cert.credentialId && `• ID: ${cert.credentialId}`}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsLearned.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-800 dark:text-slate-300 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Link Buttons */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                  {cert.verificationLink ? (
                    <a
                      href={cert.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
                    >
                      <Award className="h-3.5 w-3.5" />
                      <span>Verify Credential</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">Verified Certificate</span>
                  )}

                  {cert.pdfLink && (
                    <a
                      href={cert.pdfLink}
                      download
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      aria-label="Download Certificate PDF"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  )}
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
