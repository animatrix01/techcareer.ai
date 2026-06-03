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

export function TechFocusedTemplate({
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
      className="h-full min-h-0 bg-white px-[9mm] py-[7mm] text-slate-900 shadow-sm ring-1 ring-slate-200/80"
      aria-label="Tech Focused resume template preview"
    >
      <header className="border-b-2 pb-2" style={{ borderColor: themeColor }}>
        <h1 className="text-[clamp(1.1rem,2.8cqw,1.5rem)] font-bold tracking-tight text-slate-950">
          {basics.fullName.trim() || "Your Name"}
        </h1>
        {basics.jobTitle.trim() && (
          <p className="mt-0.5 text-[11px] font-semibold" style={{ color: themeColor }}>
            {basics.jobTitle}
          </p>
        )}
        <p className="mt-1 text-[9.5px] text-slate-600">
          {[basics.email, basics.phone, basics.location].filter(Boolean).join(" • ")}
        </p>
      </header>

      {basics.summary.trim() ? (
        <section className="mt-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Summary
          </h2>
          <RichTextContent
            html={basics.summary}
            className="mt-1 text-[10px] leading-relaxed text-slate-700"
          />
        </section>
      ) : null}

      {skillsList.length > 0 ? (
        <section className="mt-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Technical Skills
          </h2>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {skillsList.map((skill, i) => (
              <span
                key={i}
                className="rounded border px-2 py-0.5 text-[9px] font-medium"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className="mt-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Projects
          </h2>
          <ul className="mt-2 space-y-2.5">
            {projects.map((p) => (
              <li key={p.id} className="border-l-2 pl-2" style={{ borderColor: themeColor }}>
                <p className="text-[10.5px] font-bold text-slate-900">
                  {p.name.trim() || "Project Name"}
                </p>
                {p.stack.trim() && (
                  <p className="mt-0.5 text-[9px] font-medium text-slate-600">
                    Tech Stack: {p.stack.trim()}
                  </p>
                )}
                {p.description.trim() && (
                  <p className="mt-1 text-[9.5px] leading-relaxed text-slate-700">
                    {p.description.trim()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {experience.length > 0 ? (
        <section className="mt-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Experience
          </h2>
          <ul className="mt-2 space-y-2.5">
            {experience.map((job) => (
              <li key={job.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[10.5px] font-bold text-slate-900">
                    {job.role.trim() || "Role"}
                  </p>
                  <p className="text-[9px] text-slate-500">
                    {formatDates(job.startDate, job.endDate)}
                  </p>
                </div>
                <p className="mt-0.5 text-[10px] font-semibold text-slate-700">
                  {job.company.trim() || "Company"}
                </p>
                {job.description.trim() ? (
                  <RichTextContent
                    html={job.description}
                    className="mt-1 text-[9.5px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-4"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {education.length > 0 ? (
        <section className="mt-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Education
          </h2>
          <ul className="mt-2 space-y-2">
            {education.map((ed) => (
              <li key={ed.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[10px] font-semibold text-slate-900">
                    {ed.degree.trim() || "Degree"}
                  </p>
                  <p className="text-[9px] text-slate-500">
                    {formatDates(ed.startDate, ed.endDate)}
                  </p>
                </div>
                <p className="text-[9.5px] text-slate-700">
                  {ed.institution.trim() || "Institution"}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
