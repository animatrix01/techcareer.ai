import { z } from "zod";

/** Single timeline phase — matches `RoadmapPhase` in the path UI. */
export const roadmapPhaseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  duration: z.string().min(1),
  description: z.string().min(1),
  skills: z.array(z.string().min(1)).min(1),
  actionItems: z.array(z.string().min(1)).min(1),
});

/** Matches timeline cards on `/tools/roadmap/path`. */
export type RoadmapPhase = z.infer<typeof roadmapPhaseSchema>;

export const weeklyBreakdownEntrySchema = z.object({
  phase_id: z.number().int().positive(),
  week: z.number().int().min(1),
  focus: z.string().min(1),
  tasks: z.array(z.string().min(1)).min(1),
});

export type WeeklyBreakdownEntry = z.infer<typeof weeklyBreakdownEntrySchema>;

export const roadmapResourceSchema = z.object({
  title: z.string().min(1),
  url: z.string().url().optional().catch(undefined),
  type: z.enum(["article", "course", "docs", "video", "book"]).optional().catch(undefined),
});

export type RoadmapResource = z.infer<typeof roadmapResourceSchema>;

/**
 * Strict shape returned by the model (JSON-only contract).
 * `phases` is what the timeline UI consumes.
 */
export const roadmapGenerationResultSchema = z.object({
  target_role: z.string().min(1),
  estimated_duration: z.string().min(1),
  phases: z.array(roadmapPhaseSchema).min(1).max(8),
  weekly_breakdown: z.array(weeklyBreakdownEntrySchema).min(1),
  skills_to_learn: z.array(z.string().min(1)).min(1),
  mini_projects: z.array(z.string().min(1)).min(1),
  resources: z.array(roadmapResourceSchema).optional(),
});

export type RoadmapGenerationResult = z.infer<typeof roadmapGenerationResultSchema>;

export const roadmapApiRequestSchema = z.object({
  targetRole: z.string().min(1, "Target role is required").max(100, "Target role too long"),
  currentSkills: z
    .array(z.string().min(1).max(50, "Skill name too long"))
    .max(30, "Too many skills (max 30)")
    .default([]),
});

export type RoadmapApiRequest = z.infer<typeof roadmapApiRequestSchema>;

// ============================================================================
// RESUME ANALYZER SCHEMAS
// ============================================================================

/** Severity level for resume issues */
export const issueSeveritySchema = z.enum(["critical", "warning", "info"]);
export type IssueSeverity = z.infer<typeof issueSeveritySchema>;

/** Category grouping for issues */
export const issueCategorySchema = z.enum([
  "content",
  "sections",
  "ats",
  "formatting",
  "impact",
  "wording",
]);
export type IssueCategory = z.infer<typeof issueCategorySchema>;

/** Single resume issue detected by rule-based or AI analysis */
export const resumeIssueSchema = z.object({
  id: z.string().min(1),
  category: issueCategorySchema,
  severity: issueSeveritySchema,
  title: z.string().min(1),
  problematicText: z.string().optional(),
  whyItMatters: z.string().min(1),
  suggestedImprovement: z.string().optional(),
  canAIFix: z.boolean().default(false),
});
export type ResumeIssue = z.infer<typeof resumeIssueSchema>;

/** AI-generated contextual analysis for resume content */
export const aiContentAnalysisSchema = z.object({
  issues: z.array(resumeIssueSchema).min(0),
  overallTone: z.string().optional(),
  strengthsIdentified: z.array(z.string()).optional(),
});
export type AIContentAnalysis = z.infer<typeof aiContentAnalysisSchema>;

/** Complete analyzer result combining rule-based + AI analysis */
export const resumeAnalysisResultSchema = z.object({
  score: z.number().int().min(0).max(100),
  issues: z.array(resumeIssueSchema).min(0),
  categorySummary: z.record(issueCategorySchema, z.number().int().min(0)),
  analysisTimestamp: z.string().optional(),
});
export type ResumeAnalysisResult = z.infer<typeof resumeAnalysisResultSchema>;

/** API request schema for resume analysis */
export const analyzerApiRequestSchema = z.object({
  resumeText: z.string().min(10, "Resume text must be at least 10 characters").max(15000, "Resume text too long (max 15,000 characters)"),
  targetRole: z.string().max(100, "Target role too long").optional(),
});
export type AnalyzerApiRequest = z.infer<typeof analyzerApiRequestSchema>;

// ============================================================================
// RESUME BUILDER - SUMMARY ENHANCEMENT SCHEMAS
// ============================================================================

/** AI response for enhanced professional summary */
export const enhanceSummaryResponseSchema = z.object({
  enhanced_summary: z.string().min(30, "Enhanced summary must be at least 30 characters"),
});
export type EnhanceSummaryResponse = z.infer<typeof enhanceSummaryResponseSchema>;

/** API request schema for summary enhancement */
export const enhanceSummaryApiRequestSchema = z.object({
  currentSummary: z.string().min(3, "Summary must be at least 3 characters to enhance").max(500, "Summary too long (max 500 characters)"),
});
export type EnhanceSummaryApiRequest = z.infer<typeof enhanceSummaryApiRequestSchema>;

// ============================================================================
// RESUME BUILDER - SKILLS SUGGESTIONS SCHEMAS
// ============================================================================

/** AI response for skill suggestions */
export const suggestSkillsResponseSchema = z.object({
  suggested_skills: z.array(z.string().min(1)).min(5).max(15),
});
export type SuggestSkillsResponse = z.infer<typeof suggestSkillsResponseSchema>;

/** API request schema for skill suggestions */
export const suggestSkillsApiRequestSchema = z.object({
  jobTitle: z.string().min(2, "Job title must be at least 2 characters").max(100, "Job title too long"),
  currentSkills: z.array(z.string().min(1).max(50, "Skill name too long")).max(50, "Too many skills (max 50)"),
});
export type SuggestSkillsApiRequest = z.infer<typeof suggestSkillsApiRequestSchema>;
