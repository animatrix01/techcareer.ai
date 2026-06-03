import { callGroqChatCompletion } from "@/lib/llm/client";
import {
  buildAnalyzerSystemPrompt,
  buildAnalyzerUserPrompt,
} from "@/lib/llm/prompts/analyzer";
import {
  aiContentAnalysisSchema,
  type ResumeAnalysisResult,
  type ResumeIssue,
  type IssueCategory,
} from "@/lib/llm/schemas";

export class ResumeAnalyzerError extends Error {
  constructor(
    message: string,
    public readonly causeCode:
      | "PARSE"
      | "VALIDATION"
      | "LLM"
      | "UNKNOWN" = "UNKNOWN"
  ) {
    super(message);
    this.name = "ResumeAnalyzerError";
  }
}

function stripJsonFences(text: string): string {
  const trimmed = text.trim();
  const fence = /^```(?:json)?\s*([\s\S]*?)```$/im.exec(trimmed);
  if (fence?.[1]) return fence[1].trim();
  return trimmed;
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    try {
      return JSON.parse(stripJsonFences(text));
    } catch {
      throw new ResumeAnalyzerError(
        "Model output was not valid JSON",
        "PARSE"
      );
    }
  }
}

// ============================================================================
// RULE-BASED ANALYSIS (No AI calls needed)
// ============================================================================

/**
 * Run fast, deterministic checks that don't require AI.
 * Handles: missing sections, length, contact info, basic ATS structure.
 */
function runRuleBasedAnalysis(resumeText: string): ResumeIssue[] {
  const issues: ResumeIssue[] = [];
  const lowerText = resumeText.toLowerCase();
  const wordCount = resumeText.split(/\s+/).length;

  // Check 1: Resume length
  if (wordCount < 100) {
    issues.push({
      id: "rule-length-too-short",
      category: "sections",
      severity: "critical",
      title: "Resume Too Short",
      whyItMatters:
        "Resumes under 100 words lack sufficient detail for recruiters to assess your qualifications.",
      suggestedImprovement:
        "Expand your experience section with specific achievements, projects, and measurable outcomes.",
      canAIFix: false,
    });
  } else if (wordCount > 1000) {
    issues.push({
      id: "rule-length-too-long",
      category: "sections",
      severity: "warning",
      title: "Resume Too Long",
      whyItMatters:
        "Resumes over 1000 words may lose recruiter attention. Keep it concise and impactful.",
      suggestedImprovement:
        "Focus on the most relevant 5-7 years of experience and remove outdated or irrelevant details.",
      canAIFix: false,
    });
  }

  // Check 2: Missing contact information
  const hasEmail = /@/.test(resumeText);
  const hasPhone = /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText);
  
  if (!hasEmail && !hasPhone) {
    issues.push({
      id: "rule-missing-contact",
      category: "ats",
      severity: "critical",
      title: "Missing Contact Information",
      whyItMatters:
        "Recruiters cannot reach you without email or phone. This is an automatic rejection.",
      suggestedImprovement:
        "Add your email address and phone number at the top of your resume.",
      canAIFix: false,
    });
  }

  // Check 3: Missing common sections
  const hasExperience =
    lowerText.includes("experience") || lowerText.includes("work history");
  const hasEducation = lowerText.includes("education");
  const hasSkills = lowerText.includes("skills");

  if (!hasExperience) {
    issues.push({
      id: "rule-missing-experience",
      category: "sections",
      severity: "critical",
      title: "Missing Experience Section",
      whyItMatters:
        "The Experience section is the most important part of your resume. Without it, recruiters cannot assess your qualifications.",
      suggestedImprovement:
        'Add a section titled "Experience" or "Work History" with your relevant job roles.',
      canAIFix: false,
    });
  }

  if (!hasEducation) {
    issues.push({
      id: "rule-missing-education",
      category: "sections",
      severity: "warning",
      title: "Missing Education Section",
      whyItMatters:
        "Most employers expect to see your educational background, especially for entry-level or technical roles.",
      suggestedImprovement:
        'Add an "Education" section with your degree, institution, and graduation year.',
      canAIFix: false,
    });
  }

  if (!hasSkills) {
    issues.push({
      id: "rule-missing-skills",
      category: "sections",
      severity: "warning",
      title: "Missing Skills Section",
      whyItMatters:
        "ATS systems scan for specific skills. A dedicated Skills section improves keyword matching.",
      suggestedImprovement:
        'Add a "Skills" section listing relevant technical and soft skills.',
      canAIFix: false,
    });
  }

  // Check 4: Basic formatting issues
  const hasMultipleSpaces = /\s{3,}/.test(resumeText);
  if (hasMultipleSpaces) {
    issues.push({
      id: "rule-formatting-spaces",
      category: "formatting",
      severity: "info",
      title: "Excessive Whitespace Detected",
      whyItMatters:
        "Multiple consecutive spaces can confuse ATS parsers and make your resume look unprofessional.",
      suggestedImprovement:
        "Remove extra spaces and use consistent formatting throughout.",
      canAIFix: false,
    });
  }

  return issues;
}

// ============================================================================
// AI-POWERED CONTEXTUAL ANALYSIS
// ============================================================================

/**
 * Use AI to analyze wording quality, tone, and measurable impact.
 * This is where premium, contextual feedback is generated.
 */
async function runAIAnalysis(
  resumeText: string,
  targetRole?: string
): Promise<ResumeIssue[]> {
  const system = buildAnalyzerSystemPrompt();
  const user = buildAnalyzerUserPrompt({
    resumeText,
    targetRole,
  });

  let raw: string;
  try {
    raw = await callGroqChatCompletion({
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      jsonMode: true,
      temperature: 0.3,
    });
  } catch (e) {
    if (e instanceof Error) {
      throw new ResumeAnalyzerError(e.message, "LLM");
    }
    throw new ResumeAnalyzerError("Groq request failed", "LLM");
  }

  const parsed = safeJsonParse(raw);
  const validated = aiContentAnalysisSchema.safeParse(parsed);
  
  if (!validated.success) {
    const detail = validated.error.issues
      .slice(0, 8)
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new ResumeAnalyzerError(
      `AI analysis JSON failed validation${detail ? `: ${detail}` : ""}`,
      "VALIDATION"
    );
  }

  return validated.data.issues || [];
}

// ============================================================================
// SCORING ALGORITHM
// ============================================================================

/**
 * Calculate overall resume score based on issues detected.
 * Critical issues have more weight than warnings.
 */
function calculateScore(issues: ResumeIssue[]): number {
  let score = 100;

  for (const issue of issues) {
    if (issue.severity === "critical") {
      score -= 15;
    } else if (issue.severity === "warning") {
      score -= 8;
    } else if (issue.severity === "info") {
      score -= 3;
    }
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Group issues by category for sidebar summary.
 */
function buildCategorySummary(
  issues: ResumeIssue[]
): Record<IssueCategory, number> {
  const summary: Record<string, number> = {
    content: 0,
    sections: 0,
    ats: 0,
    formatting: 0,
    impact: 0,
    wording: 0,
  };

  for (const issue of issues) {
    summary[issue.category] = (summary[issue.category] || 0) + 1;
  }

  return summary as Record<IssueCategory, number>;
}

// ============================================================================
// MAIN ANALYZER ORCHESTRATION
// ============================================================================

export type AnalyzeResumeInput = {
  resumeText: string;
  targetRole?: string;
};

/**
 * Main entry point: runs hybrid analysis (rule-based + AI).
 * Returns structured result with score, issues, and category summary.
 */
export async function analyzeResume(
  input: AnalyzeResumeInput
): Promise<ResumeAnalysisResult> {
  // Step 1: Run fast rule-based checks (no AI cost)
  const ruleIssues = runRuleBasedAnalysis(input.resumeText);

  // Step 2: Run AI-powered contextual analysis (premium feedback)
  let aiIssues: ResumeIssue[] = [];
  try {
    aiIssues = await runAIAnalysis(input.resumeText, input.targetRole);
  } catch (e) {
    // If AI fails, still return rule-based results
    console.error("AI analysis failed:", e);
  }

  // Step 3: Combine all issues
  const allIssues = [...ruleIssues, ...aiIssues];

  // Step 4: Calculate score and summary
  const score = calculateScore(allIssues);
  const categorySummary = buildCategorySummary(allIssues);

  return {
    score,
    issues: allIssues,
    categorySummary,
    analysisTimestamp: new Date().toISOString(),
  };
}
