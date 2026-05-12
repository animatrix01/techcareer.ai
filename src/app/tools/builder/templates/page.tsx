"use client";

import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { templates } from "@/lib/config/templates";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/stores/useBuilderStore";

export default function BuilderTemplatesPage() {
  const router = useRouter();
  const selectedTemplate = useBuilderStore((s) => s.design.template);
  const setTemplate = useBuilderStore((s) => s.setTemplate);

  const onTemplateClick = (templateId: (typeof templates)[number]["id"]) => {
    setTemplate(templateId);
    router.push("/tools/builder/editor/contact");
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] border-b border-indigo-200/35 bg-gradient-to-b from-violet-50/45 via-indigo-50/30 to-amber-50/30 text-slate-900">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">
            Builder
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Template Gallery
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Pick a premium base layout and jump straight into the editor. You
            can refine content and styling in the next step.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {templates.map((template) => {
            const isActive = selectedTemplate === template.id;
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => onTemplateClick(template.id)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-white/90 text-left shadow-md shadow-indigo-950/5 backdrop-blur-sm transition-all duration-300",
                  "hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10",
                  isActive
                    ? "border-indigo-300 ring-1 ring-indigo-200"
                    : "border-indigo-100/90",
                )}
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden border-b border-indigo-100/80 bg-gradient-to-b from-violet-50/90 to-white">
                  <img
                    src={template.thumbnailUrl}
                    alt={`${template.name} thumbnail preview`}
                    className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-indigo-100/45 via-transparent to-transparent" />
                </div>

                <div className="space-y-3 p-6">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                      {template.name}
                    </h2>
                    {isActive ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200/90 bg-indigo-50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-indigo-700">
                        <SparklesIcon className="size-3.5" />
                        Selected
                      </span>
                    ) : null}
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600">
                    {template.description}
                  </p>

                  <div className="inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-indigo-700 transition group-hover:text-indigo-800">
                    Use this template
                    <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </section>
      </div>
    </main>
  );
}
