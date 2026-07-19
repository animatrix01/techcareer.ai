"use client";

export function CTA() {
  return (
    <section id="cta" className="relative px-6 py-40">
      <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[2rem] border border-ink/20 mesh-dark px-8 py-24 text-center text-paper">
        {/* Grain on the dark CTA block only */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`
          }}
          aria-hidden
        />
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/60">Your career, on the OS</div>
        <h2 className="mx-auto mt-5 max-w-3xl font-serif text-[clamp(2.6rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em]">
          Build. Optimize. <span className="italic text-mint">Get hired.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-paper/60">
          Two minutes to set up. Free for as long as you&apos;d like. Upgrade only when the offers start landing.
        </p>
        <form className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border border-paper/15 bg-paper/5 p-1.5 backdrop-blur-lg" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="you@work.com"
            className="flex-1 bg-transparent px-3 py-2 text-sm text-paper placeholder:text-paper/40 outline-none"
          />
          <button type="submit" className="rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink hover:bg-cream transition-colors">
            Get my OS →
          </button>
        </form>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-paper/50">
          <span>No credit card</span><span>·</span>
          <span>SOC 2 Type II</span><span>·</span>
          <span>Your data, your export, anytime</span>
        </div>
      </div>
    </section>
  );
}
