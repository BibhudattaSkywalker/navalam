import { ProgramDetailPage } from "@/components/sections/programs/ProgramDetailPage";

const care =
  "Serving Society By Improving Lives Through Kindness, Care,";

export function CommunityDevelopmentPage() {
  return (
    <ProgramDetailPage
      titleLead="Community"
      titleRest="Development"
      subtitle="Strengthening neighborhoods through shared skills, local leadership, and practical support."
      heroImage="/images/programs/community-development.png"
      detailLead="Community"
      detailRest="Development"
      detailIntro="Communities flourish when people have the tools to shape their own future."
      detailBody="Nalvalam Foundation partners with neighborhoods to build everyday capacity: skill sessions, youth activities, and support for the shared spaces people rely on. Residents help decide what comes first, so the work reflects local needs rather than a one-time visit. Over time, these efforts give families more ways to participate, look after one another, and keep progress going after a project ends."
      detailImage="/images/about/story-main.jpg"
      detailAlt="Community members learning together"
      objectives={[
        { title: "Local skill building", description: care },
        { title: "Youth engagement", description: care },
        { title: "Shared community spaces", description: care },
        { title: "Collective local action", description: care },
      ]}
      gallery={[
        { src: "/images/programs/community-development.png", alt: "Community development activity" },
        { src: "/images/about/story-main.jpg", alt: "Neighbors gathered for a learning session" },
        { src: "/images/about/story-overlay.jpg", alt: "Children taking part in a community program" },
        { src: "/images/empower-3.jpg", alt: "Young people raising their hands together" },
        { src: "/images/blog/card-3.png", alt: "A local support program in progress" },
        { src: "/images/get-involved/grid-3.png", alt: "Volunteers working alongside the community" },
      ]}
    />
  );
}
