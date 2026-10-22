import { InvolvementDetailPage } from "@/components/sections/get-involved/InvolvementDetailPage";

const benefits = [
  {
    title: "Commnuity Impact",
    description: "Make a real difference and uplift communities in need.",
  },
  {
    title: "Personal Growth",
    description: "Develop new skills, gain confidence, and grow as an individual.",
  },
  {
    title: "Learning & Exposure",
    description: "Gain hands-on experience and broaden your understanding of NGO work.",
  },
  {
    title: "Social Responsibility",
    description: "Take part in meaningful activities and give back to society.",
  },
];

const paths = [
  {
    title: "Field Volunteer",
    description: "Work on the ground directly with communities in need.",
    corners: "rounded-bl-[30px] rounded-br-[100px] rounded-tl-[30px] rounded-tr-[30px]",
  },
  {
    title: "Teaching Volunteer",
    description: "Educate and guide children in rural and marginalized areas.",
    corners: "rounded-bl-[100px] rounded-br-[30px] rounded-tl-[30px] rounded-tr-[30px]",
  },
  {
    title: "Event Volunteer",
    description: "Help us organize and manage events and awareness programs.",
    corners: "rounded-bl-[30px] rounded-br-[30px] rounded-tl-[30px] rounded-tr-[100px]",
  },
  {
    title: "Social Media Volunteer",
    description: "Work on the ground directly with communities in need.",
    corners: "rounded-bl-[30px] rounded-br-[30px] rounded-tl-[100px] rounded-tr-[30px]",
  },
];

export function VolunteerPage() {
  return (
    <InvolvementDetailPage
      source="volunteer"
      heroTitle="Become a Volunteer"
      heroSubtitle="We work together to uplift communities through compassion, action, sustainability, and long-term social impact. Driven by empathy."
      heroImage="/images/volunteer/hero.png"
      ctaLabel="Apply as Volunteer"
      formId="volunteer-registration"
      whyLead="Why"
      whyHighlight="Volunteer"
      whyRest="With Us"
      benefits={benefits}
      pathsTitle="Volunteer"
      pathsRest="Roles"
      pathsIntro="Find your perfect volunteer role at Nalvalam Foundation."
      paths={paths}
      formTitle="Volunteer Registration"
      fields={[
        { label: "Full Name", placeholder: "Enter your full name" },
        { label: "Email", placeholder: "Enter your email", type: "email" },
        { label: "Phone", placeholder: "Enter your phone number", type: "tel" },
        { label: "City", placeholder: "Enter your city" },
        { label: "Area Of Interest", placeholder: "Enter your area of interest" },
      ]}
      splitFields={[
        { label: "Weekends", placeholder: "Weekends" },
        { label: "Weekdays", placeholder: "Weekdays" },
      ]}
      submitLabel="Join as Volunteer"
      actionLead="Our"
      actionHighlight="Volunteer"
      actionRest="In Action"
    />
  );
}
