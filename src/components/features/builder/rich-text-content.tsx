"use client";

import { useMemo } from "react";

import { sanitizeRichTextHtml } from "@/lib/safe-rich-text";

export function RichTextContent({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  const safeHtml = useMemo(() => sanitizeRichTextHtml(html), [html]);
  if (!safeHtml) return null;

  return <div className={className} dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
