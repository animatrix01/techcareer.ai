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
  return `${s} – ${e}`;
}



export function ExecutiveLuxeTemplate({
  resume,
  themeColor,
}: {
  resume: ResumeBuilderData;
  themeColor: string;
}) {
  const { basics, skills, experience, education, projects, certifications } = resume;
  const skillsList = formatSkillsForTemplate(skills);

  return (
    <article
      className="min-h-[297mm] bg-white px-[12mm] py-[10mm] text-slate-900 shadow-sm ring-1 ring-slate-200/80"
      aria-label="Executive Luxe resume template preview"
    >
      <header className="border-b-4 pb-4" style={{ borderColor: themeColor }}>
        <h1 className="font-serif text-[clamp(1.3rem,3.2cqw,1.8rem)] font-bold tracking-tight text-slate-950">
          {basics.fullName.trim() || "Your Name"}
        </h1>
        {basics.jobTitle.trim() && (
          <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-widest text-slate-700">
            {basics.jobTitle}
          </p>
        )}
        <p className="mt-2 text-[10px] text-slate-600">
          {[basics.email, basics.phone, basics.location].filter(Boolean).join(" | ")}
        </p>
      </header>

      {basics.summary.trim() ? (
        <section className="mt-4">
          <h2 className="font-serif text-[12px] font-bold uppercase tracking-widest text-slate-900">
            Executive Summary
          </h2>
          <RichTextContent
            html={basics.summary}
            className="mt-2 text-[10.5px] leading-relaxed text-slate-700"
          />
        </section>
      ) : null}

      {experience.length > 0 ? (
        <section className="mt-4">
          <h2 className="font-serif text-[12px] font-bold uppercase tracking-widest text-slate-900">
            Leadership Experience
          </h2>
          <ul className="mt-3 space-y-4">
            {experience.map((job) => (
              <li key={job.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-bold text-slate-950">
                      {job.role.trim() || "Position"}
                    </p>
                    <p className="mt-0.5 text-[10.5px] font-semibold text-slate-700">
                      {job.company.trim() || "Organization"}
                    </p>
                  </div>
                  <p className="text-[9.5px] text-slate-500">
                    {formatDates(job.startDate, job.endDate)}
                  </p>
                </div>
                {job.description.trim() ? (
                  <RichTextContent
                    html={job.description}
                    className="mt-2 text-[10px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-4"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {education.length > 0 ? (
        <section className="mt-4">
          <h2 className="font-serif text-[12px] font-bold uppercase tracking-widest text-slate-900">
            Education & Credentials
          </h2>
          <ul className="mt-2 space-y-2">
            {education.map((ed) => (
              <li key={ed.id} className="flex items-baseline justify-between gap-2">
                <div>
                  <p className="text-[10.5px] font-semibold text-slate-900">
                    {ed.degree.trim() || "Degree"}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-700">
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

      {skillsList.length > 0 ? (
        <section className="mt-4">
          <h2 className="font-serif text-[12px] font-bold uppercase tracking-widest text-slate-900">
            Core Competencies
          </h2>
          <p className="mt-2 text-[10px] leading-relaxed text-slate-700">
            {skillsList.join(" • ")}
          </p>
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className="mt-4">
          <h2 className="font-serif text-[12px] font-bold uppercase tracking-widest text-slate-900">
            Strategic Initiatives
          </h2>
          <ul className="mt-2 space-y-2">
            {projects.map((p) => (
              <li key={p.id}>
                <p className="text-[10.5px] font-semibold text-slate-900">
                  {p.name.trim() || "Initiative"}
                </p>
                {p.techStack.trim() && <p className="text-[9.5px] text-slate-500">{p.techStack.trim()}</p>}
                {p.description.trim() && (
                  <RichTextContent html={p.description} className="mt-0.5 text-[10px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-4" />
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {certifications && certifications.length > 0 ? (
        <section className="mt-4">
          <h2 className="font-serif text-[12px] font-bold uppercase tracking-widest text-slate-900">
            Certifications & Credentials
          </h2>
          <ul className="mt-2 space-y-1.5">
            {certifications.map((cert) => (
              <li key={cert.id} className="flex items-baseline justify-between gap-2">
                <div>
                  <p className="text-[10.5px] font-semibold text-slate-900">{cert.name.trim() || "Certification"}</p>
                  <p className="mt-0.5 text-[10px] text-slate-700">{cert.issuer}</p>
                </div>
                {cert.issueDate && <p className="shrink-0 text-[9.5px] text-slate-500">{cert.issueDate}</p>}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
