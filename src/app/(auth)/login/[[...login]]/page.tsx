"use client";

import { SignIn } from "@clerk/nextjs";
import { EcosystemDiagram } from "@/components/landing/visualizations";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ── Static Hero Background ── */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 pointer-events-none opacity-70">
          <section className="relative pt-36 pb-32">
            <div className="mx-auto max-w-[1180px] px-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-paper/70 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-md shadow-soft">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint" />
                Series A · Now opening invites for the v2 release
              </div>

              <h1 className="mx-auto mt-6 max-w-[1020px] text-[clamp(2.8rem,6.8vw,5.8rem)] font-medium leading-[1.08] tracking-[-0.035em] text-ink">
                Build better{" "}
                <span className="text-indigo font-mono font-bold">careers</span>
                <br />
                with AI-powered precision
              </h1>

              <p className="mx-auto mt-7 max-w-[680px] text-[1.1rem] leading-relaxed text-muted-foreground">
                ATS-ready templates, instant scoring, and personalized career paths — all in one platform built for modern job seekers.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href="#cta" className="btn-primary">
                  Start free · 2 min setup
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7"/>
                  </svg>
                </a>
                <a href="#workflow" className="btn-ghost">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  Watch 90s tour
                </a>
              </div>

              <EcosystemDiagram />
            </div>
          </section>
        </div>
      </div>

      {/* ── Glassmorphism overlay ── */}
      <div className="fixed inset-0 z-10 backdrop-blur-[20px] bg-white/30" />

      {/* ── Sign-in card ── */}
      <main className="relative z-20 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-[460px]">
          <div className="rounded-2xl border border-white/90 bg-white/98 shadow-2xl backdrop-blur-xl p-8">
            <SignIn
              fallbackRedirectUrl="/dashboard"
              appearance={{
                // Yahan se 'layout' wala block hata diya gaya hai taaki TypeScript error na de
                elements: {
                  rootBox: "w-full",
                  cardBox: "w-full shadow-none",
                  card: "bg-transparent shadow-none px-0 py-0 border-0 w-full",
                  
                  headerTitle: "text-slate-900 text-2xl font-bold text-center tracking-tight",
                  headerSubtitle: "text-slate-600 text-center mt-2 text-sm font-medium",
                  
                  socialButtonsBlockButton:
                    "w-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold py-3 rounded-xl transition-all shadow-sm flex justify-center items-center gap-3 text-sm",
                  
                  dividerRow: "my-6",
                  dividerLine: "bg-slate-300",
                  dividerText: "text-slate-500 font-medium px-4 text-xs uppercase",
                  
                  formFieldLabel: "text-slate-800 font-semibold mb-2 block text-sm",
                  formFieldInput:
                    "w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-sm",
                  
                  formButtonPrimary:
                    "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all mt-6 shadow-lg flex justify-center items-center text-sm",
                  
                  footerActionText: "text-slate-600 font-medium text-sm",
                  footerActionLink: "text-indigo-600 hover:text-indigo-700 font-bold",
                  footer: "!border-0 !shadow-none bg-transparent mt-6 text-center",
                  footerAction: "!border-0 !shadow-none justify-center",
                  
                  internal: "!border-0 !shadow-none",
                },
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
