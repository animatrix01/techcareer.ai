import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Interactive tools for resumes, analysis, and career roadmaps on NextCareer AI.",
};

export default function ToolsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
