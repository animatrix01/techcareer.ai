/**
 * Prompt injection sanitization for all LLM user inputs.
 *
 * Defense strategy:
 *  1. Hard-truncate to a max length before any other processing
 *  2. Strip non-printable / non-ASCII characters (keeps newlines/tabs)
 *  3. Filter common prompt-injection trigger phrases
 *  4. Wrap in XML-style delimiters so the model treats content as data, not instructions
 */

/** Common injection trigger patterns — case-insensitive */
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions?/gi,
  /disregard\s+(all\s+)?(previous|prior|above)\s+instructions?/gi,
  /forget\s+(all\s+)?(previous|prior|above)\s+instructions?/gi,
  /override\s+(all\s+)?(previous|prior|above)\s+instructions?/gi,
  /you\s+are\s+now\s+(DAN|an?\s+AI\s+without|a\s+different)/gi,
  /reveal\s+(your\s+)?(system\s+prompt|instructions?|prompt)/gi,
  /print\s+(your\s+)?(system\s+prompt|instructions?|prompt)/gi,
  /show\s+(your\s+)?(system\s+prompt|instructions?|prompt)/gi,
  /repeat\s+(your\s+)?(system\s+prompt|instructions?|prompt)/gi,
  /new\s+instructions?:/gi,
  /updated?\s+instructions?:/gi,
  /assistant\s*:/gi,
  /system\s*:/gi,
  /<\|im_start\|>/gi,
  /<\|im_end\|>/gi,
  /\[INST\]/gi,
  /\[\/INST\]/gi,
  /###\s*instruction/gi,
  /###\s*system/gi,
  /###\s*human/gi,
  /jailbreak/gi,
  /do\s+anything\s+now/gi,
];

/**
 * Sanitize a single user-provided string before embedding it in an LLM prompt.
 *
 * @param input      Raw user input
 * @param maxLength  Hard character cap (default 2000)
 * @returns          Cleaned string safe for prompt embedding
 */
export function sanitizeUserInput(input: string, maxLength = 2000): string {
  let sanitized = input
    // 1. Hard truncate first — before any regex work on huge strings
    .slice(0, maxLength)
    // 2. Strip non-printable characters, keep newlines/tabs/spaces
    .replace(/[^\x20-\x7E\n\r\t]/g, " ")
    // 3. Collapse excessive whitespace lines (more than 2 blank lines → 1)
    .replace(/(\n\s*){3,}/g, "\n\n")
    .trim();

  // 4. Replace injection trigger phrases with a neutral placeholder
  for (const pattern of INJECTION_PATTERNS) {
    sanitized = sanitized.replace(pattern, "[filtered]");
  }

  return sanitized;
}

/**
 * Sanitize a short single-line field (job title, role name, skill name).
 * Much stricter — strips newlines too, caps at 150 chars.
 */
export function sanitizeShortInput(input: string, maxLength = 150): string {
  return input
    .slice(0, maxLength)
    .replace(/[^\x20-\x7E]/g, " ") // no newlines allowed in short fields
    .replace(/[<>{}[\]]/g, "")     // strip chars that look like template syntax
    .trim();
}

/**
 * Wrap sanitized content in XML-style delimiters.
 * This signals to the model that the enclosed text is user DATA, not instructions.
 *
 * @param tag      The XML tag name (e.g. "resume_content", "user_summary")
 * @param content  Already-sanitized string
 */
export function wrapInDelimiters(tag: string, content: string): string {
  return `<${tag}>\n${content}\n</${tag}>`;
}
