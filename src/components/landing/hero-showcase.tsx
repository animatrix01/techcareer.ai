"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Sparkles, Route, ScanSearch, TrendingUp } from "lucide-react";

/* ── Mini ATS Score Card ─────────────────────────────────────────────────── */
function ATSScoreCard() {
  return (
    <div className="w-52 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-xl shadow-indigo-900/10 backdrop-blur-md">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">ATS Score</p>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-4xl font-bold text-emerald-600">87</span>
        <span className="mb-1 text-sm text-slate-400">/ 100</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
          initial={{ width: 0 }}
          animate={{ width: "87%" }}
          transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
        />
      </div>
      <div className="mt-3 space-y-1.5">
        {["Contact info", "Skills section", "Work experience"].map((item) => (
          <div key={item} className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3 text-emerald-500" />
            <span className="text-[10px] text-slate-600">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Mini Resume Preview Card ────────────────────────────────────────────── */
function ResumePreviewCard() {
  return (
    <div className="w-44 overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-xl shadow-violet-900/10 backdrop-blur-md">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-2">
        <div className="h-2 w-20 rounded-full bg-white/40" />
        <div className="mt-1 h-1.5 w-12 rounded-full bg-white/25" />
      </div>
      {/* Body lines */}
      <div className="space-y-1.5 p-3">
        {[80, 60, 90, 50, 70, 40, 65].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full bg-slate-100" style={{ width: `${w}%` }} />
        ))}
        <div className="mt-2 h-px bg-slate-100" />
        {[55, 75, 45].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full bg-slate-100" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="px-3 pb-3">
        <div className="rounded-lg bg-indigo-50 p-2">
          <div className="flex items-center gap-1">
            <Sparkles className="size-2.5 text-indigo-500" />
            <span className="text-[8px] font-medium text-indigo-600">AI Enhanced</span>
          </div>
          <div className="mt-1 h-1 w-full rounded-full bg-indigo-100" />
          <div className="mt-0.5 h-1 w-3/4 rounded-full bg-indigo-100" />
        </div>
      </div>
    </div>
  );
}

/* ── Mini Roadmap Card ───────────────────────────────────────────────────── */
function RoadmapCard() {
  const phases = ["Foundations", "Core Skills", "Projects", "Job Ready"];
  return (
    <div className="w-56 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-xl shadow-amber-900/8 backdrop-blur-md">
      <div className="flex items-center gap-1.5">
        <Route className="size-3.5 text-amber-500" />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Career Roadmap</p>
      </div>
      <p className="mt-1 text-xs font-semibold text-slate-800">Full Stack Engineer</p>
      <div className="mt-3 space-y-2">
        {phases.map((phase, i) => (
          <div key={phase} className="flex items-center gap-2">
            <div className={`flex size-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white ${i < 2 ? "bg-indigo-500" : "bg-slate-200 text-slate-400"}`}>
              {i < 2 ? "✓" : i + 1}
            </div>
            <div className="flex-1">
              <div className={`h-1.5 rounded-full ${i < 2 ? "bg-indigo-200" : "bg-slate-100"}`} style={{ width: i < 2 ? "100%" : `${70 - i * 15}%` }} />
            </div>
            <span className={`text-[9px] font-medium ${i < 2 ? "text-indigo-600" : "text-slate-400"}`}>{phase}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Mini Analyzer Card ──────────────────────────────────────────────────── */
function AnalyzerCard() {
  return (
    <div className="w-48 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-xl shadow-teal-900/8 backdrop-blur-md">
      <div className="flex items-center gap-1.5">
        <ScanSearch className="size-3.5 text-teal-500" />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Analyzer</p>
      </div>
      <div className="mt-3 space-y-2">
        {[
          { label: "Weak verbs", sev: "critical", color: "bg-red-400" },
          { label: "Missing metrics", sev: "warning", color: "bg-orange-400" },
          { label: "ATS keywords", sev: "info", color: "bg-blue-400" },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2 rounded-lg bg-slate-50 px-2 py-1.5">
            <div className={`size-1.5 rounded-full ${color}`} />
            <span className="text-[9px] text-slate-600">{label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1">
        <TrendingUp className="size-3 text-emerald-500" />
        <span className="text-[9px] font-medium text-emerald-600">+23 pts after fixes</span>
      </div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────────────────── */
export function HeroShowcase() {
  const reduceMotion = useReducedMotion();

  const float = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          animate: { y: [0, -8, 0] },
          transition: { duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay },
        };

  return (
    <div className="relative mx-auto mt-12 max-w-5xl px-4 sm:px-6 lg:px-8">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/4 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 size-64 rounded-full bg-indigo-400/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 size-56 -translate-x-1/2 rounded-full bg-amber-300/15 blur-3xl" />
      </div>

      {/* Browser chrome wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/60 shadow-2xl shadow-indigo-900/10 backdrop-blur-sm"
      >
        {/* Browser top bar */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-red-400/70" />
            <div className="size-3 rounded-full bg-amber-400/70" />
            <div className="size-3 rounded-full bg-emerald-400/70" />
          </div>
          <div className="mx-auto flex h-6 w-64 items-center justify-center rounded-md bg-white/80 px-3 text-[10px] text-slate-400 shadow-sm ring-1 ring-slate-200/60">
            techcareer.ai/dashboard
          </div>
        </div>

        {/* Dashboard content */}
        <div className="relative min-h-[340px] overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/20 p-6 sm:p-8">
          {/* Grid background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)", backgroundSize: "28px 28px" }}
            aria-hidden
          />

          {/* Floating cards layout */}
          <div className="relative flex flex-wrap items-start justify-center gap-4 sm:gap-6">
            <motion.div {...float(0)} className="relative z-10">
              <ResumePreviewCard />
            </motion.div>
            <motion.div {...float(0.8)} className="relative z-20 mt-6 sm:mt-10">
              <ATSScoreCard />
            </motion.div>
            <motion.div {...float(1.4)} className="relative z-10 mt-2 sm:mt-4">
              <RoadmapCard />
            </motion.div>
            <motion.div {...float(0.4)} className="relative z-10 mt-8 sm:mt-14">
              <AnalyzerCard />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" aria-hidden />
    </div>
  );
}
