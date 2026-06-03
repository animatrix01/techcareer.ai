"use client";

import { useState } from "react";
import { CheckIcon, ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { createNewResume } from "@/actions/resume";
import { ResumePreview } from "@/components/features/builder/resume-preview";
import { templates, type TemplateCategory } from "@/lib/config/templates";
import { SAMPLE_RESUME, SAMPLE_PROFILES } from "@/lib/config/sample-resume";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/stores/useBuilderStore";

const filterCategories: TemplateCategory[] = [
  "All Templates",
  "ATS Friendly",
  "Modern",
  "Minimal",
  "Executive",
  "Creative",
  "Professional",
  "Startup",
  "Developer",
  "Student",
];

export default function BuilderTemplatesPage() {
  const router = useRouter();
  const selectedTemplate = useBuilderStore((s) => s.design.template);
  const setTemplate = useBuilderStore((s) => s.setTemplate);
  const setThemeColor = useBuilderStore((s) => s.setThemeColor);
  const resetResume = useBuilderStore((s) => s.resetResume);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<TemplateCategory>("All Templates");

  const filteredTemplates =
    activeFilter === "All Templates"
      ? templates
      : templates.filter((t) => t.category === activeFilter);

  const onTemplateClick = async (templateId: (typeof templates)[number]["id"]) => {
    setLoadingId(templateId);
    try {
      const tpl = templates.find((t) => t.id === templateId);
      const color = tpl?.defaultThemeColor ?? "#1a2e35";
      // Reset first, then set template so it isn't overwritten by resetResume
      resetResume();
      setTemplate(templateId);
      setThemeColor(color);
      // Save template + themeColor into the DB row immediately
      const resumeId = await createNewResume("Untitled Resume", templateId, color);
      router.push(`/tools/builder/editor/contact?resumeId=${resumeId}`);
    } catch (err) {
      console.error("Failed to create resume:", err);
      setLoadingId(null);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">
            Resume Builder
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Choose your template
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
            All templates use the same data — switch anytime without losing your content.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="mb-8 flex flex-wrap gap-2">
          {filterCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                activeFilter === category
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300"
              )}
            >
              {category}
              {category !== "All Templates" && (
                <span className="ml-1.5 text-xs opacity-75">
                  ({templates.filter((t) => t.category === category).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => {
            const isActive = selectedTemplate === template.id;
            const isLoading = loadingId === template.id;

            return (
              <button
                key={template.id}
                type="button"
                disabled={loadingId !== null}
                onClick={() => onTemplateClick(template.id)}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition-all duration-200",
                  "hover:-translate-y-0.5 hover:shadow-lg",
                  isActive
                    ? "border-indigo-400 ring-2 ring-indigo-200"
                    : "border-slate-200 hover:border-slate-300",
                  loadingId !== null && !isLoading && "cursor-wait opacity-60",
                )}
              >
                {/* Selected badge */}
                {isActive && (
                  <div className="absolute right-3 top-3 z-10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
                      <CheckIcon className="size-3" />
                      Selected
                    </span>
                  </div>
                )}

                {/* Live preview thumbnail */}
                <div className="relative h-[380px] w-full overflow-hidden bg-slate-100">
                  {/* A4 canvas scaled to fit the card */}
                  <div
                    className="pointer-events-none absolute"
                    style={{
                      width: "210mm",
                      height: "297mm",
                      transform: "scale(0.48)",
                      transformOrigin: "top center",
                      top: 0,
                      left: "50%",
                      marginLeft: "-105mm",
                      imageRendering: "crisp-edges",
                      WebkitFontSmoothing: "antialiased",
                    }}
                  >
                    <ResumePreview
                      resume={SAMPLE_PROFILES[template.id] || SAMPLE_RESUME}
                      template={template.id}
                      themeColor={template.defaultThemeColor}
                    />
                  </div>
                  {/* Gradient fade at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/60 to-transparent" />
                </div>

                {/* Card footer */}
                <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{template.name}</p>
                    <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">{template.description}</p>
                  </div>
                  <div
                    className={cn(
                      "flex shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition",
                      isLoading ? "opacity-70" : "group-hover:opacity-90",
                    )}
                    style={{ backgroundColor: template.defaultThemeColor }}
                  >
                    {isLoading ? "Creating..." : "Use"}
                    <ArrowRightIcon className="size-3" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredTemplates.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg font-semibold text-slate-900">No templates found</p>
            <p className="mt-2 text-sm text-slate-500">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
