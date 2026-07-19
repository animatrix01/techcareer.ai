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

export type SkillCategory = 
  | "programming"
  | "frameworks"
  | "databases"
  | "cloud"
  | "devops"
  | "tools"
  | "softSkills"
  | "languages";

export type CategorizedSkills = {
  [K in SkillCategory]: string[]; // Array of skill names
};

export type EmploymentType = 
  | "full-time"
  | "part-time"
  | "internship"
  | "contract"
  | "freelance"
  | "volunteer";

export type WorkMode = 
  | "remote"
  | "hybrid"
  | "onsite";

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
  /** Categorized skills with chips */
  skills: CategorizedSkills;
  experience: Array<{
    id: string;
    company: string;
    role: string;
    companyWebsite: string;
    location: string;
    employmentType: EmploymentType;
    workMode: WorkMode;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    description: string;
    achievements: string;
    technologies: string[]; // Array of tech used
    teamSize: string;
    projectName: string;
    client: string;
    industry: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate: string;
    credentialId: string;
    credentialUrl: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    city: string;
    startDate: string;
    endDate: string;
    currentlyStudying: boolean;
    gpa: string;
    description: string; // honors, activities, relevant coursework
  }>;
  projects: Array<{
    id: string;
    name: string;
    role: string;
    techStack: string; // Comma-separated or chip-based
    githubUrl: string;
    liveUrl: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string;
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
  addSkill: (category: SkillCategory, skill: string) => void;
  removeSkill: (category: SkillCategory, skill: string) => void;
  updateSkillCategory: (category: SkillCategory, skills: string[]) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  updateExperience: (
    id: string,
    patch: Partial<ResumeBuilderData["experience"][number]>,
  ) => void;
  reorderExperience: (fromIndex: number, toIndex: number) => void;
  duplicateExperience: (id: string) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  updateEducation: (
    id: string,
    patch: Partial<ResumeBuilderData["education"][number]>,
  ) => void;
  addCertification: () => void;
  removeCertification: (id: string) => void;
  updateCertification: (
    id: string,
    patch: Partial<ResumeBuilderData["certifications"][number]>,
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
  skills: {
    programming: [],
    frameworks: [],
    databases: [],
    cloud: [],
    devops: [],
    tools: [],
    softSkills: [],
    languages: [],
  },
  experience: [],
  education: [],
  certifications: [],
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
  setThemeColor: (themeColor) => {
    // Silently reject anything that isn't a valid 6-digit hex color
    if (!/^#[0-9A-Fa-f]{6}$/.test(themeColor)) return;
    set((state) => ({
      design: {
        ...state.design,
        themeColor,
      },
    }));
  },
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
  addSkill: (category, skill) =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills: {
          ...state.resume.skills,
          [category]: [...(state.resume.skills[category] || []), skill],
        },
      },
    })),
  removeSkill: (category, skill) =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills: {
          ...state.resume.skills,
          [category]: (state.resume.skills[category] || []).filter((s) => s !== skill),
        },
      },
    })),
  updateSkillCategory: (category, skills) =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills: {
          ...state.resume.skills,
          [category]: skills,
        },
      },
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
            companyWebsite: "",
            location: "",
            employmentType: "full-time" as EmploymentType,
            workMode: "onsite" as WorkMode,
            startDate: "",
            endDate: "",
            currentlyWorking: false,
            description: "",
            achievements: "",
            technologies: [],
            teamSize: "",
            projectName: "",
            client: "",
            industry: "",
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
  duplicateExperience: (id: string) =>
    set((state) => {
      const original = state.resume.experience.find((e) => e.id === id);
      if (!original) return state;
      
      const duplicate = {
        ...original,
        id: newId(),
      };
      
      const index = state.resume.experience.findIndex((e) => e.id === id);
      const newExperience = [...state.resume.experience];
      newExperience.splice(index + 1, 0, duplicate);
      
      return {
        resume: {
          ...state.resume,
          experience: newExperience,
        },
      };
    }),
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
            fieldOfStudy: "",
            city: "",
            startDate: "",
            endDate: "",
            currentlyStudying: false,
            gpa: "",
            description: "",
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
  addCertification: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: [
          ...(state.resume.certifications || []),
          {
            id: newId(),
            name: "",
            issuer: "",
            issueDate: "",
            expiryDate: "",
            credentialId: "",
            credentialUrl: "",
          },
        ],
      },
    })),
  removeCertification: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: (state.resume.certifications || []).filter((c) => c.id !== id),
      },
    })),
  updateCertification: (id, patch) =>
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: (state.resume.certifications || []).map((c) =>
          c.id === id ? { ...c, ...patch } : c,
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
            role: "",
            techStack: "",
            githubUrl: "",
            liveUrl: "",
            startDate: "",
            endDate: "",
            description: "",
            achievements: "",
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
