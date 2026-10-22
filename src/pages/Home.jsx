import { Hero } from "@/components/sections/Hero";
import { EmpowerSection } from "@/components/sections/EmpowerSection";
import { ImprovementSection } from "@/components/sections/ImprovementSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { CampaignsSection } from "@/components/sections/CampaignsSection";
import { EmpoweringLivesSection } from "@/components/sections/EmpoweringLivesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { PartnerSection } from "@/components/sections/PartnerSection";
import { BlogsSection } from "@/components/sections/BlogsSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export const pageMeta = {
  title: "Nalvalam Foundation | Support Humanity, Spread Kindness",
  description:
    "Nalvalam Foundation is a trusted non-profit organization committed to empowering lives through ethical, transparent, community-driven programs.",
};

export default function Home() {
    return (<main className="overflow-x-hidden bg-white">
      <Hero />
      <EmpowerSection />
      <ImprovementSection />
      <ImpactSection />
      <CampaignsSection />
      <EmpoweringLivesSection />
      <TestimonialsSection />
      <TrustSection />
      <PartnerSection />
      <BlogsSection />
      <NewsletterSection />
    </main>);
}
