export function Pill({ 
  children, 
  tone = "ink" 
}: { 
  children: React.ReactNode; 
  tone?: "ink" | "mint" | "coral" | "sky" | "lavender" | "peach" | "teal" 
}) {
  const tones: Record<string, string> = {
    ink: "bg-ink/90 text-paper",
    mint: "bg-mint/40 text-ink",
    coral: "bg-coral/30 text-ink",
    sky: "bg-sky/40 text-ink",
    lavender: "bg-lavender/40 text-ink",
    peach: "bg-peach/40 text-ink",
    teal: "bg-teal/30 text-ink",
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-[3px] text-[10px] font-medium tracking-wide uppercase ${tones[tone]}`}>
      {children}
    </span>
  );
}
