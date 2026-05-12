"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fadeUp = (reduceMotion: boolean, delay = 0) =>
  reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2, delay } }
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
      };

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-b border-indigo-200/40"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-violet-100/80 via-background to-amber-50/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-10%,rgba(192,132,252,0.45),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_90%_40%,rgba(251,191,36,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_5%_70%,rgba(244,114,182,0.18),transparent_45%)]" />
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-14 lg:px-8 lg:pb-32 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            {...fadeUp(!!reduceMotion, 0)}
            className={cn(
              "mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/70 px-3 py-1.5 text-xs font-medium text-indigo-950/80 shadow-sm",
              "backdrop-blur-md"
            )}
          >
            <span
              className="size-1.5 rounded-full bg-gradient-to-r from-pink-500 to-amber-400"
              aria-hidden
            />
            Resume, feedback, roadmap — one workspace
          </motion.p>
          <motion.h1
            id="hero-heading"
            {...fadeUp(!!reduceMotion, 0.06)}
            className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.08] lg:text-6xl"
          >
            <span className="block text-slate-900">
              The operating system for your
            </span>
            <span
              className={cn(
                "mt-1 block bg-clip-text text-transparent sm:mt-2",
                reduceMotion
                  ? "bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600"
                  : "hero-career-line-motion"
              )}
            >
              Tech Career
            </span>
          </motion.h1>
          <motion.p
            {...fadeUp(!!reduceMotion, 0.12)}
            className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            Plan roles, refine your resume with structured feedback, and keep
            momentum — without the noise of scattered tools and tabs.
          </motion.p>
          <motion.div
            {...fadeUp(!!reduceMotion, 0.18)}
            className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center"
          >
            <Button
              size="lg"
              className="h-12 rounded-full px-8 text-base font-medium shadow-md shadow-indigo-500/25 transition-[box-shadow,transform] hover:shadow-lg hover:shadow-indigo-500/30"
              asChild
            >
              <Link href="/dashboard" className="inline-flex items-center gap-2">
                Start building
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-indigo-200/90 bg-white/70 px-8 text-base font-medium text-indigo-900 backdrop-blur-md hover:border-indigo-300 hover:bg-indigo-50/90"
              asChild
            >
              <Link href="#features">View features</Link>
            </Button>
          </motion.div>
          <motion.p
            {...fadeUp(!!reduceMotion, 0.24)}
            className="mt-8 text-xs text-slate-500 sm:text-sm"
          >
            No credit card required · Works on desktop and mobile
          </motion.p>
        </div>
      </div>
    </section>
  );
}
