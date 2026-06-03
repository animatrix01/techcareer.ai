import { AuthorityQuote } from "@/components/landing/authority-quote";
import { CtaSection } from "@/components/landing/cta-section";
import { FaqSection } from "@/components/landing/faq-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ProductDemo } from "@/components/landing/product-demo";
import { StatsSection } from "@/components/landing/stats-section";
import { TemplateShowcase } from "@/components/landing/template-showcase";
import { Testimonials } from "@/components/landing/testimonials";
import { TrustedBy } from "@/components/landing/trusted-by";
import { WhyTechCareer } from "@/components/landing/why-techcareer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBy />
      <HowItWorks />
      <ProductDemo />
      <TemplateShowcase />
      <StatsSection />
      <WhyTechCareer />
      <Testimonials />
      <AuthorityQuote />
      <FaqSection />
      <CtaSection />
    </>
  );
}
