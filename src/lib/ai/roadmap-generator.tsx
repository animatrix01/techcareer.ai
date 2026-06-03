import { callGroqChatCompletion } from "@/lib/llm/client";
import {
  buildRoadmapSystemPrompt,
  buildRoadmapUserPrompt,
} from "@/lib/llm/prompts/roadmap";
import {
  roadmapGenerationResultSchema,
  type RoadmapGenerationResult,
} from "@/lib/llm/schemas";

export class RoadmapGenerationError extends Error {
  constructor(
    message: string,
    public readonly causeCode:
      | "PARSE"
      | "VALIDATION"
      | "LLM"
      | "UNKNOWN" = "UNKNOWN"
  ) {
    super(message);
    this.name = "RoadmapGenerationError";
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
      throw new RoadmapGenerationError(
        "Model output was not valid JSON",
        "PARSE"
      );
    }
  }
}

export type GenerateRoadmapInput = {
  targetRole: string;
  currentSkills: string[];
};

export async function generateRoadmap(
  input: GenerateRoadmapInput
): Promise<RoadmapGenerationResult> {
  const system = buildRoadmapSystemPrompt();
  const user = buildRoadmapUserPrompt({
    targetRole: input.targetRole,
    currentSkills: input.currentSkills,
  });

  let raw: string;
  try {
    raw = await callGroqChatCompletion({
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      jsonMode: true,
      temperature: 0.35,
    });
  } catch (e) {
    if (e instanceof Error) {
      throw new RoadmapGenerationError(e.message, "LLM");
    }
    throw new RoadmapGenerationError("Groq request failed", "LLM");
  }

  const parsed = safeJsonParse(raw);
  const validated = roadmapGenerationResultSchema.safeParse(parsed);
  if (!validated.success) {
    const detail = validated.error.issues
      .slice(0, 8)
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new RoadmapGenerationError(
      `Roadmap JSON failed validation${detail ? `: ${detail}` : ""}`,
      "VALIDATION"
    );
  }

  return validated.data;
}
