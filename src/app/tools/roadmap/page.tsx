"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useRoadmapStore } from "@/stores/useRoadmapStore";

export default function RoadmapInputPage() {
  const router = useRouter();
  const [skillInput, setSkillInput] = useState("");
  const targetRole = useRoadmapStore((state) => state.targetRole);
  const currentSkills = useRoadmapStore((state) => state.currentSkills);
  const setTargetRole = useRoadmapStore((state) => state.setTargetRole);
  const addSkill = useRoadmapStore((state) => state.addSkill);
  const removeSkill = useRoadmapStore((state) => state.removeSkill);

  const handleSkillAdd = () => {
    addSkill(skillInput);
    setSkillInput("");
  };

  const isGenerateDisabled =
    !targetRole || targetRole.trim().length === 0 || currentSkills.length === 0;

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-900">
      <section className="w-full max-w-3xl rounded-3xl border border-indigo-100/70 bg-white/80 p-6 shadow-xl shadow-indigo-200/40 backdrop-blur-sm sm:p-10">
        <p className="text-center text-xs font-semibold tracking-[0.24em] text-indigo-600">
          CAREER PLANNER
        </p>
        <h1 className="mt-4 text-center text-balance text-3xl font-bold tracking-tight sm:text-5xl">
          Map your path to the perfect role
        </h1>

        <div className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="target-role"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Target Role
            </label>
            <input
              id="target-role"
              type="text"
              value={targetRole ?? ""}
              onChange={(event) => setTargetRole(event.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label
              htmlFor="current-skills"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Current Skills
            </label>
            <input
              id="current-skills"
              type="text"
              value={skillInput}
              onChange={(event) => setSkillInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === ",") {
                  event.preventDefault();
                  handleSkillAdd();
                }
              }}
              placeholder="Type a skill and press Enter or comma"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {currentSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="inline-flex size-4 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={`Remove ${skill}`}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled={isGenerateDisabled}
            onClick={() => router.push("/tools/roadmap/building")}
            className="h-12 w-full rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
          >
            Generate Roadmap
          </button>
        </div>
      </section>
    </main>
  );
}
