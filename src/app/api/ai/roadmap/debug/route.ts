import { NextResponse } from "next/server";

/**
 * Dev-only: confirms whether the server process sees a Groq key (no secret values returned).
 * If keyLength is 0 here but you have GROQ_API_KEY in .env.local, a shell/system env is likely overriding.
 */
export const runtime = "nodejs";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const raw = process.env.GROQ_API_KEY;
  const trimmed = raw?.replace(/^\uFEFF/, "").trim();
  const key =
    trimmed &&
    ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'")))
      ? trimmed.slice(1, -1).trim()
      : trimmed;

  const passesFormat = key
    ? /^gsk_[A-Za-z0-9_-]+$/.test(key)
    : false;

  return NextResponse.json({
    keyPresent: Boolean(key && key.length > 0),
    keyLength: key?.length ?? 0,
    startsWithGsk_: key?.startsWith("gsk_") ?? false,
    passesGroqKeyFormat: passesFormat,
    overrideHint:
      "Next.js does not override process.env keys already set by your OS or terminal. " +
      "If .env.local is correct but you still get 401, run in PowerShell before npm run dev: " +
      "Remove-Item Env:GROQ_API_KEY -ErrorAction SilentlyContinue; " +
      "Also check Windows Settings → System → About → Advanced system settings → Environment Variables.",
  });
}
