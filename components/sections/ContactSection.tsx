"use client";

import { useState, FormEvent } from "react";
import { siteConfig } from "@/data/siteConfig";
import { socialLinks } from "@/data/social";
import { FadeIn } from "@/components/animations/FadeIn";
import { Mail, MapPin, Send, CheckCircle2, Loader2, Sparkles, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import confetti from "canvas-confetti";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Simulate sending email via API / EmailJS
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Trigger confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const getSocialIcon = (name: string) => {
    switch (name) {
      case "GitHub":
        return <FaGithub className="h-4 w-4" />;
      case "LinkedIn":
        return <FaLinkedin className="h-4 w-4" />;
      case "Research Paper":
        return <FileText className="h-4 w-4" />;
      case "Email":
        return <Mail className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  return (
    <section id="contact" className="relative bg-slate-100/60 dark:bg-slate-950 py-24 text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn direction="up">
            <span className="font-mono text-xs font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
              // Get In Touch
            </span>
            <h2 className="mt-2 font-sans text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
              Let's Build <span className="text-gradient-cyan">Together</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Have a project inquiry, software engineering opportunity, or technical question? Drop me a message below.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left Column: Direct Contact Info & Location */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn direction="right">
              <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 space-y-6 shadow-sm">
                
                <h3 className="font-sans text-xl font-bold text-slate-900 dark:text-white">Contact Information</h3>
                
                <div className="space-y-4">
                  {/* Email Card */}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-500/30 text-cyan-700 dark:text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        Direct Email
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {siteConfig.contact.email}
                      </span>
                    </div>
                  </a>

                  {/* Location Card */}
                  <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                    <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-500/30 text-indigo-700 dark:text-indigo-400 shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        Location & Address
                      </span>
                      <p className="font-sans text-xs text-slate-900 dark:text-slate-200 font-medium">
                        {siteConfig.location.address}, {siteConfig.location.state}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        Pincode: {siteConfig.location.pincode}, {siteConfig.location.country}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Connect List */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
                  <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-3">
                    Social Profiles
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all shadow-sm"
                      >
                        {getSocialIcon(social.name)}
                        <span className="font-mono">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </FadeIn>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <FadeIn direction="left">
              <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 shadow-sm">
                
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950 border border-cyan-500/50 text-cyan-600 dark:text-cyan-400 shadow-glow-cyan">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="font-sans text-2xl font-bold text-slate-900 dark:text-white">Message Received!</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out, <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{formData.name}</span>. I will get back to your email ({formData.email}) shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="mt-4 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 px-6 py-2.5 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Your Name <span className="text-cyan-600 dark:text-cyan-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Email Address <span className="text-cyan-600 dark:text-cyan-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="Project Inquiry / Job Opportunity / Collaboration"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Message <span className="text-cyan-600 dark:text-cyan-400">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Describe your project, timeline, or inquiry..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    {errorMessage && (
                      <p className="text-xs font-mono text-red-500">{errorMessage}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 py-3.5 font-mono text-xs sm:text-sm font-semibold text-white shadow-glow-cyan transition-all hover:scale-[1.01] disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                  </form>
                )}

              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
}
