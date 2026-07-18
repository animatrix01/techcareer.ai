"use client";

import { useEffect, useState } from "react";

interface AnimatedTextRotatorProps {
  words: string[];
  className?: string;
  duration?: number;
}

export function AnimatedTextRotator({
  words,
  className = "",
  duration = 2800,
}: AnimatedTextRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (words.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, 300);

      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  const currentWord = words[currentIndex] || words[0];
  const longestWord = words.reduce((a, b) => a.length > b.length ? a : b, "");

  if (prefersReducedMotion) {
    return (
      <span 
        className={`inline-block align-baseline transition-opacity duration-300 font-mono font-bold ${className}`}
        style={{ 
          minWidth: `${longestWord.length * 0.65}ch`,
          verticalAlign: 'baseline'
        }}
      >
        {currentWord}
      </span>
    );
  }

  return (
    <span 
      className={`inline-block relative align-baseline font-mono font-bold ${className}`}
      style={{ 
        minWidth: `${longestWord.length * 0.65}ch`,
        height: '1em',
        verticalAlign: 'baseline',
        lineHeight: '1',
        perspective: '1000px'
      }}
    >
      <span
        className="absolute inset-0 will-change-transform transition-all ease-in-out flex items-baseline"
        style={{
          transitionDuration: '600ms',
          transform: isAnimating 
            ? 'translateY(-100%) rotateX(90deg)' 
            : 'translateY(0%) rotateX(0deg)',
          opacity: isAnimating ? 0 : 1,
          filter: isAnimating ? 'blur(2px)' : 'blur(0px)',
          transformOrigin: 'center bottom',
          backfaceVisibility: 'hidden',
          top: 0,
          lineHeight: 'inherit'
        }}
      >
        {currentWord}
      </span>
      
      {/* Next word coming from below */}
      <span
        className="absolute inset-0 will-change-transform transition-all ease-in-out flex items-baseline"
        style={{
          transitionDuration: '600ms',
          transform: isAnimating 
            ? 'translateY(0%) rotateX(0deg)' 
            : 'translateY(100%) rotateX(-90deg)',
          opacity: isAnimating ? 1 : 0,
          filter: isAnimating ? 'blur(0px)' : 'blur(2px)',
          transformOrigin: 'center top',
          backfaceVisibility: 'hidden',
          top: 0,
          lineHeight: 'inherit'
        }}
      >
        {words[(currentIndex + 1) % words.length]}
      </span>
    </span>
  );
}