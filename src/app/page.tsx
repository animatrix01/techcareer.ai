import { CtaSection } from "@/components/landing/cta-section";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { HeroSection } from "@/components/landing/hero-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureGrid />
      <CtaSection />
    </>
  );
}
