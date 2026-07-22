"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full border border-white/10 bg-slate-900/50 p-2" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme mode"
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/50 bg-slate-900/60 p-2 text-slate-300 transition-all hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-glow-cyan dark:bg-slate-900/60 dark:text-slate-200"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-cyan-500 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
