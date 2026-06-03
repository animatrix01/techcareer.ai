"use client";

import type { ResumeBuilderData } from "@/stores/useBuilderStore";
import { RichTextContent } from "@/components/features/builder/rich-text-content";
import { cn } from "@/lib/utils";

function formatDates(start: string, end: string) {
  const s = start.trim();
  const e = end.trim();
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s} - ${e}`;
}

function skillTokens(skills: string) {
  return skills
    .split(/[,•\n]/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function StartupBoldTemplate({
  resume,
  themeColor,
}: {
  resume: ResumeBuilderData;
  themeColor: string;
}) {
  const { basics, skills, experience, education, projects } = resume;
  const skillsList = skillTokens(skills);

  return (
    <article
      className="grid h-full min-h-0 grid-cols-[35%_1fr] bg-white text-slate-900 shadow-md ring-1 ring-slate-200/90"
      aria-label="Startup Bold resume template preview"
    >
      {/* Left sidebar */}
      <aside
        className="px-[6mm] py-[8mm] text-white"
        style={{ backgroundColor: themeColor }}
      >
        <header>
          <h1 className="text-[clamp(1.2rem,3cqw,1.6rem)] font-bold leading-tight tracking-tight">
            {basics.fullName.trim() || "Your Name"}
          </h1>
          {basics.jobTitle.trim() && (
            <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wider opacity-90">
              {basics.jobTitle}
            </p>
          )}
        </header>

        <section className="mt-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider opacity-90">
            Contact
          </h2>
          <div className="mt-2 space-y-1 text-[10px] leading-relaxed opacity-95">
            {basics.email && <p>{basics.email}</p>}
            {basics.phone && <p>{basics.phone}</p>}
            {basics.location && <p>{basics.location}</p>}
          </div>
        </section>

        {skillsList.length > 0 ? (
          <section className="mt-5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider opacity-90">
              Skills
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {skillsList.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full bg-white/20 px-2.5 py-1 text-[9.5px] font-medium backdrop-blur-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {education.length > 0 ? (
          <section className="mt-5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider opacity-90">
              Education
            </h2>
            <ul className="mt-2 space-y-2.5">
              {education.map((ed) => (
                <li key={ed.id} className="text-[10px] leading-relaxed opacity-95">
                  <p className="font-semibold">{ed.degree.trim() || "Degree"}</p>
                  <p className="mt-1">{ed.institution.trim() || "Institution"}</p>
                  <p className="mt-0.5 text-[9px] opacity-80">
                    {formatDates(ed.startDate, ed.endDate)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </aside>

      {/* Main content */}
      <main className="px-[8mm] py-[8mm]">
        {basics.summary.trim() ? (
          <section>
            <h2
              className="text-[12px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              About
            </h2>
            <RichTextContent
              html={basics.summary}
              className="mt-2 text-[11px] leading-relaxed text-slate-700"
            />
          </section>
        ) : null}

        {experience.length > 0 ? (
          <section className={cn(basics.summary.trim() && "mt-5")}>
            <h2
              className="text-[12px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              Experience
            </h2>
            <ul className="mt-2.5 space-y-3.5">
              {experience.map((job) => (
                <li key={job.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[11.5px] font-bold text-slate-900">
                      {job.role.trim() || "Role"}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {formatDates(job.startDate, job.endDate)}
                    </p>
                  </div>
                  <p className="mt-1 text-[11px] font-semibold text-slate-700">
                    {job.company.trim() || "Company"}
                  </p>
                  {job.description.trim() ? (
                    <RichTextContent
                      html={job.description}
                      className="mt-1.5 text-[10.5px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-4"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {projects.length > 0 ? (
          <section className="mt-5">
            <h2
              className="text-[12px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              Projects
            </h2>
            <ul className="mt-2.5 space-y-3">
              {projects.map((p) => (
                <li key={p.id}>
                  <p className="text-[11px] font-bold text-slate-900">
                    {p.name.trim() || "Project"}
                    {p.stack.trim() && (
                      <span className="ml-2 text-[10px] font-normal text-slate-500">
                        {p.stack.trim()}
                      </span>
                    )}
                  </p>
                  {p.description.trim() && (
                    <p className="mt-1 text-[10.5px] leading-relaxed text-slate-700">
                      {p.description.trim()}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </article>
  );
}
