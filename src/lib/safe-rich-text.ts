const ALLOWED_TAGS = new Set(["p", "strong", "em", "ul", "ol", "li", "br"]);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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

export function sanitizeRichTextHtml(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";

  if (typeof window === "undefined") {
    return `<p>${escapeHtml(trimmed)}</p>`;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(trimmed, "text/html");
  return Array.from(doc.body.childNodes).map(sanitizeNode).join("");
}
