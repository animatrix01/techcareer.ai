import { SectionHeader } from "../atoms";

const REVIEWS = [
  { n: "Priya R.", r: "Senior PM · Stripe", q: "Three weeks from first draft to signed offer. I deleted 4 other apps the day after onboarding.", c: "from-coral to-peach" },
  { n: "Daniel O.", r: "Staff Engineer · Notion", q: "The ATS view is the thing I wish I'd had in 2019. It just shows you what the parser sees.", c: "from-mint to-teal" },
  { n: "Aisha K.", r: "Product Designer · Linear", q: "It feels less like a job tool and more like a design partner. The bento UI is genuinely beautiful.", c: "from-lavender to-indigo-soft" },
  { n: "Marcus L.", r: "EM · Vercel", q: "Got two offers in one week. The negotiation scripts alone paid for the next decade.", c: "from-sky to-cyan-soft" },
  { n: "Sofia D.", r: "Founder · YC W25", q: "I rebuilt my entire personal narrative in one Sunday afternoon. Calm, clean, unhurried.", c: "from-peach to-coral" },
  { n: "Ken W.", r: "Director · Adobe", q: "The roadmap rewrites itself when I ship. That alone is worth the price.", c: "from-indigo to-indigo-soft" },
];

export function Stories() {
  return (
    <section id="stories" className="relative py-40">
      <div className="mx-auto max-w-[1180px] px-6">
        <SectionHeader
          kicker="Stories"
          title={<>Quietly, <span className="font-serif italic text-indigo">consistently</span>, our users get the offer.</>}
          sub="No incentivized reviews. No screenshots out of context. Just notes from the people who actually shipped."
        />

        <div className="mt-14 columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="mb-5 break-inside-avoid tile p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${r.c}`} />
                <div>
                  <div className="text-sm font-medium text-ink">{r.n}</div>
                  <div className="text-xs text-muted-foreground">{r.r}</div>
                </div>
                <div className="ml-auto text-xs text-coral">★★★★★</div>
              </div>
              <blockquote className="mt-4 font-serif text-lg leading-snug text-ink">&ldquo;{r.q}&rdquo;</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
