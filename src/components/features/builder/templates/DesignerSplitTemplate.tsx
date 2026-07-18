"use client";

import type { ResumeBuilderData } from "@/stores/useBuilderStore";
import { RichTextContent } from "@/components/features/builder/rich-text-content";
import { formatSkillsForTemplate } from "@/lib/utils/skills-formatter";
import { cn } from "@/lib/utils";

function formatDates(start: string, end: string) {
  const s = start.trim();
  const e = end.trim();
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s} - ${e}`;
}



export function DesignerSplitTemplate({
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
      className="grid min-h-[297mm] grid-cols-2 gap-x-4 bg-white px-[9mm] py-[8mm] text-slate-900 shadow-sm ring-1 ring-slate-200/80"
      aria-label="Designer Split resume template preview"
    >
      {/* Left column */}
      <div>
        <header>
          <h1
            className="text-[clamp(1.1rem,2.8cqw,1.5rem)] font-bold leading-tight tracking-tight"
            style={{ color: themeColor }}
          >
            {basics.fullName.trim() || "Your Name"}
          </h1>
          {basics.jobTitle.trim() && (
            <p className="mt-1 text-[10.5px] font-semibold text-slate-700">
              {basics.jobTitle}
            </p>
          )}
          <div className="mt-2 space-y-0.5 text-[9px] text-slate-600">
            {basics.email && <p>{basics.email}</p>}
            {basics.phone && <p>{basics.phone}</p>}
            {basics.location && <p>{basics.location}</p>}
          </div>
        </header>

        {basics.summary.trim() ? (
          <section className="mt-4">
            <h2
              className="text-[10.5px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              About
            </h2>
            <div className="mt-0.5 h-0.5 w-8" style={{ backgroundColor: themeColor }} />
            <RichTextContent
              html={basics.summary}
              className="mt-1.5 text-[9.5px] leading-relaxed text-slate-700"
            />
          </section>
        ) : null}

        {skillsList.length > 0 ? (
          <section className="mt-4">
            <h2
              className="text-[10.5px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              Skills
            </h2>
            <div className="mt-0.5 h-0.5 w-8" style={{ backgroundColor: themeColor }} />
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {skillsList.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-md bg-slate-100 px-2 py-0.5 text-[8.5px] font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {education.length > 0 ? (
          <section className="mt-4">
            <h2
              className="text-[10.5px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              Education
            </h2>
            <div className="mt-0.5 h-0.5 w-8" style={{ backgroundColor: themeColor }} />
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

        {certifications && certifications.length > 0 ? (
          <section className="mt-4">
            <h2
              className="text-[10.5px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              Certifications
            </h2>
            <div className="mt-0.5 h-0.5 w-8" style={{ backgroundColor: themeColor }} />
            <ul className="mt-2 space-y-1.5">
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <p className="text-[9.5px] font-semibold text-slate-900">{cert.name.trim() || "Certification"}</p>
                  <p className="mt-0.5 text-[9px] text-slate-600">{cert.issuer}</p>
                  {cert.issueDate && <p className="text-[8.5px] text-slate-500">{cert.issueDate}</p>}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      {/* Right column */}
      <div>
        {experience.length > 0 ? (
          <section>
            <h2
              className="text-[10.5px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              Experience
            </h2>
            <div className="mt-0.5 h-0.5 w-8" style={{ backgroundColor: themeColor }} />
            <ul className="mt-2 space-y-3">
              {experience.map((job) => (
                <li key={job.id}>
                  <div className="flex items-baseline justify-between gap-1">
                    <p className="text-[10px] font-bold text-slate-900">
                      {job.role.trim() || "Role"}
                    </p>
                    <p className="text-[8.5px] text-slate-500">
                      {formatDates(job.startDate, job.endDate)}
                    </p>
                  </div>
                  <p className="mt-0.5 text-[9.5px] font-semibold text-slate-700">
                    {job.company.trim() || "Company"}
                  </p>
                  {job.description.trim() ? (
                    <RichTextContent
                      html={job.description}
                      className="mt-1 text-[9px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-3"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {projects.length > 0 ? (
          <section className={cn(experience.length > 0 && "mt-4")}>
            <h2
              className="text-[10.5px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              Projects
            </h2>
            <div className="mt-0.5 h-0.5 w-8" style={{ backgroundColor: themeColor }} />
            <ul className="mt-2 space-y-2.5">
              {projects.map((p) => (
                <li key={p.id}>
                  <p className="text-[9.5px] font-bold text-slate-900">
                    {p.name.trim() || "Project"}
                  </p>
                  {p.techStack.trim() && (
                    <p className="mt-0.5 text-[8.5px] font-medium text-slate-600">
                      {p.techStack.trim()}
                    </p>
                  )}
                  {p.description.trim() && (
                    <p className="mt-1 text-[9px] leading-relaxed text-slate-700">
                      {p.description.trim()}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
