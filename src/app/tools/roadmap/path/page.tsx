"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  LayoutDashboard,
  RotateCcw,
  Clock,
  CheckCircle2,
  Layers,
  PartyPopper,
} from "lucide-react";

import type { RoadmapPhase, RoadmapGenerationResult } from "@/lib/llm/schemas";
import { useRoadmapStore } from "@/stores/useRoadmapStore";
import { getRoadmapById } from "@/actions/roadmap";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PHASE_GRADIENTS = [
  "from-violet-500 to-violet-600",
  "from-blue-500 to-blue-600",
  "from-teal-500 to-teal-600",
  "from-indigo-500 to-indigo-600",
  "from-violet-600 to-blue-600",
  "from-blue-600 to-teal-600",
  "from-teal-600 to-violet-600",
  "from-indigo-600 to-violet-600",
];

const PHASE_GLOW_COLORS = [
  "shadow-violet-300",
  "shadow-blue-300",
  "shadow-teal-300",
  "shadow-indigo-300",
  "shadow-violet-400",
  "shadow-blue-400",
  "shadow-teal-400",
  "shadow-indigo-400",
];

const PHASE_RING_COLORS = [
  "ring-violet-100",
  "ring-blue-100",
  "ring-teal-100",
  "ring-indigo-100",
  "ring-violet-200",
  "ring-blue-200",
  "ring-teal-200",
  "ring-indigo-200",
];

function getPhaseGradient(index: number) {
  return PHASE_GRADIENTS[index % PHASE_GRADIENTS.length];
}
function getPhaseGlow(index: number) {
  return PHASE_GLOW_COLORS[index % PHASE_GLOW_COLORS.length];
}
function getPhaseRing(index: number) {
  return PHASE_RING_COLORS[index % PHASE_RING_COLORS.length];
}

// ─── Component ────────────────────────────────────────────────────────────────

function RoadmapContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roadmapId = searchParams.get("id");

  const storeData = useRoadmapStore((s) => s.roadmapData);
  const fullResult = useRoadmapStore((s) => s.fullRoadmapResult);
  const targetRole = useRoadmapStore((s) => s.targetRole);
  const setRoadmapData = useRoadmapStore((s) => s.setRoadmapData);
  const setFullRoadmapResult = useRoadmapStore((s) => s.setFullRoadmapResult);

  const [roadmapData, setLocalRoadmapData] = useState<RoadmapPhase[] | null>(null);
  const [resolvedRole, setResolvedRole] = useState<string | null>(null);
  const [estimatedDuration, setEstimatedDuration] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!roadmapId) {
      setLocalRoadmapData(storeData);
      setResolvedRole(targetRole);
      setEstimatedDuration(fullResult?.estimated_duration ?? null);
      return;
    }

    if (storeData && storeData.length > 0) {
      setLocalRoadmapData(storeData);
      setResolvedRole(targetRole ?? fullResult?.target_role ?? null);
      setEstimatedDuration(fullResult?.estimated_duration ?? null);
      return;
    }

    setIsLoading(true);
    getRoadmapById(roadmapId)
      .then((row) => {
        if (!row) {
          setLocalRoadmapData(null);
          setIsLoading(false);
          return;
        }
        const result = row.roadmapJson as unknown as RoadmapGenerationResult;
        setFullRoadmapResult(result);
        setRoadmapData(result.phases);
        setLocalRoadmapData(result.phases);
        setResolvedRole(row.targetRole);
        setEstimatedDuration(result.estimated_duration ?? null);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [roadmapId, storeData, targetRole, fullResult, setRoadmapData, setFullRoadmapResult]);

  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen w-full" />
    );
  }

  const hasRoadmap = Array.isArray(roadmapData) && roadmapData.length > 0;

  if (!hasRoadmap) {
    return (
      <main className="min-h-screen w-full text-ink">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-6 px-6 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
            <Layers className="h-8 w-8 text-violet-500" />
          </div>
          <h2 className="text-2xl font-bold text-ink">No roadmap found</h2>
          <p className="max-w-sm text-muted-foreground">
            We couldn&apos;t find a roadmap to display. Head back to the planner to generate one.
          </p>
          <button
            type="button"
            onClick={() => router.push("/tools/roadmap")}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:brightness-105"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Planner
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full text-ink">
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-16">

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-600">
              Your Career Roadmap
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {resolvedRole ?? "Your Roadmap"}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                <Layers className="h-3 w-3" />
                {roadmapData.length} phases
              </span>
              {estimatedDuration && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  <Clock className="h-3 w-3" />
                  {estimatedDuration}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push("/tools/roadmap")}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-paper/80 px-4 py-2.5 text-sm font-semibold text-ink shadow-sm transition hover:bg-cream hover:shadow"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Planner
          </button>
        </motion.div>

        {/* ── Vertical timeline ────────────────────────────────────────────── */}
        <div className="relative pl-10 sm:pl-14">
          {/* Central gradient line — blurred glow layer */}
          <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-violet-400 via-blue-400 to-teal-400 opacity-50 blur-[1px] sm:left-5" />
          {/* Central gradient line — crisp layer */}
          <div className="absolute left-3.5 top-3 bottom-3 w-px bg-gradient-to-b from-violet-500 via-blue-500 to-teal-500 sm:left-5" />

          <div className="space-y-8 sm:space-y-10">
            {roadmapData.map((phase, index) => {
              const gradient = getPhaseGradient(index);
              const glow = getPhaseGlow(index);
              const ring = getPhaseRing(index);

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                >
                  {/* Pulsing phase node on the line */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0px rgba(139,92,246,0.25)",
                        "0 0 0 8px rgba(139,92,246,0)",
                        "0 0 0 0px rgba(139,92,246,0.25)",
                      ],
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.35 }}
                    className={`absolute -left-10 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-xs font-bold text-white shadow-lg ${glow} ring-4 ring-white sm:-left-14 sm:h-10 sm:w-10 sm:text-sm`}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Phase card */}
                  <article className={`rounded-2xl border border-border/50 bg-paper/80 backdrop-blur-sm p-6 shadow-md ring-1 ${ring} sm:p-8`}>
                    {/* Card header */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <h2 className="text-xl font-bold text-ink sm:text-2xl">
                        {phase.title}
                      </h2>
                      <span className={`inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r ${gradient} px-3.5 py-1 text-xs font-semibold text-white shadow-sm`}>
                        <Clock className="h-3 w-3" />
                        {phase.duration}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                      {phase.description}
                    </p>

                    {/* Skills chips */}
                    {phase.skills.length > 0 && (
                      <div className="mt-5">
                        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {phase.skills.map((skill) => (
                            <span
                              key={`${phase.id}-skill-${skill}`}
                              className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action items */}
                    {phase.actionItems.length > 0 && (
                      <div className="mt-5">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Action Items
                        </p>
                        <ul className="space-y-2.5">
                          {phase.actionItems.map((item) => (
                            <li
                              key={`${phase.id}-action-${item}`}
                              className="flex items-start gap-3 text-sm leading-relaxed text-ink"
                            >
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-border bg-paper/60">
                                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Completion section ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 overflow-hidden rounded-3xl border border-border/50 bg-paper/70 backdrop-blur-sm p-8 text-center shadow-lg sm:p-12"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-200">
            <PartyPopper className="h-8 w-8 text-white" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-ink sm:text-3xl">
            Roadmap Complete
          </h2>
          <p className="mt-3 text-muted-foreground">
            You have a clear path ahead.
            {estimatedDuration && (
              <>
                {" "}Your estimated journey is{" "}
                <span className="font-semibold text-violet-700">{estimatedDuration}</span>.
              </>
            )}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
              {roadmapData.length} phases mapped
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
              Step-by-step action items
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
              Skill-ordered learning path
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/tools/roadmap")}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-paper/80 px-5 py-2.5 text-sm font-semibold text-ink shadow-sm transition hover:bg-cream hover:shadow"
            >
              <RotateCcw className="h-4 w-4" />
              Start Over
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:brightness-105"
            >
              <LayoutDashboard className="h-4 w-4" />
              Go to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function RoadmapPathPage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full" />}>
      <RoadmapContent />
    </Suspense>
  );
}
