import { InitiativeDetailPage } from "@/components/sections/programs/InitiativeDetailPage";

export function EducationForAllPage() {
  return (
    <InitiativeDetailPage
      heroTitleLead="Education"
      heroTitleRest="for All"
      heroSubtitle="Helping every child learn with materials, guidance, and a place to study."
      heroImage="/images/blog/card-5.png"
      introBefore="Providing"
      introHighlight="Learning Support"
      introAfter="to Every Child"
      introBody="Education for All supports children who would otherwise miss school because of cost, distance, or a lack of materials. Nalvalam Foundation provides learning resources, mentoring, and a steady place where children can keep up with their studies."
      whyBody="A child who falls behind early often stays behind. This initiative matters because books, guidance, and regular attendance give that child a fair chance to continue."
      processBefore="How the"
      processHighlight="Education Process"
      processBody="We identify children who need support, then provide materials, learning sessions, and follow-up with families. Volunteers help with lessons, while local partners help children stay enrolled and present."
      impactBody="Students in the program attend more regularly and have the materials they need to take part in class. Families see learning as something their child can continue, not something they have to give up."
      ctaTitle="Support Our Education for All Team"
      ctaBody="Help us keep more children learning. Your support provides materials, sessions, and the volunteers who guide them."
      images={[
        { src: "/images/blog/card-5.png", alt: "Children learning together" },
        { src: "/images/education-support/hero.png", alt: "An education support session" },
        { src: "/images/education-support/gallery-2.png", alt: "Students with learning materials" },
        { src: "/images/education-support/details.png", alt: "A classroom supported by the foundation" },
      ]}
    />
  );
}
