"use client";

import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";

export type BuilderTemplateId =
  | "modern"
  | "classic"
  | "executive"
  | "innovator"
  | "minimalist"
  | "ats-minimal"
  | "ats-compact"
  | "startup-bold"
  | "creative-sidebar"
  | "professional-clean"
  | "tech-focused"
  | "designer-split"
  | "ats-elegant"
  | "gradient-pro"
  | "executive-luxe"
  | "creative-portfolio"
  | "developer-dark"
  | "fresher-edge"
  | "consultant-pro"
  | "founder-resume";

export type ResumeBuilderData = {
  basics: {
    fullName: string;
    /** Shown under name in modern template (e.g. Frontend Engineer) */
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  /** Comma-separated skills for smooth single-field typing */
  skills: string;
  experience: Array<{
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    url: string;
    stack: string;
  }>;
};

type BuilderStore = {
  resume: ResumeBuilderData;
  lastSavedAt: string | null;
  currentStep: number;
  design: {
    template: BuilderTemplateId;
    themeColor: string;
  };
  setResume: (resume: ResumeBuilderData) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setTemplate: (template: BuilderTemplateId) => void;
  setThemeColor: (color: string) => void;
  updateBasics: (data: Partial<ResumeBuilderData["basics"]>) => void;
  setSkills: (skills: string) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  updateExperience: (
    id: string,
    patch: Partial<ResumeBuilderData["experience"][number]>,
  ) => void;
  reorderExperience: (fromIndex: number, toIndex: number) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  updateEducation: (
    id: string,
    patch: Partial<ResumeBuilderData["education"][number]>,
  ) => void;
  addProject: () => void;
  removeProject: (id: string) => void;
  updateProject: (
    id: string,
    patch: Partial<ResumeBuilderData["projects"][number]>,
  ) => void;
  reorderProjects: (fromIndex: number, toIndex: number) => void;
  resetResume: () => void;
};

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id_${Math.random().toString(36).slice(2, 11)}`;

const initialResumeState: ResumeBuilderData = {
  basics: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  },
  skills: "",
  experience: [],
  education: [],
  projects: [],
};

export const useBuilderStore = create<BuilderStore>((set) => ({
  resume: initialResumeState,
  lastSavedAt: null,
  currentStep: 0,
  design: {
    template: "modern",
    themeColor: "#1a2e35",
  },
  setResume: (resume) =>
    set({
      resume,
      lastSavedAt: new Date().toISOString(),
    }),
  setCurrentStep: (step) =>
    set({
      currentStep: Math.min(5, Math.max(0, step)),
    }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(5, state.currentStep + 1),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(0, state.currentStep - 1),
    })),
  setTemplate: (template) =>
    set((state) => ({
      design: {
        ...state.design,
        template,
      },
    })),
  setThemeColor: (themeColor) =>
    set((state) => ({
      design: {
        ...state.design,
        themeColor,
      },
    })),
  updateBasics: (data) =>
    set((state) => ({
      resume: {
        ...state.resume,
        basics: {
          ...state.resume.basics,
          ...data,
        },
      },
    })),
  setSkills: (skills) =>
    set((state) => ({
      resume: { ...state.resume, skills },
    })),
  addExperience: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: [
          ...state.resume.experience,
          {
            id: newId(),
            company: "",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ],
      },
    })),
  removeExperience: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.filter((e) => e.id !== id),
      },
    })),
  updateExperience: (id, patch) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((e) =>
          e.id === id ? { ...e, ...patch } : e,
        ),
      },
    })),
  reorderExperience: (fromIndex, toIndex) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: arrayMove(state.resume.experience, fromIndex, toIndex),
      },
    })),
  addEducation: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: [
          ...state.resume.education,
          {
            id: newId(),
            institution: "",
            degree: "",
            startDate: "",
            endDate: "",
          },
        ],
      },
    })),
  removeEducation: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.filter((e) => e.id !== id),
      },
    })),
  updateEducation: (id, patch) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.map((e) =>
          e.id === id ? { ...e, ...patch } : e,
        ),
      },
    })),
  addProject: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: [
          ...state.resume.projects,
          {
            id: newId(),
            name: "",
            description: "",
            url: "",
            stack: "",
          },
        ],
      },
    })),
  removeProject: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.filter((p) => p.id !== id),
      },
    })),
  updateProject: (id, patch) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.map((p) =>
          p.id === id ? { ...p, ...patch } : p,
        ),
      },
    })),
  reorderProjects: (fromIndex, toIndex) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: arrayMove(state.resume.projects, fromIndex, toIndex),
      },
    })),
  resetResume: () =>
    set({
      resume: initialResumeState,
      lastSavedAt: null,
      currentStep: 0,
      design: {
        template: "modern",
        themeColor: "#1a2e35",
      },
    }),
}));
