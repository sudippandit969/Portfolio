"use client";

import { useState } from "react";
import { usePortfolioContext } from "@/context/PortfolioContext";
import { blogCategories, BlogPost } from "@/data/blogs";
import { FadeIn } from "@/components/animations/FadeIn";
import { Search, Clock, Calendar, ArrowRight, X, BookOpen, Share2, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function BlogSection() {
  const { blogs } = usePortfolioContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredBlogs = blogs.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleShareArticle = (post: BlogPost) => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="blogs" className="relative bg-slate-50 dark:bg-slate-950 py-24 text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <FadeIn direction="up">
            <span className="font-mono text-xs font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
              // Engineering Thoughts & Stories
            </span>
            <h2 className="mt-2 font-sans text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
              Blog & <span className="text-gradient-cyan">Experiences</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Personal reflections, technical breakdowns, career learnings, and insights on full-stack development, Python, AWS Cloud, and AI.
            </p>
          </FadeIn>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Tabs */}
          <div className="flex w-full md:w-auto items-center overflow-x-auto pb-2 md:pb-0 space-x-2 scrollbar-none">
            {blogCategories.map((cat) => (
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
              placeholder="Search articles or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/80 py-2 pl-10 pr-4 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-md focus:border-cyan-500 focus:outline-none shadow-sm"
            />
          </div>

        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((post, idx) => (
            <FadeIn key={post.id} delay={idx * 0.08} direction="up">
              <div
                onClick={() => setActiveArticle(post)}
                className="group relative flex flex-col h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 glass-panel glass-panel-hover overflow-hidden cursor-pointer shadow-sm"
              >
                {/* Cover Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <span className="rounded-full bg-slate-950/80 border border-slate-700/80 px-2.5 py-1 font-mono text-[10px] text-cyan-300 backdrop-blur-md">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="flex items-center space-x-1 rounded-full bg-cyan-500/20 border border-cyan-500/50 px-2.5 py-1 font-mono text-[10px] text-cyan-300 backdrop-blur-md">
                        <Sparkles className="h-3 w-3 text-cyan-400" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Article Card Body */}
                <div className="flex flex-col justify-between flex-1 p-6 space-y-4">
                  <div>
                    <div className="flex items-center space-x-3 font-mono text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-cyan-500" />
                        <span>{post.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-cyan-500" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Tags & Action Link */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center space-x-1 font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
                      <span>Read Story</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>

                </div>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Reader Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto text-slate-900 dark:text-slate-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-3 font-mono text-xs text-cyan-600 dark:text-cyan-400 uppercase font-semibold mb-1">
                    <span>{activeArticle.category}</span>
                    <span>•</span>
                    <span>{activeArticle.date}</span>
                    <span>•</span>
                    <span>{activeArticle.readTime}</span>
                  </div>
                  <h2 className="font-sans text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {activeArticle.title}
                  </h2>
                </div>

                <div className="relative h-72 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <Image
                    src={activeArticle.coverImage}
                    alt={activeArticle.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Article Content Render */}
                <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-sans whitespace-pre-line">
                  {activeArticle.content}
                </div>

                {/* Article Tags & Footer */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {activeArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2.5 py-1 font-mono text-xs text-slate-700 dark:text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleShareArticle(activeArticle)}
                    className="inline-flex items-center space-x-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 px-4 py-2 font-mono text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>{copiedLink ? "Link Copied!" : "Share Article"}</span>
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
