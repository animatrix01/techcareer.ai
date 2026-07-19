export const BUILDER_STEPS = [
  "contact",
  "summary",
  "experience",
  "education",
  "skills",
  "certifications",
  "projects",
] as const;

export type BuilderStep = (typeof BUILDER_STEPS)[number];

export const BUILDER_STEP_LABELS: Record<BuilderStep, string> = {
  contact: "Contact",
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  certifications: "Certifications",
  projects: "Projects",
};

export function isBuilderStep(value: string): value is BuilderStep {
  return BUILDER_STEPS.includes(value as BuilderStep);
}

export function getStepIndex(step: BuilderStep) {
  return BUILDER_STEPS.indexOf(step);
}

export function getPrevStep(step: BuilderStep) {
  const index = getStepIndex(step);
  return index > 0 ? BUILDER_STEPS[index - 1] : null;
}

export function getNextStep(step: BuilderStep) {
  const index = getStepIndex(step);
  return index < BUILDER_STEPS.length - 1 ? BUILDER_STEPS[index + 1] : null;
}
