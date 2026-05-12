export type BuilderTemplate = {
  id: "executive" | "innovator" | "minimalist";
  name: string;
  description: string;
  thumbnailUrl: string;
};

export const templates: BuilderTemplate[] = [
  {
    id: "executive",
    name: "The Executive",
    description:
      "Structured and authoritative, built for senior leadership resumes with clear impact hierarchy.",
    thumbnailUrl: "https://placehold.co/1200x800/09090b/e4e4e7?text=The+Executive",
  },
  {
    id: "innovator",
    name: "The Innovator",
    description:
      "Bold and modern with progressive spacing for product, startup, and high-growth career stories.",
    thumbnailUrl: "https://placehold.co/1200x800/09090b/e4e4e7?text=The+Innovator",
  },
  {
    id: "minimalist",
    name: "The Minimalist",
    description:
      "Clean and restrained layout that emphasizes readability, crisp language, and timeless design.",
    thumbnailUrl: "https://placehold.co/1200x800/09090b/e4e4e7?text=The+Minimalist",
  },
];
