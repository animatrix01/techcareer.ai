"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useRoadmapStore } from "@/stores/useRoadmapStore";

const mockRoadmapPhases = [
  {
    id: 1,
    title: "Fundamentals",
    duration: "6-8 Weeks",
    description:
      "Build a rock-solid programming base with data structures, clean coding habits, and day-to-day engineering workflows used in modern product teams.",
    skills: [
      "Problem solving with arrays, strings, hash maps, and recursion",
      "Version control workflows with Git, pull requests, and code reviews",
      "Core JavaScript or Python syntax fluency and debugging techniques",
      "HTTP fundamentals, REST APIs, and client-server communication",
      "Writing maintainable code with naming, modularity, and refactoring",
    ],
    actionItems: [
      "Complete 35 algorithm practice problems focused on core patterns and track solutions in a personal knowledge log",
      "Build two mini-projects: a task manager API and a responsive dashboard UI, then document architecture decisions",
      "Set up linting, formatting, and pre-commit hooks in both projects to adopt production engineering standards early",
      "Pair with a peer weekly to simulate pull-request reviews and improve communication around technical trade-offs",
    ],
  },
  {
    id: 2,
    title: "Core Engineering",
    duration: "8-10 Weeks",
    description:
      "Develop full-stack execution skills by shipping features end-to-end, improving performance, and adding reliability through testing and observability.",
    skills: [
      "Designing relational schemas, indexes, and efficient queries",
      "Authentication and authorization patterns for web applications",
      "State management and component architecture in a frontend framework",
      "Unit, integration, and API testing with clear coverage goals",
      "Monitoring latency, errors, and throughput with actionable metrics",
    ],
    actionItems: [
      "Ship a feature-complete product module with login, profile management, and role-based permissions",
      "Add test suites that reach at least 70% meaningful coverage across domain logic and critical API paths",
      "Run a performance pass using browser and server profiling tools to cut a slow request by 30% or more",
      "Instrument logs and metrics dashboards, then define alert thresholds for key backend endpoints",
    ],
  },
  {
    id: 3,
    title: "Advanced Delivery",
    duration: "10-12 Weeks",
    description:
      "Operate like a mid-level software engineer by designing scalable systems, collaborating cross-functionally, and delivering production-ready solutions.",
    skills: [
      "System design for scalability, caching, and horizontal growth",
      "Asynchronous processing with queues, workers, and retry strategies",
      "CI/CD pipelines, deployment safety checks, and rollback planning",
      "Security best practices including secret management and threat modeling",
      "Technical storytelling through architecture docs and stakeholder demos",
    ],
    actionItems: [
      "Design and implement one capstone architecture that handles 10x traffic growth assumptions with a clear bottleneck analysis",
      "Set up a CI/CD pipeline with automated tests, staged deployments, and post-deploy health verification steps",
      "Write an engineering design document that explains trade-offs, alternatives rejected, and operational risks",
      "Deliver a project demo to peers or mentors focused on impact metrics, technical depth, and future iterations",
    ],
  },
];

export default function RoadmapBuildingPage() {
  const router = useRouter();
  const setRoadmapData = useRoadmapStore((state) => state.setRoadmapData);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setRoadmapData(mockRoadmapPhases);
      router.push("/tools/roadmap/path");
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-900">
      <section className="flex w-full max-w-2xl flex-col items-center rounded-3xl border border-indigo-100/70 bg-white/75 px-8 py-14 text-center shadow-xl shadow-indigo-200/40 backdrop-blur-sm">
        <div className="relative mb-7 flex size-28 items-center justify-center">
          <span className="absolute inline-flex size-28 animate-ping rounded-full bg-indigo-300/50" />
          <span className="absolute inline-flex size-20 animate-pulse rounded-full bg-purple-300/50" />
          <span className="relative inline-flex size-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent shadow-lg shadow-indigo-300/60" />
        </div>

        <p className="max-w-xl text-lg font-medium text-slate-700 sm:text-xl">
          Analyzing market demands and structuring your path...
        </p>
      </section>
    </main>
  );
}
