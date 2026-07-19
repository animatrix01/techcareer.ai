import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import mammoth from "mammoth";

import { checkRateLimit } from "@/lib/rate-limit";
import { logError } from "@/lib/logger";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const IS_DEV = process.env.NODE_ENV === "development";

/** Safe error response — never leaks raw messages in production */
function serverError(e: unknown, userMessage: string, status = 500) {
  logError("[parse-resume]", e); // uses structured logger
  return NextResponse.json(
    {
      ok: false,
      error: userMessage,
      ...(IS_DEV && { debug: e instanceof Error ? e.message : String(e) }),
    },
    { status }
  );
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const limited = await checkRateLimit("parseResume", userId);
  if (limited) return limited;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { ok: false, error: "File too large. Maximum size is 5MB." },
        { status: 413 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ── Magic bytes validation ────────────────────────────────────────────
    // Check the actual file content, NOT the attacker-controlled filename/Content-Type.
    // PDF magic: first 4 bytes = %PDF (0x25 0x50 0x44 0x46)
    // DOCX magic: first 2 bytes = PK  (0x50 0x4B) — DOCX is a ZIP archive
    const magic = buffer.subarray(0, 4);
    const isPDF  = magic[0] === 0x25 && magic[1] === 0x50 && magic[2] === 0x44 && magic[3] === 0x46; // %PDF
    const isDOCX = magic[0] === 0x50 && magic[1] === 0x4B; // PK (ZIP/DOCX)

    if (!isPDF && !isDOCX) {
      return NextResponse.json(
        { ok: false, error: "Invalid file type. Please upload a real PDF or DOCX file." },
        { status: 400 }
      );
    }

    let extractedText = "";

    if (isPDF) {
      try {
        const { extractText } = await import("unpdf");
        const uint8 = new Uint8Array(buffer);
        const { text } = await extractText(uint8, { mergePages: true });
        extractedText = text.trim();
      } catch (pdfError) {
        // Safe: give a user-friendly message, log details server-side
        return serverError(
          pdfError,
          "Failed to parse PDF. Please ensure it is not password-protected or try a DOCX file.",
          400
        );
      }
    } else if (isDOCX) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value.trim();
    } else {
      // Should never reach here — magic bytes check above already rejects non-PDF/DOCX
      return NextResponse.json(
        { ok: false, error: "Unsupported file type. Please upload a PDF or DOCX file." },
        { status: 400 }
      );
    }

    if (!extractedText || extractedText.trim().length < 50) {
      return NextResponse.json(
        { ok: false, error: "Could not extract enough text. Please try a different file." },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, text: extractedText.trim() }, { status: 200 });
  } catch (e) {
    return serverError(e, "Failed to process file. Please try again.");
  }
}
