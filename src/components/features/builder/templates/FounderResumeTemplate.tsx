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



export function FounderResumeTemplate({
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
      aria-label="Founder Resume template preview"
    >
      <header className="relative overflow-hidden rounded-2xl p-4" style={{ backgroundColor: `${themeColor}10` }}>
        <div
          className="absolute right-0 top-0 size-32 rounded-full opacity-20"
          style={{ backgroundColor: themeColor, transform: "translate(30%, -30%)" }}
        />
        <h1 className="relative text-[clamp(1.15rem,2.9cqw,1.6rem)] font-bold tracking-tight text-slate-950">
          {basics.fullName.trim() || "Your Name"}
        </h1>
        {basics.jobTitle.trim() && (
          <p className="relative mt-1 text-[11px] font-bold uppercase tracking-wider" style={{ color: themeColor }}>
            {basics.jobTitle}
          </p>
        )}
        <p className="relative mt-2 text-[9.5px] text-slate-600">
          {[basics.email, basics.phone, basics.location].filter(Boolean).join(" | ")}
        </p>
      </header>

      {basics.summary.trim() ? (
        <section className="mt-3.5">
          <h2
            className="text-[11px] font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Vision & Mission
          </h2>
          <RichTextContent
            html={basics.summary}
            className="mt-1.5 text-[10px] leading-relaxed text-slate-700"
          />
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className="mt-3.5">
          <h2
            className="text-[11px] font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Ventures & Products
          </h2>
          <ul className="mt-2 space-y-2.5">
            {projects.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border-2 p-3"
                style={{ borderColor: `${themeColor}40` }}
              >
                <p className="text-[10.5px] font-bold text-slate-900">
                  {p.name.trim() || "Venture"}
                </p>
                {p.techStack.trim() && (
                  <p className="mt-0.5 text-[9px] font-semibold" style={{ color: themeColor }}>
                    {p.techStack.trim()}
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
            className="text-[11px] font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Leadership Experience
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

      <div className="mt-3.5 grid grid-cols-2 gap-4">
        {education.length > 0 ? (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: themeColor }}>
              Education
            </h2>
            <ul className="mt-2 space-y-2">
              {education.map((ed) => (
                <li key={ed.id}>
                  <p className="text-[9.5px] font-semibold text-slate-900">{ed.degree.trim() || "Degree"}</p>
                  <p className="mt-0.5 text-[9px] text-slate-700">{ed.institution.trim() || "Institution"}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {skillsList.length > 0 ? (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: themeColor }}>
              Core Skills
            </h2>
            <div className="mt-2 flex flex-wrap gap-1">
              {skillsList.slice(0, 8).map((skill, i) => (
                <span key={i} className="rounded-md px-2 py-0.5 text-[8.5px] font-medium text-white" style={{ backgroundColor: themeColor }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {certifications && certifications.length > 0 ? (
        <section className="mt-3.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: themeColor }}>
            Certifications
          </h2>
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
