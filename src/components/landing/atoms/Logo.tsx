import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/nextcareerlogo.png"
        alt="NextCareer logo"
        width={56}
        height={56}
        className="h-14 w-14 object-contain"
        priority
      />
      <span className="font-serif text-[1.35rem] leading-none tracking-tight text-ink">
        NextCareer<span className="text-indigo">·</span>AI
      </span>
    </div>
  );
}
