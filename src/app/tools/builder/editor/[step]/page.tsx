"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
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
            if (previousStep) router.push(`/tools/builder/editor/${previousStep}`);
          }}
        >
          <ChevronLeftIcon className="mr-1 size-4" />
          Back
        </Button>
        <Button
          type="button"
          className="bg-slate-900 text-white hover:bg-slate-800"
          disabled={!nextStep}
          onClick={() => {
            if (nextStep) router.push(`/tools/builder/editor/${nextStep}`);
          }}
        >
          Next
          <ChevronRightIcon className="ml-1 size-4" />
        </Button>
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
  return (
    <div className="space-y-2">
      <Label className="text-slate-700">Professional summary</Label>
      <TipTapEditor
        value={summary}
        onChange={(html) => updateBasics({ summary: html })}
        placeholder="Use bold/italic/bullets to structure your value proposition."
      />
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
                Start
              </Label>
              <Input
                id={`start-${item.id}`}
                value={item.startDate}
                onChange={(e) => updateExperience(item.id, { startDate: e.target.value })}
                className={FIELD_CLASS}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`end-${item.id}`} className="text-slate-700">
                End
              </Label>
              <Input
                id={`end-${item.id}`}
                value={item.endDate}
                onChange={(e) => updateExperience(item.id, { endDate: e.target.value })}
                className={FIELD_CLASS}
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
              <Input
                id={`degree-${row.id}`}
                value={row.degree}
                onChange={(e) => updateEducation(row.id, { degree: e.target.value })}
                className={FIELD_CLASS}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`ed-start-${row.id}`} className="text-slate-700">
                Start
              </Label>
              <Input
                id={`ed-start-${row.id}`}
                value={row.startDate}
                onChange={(e) => updateEducation(row.id, { startDate: e.target.value })}
                className={FIELD_CLASS}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`ed-end-${row.id}`} className="text-slate-700">
                End
              </Label>
              <Input
                id={`ed-end-${row.id}`}
                value={row.endDate}
                onChange={(e) => updateEducation(row.id, { endDate: e.target.value })}
                className={FIELD_CLASS}
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
  const setSkills = useBuilderStore((s) => s.setSkills);
  return (
    <div className="space-y-2">
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
