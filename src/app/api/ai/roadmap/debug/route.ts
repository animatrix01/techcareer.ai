import { NextResponse } from "next/server";

/**
 * Dev-only: confirms whether the server process sees a Groq key (no secret values returned).
 * Blocked in all non-development environments.
 */
export const runtime = "nodejs";

export async function GET() {
  // Double-gate: block on anything that isn't explicitly "development"
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Also require a local dev secret so this can't be hit even in dev accidentally
  const devToken = process.env.DEBUG_TOKEN;
  if (!devToken) {
    return NextResponse.json(
      { error: "Set DEBUG_TOKEN in .env.local to use this endpoint" },
      { status: 403 }
    );
  }

  const raw = process.env.GROQ_API_KEY;
  const trimmed = raw?.replace(/^\uFEFF/, "").trim();
  const key =
    trimmed &&
    ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'")))
      ? trimmed.slice(1, -1).trim()
      : trimmed;

  const passesFormat = key ? /^gsk_[A-Za-z0-9_-]+$/.test(key) : false;

  return NextResponse.json({
    keyPresent: Boolean(key && key.length > 0),
    keyLength: key?.length ?? 0,
    startsWithGsk_: key?.startsWith("gsk_") ?? false,
    passesGroqKeyFormat: passesFormat,
    overrideHint:
      "Next.js does not override process.env keys already set by your OS or terminal. " +
      "If .env.local is correct but you still get 401, run in PowerShell before npm run dev: " +
      "Remove-Item Env:GROQ_API_KEY -ErrorAction SilentlyContinue",
  });
}
