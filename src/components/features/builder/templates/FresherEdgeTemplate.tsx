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

export function FresherEdgeTemplate({
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
      className="h-full min-h-0 bg-white px-[9mm] py-[8mm] text-slate-900 shadow-sm ring-1 ring-slate-200/80"
      aria-label="Fresher Edge resume template preview"
    >
      <header className="text-center">
        <div
          className="mx-auto inline-block rounded-full px-4 py-2 text-white"
          style={{ backgroundColor: themeColor }}
        >
          <h1 className="text-[clamp(1.05rem,2.6cqw,1.4rem)] font-bold tracking-tight">
            {basics.fullName.trim() || "Your Name"}
          </h1>
        </div>
        {basics.jobTitle.trim() && (
          <p className="mt-2 text-[11px] font-semibold" style={{ color: themeColor }}>
            {basics.jobTitle}
          </p>
        )}
        <p className="mt-1.5 text-[9.5px] text-slate-600">
          {[basics.email, basics.phone, basics.location].filter(Boolean).join(" • ")}
        </p>
      </header>

      {basics.summary.trim() ? (
        <section className="mt-3.5">
          <h2
            className="text-center text-[10.5px] font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Objective
          </h2>
          <RichTextContent
            html={basics.summary}
            className="mt-1.5 text-center text-[10px] leading-relaxed text-slate-700"
          />
        </section>
      ) : null}

      {education.length > 0 ? (
        <section className="mt-3.5">
          <h2
            className="text-center text-[10.5px] font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Education
          </h2>
          <ul className="mt-2 space-y-2">
            {education.map((ed) => (
              <li key={ed.id} className="text-center">
                <p className="text-[10.5px] font-semibold text-slate-900">
                  {ed.degree.trim() || "Degree"}
                </p>
                <p className="mt-0.5 text-[10px] text-slate-700">
                  {ed.institution.trim() || "Institution"}
                </p>
                <p className="mt-0.5 text-[9px] text-slate-500">
                  {formatDates(ed.startDate, ed.endDate)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {skillsList.length > 0 ? (
        <section className="mt-3.5">
          <h2
            className="text-center text-[10.5px] font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Skills
          </h2>
          <div className="mt-2 flex flex-wrap justify-center gap-1.5">
            {skillsList.map((skill, i) => (
              <span
                key={i}
                className="rounded-full px-2.5 py-1 text-[9px] font-medium text-white"
                style={{ backgroundColor: themeColor }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className="mt-3.5">
          <h2
            className="text-center text-[10.5px] font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Projects
          </h2>
          <ul className="mt-2 space-y-2.5">
            {projects.map((p) => (
              <li key={p.id} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-center">
                <p className="text-[10.5px] font-bold text-slate-900">
                  {p.name.trim() || "Project"}
                </p>
                {p.stack.trim() && (
                  <p className="mt-0.5 text-[9px] font-medium" style={{ color: themeColor }}>
                    {p.stack.trim()}
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
        <section className="mt-3.5">
          <h2
            className="text-center text-[10.5px] font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Experience
          </h2>
          <ul className="mt-2 space-y-2.5">
            {experience.map((job) => (
              <li key={job.id} className="text-center">
                <p className="text-[10.5px] font-bold text-slate-900">
                  {job.role.trim() || "Role"}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold text-slate-700">
                  {job.company.trim() || "Company"}
                </p>
                <p className="mt-0.5 text-[9px] text-slate-500">
                  {formatDates(job.startDate, job.endDate)}
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
    </article>
  );
}
