"use client";

import { useState } from "react";
import { saveResumeData } from "@/actions/resume";
import { useResumeStore } from "@/store/useResumeStore";

type ResumeBuilderWorkspacePageProps = {
  params: {
    resumeId: string;
  };
};

export default function ResumeBuilderWorkspacePage({
  params,
}: ResumeBuilderWorkspacePageProps) {
  const { resumeId } = params;
  const {
    title,
    personalInfo,
    experience,
    education,
    skills,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
  } = useResumeStore((state) => state);
  const [skillInput, setSkillInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleAddSkill = () => {
    const normalizedSkill = skillInput.trim();
    if (!normalizedSkill) return;
    addSkill(normalizedSkill);
    setSkillInput("");
  };

  const handleSaveResume = async () => {
    try {
      setIsSaving(true);
      setSaveMessage("");
      await saveResumeData(resumeId, {
        title,
        personalInfo,
        experience,
        education,
        skills,
      });
      setSaveMessage("Resume saved successfully.");
    } catch (error) {
      console.error("Failed to save resume:", error);
      setSaveMessage("Failed to save resume. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Resume Builder Workspace
          </h1>
          <p className="text-sm text-slate-500">Resume ID: {resumeId}</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="space-y-4 rounded-xl border border-slate-200 bg-slate-100 p-5 shadow-sm sm:p-6">
            <section>
              <button
                type="button"
                onClick={handleSaveResume}
                disabled={isSaving}
                className="mb-4 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
              >
                {isSaving ? "Saving..." : "Save Resume"}
              </button>
              {saveMessage ? (
                <p className="mb-3 text-center text-xs font-medium text-slate-600">{saveMessage}</p>
              ) : null}
              <h2 className="text-base font-semibold text-slate-800">Personal Information</h2>
              <div className="mt-4 space-y-4 rounded-lg border border-slate-200 bg-white p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <label className="space-y-1">
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      First Name
                    </span>
                    <input
                      type="text"
                      value={personalInfo.firstName}
                      onChange={(event) =>
                        updatePersonalInfo({ firstName: event.target.value })
                      }
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-500 focus:shadow-sm"
                      placeholder="John"
                    />
                  </label>

                  <label className="space-y-1">
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Last Name
                    </span>
                    <input
                      type="text"
                      value={personalInfo.lastName}
                      onChange={(event) =>
                        updatePersonalInfo({ lastName: event.target.value })
                      }
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-500 focus:shadow-sm"
                      placeholder="Doe"
                    />
                  </label>
                </div>

                <label className="space-y-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Job Title
                  </span>
                  <input
                    type="text"
                    value={personalInfo.jobTitle}
                    onChange={(event) =>
                      updatePersonalInfo({ jobTitle: event.target.value })
                    }
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-500 focus:shadow-sm"
                    placeholder="Senior Product Designer"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Email
                  </span>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(event) => updatePersonalInfo({ email: event.target.value })}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-500 focus:shadow-sm"
                    placeholder="john.doe@example.com"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Phone
                  </span>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(event) => updatePersonalInfo({ phone: event.target.value })}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-500 focus:shadow-sm"
                    placeholder="+1 (555) 123-4567"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-800">Experience</h2>
                <button
                  type="button"
                  onClick={() =>
                    addExperience({
                      company: "",
                      role: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    })
                  }
                  className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
                >
                  Add Experience
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {experience.length === 0 ? (
                  <p className="rounded-md border border-dashed border-slate-300 px-3 py-4 text-center text-xs text-slate-500">
                    Add your first experience entry.
                  </p>
                ) : null}
                {experience.map((item, index) => (
                  <div
                    key={`${item.company}-${item.role}-${index}`}
                    className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Experience {index + 1}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="text-xs font-medium text-rose-600 hover:text-rose-700"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        value={item.company}
                        onChange={(event) =>
                          updateExperience(index, { company: event.target.value })
                        }
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                        placeholder="Company"
                      />
                      <input
                        type="text"
                        value={item.role}
                        onChange={(event) =>
                          updateExperience(index, { role: event.target.value })
                        }
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                        placeholder="Role"
                      />
                      <input
                        type="text"
                        value={item.startDate}
                        onChange={(event) =>
                          updateExperience(index, { startDate: event.target.value })
                        }
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                        placeholder="Start Date"
                      />
                      <input
                        type="text"
                        value={item.endDate}
                        onChange={(event) =>
                          updateExperience(index, { endDate: event.target.value })
                        }
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                        placeholder="End Date"
                      />
                    </div>
                    <textarea
                      value={item.description}
                      onChange={(event) =>
                        updateExperience(index, { description: event.target.value })
                      }
                      rows={4}
                      className="w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                      placeholder="Describe your impact, achievements, and responsibilities."
                    />
                    <button
                      type="button"
                      onClick={() =>
                        console.log("AI Enhance Triggered for:", item.description)
                      }
                      className="inline-flex items-center rounded-md border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 transition hover:border-violet-300 hover:bg-violet-100"
                    >
                      ✨ Enhance with AI
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-800">Education</h2>
                <button
                  type="button"
                  onClick={() =>
                    addEducation({
                      institution: "",
                      degree: "",
                      fieldOfStudy: "",
                      startDate: "",
                      endDate: "",
                    })
                  }
                  className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
                >
                  Add Education
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {education.length === 0 ? (
                  <p className="rounded-md border border-dashed border-slate-300 px-3 py-4 text-center text-xs text-slate-500">
                    Add your education details.
                  </p>
                ) : null}
                {education.map((item, index) => (
                  <div
                    key={`${item.institution}-${item.degree}-${index}`}
                    className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Education {index + 1}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="text-xs font-medium text-rose-600 hover:text-rose-700"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        value={item.degree}
                        onChange={(event) =>
                          updateEducation(index, { degree: event.target.value })
                        }
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                        placeholder="Degree"
                      />
                      <input
                        type="text"
                        value={item.institution}
                        onChange={(event) =>
                          updateEducation(index, { institution: event.target.value })
                        }
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                        placeholder="School"
                      />
                      <input
                        type="text"
                        value={item.startDate}
                        onChange={(event) =>
                          updateEducation(index, { startDate: event.target.value })
                        }
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                        placeholder="Start Date"
                      />
                      <input
                        type="text"
                        value={item.endDate}
                        onChange={(event) =>
                          updateEducation(index, { endDate: event.target.value })
                        }
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                        placeholder="End Date"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-base font-semibold text-slate-800">Skills</h2>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(event) => setSkillInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                  placeholder="Type a skill"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
                >
                  Add
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.length === 0 ? (
                  <p className="text-xs text-slate-500">No skills added yet.</p>
                ) : null}
                {skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-slate-500 hover:text-rose-600"
                      aria-label={`Remove ${skill}`}
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            </section>
          </aside>

          <div className="rounded-xl border border-slate-200 bg-slate-100 p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-base font-semibold text-slate-800">
              Live Resume Preview
            </h2>
            <div className="mx-auto w-full max-w-[794px] rounded-md bg-white shadow-xl ring-1 ring-slate-200">
              <div className="min-h-[1120px] p-8">
                <header className="border-b border-slate-200 pb-6">
                  <h3 className="text-4xl font-semibold tracking-tight text-slate-900">
                    {[personalInfo.firstName, personalInfo.lastName]
                      .filter(Boolean)
                      .join(" ") || "Your Name"}
                  </h3>
                  <p className="mt-2 text-lg font-medium text-slate-600">
                    {personalInfo.jobTitle || "Professional Title"}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                    <span>{personalInfo.email || "your.email@example.com"}</span>
                    <span aria-hidden="true" className="text-slate-300">
                      |
                    </span>
                    <span>{personalInfo.phone || "+1 (000) 000-0000"}</span>
                  </div>
                </header>

                <section className="mt-8">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Experience
                  </h4>
                  <div className="mt-3 space-y-5">
                    {experience.length === 0 ? (
                      <p className="text-sm text-slate-400">
                        Add your professional experience to see it here.
                      </p>
                    ) : null}
                    {experience.map((item, index) => (
                      <article key={`${item.company}-${item.role}-${index}`} className="space-y-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h5 className="text-base font-semibold text-slate-900">
                            {item.role || "Role Title"}
                          </h5>
                          <p className="text-sm text-slate-500">
                            {item.startDate || "Start"} - {item.endDate || "End"}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-slate-700">
                          {item.company || "Company Name"}
                        </p>
                        {item.description ? (
                          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                            {item.description}
                          </p>
                        ) : (
                          <p className="text-sm italic text-slate-400">
                            Describe key achievements and impact.
                          </p>
                        )}
                      </article>
                    ))}
                  </div>
                </section>

                <section className="mt-8">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Education
                  </h4>
                  <div className="mt-3 space-y-4">
                    {education.length === 0 ? (
                      <p className="text-sm text-slate-400">Add your education details.</p>
                    ) : null}
                    {education.map((item, index) => (
                      <article
                        key={`${item.institution}-${item.degree}-${index}`}
                        className="space-y-1"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h5 className="text-base font-semibold text-slate-900">
                            {item.degree || "Degree"}
                          </h5>
                          <p className="text-sm text-slate-500">
                            {item.startDate || "Start"} - {item.endDate || "End"}
                          </p>
                        </div>
                        <p className="text-sm text-slate-700">
                          {[item.institution, item.fieldOfStudy].filter(Boolean).join(" - ") ||
                            "Institution"}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="mt-8">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Skills
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.length === 0 ? (
                      <p className="text-sm text-slate-400">Add skills to highlight strengths.</p>
                    ) : (
                      skills.map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {skill}
                        </span>
                      ))
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
