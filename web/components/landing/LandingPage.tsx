import { CtaSection } from "./CtaSection";
import { FeatureGrid } from "./FeatureGrid";
import { FeatureShowcase } from "./FeatureShowcase";
import { Hero } from "./Hero";
import { LandingFooter } from "./LandingFooter";
import { LandingNav } from "./LandingNav";

export function LandingPage() {
  return (
    <div className="landing-root dark min-h-screen bg-black text-white">
      <LandingNav />
      <main>
        <Hero />
        <FeatureShowcase />
        <FeatureGrid />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
