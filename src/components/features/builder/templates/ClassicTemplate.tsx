"use client";

import type { ResumeBuilderData } from "@/stores/useBuilderStore";
import { RichTextContent } from "@/components/features/builder/rich-text-content";
import { formatSkillsForTemplate } from "@/lib/utils/skills-formatter";

function formatDates(start: string, end: string) {
  const s = start.trim();
  const e = end.trim();
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s} - ${e}`;
}

export function ClassicTemplate({ resume }: { resume: ResumeBuilderData }) {
  const { basics, skills, experience, education, projects, certifications } = resume;
  const skillsList = formatSkillsForTemplate(skills);

  return (
    <article
      className="min-h-[297mm] bg-white px-[8mm] py-[7mm] text-zinc-900 shadow-sm ring-1 ring-zinc-200/80"
      aria-label="Classic resume template preview"
    >
      <header className="text-center">
        <h1 className="font-serif text-[clamp(1rem,2.6cqw,1.35rem)] font-semibold uppercase tracking-[0.08em] text-zinc-950">
          {basics.fullName.trim() || "Your name"}
        </h1>
        <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-zinc-600">
          {[basics.email, basics.phone, basics.location].filter(Boolean).length
            ? [basics.email, basics.phone, basics.location].filter(Boolean).join(" \u2022 ")
            : "email \u2022 phone \u2022 city"}
        </p>
      </header>

      {basics.summary.trim() ? (
        <section className="mt-3">
          <h2 className="border-b border-slate-300 pb-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-700">
            Summary
          </h2>
          <RichTextContent
            html={basics.summary}
            className="mt-1.5 text-[10px] font-normal leading-relaxed text-slate-700"
          />
        </section>
      ) : null}

      {experience.length > 0 ? (
        <section className="mt-2.5">
          <h2 className="border-b border-slate-300 pb-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-700">
            Experience
          </h2>
          <ul className="mt-1.5 space-y-2">
            {experience.map((job) => (
              <li key={job.id}>
                <div className="flex items-baseline justify-between gap-1.5">
                  <p className="text-[10.5px] font-semibold text-zinc-900">
                    {job.role.trim() || "Role"}
                  </p>
                  <p className="text-[8.5px] font-normal text-slate-500">
                    {formatDates(job.startDate, job.endDate)}
                  </p>
                </div>
                <p className="text-[9.5px] font-normal text-slate-600">
                  {job.company.trim() || "Company"}
                </p>
                {job.description.trim() ? (
                  <RichTextContent
                    html={job.description}
                    className="mt-0.5 text-[9px] font-normal text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-3"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {education.length > 0 ? (
        <section className="mt-2.5">
          <h2 className="border-b border-slate-300 pb-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-700">
            Education
          </h2>
          <ul className="mt-1.5 space-y-1.5">
            {education.map((ed) => (
              <li key={ed.id} className="text-center">
                <p className="text-[10px] font-semibold text-zinc-900">
                  {ed.institution.trim() || "School"}
                </p>
                <p className="text-[9px] font-normal text-slate-700">{ed.degree}</p>
                <p className="text-[8.5px] font-normal text-slate-500">
                  {formatDates(ed.startDate, (ed as any).currentlyStudying ? "Present" : ed.endDate)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {skillsList.length > 0 ? (
        <section className="mt-2.5">
          <h2 className="border-b border-slate-300 pb-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-700">
            Skills
          </h2>
          <p className="mt-1.5 text-center text-[9px] font-normal leading-relaxed text-slate-700">
            {skillsList.join(" \u2022 ")}
          </p>
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className="mt-2.5">
          <h2 className="border-b border-slate-300 pb-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-700">
            Projects
          </h2>
          <ul className="mt-1.5 space-y-2">
            {projects.map((p) => (
              <li key={p.id}>
                <div className="flex items-baseline justify-between gap-1.5">
                  <p className="text-[10px] font-semibold text-zinc-900">
                    {p.name.trim() || "Project"}
                    {p.techStack.trim() && (
                      <span className="ml-1.5 text-[8.5px] font-normal text-slate-500">({p.techStack.trim()})</span>
                    )}
                  </p>
                  {(p.startDate || p.endDate) && (
                    <p className="text-[8.5px] text-slate-500">{formatDates(p.startDate, p.endDate)}</p>
                  )}
                </div>
                {p.role && <p className="text-[9px] text-slate-600">{p.role}</p>}
                {p.description.trim() ? (
                  <RichTextContent
                    html={p.description}
                    className="mt-0.5 text-[9px] font-normal text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-3"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {certifications && certifications.length > 0 ? (
        <section className="mt-2.5">
          <h2 className="border-b border-slate-300 pb-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-700">
            Certifications
          </h2>
          <ul className="mt-1.5 space-y-1.5">
            {certifications.map((cert) => (
              <li key={cert.id} className="text-center">
                <p className="text-[10px] font-semibold text-zinc-900">{cert.name.trim() || "Certification"}</p>
                <p className="text-[9px] text-slate-600">{cert.issuer}</p>
                {cert.issueDate && <p className="text-[8.5px] text-slate-500">{cert.issueDate}</p>}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
