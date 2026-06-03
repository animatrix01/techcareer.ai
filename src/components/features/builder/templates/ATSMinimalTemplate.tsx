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

export function ATSMinimalTemplate({ resume }: { resume: ResumeBuilderData }) {
  const { basics, skills, experience, education, projects } = resume;
  const skillsList = skillTokens(skills);

  return (
    <article
      className="h-full min-h-0 bg-white px-[10mm] py-[8mm] text-slate-900 shadow-sm ring-1 ring-slate-200/80"
      aria-label="ATS Minimal resume template preview"
    >
      <header>
        <h1 className="text-[clamp(1.3rem,3.2cqw,1.7rem)] font-bold tracking-tight text-slate-950">
          {basics.fullName.trim() || "Your Name"}
        </h1>
        {basics.jobTitle.trim() && (
          <p className="mt-1 text-[12px] font-medium text-slate-600">
            {basics.jobTitle}
          </p>
        )}
        <p className="mt-1.5 text-[10.5px] text-slate-600">
          {[basics.email, basics.phone, basics.location].filter(Boolean).length
            ? [basics.email, basics.phone, basics.location].filter(Boolean).join(" | ")
            : "email | phone | location"}
        </p>
      </header>

      {basics.summary.trim() ? (
        <section className="mt-4">
          <h2 className="text-[12px] font-bold uppercase tracking-wide text-slate-900">
            Professional Summary
          </h2>
          <div className="mt-1 h-px bg-slate-300" />
          <RichTextContent
            html={basics.summary}
            className="mt-2 text-[11px] leading-relaxed text-slate-700"
          />
        </section>
      ) : null}

      {experience.length > 0 ? (
        <section className="mt-4">
          <h2 className="text-[12px] font-bold uppercase tracking-wide text-slate-900">
            Work Experience
          </h2>
          <div className="mt-1 h-px bg-slate-300" />
          <ul className="mt-2.5 space-y-3">
            {experience.map((job) => (
              <li key={job.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[11.5px] font-semibold text-slate-900">
                    {job.role.trim() || "Job Title"}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {formatDates(job.startDate, job.endDate)}
                  </p>
                </div>
                <p className="text-[11px] font-medium text-slate-700">
                  {job.company.trim() || "Company Name"}
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

      {education.length > 0 ? (
        <section className="mt-4">
          <h2 className="text-[12px] font-bold uppercase tracking-wide text-slate-900">
            Education
          </h2>
          <div className="mt-1 h-px bg-slate-300" />
          <ul className="mt-2.5 space-y-2.5">
            {education.map((ed) => (
              <li key={ed.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[11px] font-semibold text-slate-900">
                    {ed.degree.trim() || "Degree"}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {formatDates(ed.startDate, ed.endDate)}
                  </p>
                </div>
                <p className="text-[10.5px] text-slate-700">
                  {ed.institution.trim() || "Institution"}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {skillsList.length > 0 ? (
        <section className="mt-4">
          <h2 className="text-[12px] font-bold uppercase tracking-wide text-slate-900">
            Skills
          </h2>
          <div className="mt-1 h-px bg-slate-300" />
          <p className="mt-2 text-[10.5px] leading-relaxed text-slate-700">
            {skillsList.join(" • ")}
          </p>
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className="mt-4">
          <h2 className="text-[12px] font-bold uppercase tracking-wide text-slate-900">
            Projects
          </h2>
          <div className="mt-1 h-px bg-slate-300" />
          <ul className="mt-2.5 space-y-2.5">
            {projects.map((p) => (
              <li key={p.id}>
                <p className="text-[11px] font-semibold text-slate-900">
                  {p.name.trim() || "Project Name"}
                  {p.stack.trim() && (
                    <span className="ml-2 text-[10px] font-normal text-slate-500">
                      ({p.stack.trim()})
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
    </article>
  );
}
