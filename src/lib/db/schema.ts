import { sql } from "drizzle-orm";
import {
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  resumeId: text("resume_id").notNull().unique(),
  createdBy: text("created_by").notNull(),
  userName: text("user_name"),
  template: text("template").default("modern"),
  themeColor: text("theme_color").default("#1a2e35"),
  basics: jsonb("basics").$type<{
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  }>(),
  summary: text("summary"),
  experience: jsonb("experience"),
  education: jsonb("education"),
  skills: jsonb("skills"),
  projects: jsonb("projects"),
  certifications: jsonb("certifications"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const roadmaps = pgTable("roadmaps", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: text("clerk_user_id").notNull(),
  targetRole: text("target_role").notNull(),
  currentSkills: jsonb("current_skills").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  roadmapJson: jsonb("roadmap_json")
    .$type<Record<string, unknown>>()
    .notNull()
    .default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Resume = typeof resumes.$inferSelect;
export type NewResume = typeof resumes.$inferInsert;
export type Roadmap = typeof roadmaps.$inferSelect;
export type NewRoadmap = typeof roadmaps.$inferInsert;
