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



export function ProfessionalCleanTemplate({
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
      className="min-h-[297mm] bg-white px-[10mm] py-[8mm] text-slate-900 shadow-sm ring-1 ring-slate-200/80"
      aria-label="Professional Clean resume template preview"
    >
      <header className="border-b-2 pb-3" style={{ borderColor: themeColor }}>
        <h1
          className="text-[clamp(1.15rem,2.9cqw,1.6rem)] font-bold tracking-tight"
          style={{ color: themeColor }}
        >
          {basics.fullName.trim() || "Your Name"}
        </h1>
        {basics.jobTitle.trim() && (
          <p className="mt-1 text-[11px] font-semibold text-slate-700">
            {basics.jobTitle}
          </p>
        )}
        <p className="mt-1.5 text-[9.5px] text-slate-600">
          {[basics.email, basics.phone, basics.location].filter(Boolean).join(" | ")}
        </p>
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
            Professional Experience
          </h2>
          <ul className="mt-2 space-y-3">
            {experience.map((job) => (
              <li key={job.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <p className="text-[10.5px] font-bold text-slate-900">
                      {job.role.trim() || "Position Title"}
                    </p>
                    <p className="mt-0.5 text-[10px] font-semibold text-slate-700">
                      {job.company.trim() || "Company Name"}
                    </p>
                  </div>
                  <p className="text-[9px] text-slate-500">
                    {formatDates(job.startDate, job.endDate)}
                  </p>
                </div>
                {job.description.trim() ? (
                  <RichTextContent
                    html={job.description}
                    className="mt-1.5 text-[9.5px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-4"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {education.length > 0 ? (
        <section className="mt-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Education
          </h2>
          <ul className="mt-2 space-y-2">
            {education.map((ed) => (
              <li key={ed.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-900">
                      {ed.degree.trim() || "Degree"}
                    </p>
                    <p className="mt-0.5 text-[9.5px] text-slate-700">
                      {ed.institution.trim() || "Institution"}
                    </p>
                  </div>
                  <p className="text-[9px] text-slate-500">
                    {formatDates(ed.startDate, (ed as any).currentlyStudying ? "Present" : ed.endDate)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {skillsList.length > 0 ? (
        <section className="mt-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Core Competencies
          </h2>
          <p className="mt-1.5 text-[9.5px] leading-relaxed text-slate-700">
            {skillsList.join(" • ")}
          </p>
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className="mt-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wide" style={{ color: themeColor }}>
            Key Projects
          </h2>
          <ul className="mt-2 space-y-2">
            {projects.map((p) => (
              <li key={p.id}>
                <p className="text-[10px] font-semibold text-slate-900">
                  {p.name.trim() || "Project Name"}
                  {p.techStack.trim() && (
                    <span className="ml-2 text-[9px] font-normal text-slate-500">({p.techStack.trim()})</span>
                  )}
                </p>
                {p.role && <p className="text-[9px] text-slate-600">{p.role}</p>}
                {(p.githubUrl || p.liveUrl) && (
                  <p className="text-[9px] text-slate-500">{[p.githubUrl ? "GitHub" : null, p.liveUrl ? "Live Demo" : null].filter(Boolean).join(" • ")}</p>
                )}
                {p.description.trim() && (
                  <RichTextContent html={p.description} className="mt-0.5 text-[9.5px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-4" />
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {certifications && certifications.length > 0 ? (
        <section className="mt-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wide" style={{ color: themeColor }}>
            Certifications
          </h2>
          <ul className="mt-2 space-y-1.5">
            {certifications.map((cert) => (
              <li key={cert.id} className="flex items-baseline justify-between gap-2">
                <div>
                  <p className="text-[10px] font-semibold text-slate-900">{cert.name.trim() || "Certification"}</p>
                  <p className="text-[9.5px] text-slate-700">{cert.issuer}{cert.credentialId ? ` · ID: ${cert.credentialId}` : ""}</p>
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
