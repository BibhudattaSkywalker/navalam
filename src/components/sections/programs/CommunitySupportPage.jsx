import { InitiativeDetailPage } from "@/components/sections/programs/InitiativeDetailPage";

export function CommunitySupportPage() {
  return (
    <InitiativeDetailPage
      heroTitleLead="Community"
      heroTitleRest="Support Programs"
      heroSubtitle="Working with local communities so families can build a steadier life."
      heroImage="/images/blog/card-3.png"
      introBefore="Providing"
      introHighlight="Local Support"
      introAfter="to Communities"
      introBody="Nalvalam Foundation works beside neighborhoods rather than around them. Community support programs bring people together for food, learning, health awareness, and practical help that fits local needs. The goal is a community that can keep supporting itself."
      whyBody="Lasting change starts where people already live. When neighbors plan and take part, support reaches the right families and continues after a single event is over."
      processBefore="How the"
      processHighlight="Support Process"
      processBody="We begin with local conversations, then match volunteers and resources to the need in front of us. Programs may include food drives, school support, health camps, or skill sessions, always shaped with the people who will use them."
      impactBody="Communities that take part report stronger local networks, more families receiving timely help, and neighbors who now lead parts of the work themselves. That shared effort is the impact we measure."
      ctaTitle="Support Our Community Programs Team"
      ctaBody="Help us stand with more neighborhoods. Your support turns local ideas into programs families can rely on."
      images={[
        { src: "/images/blog/card-3.png", alt: "A community support gathering" },
        { src: "/images/get-involved/grid-1.png", alt: "Neighbors taking part in a local program" },
        { src: "/images/programs/community-development.png", alt: "Community development in progress" },
        { src: "/images/about/story-overlay.jpg", alt: "Volunteers with community members" },
      ]}
    />
  );
}
