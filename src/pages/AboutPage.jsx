import { AboutStoryHero } from "@/components/sections/about/AboutStoryHero";
import { AboutMissionSection, AboutVisionSection, } from "@/components/sections/about/AboutMissionVision";
import { AboutValuesSection } from "@/components/sections/about/AboutValuesSection";
import { AboutImpactPhilosophy } from "@/components/sections/about/AboutImpactPhilosophy";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
export const pageMeta = {
    title: "About Us | Nalvalam Foundation",
    description: "Learn about Nalvalam Foundation's mission, vision, values, and impact philosophy in uplifting communities through compassion and action.",
};
export default function AboutPage() {
    return (<main className="overflow-x-hidden bg-white">
      <div className="bg-[#fafafa]">
        <AboutStoryHero />
      </div>
      <AboutMissionSection />
      <AboutVisionSection />
      <AboutValuesSection />
      <AboutImpactPhilosophy />
      <NewsletterSection />
    </main>);
}
