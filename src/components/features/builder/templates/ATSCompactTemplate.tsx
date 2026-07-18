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



export function ATSCompactTemplate({ resume }: { resume: ResumeBuilderData }) {
  const { basics, skills, experience, education, projects, certifications } = resume;
  const skillsList = formatSkillsForTemplate(skills);

  return (
    <article
      className="min-h-[297mm] bg-white px-[8mm] py-[6mm] text-slate-900 shadow-sm ring-1 ring-slate-200/80"
      aria-label="ATS Compact resume template preview"
    >
      <header>
        <h1 className="text-[clamp(1.2rem,2.9cqw,1.5rem)] font-bold tracking-tight text-slate-950">
          {basics.fullName.trim() || "Your Name"}
        </h1>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-slate-600">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>• {basics.phone}</span>}
          {basics.location && <span>• {basics.location}</span>}
          {basics.jobTitle && <span>• {basics.jobTitle}</span>}
        </div>
      </header>

      {basics.summary.trim() ? (
        <section className="mt-3">
          <h2 className="border-b border-slate-300 text-[11px] font-bold uppercase tracking-wide text-slate-900">
            Summary
          </h2>
          <RichTextContent
            html={basics.summary}
            className="mt-1.5 text-[10px] leading-snug text-slate-700"
          />
        </section>
      ) : null}

      {experience.length > 0 ? (
        <section className="mt-3">
          <h2 className="border-b border-slate-300 text-[11px] font-bold uppercase tracking-wide text-slate-900">
            Experience
          </h2>
          <ul className="mt-2 space-y-2.5">
            {experience.map((job) => (
              <li key={job.id}>
                <div className="flex items-baseline justify-between gap-1">
                  <p className="text-[11px] font-semibold text-slate-900">
                    {job.role.trim() || "Role"} — {job.company.trim() || "Company"}
                  </p>
                  <p className="text-[9.5px] text-slate-500">
                    {formatDates(job.startDate, job.endDate)}
                  </p>
                </div>
                {job.description.trim() ? (
                  <RichTextContent
                    html={job.description}
                    className="mt-1 text-[10px] leading-snug text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0 [&_ul]:pl-3"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {education.length > 0 ? (
        <section className="mt-3">
          <h2 className="border-b border-slate-300 text-[11px] font-bold uppercase tracking-wide text-slate-900">
            Education
          </h2>
          <ul className="mt-2 space-y-1.5">
            {education.map((ed) => (
              <li key={ed.id} className="flex items-baseline justify-between gap-2">
                <div>
                  <p className="text-[10.5px] font-semibold text-slate-900">
                    {ed.degree.trim() || "Degree"}
                  </p>
                  <p className="text-[10px] text-slate-700">
                    {ed.institution.trim() || "Institution"}
                  </p>
                </div>
                <p className="text-[9.5px] text-slate-500">
                  {formatDates(ed.startDate, (ed as any).currentlyStudying ? "Present" : ed.endDate)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-3 grid grid-cols-2 gap-x-3">
        {skillsList.length > 0 ? (
          <section>
            <h2 className="border-b border-slate-300 text-[11px] font-bold uppercase tracking-wide text-slate-900">
              Skills
            </h2>
            <p className="mt-1.5 text-[10px] leading-relaxed text-slate-700">
              {skillsList.join(", ")}
            </p>
          </section>
        ) : null}

        {projects.length > 0 ? (
          <section>
            <h2 className="border-b border-slate-300 text-[11px] font-bold uppercase tracking-wide text-slate-900">
              Projects
            </h2>
            <ul className="mt-1.5 space-y-1.5">
              {projects.map((p) => (
                <li key={p.id}>
                  <p className="text-[10px] font-semibold text-slate-900">
                    {p.name.trim() || "Project"}
                    {p.techStack.trim() && <span className="ml-1 text-[9px] font-normal text-slate-500">({p.techStack.trim()})</span>}
                  </p>
                  {p.description.trim() && (
                    <RichTextContent html={p.description} className="mt-0.5 text-[9.5px] leading-snug text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0 [&_ul]:pl-3" />
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      {certifications && certifications.length > 0 ? (
        <section className="mt-3">
          <h2 className="border-b border-slate-300 text-[11px] font-bold uppercase tracking-wide text-slate-900">
            Certifications
          </h2>
          <ul className="mt-1.5 space-y-1 text-[10px] text-slate-700">
            {certifications.map((cert) => (
              <li key={cert.id}>
                <span className="font-semibold text-slate-900">{cert.name.trim() || "Certification"}</span>
                {cert.issuer && <span className="text-slate-600"> — {cert.issuer}</span>}
                {cert.issueDate && <span className="ml-1 text-[9px] text-slate-500">({cert.issueDate})</span>}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
