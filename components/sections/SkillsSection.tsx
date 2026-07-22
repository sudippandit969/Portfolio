"use client";

import { useState } from "react";
import { usePortfolioContext } from "@/context/PortfolioContext";
import { SkillCategory } from "@/data/skills";
import { FadeIn } from "@/components/animations/FadeIn";
import { Search, ChevronDown, ChevronUp, Sparkles, Code, Cpu, Database, BarChart, Layers, Terminal, BookOpen, Brain } from "lucide-react";

export function SkillsSection() {
  const { skills } = usePortfolioContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategoryCollapse = (categoryId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "programming-languages":
        return <Terminal className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />;
      case "frontend-development":
        return <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case "backend-development":
        return <Cpu className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
      case "databases":
        return <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      case "data-analytics":
        return <BarChart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case "business-intelligence":
        return <Layers className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      case "machine-learning-ai":
        return <Brain className="h-5 w-5 text-pink-600 dark:text-pink-400" />;
      default:
        return <BookOpen className="h-5 w-5 text-slate-500 dark:text-slate-400" />;
    }
  };

  // Filter skills based on search & category
  const filteredCategories: SkillCategory[] = skills
    .map((cat) => {
      const matchesCategory = selectedCategory === "All" || cat.category === selectedCategory;
      const matchingSkills = cat.skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (!matchesCategory) return null;
      if (searchQuery && matchingSkills.length === 0) return null;

      return {
        ...cat,
        skills: searchQuery ? matchingSkills : cat.skills
      };
    })
    .filter(Boolean) as SkillCategory[];

  return (
    <section id="skills" className="relative bg-slate-50 dark:bg-slate-950 py-24 text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <FadeIn direction="up">
            <span className="font-mono text-xs font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
              // Technical Ecosystem
            </span>
            <h2 className="mt-2 font-sans text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
              Skills & <span className="text-gradient-cyan">Proficiencies</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Explore categories covering Software Engineering, Data Analytics, BI, Machine Learning, and Computer Science fundamentals.
            </p>
          </FadeIn>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search skills (e.g., Python, Power BI, Django)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/80 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-md focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm"
            />
          </div>

          {/* Category Dropdown/Tabs Quick Selection */}
          <div className="flex w-full md:w-auto items-center overflow-x-auto pb-2 md:pb-0 space-x-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shrink-0 ${
                selectedCategory === "All"
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-sm"
              }`}
            >
              All ({skills.length})
            </button>
            {skills.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shrink-0 ${
                  selectedCategory === cat.category
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-sm"
                }`}
              >
                {cat.category.split(" ")[0]}
              </button>
            ))}
          </div>

        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, idx) => {
            const isCollapsed = collapsedCategories[category.id];

            return (
              <FadeIn key={category.id} delay={idx * 0.05} direction="up">
                <div className="glass-panel glass-panel-hover rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 p-5 flex flex-col justify-between shadow-sm">
                  
                  {/* Category Header */}
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800/80">
                      <div className="flex items-center space-x-2.5">
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                          {getCategoryIcon(category.id)}
                        </div>
                        <div>
                          <h3 className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                            {category.category}
                          </h3>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                            {category.skills.length} skills
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleCategoryCollapse(category.id)}
                        className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        aria-label="Toggle category view"
                      >
                        {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                      </button>
                    </div>

                    <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed min-h-[32px]">
                      {category.description}
                    </p>

                    {/* Skill Badges */}
                    {!isCollapsed && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className={`group relative flex items-center space-x-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-all ${
                              skill.highlight
                                ? "bg-cyan-100/90 dark:bg-cyan-950/40 border border-cyan-500/40 text-cyan-900 dark:text-cyan-200 font-semibold shadow-sm"
                                : "bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700"
                            }`}
                          >
                            {skill.highlight && (
                              <Sparkles className="h-3 w-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                            )}
                            <span className="font-medium">{skill.name}</span>
                            {skill.level && (
                              <span className="text-[9px] font-mono text-slate-500 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                                ({skill.level[0]})
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
