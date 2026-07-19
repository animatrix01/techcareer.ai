import type { Metadata } from "next";
import { Nav } from "@/components/landing/sections/Nav";
import { Hero } from "@/components/landing/sections/Hero";
import { Trust } from "@/components/landing/sections/Trust";
import { Bento } from "@/components/landing/sections/Bento";
import { FeaturesCTA } from "@/components/landing/sections/FeaturesCTA";
import { Workflow } from "@/components/landing/sections/Workflow";
import { Templates } from "@/components/landing/sections/Templates";
import { Showcase } from "@/components/landing/sections/Showcase";
import { Stories } from "@/components/landing/sections/Stories";
import { CTA } from "@/components/landing/sections/CTA";
import { Footer } from "@/components/landing/sections/Footer";

export const metadata: Metadata = {
  title: "NextCareer AI — The AI Career Operating System",
  description:
    "NextCareer AI is the AI-native operating system for your career — resumes, ATS, roadmap, interviews and offers in one connected workspace.",
  openGraph: {
    title: "NextCareer AI — The AI Career Operating System",
    description:
      "One connected workspace for resumes, ATS scoring, roadmap, interview prep and offers.",
  },
};

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-ink">
      <Nav />
      <Hero />
      <Trust />
      <Bento />
      <FeaturesCTA />
      <Workflow />
      <Templates />
      <Showcase />
      <Stories />
      <CTA />
      <Footer />
    </main>
  );
}
