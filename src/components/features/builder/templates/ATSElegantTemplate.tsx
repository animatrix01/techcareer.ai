"use client";

import type { ResumeBuilderData } from "@/stores/useBuilderStore";
import { RichTextContent } from "@/components/features/builder/rich-text-content";

function formatDates(start: string, end: string) {
  const s = start.trim();
  const e = end.trim();
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s} – ${e}`;
}

function skillTokens(skills: string) {
  return skills
    .split(/[,•\n]/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ATSElegantTemplate({
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
      className="h-full min-h-0 bg-white px-[11mm] py-[9mm] text-slate-900 shadow-sm ring-1 ring-slate-200/80"
      aria-label="ATS Elegant resume template preview"
    >
      <header className="border-b pb-3" style={{ borderColor: themeColor }}>
        <h1 className="text-[clamp(1.2rem,3cqw,1.65rem)] font-light tracking-wide text-slate-950">
          {basics.fullName.trim() || "Your Name"}
        </h1>
        {basics.jobTitle.trim() && (
          <p className="mt-1 text-[11px] font-medium tracking-wide" style={{ color: themeColor }}>
            {basics.jobTitle}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[9.5px] text-slate-600">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>{basics.location}</span>}
        </div>
      </header>

      {basics.summary.trim() ? (
        <section className="mt-3.5">
          <h2 className="text-[10.5px] font-semibold uppercase tracking-widest" style={{ color: themeColor }}>
            Professional Profile
          </h2>
          <RichTextContent
            html={basics.summary}
            className="mt-1.5 text-[10px] leading-relaxed text-slate-700"
          />
        </section>
      ) : null}

      {experience.length > 0 ? (
        <section className="mt-3.5">
          <h2 className="text-[10.5px] font-semibold uppercase tracking-widest" style={{ color: themeColor }}>
            Professional Experience
          </h2>
          <ul className="mt-2 space-y-3">
            {experience.map((job) => (
              <li key={job.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[10.5px] font-semibold text-slate-900">
                    {job.role.trim() || "Position"}
                  </p>
                  <p className="text-[9px] italic text-slate-500">
                    {formatDates(job.startDate, job.endDate)}
                  </p>
                </div>
                <p className="mt-0.5 text-[10px] text-slate-700">
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
        <section className="mt-3.5">
          <h2 className="text-[10.5px] font-semibold uppercase tracking-widest" style={{ color: themeColor }}>
            Education
          </h2>
          <ul className="mt-2 space-y-2">
            {education.map((ed) => (
              <li key={ed.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[10px] font-semibold text-slate-900">
                    {ed.degree.trim() || "Degree"}
                  </p>
                  <p className="text-[9px] italic text-slate-500">
                    {formatDates(ed.startDate, ed.endDate)}
                  </p>
                </div>
                <p className="mt-0.5 text-[9.5px] text-slate-700">
                  {ed.institution.trim() || "Institution"}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {skillsList.length > 0 ? (
        <section className="mt-3.5">
          <h2 className="text-[10.5px] font-semibold uppercase tracking-widest" style={{ color: themeColor }}>
            Core Competencies
          </h2>
          <p className="mt-1.5 text-[9.5px] leading-relaxed text-slate-700">
            {skillsList.join(" • ")}
          </p>
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className="mt-3.5">
          <h2 className="text-[10.5px] font-semibold uppercase tracking-widest" style={{ color: themeColor }}>
            Notable Projects
          </h2>
          <ul className="mt-2 space-y-2">
            {projects.map((p) => (
              <li key={p.id}>
                <p className="text-[10px] font-semibold text-slate-900">
                  {p.name.trim() || "Project"}
                </p>
                {p.description.trim() && (
                  <p className="mt-0.5 text-[9.5px] leading-relaxed text-slate-700">
                    {p.description.trim()}
                  </p>
                )}
                {p.stack.trim() && (
                  <p className="mt-0.5 text-[9px] italic text-slate-500">
                    {p.stack.trim()}
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
