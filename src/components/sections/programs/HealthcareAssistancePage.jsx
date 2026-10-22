import { InitiativeDetailPage } from "@/components/sections/programs/InitiativeDetailPage";

export function HealthcareAssistancePage() {
  return (
    <InitiativeDetailPage
      heroTitleLead="Healthcare"
      heroTitleRest="Assistance"
      heroSubtitle="Bringing basic care, guidance, and health awareness closer to families."
      heroImage="/images/blog/card-4.png"
      introBefore="Providing"
      introHighlight="Healthcare"
      introAfter="to Families in Need"
      introBody="At Nalvalam Foundation, healthcare assistance brings basic check-ups, health education, and referrals to families who cannot easily reach a clinic. Medical partners and trained volunteers help people understand common illnesses, hygiene, and the care of mothers and children."
      whyBody="A missed check-up can turn a small illness into a crisis. This initiative matters because early guidance and a nearby camp can keep a family well enough to work, study, and care for one another."
      processBefore="How the"
      processHighlight="Care Process"
      processBody="Camps are planned with local partners, then staffed by volunteers and health workers. Families receive basic screening, practical advice, and a clear next step when further care is needed. Follow-up keeps the support from ending at the camp gate."
      impactBody="Families leave with clearer information, earlier attention to illness, and a contact they can return to. Better everyday health is what lets children stay in school and adults stay at work."
      ctaTitle="Support Our Healthcare Assistance Team"
      ctaBody="Help us bring basic care to more families. Your support funds camps, supplies, and the volunteers who make them possible."
      images={[
        { src: "/images/blog/card-4.png", alt: "Healthcare assistance in the community" },
        { src: "/images/programs/health-wellness.png", alt: "A community health outreach" },
        { src: "/images/volunteer/hero.png", alt: "Volunteers supporting a health visit" },
        { src: "/images/mission/impact-photo.png", alt: "Families reached through healthcare assistance" },
      ]}
    />
  );
}
