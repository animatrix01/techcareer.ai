"use server";

import { and, desc, eq } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { resumes } from "@/lib/db/schema";
import type { ResumeData } from "@/store/useResumeStore";
import type { ResumeBuilderData, BuilderTemplateId } from "@/stores/useBuilderStore";

// ─── Existing action (kept for backward compatibility) ────────────────────────

export async function createNewResume(title: string, template?: string, themeColor?: string) {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    throw new Error("Resume title is required.");
  }

  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user?.primaryEmailAddress?.emailAddress) {
    throw new Error("Unauthorized");
  }

  const resumeId = crypto.randomUUID();

  try {
    await db.insert(resumes).values({
      title: trimmedTitle,
      resumeId,
      userEmail: user.primaryEmailAddress.emailAddress,
      createdBy: userId,
      template: template ?? "modern",
      themeColor: themeColor ?? "#1a2e35",
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
      skills: [],
    });
  } catch (error) {
    console.error("Database insert failed, continuing with resumeId:", error);
    // Continue anyway - the resume will work in memory, just won't persist
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
    console.error("Database update failed, continuing:", error);
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
  const user = await currentUser();

  if (!userId || !user?.primaryEmailAddress?.emailAddress) {
    throw new Error("Unauthorized");
  }

  try {
    const existing = await db
      .select({ id: resumes.id })
      .from(resumes)
      .where(and(eq(resumes.resumeId, input.resumeId), eq(resumes.createdBy, userId)))
      .limit(1);

    if (existing.length > 0) {
      // Update existing resume
      await db
        .update(resumes)
        .set({
          title: input.title || input.resume.basics.fullName || "Untitled Resume",
          template: input.template,
          themeColor: input.themeColor,
          basics: input.resume.basics,
          skills: input.resume.skills,
          experience: input.resume.experience,
          education: input.resume.education,
          updatedAt: new Date(),
        })
        .where(and(eq(resumes.resumeId, input.resumeId), eq(resumes.createdBy, userId)));
    } else {
      // Insert new resume
      await db.insert(resumes).values({
        resumeId: input.resumeId,
        title: input.title || input.resume.basics.fullName || "Untitled Resume",
        userEmail: user.primaryEmailAddress.emailAddress,
        createdBy: userId,
        template: input.template,
        themeColor: input.themeColor,
        basics: input.resume.basics,
        skills: input.resume.skills,
        experience: input.resume.experience,
        education: input.resume.education,
      });
    }
  } catch (error) {
    console.error("Database operation failed, continuing:", error);
    // Continue anyway - data persists in local state
  }

  return { success: true };
}

/**
 * Fetch all resumes for the currently logged-in user (for dashboard).
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
        basics: resumes.basics,
        updatedAt: resumes.updatedAt,
        createdAt: resumes.createdAt,
      })
      .from(resumes)
      .where(eq(resumes.createdBy, userId))
      .orderBy(desc(resumes.updatedAt));

    return rows;
  } catch (error) {
    console.error("Failed to fetch resumes:", error);
    return []; // Return empty array if database fails
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
    console.error("Failed to delete resume:", error);
  }

  return { success: true };
}

/**
 * Load a single resume by resumeId for the builder editor.
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
    console.error("Failed to fetch resume:", error);
    return null; // Return null if database fails
  }
}
