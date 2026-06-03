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

export function ConsultantProTemplate({
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
      className="h-full min-h-0 bg-white px-[10mm] py-[8mm] text-slate-900 shadow-sm ring-1 ring-slate-200/80"
      aria-label="Consultant Pro resume template preview"
    >
      <header>
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-[clamp(1.15rem,2.9cqw,1.6rem)] font-bold tracking-tight text-slate-950">
              {basics.fullName.trim() || "Your Name"}
            </h1>
            {basics.jobTitle.trim() && (
              <p className="mt-0.5 text-[11px] font-semibold" style={{ color: themeColor }}>
                {basics.jobTitle}
              </p>
            )}
          </div>
          <div className="text-right text-[9px] text-slate-600">
            {basics.email && <p>{basics.email}</p>}
            {basics.phone && <p>{basics.phone}</p>}
            {basics.location && <p>{basics.location}</p>}
          </div>
        </div>
        <div className="mt-2 h-1" style={{ backgroundColor: themeColor }} />
      </header>

      {basics.summary.trim() ? (
        <section className="mt-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Professional Summary
          </h2>
          <RichTextContent
            html={basics.summary}
            className="mt-1.5 text-[10px] leading-relaxed text-slate-700"
          />
        </section>
      ) : null}

      {experience.length > 0 ? (
        <section className="mt-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Consulting Experience
          </h2>
          <ul className="mt-2 space-y-3">
            {experience.map((job) => (
              <li key={job.id} className="border-l-2 pl-3" style={{ borderColor: themeColor }}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[10.5px] font-bold text-slate-900">
                    {job.role.trim() || "Role"}
                  </p>
                  <p className="text-[9px] text-slate-500">
                    {formatDates(job.startDate, job.endDate)}
                  </p>
                </div>
                <p className="mt-0.5 text-[10px] font-semibold text-slate-700">
                  {job.company.trim() || "Firm"}
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

      <div className="mt-3 grid grid-cols-2 gap-4">
        {education.length > 0 ? (
          <section>
            <h2
              className="text-[11px] font-bold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              Education
            </h2>
            <ul className="mt-2 space-y-2">
              {education.map((ed) => (
                <li key={ed.id}>
                  <p className="text-[10px] font-semibold text-slate-900">
                    {ed.degree.trim() || "Degree"}
                  </p>
                  <p className="mt-0.5 text-[9.5px] text-slate-700">
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
          <section>
            <h2
              className="text-[11px] font-bold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              Expertise
            </h2>
            <p className="mt-2 text-[9.5px] leading-relaxed text-slate-700">
              {skillsList.join(" • ")}
            </p>
          </section>
        ) : null}
      </div>

      {projects.length > 0 ? (
        <section className="mt-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Key Engagements
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
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
