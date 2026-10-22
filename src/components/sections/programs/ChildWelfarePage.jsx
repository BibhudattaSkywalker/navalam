import { InitiativeDetailPage } from "@/components/sections/programs/InitiativeDetailPage";

export function ChildWelfarePage() {
  return (
    <InitiativeDetailPage
      heroTitleLead="Child"
      heroTitleRest="Welfare & Care"
      heroSubtitle="Protecting childhood with safety, care, and a chance to grow."
      heroImage="/images/blog/card-2.png"
      introBefore="Providing"
      introHighlight="Safe Care"
      introAfter="to Every Child"
      introBody="At Nalvalam Foundation, child welfare means more than a single visit. We look after safety, health, learning, and the everyday care children need when families are under strain. Volunteers and local partners help children stay in school, receive meals, and grow up with adults they can trust."
      whyBody="Children facing hunger, illness, or an unstable home need steady support, not a one-time gesture. This initiative keeps care close to the family and the community, so a child can remain safe, healthy, and able to learn."
      processBefore="How the"
      processHighlight="Care Process"
      processBody="Families are identified with local volunteers, then supported through meals, learning help, and health check-ins. Each step is simple and repeatable, so care continues after the first visit and children are not left waiting between programs."
      impactBody="Children reached through this work are better fed, more regular at school, and surrounded by adults who notice when something is wrong. Families tell us the difference shows up in confidence, attendance, and everyday well-being."
      ctaTitle="Support Our Child Welfare & Care Team"
      ctaBody="Help us keep children safe, nourished, and learning. Your support gives a child steady care close to home."
      images={[
        { src: "/images/news-announcements/community-child.png", alt: "A child supported by the community" },
        { src: "/images/education-support/gallery-1.png", alt: "Children taking part in a learning activity" },
        { src: "/images/volunteer/hero.png", alt: "Volunteers spending time with children" },
        { src: "/images/about/story-main.jpg", alt: "A community care visit" },
      ]}
    />
  );
}
