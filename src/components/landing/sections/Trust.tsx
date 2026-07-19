import { BRAND_LOGOS } from "./brand-logos";

const COMPANIES = ["Google", "Microsoft", "Amazon", "Stripe", "Meta", "Adobe", "Notion", "Spotify", "GitHub", "Airbnb", "Figma", "Linear"];

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-serif text-2xl text-ink">{n}</div>
      <div className="text-xs text-muted-foreground">{l}</div>
    </div>
  );
}

export function Trust() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Trusted by candidates at</div>
            <div className="mt-2 font-serif text-2xl text-ink">50,000+ engineers, designers and PMs</div>
          </div>
          <div className="flex gap-8 text-sm">
            <Stat n="95%" l="ATS pass rate" />
            <Stat n="4.9★" l="App store" />
            <Stat n="2.1M" l="Resumes analyzed" />
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper/60 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper/60 to-transparent z-10" />
          <div className="marquee-track flex w-max gap-14 items-center">
            {[...COMPANIES, ...COMPANIES].map((c, i) => {
              const LogoComponent = BRAND_LOGOS[c as keyof typeof BRAND_LOGOS];
              return LogoComponent ? <LogoComponent key={i} /> : null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
