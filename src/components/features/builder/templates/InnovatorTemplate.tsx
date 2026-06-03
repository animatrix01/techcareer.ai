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

export function InnovatorTemplate({
  resume,
  themeColor = "#6366f1",
}: {
  resume: ResumeBuilderData;
  themeColor?: string;
}) {
  const { basics, skills: rawSkills, experience, education, projects } = resume;
  const skillList = skills(rawSkills);

  return (
    <article
      className="grid h-full min-h-0 grid-cols-[minmax(0,38%)_1fr] bg-white text-slate-900"
      aria-label="Innovator resume template"
    >
      {/* Left sidebar */}
      <aside className="flex flex-col gap-4 px-[5mm] py-[7mm]" style={{ backgroundColor: `${themeColor}12` }}>
        {/* Name block */}
        <div>
          <div className="mb-3 h-1 w-8 rounded-full" style={{ backgroundColor: themeColor }} />
          <h1 className="text-[clamp(1.1rem,3.4cqw,1.5rem)] font-extrabold leading-tight tracking-tight text-slate-950">
            {basics.fullName.trim() || "Your Name"}
          </h1>
          {basics.jobTitle.trim() && (
            <p className="mt-1.5 text-[clamp(0.65rem,1.8cqw,0.85rem)] font-semibold" style={{ color: themeColor }}>
              {basics.jobTitle.trim()}
            </p>
          )}
        </div>

        {/* Contact */}
        <div className="space-y-1">
          <SideLabel label="Contact" color={themeColor} />
          <div className="space-y-0.5 text-[9.5px] text-slate-600">
            {basics.email.trim() && <p className="break-all">{basics.email.trim()}</p>}
            {basics.phone.trim() && <p>{basics.phone.trim()}</p>}
            {basics.location.trim() && <p>{basics.location.trim()}</p>}
          </div>
        </div>

        {/* Skills */}
        {skillList.length > 0 && (
          <div className="space-y-1.5">
            <SideLabel label="Skills" color={themeColor} />
            <div className="flex flex-wrap gap-1.5">
              {skillList.map((s, i) => (
                <span
                  key={i}
                  className="rounded-full px-2 py-1 text-[8.5px] font-semibold text-white"
                  style={{ backgroundColor: themeColor }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="space-y-1.5">
            <SideLabel label="Education" color={themeColor} />
            <ul className="space-y-2.5">
              {education.map((ed) => (
                <li key={ed.id}>
                  <p className="text-[10px] font-bold text-slate-900">{ed.degree.trim() || "Degree"}</p>
                  <p className="text-[9px] text-slate-600">{ed.institution.trim() || "Institution"}</p>
                  <p className="text-[8.5px] text-slate-400">{fmt(ed.startDate, ed.endDate)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Right main */}
      <main className="space-y-4 px-[5mm] py-[7mm]">
        {/* Summary */}
        {basics.summary.trim() && (
          <section>
            <MainLabel label="About" color={themeColor} />
            <RichTextContent
              html={basics.summary}
              className="mt-1.5 text-[10.5px] leading-relaxed text-slate-700"
            />
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <MainLabel label="Experience" color={themeColor} />
            <ul className="mt-2 space-y-3.5">
              {experience.map((job) => (
                <li key={job.id}>
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <p className="text-[11px] font-bold text-slate-900">{job.role.trim() || "Role"}</p>
                      <p className="text-[9.5px] font-semibold" style={{ color: themeColor }}>
                        {job.company.trim() || "Company"}
                      </p>
                    </div>
                    <p className="shrink-0 rounded-full px-2 py-1 text-[8.5px] font-medium text-white" style={{ backgroundColor: themeColor }}>
                      {fmt(job.startDate, job.endDate)}
                    </p>
                  </div>
                  {job.description.trim() && (
                    <RichTextContent
                      html={job.description}
                      className="mt-1.5 text-[10px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:pl-3 [&_ul]:space-y-0.5"
                    />
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <MainLabel label="Projects" color={themeColor} />
            <ul className="mt-2 space-y-2.5">
              {projects.map((p) => (
                <li key={p.id}>
                  <div className="flex items-baseline justify-between gap-1">
                    <p className="text-[11px] font-bold text-slate-900">{p.name.trim() || "Project"}</p>
                    {p.stack.trim() && (
                      <p className="shrink-0 text-[8.5px] font-medium" style={{ color: themeColor }}>{p.stack.trim()}</p>
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
      </main>
    </article>
  );
}

function SideLabel({ label, color }: { label: string; color: string }) {
  return (
    <p className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color }}>
      {label}
    </p>
  );
}

function MainLabel({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 pb-1" style={{ borderBottom: `1.5px solid ${color}30` }}>
      <h2 className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color }}>
        {label}
      </h2>
    </div>
  );
}
