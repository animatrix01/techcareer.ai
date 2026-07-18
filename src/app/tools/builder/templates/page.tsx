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
      
      console.log("🎨 Template selected:", {
        templateId,
        templateFound: !!tpl,
        color,
        colorLength: color.length,
        templateDefaultColor: tpl?.defaultThemeColor,
      });
      
      // Reset first, then set template so it isn't overwritten by resetResume
      resetResume();
      setTemplate(templateId);
      setThemeColor(color);
      
      console.log("💾 Creating new resume with:", { templateId, color });
      
      // Save template + themeColor into the DB row immediately
      const resumeId = await createNewResume("Untitled Resume", templateId, color);
      
      console.log("✅ Resume created with ID:", resumeId);
      
      router.push(`/tools/builder/editor/contact?resumeId=${resumeId}`);
    } catch (err) {
      console.error("Failed to create resume:", err);
      setLoadingId(null);
      
      const errorMessage = err instanceof Error ? err.message : "Failed to create resume";
      const isQuotaError = errorMessage.includes("Free tier limit");

      import("sonner").then(({ toast }) => {
        if (isQuotaError) {
          toast.error("Resume limit reached", {
            description: "You've used all 10 resume slots. Delete an existing resume to create a new one.",
            action: {
              label: "Go to Dashboard",
              onClick: () => router.push("/dashboard"),
            },
            duration: 6000,
          });
          // Redirect to dashboard after a short delay so the toast is readable
          setTimeout(() => router.push("/dashboard"), 1500);
        } else {
          toast.error("Template selection failed", {
            description: errorMessage,
            action: {
              label: "Try Again",
              onClick: () => onTemplateClick(templateId),
            },
          });
        }
      });
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)]">

      <div className="mx-auto w-full max-w-[1180px] px-6 py-16">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo/10 border border-indigo/20 px-4 py-1.5 text-xs font-medium text-indigo uppercase tracking-wider">
            Resume Builder
          </div>
          <h1 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-ink">
            Choose your template
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            All templates use the same data — switch anytime without losing your content.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="mb-10 flex flex-wrap gap-2">
          {filterCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium border transition-all duration-200",
                activeFilter === category
                  ? "bg-ink text-paper border-ink"
                  : "bg-paper/50 border-border text-muted-foreground hover:text-ink hover:bg-paper/80 backdrop-blur-sm"
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
                  "group relative tile flex flex-col overflow-hidden text-left transition-all duration-300",
                  "hover:-translate-y-2 hover:shadow-float",
                  isActive && "ring-2 ring-indigo ring-offset-2",
                  loadingId !== null && !isLoading && "cursor-wait opacity-60",
                )}
              >
                {/* Selected badge */}
                {isActive && (
                  <div className="absolute right-3 top-3 z-10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo px-3 py-1 text-xs font-semibold text-paper shadow-soft">
                      <CheckIcon className="size-3" />
                      Selected
                    </span>
                  </div>
                )}

                {/* Live preview thumbnail */}
                <div className="relative h-[380px] w-full overflow-hidden bg-muted/30">
                  <div
                    className="pointer-events-none"
                    style={{
                      width: "794px",
                      height: "1123px",
                      transform: "scale(0.455)",
                      transformOrigin: "top left",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  >
                    <ResumePreview
                      resume={SAMPLE_PROFILES[template.id] || SAMPLE_RESUME}
                      template={template.id}
                      themeColor={template.defaultThemeColor}
                    />
                  </div>
                </div>

                {/* Card footer */}
                <div className="flex items-center justify-between gap-3 border-t border-border bg-paper/80 backdrop-blur-sm px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">{template.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{template.description}</p>
                  </div>
                  <div
                    className={cn(
                      "flex shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition shadow-soft",
                      isLoading ? "opacity-70" : "group-hover:shadow-float",
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
          <div className="tile flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg font-semibold text-ink">No templates found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
