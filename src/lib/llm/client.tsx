type ChatMessage = { role: "system" | "user"; content: string };

export type GroqChatCompletionOptions = {
  messages: ChatMessage[];
  temperature?: number;
  /** Groq supports OpenAI-style json_object response format */
  jsonMode?: boolean;
};

/**
 * Normalizes env values from .env files (quotes, UTF-8 BOM, CRLF).
 * Groq API keys are issued as `gsk_...` from https://console.groq.com/keys
 */
function normalizeSecret(value: string | undefined): string | undefined {
  if (value === undefined) return undefined;
  let v = value.replace(/^\uFEFF/, "").trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v.length > 0 ? v : undefined;
}

function requireGroqApiKey(): string {
  const key = normalizeSecret(process.env.GROQ_API_KEY);
  if (!key) {
    throw new Error(
      "GROQ_API_KEY is not configured. Set it in the server environment (e.g. .env.local)."
    );
  }
  if (!key.startsWith("gsk_")) {
    throw new Error(
      "GROQ_API_KEY must start with gsk_. Create an API key at https://console.groq.com/keys and paste it into .env.local, then restart `npm run dev`."
    );
  }
  // Groq issues URL-safe ASCII tokens; reject odd Unicode / whitespace inside the token
  if (!/^gsk_[A-Za-z0-9_-]+$/.test(key)) {
    throw new Error(
      "GROQ_API_KEY has invalid characters. Re-copy the key from https://console.groq.com/keys (ASCII only, no spaces)."
    );
  }
  return key;
}

function defaultModel(): string {
  return process.env.GROQ_MODEL?.trim() || "llama-3.3-70b-versatile";
}

type GroqChatCompletionResponse = {
  choices?: Array<{
    message?: { content?: string | null };
    finish_reason?: string;
  }>;
  error?: { message?: string };
};

/**
 * Server-only Groq call (OpenAI-compatible chat completions).
 * Swap implementation here later for multi-provider routing.
 */
export async function callGroqChatCompletion(
  options: GroqChatCompletionOptions
): Promise<string> {
  const apiKey = requireGroqApiKey();
  const model = defaultModel();

  const body: Record<string, unknown> = {
    model,
    messages: options.messages,
    temperature: options.temperature ?? 0.35,
  };

  if (options.jsonMode) {
    body.response_format = { type: "json_object" };
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const rawText = await res.text();
  let parsed: GroqChatCompletionResponse;
  try {
    parsed = JSON.parse(rawText) as GroqChatCompletionResponse;
  } catch {
    throw new Error(`Groq returned non-JSON (status ${res.status})`);
  }

  if (!res.ok) {
    const msg = parsed.error?.message ?? rawText.slice(0, 500);
    if (res.status === 401) {
      throw new Error(
        [
          "Groq API error (401): Invalid API Key.",
          "1) Paste a new key from https://console.groq.com/keys into .env.local as GROQ_API_KEY=gsk_... (single line).",
          "2) Fully restart npm run dev.",
          "3) If it still fails: your OS or terminal may be overriding .env.local. In PowerShell run: Remove-Item Env:GROQ_API_KEY -ErrorAction SilentlyContinue",
          "   then check Windows Environment Variables for GROQ_API_KEY.",
          "4) In dev, open GET /api/ai/roadmap/debug to see whether the server sees a key (length only, no secret).",
        ].join(" ")
      );
    }
    throw new Error(`Groq API error (${res.status}): ${msg}`);
  }

  const content = parsed.choices?.[0]?.message?.content;
  if (typeof content !== "string" || content.length === 0) {
    throw new Error("Groq response missing message content");
  }

  return content;
}