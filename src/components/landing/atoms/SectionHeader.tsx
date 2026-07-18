export function SectionHeader({ 
  kicker, 
  title, 
  sub 
}: { 
  kicker: string; 
  title: React.ReactNode; 
  sub: string 
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{kicker}</div>
      <h2 className="mt-3 font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.04] tracking-[-0.02em] text-ink">
        {title}
      </h2>
      <p className="mt-4 text-muted-foreground">{sub}</p>
    </div>
  );
}
