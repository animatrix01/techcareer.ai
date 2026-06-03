"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { RoadmapGenerationResult } from "@/lib/llm/schemas";
import { useRoadmapStore } from "@/stores/useRoadmapStore";
import { saveRoadmap } from "@/actions/roadmap";

type ApiSuccess = { ok: true; roadmap: RoadmapGenerationResult };
type ApiError = { ok: false; error: string; code?: string };

export default function RoadmapBuildingPage() {
  const router = useRouter();
  const targetRole = useRoadmapStore((s) => s.targetRole);
  const currentSkills = useRoadmapStore((s) => s.currentSkills);
  const setRoadmapData = useRoadmapStore((s) => s.setRoadmapData);
  const setFullRoadmapResult = useRoadmapStore((s) => s.setFullRoadmapResult);
  const setSavedRoadmapId = useRoadmapStore((s) => s.setSavedRoadmapId);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const role = targetRole?.trim() ?? "";
    const skills = currentSkills.filter((s) => s.trim().length > 0);

    if (!role) {
      router.replace("/tools/roadmap");
      return;
    }

    const ac = new AbortController();
    let cancelled = false;

    async function run() {
      setError(null);
      try {
        const res = await fetch("/api/ai/roadmap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetRole: role, currentSkills: skills }),
          signal: ac.signal,
        });

        const payload = (await res.json()) as ApiSuccess | ApiError;
        if (cancelled) return;

        if (!res.ok || !payload || payload.ok !== true) {
          setError((payload as ApiError)?.error ?? `Request failed (${res.status})`);
          return;
        }

        const result = payload.roadmap;

        // Store full result and phases
        setFullRoadmapResult(result);
        setRoadmapData(result.phases);

        // Auto-save to DB after successful generation
        try {
          const savedId = await saveRoadmap({
            targetRole: role,
            currentSkills: skills,
            roadmapData: result,
          });
          setSavedRoadmapId(savedId);
          router.push(`/tools/roadmap/path?id=${savedId}`);
        } catch (saveErr) {
          // Save failed — log and still navigate without id
          console.error("Failed to save roadmap to DB:", saveErr);
          router.push("/tools/roadmap/path");
        }
      } catch (e) {
        if (cancelled || (e instanceof DOMException && e.name === "AbortError")) return;
        setError(e instanceof Error ? e.message : "Something went wrong");
      }
    }

    void run();
    return () => { cancelled = true; ac.abort(); };
  }, [targetRole, currentSkills, router, setRoadmapData, setFullRoadmapResult, setSavedRoadmapId]);

  if (error) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-900">
        <section className="flex w-full max-w-lg flex-col items-center gap-6 rounded-3xl border border-rose-100/80 bg-white/90 px-8 py-12 text-center shadow-xl shadow-rose-100/40 backdrop-blur-sm">
          <p className="text-lg font-semibold text-slate-900">Could not generate roadmap</p>
          <p className="text-sm text-slate-600">{error}</p>
          <button
            type="button"
            onClick={() => router.push("/tools/roadmap")}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-500"
          >
            Back to planner
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-900">
      <section className="flex w-full max-w-2xl flex-col items-center rounded-3xl border border-indigo-100/70 bg-white/75 px-8 py-14 text-center shadow-xl shadow-indigo-200/40 backdrop-blur-sm">
        <div className="relative mb-7 flex size-28 items-center justify-center">
          <span className="absolute inline-flex size-28 animate-ping rounded-full bg-indigo-300/50" />
          <span className="absolute inline-flex size-20 animate-pulse rounded-full bg-purple-300/50" />
          <span className="relative inline-flex size-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent shadow-lg shadow-indigo-300/60" />
        </div>
        <p className="max-w-xl text-lg font-medium text-slate-700 sm:text-xl">
          {currentSkills.length === 0 
            ? "Crafting your beginner-friendly learning path..."
            : "Analyzing market demands and structuring your path..."}
        </p>
      </section>
    </main>
  );
}
