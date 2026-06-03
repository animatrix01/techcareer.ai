import { NextResponse } from "next/server";

import { enhanceSummary, SummaryEnhancementError } from "@/lib/ai/enhance-summary";
import { enhanceSummaryApiRequestSchema } from "@/lib/llm/schemas";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = enhanceSummaryApiRequestSchema.safeParse(json);
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
    const result = await enhanceSummary({
      currentSummary: parsed.data.currentSummary,
    });
    return NextResponse.json({ ok: true, result }, { status: 200 });
  } catch (e) {
    if (e instanceof SummaryEnhancementError) {
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
