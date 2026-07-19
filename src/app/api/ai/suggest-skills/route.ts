import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { suggestSkills, SkillSuggestionError } from "@/lib/ai/suggest-skills";
import { suggestSkillsApiRequestSchema } from "@/lib/llm/schemas";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const limited = await checkRateLimit("suggestSkills", userId);
  if (limited) return limited;

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = suggestSkillsApiRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid request",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  try {
    const result = await suggestSkills({
      jobTitle: parsed.data.jobTitle,
      currentSkills: parsed.data.currentSkills,
    });
    return NextResponse.json({ ok: true, result }, { status: 200 });
  } catch (e) {
    if (e instanceof SkillSuggestionError) {
      const status =
        e.causeCode === "VALIDATION" || e.causeCode === "PARSE" ? 422 : 502;
      return NextResponse.json(
        { ok: false, error: e.message, code: e.causeCode },
        { status }
      );
    }
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json(
      { ok: false, error: message, code: "UNKNOWN" },
      { status: 500 }
    );
  }
}
