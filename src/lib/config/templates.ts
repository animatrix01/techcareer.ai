import type { BuilderTemplateId } from "@/stores/useBuilderStore";

export type TemplateCategory = 
  | "All Templates"
  | "ATS Friendly"
  | "Modern"
  | "Minimal"
  | "Executive"
  | "Creative"
  | "Professional"
  | "Startup"
  | "Developer"
  | "Student";

export type BuilderTemplate = {
  id: BuilderTemplateId;
  name: string;
  description: string;
  defaultThemeColor: string;
  category: TemplateCategory;
  tags: string[];
};

export const templates: BuilderTemplate[] = [
  // Original templates
  {
    id: "modern",
    name: "Modern",
    description: "Two-column layout with a bold dark sidebar. Perfect for tech and creative roles.",
    defaultThemeColor: "#1a2e35",
    category: "Modern",
    tags: ["two-column", "sidebar", "tech"],
  },
  {
    id: "classic",
    name: "Classic",
    description: "Timeless centered serif layout. Clean, ATS-safe, and universally accepted.",
    defaultThemeColor: "#1e293b",
    category: "ATS Friendly",
    tags: ["ats-safe", "traditional", "serif"],
  },
  {
    id: "executive",
    name: "Executive",
    description: "Authoritative single-column layout built for senior leadership and corporate roles.",
    defaultThemeColor: "#1e3a5f",
    category: "Executive",
    tags: ["corporate", "leadership", "formal"],
  },
  {
    id: "innovator",
    name: "Innovator",
    description: "Modern two-column with accent sidebar. Ideal for startups and product roles.",
    defaultThemeColor: "#6366f1",
    category: "Startup",
    tags: ["startup", "product", "modern"],
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Pure typography-driven layout. Maximum whitespace, zero distractions.",
    defaultThemeColor: "#334155",
    category: "Minimal",
    tags: ["minimal", "clean", "typography"],
  },
  
  // New ATS-friendly templates
  {
    id: "ats-minimal",
    name: "ATS Minimal",
    description: "Ultra-clean single-column design optimized for applicant tracking systems.",
    defaultThemeColor: "#0f172a",
    category: "ATS Friendly",
    tags: ["ats-safe", "minimal", "single-column"],
  },
  {
    id: "ats-compact",
    name: "ATS Compact",
    description: "Space-efficient ATS-friendly layout that fits more content on one page.",
    defaultThemeColor: "#1e293b",
    category: "ATS Friendly",
    tags: ["ats-safe", "compact", "efficient"],
  },
  
  // New Modern/Startup templates
  {
    id: "startup-bold",
    name: "Startup Bold",
    description: "Eye-catching design with vibrant accents. Perfect for fast-growing companies.",
    defaultThemeColor: "#7c3aed",
    category: "Startup",
    tags: ["bold", "vibrant", "modern"],
  },
  {
    id: "tech-focused",
    name: "Tech Focused",
    description: "Developer-friendly layout emphasizing technical skills and projects.",
    defaultThemeColor: "#0891b2",
    category: "Modern",
    tags: ["tech", "developer", "projects"],
  },
  
  // New Creative templates
  {
    id: "creative-sidebar",
    name: "Creative Sidebar",
    description: "Asymmetric two-column design with bold visual hierarchy for creative professionals.",
    defaultThemeColor: "#dc2626",
    category: "Creative",
    tags: ["creative", "asymmetric", "visual"],
  },
  {
    id: "designer-split",
    name: "Designer Split",
    description: "Balanced split layout showcasing design sensibility and attention to detail.",
    defaultThemeColor: "#ea580c",
    category: "Creative",
    tags: ["design", "balanced", "visual"],
  },
  
  // New Professional template
  {
    id: "professional-clean",
    name: "Professional Clean",
    description: "Refined single-column layout for consultants, finance, and corporate professionals.",
    defaultThemeColor: "#1e40af",
    category: "Professional",
    tags: ["professional", "corporate", "refined"],
  },

  // Additional ATS templates
  {
    id: "ats-elegant",
    name: "ATS Elegant",
    description: "Sophisticated ATS-compliant design with refined typography and subtle accents.",
    defaultThemeColor: "#475569",
    category: "ATS Friendly",
    tags: ["ats-safe", "elegant", "sophisticated"],
  },

  // Additional Modern templates
  {
    id: "gradient-pro",
    name: "Gradient Pro",
    description: "Modern gradient accents with bold section headers. Eye-catching yet professional.",
    defaultThemeColor: "#8b5cf6",
    category: "Modern",
    tags: ["gradient", "modern", "bold"],
  },

  // Additional Executive templates
  {
    id: "executive-luxe",
    name: "Executive Luxe",
    description: "Premium executive template with sophisticated spacing and authoritative presence.",
    defaultThemeColor: "#0f172a",
    category: "Executive",
    tags: ["executive", "premium", "luxury"],
  },

  // Additional Creative templates
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    description: "Portfolio-style layout perfect for designers, artists, and creative professionals.",
    defaultThemeColor: "#f59e0b",
    category: "Creative",
    tags: ["portfolio", "creative", "visual"],
  },

  // Developer templates
  {
    id: "developer-dark",
    name: "Developer Dark",
    description: "Dark-themed developer resume with code-inspired aesthetics and technical focus.",
    defaultThemeColor: "#10b981",
    category: "Developer",
    tags: ["developer", "dark", "technical"],
  },

  // Student templates
  {
    id: "fresher-edge",
    name: "Fresher Edge",
    description: "Modern layout for students and recent graduates emphasizing education and projects.",
    defaultThemeColor: "#3b82f6",
    category: "Student",
    tags: ["student", "graduate", "entry-level"],
  },

  // Additional Professional templates
  {
    id: "consultant-pro",
    name: "Consultant Pro",
    description: "Consulting-focused template with emphasis on impact metrics and client work.",
    defaultThemeColor: "#0369a1",
    category: "Professional",
    tags: ["consulting", "metrics", "impact"],
  },

  // Additional Startup templates
  {
    id: "founder-resume",
    name: "Founder Resume",
    description: "Entrepreneurial template highlighting ventures, achievements, and leadership.",
    defaultThemeColor: "#ec4899",
    category: "Startup",
    tags: ["founder", "entrepreneur", "leadership"],
  },
];
