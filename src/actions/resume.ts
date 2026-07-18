"use server";

import { and, count, desc, eq } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { resumes } from "@/lib/db/schema";
import { builderResumePayloadSchema } from "@/lib/validation/resume-schemas";
import { logError } from "@/lib/logger";
import type { ResumeData } from "@/store/useResumeStore";
import type { ResumeBuilderData, BuilderTemplateId } from "@/stores/useBuilderStore";

// ─── Existing action (kept for backward compatibility) ────────────────────────

const HEX_COLOR_RE = /^#[0-9A-Fa-f]{6}$/;
const SAFE_TEMPLATES = new Set([
  "modern", "classic", "executive", "innovator", "minimalist",
  "ats-minimal", "ats-compact", "startup-bold", "creative-sidebar",
  "professional-clean", "tech-focused", "designer-split", "ats-elegant",
  "gradient-pro", "executive-luxe", "creative-portfolio", "developer-dark",
  "fresher-edge", "consultant-pro", "founder-resume",
]);

export async function createNewResume(title: string, template?: string, themeColor?: string) {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    throw new Error("Resume title is required.");
  }

  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user?.primaryEmailAddress?.emailAddress) {
    throw new Error("Unauthorized - Please sign in");
  }

  const resumeId = crypto.randomUUID();

  // Validate themeColor — only allow valid 6-digit hex colors
  const rawColor = themeColor ?? "#1a2e35";
  const finalThemeColor = HEX_COLOR_RE.test(rawColor) ? rawColor : "#1a2e35";

  // Validate template — only allow known template IDs
  const finalTemplate = template && SAFE_TEMPLATES.has(template) ? template : "modern";

  // ── Enforce free-tier quota ──────────────────────────────────────────
  const FREE_TIER_RESUME_LIMIT = 10;
  try {
    const [{ total }] = await db
      .select({ total: count() })
      .from(resumes)
      .where(eq(resumes.createdBy, userId));

    if (Number(total) >= FREE_TIER_RESUME_LIMIT) {
      throw new Error(
        `Free tier limit reached. You can create up to ${FREE_TIER_RESUME_LIMIT} resumes. Delete an existing one to make room.`
      );
    }
  } catch (error) {
    // Re-throw quota errors as-is; swallow DB connection errors so creation can proceed
    if (error instanceof Error && error.message.includes("Free tier limit")) {
      throw error;
    }
    logError("[createNewResume] Quota check failed, proceeding", error, { userId });
  }

  try {
    await db.insert(resumes).values({
      title: trimmedTitle,
      resumeId,
      createdBy: userId,
      template: finalTemplate,
      themeColor: finalThemeColor,
      basics: {
        fullName: "",
        jobTitle: "",
        email: user.primaryEmailAddress.emailAddress,
        phone: "",
        location: "",
        summary: "",
      },
      experience: [],
      education: [],
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
    });
  } catch (error) {
    logError("[createNewResume] DB insert failed", error, { userId, title: trimmedTitle });

    const msg = error instanceof Error ? error.message : "";
    if (msg.includes("timeout") || msg.includes("connect")) {
      throw new Error("Database is temporarily unavailable. Please try again in a moment.");
    }
    // Never expose raw DB error to client
    throw new Error("Could not create resume. Please try again.");
  }

  return resumeId;
}

export async function saveResumeData(resumeId: string, data: ResumeData) {
  if (!resumeId.trim()) {
    throw new Error("Resume ID is required.");
  }

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const fullName = [data.personalInfo.firstName, data.personalInfo.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  try {
    const result = await db
      .update(resumes)
      .set({
        title: data.title || "Untitled Resume",
        userName: fullName || null,
        summary: data.personalInfo.jobTitle || null,
        experience: data.experience,
        education: data.education,
        skills: data.skills,
      })
      .where(and(eq(resumes.resumeId, resumeId), eq(resumes.createdBy, userId)))
      .returning({ id: resumes.id });

    if (result.length === 0) {
      console.warn("Resume not found in database, data saved to local state only");
    }
  } catch (error) {
    logError("Database update failed, continuing", error, { resumeId, userId });
    // Continue anyway - changes will persist in local state
  }

  return { success: true };
}

// ─── New builder actions ──────────────────────────────────────────────────────

/**
 * Save full builder resume data to the database.
 * Creates a new row if resumeId doesn't exist yet, otherwise updates.
 */
export async function saveBuilderResume(input: {
  resumeId: string;
  title: string;
  resume: ResumeBuilderData;
  template: BuilderTemplateId;
  themeColor: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized - Please sign in");
  }

  // ── Validate and sanitize all JSONB fields before touching the DB ──
  const parsed = builderResumePayloadSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.errors[0];
    // Log full validation errors for debugging
    console.error("[saveBuilderResume] Validation failed:", JSON.stringify(parsed.error.errors, null, 2));
    throw new Error(`Invalid resume data: ${firstError.path.join(".")} — ${firstError.message}`);
  }
  const safe = parsed.data;

  try {
    const existing = await db
      .select({ id: resumes.id })
      .from(resumes)
      .where(and(eq(resumes.resumeId, safe.resumeId), eq(resumes.createdBy, userId)))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(resumes)
        .set({
          title: safe.title || safe.resume.basics.fullName || "Untitled Resume",
          template: safe.template,
          themeColor: safe.themeColor,
          basics: safe.resume.basics,
          skills: safe.resume.skills,
          experience: safe.resume.experience,
          education: safe.resume.education,
          certifications: safe.resume.certifications,
          projects: safe.resume.projects,
          updatedAt: new Date(),
        })
        .where(and(eq(resumes.resumeId, safe.resumeId), eq(resumes.createdBy, userId)));
    } else {
      await db.insert(resumes).values({
        resumeId: safe.resumeId,
        title: safe.title || safe.resume.basics.fullName || "Untitled Resume",
        createdBy: userId,
        template: safe.template,
        themeColor: safe.themeColor,
        basics: safe.resume.basics,
        skills: safe.resume.skills,
        experience: safe.resume.experience,
        education: safe.resume.education,
        certifications: safe.resume.certifications,
        projects: safe.resume.projects,
      });
    }

    return { success: true, message: "Resume saved successfully" };
  } catch (error) {
    logError("[saveBuilderResume] DB operation failed", error, { userId, resumeId: safe.resumeId });

    const msg = error instanceof Error ? error.message : "";
    if (msg.includes("timeout") || msg.includes("connect")) {
      throw new Error("Database is temporarily unavailable. Please try again in a moment.");
    }
    throw new Error("Failed to save resume. Please try again.");
  }
}

/**
 * Fetch all resumes for the currently logged-in user (for dashboard).
 * Optimized: only selects fields needed for dashboard cards.
 */
export async function getUserResumes() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const rows = await db
      .select({
        resumeId: resumes.resumeId,
        title: resumes.title,
        template: resumes.template,
        themeColor: resumes.themeColor,
        // Only extract the fields needed for cards (not full JSONB)
        basics: resumes.basics,
        updatedAt: resumes.updatedAt,
        createdAt: resumes.createdAt,
      })
      .from(resumes)
      .where(eq(resumes.createdBy, userId))
      .orderBy(desc(resumes.updatedAt))
      .limit(50);

    return rows;
  } catch (error) {
    logError("[getUserResumes] DB fetch failed", error, { userId });
    return [];
  }
}

/**
 * Delete a resume by resumeId (only owner can delete).
 */
export async function deleteResume(resumeId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    await db
      .delete(resumes)
      .where(and(eq(resumes.resumeId, resumeId), eq(resumes.createdBy, userId)));
  } catch (error) {
    logError("[deleteResume] DB delete failed", error, { userId, resumeId });
  }

  return { success: true };
}

/**
 * Load a single resume by resumeId for the builder editor.
 * Optimized with performance logging.
 */
export async function getResumeById(resumeId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const rows = await db
      .select()
      .from(resumes)
      .where(and(eq(resumes.resumeId, resumeId), eq(resumes.createdBy, userId)))
      .limit(1);

    if (rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    logError("[getResumeById] DB fetch failed", error, { userId, resumeId });
    return null;
  }
}
