"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, EyeIcon, PlusIcon, SparklesIcon, Trash2Icon } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useBuilderStore, type SkillCategory, type EmploymentType, type WorkMode } from "@/stores/useBuilderStore";
import { saveBuilderResume } from "@/actions/resume";

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
  const currentIndex = BUILDER_STEPS.indexOf(step);

  const resume = useBuilderStore((s) => s.resume);
  const design = useBuilderStore((s) => s.design);

  const [isSaving, setIsSaving] = useState(false);

  // Preserve resumeId query param across step navigation
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  const qs = resumeId ? `?resumeId=${resumeId}` : "";

  // Save current step to localStorage so preview knows where to return
  if (typeof window !== 'undefined' && resumeId) {
    localStorage.setItem(`resume-${resumeId}-lastStep`, step);
  }

  const handlePreview = async () => {
    if (!resumeId) return;
    setIsSaving(true);
    try {
      console.log("[handlePreview] Saving resume data:", {
        resumeId,
        title: resume.basics.fullName || "Untitled Resume",
        resume,
        template: design.template,
        themeColor: design.themeColor,
      });
      await saveBuilderResume({
        resumeId,
        title: resume.basics.fullName || "Untitled Resume",
        resume,
        template: design.template,
        themeColor: design.themeColor,
      });
      router.push(`/tools/builder/preview?resumeId=${resumeId}&step=${step}`);
    } catch (error) {
      console.error("[handlePreview] Save failed:", error);
      import("sonner").then(({ toast }) => {
        toast.error("Failed to save", { description: error instanceof Error ? error.message : "Please try again" });
      });
    } finally {
      setIsSaving(false);
    }
  };

  const stepIcons: Record<BuilderStep, string> = {
    contact:        "👤",
    summary:        "📝",
    experience:     "💼",
    education:      "🎓",
    skills:         "⚡",
    certifications: "🏆",
    projects:       "🚀",
  };

  return (
    <div className="flex min-h-[calc(100vh-180px)] flex-col">
      {/* ── Step header ── */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Step {currentIndex + 1} of {BUILDER_STEPS.length}</p>
          <h1 className="text-2xl font-semibold text-slate-900">{BUILDER_STEP_LABELS[step]}</h1>
        </div>
      </div>

      {/* ── Clickable step progress pills ── */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {BUILDER_STEPS.map((s, i) => {
          const isDone = i < currentIndex;
          const isActive = s === step;
          return (
            <button
              key={s}
              type="button"
              onClick={() => router.push(`/tools/builder/editor/${s}${qs}`)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all border ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : isDone
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                  : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {isDone ? (
                <CheckIcon className="size-3" />
              ) : (
                <span>{stepIcons[s]}</span>
              )}
              {BUILDER_STEP_LABELS[s]}
            </button>
          );
        })}
      </div>

      <div className="flex-1 space-y-5">{children}</div>

      {/* ── Bottom navigation ── */}
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
            className="bg-indigo-600 text-white hover:bg-indigo-700"
            disabled={isSaving || !resumeId}
            onClick={handlePreview}
          >
            <EyeIcon className="mr-1.5 size-4" />
            {isSaving ? "Saving..." : "Preview & Download"}
          </Button>
        )}
      </div>
    </div>
  );
}

function ContactStep() {
  const basics = useBuilderStore((s) => s.resume.basics);
  const updateBasics = useBuilderStore((s) => s.updateBasics);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    try {
      // Validate individual field
      if (name === "fullName") {
        if (value.length < 2) throw new Error("Name must be at least 2 characters");
        if (value.length > 100) throw new Error("Name is too long");
      }
      if (name === "jobTitle") {
        if (value.length < 2) throw new Error("Job title is required");
        if (value.length > 100) throw new Error("Job title is too long");
      }
      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) throw new Error("Please enter a valid email address");
      }
      if (name === "phone" && value) {
        if (value.length < 10) throw new Error("Phone number must be at least 10 digits");
      }
      if (name === "location") {
        if (value.length < 2) throw new Error("Location is required");
      }
      
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      if (error instanceof Error) {
        setErrors((prev) => ({ ...prev, [name]: error.message }));
      }
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, basics[name as keyof typeof basics] as string);
  };

  const handleChange = (name: string, value: string) => {
    updateBasics({ [name]: value });
    if (touched[name]) {
      validateField(name, value);
    }
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="contact-fullName" className="text-slate-700 flex items-center gap-1">
            Full name
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="contact-fullName"
            value={basics.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            className={`${FIELD_CLASS} ${errors.fullName && touched.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
            placeholder="Alex Rivera"
          />
          {errors.fullName && touched.fullName && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{errors.fullName}</span>
            </div>
          )}
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="contact-jobTitle" className="text-slate-700 flex items-center gap-1">
            Professional title
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="contact-jobTitle"
            value={basics.jobTitle}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
            onBlur={() => handleBlur("jobTitle")}
            className={`${FIELD_CLASS} ${errors.jobTitle && touched.jobTitle ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
            placeholder="e.g. Frontend Engineer"
          />
          {errors.jobTitle && touched.jobTitle && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{errors.jobTitle}</span>
            </div>
          )}
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="contact-email" className="text-slate-700 flex items-center gap-1">
            Email
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="contact-email"
            type="email"
            value={basics.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`${FIELD_CLASS} ${errors.email && touched.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
            placeholder="you@example.com"
          />
          {errors.email && touched.email && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{errors.email}</span>
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-phone" className="text-slate-700">
            Phone
          </Label>
          <Input
            id="contact-phone"
            value={basics.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            className={`${FIELD_CLASS} ${errors.phone && touched.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
            placeholder="+1 555 0123"
          />
          {errors.phone && touched.phone && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{errors.phone}</span>
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-location" className="text-slate-700 flex items-center gap-1">
            Location
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="contact-location"
            value={basics.location}
            onChange={(e) => handleChange("location", e.target.value)}
            onBlur={() => handleBlur("location")}
            className={`${FIELD_CLASS} ${errors.location && touched.location ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
            placeholder="City, Country"
          />
          {errors.location && touched.location && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{errors.location}</span>
            </div>
          )}
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
  const [validationError, setValidationError] = useState<string>("");

  // Real-time validation
  const validateSummary = (text: string) => {
    const plainText = text.replace(/<[^>]*>/g, '').trim();
    if (plainText.length > 0 && plainText.length < 50) {
      setValidationError("Summary should be at least 50 characters");
    } else if (plainText.length > 1000) {
      setValidationError("Summary is too long (max 1000 characters)");
    } else {
      setValidationError("");
    }
  };

  const handleEnhance = async () => {
    // Strip HTML tags to get plain text for validation
    const plainText = summary.replace(/<[^>]*>/g, '').trim();
    
    if (!plainText) {
      setError("Please write a summary first before enhancing");
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (plainText.length < 3) {
      setError("Summary is too short to enhance");
      setTimeout(() => setError(null), 3000);
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
      
      // Show success toast
      import("sonner").then(({ toast }) => {
        toast.success("Summary enhanced successfully!");
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Enhancement failed";
      setError(message);
      
      // Show error toast
      import("sonner").then(({ toast }) => {
        toast.error(message);
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const plainTextLength = summary.replace(/<[^>]*>/g, '').trim().length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-slate-700 flex items-center gap-1">
          Professional summary
          <span className="text-red-500">*</span>
        </Label>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className={plainTextLength < 50 ? "text-red-500 font-medium" : ""}>
            {plainTextLength} / 1000 characters
          </span>
          <span className="text-slate-400">•</span>
          <span>{Math.ceil(plainTextLength / 5)} words</span>
        </div>
      </div>
      
      <TipTapEditor
        value={summary}
        onChange={(html) => {
          updateBasics({ summary: html });
          validateSummary(html);
        }}
        placeholder="Use bold/italic/bullets to structure your value proposition."
      />
      
      {validationError && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>{validationError}</span>
        </div>
      )}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleEnhance}
        disabled={isEnhancing || !summary.replace(/<[^>]*>/g, '').trim() || plainTextLength < 20}
        className="w-full border-indigo-400/40 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 transition-all hover:from-indigo-100 hover:to-purple-100 hover:border-indigo-500/50 disabled:opacity-50"
      >
        <SparklesIcon className={`mr-2 size-4 ${isEnhancing ? 'animate-pulse' : ''}`} />
        {isEnhancing ? "Enhancing..." : "✨ Enhance with AI"}
      </Button>
      {error && (
        <p className="text-xs text-rose-600 animate-in fade-in slide-in-from-top-1 duration-200">{error}</p>
      )}
    </div>
  );
}

function ExperienceStep() {
  const experience = useBuilderStore((s) => s.resume.experience);
  const addExperience = useBuilderStore((s) => s.addExperience);
  const removeExperience = useBuilderStore((s) => s.removeExperience);
  const updateExperience = useBuilderStore((s) => s.updateExperience);
  const duplicateExperience = useBuilderStore((s) => s.duplicateExperience);
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});
  const [touched, setTouched] = useState<Record<string, Record<string, boolean>>>({});
  const [collapsedItems, setCollapsedItems] = useState<Set<string>>(new Set());
  const [techInputs, setTechInputs] = useState<Record<string, string>>({});

  const validateField = (itemId: string, field: string, value: string | boolean) => {
    let error = "";
    
    if (field === "role" && typeof value === "string" && value.length > 0 && value.length < 2) {
      error = "Role/title must be at least 2 characters";
    }
    if (field === "company" && typeof value === "string" && value.length > 0 && value.length < 2) {
      error = "Company name must be at least 2 characters";
    }
    if (field === "description" && typeof value === "string") {
      const plainText = value.replace(/<[^>]*>/g, '').trim();
      if (plainText.length > 0 && plainText.length < 20) {
        error = "Please provide more detail about your role";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [field]: error,
      },
    }));
  };

  const handleBlur = (itemId: string, field: string) => {
    setTouched((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [field]: true,
      },
    }));
  };

  const handleRemove = (id: string) => {
    removeExperience(id);
    
    import("sonner").then(({ toast }) => {
      toast.success("Experience removed");
    });
  };

  const handleAdd = () => {
    addExperience();
    
    import("sonner").then(({ toast }) => {
      toast.success("Experience added", {
        description: "Fill in the details below"
      });
    });
  };

  const handleDuplicate = (id: string) => {
    duplicateExperience(id);
    
    import("sonner").then(({ toast }) => {
      toast.success("Experience duplicated");
    });
  };

  const toggleCollapse = (id: string) => {
    setCollapsedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleAddTech = (itemId: string, tech: string) => {
    const item = experience.find((e) => e.id === itemId);
    if (!item || !tech.trim()) return;
    
    if (item.technologies.includes(tech.trim())) {
      import("sonner").then(({ toast }) => {
        toast.error("Technology already added");
      });
      return;
    }
    
    updateExperience(itemId, {
      technologies: [...item.technologies, tech.trim()],
    });
    
    setTechInputs((prev) => ({ ...prev, [itemId]: "" }));
  };

  const handleRemoveTech = (itemId: string, tech: string) => {
    const item = experience.find((e) => e.id === itemId);
    if (!item) return;
    
    updateExperience(itemId, {
      technologies: item.technologies.filter((t) => t !== tech),
    });
  };

  return (
    <div className="space-y-4">
      {experience.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center">
          <p className="text-sm text-slate-600 mb-4">No experience added yet</p>
          <p className="text-xs text-slate-500">Add your work experience to showcase your achievements</p>
        </div>
      )}
      
      {experience.map((item, index) => {
        const itemErrors = errors[item.id] || {};
        const itemTouched = touched[item.id] || {};
        const isCollapsed = collapsedItems.has(item.id);
        
        return (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Collapsible Header */}
            <div className="mb-3 flex items-start justify-between gap-2">
              <button
                type="button"
                onClick={() => toggleCollapse(item.id)}
                className="flex items-center gap-2 text-left flex-1 hover:opacity-70 transition-opacity"
              >
                <svg
                  className={`size-4 text-slate-500 transition-transform flex-shrink-0 ${isCollapsed ? "" : "rotate-90"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Experience {index + 1}
                  </p>
                  {isCollapsed && (item.role || item.company) && (
                    <p className="text-sm font-medium text-slate-700 mt-0.5 truncate">
                      {item.role}{item.role && item.company ? ' at ' : ''}{item.company}
                    </p>
                  )}
                </div>
              </button>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  className="text-slate-500 hover:text-blue-600 transition-colors"
                  onClick={() => handleDuplicate(item.id)}
                  title="Duplicate"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                  </svg>
                </Button>
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  className="text-slate-500 hover:text-rose-500 transition-colors"
                  onClick={() => handleRemove(item.id)}
                  title="Delete"
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            </div>
            
            {/* Form Fields - Only show when not collapsed */}
            {!isCollapsed && (
              <>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor={`role-${item.id}`} className="text-slate-700 flex items-center gap-1">
                  Title
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`role-${item.id}`}
                  value={item.role}
                  onChange={(e) => {
                    updateExperience(item.id, { role: e.target.value });
                    if (itemTouched.role) {
                      validateField(item.id, "role", e.target.value);
                    }
                  }}
                  onBlur={() => {
                    handleBlur(item.id, "role");
                    validateField(item.id, "role", item.role);
                  }}
                  className={`${FIELD_CLASS} ${itemErrors.role && itemTouched.role ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="e.g. Senior Software Engineer"
                />
                {itemErrors.role && itemTouched.role && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span>{itemErrors.role}</span>
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`company-${item.id}`} className="text-slate-700 flex items-center gap-1">
                  Company
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`company-${item.id}`}
                  value={item.company}
                  onChange={(e) => {
                    updateExperience(item.id, { company: e.target.value });
                    if (itemTouched.company) {
                      validateField(item.id, "company", e.target.value);
                    }
                  }}
                  onBlur={() => {
                    handleBlur(item.id, "company");
                    validateField(item.id, "company", item.company);
                  }}
                  className={`${FIELD_CLASS} ${itemErrors.company && itemTouched.company ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="e.g. Google"
                />
                {itemErrors.company && itemTouched.company && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span>{itemErrors.company}</span>
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`company-website-${item.id}`} className="text-slate-700">
                  Company Website
                </Label>
                <Input
                  id={`company-website-${item.id}`}
                  type="url"
                  value={item.companyWebsite || ""}
                  onChange={(e) => updateExperience(item.id, { companyWebsite: e.target.value })}
                  className={FIELD_CLASS}
                  placeholder="e.g. https://company.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`location-${item.id}`} className="text-slate-700">
                  Location
                </Label>
                <Input
                  id={`location-${item.id}`}
                  value={item.location || ""}
                  onChange={(e) => updateExperience(item.id, { location: e.target.value })}
                  className={FIELD_CLASS}
                  placeholder="e.g. San Francisco, CA"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`employment-type-${item.id}`} className="text-slate-700">
                  Employment Type
                </Label>
                <Select
                  value={item.employmentType || ""}
                  onValueChange={(value) => updateExperience(item.id, { employmentType: value as EmploymentType })}
                >
                  <SelectTrigger id={`employment-type-${item.id}`} className={FIELD_CLASS}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`work-mode-${item.id}`} className="text-slate-700">
                  Work Mode
                </Label>
                <Select
                  value={item.workMode || ""}
                  onValueChange={(value) => updateExperience(item.id, { workMode: value as WorkMode })}
                >
                  <SelectTrigger id={`work-mode-${item.id}`} className={FIELD_CLASS}>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`start-${item.id}`} className="text-slate-700 flex items-center gap-1">
                  Start date
                  <span className="text-red-500">*</span>
                </Label>
                <DatePicker
                  value={item.startDate}
                  onChange={(date) => updateExperience(item.id, { startDate: date })}
                  placeholder="Select start date"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`end-${item.id}`} className="text-slate-700 flex items-center gap-1">
                  End date
                  {!item.currentlyWorking && <span className="text-red-500">*</span>}
                </Label>
                <DatePicker
                  value={item.currentlyWorking ? "" : item.endDate}
                  onChange={(date) => updateExperience(item.id, { endDate: date })}
                  placeholder={item.currentlyWorking ? "Present" : "Select end date"}
                  disabled={item.currentlyWorking}
                />
                <div className="flex items-center gap-2 pt-1">
                  <Checkbox
                    id={`currently-working-${item.id}`}
                    checked={item.currentlyWorking || false}
                    onCheckedChange={(checked) => {
                      updateExperience(item.id, { 
                        currentlyWorking: checked as boolean,
                        endDate: checked ? "" : item.endDate
                      });
                    }}
                  />
                  <Label 
                    htmlFor={`currently-working-${item.id}`} 
                    className="text-sm text-slate-600 font-normal cursor-pointer"
                  >
                    I currently work here
                  </Label>
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <Label className="text-slate-700 flex items-center gap-1">
                Impact details
                <span className="text-red-500">*</span>
              </Label>
              <TipTapEditor
                value={item.description}
                onChange={(html) => {
                  updateExperience(item.id, { description: html });
                  if (itemTouched.description) {
                    validateField(item.id, "description", html);
                  }
                }}
                placeholder="• Led a team of 5 engineers to deliver...&#10;• Increased performance by 40%...&#10;• Implemented key features that..."
              />
              {itemErrors.description && itemTouched.description && (
                <div className="flex items-center gap-1.5 text-xs text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>{itemErrors.description}</span>
                </div>
              )}
            </div>
            <div className="mt-3 space-y-2">
              <Label className="text-slate-700">
                Key Achievements
              </Label>
              <p className="text-xs text-slate-500 -mt-1">
                Highlight measurable results and accomplishments
              </p>
              <TipTapEditor
                value={item.achievements || ""}
                onChange={(html) => updateExperience(item.id, { achievements: html })}
                placeholder="• Increased revenue by 45% through strategic initiatives&#10;• Reduced system latency by 60% via optimization&#10;• Mentored 3 junior developers to promotion"
              />
            </div>
            <div className="mt-3 space-y-2">
              <Label className="text-slate-700">
                Technologies Used
              </Label>
              <p className="text-xs text-slate-500 -mt-1">
                Add the specific tech stack used in this position
              </p>
              <div className="flex gap-2">
                <Input
                  value={techInputs[item.id] || ""}
                  onChange={(e) => setTechInputs(prev => ({
                    ...prev,
                    [item.id]: e.target.value
                  }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const tech = (techInputs[item.id] || "").trim();
                      if (tech && !(item.technologies || []).includes(tech)) {
                        updateExperience(item.id, { 
                          technologies: [...(item.technologies || []), tech] 
                        });
                        setTechInputs(prev => ({
                          ...prev,
                          [item.id]: ""
                        }));
                      }
                    }
                  }}
                  className={FIELD_CLASS}
                  placeholder="e.g. React, Node.js, AWS"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="px-3"
                  onClick={() => {
                    const tech = (techInputs[item.id] || "").trim();
                    if (tech && !(item.technologies || []).includes(tech)) {
                      updateExperience(item.id, { 
                        technologies: [...(item.technologies || []), tech] 
                      });
                      setTechInputs(prev => ({
                        ...prev,
                        [item.id]: ""
                      }));
                    }
                  }}
                >
                  <PlusIcon className="size-4" />
                </Button>
              </div>
              {(item.technologies || []).length > 0 && (
                <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  {(item.technologies || []).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-sm bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => {
                          const newTechnologies = (item.technologies || []).filter((_, i) => i !== techIndex);
                          updateExperience(item.id, { technologies: newTechnologies });
                        }}
                        className="ml-1 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            </>
            )}
          </div>
        );
      })}
      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-colors"
        onClick={handleAdd}
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
  const [collapsedItems, setCollapsedItems] = useState<Set<string>>(new Set());

  const toggleCollapse = (id: string) => {
    setCollapsedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleRemove = (id: string) => {
    removeEducation(id);
    import("sonner").then(({ toast }) => { toast.success("Education removed"); });
  };

  const handleAdd = () => {
    addEducation();
    import("sonner").then(({ toast }) => {
      toast.success("Education added", { description: "Fill in the details below" });
    });
  };

  return (
    <div className="space-y-4">
      {education.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center">
          <p className="text-sm text-slate-600 mb-2">No education added yet</p>
          <p className="text-xs text-slate-500">Add your degrees, diplomas, or certifications</p>
        </div>
      )}

      {education.map((row, index) => {
        const isCollapsed = collapsedItems.has(row.id);
        return (
          <div key={row.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Header */}
            <div className="mb-3 flex items-start justify-between gap-2">
              <button
                type="button"
                onClick={() => toggleCollapse(row.id)}
                className="flex items-center gap-2 text-left flex-1 hover:opacity-70 transition-opacity"
              >
                <svg
                  className={`size-4 text-slate-500 transition-transform flex-shrink-0 ${isCollapsed ? "" : "rotate-90"}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Education {index + 1}</p>
                  {isCollapsed && (row.institution || row.degree) && (
                    <p className="text-sm font-medium text-slate-700 mt-0.5 truncate">
                      {row.degree}{row.degree && row.institution ? " · " : ""}{row.institution}
                    </p>
                  )}
                </div>
              </button>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                className="text-slate-500 hover:text-rose-500 transition-colors"
                onClick={() => handleRemove(row.id)}
              >
                <Trash2Icon className="size-4" />
              </Button>
            </div>

            {/* Form Fields */}
            {!isCollapsed && (
              <div className="grid gap-3 sm:grid-cols-2">

                {/* Institution */}
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor={`institution-${row.id}`} className="text-slate-700 flex items-center gap-1">
                    Institution <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`institution-${row.id}`}
                    value={row.institution}
                    onChange={(e) => updateEducation(row.id, { institution: e.target.value })}
                    className={FIELD_CLASS}
                    placeholder="e.g. Stanford University"
                  />
                </div>

                {/* Degree */}
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor={`degree-${row.id}`} className="text-slate-700 flex items-center gap-1">
                    Degree <span className="text-red-500">*</span>
                  </Label>
                  <DegreeAutocomplete
                    id={`degree-${row.id}`}
                    value={row.degree}
                    onChange={(val) => updateEducation(row.id, { degree: val })}
                    placeholder="e.g. Bachelor of Technology (B.Tech)"
                  />
                </div>

                {/* Field of Study */}
                <div className="space-y-1.5">
                  <Label htmlFor={`field-${row.id}`} className="text-slate-700">
                    Field of Study
                  </Label>
                  <Input
                    id={`field-${row.id}`}
                    value={row.fieldOfStudy ?? ""}
                    onChange={(e) => updateEducation(row.id, { fieldOfStudy: e.target.value })}
                    className={FIELD_CLASS}
                    placeholder="e.g. Computer Science"
                  />
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <Label htmlFor={`ed-city-${row.id}`} className="text-slate-700">
                    City / Location
                  </Label>
                  <Input
                    id={`ed-city-${row.id}`}
                    value={row.city ?? ""}
                    onChange={(e) => updateEducation(row.id, { city: e.target.value })}
                    className={FIELD_CLASS}
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>

                {/* Start Date */}
                <div className="space-y-1.5">
                  <Label className="text-slate-700 flex items-center gap-1">
                    Start date <span className="text-red-500">*</span>
                  </Label>
                  <DatePicker
                    value={row.startDate}
                    onChange={(date) => updateEducation(row.id, { startDate: date })}
                    placeholder="Select start date"
                  />
                </div>

                {/* End Date */}
                <div className="space-y-1.5">
                  <Label className="text-slate-700">
                    {row.currentlyStudying ? "Expected graduation" : "End date"}
                  </Label>
                  <DatePicker
                    value={row.endDate}
                    onChange={(date) => updateEducation(row.id, { endDate: date })}
                    placeholder={row.currentlyStudying ? "Expected graduation" : "Graduation date"}
                    disabled={false}
                  />
                </div>

                {/* Currently Studying */}
                <div className="sm:col-span-2 flex items-center gap-2">
                  <Checkbox
                    id={`studying-${row.id}`}
                    checked={row.currentlyStudying ?? false}
                    onCheckedChange={(checked) =>
                      updateEducation(row.id, { currentlyStudying: checked === true })
                    }
                  />
                  <Label htmlFor={`studying-${row.id}`} className="text-slate-700 cursor-pointer font-normal">
                    I am currently studying here
                  </Label>
                </div>

                {/* GPA */}
                <div className="space-y-1.5">
                  <Label htmlFor={`gpa-${row.id}`} className="text-slate-700">
                    GPA / Grade
                    <span className="ml-1 text-xs text-slate-400 font-normal">(optional)</span>
                  </Label>
                  <Input
                    id={`gpa-${row.id}`}
                    value={row.gpa ?? ""}
                    onChange={(e) => updateEducation(row.id, { gpa: e.target.value })}
                    className={FIELD_CLASS}
                    placeholder="e.g. 3.8 / 4.0"
                  />
                </div>

                {/* Separator */}
                <div className="sm:col-span-2 border-t border-slate-200 pt-1" />

                {/* Description: honors, activities, coursework */}
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor={`ed-desc-${row.id}`} className="text-slate-700">
                    Honors, Activities & Coursework
                    <span className="ml-1 text-xs text-slate-400 font-normal">(optional)</span>
                  </Label>
                  <Textarea
                    id={`ed-desc-${row.id}`}
                    value={row.description ?? ""}
                    onChange={(e) => updateEducation(row.id, { description: e.target.value })}
                    className="min-h-[80px] border-slate-300 bg-white text-base text-slate-900 shadow-sm placeholder:text-slate-400 resize-none"
                    placeholder="e.g. Dean's List, Relevant coursework: Data Structures, Algorithms · Activities: Hackathon Club"
                  />
                  <p className="text-xs text-slate-400">
                    Add honors, awards, relevant coursework, or extracurriculars
                  </p>
                </div>

              </div>
            )}
          </div>
        );
      })}

      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-colors"
        onClick={handleAdd}
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
  const addSkill = useBuilderStore((s) => s.addSkill);
  const removeSkill = useBuilderStore((s) => s.removeSkill);
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("programming");
  const [inputValue, setInputValue] = useState("");
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const categories: { key: SkillCategory; label: string; icon: string }[] = [
    { key: "programming", label: "Programming Languages", icon: "💻" },
    { key: "frameworks", label: "Frameworks & Libraries", icon: "⚛️" },
    { key: "databases", label: "Databases", icon: "🗄️" },
    { key: "cloud", label: "Cloud & Infrastructure", icon: "☁️" },
    { key: "devops", label: "DevOps & Tools", icon: "🔧" },
    { key: "tools", label: "Development Tools", icon: "🛠️" },
    { key: "softSkills", label: "Soft Skills", icon: "🤝" },
    { key: "languages", label: "Spoken Languages", icon: "🌍" },
  ];

  // Safety check: Ensure skills is a valid categorized object
  const safeSkills = skills && typeof skills === 'object' && !Array.isArray(skills) 
    ? skills 
    : {
        programming: [],
        frameworks: [],
        databases: [],
        cloud: [],
        devops: [],
        tools: [],
        softSkills: [],
        languages: [],
      };

  const totalSkills = Object.values(safeSkills).reduce((sum, arr) => sum + (arr?.length || 0), 0);

  const handleAddSkill = (category: SkillCategory, skill: string) => {
    if (!skill.trim()) return;
    if (safeSkills[category]?.includes(skill.trim())) {
      import("sonner").then(({ toast }) => {
        toast.error("Skill already added");
      });
      return;
    }
    
    addSkill(category, skill.trim());
    setInputValue("");
    
    import("sonner").then(({ toast }) => {
      toast.success(`Added ${skill.trim()}`);
    });
  };

  const handleRemoveSkill = (category: SkillCategory, skill: string) => {
    removeSkill(category, skill);
    
    import("sonner").then(({ toast }) => {
      toast.success(`Removed ${skill}`);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, category: SkillCategory) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      handleAddSkill(category, inputValue);
    }
  };

  const handleGetSuggestions = async () => {
    if (!jobTitle.trim()) {
      setError("Please add a job title in the Contact step first");
      
      import("sonner").then(({ toast }) => {
        toast.error("Please add a job title first", {
          description: "Go to the Contact step and fill in your professional title"
        });
      });
      
      setTimeout(() => setError(null), 4000);
      return;
    }

    setIsSuggesting(true);
    setError(null);
    setSuggestions([]);

    try {
      // Get all current skills from all categories
      const allCurrentSkills = Object.values(safeSkills).flat();
      
      const response = await fetch("/api/ai/suggest-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          currentSkills: allCurrentSkills,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Failed to get skill suggestions");
      }

      setSuggestions(data.result.suggested_skills);
      
      import("sonner").then(({ toast }) => {
        toast.success("AI suggestions ready!", {
          description: `Found ${data.result.suggested_skills.length} relevant skills for ${jobTitle}`
        });
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Suggestion failed";
      setError(message);
      
      import("sonner").then(({ toast }) => {
        toast.error(message);
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with total count */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-ink">Categorized Skills</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {totalSkills} {totalSkills === 1 ? 'skill' : 'skills'} added across all categories
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleGetSuggestions}
          disabled={isSuggesting || !jobTitle.trim()}
          className="border-indigo-400/40 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 transition-all hover:from-indigo-100 hover:to-purple-100 hover:border-indigo-500/50 disabled:opacity-50"
        >
          <SparklesIcon className={`mr-2 size-4 ${isSuggesting ? 'animate-pulse' : ''}`} />
          {isSuggesting ? "Getting suggestions..." : "AI Suggest Skills"}
        </Button>
      </div>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="text-sm font-medium text-indigo-900 mb-3">
            ✨ AI Suggested Skills for {jobTitle}
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => {
                  // Auto-categorize based on skill type (simple heuristic)
                  handleAddSkill(activeCategory, skill);
                  setSuggestions(suggestions.filter(s => s !== skill));
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-indigo-300 bg-white px-3 py-1.5 text-sm font-medium text-indigo-700 transition-all hover:bg-indigo-100 hover:border-indigo-400 hover:scale-105"
              >
                <PlusIcon className="size-3.5" />
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
        {categories.map((cat) => {
          const count = safeSkills[cat.key]?.length || 0;
          const isActive = activeCategory === cat.key;
          
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              {count > 0 && (
                <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Category Content */}
      <div className="space-y-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <Label htmlFor="skill-input" className="text-slate-700 mb-2 block">
            Add skills to {categories.find(c => c.key === activeCategory)?.label}
          </Label>
          <div className="flex gap-2">
            <Input
              id="skill-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, activeCategory)}
              className={FIELD_CLASS}
              placeholder="Type skill name and press Enter"
            />
            <Button
              type="button"
              onClick={() => handleAddSkill(activeCategory, inputValue)}
              disabled={!inputValue.trim()}
              className="bg-slate-900 text-white hover:bg-slate-800"
            >
              <PlusIcon className="size-4" />
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Press Enter or click + to add. Click on a chip to remove it.
          </p>
        </div>

        {/* Skill Chips */}
        {safeSkills[activeCategory]?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {safeSkills[activeCategory].map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleRemoveSkill(activeCategory, skill)}
                className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700"
              >
                <span>{skill}</span>
                <svg className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center">
            <p className="text-sm text-slate-600">No skills added to this category yet</p>
            <p className="text-xs text-slate-500 mt-1">Start typing above to add skills</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-rose-600 animate-in fade-in slide-in-from-top-1 duration-200">{error}</p>
      )}
    </div>
  );
}

function CertificationsStep() {
  const certifications = useBuilderStore((s) => s.resume.certifications);
  const addCertification = useBuilderStore((s) => s.addCertification);
  const removeCertification = useBuilderStore((s) => s.removeCertification);
  const updateCertification = useBuilderStore((s) => s.updateCertification);
  const [collapsedItems, setCollapsedItems] = useState<Set<string>>(new Set());

  const toggleCollapse = (id: string) => {
    setCollapsedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleRemove = (id: string) => {
    removeCertification(id);
    import("sonner").then(({ toast }) => { toast.success("Certification removed"); });
  };

  const handleAdd = () => {
    addCertification();
    import("sonner").then(({ toast }) => {
      toast.success("Certification added", { description: "Fill in the details below" });
    });
  };

  // Handle case where certifications might be undefined for old data
  const safeCertifications = certifications || [];

  return (
    <div className="space-y-4">
      {safeCertifications.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center">
          <p className="text-sm text-slate-600 mb-2">No certifications added yet</p>
          <p className="text-xs text-slate-500">Add professional certifications to boost your credibility</p>
        </div>
      )}

      {safeCertifications.map((row, index) => {
        const isCollapsed = collapsedItems.has(row.id);
        return (
          <div key={row.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Header */}
            <div className="mb-3 flex items-start justify-between gap-2">
              <button
                type="button"
                onClick={() => toggleCollapse(row.id)}
                className="flex items-center gap-2 text-left flex-1 hover:opacity-70 transition-opacity"
              >
                <svg
                  className={`size-4 text-slate-500 transition-transform flex-shrink-0 ${isCollapsed ? "" : "rotate-90"}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Certification {index + 1}</p>
                  {isCollapsed && (row.name || row.issuer) && (
                    <p className="text-sm font-medium text-slate-700 mt-0.5 truncate">
                      {row.name}{row.name && row.issuer ? " · " : ""}{row.issuer}
                    </p>
                  )}
                </div>
              </button>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                className="text-slate-500 hover:text-rose-500 transition-colors"
                onClick={() => handleRemove(row.id)}
              >
                <Trash2Icon className="size-4" />
              </Button>
            </div>

            {/* Form Fields */}
            {!isCollapsed && (
              <div className="grid gap-3 sm:grid-cols-2">

                {/* Certification Name */}
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor={`cert-name-${row.id}`} className="text-slate-700 flex items-center gap-1">
                    Certification Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`cert-name-${row.id}`}
                    value={row.name}
                    onChange={(e) => updateCertification(row.id, { name: e.target.value })}
                    className={FIELD_CLASS}
                    placeholder="e.g. AWS Certified Solutions Architect"
                  />
                </div>

                {/* Issuer */}
                <div className="space-y-1.5">
                  <Label htmlFor={`issuer-${row.id}`} className="text-slate-700 flex items-center gap-1">
                    Issuing Organization <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`issuer-${row.id}`}
                    value={row.issuer}
                    onChange={(e) => updateCertification(row.id, { issuer: e.target.value })}
                    className={FIELD_CLASS}
                    placeholder="e.g. Amazon Web Services"
                  />
                </div>

                {/* Issue Date */}
                <div className="space-y-1.5">
                  <Label className="text-slate-700 flex items-center gap-1">
                    Issue Date <span className="text-red-500">*</span>
                  </Label>
                  <DatePicker
                    value={row.issueDate}
                    onChange={(date) => updateCertification(row.id, { issueDate: date })}
                    placeholder="Select issue date"
                  />
                </div>

                {/* Expiry Date */}
                <div className="space-y-1.5">
                  <Label className="text-slate-700">
                    Expiry Date
                    <span className="ml-1 text-xs text-slate-400 font-normal">(if applicable)</span>
                  </Label>
                  <DatePicker
                    value={row.expiryDate}
                    onChange={(date) => updateCertification(row.id, { expiryDate: date })}
                    placeholder="Select expiry date"
                  />
                </div>

                {/* Credential ID */}
                <div className="space-y-1.5">
                  <Label htmlFor={`credential-id-${row.id}`} className="text-slate-700">
                    Credential ID
                    <span className="ml-1 text-xs text-slate-400 font-normal">(optional)</span>
                  </Label>
                  <Input
                    id={`credential-id-${row.id}`}
                    value={row.credentialId ?? ""}
                    onChange={(e) => updateCertification(row.id, { credentialId: e.target.value })}
                    className={FIELD_CLASS}
                    placeholder="e.g. ABC123XYZ"
                  />
                </div>

                {/* Credential URL */}
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor={`credential-url-${row.id}`} className="text-slate-700">
                    Credential URL
                    <span className="ml-1 text-xs text-slate-400 font-normal">(optional)</span>
                  </Label>
                  <Input
                    id={`credential-url-${row.id}`}
                    type="url"
                    value={row.credentialUrl ?? ""}
                    onChange={(e) => updateCertification(row.id, { credentialUrl: e.target.value })}
                    className={FIELD_CLASS}
                    placeholder="e.g. https://www.credly.com/badges/..."
                  />
                  <p className="text-xs text-slate-400">
                    Link to verify your certification online
                  </p>
                </div>

              </div>
            )}
          </div>
        );
      })}

      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-colors"
        onClick={handleAdd}
      >
        <PlusIcon className="mr-1 size-4" />
        Add certification
      </Button>
    </div>
  );
}

function ProjectsStep() {
  const projects = useBuilderStore((s) => s.resume.projects);
  const addProject = useBuilderStore((s) => s.addProject);
  const removeProject = useBuilderStore((s) => s.removeProject);
  const updateProject = useBuilderStore((s) => s.updateProject);
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});
  const [touched, setTouched] = useState<Record<string, Record<string, boolean>>>({});
  const [collapsedItems, setCollapsedItems] = useState<Set<string>>(new Set());

  const toggleCollapse = (id: string) => {
    setCollapsedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const validateField = (itemId: string, field: string, value: string) => {
    let error = "";
    
    if (field === "name" && value.length > 0 && value.length < 2) {
      error = "Project name must be at least 2 characters";
    }
    if (field === "description") {
      const plainText = value.replace(/<[^>]*>/g, '').trim();
      if (plainText.length > 0 && plainText.length < 20) {
        error = "Please provide more detail about the project";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [field]: error,
      },
    }));
  };

  const handleBlur = (itemId: string, field: string) => {
    setTouched((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [field]: true,
      },
    }));
  };

  const handleRemove = (id: string) => {
    removeProject(id);
    
    import("sonner").then(({ toast }) => {
      toast.success("Project removed");
    });
  };

  const handleAdd = () => {
    addProject();
    
    import("sonner").then(({ toast }) => {
      toast.success("Project added", {
        description: "Fill in the details below"
      });
    });
  };

  return (
    <div className="space-y-4">
      {projects.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center">
          <p className="text-sm text-slate-600 mb-4">No projects added yet</p>
          <p className="text-xs text-slate-500">Showcase your portfolio projects and side work</p>
        </div>
      )}
      
      {projects.map((item, index) => {
        const itemErrors = errors[item.id] || {};
        const itemTouched = touched[item.id] || {};
        const isCollapsed = collapsedItems.has(item.id);
        
        return (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="mb-3 flex items-start justify-between gap-2">
              <button
                type="button"
                onClick={() => toggleCollapse(item.id)}
                className="flex items-center gap-2 text-left flex-1 hover:opacity-70 transition-opacity"
              >
                <svg
                  className={`size-4 text-slate-500 transition-transform flex-shrink-0 ${isCollapsed ? "" : "rotate-90"}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Project {index + 1}</p>
                  {isCollapsed && item.name && (
                    <p className="text-sm font-medium text-slate-700 mt-0.5 truncate">
                      {item.name}{item.role ? ` · ${item.role}` : ""}
                    </p>
                  )}
                </div>
              </button>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                className="text-slate-500 hover:text-rose-500 transition-colors"
                onClick={() => handleRemove(item.id)}
              >
                <Trash2Icon className="size-4" />
              </Button>
            </div>

            {!isCollapsed && (
            <>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor={`project-name-${item.id}`} className="text-slate-700 flex items-center gap-1">
                  Project Name
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`project-name-${item.id}`}
                  value={item.name}
                  onChange={(e) => {
                    updateProject(item.id, { name: e.target.value });
                    if (itemTouched.name) {
                      validateField(item.id, "name", e.target.value);
                    }
                  }}
                  onBlur={() => {
                    handleBlur(item.id, "name");
                    validateField(item.id, "name", item.name);
                  }}
                  className={`${FIELD_CLASS} ${itemErrors.name && itemTouched.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="e.g. E-commerce Platform"
                />
                {itemErrors.name && itemTouched.name && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span>{itemErrors.name}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`project-role-${item.id}`} className="text-slate-700">
                  Your Role
                </Label>
                <Input
                  id={`project-role-${item.id}`}
                  value={item.role}
                  onChange={(e) => updateProject(item.id, { role: e.target.value })}
                  className={FIELD_CLASS}
                  placeholder="e.g. Full Stack Developer"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`project-tech-${item.id}`} className="text-slate-700">
                  Tech Stack
                </Label>
                <Input
                  id={`project-tech-${item.id}`}
                  value={item.techStack}
                  onChange={(e) => updateProject(item.id, { techStack: e.target.value })}
                  className={FIELD_CLASS}
                  placeholder="React, Node.js, PostgreSQL"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`project-github-${item.id}`} className="text-slate-700">
                  GitHub URL
                </Label>
                <Input
                  id={`project-github-${item.id}`}
                  type="url"
                  value={item.githubUrl}
                  onChange={(e) => updateProject(item.id, { githubUrl: e.target.value })}
                  className={FIELD_CLASS}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`project-live-${item.id}`} className="text-slate-700">
                  Live Demo URL
                </Label>
                <Input
                  id={`project-live-${item.id}`}
                  type="url"
                  value={item.liveUrl}
                  onChange={(e) => updateProject(item.id, { liveUrl: e.target.value })}
                  className={FIELD_CLASS}
                  placeholder="https://myproject.com"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`project-start-${item.id}`} className="text-slate-700">
                  Start Date
                </Label>
                <DatePicker
                  value={item.startDate}
                  onChange={(date) => updateProject(item.id, { startDate: date })}
                  placeholder="Select start date"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`project-end-${item.id}`} className="text-slate-700">
                  End Date
                </Label>
                <DatePicker
                  value={item.endDate}
                  onChange={(date) => updateProject(item.id, { endDate: date })}
                  placeholder="Ongoing or end date"
                />
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <Label className="text-slate-700 flex items-center gap-1">
                Description
                <span className="text-red-500">*</span>
              </Label>
              <TipTapEditor
                value={item.description}
                onChange={(html) => {
                  updateProject(item.id, { description: html });
                  if (itemTouched.description) {
                    validateField(item.id, "description", html);
                  }
                }}
                placeholder="• Built a full-stack e-commerce platform...&#10;• Implemented secure payment processing...&#10;• Deployed to AWS with CI/CD pipeline..."
              />
              {itemErrors.description && itemTouched.description && (
                <div className="flex items-center gap-1.5 text-xs text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>{itemErrors.description}</span>
                </div>
              )}
            </div>

            <div className="mt-3 space-y-2">
              <Label className="text-slate-700">
                Key Achievements (Optional)
              </Label>
              <TipTapEditor
                value={item.achievements}
                onChange={(html) => updateProject(item.id, { achievements: html })}
                placeholder="• Achieved 10,000+ users in first month&#10;• Reduced load time by 40%&#10;• Featured on Product Hunt"
              />
            </div>
            </>
            )}
          </div>
        );
      })}
      
      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-colors"
        onClick={handleAdd}
      >
        <PlusIcon className="mr-1 size-4" />
        Add project
      </Button>
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
    certifications: <CertificationsStep />,
    projects: <ProjectsStep />,
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
