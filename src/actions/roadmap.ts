"use server";

import { desc, eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { roadmaps } from "@/lib/db/schema";
import type { RoadmapGenerationResult } from "@/lib/llm/schemas";

/**
 * Save a successfully generated roadmap to the database.
 * Only called after valid AI output + Zod validation passes.
 */
export async function saveRoadmap(input: {
  targetRole: string;
  currentSkills: string[];
  roadmapData: RoadmapGenerationResult;
}): Promise<string> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const id = crypto.randomUUID();

  try {
    await db.insert(roadmaps).values({
      id,
      clerkUserId: userId,
      targetRole: input.targetRole,
      currentSkills: input.currentSkills,
      roadmapJson: input.roadmapData as unknown as Record<string, unknown>,
    });
  } catch (error) {
    console.error("saveRoadmap DB insert failed:", error);
    throw error;
  }

  return id;
}

/**
 * Fetch all roadmaps for the current user (for dashboard history).
 */
export async function getUserRoadmaps() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return db
    .select({
      id: roadmaps.id,
      targetRole: roadmaps.targetRole,
      currentSkills: roadmaps.currentSkills,
      createdAt: roadmaps.createdAt,
    })
    .from(roadmaps)
    .where(eq(roadmaps.clerkUserId, userId))
    .orderBy(desc(roadmaps.createdAt));
}

/**
 * Load a single roadmap by id for the path/reopen page.
 */
export async function getRoadmapById(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const rows = await db
    .select()
    .from(roadmaps)
    .where(and(eq(roadmaps.id, id), eq(roadmaps.clerkUserId, userId)))
    .limit(1);

  if (rows.length === 0) return null;
  return rows[0];
}

/**
 * Delete a roadmap by id (only owner can delete).
 */
export async function deleteRoadmap(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db
    .delete(roadmaps)
    .where(and(eq(roadmaps.id, id), eq(roadmaps.clerkUserId, userId)));

  return { success: true };
}
