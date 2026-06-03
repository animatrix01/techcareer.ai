import { UserButton } from "@clerk/nextjs";
import { MapIcon } from "lucide-react";
import Link from "next/link";

import { getUserResumes } from "@/actions/resume";
import { getUserRoadmaps } from "@/actions/roadmap";
import { CreateResumeButton } from "./components/CreateResumeButton";
import { ResumeCard } from "./components/ResumeCard";
import { RoadmapCard } from "./components/RoadmapCard";

function timeAgo(date: Date | string | null): string {
  if (!date) return "Never";
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function DashboardPage() {
  const [resumes, roadmaps] = await Promise.allSettled([
    getUserResumes(),
    getUserRoadmaps(),
  ]);

  const resumeList = resumes.status === "fulfilled" ? resumes.value : [];
  const roadmapList = roadmaps.status === "fulfilled" ? roadmaps.value : [];

  if (resumes.status === "rejected") {
    console.error("getUserResumes failed:", resumes.reason);
  }
  if (roadmaps.status === "rejected") {
    console.error("getUserRoadmaps failed:", roadmaps.reason);
  }

  return (
    <div className="min-h-screen bg-[#EFE9E1]">
      {/* Retro grid background */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{ 
            backgroundImage: "linear-gradient(#D4C5B3 1px, transparent 1px), linear-gradient(90deg, #D4C5B3 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }}
        />
      </div>

      <header className="border-b-2 border-[#1C1C1C] bg-[#F5F1EB]">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="text-lg font-bold tracking-tight text-[#1C1C1C]" style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}>
            TechCareer OS
          </p>
          <UserButton />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12 space-y-14">

        {/* ── My Resumes ── */}
        <section>
          <h1 className="text-3xl font-black tracking-tight text-[#1C1C1C] sm:text-4xl" style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}>
            My Resumes
          </h1>
          <p className="mt-2 text-base font-medium text-[#5C4F3F]">Create, manage, and download your AI-powered resumes</p>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <CreateResumeButton />
            {resumeList.map((resume) => (
              <ResumeCard
                key={resume.resumeId}
                resumeId={resume.resumeId}
                title={resume.title}
                template={resume.template}
                themeColor={resume.themeColor}
                basics={resume.basics as { jobTitle?: string; email?: string; fullName?: string } | null}
                updatedAt={resume.updatedAt}
              />
            ))}
          </div>
        </section>

        {/* ── Recent Roadmaps ── */}
        <section>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-[#1C1C1C] sm:text-3xl" style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}>
                Recent Roadmaps
              </h2>
              <p className="mt-1 text-base font-medium text-[#5C4F3F]">Your saved career roadmaps</p>
            </div>
            <Link
              href="/tools/roadmap"
              className="rounded-sm border-2 border-[#1C1C1C] bg-[#2F5233] px-4 py-2 text-sm font-bold text-[#EFE9E1] shadow-[4px_4px_0px_0px_rgba(28,28,28,0.25)] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_rgba(28,28,28,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              + New Roadmap
            </Link>
          </div>

          {roadmapList.length === 0 ? (
            <div className="mt-8 flex min-h-[160px] flex-col items-center justify-center rounded-sm border-2 border-dashed border-[#1C1C1C] bg-white text-center p-8">
              <MapIcon className="mb-3 size-8 text-[#D4C5B3]" />
              <p className="text-sm font-bold text-[#5C4F3F]">No roadmaps yet</p>
              <p className="mt-1 text-xs text-[#6B5944]">Generate your first career roadmap to see it here</p>
              <Link
                href="/tools/roadmap"
                className="mt-4 rounded-sm border-2 border-[#1C1C1C] bg-[#2F5233] px-4 py-2 text-xs font-bold text-[#EFE9E1] shadow-[4px_4px_0px_0px_rgba(28,28,28,0.25)] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_rgba(28,28,28,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
              >
                Generate Roadmap
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {roadmapList.map((roadmap) => (
                <RoadmapCard
                  key={roadmap.id}
                  id={roadmap.id}
                  targetRole={roadmap.targetRole}
                  currentSkills={roadmap.currentSkills}
                  createdAt={roadmap.createdAt}
                />
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
