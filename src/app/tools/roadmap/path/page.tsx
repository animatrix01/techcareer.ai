"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { useRoadmapStore } from "@/stores/useRoadmapStore";

export default function RoadmapPathPage() {
  const router = useRouter();
  const roadmapData = useRoadmapStore((state) => state.roadmapData);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <div className="min-h-screen w-full bg-slate-50"></div>;

  const hasRoadmap = Array.isArray(roadmapData) && roadmapData.length > 0;

  if (!hasRoadmap) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-900">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6 py-20">
          <button
            type="button"
            onClick={() => router.push("/tools/roadmap")}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500"
          >
            Return to Planner
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl border border-indigo-100/70 bg-white/60 p-5 shadow-xl shadow-indigo-100/60 backdrop-blur-sm sm:p-8"
        >
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-indigo-600">FINAL ROADMAP</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Your Interactive Timeline</h1>
            </div>
            <button
              type="button"
              onClick={() => router.push("/tools/roadmap")}
              className="w-fit rounded-xl border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
            >
              Return to Planner
            </button>
          </div>

          <div className="relative pl-12 sm:pl-16">
            <div className="absolute left-4 top-1 bottom-1 w-0.5 bg-gradient-to-b from-indigo-300 via-violet-300 to-purple-200 sm:left-6" />

            <div className="space-y-7 sm:space-y-9">
              {roadmapData.map((phase, index) => (
                <div key={phase.id} className="relative">
                  <div className="absolute -left-12 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-[0_0_0_6px_rgba(99,102,241,0.16)] shadow-indigo-300 sm:-left-[3.9rem] sm:h-10 sm:w-10 sm:text-sm">
                    {index + 1}
                  </div>

                  <article className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-indigo-100 sm:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">{phase.title}</h2>
                      <span className="w-fit rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                        {phase.duration}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">{phase.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {phase.skills.map((skill) => (
                        <span
                          key={`${phase.id}-${skill}`}
                          className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <ul className="mt-5 space-y-2.5">
                      {phase.actionItems.map((item) => (
                        <li
                          key={`${phase.id}-${item}`}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 sm:text-[0.95rem]"
                        >
                          <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-indigo-300 bg-indigo-50">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
