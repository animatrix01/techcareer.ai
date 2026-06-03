import { NextResponse } from "next/server";
import mammoth from "mammoth";

export const runtime = "nodejs";

/**
 * Server-side file parsing endpoint.
 * Accepts multipart/form-data with a resume file (PDF or DOCX).
 * Returns extracted plain text.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Get file type
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = "";

    // Parse based on file type
    if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
      try {
        // Dynamic import for pdf-parse to handle CommonJS module
        const pdfParse = (await import("pdf-parse")).default;
        const pdfData = await pdfParse(buffer);
        extractedText = pdfData.text.trim();
      } catch (pdfError) {
        console.error("PDF parsing error:", pdfError);
        return NextResponse.json(
          {
            ok: false,
            error: "Failed to parse PDF file. Please try a DOCX file or ensure your PDF is not password-protected.",
          },
          { status: 400 }
        );
      }
    } else if (
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileName.endsWith(".docx")
    ) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value.trim();
    } else {
      return NextResponse.json(
        {
          ok: false,
          error: "Unsupported file type. Please upload a PDF or DOCX file.",
        },
        { status: 400 }
      );
    }

    // Validate extracted text
    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "The file appears to be empty or could not be read.",
        },
        { status: 400 }
      );
    }

    if (extractedText.trim().length < 50) {
      return NextResponse.json(
        {
          ok: false,
          error: "The resume text is too short. Please upload a complete resume.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: true, text: extractedText.trim() },
      { status: 200 }
    );
  } catch (e) {
    console.error("File parsing error:", e);
    const message = e instanceof Error ? e.message : "Failed to parse file";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
