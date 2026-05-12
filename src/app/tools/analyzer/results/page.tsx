"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, CircleX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAnalyzerStore } from "@/stores/useAnalyzerStore";

const categoryGroups = [
  { id: "content", label: "CONTENT", issueCount: 3 },
  { id: "sections", label: "SECTIONS", issueCount: 2 },
  { id: "ats", label: "ATS ESSENTIALS", issueCount: 4 },
];

export default function AnalyzerResultsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const score = useAnalyzerStore((state) => state.score);
  const computedScore = score || 46;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scoreColor =
    computedScore >= 70 ? "text-emerald-600" : "text-orange-600";
  const ringColor =
    computedScore >= 70 ? "stroke-emerald-500" : "stroke-orange-500";
  const gaugeLength = 100;
  const gaugeOffset = gaugeLength - computedScore;

  if (!isMounted) {
    return <div className="min-h-screen w-full bg-gradient-to-br from-teal-50 via-purple-50 to-slate-50"></div>;
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-teal-50 via-purple-50 to-slate-50 text-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-7xl items-center justify-center p-6"
      >
        <div className="relative grid w-full gap-6 overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-5 shadow-xl shadow-teal-900/5 backdrop-blur-xl lg:grid-cols-[320px_1fr] lg:p-7">
          <motion.div
            aria-hidden
            animate={{ x: [0, 12, 0], y: [0, -8, 0] }}
            transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-8 top-6 h-44 w-44 rounded-full bg-teal-200/30 blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={{ x: [0, -12, 0], y: [0, 10, 0] }}
            transition={{ duration: 8.1, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute bottom-2 right-4 h-48 w-48 rounded-full bg-violet-200/30 blur-3xl"
          />
          <motion.aside
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex h-full flex-col rounded-3xl border border-slate-200/75 bg-white/90 p-5 shadow-lg shadow-teal-900/5"
          >
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <div className="relative mx-auto w-full max-w-[230px]">
                <svg viewBox="0 0 240 140" className="w-full" aria-hidden>
                  <path
                    d="M20 120 A100 100 0 0 1 220 120"
                    fill="none"
                    strokeWidth="18"
                    className="stroke-slate-200"
                    strokeLinecap="round"
                    pathLength="100"
                  />
                  <motion.path
                    d="M20 120 A100 100 0 0 1 220 120"
                    fill="none"
                    strokeWidth="18"
                    className={ringColor}
                    strokeLinecap="round"
                    pathLength="100"
                    style={{ strokeDasharray: gaugeLength }}
                    initial={false}
                    animate={{ strokeDashoffset: gaugeOffset }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 mt-10 flex flex-col items-center">
                  <span className={`text-4xl font-semibold tracking-tight ${scoreColor}`}>
                    {computedScore}
                  </span>
                  <span className="text-xs font-medium text-slate-500">ATS Score / 100</span>
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible className="mt-5 space-y-2">
              {categoryGroups.map((category) => (
                <AccordionItem
                  key={category.id}
                  value={category.id}
                  className="rounded-2xl border border-slate-200 bg-white px-3 transition-all duration-200 hover:border-teal-200 hover:bg-teal-50/30"
                >
                  <AccordionTrigger className="py-3 text-xs font-semibold tracking-[0.14em] text-slate-700">
                    <span>{category.label}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-slate-600">
                    {category.issueCount} areas need attention.
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-auto rounded-2xl border border-teal-100 bg-teal-50/70 p-4">
              {computedScore < 70 && (
                <p className="text-sm text-slate-700">
                  Score &lt; 70? Don&apos;t worry, we&apos;ll help you fix this.
                  Let&apos;s rebuild it.
                </p>
              )}
              <Button
                asChild
                className="mt-3 h-10 w-full rounded-xl bg-teal-600 text-sm font-semibold text-white hover:bg-teal-500"
              >
                <Link href="/tools/builder">Fix with Resume Builder</Link>
              </Button>
            </div>
          </motion.aside>

          <motion.main
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-3xl border border-slate-200/75 bg-white/90 p-6 shadow-lg shadow-teal-900/5"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                CONTENT
              </h1>
              <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                Issues Found
              </span>
            </div>

            <Accordion
              type="single"
              collapsible
              defaultValue="ats-parse-rate"
              className="mt-5 space-y-3"
            >
              <AccordionItem
                value="ats-parse-rate"
                className="rounded-2xl border border-slate-200 bg-white px-4 transition-all duration-200 hover:border-teal-200"
              >
                <AccordionTrigger className="text-base font-semibold tracking-tight text-slate-900">
                  ATS Parse Rate
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-1 text-sm text-slate-600">
                  <p>
                    An Applicant Tracking System (ATS) is used by employers to
                    quickly scan and classify resumes before a recruiter sees them.
                    If your formatting or structure is not machine-readable, even a
                    strong profile can get filtered out.
                  </p>
                  <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
                    <div className="h-3 overflow-hidden rounded-full bg-orange-100">
                      <div className="h-full w-0 rounded-full bg-orange-500" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-orange-700">
                      Oh no! We parsed only 0% of your resume successfully.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="quantifying-impact"
                className="rounded-2xl border border-slate-200 bg-white px-4 transition-all duration-200 hover:border-teal-200"
              >
                <AccordionTrigger className="text-base font-semibold tracking-tight text-slate-900">
                  Quantifying Impact
                </AccordionTrigger>
                <AccordionContent className="pt-1">
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 transition-colors duration-200 hover:bg-orange-50/40">
                    <span className="text-sm text-slate-700">
                      Add measurable outcomes to at least 5 bullets.
                    </span>
                    <CircleX className="size-4 text-orange-500" aria-hidden />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="spelling-grammar"
                className="rounded-2xl border border-slate-200 bg-white px-4 transition-all duration-200 hover:border-teal-200"
              >
                <AccordionTrigger className="text-base font-semibold tracking-tight text-slate-900">
                  Spelling &amp; Grammar
                </AccordionTrigger>
                <AccordionContent className="space-y-2 pt-1">
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 transition-colors duration-200 hover:bg-emerald-50/40">
                    <span className="text-sm text-slate-700">
                      Basic spelling checks
                    </span>
                    <CheckCircle2 className="size-4 text-emerald-500" aria-hidden />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 transition-colors duration-200 hover:bg-orange-50/40">
                    <span className="text-sm text-slate-700">
                      Grammar consistency across experience entries
                    </span>
                    <AlertCircle className="size-4 text-orange-500" aria-hidden />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.main>
        </div>
      </motion.div>
    </main>
  );
}
