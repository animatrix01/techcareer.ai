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



export function TechFocusedTemplate({
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
      className="min-h-[297mm] bg-white px-[9mm] py-[7mm] text-slate-900 shadow-sm ring-1 ring-slate-200/80"
      aria-label="Tech Focused resume template preview"
    >
      <header className="border-b-2 pb-2" style={{ borderColor: themeColor }}>
        <h1 className="text-[clamp(1.1rem,2.8cqw,1.5rem)] font-bold tracking-tight text-slate-950">
          {basics.fullName.trim() || "Your Name"}
        </h1>
        {basics.jobTitle.trim() && (
          <p className="mt-0.5 text-[11px] font-semibold" style={{ color: themeColor }}>
            {basics.jobTitle}
          </p>
        )}
        <p className="mt-1 text-[9.5px] text-slate-600">
          {[basics.email, basics.phone, basics.location].filter(Boolean).join(" • ")}
        </p>
      </header>

      {basics.summary.trim() ? (
        <section className="mt-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Summary
          </h2>
          <RichTextContent
            html={basics.summary}
            className="mt-1 text-[10px] leading-relaxed text-slate-700"
          />
        </section>
      ) : null}

      {skillsList.length > 0 ? (
        <section className="mt-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Technical Skills
          </h2>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {skillsList.map((skill, i) => (
              <span
                key={i}
                className="rounded border px-2 py-0.5 text-[9px] font-medium"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className="mt-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Projects
          </h2>
          <ul className="mt-2 space-y-2.5">
            {projects.map((p) => (
              <li key={p.id} className="border-l-2 pl-2" style={{ borderColor: themeColor }}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[10.5px] font-bold text-slate-900">
                    {p.name.trim() || "Project Name"}
                  </p>
                  {(p.startDate || p.endDate) && (
                    <p className="text-[8.5px] text-slate-500">
                      {formatDates(p.startDate, p.endDate)}
                    </p>
                  )}
                </div>
                {p.role && (
                  <p className="text-[9px] font-medium text-slate-600">{p.role}</p>
                )}
                {p.techStack.trim() && (
                  <p className="mt-0.5 text-[9px] font-medium text-slate-600">
                    Tech Stack: {p.techStack.trim()}
                  </p>
                )}
                {(p.githubUrl || p.liveUrl) && (
                  <p className="text-[8.5px] text-slate-500">
                    {[
                      p.githubUrl ? "🔗 GitHub" : null,
                      p.liveUrl ? "🌐 Live Demo" : null
                    ].filter(Boolean).join(" • ")}
                  </p>
                )}
                {p.description.trim() && (
                  <RichTextContent
                    html={p.description}
                    className="mt-1 text-[9.5px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-3"
                  />
                )}
                {p.achievements.trim() && (
                  <RichTextContent
                    html={p.achievements}
                    className="mt-1 text-[9px] leading-relaxed text-slate-600 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-3"
                  />
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {experience.length > 0 ? (
        <section className="mt-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Experience
          </h2>
          <ul className="mt-2 space-y-2.5">
            {experience.map((job) => (
              <li key={job.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[10.5px] font-bold text-slate-900">
                    {job.role.trim() || "Role"}
                  </p>
                  <p className="text-[9px] text-slate-500">
                    {formatDates(job.startDate, job.currentlyWorking ? "Present" : job.endDate)}
                  </p>
                </div>
                <p className="mt-0.5 text-[10px] font-semibold text-slate-700">
                  {job.company.trim() || "Company"}
                </p>
                {(job.location || job.employmentType || job.workMode) && (
                  <p className="text-[8.5px] text-slate-500">
                    {[
                      job.location,
                      job.employmentType,
                      job.workMode
                    ].filter(Boolean).join(" • ")}
                  </p>
                )}
                {job.technologies.length > 0 && (
                  <p className="mt-0.5 text-[9px] text-slate-600">
                    <span className="font-semibold">Technologies:</span> {job.technologies.join(", ")}
                  </p>
                )}
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
                  <p className="text-[10px] font-semibold text-slate-900">
                    {ed.degree.trim() || "Degree"}{ed.fieldOfStudy ? ` in ${ed.fieldOfStudy}` : ""}
                  </p>
                  <p className="text-[9px] text-slate-500">
                    {formatDates(ed.startDate, ed.currentlyStudying ? "Present" : ed.endDate)}
                  </p>
                </div>
                <p className="text-[9.5px] text-slate-700">
                  {ed.institution.trim() || "Institution"}
                </p>
                {(ed.city || ed.gpa) && (
                  <p className="text-[8.5px] text-slate-500">
                    {[ed.city, ed.gpa ? `GPA: ${ed.gpa}` : ""].filter(Boolean).join(" • ")}
                  </p>
                )}
                {ed.description.trim() && (
                  <RichTextContent
                    html={ed.description}
                    className="mt-0.5 text-[8.5px] text-slate-600 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-3"
                  />
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {certifications && certifications.length > 0 ? (
        <section className="mt-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Certifications
          </h2>
          <ul className="mt-2 space-y-2">
            {certifications.map((cert) => (
              <li key={cert.id}>
                <p className="text-[10px] font-semibold text-slate-900">
                  {cert.name.trim() || "Certification"}
                </p>
                <p className="text-[9px] text-slate-700">{cert.issuer}</p>
                {(cert.issueDate || cert.credentialId) && (
                  <p className="text-[8.5px] text-slate-500">
                    {[
                      cert.issueDate,
                      cert.credentialId ? `ID: ${cert.credentialId}` : ""
                    ].filter(Boolean).join(" • ")}
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
