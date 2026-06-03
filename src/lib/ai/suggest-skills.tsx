import { callGroqChatCompletion } from "@/lib/llm/client";
import {
  buildSuggestSkillsSystemPrompt,
  buildSuggestSkillsUserPrompt,
} from "@/lib/llm/prompts/suggest-skills";
import {
  suggestSkillsResponseSchema,
  type SuggestSkillsResponse,
} from "@/lib/llm/schemas";

export class SkillSuggestionError extends Error {
  constructor(
    message: string,
    public readonly causeCode:
      | "PARSE"
      | "VALIDATION"
      | "LLM"
      | "UNKNOWN" = "UNKNOWN"
  ) {
    super(message);
    this.name = "SkillSuggestionError";
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
      throw new SkillSuggestionError(
        "Model output was not valid JSON",
        "PARSE"
      );
    }
  }
}

export type SuggestSkillsInput = {
  jobTitle: string;
  currentSkills: string[];
};

export async function suggestSkills(
  input: SuggestSkillsInput
): Promise<SuggestSkillsResponse> {
  const system = buildSuggestSkillsSystemPrompt();
  const user = buildSuggestSkillsUserPrompt({
    jobTitle: input.jobTitle,
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
      temperature: 0.4,
    });
  } catch (e) {
    if (e instanceof Error) {
      throw new SkillSuggestionError(e.message, "LLM");
    }
    throw new SkillSuggestionError("Groq request failed", "LLM");
  }

  const parsed = safeJsonParse(raw);
  const validated = suggestSkillsResponseSchema.safeParse(parsed);
  if (!validated.success) {
    const detail = validated.error.issues
      .slice(0, 8)
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new SkillSuggestionError(
      `Skill suggestions JSON failed validation${detail ? `: ${detail}` : ""}`,
      "VALIDATION"
    );
  }

  return validated.data;
}
