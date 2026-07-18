"use client";

import { useState } from "react";
import { CheckCircle2Icon, ChevronLeftIcon, ChevronRightIcon, SparklesIcon, Trash2Icon } from "lucide-react";

import { SortableExperienceList } from "@/components/features/builder/sortable-experience-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/stores/useBuilderStore";

const WIZARD_STEPS = [
  "Contact Info",
  "Summary",
  "Experience",
  "Education",
  "Skills",
  "Finalize",
] as const;

function ContactSection() {
  const fullName = useBuilderStore((s) => s.resume.basics.fullName);
  const jobTitle = useBuilderStore((s) => s.resume.basics.jobTitle);
  const email = useBuilderStore((s) => s.resume.basics.email);
  const phone = useBuilderStore((s) => s.resume.basics.phone);
  const location = useBuilderStore((s) => s.resume.basics.location);
  const updateBasics = useBuilderStore((s) => s.updateBasics);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-1 sm:col-span-2">
        <Label htmlFor="rb-fullName">Full name</Label>
        <Input
          id="rb-fullName"
          value={fullName}
          onChange={(e) => updateBasics({ fullName: e.target.value })}
          placeholder="Alex Rivera"
          className="bg-zinc-950/80"
          autoComplete="name"
        />
      </div>
      <div className="space-y-1 sm:col-span-2">
        <Label htmlFor="rb-jobTitle">Professional title</Label>
        <Input
          id="rb-jobTitle"
          value={jobTitle}
          onChange={(e) => updateBasics({ jobTitle: e.target.value })}
          placeholder="e.g. Frontend Engineer"
          className="bg-zinc-950/80"
        />
      </div>
      <div className="space-y-1 sm:col-span-2">
        <Label htmlFor="rb-email">Email</Label>
        <Input
          id="rb-email"
          type="email"
          value={email}
          onChange={(e) => updateBasics({ email: e.target.value })}
          placeholder="you@email.com"
          className="bg-zinc-950/80"
          autoComplete="email"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="rb-phone">Phone</Label>
        <Input
          id="rb-phone"
          value={phone}
          onChange={(e) => updateBasics({ phone: e.target.value })}
          placeholder="+1 · optional"
          className="bg-zinc-950/80"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="rb-location">Location</Label>
        <Input
          id="rb-location"
          value={location}
          onChange={(e) => updateBasics({ location: e.target.value })}
          placeholder="City, Country"
          className="bg-zinc-950/80"
        />
      </div>
    </div>
  );
}

function SummarySection() {
  const summary = useBuilderStore((s) => s.resume.basics.summary);
  const updateBasics = useBuilderStore((s) => s.updateBasics);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnhance = async () => {
    if (!summary.trim()) {
      setError("Please write a summary first before enhancing");
      return;
    }

    if (summary.trim().length < 5) {
      setError("Summary is too short to enhance");
      return;
    }

    setIsEnhancing(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/enhance-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentSummary: summary }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Failed to enhance summary");
      }

      updateBasics({ summary: data.result.enhanced_summary });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Enhancement failed";
      setError(message);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="rb-summary">Professional summary</Label>
      <Textarea
        id="rb-summary"
        value={summary}
        onChange={(e) => updateBasics({ summary: e.target.value })}
        placeholder="Two crisp lines on what you build and the impact."
        rows={7}
        className="resize-y bg-zinc-950/80"
        disabled={isEnhancing}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleEnhance}
        disabled={isEnhancing || !summary.trim()}
        className={cn(
          "w-full border-indigo-400/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-200 transition-all hover:from-indigo-500/20 hover:to-purple-500/20 hover:border-indigo-400/50",
          isEnhancing && "opacity-60 cursor-wait"
        )}
      >
        <SparklesIcon className={cn("mr-2 size-4", isEnhancing && "animate-pulse")} />
        {isEnhancing ? "Enhancing..." : "✨ Enhance with AI"}
      </Button>
      {error && (
        <p className="text-xs text-rose-400">{error}</p>
      )}
    </div>
  );
}

function SkillsSection() {
  const skills = useBuilderStore((s) => s.resume.skills);
  // Note: This is a legacy component - skills are now categorized in the step editor
  // Convert categorized skills to a string for display only
  const skillsString = typeof skills === 'object' && skills !== null ? 
    Object.values(skills).flat().join(', ') : '';

  return (
    <div className="space-y-1">
      <Label htmlFor="rb-skills">Skills (managed in step editor)</Label>
      <Textarea
        id="rb-skills"
        value={skillsString}
        disabled
        placeholder="Skills are managed in the step-by-step editor"
        rows={4}
        className="resize-y bg-zinc-950/80 opacity-60"
      />
    </div>
  );
}

function FinalizeSection() {
  const template = useBuilderStore((s) => s.design.template);
  const themeColor = useBuilderStore((s) => s.design.themeColor);
  const setTemplate = useBuilderStore((s) => s.setTemplate);
  const setThemeColor = useBuilderStore((s) => s.setThemeColor);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-white/10 bg-zinc-950/40 p-3">
        <Label className="mb-2 block">Template</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant={template === "modern" ? "default" : "outline"}
            className={cn(
              "h-11 text-xs",
              template === "modern"
                ? "bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
                : "border-white/20 bg-zinc-950/40 text-zinc-200",
            )}
            onClick={() => setTemplate("modern")}
          >
            Modern
          </Button>
          <Button
            type="button"
            variant={template === "classic" ? "default" : "outline"}
            className={cn(
              "h-11 text-xs",
              template === "classic"
                ? "bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
                : "border-white/20 bg-zinc-950/40 text-zinc-200",
            )}
            onClick={() => setTemplate("classic")}
          >
            Classic
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-zinc-950/40 p-3">
        <Label htmlFor="theme-color" className="mb-2 block">
          Accent color
        </Label>
        <div className="flex items-center gap-3">
          <Input
            id="theme-color"
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="h-10 w-16 cursor-pointer rounded-md border-white/15 bg-zinc-950/70 p-1"
          />
          <Input
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="bg-zinc-950/80 font-mono uppercase tracking-wide"
          />
        </div>
      </div>
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-3 text-xs text-emerald-100">
        Preview updates instantly. AI features are UI-mocked in frontend only for now.
      </div>
    </div>
  );
}

function EducationBlock({ id }: { id: string }) {
  const row = useBuilderStore((s) =>
    s.resume.education.find((e) => e.id === id),
  );
  const updateEducation = useBuilderStore((s) => s.updateEducation);
  const removeEducation = useBuilderStore((s) => s.removeEducation);
  if (!row) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-3 ring-1 ring-white/5">
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="text-xs font-medium text-zinc-400">Entry</span>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className="text-zinc-500 hover:text-rose-400"
          onClick={() => removeEducation(id)}
          aria-label="Remove education"
        >
          <Trash2Icon className="size-4" />
        </Button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor={`inst-${id}`}>Institution</Label>
          <Input
            id={`inst-${id}`}
            value={row.institution}
            onChange={(e) =>
              updateEducation(id, { institution: e.target.value })
            }
            placeholder="University"
            className="bg-zinc-950/80"
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor={`deg-${id}`}>Degree / program</Label>
          <Input
            id={`deg-${id}`}
            value={row.degree}
            onChange={(e) => updateEducation(id, { degree: e.target.value })}
            placeholder="B.S. Computer Science"
            className="bg-zinc-950/80"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`ed-start-${id}`}>Start</Label>
          <Input
            id={`ed-start-${id}`}
            value={row.startDate}
            onChange={(e) =>
              updateEducation(id, { startDate: e.target.value })
            }
            placeholder="2022"
            className="bg-zinc-950/80"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`ed-end-${id}`}>End</Label>
          <Input
            id={`ed-end-${id}`}
            value={row.endDate}
            onChange={(e) =>
              updateEducation(id, { endDate: e.target.value })
            }
            placeholder="2026"
            className="bg-zinc-950/80"
          />
        </div>
      </div>
    </div>
  );
}

function EducationSection() {
  const education = useBuilderStore((s) => s.resume.education);
  const addEducation = useBuilderStore((s) => s.addEducation);

  return (
    <div className="space-y-3">
      {education.map((e) => (
        <EducationBlock key={e.id} id={e.id} />
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full border-dashed border-white/15 bg-zinc-950/40 text-zinc-200 hover:bg-zinc-900/80"
        onClick={() => addEducation()}
      >
        Add education
      </Button>
    </div>
  );
}

export function ResumeBuilderForm() {
  const currentStep = useBuilderStore((s) => s.currentStep);
  const nextStep = useBuilderStore((s) => s.nextStep);
  const prevStep = useBuilderStore((s) => s.prevStep);
  const setCurrentStep = useBuilderStore((s) => s.setCurrentStep);

  const progress = ((currentStep + 1) / WIZARD_STEPS.length) * 100;

  const stepContent = [
    <ContactSection key="contact" />,
    <SummarySection key="summary" />,
    <SortableExperienceList key="experience" />,
    <EducationSection key="education" />,
    <SkillsSection key="skills" />,
    <FinalizeSection key="finalize" />,
  ][currentStep];

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/45 p-4 shadow-inner shadow-black/20 ring-1 ring-white/5 backdrop-blur-sm sm:p-5">
      <div className="mb-4">
        <h2 className="font-heading text-base font-semibold tracking-tight text-white">
          Resume wizard
        </h2>
        <p className="mt-0.5 text-xs text-zinc-400">
          Complete each step for a polished resume. All updates sync live to preview.
        </p>
      </div>
      <div className="mb-4 space-y-2 rounded-xl border border-white/10 bg-zinc-950/40 p-3">
        <div className="flex items-center justify-between text-[11px] font-medium text-zinc-400">
          <span>
            Step {currentStep + 1} of {WIZARD_STEPS.length}
          </span>
          <span>{WIZARD_STEPS[currentStep]}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
          {WIZARD_STEPS.map((step, index) => {
            const isDone = index < currentStep;
            const isActive = index === currentStep;
            return (
              <button
                key={step}
                type="button"
                onClick={() => setCurrentStep(index)}
                className={cn(
                  "inline-flex items-center justify-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-medium transition",
                  isActive
                    ? "bg-emerald-500/20 text-emerald-100 ring-1 ring-emerald-400/30"
                    : isDone
                      ? "bg-zinc-800/90 text-zinc-200"
                      : "bg-zinc-900/80 text-zinc-500",
                )}
              >
                {isDone ? <CheckCircle2Icon className="size-3" /> : null}
                <span className="truncate">{step}</span>
              </button>
            );
          })}
        </div>
      </div>
      <Separator className="mb-4 bg-white/10" />
      <div className="rounded-xl border border-white/10 bg-zinc-950/30 p-3">
        <div className="mb-3 flex items-center gap-2">
          <SparklesIcon className="size-4 text-emerald-300" />
          <h3 className="text-sm font-semibold text-zinc-100">
            {WIZARD_STEPS[currentStep]}
          </h3>
        </div>
        {stepContent}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          className="border-white/15 bg-zinc-950/40 text-zinc-200"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <ChevronLeftIcon className="mr-1 size-4" />
          Back
        </Button>
        <Button
          type="button"
          className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
          onClick={nextStep}
          disabled={currentStep === WIZARD_STEPS.length - 1}
        >
          Next
          <ChevronRightIcon className="ml-1 size-4" />
        </Button>
      </div>
    </div>
  );
}
