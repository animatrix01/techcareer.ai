import { MapIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="min-h-screen">
      <header className="border-b border-border/40 bg-paper/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/next career logo only.png"
              alt="NextCareer logo"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="font-semibold text-lg tracking-tight text-ink">
              NextCareer AI
            </span>
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1180px] px-6 py-16 space-y-20">

        {/* ── My Resumes ── */}
        <section>
          <div className="mb-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Dashboard
            </div>
            <h1 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-ink">
              My Resumes
            </h1>
            <p className="mt-3 text-muted-foreground">Create, manage, and download your AI-powered resumes</p>
          </div>

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
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Career Paths
              </div>
              <h2 className="mt-3 font-serif text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.05] text-ink">
                Recent Roadmaps
              </h2>
              <p className="mt-2 text-muted-foreground">Your saved career roadmaps</p>
            </div>
            <Link
              href="/tools/roadmap"
              className="btn-primary shrink-0"
            >
              + New Roadmap
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {roadmapList.length === 0 ? (
            <div className="mt-8 tile flex min-h-[200px] flex-col items-center justify-center text-center p-12">
              <MapIcon className="mb-4 size-10 text-muted-foreground/40" />
              <p className="text-sm font-semibold text-ink">No roadmaps yet</p>
              <p className="mt-2 text-sm text-muted-foreground">Generate your first career roadmap to see it here</p>
              <Link
                href="/tools/roadmap"
                className="mt-6 btn-primary"
              >
                Generate Roadmap
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
