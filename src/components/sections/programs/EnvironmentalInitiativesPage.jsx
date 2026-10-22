import { ProgramDetailPage } from "@/components/sections/programs/ProgramDetailPage";

const care =
  "Serving Society By Improving Lives Through Kindness, Care,";

export function EnvironmentalInitiativesPage() {
  return (
    <ProgramDetailPage
      titleLead="Environmental"
      titleRest="Initiatives"
      subtitle="Protecting the land, water, and air that local communities depend on every day."
      heroImage="/images/programs/environmental-initiatives.png"
      detailLead="Environmental"
      detailRest="Initiatives"
      detailIntro="A healthier environment supports healthier families and stronger livelihoods."
      detailBody="Nalvalam Foundation works with neighborhoods on practical environmental action: planting trees, cleaning shared spaces, and teaching simple ways to save water and reduce waste. These drives are planned with local residents so the work lasts beyond a single event. By caring for soil, shade, and clean surroundings, the program helps children grow up in safer places and gives families a more resilient home."
      detailImage="/images/about/impact-bg.jpg"
      detailAlt="Community outdoors during an environmental activity"
      objectives={[
        { title: "Tree plantation drives", description: care },
        { title: "Clean water awareness", description: care },
        { title: "Community clean-ups", description: care },
        { title: "Sustainable daily habits", description: care },
      ]}
      gallery={[
        { src: "/images/programs/environmental-initiatives.png", alt: "Hands holding soil and seedlings" },
        { src: "/images/about/impact-bg.jpg", alt: "Outdoor community gathering" },
        { src: "/images/vision/hero-image.png", alt: "Children celebrating a community day" },
        { src: "/images/campaign-3.jpg", alt: "Volunteers preparing supplies" },
        { src: "/images/empower-1.jpg", alt: "People coming together for local action" },
        { src: "/images/partner-left.jpg", alt: "Children learning in an open community space" },
      ]}
    />
  );
}
