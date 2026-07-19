import { EcosystemDiagram } from "../visualizations";
import RotatingText from "@/components/ui/RotatingText";

export function Hero() {
  return (
    <section className="relative pt-36 pb-32">
      <div className="mx-auto max-w-[1180px] px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-paper/70 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-md shadow-soft">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint" />
          Series A · Now opening invites for the v2 release
        </div>

        <h1 className="mx-auto mt-6 max-w-[1020px] text-[clamp(2.8rem,6.8vw,5.8rem)] font-medium leading-[1.08] tracking-[-0.035em] text-ink">
          <span className="whitespace-nowrap">
            Build better{" "}
            <RotatingText
              texts={["resumes", "roadmaps", "ATS scores", "portfolios", "interviews", "careers", "offers"]}
              mainClassName="inline-flex text-indigo font-mono font-bold"
              staggerFrom="first"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.03}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              rotationInterval={2400}
              splitBy="characters"
              autoloop
            />
          </span>
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
  );
}
