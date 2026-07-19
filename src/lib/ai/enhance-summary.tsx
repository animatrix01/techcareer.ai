import { callGroqChatCompletion } from "@/lib/llm/client";
import {
  buildEnhanceSummarySystemPrompt,
  buildEnhanceSummaryUserPrompt,
} from "@/lib/llm/prompts/enhance-summary";
import {
  enhanceSummaryResponseSchema,
  type EnhanceSummaryResponse,
} from "@/lib/llm/schemas";

export class SummaryEnhancementError extends Error {
  constructor(
    message: string,
    public readonly causeCode:
      | "PARSE"
      | "VALIDATION"
      | "LLM"
      | "UNKNOWN" = "UNKNOWN"
  ) {
    super(message);
    this.name = "SummaryEnhancementError";
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
      throw new SummaryEnhancementError(
        "Model output was not valid JSON",
        "PARSE"
      );
    }
  }
}

export type EnhanceSummaryInput = {
  currentSummary: string;
};

export async function enhanceSummary(
  input: EnhanceSummaryInput
): Promise<EnhanceSummaryResponse> {
  const system = buildEnhanceSummarySystemPrompt();
  const user = buildEnhanceSummaryUserPrompt({
    currentSummary: input.currentSummary,
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
      throw new SummaryEnhancementError(e.message, "LLM");
    }
    throw new SummaryEnhancementError("Groq request failed", "LLM");
  }

  const parsed = safeJsonParse(raw);
  const validated = enhanceSummaryResponseSchema.safeParse(parsed);
  if (!validated.success) {
    const detail = validated.error.issues
      .slice(0, 8)
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new SummaryEnhancementError(
      `Enhancement JSON failed validation${detail ? `: ${detail}` : ""}`,
      "VALIDATION"
    );
  }

  return validated.data;
}
