import { ProgramDetailPage } from "@/components/sections/programs/ProgramDetailPage";

const care =
  "Serving Society By Improving Lives Through Kindness, Care,";

export function SupportingFarmersPage() {
  return (
    <ProgramDetailPage
      titleLead="Supporting"
      titleRest="Farmers"
      subtitle="Standing with small farmers through practical guidance, fair access, and steadier livelihoods."
      heroImage="/images/programs/supporting-farmers.png"
      detailLead="Supporting"
      detailRest="Farmers"
      detailIntro="When farmers thrive, families and local food systems grow stronger."
      detailBody="Nalvalam Foundation supports small and marginal farmers with seasonal guidance, access to essential inputs, and connections to fairer local markets. The program also shares simple practices that help fields cope with uncertain weather and protect soil for the next season. By standing beside farming families, we help them keep food on the table, send children to school, and stay rooted in the communities they feed."
      detailImage="/images/blog/card-1.png"
      detailAlt="Harvest and food grown by local farmers"
      objectives={[
        { title: "Seasonal farming guidance", description: care },
        { title: "Seed and tool support", description: care },
        { title: "Local market linkages", description: care },
        { title: "Climate-ready practices", description: care },
      ]}
      gallery={[
        { src: "/images/programs/supporting-farmers.png", alt: "Farmers supported by the program" },
        { src: "/images/blog/card-1.png", alt: "Grain harvested for local families" },
        { src: "/images/food-distribution/circle-1.png", alt: "Fresh food prepared for distribution" },
        { src: "/images/partner-left.jpg", alt: "Community members sharing a meal outdoors" },
        { src: "/images/campaign-1.jpg", alt: "Supplies gathered for farming families" },
        { src: "/images/empower-2.jpg", alt: "Children whose families depend on local farms" },
      ]}
    />
  );
}
