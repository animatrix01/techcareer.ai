/**
 * Runtime Zod validation for all JSONB resume fields.
 *
 * These schemas are intentionally strict:
 *  - Hard string length caps on every text field
 *  - Hard array length caps to prevent array-stuffing attacks
 *  - No arbitrary keys allowed (no passthrough)
 *
 * They mirror the TypeScript types in useBuilderStore.ts but add
 * runtime enforcement that TypeScript alone cannot provide.
 */

import { z } from "zod";

// ─── Reusable primitives ──────────────────────────────────────────────────────

const shortStr  = (max = 150) => z.string().max(max).default("");
const medStr    = (max = 500) => z.string().max(max).default("");
const longStr   = (max = 2000) => z.string().max(max).default("");
const safeUrl   = z.string().max(300)
  .refine(
    (v) => v === "" || v.startsWith("http://") || v.startsWith("https://"),
    { message: "URL must start with http:// or https://" }
  )
  .default("");

// ─── Basics ───────────────────────────────────────────────────────────────────

export const basicsSchema = z.object({
  fullName:  shortStr(100),
  jobTitle:  shortStr(100),
  email:     z.string().max(254).email().or(z.literal("")).default(""),
  phone:     shortStr(30),
  location:  shortStr(150),
  summary:   longStr(1000),
});

// ─── Skills ───────────────────────────────────────────────────────────────────

const skillListSchema = z.array(z.string().min(1).max(60)).max(50).default([]);

export const skillsSchema = z.object({
  programming: skillListSchema,
  frameworks:  skillListSchema,
  databases:   skillListSchema,
  cloud:       skillListSchema,
  devops:      skillListSchema,
  tools:       skillListSchema,
  softSkills:  skillListSchema,
  languages:   skillListSchema,
});

// ─── Experience ───────────────────────────────────────────────────────────────

export const experienceItemSchema = z.object({
  id:               shortStr(50),
  company:          shortStr(150),
  role:             shortStr(150),
  companyWebsite:   safeUrl,
  location:         shortStr(150),
  employmentType:   z.enum(["full-time", "part-time", "internship", "contract", "freelance", "volunteer"]).default("full-time"),
  workMode:         z.enum(["remote", "hybrid", "onsite"]).default("onsite"),
  startDate:        shortStr(20),
  endDate:          shortStr(20),
  currentlyWorking: z.boolean().default(false),
  description:      longStr(2000),
  achievements:     longStr(2000),
  technologies:     z.array(z.string().min(1).max(60)).max(30).default([]),
  teamSize:         shortStr(20),
  projectName:      shortStr(150),
  client:           shortStr(150),
  industry:         shortStr(100),
});

export const experienceSchema = z.array(experienceItemSchema).max(20);

// ─── Education ────────────────────────────────────────────────────────────────

export const educationItemSchema = z.object({
  id:               shortStr(50),
  institution:      shortStr(150),
  degree:           shortStr(150),
  fieldOfStudy:     shortStr(150),
  city:             shortStr(100),
  startDate:        shortStr(20),
  endDate:          shortStr(20),
  currentlyStudying: z.boolean().default(false),
  gpa:              shortStr(10),
  description:      medStr(500),
});

export const educationSchema = z.array(educationItemSchema).max(10);

// ─── Certifications ───────────────────────────────────────────────────────────

export const certificationItemSchema = z.object({
  id:            shortStr(50),
  name:          shortStr(150),
  issuer:        shortStr(150),
  issueDate:     shortStr(20),
  expiryDate:    shortStr(20),
  credentialId:  shortStr(100),
  credentialUrl: safeUrl,
});

export const certificationsSchema = z.array(certificationItemSchema).max(20);

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projectItemSchema = z.object({
  id:           shortStr(50),
  name:         shortStr(150),
  role:         shortStr(150),
  techStack:    medStr(300),
  githubUrl:    safeUrl,
  liveUrl:      safeUrl,
  startDate:    shortStr(20),
  endDate:      shortStr(20),
  description:  longStr(2000),
  achievements: longStr(2000),
});

export const projectsSchema = z.array(projectItemSchema).max(20);

// ─── Full resume payload (what saveBuilderResume receives) ────────────────────

export const builderResumePayloadSchema = z.object({
  resumeId:   z.string().uuid("Invalid resume ID"),
  title:      z.string().min(1).max(150),
  template:   z.enum([
    "modern", "classic", "executive", "innovator", "minimalist",
    "ats-minimal", "ats-compact", "startup-bold", "creative-sidebar",
    "professional-clean", "tech-focused", "designer-split", "ats-elegant",
    "gradient-pro", "executive-luxe", "creative-portfolio", "developer-dark",
    "fresher-edge", "consultant-pro", "founder-resume",
  ]),
  themeColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color"),
  resume: z.object({
    basics:         basicsSchema,
    skills:         skillsSchema,
    experience:     experienceSchema,
    education:      educationSchema,
    certifications: certificationsSchema,
    projects:       projectsSchema,
  }),
});

export type BuilderResumePayload = z.infer<typeof builderResumePayloadSchema>;
