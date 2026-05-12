import { UserButton } from "@clerk/nextjs";

import { CreateResumeButton } from "./components/CreateResumeButton";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="text-lg font-semibold tracking-tight text-slate-900">
            TechCareer OS
          </p>
          <UserButton />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <section>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            My Resumes
          </h1>
          <p className="mt-2 text-base text-slate-600 sm:text-lg">
            Create, manage, and download your AI-powered resumes
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <CreateResumeButton />
        </section>
      </main>
    </div>
  );
}
