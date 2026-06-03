"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, CircleX, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAnalyzerStore } from "@/stores/useAnalyzerStore";
import type { IssueCategory, IssueSeverity } from "@/lib/llm/schemas";

// Map severity to icon component
function getSeverityIcon(severity: IssueSeverity) {
  switch (severity) {
    case "critical":
      return <CircleX className="size-4 text-red-500" aria-hidden />;
    case "warning":
      return <AlertCircle className="size-4 text-orange-500" aria-hidden />;
    case "info":
      return <CheckCircle2 className="size-4 text-blue-500" aria-hidden />;
  }
}

// Map category to display label
function getCategoryLabel(category: IssueCategory): string {
  const labels: Record<IssueCategory, string> = {
    content: "CONTENT",
    sections: "SECTIONS",
    ats: "ATS ESSENTIALS",
    formatting: "FORMATTING",
    impact: "IMPACT",
    wording: "WORDING",
  };
  return labels[category];
}

export default function AnalyzerResultsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const score = useAnalyzerStore((state) => state.score);
  const issues = useAnalyzerStore((state) => state.issues);
  const categorySummary = useAnalyzerStore((state) => state.categorySummary);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const computedScore = score || 0;
  const scoreColor =
    computedScore >= 70 ? "text-emerald-600" : "text-orange-600";
  const ringColor =
    computedScore >= 70 ? "stroke-emerald-500" : "stroke-orange-500";
  const gaugeLength = 100;
  const gaugeOffset = gaugeLength - computedScore;

  // Group issues by category
  const issuesByCategory = issues.reduce((acc, issue) => {
    if (!acc[issue.category]) {
      acc[issue.category] = [];
    }
    acc[issue.category].push(issue);
    return acc;
  }, {} as Record<IssueCategory, typeof issues>);

  // Get categories with issues for sidebar
  const categoriesWithIssues = Object.entries(categorySummary || {})
    .filter(([_, count]) => count > 0)
    .map(([category, count]) => ({
      id: category as IssueCategory,
      label: getCategoryLabel(category as IssueCategory),
      issueCount: count,
    }));

  if (!isMounted) {
    return <div className="min-h-screen w-full bg-gradient-to-br from-teal-50 via-purple-50 to-slate-50"></div>;
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-teal-50 via-purple-50 to-slate-50 text-slate-900">
      {/* Back Button */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-6">
        <Button
          asChild
          variant="ghost"
          className="group -ml-2 h-10 gap-2 rounded-xl text-slate-700 hover:bg-teal-50 hover:text-teal-700"
        >
          <Link href="/tools/analyzer">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Analyzer</span>
          </Link>
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-7xl items-center justify-center p-6 pt-4"
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
          
          {/* Sidebar */}
          <motion.aside
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="self-start rounded-3xl border border-slate-200/75 bg-white/90 p-5 shadow-lg shadow-teal-900/5"
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

            {categoriesWithIssues.length > 0 ? (
              <Accordion type="single" collapsible className="mt-5 space-y-2">
                {categoriesWithIssues.map((category) => (
                  <AccordionItem
                    key={category.id}
                    value={category.id}
                    className="rounded-2xl border border-slate-200 bg-white px-3 transition-all duration-200 hover:border-teal-200 hover:bg-teal-50/30"
                  >
                    <AccordionTrigger className="py-3 text-xs font-semibold tracking-[0.14em] text-slate-700">
                      <span>{category.label}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-slate-600">
                      {category.issueCount} {category.issueCount === 1 ? "issue" : "issues"} detected.
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
                <p className="text-sm text-emerald-700">
                  No issues detected! Your resume looks great.
                </p>
              </div>
            )}

            <div className="mt-5 rounded-2xl border border-teal-100 bg-teal-50/70 p-4">
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

          {/* Main Content */}
          <motion.main
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-3xl border border-slate-200/75 bg-white/90 p-6 shadow-lg shadow-teal-900/5"
          >
            {issues.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle2 className="size-16 text-emerald-500" />
                <h2 className="mt-4 text-xl font-semibold text-slate-900">
                  No Issues Found
                </h2>
                <p className="mt-2 text-center text-slate-600">
                  Your resume passed all checks. Great work!
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                    Issues Detected
                  </h1>
                  <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                    {issues.length} {issues.length === 1 ? "Issue" : "Issues"}
                  </span>
                </div>

                <div className="mt-5 space-y-6">
                  {Object.entries(issuesByCategory).map(([category, categoryIssues]) => (
                    <div key={category}>
                      <h2 className="mb-3 text-sm font-semibold tracking-[0.14em] text-slate-700">
                        {getCategoryLabel(category as IssueCategory)}
                      </h2>
                      <div className="space-y-3">
                        {categoryIssues.map((issue) => (
                          <div
                            key={issue.id}
                            className="rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-teal-200 hover:shadow-md"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="text-base font-semibold tracking-tight text-slate-900">
                                {issue.title}
                              </h3>
                              {getSeverityIcon(issue.severity)}
                            </div>

                            {issue.problematicText && (
                              <div className="mt-3 rounded-xl border border-red-100 bg-red-50/70 px-3 py-2">
                                <p className="text-xs font-semibold text-red-700">
                                  ❌ Problematic:
                                </p>
                                <p className="mt-1 text-sm text-slate-700">
                                  &quot;{issue.problematicText}&quot;
                                </p>
                              </div>
                            )}

                            <div className="mt-3">
                              <p className="text-xs font-semibold text-slate-600">
                                Why it matters:
                              </p>
                              <p className="mt-1 text-sm text-slate-700">
                                {issue.whyItMatters}
                              </p>
                            </div>

                            {issue.suggestedImprovement && (
                              <div className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2">
                                <p className="text-xs font-semibold text-emerald-700">
                                  ✅ Suggested improvement:
                                </p>
                                <p className="mt-1 text-sm text-slate-700">
                                  {issue.suggestedImprovement}
                                </p>
                              </div>
                            )}

                            {issue.canAIFix && (
                              <Button
                                size="sm"
                                className="mt-3 h-8 rounded-lg bg-teal-600 text-xs font-semibold text-white hover:bg-teal-500"
                              >
                                Fix with AI
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.main>
        </div>
      </motion.div>
    </main>
  );
}
