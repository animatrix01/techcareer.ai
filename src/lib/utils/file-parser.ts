/**
 * Client-side file parsing utilities.
 * Uploads file to server-side API for text extraction.
 */

export class FileParsingError extends Error {
  constructor(
    message: string,
    public readonly fileType?: string
  ) {
    super(message);
    this.name = "FileParsingError";
  }
}

/**
 * Upload file to server and extract text.
 * This calls the server-side API route that handles PDF/DOCX parsing.
 */
export async function parseResumeFile(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/ai/parse-resume", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new FileParsingError(
        data.error || "Failed to parse file",
        file.type
      );
    }

    return data.text;
  } catch (e) {
    if (e instanceof FileParsingError) {
      throw e;
    }
    throw new FileParsingError(
      e instanceof Error ? e.message : "Failed to parse file",
      file.type
    );
  }
}

/**
 * Validate that extracted text is not empty and has minimum length.
 */
export function validateResumeText(text: string): {
  valid: boolean;
  error?: string;
} {
  if (!text || text.trim().length === 0) {
    return {
      valid: false,
      error: "The file appears to be empty or could not be read.",
    };
  }

  if (text.trim().length < 50) {
    return {
      valid: false,
      error: "The resume text is too short. Please upload a complete resume.",
    };
  }

  return { valid: true };
}
