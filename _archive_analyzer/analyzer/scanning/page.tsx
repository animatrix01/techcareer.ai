"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAnalyzerStore } from "@/stores/useAnalyzerStore";
import type { ResumeAnalysisResult } from "@/lib/llm/schemas";

const checklistSteps = [
  "Parsing your resume...",
  "Analyzing your experience...",
  "Extracting your skills...",
  "Generating recommendations...",
];

export default function AnalyzerScanningPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const setIsScanning = useAnalyzerStore((state) => state.setIsScanning);
  const setAnalysisResult = useAnalyzerStore((state) => state.setAnalysisResult);
  const resumeText = useAnalyzerStore((state) => state.resumeText);

  useEffect(() => {
    setIsScanning(true);

    async function runAnalysis() {
      try {
        // Check if we have resume text
        if (!resumeText || resumeText.trim().length === 0) {
          throw new Error("No resume text found. Please upload a file again.");
        }

        const response = await fetch("/api/ai/analyzer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeText: resumeText,
            targetRole: undefined, // Optional: can be added later
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.ok) {
          throw new Error(data.error || "Analysis failed");
        }

        const analysis = data.analysis as ResumeAnalysisResult;
        setAnalysisResult(analysis);
        setIsScanning(false);
        router.push("/tools/analyzer/results");
      } catch (e) {
        console.error("Analysis error:", e);
        setError(e instanceof Error ? e.message : "Analysis failed");
        setIsScanning(false);
      }
    }

    // Add slight delay for UX (show animation)
    const timer = setTimeout(() => {
      runAnalysis();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [router, setIsScanning, setAnalysisResult, resumeText]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-teal-50 via-purple-50 to-slate-50 text-slate-900">
      <div className="w-full max-w-7xl">
        <div className="relative grid w-full gap-6 overflow-hidden rounded-3xl border border-white/80 bg-white/80 p-5 shadow-xl shadow-teal-900/5 backdrop-blur-xl sm:p-8 lg:grid-cols-[320px_1fr]">
          <motion.div
            aria-hidden
            animate={{ x: [0, 10, 0], y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-2 top-4 h-40 w-40 rounded-full bg-teal-200/35 blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={{ x: [0, -14, 0], y: [0, 12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute bottom-0 right-12 h-44 w-44 rounded-full bg-violet-200/35 blur-3xl"
          />
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-lg shadow-teal-900/5"
          >
            <div className="mx-auto flex max-w-[220px] flex-col items-center">
              <div className="relative h-40 w-full overflow-hidden">
                <motion.div
                  animate={{ opacity: [0.25, 0.6, 0.25] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-0 bottom-0 h-32 rounded-t-[110px] border-[16px] border-slate-200"
                />
                <motion.div
                  animate={{ opacity: [0.3, 0.75, 0.3] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-8 bottom-10 h-4 rounded-full bg-slate-200"
                />
              </div>
              <div className="mt-2 h-3 w-36 rounded-full bg-slate-200" />
              <div className="mt-3 h-2.5 w-24 rounded-full bg-slate-100" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-3xl border border-slate-200/70 bg-white/90 p-7 shadow-lg shadow-teal-900/5"
          >
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Building your analysis dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              We are running a complete ATS-grade inspection before showing your
              deep-dive recommendations.
            </p>

            {error ? (
              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3">
                <p className="text-sm font-medium text-red-700">
                  Analysis failed: {error}
                </p>
              </div>
            ) : (
              <div className="mt-8 space-y-3">
                {checklistSteps.map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ delay: index * 0.45, duration: 0.35 }}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 transition-colors duration-200 hover:bg-teal-50/60"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.4 }}
                      animate={{ scale: [0.95, 1.06, 1], opacity: 1 }}
                      transition={{
                        delay: index * 0.45 + 0.08,
                        duration: 0.45,
                        ease: "easeOut",
                      }}
                    >
                      <CheckCircle2 className="size-5 text-teal-600" aria-hidden />
                    </motion.div>
                    <span className="text-sm font-medium tracking-tight text-slate-700 sm:text-base">
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
