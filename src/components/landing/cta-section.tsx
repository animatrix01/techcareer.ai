"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  const reduceMotion = useReducedMotion();
  const motionProps = reduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.2 } }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section
      id="cta"
      className="scroll-mt-28 bg-gradient-to-b from-background via-violet-50/40 to-amber-50/30 py-16 sm:py-20 lg:py-24"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          {...motionProps}
          viewport={{ once: true, margin: "-40px" }}
          className="relative overflow-hidden rounded-3xl border border-indigo-200/60 bg-white/80 px-6 py-12 text-center shadow-lg shadow-indigo-500/10 backdrop-blur-md sm:px-12 sm:py-16"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden
          >
            <div className="absolute -left-20 top-0 size-80 rounded-full bg-fuchsia-400/25 blur-3xl" />
            <div className="absolute -right-16 bottom-0 size-72 rounded-full bg-amber-300/30 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/20 blur-3xl" />
          </div>
          <p className="text-sm font-medium text-indigo-600">Get started</p>
          <h2
            id="cta-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Ready when{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              you are
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-600 sm:text-lg">
            Create an account to save resumes and roadmaps. Authentication
            flows ship in a later milestone — this block anchors layout and
            motion for now.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 min-w-[200px] rounded-full px-8 text-base font-medium shadow-md shadow-indigo-500/25"
              asChild
            >
              <Link href="#" className="inline-flex items-center justify-center gap-2">
                Join waitlist
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 min-w-[200px] rounded-full border-indigo-200/90 bg-white/80 px-8 text-base font-medium text-indigo-900 hover:bg-indigo-50/90"
              asChild
            >
              <Link href="#features">Explore features</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
