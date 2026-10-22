import { ProgramDetailPage } from "@/components/sections/programs/ProgramDetailPage";

const care =
  "Serving Society By Improving Lives Through Kindness, Care,";

export function HealthWellnessPage() {
  return (
    <ProgramDetailPage
      titleLead="Health"
      titleRest="& Wellness"
      subtitle="Caring for families through accessible health camps, guidance, and everyday wellness support."
      heroImage="/images/programs/health-wellness.png"
      detailLead="Health"
      detailRest="& Wellness"
      detailIntro="Good health gives every family the strength to learn, work, and thrive."
      detailBody="Nalvalam Foundation organizes community health camps that offer basic check-ups, health education, and referrals for families who cannot easily reach a clinic. Working with medical partners and trained volunteers, we help people recognize common illnesses, understand hygiene, and care for mothers and children. The program treats prevention as seriously as treatment, so communities can stay well and continue school, work, and daily life with dignity."
      detailImage="/images/blog/card-4.png"
      detailAlt="Community members receiving health support"
      objectives={[
        { title: "Community health camps", description: care },
        { title: "Preventive care guidance", description: care },
        { title: "Maternal and child health", description: care },
        { title: "Wellness awareness", description: care },
      ]}
      gallery={[
        { src: "/images/programs/health-wellness.png", alt: "Health and wellness outreach" },
        { src: "/images/blog/card-4.png", alt: "Healthcare assistance in the community" },
        { src: "/images/volunteer/hero.png", alt: "Volunteers supporting a health drive" },
        { src: "/images/get-involved/grid-1.png", alt: "Community members gathered for care" },
        { src: "/images/mission/impact-photo.png", alt: "Families reached through the program" },
        { src: "/images/about/mission-main.jpg", alt: "Volunteers helping during a community visit" },
      ]}
    />
  );
}
