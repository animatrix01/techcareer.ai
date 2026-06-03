"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const companies = [
  { name: "Google", domain: "google.com" },
  { name: "Microsoft", domain: "microsoft.com" },
  { name: "Amazon", domain: "amazon.com" },
  { name: "Meta", domain: "meta.com" },
  { name: "Netflix", domain: "netflix.com" },
  { name: "Spotify", domain: "spotify.com" },
  { name: "Adobe", domain: "adobe.com" },
  { name: "Airbnb", domain: "airbnb.com" },
  { name: "LinkedIn", domain: "linkedin.com" },
  { name: "Uber", domain: "uber.com" },
  { name: "Stripe", domain: "stripe.com" },
  { name: "Figma", domain: "figma.com" },
  { name: "Notion", domain: "notion.so" },
  { name: "Atlassian", domain: "atlassian.com" },
  { name: "Salesforce", domain: "salesforce.com" },
  { name: "Apple", domain: "apple.com" },
];

const track = [...companies, ...companies, ...companies];

function logoUrl(domain: string) {
  const token = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN ?? "";
  return `https://img.logo.dev/${domain}?token=${token}&size=40&format=png`;
}

export function TrustedBy() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative bg-[#EFE9E1] py-14 sm:py-16"
      aria-label="Companies where our users got hired"
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B5944]"
      >
        Our users got hired at
      </motion.p>

      <div className="relative mt-8 overflow-hidden" aria-hidden="true">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#EFE9E1] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#EFE9E1] to-transparent" />

        {reduceMotion ? (
          <div className="flex flex-wrap items-center justify-center gap-8 px-8">
            {companies.map(({ name, domain }) => (
              <div key={name} className="flex items-center gap-2">
                <Image src={logoUrl(domain)} alt={name} width={28} height={28} className="object-contain" unoptimized />
                <span className="text-sm font-bold text-[#1C1C1C]">{name}</span>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex w-max items-center"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity, repeatType: "loop" }}
          >
            {track.map(({ name, domain }, i) => (
              <div key={`${name}-${i}`} className="group flex items-center gap-2.5 px-8 transition-all duration-300 hover:opacity-70">
                <Image src={logoUrl(domain)} alt={name} width={28} height={28} className="object-contain" unoptimized />
                <span className="whitespace-nowrap text-sm font-bold text-[#1C1C1C]">{name}</span>
                <span className="ml-6 size-1 shrink-0 rounded-full bg-[#D4C5B3]" />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
