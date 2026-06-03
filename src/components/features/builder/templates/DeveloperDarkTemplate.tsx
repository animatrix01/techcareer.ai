"use client";

import type { ResumeBuilderData } from "@/stores/useBuilderStore";
import { RichTextContent } from "@/components/features/builder/rich-text-content";

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

export function DeveloperDarkTemplate({
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
      className="h-full min-h-0 bg-slate-900 px-[9mm] py-[8mm] text-slate-100 shadow-md ring-1 ring-slate-700"
      aria-label="Developer Dark resume template preview"
    >
      <header className="border-b border-slate-700 pb-3.5">
        <h1 className="font-mono text-[clamp(1.3rem,3.2cqw,1.7rem)] font-bold tracking-tight">
          <span style={{ color: themeColor }}>&gt;</span> {basics.fullName.trim() || "your_name"}
        </h1>
        {basics.jobTitle.trim() && (
          <p className="mt-1.5 font-mono text-[11px] text-slate-400">
            {"// "}{basics.jobTitle}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-[10px] text-slate-400">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>{basics.location}</span>}
        </div>
      </header>

      {basics.summary.trim() ? (
        <section className="mt-4">
          <h2 className="font-mono text-[11.5px] font-bold" style={{ color: themeColor }}>
            $ cat about.txt
          </h2>
          <RichTextContent
            html={basics.summary}
            className="mt-2 text-[11px] leading-relaxed text-slate-300"
          />
        </section>
      ) : null}

      {skillsList.length > 0 ? (
        <section className="mt-4">
          <h2 className="font-mono text-[11.5px] font-bold" style={{ color: themeColor }}>
            $ ls skills/
          </h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {skillsList.map((skill, i) => (
              <span
                key={i}
                className="rounded border border-slate-700 bg-slate-800 px-2 py-1 font-mono text-[9.5px] text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className="mt-4">
          <h2 className="font-mono text-[11.5px] font-bold" style={{ color: themeColor }}>
            $ git log --projects
          </h2>
          <ul className="mt-2.5 space-y-3">
            {projects.map((p) => (
              <li key={p.id} className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
                <p className="font-mono text-[11px] font-bold" style={{ color: themeColor }}>
                  {p.name.trim() || "project_name"}
                </p>
                {p.stack.trim() && (
                  <p className="mt-1 font-mono text-[10px] text-slate-400">
                    Stack: {p.stack.trim()}
                  </p>
                )}
                {p.description.trim() && (
                  <p className="mt-1.5 text-[10.5px] leading-relaxed text-slate-300">
                    {p.description.trim()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {experience.length > 0 ? (
        <section className="mt-4">
          <h2 className="font-mono text-[11.5px] font-bold" style={{ color: themeColor }}>
            $ cat experience.log
          </h2>
          <ul className="mt-2.5 space-y-3">
            {experience.map((job) => (
              <li key={job.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-mono text-[11px] font-bold text-slate-100">
                    {job.role.trim() || "role"}
                  </p>
                  <p className="font-mono text-[9.5px] text-slate-500">
                    {formatDates(job.startDate, job.endDate)}
                  </p>
                </div>
                <p className="mt-1 text-[10.5px] text-slate-400">
                  @ {job.company.trim() || "company"}
                </p>
                {job.description.trim() ? (
                  <RichTextContent
                    html={job.description}
                    className="mt-1.5 text-[10px] leading-relaxed text-slate-300 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-4"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {education.length > 0 ? (
        <section className="mt-4">
          <h2 className="font-mono text-[11.5px] font-bold" style={{ color: themeColor }}>
            $ cat education.md
          </h2>
          <ul className="mt-2.5 space-y-2.5">
            {education.map((ed) => (
              <li key={ed.id}>
                <p className="text-[10.5px] font-semibold text-slate-100">
                  {ed.degree.trim() || "degree"}
                </p>
                <p className="mt-1 text-[10px] text-slate-400">
                  {ed.institution.trim() || "institution"}
                </p>
                <p className="mt-0.5 font-mono text-[9.5px] text-slate-500">
                  {formatDates(ed.startDate, ed.endDate)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
