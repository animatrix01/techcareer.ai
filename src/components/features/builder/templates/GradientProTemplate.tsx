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



export function GradientProTemplate({
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
      className="min-h-[297mm] bg-white px-[9mm] py-[8mm] text-slate-900 shadow-sm ring-1 ring-slate-200/80"
      aria-label="Gradient Pro resume template preview"
    >
      <header
        className="rounded-2xl p-4 text-white"
        style={{
          background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)`,
        }}
      >
        <h1 className="text-[clamp(1.15rem,2.9cqw,1.55rem)] font-bold tracking-tight">
          {basics.fullName.trim() || "Your Name"}
        </h1>
        {basics.jobTitle.trim() && (
          <p className="mt-1 text-[11px] font-medium opacity-95">
            {basics.jobTitle}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[9px] opacity-90">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>{basics.location}</span>}
        </div>
      </header>

      {basics.summary.trim() ? (
        <section className="mt-4">
          <div
            className="inline-block rounded-lg px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: themeColor }}
          >
            About
          </div>
          <RichTextContent
            html={basics.summary}
            className="mt-2 text-[10px] leading-relaxed text-slate-700"
          />
        </section>
      ) : null}

      {experience.length > 0 ? (
        <section className="mt-4">
          <div
            className="inline-block rounded-lg px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: themeColor }}
          >
            Experience
          </div>
          <ul className="mt-2.5 space-y-3">
            {experience.map((job) => (
              <li key={job.id} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[10.5px] font-bold text-slate-900">
                    {job.role.trim() || "Role"}
                  </p>
                  <p className="text-[9px] text-slate-500">
                    {formatDates(job.startDate, job.endDate)}
                  </p>
                </div>
                <p className="mt-0.5 text-[10px] font-semibold" style={{ color: themeColor }}>
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

      <div className="mt-4 grid grid-cols-2 gap-4">
        {education.length > 0 ? (
          <section>
            <div
              className="inline-block rounded-lg px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: themeColor }}
            >
              Education
            </div>
            <ul className="mt-2 space-y-2">
              {education.map((ed) => (
                <li key={ed.id}>
                  <p className="text-[9.5px] font-semibold text-slate-900">
                    {ed.degree.trim() || "Degree"}
                  </p>
                  <p className="mt-0.5 text-[9px] text-slate-700">
                    {ed.institution.trim() || "Institution"}
                  </p>
                  <p className="mt-0.5 text-[8.5px] text-slate-500">
                    {formatDates(ed.startDate, (ed as any).currentlyStudying ? "Present" : ed.endDate)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {skillsList.length > 0 ? (
          <section>
            <div
              className="inline-block rounded-lg px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: themeColor }}
            >
              Skills
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {skillsList.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-md border px-2 py-0.5 text-[8.5px] font-medium"
                  style={{ borderColor: themeColor, color: themeColor }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {projects.length > 0 ? (
        <section className="mt-4">
          <div className="inline-block rounded-lg px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white" style={{ backgroundColor: themeColor }}>
            Projects
          </div>
          <ul className="mt-2 space-y-2">
            {projects.map((p) => (
              <li key={p.id}>
                <p className="text-[10px] font-bold text-slate-900">{p.name.trim() || "Project"}</p>
                {p.techStack.trim() && <p className="text-[9px] font-medium" style={{ color: themeColor }}>{p.techStack.trim()}</p>}
                {p.role && <p className="text-[9px] text-slate-600">{p.role}</p>}
                {p.description.trim() && (
                  <RichTextContent html={p.description} className="mt-0.5 text-[9.5px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-4" />
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {certifications && certifications.length > 0 ? (
        <section className="mt-4">
          <div className="inline-block rounded-lg px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white" style={{ backgroundColor: themeColor }}>
            Certifications
          </div>
          <ul className="mt-2 space-y-1.5">
            {certifications.map((cert) => (
              <li key={cert.id} className="flex items-baseline justify-between gap-2">
                <div>
                  <p className="text-[10px] font-semibold text-slate-900">{cert.name.trim() || "Certification"}</p>
                  <p className="text-[9.5px] text-slate-700">{cert.issuer}</p>
                </div>
                {cert.issueDate && <p className="shrink-0 text-[9px] text-slate-500">{cert.issueDate}</p>}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
