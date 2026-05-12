"use server";

import { and, eq } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { resumes } from "@/lib/db/schema";
import type { ResumeData } from "@/store/useResumeStore";

export async function createNewResume(title: string) {
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

  await db.insert(resumes).values({
    title: trimmedTitle,
    resumeId,
    userEmail: user.primaryEmailAddress.emailAddress,
    createdBy: userId,
  });

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
    throw new Error("Resume not found.");
  }

  return { success: true };
}
