"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, SparklesIcon, Trash2Icon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

import {
  BUILDER_STEP_LABELS,
  BUILDER_STEPS,
  getNextStep,
  getPrevStep,
  isBuilderStep,
  type BuilderStep,
} from "@/components/features/builder/editor-steps";
import { TipTapEditor } from "@/components/features/builder/tiptap-editor";
import { DegreeAutocomplete } from "@/components/builder/DegreeAutocomplete";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useBuilderStore } from "@/stores/useBuilderStore";

const FIELD_CLASS =
  "h-12 border-slate-300 bg-white px-4 text-base text-slate-900 shadow-sm placeholder:text-slate-400";

function StepFrame({
  step,
  children,
}: {
  step: BuilderStep;
  children: ReactNode;
}) {
  const router = useRouter();
  const previousStep = getPrevStep(step);
  const nextStep = getNextStep(step);

  // Preserve resumeId query param across step navigation
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  const qs = resumeId ? `?resumeId=${resumeId}` : "";

  return (
    <div className="flex min-h-[calc(100vh-180px)] flex-col">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Builder Step</p>
          <h1 className="text-2xl font-semibold text-slate-900">{BUILDER_STEP_LABELS[step]}</h1>
        </div>
        <p className="text-xs text-slate-500">
          {BUILDER_STEPS.indexOf(step) + 1} / {BUILDER_STEPS.length}
        </p>
      </div>

      <div className="flex-1 space-y-5">{children}</div>

      <div className="mt-6 flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          disabled={!previousStep}
          onClick={() => {
            if (previousStep) router.push(`/tools/builder/editor/${previousStep}${qs}`);
          }}
        >
          <ChevronLeftIcon className="mr-1 size-4" />
          Back
        </Button>
        {nextStep ? (
          <Button
            type="button"
            className="bg-slate-900 text-white hover:bg-slate-800"
            onClick={() => router.push(`/tools/builder/editor/${nextStep}${qs}`)}
          >
            Next
            <ChevronRightIcon className="ml-1 size-4" />
          </Button>
        ) : (
          <Button
            type="button"
            className="bg-emerald-600 text-white hover:bg-emerald-500"
            onClick={() => window.print()}
          >
            Preview & Download
            <ChevronRightIcon className="ml-1 size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function ContactStep() {
  const basics = useBuilderStore((s) => s.resume.basics);
  const updateBasics = useBuilderStore((s) => s.updateBasics);
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="contact-fullName" className="text-slate-700">
            Full name
          </Label>
          <Input
            id="contact-fullName"
            value={basics.fullName}
            onChange={(e) => updateBasics({ fullName: e.target.value })}
            className={FIELD_CLASS}
            placeholder="Alex Rivera"
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="contact-jobTitle" className="text-slate-700">
            Professional title
          </Label>
          <Input
            id="contact-jobTitle"
            value={basics.jobTitle}
            onChange={(e) => updateBasics({ jobTitle: e.target.value })}
            className={FIELD_CLASS}
            placeholder="e.g. Frontend Engineer"
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="contact-email" className="text-slate-700">
            Email
          </Label>
          <Input
            id="contact-email"
            type="email"
            value={basics.email}
            onChange={(e) => updateBasics({ email: e.target.value })}
            className={FIELD_CLASS}
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="contact-phone" className="text-slate-700">
            Phone
          </Label>
          <Input
            id="contact-phone"
            value={basics.phone}
            onChange={(e) => updateBasics({ phone: e.target.value })}
            className={FIELD_CLASS}
            placeholder="+1 555 0123"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="contact-location" className="text-slate-700">
            Location
          </Label>
          <Input
            id="contact-location"
            value={basics.location}
            onChange={(e) => updateBasics({ location: e.target.value })}
            className={FIELD_CLASS}
            placeholder="City, Country"
          />
        </div>
      </div>
    </>
  );
}

function SummaryStep() {
  const summary = useBuilderStore((s) => s.resume.basics.summary);
  const updateBasics = useBuilderStore((s) => s.updateBasics);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnhance = async () => {
    // Strip HTML tags to get plain text for validation
    const plainText = summary.replace(/<[^>]*>/g, '').trim();
    
    if (!plainText) {
      setError("Please write a summary first before enhancing");
      return;
    }

    if (plainText.length < 3) {
      setError("Summary is too short to enhance");
      return;
    }

    setIsEnhancing(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/enhance-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentSummary: plainText }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Failed to enhance summary");
      }

      // Replace with enhanced plain text (TipTap will handle formatting)
      updateBasics({ summary: data.result.enhanced_summary });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Enhancement failed";
      setError(message);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-slate-700">Professional summary</Label>
      <TipTapEditor
        value={summary}
        onChange={(html) => updateBasics({ summary: html })}
        placeholder="Use bold/italic/bullets to structure your value proposition."
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleEnhance}
        disabled={isEnhancing || !summary.replace(/<[^>]*>/g, '').trim()}
        className="w-full border-indigo-400/40 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 transition-all hover:from-indigo-100 hover:to-purple-100 hover:border-indigo-500/50 disabled:opacity-50"
      >
        <SparklesIcon className={`mr-2 size-4 ${isEnhancing ? 'animate-pulse' : ''}`} />
        {isEnhancing ? "Enhancing..." : "✨ Enhance with AI"}
      </Button>
      {error && (
        <p className="text-xs text-rose-600">{error}</p>
      )}
    </div>
  );
}

function ExperienceStep() {
  const experience = useBuilderStore((s) => s.resume.experience);
  const addExperience = useBuilderStore((s) => s.addExperience);
  const removeExperience = useBuilderStore((s) => s.removeExperience);
  const updateExperience = useBuilderStore((s) => s.updateExperience);

  return (
    <div className="space-y-4">
      {experience.map((item) => (
        <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-start justify-between gap-2">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Role</p>
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              className="text-slate-500 hover:text-rose-500"
              onClick={() => removeExperience(item.id)}
            >
              <Trash2Icon className="size-4" />
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor={`role-${item.id}`} className="text-slate-700">
                Title
              </Label>
              <Input
                id={`role-${item.id}`}
                value={item.role}
                onChange={(e) => updateExperience(item.id, { role: e.target.value })}
                className={FIELD_CLASS}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`company-${item.id}`} className="text-slate-700">
                Company
              </Label>
              <Input
                id={`company-${item.id}`}
                value={item.company}
                onChange={(e) => updateExperience(item.id, { company: e.target.value })}
                className={FIELD_CLASS}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`start-${item.id}`} className="text-slate-700">
                Start date
              </Label>
              <DatePicker
                value={item.startDate}
                onChange={(date) => updateExperience(item.id, { startDate: date })}
                placeholder="Select start date"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`end-${item.id}`} className="text-slate-700">
                End date
              </Label>
              <DatePicker
                value={item.endDate}
                onChange={(date) => updateExperience(item.id, { endDate: date })}
                placeholder="Select end date or type 'Present'"
              />
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <Label className="text-slate-700">Impact details</Label>
            <TipTapEditor
              value={item.description}
              onChange={(html) => updateExperience(item.id, { description: html })}
              placeholder="Capture achievements as bullets."
            />
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
        onClick={() => addExperience()}
      >
        <PlusIcon className="mr-1 size-4" />
        Add experience
      </Button>
    </div>
  );
}

function EducationStep() {
  const education = useBuilderStore((s) => s.resume.education);
  const addEducation = useBuilderStore((s) => s.addEducation);
  const removeEducation = useBuilderStore((s) => s.removeEducation);
  const updateEducation = useBuilderStore((s) => s.updateEducation);

  return (
    <div className="space-y-4">
      {education.map((row) => (
        <div key={row.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-start justify-between gap-2">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Education</p>
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              className="text-slate-500 hover:text-rose-500"
              onClick={() => removeEducation(row.id)}
            >
              <Trash2Icon className="size-4" />
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor={`institution-${row.id}`} className="text-slate-700">
                Institution
              </Label>
              <Input
                id={`institution-${row.id}`}
                value={row.institution}
                onChange={(e) => updateEducation(row.id, { institution: e.target.value })}
                className={FIELD_CLASS}
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor={`degree-${row.id}`} className="text-slate-700">
                Degree
              </Label>
              <DegreeAutocomplete
                id={`degree-${row.id}`}
                value={row.degree}
                onChange={(val) => updateEducation(row.id, { degree: val })}
                placeholder="e.g. Bachelor of Technology (B.Tech)"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`ed-start-${row.id}`} className="text-slate-700">
                Start date
              </Label>
              <DatePicker
                value={row.startDate}
                onChange={(date) => updateEducation(row.id, { startDate: date })}
                placeholder="Select start date"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`ed-end-${row.id}`} className="text-slate-700">
                End date
              </Label>
              <DatePicker
                value={row.endDate}
                onChange={(date) => updateEducation(row.id, { endDate: date })}
                placeholder="Select end date or type 'Expected'"
              />
            </div>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
        onClick={() => addEducation()}
      >
        <PlusIcon className="mr-1 size-4" />
        Add education
      </Button>
    </div>
  );
}

function SkillsStep() {
  const skills = useBuilderStore((s) => s.resume.skills);
  const jobTitle = useBuilderStore((s) => s.resume.basics.jobTitle);
  const setSkills = useBuilderStore((s) => s.setSkills);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const currentSkillsArray = skills
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const handleGetSuggestions = async () => {
    if (!jobTitle.trim()) {
      setError("Please add a job title in the Contact step first");
      return;
    }

    setIsSuggesting(true);
    setError(null);
    setSuggestions([]);

    try {
      const response = await fetch("/api/ai/suggest-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          currentSkills: currentSkillsArray,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Failed to get skill suggestions");
      }

      setSuggestions(data.result.suggested_skills);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Suggestion failed";
      setError(message);
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleAddSkill = (skill: string) => {
    const currentSkills = skills.trim();
    const newSkills = currentSkills
      ? `${currentSkills}, ${skill}`
      : skill;
    setSkills(newSkills);
    setSuggestions(suggestions.filter((s) => s !== skill));
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="skills-input" className="text-slate-700">
        Skills (comma or new-line separated)
      </Label>
      <Textarea
        id="skills-input"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        rows={6}
        className="min-h-40 resize-y border-slate-300 bg-white p-4 text-base text-slate-900 shadow-sm placeholder:text-slate-400"
      />
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleGetSuggestions}
        disabled={isSuggesting || !jobTitle.trim()}
        className="w-full border-indigo-400/40 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 transition-all hover:from-indigo-100 hover:to-purple-100 hover:border-indigo-500/50 disabled:opacity-50"
      >
        <SparklesIcon className={`mr-2 size-4 ${isSuggesting ? 'animate-pulse' : ''}`} />
        {isSuggesting ? "Getting suggestions..." : "✨ Suggest Skills with AI"}
      </Button>

      {error && (
        <p className="text-xs text-rose-600">{error}</p>
      )}

      {suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-600">
            Suggested skills for {jobTitle}:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleAddSkill(skill)}
                className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 transition-all hover:bg-indigo-100 hover:border-indigo-300"
              >
                <PlusIcon className="size-3.5" />
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EditorStepPage() {
  const params = useParams<{ step: string }>();
  const stepParam = params.step;
  const step = isBuilderStep(stepParam) ? stepParam : "contact";

  const contentMap: Record<BuilderStep, ReactNode> = {
    contact: <ContactStep />,
    summary: <SummaryStep />,
    experience: <ExperienceStep />,
    education: <EducationStep />,
    skills: <SkillsStep />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 22 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -22 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <StepFrame step={step}>{contentMap[step]}</StepFrame>
      </motion.div>
    </AnimatePresence>
  );
}
