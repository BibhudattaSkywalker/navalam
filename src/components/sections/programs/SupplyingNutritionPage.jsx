import { ProgramDetailPage } from "@/components/sections/programs/ProgramDetailPage";

const care =
  "Serving Society By Improving Lives Through Kindness, Care,";

export function SupplyingNutritionPage() {
  return (
    <ProgramDetailPage
      titleLead="Supplying"
      titleRest="Nutrition"
      subtitle="Providing nourishing meals and food support so children can grow, learn, and stay well."
      heroImage="/images/programs/nutritional-food.png"
      detailLead="Supplying"
      detailRest="Nutrition"
      detailIntro="Reliable nutrition helps children stay healthy, attend school, and learn with energy."
      detailBody="Nalvalam Foundation supplies nutritious meals and essential food support to children and families who would otherwise miss regular meals. Distributions are organized with local partners so food reaches people with dignity and consistency, not only in a crisis. Alongside the meals, families receive simple guidance on balanced diets, helping children grow well and stay present in the classroom."
      detailImage="/images/food-distribution/hero.png"
      detailAlt="Nutritious food being prepared for families"
      objectives={[
        { title: "Nutritious daily meals", description: care },
        { title: "Family food support", description: care },
        { title: "Growth monitoring", description: care },
        { title: "Nutrition awareness", description: care },
      ]}
      gallery={[
        { src: "/images/programs/nutritional-food.png", alt: "Nutritious food prepared for children" },
        { src: "/images/food-distribution/hero.png", alt: "A community food distribution" },
        { src: "/images/food-distribution/circle-2.png", alt: "Children receiving a meal" },
        { src: "/images/food-distribution/circle-4.png", alt: "Families sharing food together" },
        { src: "/images/news-announcements/food-distribution.png", alt: "Food supplies ready for distribution" },
        { src: "/images/blog/card-1.png", alt: "Grain and staples for family meals" },
      ]}
    />
  );
}
