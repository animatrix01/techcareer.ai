import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/nextcareerlogo.png"
        alt="NextCareer logo"
        width={44}
        height={44}
        className="h-11 w-11 object-contain"
        priority
      />
      <span className="font-sans font-semibold text-[1.1rem] leading-none tracking-tight text-ink">
        NextCareer AI
      </span>
    </div>
  );
}
