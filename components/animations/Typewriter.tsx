"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  strings: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  className?: string;
}

export function Typewriter({
  strings,
  typingSpeed = 90,
  deletingSpeed = 50,
  delayBetween = 2000,
  className = ""
}: TypewriterProps) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!strings || strings.length === 0) return;

    const fullText = strings[currentIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setCurrentText(fullText.substring(0, currentText.length + 1));

        // If completed word
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), delayBetween);
        }
      } else {
        // Deleting backward
        setCurrentText(fullText.substring(0, currentText.length - 1));

        // If deleted completely
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % strings.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, strings, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{currentText}</span>
      <span className="ml-1 inline-block h-6 w-[3px] bg-cyan-400 animate-pulse-slow" />
    </span>
  );
}
