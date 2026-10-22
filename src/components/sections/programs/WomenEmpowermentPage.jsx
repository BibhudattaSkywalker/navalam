import { InitiativeDetailPage } from "@/components/sections/programs/InitiativeDetailPage";

export function WomenEmpowermentPage() {
  return (
    <InitiativeDetailPage
      heroTitleLead="Women"
      heroTitleRest="Empowerment Initiative"
      heroSubtitle="Supporting women with skills, confidence, and a stronger place in community life."
      heroImage="/images/blog/card-6.png"
      introBefore="Providing"
      introHighlight="Skills and Support"
      introAfter="to Women"
      introBody="The Women Empowerment Initiative helps women build practical skills, income, and a voice in community decisions. Nalvalam Foundation offers training, peer support, and connections to local programs so women can lead change in their own households and neighborhoods."
      whyBody="When women have skills and support, families eat better, children stay in school, and communities gain new leaders. This initiative matters because that change starts with one woman and reaches everyone around her."
      processBefore="How the"
      processHighlight="Empowerment Process"
      processBody="Women join small groups for skill sessions, mentoring, and practical guidance on health, savings, and local opportunities. Volunteers stay with the group so training turns into something they can use, not a single workshop."
      impactBody="Participants gain confidence, new skills, and a network they can rely on. Households benefit from steadier income and from women who take a larger role in community programs."
      ctaTitle="Support Our Women Empowerment Team"
      ctaBody="Help us train and stand with more women. Your support funds sessions, materials, and the mentors who walk with them."
      images={[
        { src: "/images/blog/card-6.png", alt: "Women taking part in a community program" },
        { src: "/images/get-involved/grid-4.png", alt: "A local gathering supporting women" },
        { src: "/images/partner-right.jpg", alt: "Community members working together" },
        { src: "/images/about/mission-main.jpg", alt: "Volunteers supporting a community initiative" },
      ]}
    />
  );
}
