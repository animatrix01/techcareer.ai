"use client";

import { RichTextContent } from "@/components/features/builder/rich-text-content";
import type { ResumeBuilderData } from "@/stores/useBuilderStore";

function fmt(start: string, end: string) {
  const s = start.trim();
  const e = end.trim();
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s} – ${e}`;
}

function skills(raw: string) {
  return raw.split(/[,•\n]/g).map((s) => s.trim()).filter(Boolean);
}

export function ExecutiveTemplate({
  resume,
  themeColor = "#1e3a5f",
}: {
  resume: ResumeBuilderData;
  themeColor?: string;
}) {
  const { basics, skills: rawSkills, experience, education, projects } = resume;
  const skillList = skills(rawSkills);

  return (
    <article
      className="h-full min-h-0 bg-white px-[10mm] py-[8mm] text-slate-900"
      aria-label="Executive resume template"
    >
      {/* Header */}
      <header className="pb-3.5" style={{ borderBottom: `2.5px solid ${themeColor}` }}>
        <h1 className="text-[clamp(1.3rem,3.6cqw,1.8rem)] font-bold tracking-tight text-slate-950">
          {basics.fullName.trim() || "Your Name"}
        </h1>
        {basics.jobTitle.trim() && (
          <p className="mt-1 text-[clamp(0.7rem,2cqw,0.95rem)] font-semibold uppercase tracking-[0.12em]" style={{ color: themeColor }}>
            {basics.jobTitle.trim()}
          </p>
        )}
        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-0.5 text-[10px] text-slate-500">
          {basics.email.trim() && <span>{basics.email.trim()}</span>}
          {basics.phone.trim() && <span>{basics.phone.trim()}</span>}
          {basics.location.trim() && <span>{basics.location.trim()}</span>}
        </div>
      </header>

      {/* Summary */}
      {basics.summary.trim() && (
        <section className="mt-4">
          <SectionTitle label="Executive Summary" color={themeColor} />
          <RichTextContent
            html={basics.summary}
            className="mt-1.5 text-[10.5px] leading-relaxed text-slate-700"
          />
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mt-4">
          <SectionTitle label="Professional Experience" color={themeColor} />
          <ul className="mt-2 space-y-3.5">
            {experience.map((job) => (
              <li key={job.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[11.5px] font-bold text-slate-900">
                    {job.role.trim() || "Role"}{job.company.trim() ? `, ${job.company.trim()}` : ""}
                  </p>
                  <p className="shrink-0 text-[9.5px] font-medium text-slate-500">
                    {fmt(job.startDate, job.endDate)}
                  </p>
                </div>
                {job.description.trim() && (
                  <RichTextContent
                    html={job.description}
                    className="mt-1 text-[10px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:pl-3.5 [&_ul]:space-y-0.5"
                  />
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mt-4">
          <SectionTitle label="Key Projects" color={themeColor} />
          <ul className="mt-2 space-y-2.5">
            {projects.map((p) => (
              <li key={p.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[11px] font-bold text-slate-900">{p.name.trim() || "Project"}</p>
                  {p.stack.trim() && (
                    <p className="shrink-0 text-[9px] text-slate-500">{p.stack.trim()}</p>
                  )}
                </div>
                {p.description.trim() && (
                  <p className="mt-1 text-[10px] leading-relaxed text-slate-700">{p.description.trim()}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mt-4">
          <SectionTitle label="Education" color={themeColor} />
          <ul className="mt-2 space-y-2">
            {education.map((ed) => (
              <li key={ed.id} className="flex items-baseline justify-between gap-2">
                <div>
                  <p className="text-[11px] font-bold text-slate-900">{ed.degree.trim() || "Degree"}</p>
                  <p className="text-[10px] text-slate-600">{ed.institution.trim() || "Institution"}</p>
                </div>
                <p className="shrink-0 text-[9.5px] text-slate-500">{fmt(ed.startDate, ed.endDate)}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      {skillList.length > 0 && (
        <section className="mt-4">
          <SectionTitle label="Core Competencies" color={themeColor} />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {skillList.map((s, i) => (
              <span
                key={i}
                className="rounded px-2 py-1 text-[9.5px] font-medium text-white"
                style={{ backgroundColor: themeColor }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function SectionTitle({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <h2
        className="text-[10px] font-bold uppercase tracking-[0.16em]"
        style={{ color }}
      >
        {label}
      </h2>
      <div className="h-px flex-1" style={{ backgroundColor: color, opacity: 0.25 }} />
    </div>
  );
}
