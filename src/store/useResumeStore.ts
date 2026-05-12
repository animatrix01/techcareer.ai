import { create } from "zustand";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
}

interface ExperienceItem {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationItem {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface ResumeData {
  title: string;
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}

interface ResumeStore extends ResumeData {
  updatePersonalInfo: (data: Partial<ResumeData["personalInfo"]>) => void;
  addExperience: (exp: ExperienceItem) => void;
  updateExperience: (index: number, data: Partial<ExperienceItem>) => void;
  removeExperience: (index: number) => void;
  addEducation: (edu: EducationItem) => void;
  updateEducation: (index: number, data: Partial<EducationItem>) => void;
  removeEducation: (index: number) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
}

const defaultResumeData: ResumeData = {
  title: "",
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
  },
  experience: [],
  education: [],
  skills: [],
};

export const useResumeStore = create<ResumeStore>((set) => ({
  ...defaultResumeData,
  updatePersonalInfo: (data) =>
    set((state) => ({
      personalInfo: {
        ...state.personalInfo,
        ...data,
      },
    })),
  addExperience: (exp) =>
    set((state) => ({
      experience: [...state.experience, exp],
    })),
  updateExperience: (index, data) =>
    set((state) => ({
      experience: state.experience.map((item, idx) =>
        idx === index ? { ...item, ...data } : item,
      ),
    })),
  removeExperience: (index) =>
    set((state) => ({
      experience: state.experience.filter((_, idx) => idx !== index),
    })),
  addEducation: (edu) =>
    set((state) => ({
      education: [...state.education, edu],
    })),
  updateEducation: (index, data) =>
    set((state) => ({
      education: state.education.map((item, idx) =>
        idx === index ? { ...item, ...data } : item,
      ),
    })),
  removeEducation: (index) =>
    set((state) => ({
      education: state.education.filter((_, idx) => idx !== index),
    })),
  addSkill: (skill) =>
    set((state) => ({
      skills: [...state.skills, skill],
    })),
  removeSkill: (index) =>
    set((state) => ({
      skills: state.skills.filter((_, idx) => idx !== index),
    })),
}));
