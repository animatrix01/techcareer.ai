"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2, AlertCircle, CircleX, Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

const beforeIssues = [
  { icon: CircleX, color: "text-[#8B4513] bg-[#F5F1EB] border-2 border-[#8B4513]", label: "Weak verb: 'worked on frontend'" },
  { icon: AlertCircle, color: "text-[#A0522D] bg-[#F5F1EB] border-2 border-[#A0522D]", label: "No metrics in experience" },
  { icon: CircleX, color: "text-[#8B4513] bg-[#F5F1EB] border-2 border-[#8B4513]", label: "Vague: 'responsible for tasks'" },
  { icon: AlertCircle, color: "text-[#A0522D] bg-[#F5F1EB] border-2 border-[#A0522D]", label: "Missing impact statement" },
];

const afterFixes = [
  { icon: CheckCircle2, color: "text-[#2F5233] bg-[#F5F1EB] border-2 border-[#2F5233]", label: "Built responsive UI with React & TypeScript" },
  { icon: CheckCircle2, color: "text-[#2F5233] bg-[#F5F1EB] border-2 border-[#2F5233]", label: "Reduced load time by 40% via code splitting" },
  { icon: CheckCircle2, color: "text-[#2F5233] bg-[#F5F1EB] border-2 border-[#2F5233]", label: "Led migration of 3 legacy modules" },
  { icon: CheckCircle2, color: "text-[#2F5233] bg-[#F5F1EB] border-2 border-[#2F5233]", label: "Improved user retention by 22%" },
];

function ScoreRing({ score, color }: { score: number; color: string }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative flex size-24 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#D4C5B3" strokeWidth="8" />
        <motion.circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ} initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="text-center">
        <motion.span className="block text-xl font-bold text-[#1C1C1C]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          {score}
        </motion.span>
        <span className="text-[9px] text-[#6B5944]">/ 100</span>
      </div>
    </div>
  );
}

export function ProductDemo() {
  const [showAfter, setShowAfter] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-[#EFE9E1]"
      aria-labelledby="demo-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-sm font-bold uppercase tracking-[0.18em] text-[#2F5233]"
          >
            See it in action
          </motion.p>
          <motion.h2
            id="demo-heading"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-2 text-3xl font-black tracking-tight text-[#1C1C1C] sm:text-4xl"
            style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            From weak resume to{" "}
            <span className="text-[#2F5233]">
              interview-ready
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-3 text-base text-[#5C4F3F]"
          >
            Watch how our AI analyzer finds issues and transforms your resume in seconds.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 overflow-hidden rounded-sm border-2 border-[#1C1C1C] bg-[#F5F1EB] shadow-[4px_4px_0px_0px_rgba(28,28,28,0.2)]"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between border-b-2 border-[#1C1C1C] bg-[#EFE9E1] px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-[#8B4513]" />
                <div className="size-3 rounded-full bg-[#A0522D]" />
                <div className="size-3 rounded-full bg-[#2F5233]" />
              </div>
              <span className="ml-2 text-xs font-bold text-[#5C4F3F]">Resume Analyzer — Live Demo</span>
            </div>
            <div className="flex items-center gap-1 rounded-sm border-2 border-[#1C1C1C] bg-[#F5F1EB] p-1">
              <button type="button" onClick={() => setShowAfter(false)}
                className={`rounded-sm px-3 py-1 text-xs font-bold transition-all duration-200 ${!showAfter ? "bg-[#8B4513] text-[#EFE9E1]" : "text-[#5C4F3F] hover:bg-[#D4C5B3]"}`}
              >Before</button>
              <button type="button" onClick={() => setShowAfter(true)}
                className={`rounded-sm px-3 py-1 text-xs font-bold transition-all duration-200 ${showAfter ? "bg-[#2F5233] text-[#EFE9E1]" : "text-[#5C4F3F] hover:bg-[#D4C5B3]"}`}
              >After AI Fix</button>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-2">
            <div className="border-b-2 border-[#1C1C1C] p-6 lg:border-b-0 lg:border-r-2">
              <AnimatePresence mode="wait">
                {!showAfter ? (
                  <motion.div key="before" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: reduceMotion ? 0.1 : 0.3 }}
                  >
                    <p className="mb-4 text-sm font-bold text-[#1C1C1C]">Issues detected</p>
                    <div className="space-y-2.5">
                      {beforeIssues.map((issue, i) => {
                        const Icon = issue.icon;
                        return (
                          <motion.div key={issue.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                            className={`flex items-start gap-3 rounded-sm p-3 ${issue.color}`}
                          >
                            <Icon className="mt-0.5 size-4 shrink-0" />
                            <span className="text-sm font-medium text-[#1C1C1C]">{issue.label}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="mt-4 flex items-center gap-2 rounded-sm border-2 border-[#A0522D] bg-[#F5F1EB] p-3">
                      <TrendingUp className="size-4 text-[#A0522D]" />
                      <span className="text-xs font-bold text-[#A0522D]">4 issues reducing your score</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="after" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: reduceMotion ? 0.1 : 0.3 }}
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <Sparkles className="size-4 text-[#2F5233]" />
                      <p className="text-sm font-bold text-[#1C1C1C]">AI improvements applied</p>
                    </div>
                    <div className="space-y-2.5">
                      {afterFixes.map((fix, i) => {
                        const Icon = fix.icon;
                        return (
                          <motion.div key={fix.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                            className={`flex items-start gap-3 rounded-sm p-3 ${fix.color}`}
                          >
                            <Icon className="mt-0.5 size-4 shrink-0" />
                            <span className="text-sm font-medium text-[#1C1C1C]">{fix.label}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="mt-4 flex items-center gap-2 rounded-sm border-2 border-[#2F5233] bg-[#F5F1EB] p-3">
                      <TrendingUp className="size-4 text-[#2F5233]" />
                      <span className="text-xs font-bold text-[#2F5233]">All issues resolved — ready to apply</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col items-center justify-center gap-6 p-6 sm:flex-row lg:flex-col lg:gap-8">
              <div className="text-center">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#6B5944]">{showAfter ? "After" : "Before"}</p>
                <AnimatePresence mode="wait">
                  {!showAfter ? (
                    <motion.div key="score-before" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                      <ScoreRing score={42} color="#A0522D" />
                      <p className="mt-2 text-xs font-bold text-[#A0522D]">Needs improvement</p>
                    </motion.div>
                  ) : (
                    <motion.div key="score-after" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                      <ScoreRing score={87} color="#2F5233" />
                      <p className="mt-2 text-xs font-bold text-[#2F5233]">Interview ready</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {showAfter && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-sm border-2 border-[#2F5233] bg-[#F5F1EB] px-4 py-2"
                >
                  <TrendingUp className="size-4 text-[#2F5233]" />
                  <span className="text-sm font-bold text-[#2F5233]">+45 points</span>
                </motion.div>
              )}
              <Link
                href="/tools/analyzer"
                className="inline-flex items-center gap-1.5 rounded-sm bg-[#2F5233] px-6 py-2 text-sm font-bold text-[#EFE9E1] shadow-[2px_2px_0px_0px_rgba(28,28,28,0.25)] transition-all hover:shadow-[4px_4px_0px_0px_rgba(28,28,28,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
              >
                Try it free <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
