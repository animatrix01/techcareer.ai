import { z } from "zod";

// Contact Information Schema
export const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  jobTitle: z.string().min(2, "Job title is required").max(100, "Job title is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20, "Phone number is too long").optional().or(z.literal("")),
  location: z.string().min(2, "Location is required").max(100, "Location is too long"),
  linkedin: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  github: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Summary Schema
export const summarySchema = z.object({
  summary: z.string().min(50, "Summary should be at least 50 characters").max(1000, "Summary is too long"),
});

export type SummaryFormData = z.infer<typeof summarySchema>;

// Experience Schema
export const experienceSchema = z.object({
  role: z.string().min(2, "Role/title is required"),
  company: z.string().min(2, "Company name is required"),
  location: z.string().optional(),
  employmentType: z.enum(["Full-time", "Part-time", "Contract", "Freelance", "Internship"]).optional(),
  workMode: z.enum(["Remote", "Hybrid", "Onsite"]).optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  description: z.string().min(20, "Please describe your role and achievements"),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;

// Education Schema
export const educationSchema = z.object({
  institution: z.string().min(2, "Institution name is required"),
  degree: z.string().min(2, "Degree is required"),
  field: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  gpa: z.string().optional(),
});

export type EducationFormData = z.infer<typeof educationSchema>;

// Skills Schema
export const skillsSchema = z.object({
  skills: z.string().min(5, "Please add at least one skill"),
});

export type SkillsFormData = z.infer<typeof skillsSchema>;

// Roadmap Schema
export const roadmapSchema = z.object({
  targetRole: z.string().min(2, "Target role is required").max(100, "Role name is too long"),
  currentSkills: z.array(z.string()).min(1, "Please add at least one current skill"),
});

export type RoadmapFormData = z.infer<typeof roadmapSchema>;
