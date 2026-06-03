import { NextResponse } from "next/server";

import { analyzeResume, ResumeAnalyzerError } from "@/lib/ai/resume-analyzer";
import { analyzerApiRequestSchema } from "@/lib/llm/schemas";

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

  const parsed = analyzerApiRequestSchema.safeParse(json);
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
    const analysis = await analyzeResume({
      resumeText: parsed.data.resumeText,
      targetRole: parsed.data.targetRole,
    });
    return NextResponse.json({ ok: true, analysis }, { status: 200 });
  } catch (e) {
    if (e instanceof ResumeAnalyzerError) {
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
