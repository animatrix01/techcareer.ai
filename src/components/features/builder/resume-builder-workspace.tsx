"use client";

import { useDeferredValue } from "react";

import { ResumeBuilderForm } from "@/components/features/builder/resume-builder-form";
import { ResumePreview } from "@/components/features/builder/resume-preview";
import { useBuilderStore } from "@/stores/useBuilderStore";

export function ResumeBuilderWorkspace() {
  const resume = useBuilderStore((s) => s.resume);
  const design = useBuilderStore((s) => s.design);
  const deferredResume = useDeferredValue(resume);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#09090b] pb-16 pt-6 text-zinc-100">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/90">
              Tools
            </p>
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Resume builder
            </h1>
            <p className="mt-1 max-w-xl text-sm text-zinc-400">
              Edit on the left; the preview stays in sync. Drag handles reorder
              roles and projects.
            </p>
          </div>
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] xl:gap-10">
          <div className="min-h-0 min-w-0">
            <ResumeBuilderForm />
          </div>

          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              Live preview · A4
            </p>
            <div className="mx-auto w-full max-w-[min(100%,210mm)]">
              <div
                className="relative w-full overflow-hidden rounded-lg bg-gradient-to-br from-zinc-700/50 to-zinc-900/80 p-[3px] shadow-2xl shadow-black/50 ring-1 ring-white/10"
                style={{ aspectRatio: "210 / 297" }}
              >
                <div className="absolute inset-[3px] overflow-y-auto overflow-x-hidden rounded-md bg-zinc-300/90">
                  <ResumePreview
                    resume={deferredResume}
                    template={design.template}
                    themeColor={design.themeColor}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
