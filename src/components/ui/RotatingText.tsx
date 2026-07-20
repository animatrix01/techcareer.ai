"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  mainClassName?: string;
  splitLevelClassName?: string;
  staggerFrom?: "first" | "last" | "center";
  initial?: { y: string } | { x: string } | { opacity: number };
  animate?: { y: number } | { x: number } | { opacity: number };
  exit?: { y: string } | { x: string } | { opacity: number };
  staggerDuration?: number;
  transition?: {
    type?: string;
    damping?: number;
    stiffness?: number;
    duration?: number;
    ease?: string | number[];
  };
  rotationInterval?: number;
  splitBy?: "characters" | "words";
  autoloop?: boolean;
}

export default function RotatingText({
  texts,
  mainClassName = "",
  splitLevelClassName = "",
  staggerFrom = "first",
  initial = { y: "100%" },
  animate = { y: 0 },
  exit = { y: "-120%" },
  staggerDuration = 0.025,
  transition = { type: "spring", damping: 30, stiffness: 400 },
  rotationInterval = 2000,
  splitBy = "characters",
  autoloop = true,
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!autoloop || texts.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, 600); // Allow time for exit animation
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts, rotationInterval, autoloop]);

  const currentText = texts[currentIndex] || texts[0];

  const splitText = (text: string) => {
    if (splitBy === "words") {
      return text.split(" ");
    }
    return text.split("");
  };

  const getStaggerDelay = (index: number, total: number) => {
    switch (staggerFrom) {
      case "last":
        return (total - 1 - index) * staggerDuration;
      case "center":
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      case "first":
      default:
        return index * staggerDuration;
    }
  };

  const textParts = splitText(currentText);

  return (
    <div className={`inline-flex ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="inline-flex"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {textParts.map((part, index) => (
            <div
              key={`${currentIndex}-${index}`}
              className={splitLevelClassName}
            >
              <motion.span
                initial={initial}
                animate={animate}
                exit={exit}
                // Yahan par 'as any' lagaya hai error bypass karne ke liye
                transition={
                  {
                    ...transition,
                    delay: getStaggerDelay(index, textParts.length),
                  } as any
                }
                className="inline-block"
              >
                {part === " " ? "\u00A0" : part}
              </motion.span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}