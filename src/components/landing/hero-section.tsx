"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const fadeUp = (rm: boolean, delay = 0) =>
  rm
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2, delay } }
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay } };

// Typewriter text component - types out character by character
function TypewriterText({ text, delay, className }: { text: string; delay: number; className?: string }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    const startTime = delay * 1000;
    const typingSpeed = 50; // milliseconds per character
    
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, typingSpeed);
      
      return () => clearInterval(interval);
    }, startTime);
    
    return () => clearTimeout(timeout);
  }, [text, delay]);
  
  return <div className={className}>{displayedText}</div>;
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isPaperPulled, setIsPaperPulled] = useState(false);

  // Track when typing animation completes (after 9 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTypingComplete(true);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  const handleLeverClick = () => {
    if (isTypingComplete && !isPaperPulled) {
      setIsPaperPulled(true);
    }
  };

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Retro beige background with grid */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        {/* Base cream/beige color */}
        <div className="absolute inset-0 bg-[#EFE9E1]" />
        
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{ 
            backgroundImage: "linear-gradient(#D4C5B3 1px, transparent 1px), linear-gradient(90deg, #D4C5B3 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }}
        />
        
        {/* Subtle vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(107,89,68,0.08)_100%)]" />
      </div>

      {/* Vintage Typewriter Animation - Right Side */}
      <div className="pointer-events-none absolute right-4 top-1/2 z-0 -translate-y-1/2 lg:right-12 xl:right-20 opacity-70" aria-hidden>
        <div className="relative scale-[0.7] sm:scale-[0.8] lg:scale-[0.95] xl:scale-[1.05]">
          {/* Paper slowly emerging from typewriter */}
          <motion.div
            className="absolute left-1/2 bottom-20 w-72 -translate-x-1/2 origin-bottom overflow-hidden"
            initial={{ height: 0 }}
            animate={{ 
              height: isPaperPulled ? "380px" : "280px",
              y: isPaperPulled ? -100 : 0,
              rotate: isPaperPulled ? 5 : 0
            }}
            transition={{ 
              height: { duration: isPaperPulled ? 0.8 : 8, ease: isPaperPulled ? [0.34, 1.56, 0.64, 1] : "linear", delay: isPaperPulled ? 0 : 0.5 },
              y: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0 },
              rotate: { duration: 0.8, ease: "easeOut", delay: 0 }
            }}
          >
            {/* Paper */}
            <div className="relative h-full w-full border-2 border-[#1C1C1C] bg-white shadow-[8px_8px_0px_0px_rgba(28,28,28,0.15)]">
              {/* Paper feed holes on left side */}
              <div className="absolute left-3 top-0 flex h-full flex-col justify-start gap-4 pt-2">
                {[...Array(12)].map((_, i) => (
                  <div key={`left-${i}`} className="h-2 w-2 rounded-full border-2 border-[#D4C5B3]" />
                ))}
              </div>
              
              {/* Resume Content Being Typed Character by Character */}
              <div className="px-10 py-6 font-mono text-xs leading-relaxed text-[#1C1C1C]">
                {/* Name - types out character by character */}
                <TypewriterText text="ROSE JANE" delay={1} className="mb-3 text-base font-bold tracking-wide" />
                
                {/* Contact */}
                <TypewriterText 
                  text="rose.jane@email.com | (555) 123-4567" 
                  delay={2.5} 
                  className="mb-4 text-[10px] text-[#5C4F3F]"
                />
                
                {/* Line break */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: 3.5 }}
                  className="mb-2 h-px origin-left bg-[#1C1C1C]"
                />
                
                {/* Experience Section Header */}
                <TypewriterText 
                  text="EXPERIENCE" 
                  delay={4} 
                  className="mb-2 text-[11px] font-bold tracking-wider"
                />
                
                {/* Job Title */}
                <TypewriterText 
                  text="Senior Developer" 
                  delay={5} 
                  className="text-[10px] font-semibold"
                />
                <TypewriterText 
                  text="Tech Corp | 2020 - Present" 
                  delay={5.8} 
                  className="mb-1.5 text-[9px] text-[#6B5944]"
                />
                
                {/* Bullet points */}
                <TypewriterText 
                  text="• Built scalable React applications" 
                  delay={6.5} 
                  className="text-[9px] leading-tight"
                />
                <TypewriterText 
                  text="• Improved performance by 40%" 
                  delay={7} 
                  className="text-[9px] leading-tight"
                />
                
                {/* Line break */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: 7.5 }}
                  className="my-2 h-px origin-left bg-[#1C1C1C]"
                />
                
                {/* Skills Section */}
                <TypewriterText 
                  text="SKILLS" 
                  delay={8} 
                  className="mb-1.5 text-[11px] font-bold tracking-wider"
                />
                <TypewriterText 
                  text="React · TypeScript · Node.js" 
                  delay={8.5} 
                  className="text-[9px]"
                />
              </div>
            </div>
          </motion.div>
          
          {/* Typewriter Machine - Vintage 1970s style */}
          <div className="relative h-40 w-96">
            {/* Main body - Orange/tan base like reference image */}
            <div className="absolute bottom-0 left-1/2 h-32 w-[85%] -translate-x-1/2">
              {/* White/cream top section */}
              <div className="absolute top-0 h-16 w-full rounded-t-lg border-4 border-[#1C1C1C] bg-gradient-to-b from-[#F5F5F5] to-[#E8E8E8] shadow-[8px_8px_0px_0px_rgba(28,28,28,0.2)]">
                {/* Paper roller mechanism */}
                <div className="absolute -top-3 left-1/2 flex h-6 w-[75%] -translate-x-1/2 items-center justify-between">
                  {/* Left roller */}
                  <div className="h-6 w-8 rounded-full border-2 border-[#1C1C1C] bg-[#2A2A2A]" />
                  {/* Paper guide bar */}
                  <div className="h-2 flex-1 border-y-2 border-[#1C1C1C] bg-[#C0C0C0]" />
                  {/* Right roller */}
                  <div className="h-6 w-8 rounded-full border-2 border-[#1C1C1C] bg-[#2A2A2A]" />
                </div>
                
                {/* Brand label area */}
                <div className="absolute left-1/2 top-3 -translate-x-1/2 rounded-sm bg-[#1C1C1C] px-3 py-1">
                  <div className="text-[10px] font-bold tracking-widest text-[#D4A574]">CLASSIC 16</div>
                </div>
              </div>
              
              {/* Orange/tan keyboard section */}
              <div className="absolute bottom-0 h-20 w-full rounded-b-xl border-4 border-t-0 border-[#1C1C1C] bg-gradient-to-b from-[#D4A574] to-[#B8935E] shadow-[8px_8px_0px_0px_rgba(28,28,28,0.2)]">
                {/* Keyboard keys - round white keys like reference */}
                <div className="absolute left-1/2 top-4 grid w-[90%] -translate-x-1/2 grid-cols-13 gap-1">
                  {[...Array(52)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-4 w-4 rounded-full border-2 border-[#1C1C1C] bg-white shadow-[2px_2px_0px_0px_rgba(28,28,28,0.3)]"
                      animate={
                        i % 7 === Math.floor(Date.now() / 1000) % 7
                          ? { y: [0, -3, 0] }
                          : {}
                      }
                      transition={{
                        duration: 0.15,
                        delay: 1 + (i * 0.05),
                      }}
                    />
                  ))}
                </div>
                
                {/* Space bar */}
                <div className="absolute bottom-2 left-1/2 h-3 w-[60%] -translate-x-1/2 rounded-sm border-2 border-[#1C1C1C] bg-white shadow-[2px_2px_0px_0px_rgba(28,28,28,0.3)]" />
              </div>
            </div>
            
            {/* Carriage return lever on right side */}
            <motion.div 
              className={`absolute right-8 top-8 h-16 w-3 origin-bottom rounded-full border-2 border-[#1C1C1C] bg-[#2A2A2A] shadow-md ${
                isTypingComplete && !isPaperPulled ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'
              }`}
              animate={{ 
                rotate: isPaperPulled ? -45 : 25,
                scale: isTypingComplete && !isPaperPulled ? [1, 1.05, 1] : 1
              }}
              transition={{ 
                rotate: { duration: 0.4, ease: "easeInOut" },
                scale: { duration: 1, repeat: isTypingComplete && !isPaperPulled ? Infinity : 0, repeatDelay: 0.5 }
              }}
              onClick={handleLeverClick}
              whileHover={isTypingComplete && !isPaperPulled ? { scale: 1.1 } : {}}
            >
              <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border-2 border-[#1C1C1C] bg-[#C0522D]" />
              
              {/* Tooltip hint when typing is complete */}
              {isTypingComplete && !isPaperPulled && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="absolute -right-20 top-0 whitespace-nowrap rounded-sm bg-[#1C1C1C] px-2 py-1 text-[10px] text-[#EFE9E1]"
                >
                  Pull me! →
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl pt-24 pb-32 text-center sm:pt-32 sm:pb-40 lg:pt-40 lg:pb-48 min-h-[calc(100vh-5rem)]">

          {/* Small badge */}
          <motion.div
            {...fadeUp(!!reduceMotion, 0)}
            className="mb-6 inline-flex items-center gap-2 rounded-sm border-2 border-[#3D5A40] bg-[#EFE9E1] px-4 py-2"
          >
            <span className="text-sm font-semibold text-[#3D5A40]">AI-powered · Free to start</span>
          </motion.div>

          {/* Main headline - old school serif-like bold */}
          <motion.h1
            id="hero-heading"
            {...fadeUp(!!reduceMotion, 0.07)}
            className="text-balance text-5xl font-black tracking-tight text-[#1C1C1C] sm:text-6xl lg:text-7xl lg:leading-[1.05]"
            style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            The AI-powered
            <br />
            <span className="text-[#2F5233]">
              career OS
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(!!reduceMotion, 0.14)}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[#5C4F3F] sm:text-xl"
          >
            Build ATS-ready resumes, analyze your score, and get a personalized career roadmap — all in one workspace, powered by AI.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...fadeUp(!!reduceMotion, 0.21)}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            {/* Primary CTA - deep teal/forest green */}
            <motion.div 
              whileHover={{ scale: 1.02, y: -1 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/features"
                className="group relative inline-flex h-13 items-center gap-2 overflow-hidden rounded-sm bg-[#2F5233] px-9 text-base font-bold text-[#EFE9E1] shadow-[4px_4px_0px_0px_rgba(28,28,28,0.25)] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_rgba(28,28,28,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(28,28,28,0.25)] active:translate-x-[2px] active:translate-y-[2px]"
              >
                <span className="relative">Start building free</span>
                <ArrowRight className="relative size-4" />
              </Link>
            </motion.div>

            {/* Secondary CTA - ghost style */}
            <motion.div 
              whileHover={{ scale: 1.02, y: -1 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/tools/analyzer"
                className="group relative inline-flex h-13 items-center gap-2 overflow-hidden rounded-sm border-2 border-[#1C1C1C] bg-transparent px-9 text-base font-bold text-[#1C1C1C] transition-all duration-200 hover:bg-[#1C1C1C] hover:text-[#EFE9E1]"
              >
                <span className="relative">Analyze my resume</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats / Social proof */}
          <motion.div
            {...fadeUp(!!reduceMotion, 0.28)}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-[#6B5944]"
          >
            <span><span className="mr-1.5 text-[#2F5233]">✓</span>52k+ resumes built</span>
            <span><span className="mr-1.5 text-[#2F5233]">✓</span>89% ATS success rate</span>
            <span><span className="mr-1.5 text-[#2F5233]">✓</span>120k+ users</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
