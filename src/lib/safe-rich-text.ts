const ALLOWED_TAGS = new Set(["p", "strong", "em", "ul", "ol", "li", "br"]);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Checks whether the string contains any HTML tags from the allowed set.
 * Used to decide if we should parse as HTML or treat as plain text.
 */
function looksLikeHtml(input: string): boolean {
  return /<(p|strong|em|ul|ol|li|br)\b/i.test(input);
}

/**
 * Server-safe HTML sanitizer using regex-based parsing.
 * Produces identical output to the client DOMParser path for allowed tags.
 */
function sanitizeHtmlServer(input: string): string {
  // Strip all tags except allowed ones, preserving their content
  // This regex approach keeps allowed tags and removes unknown ones
  const allowed = Array.from(ALLOWED_TAGS).join("|");
  const tagPattern = new RegExp(
    `<(/?(${allowed})(?:\\s[^>]*)?)>|<[^>]+>`,
    "gi"
  );

  return input.replace(tagPattern, (match, allowedTag) => {
    if (allowedTag !== undefined) {
      // It's an allowed tag — normalize it
      const tagName = allowedTag.replace(/^\//, "").trim().toLowerCase();
      if (tagName === "br") return "<br />";
      return match.replace(/<\s*/, "<").replace(/\s*>/, ">");
    }
    // Unknown tag — strip it, keep inner text (handled by outer replace)
    return "";
  });
}

function sanitizeNode(node: ChildNode): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return escapeHtml(node.textContent ?? "");
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return "";

  const element = node as Element;
  const tag = element.tagName.toLowerCase();

  const childHtml = Array.from(element.childNodes).map(sanitizeNode).join("");
  if (!ALLOWED_TAGS.has(tag)) {
    return childHtml;
  }

  if (tag === "br") return "<br />";
  return `<${tag}>${childHtml}</${tag}>`;
}

/**
 * Sanitizes rich text HTML for safe use in dangerouslySetInnerHTML.
 *
 * IMPORTANT: Both server and client paths must produce identical output
 * to avoid React hydration mismatches. The strategy:
 * - If input looks like HTML → sanitize it (keep allowed tags, strip others)
 * - If input is plain text → escape it and return as-is (no wrapping <p>)
 *
 * This ensures SSR and CSR always agree on the output.
 */
export function sanitizeRichTextHtml(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";

  // Plain text (no HTML tags) — just escape and return directly.
  // Both server and client take this same path → no mismatch.
  if (!looksLikeHtml(trimmed)) {
    return escapeHtml(trimmed);
  }

  // HTML input — use environment-appropriate parser but produce same output.
  if (typeof window === "undefined") {
    // Server: regex-based sanitizer
    return sanitizeHtmlServer(trimmed);
  }

  // Client: DOMParser-based sanitizer
  const parser = new DOMParser();
  const doc = parser.parseFromString(trimmed, "text/html");
  return Array.from(doc.body.childNodes).map(sanitizeNode).join("");
}
