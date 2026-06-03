"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  const reduceMotion = useReducedMotion();
  void reduceMotion; // used for accessibility awareness

  return (
    <section
      id="cta"
      className="relative scroll-mt-28 overflow-hidden py-20 sm:py-28 lg:py-32 bg-[#EFE9E1]"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="text-sm font-bold uppercase tracking-[0.18em] text-[#2F5233]"
        >
          Get started
        </motion.p>
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-4 text-4xl font-black tracking-tight text-[#1C1C1C] sm:text-5xl"
          style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
        >
          Your next role starts{" "}
          <span className="text-[#2F5233]">
            right here
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.14 }}
          className="mx-auto mt-5 max-w-xl text-lg text-[#5C4F3F]"
        >
          Build your resume, analyze it with AI, and get a personalized career roadmap — all in one place. Free to start, no credit card required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/tools/builder"
            className="inline-flex h-14 min-w-[220px] items-center justify-center gap-2 rounded-sm bg-[#2F5233] px-10 text-base font-bold text-[#EFE9E1] shadow-[4px_4px_0px_0px_rgba(28,28,28,0.25)] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_rgba(28,28,28,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(28,28,28,0.25)] active:translate-x-[2px] active:translate-y-[2px]"
          >
            Build my resume — free
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/tools/analyzer"
            className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-sm border-2 border-[#1C1C1C] bg-transparent px-10 text-base font-bold text-[#1C1C1C] transition-all duration-200 hover:bg-[#1C1C1C] hover:text-[#EFE9E1]"
          >
            Analyze my resume
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-xs text-[#6B5944]"
        >
          No credit card required · ATS optimized · Free forever
        </motion.p>
      </div>
    </section>
  );
}
