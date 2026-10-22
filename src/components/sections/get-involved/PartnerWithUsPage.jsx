import { InvolvementDetailPage } from "@/components/sections/get-involved/InvolvementDetailPage";

const benefits = [
  {
    title: "Shared Impact",
    description: "Join programs that improve education, health, and livelihoods.",
  },
  {
    title: "Brand Trust",
    description: "Stand beside a foundation known for clear, community-led work.",
  },
  {
    title: "Community Reach",
    description: "Connect your organization with families we already serve.",
  },
  {
    title: "Long-term Change",
    description: "Build partnerships that continue beyond a single campaign.",
  },
];

const paths = [
  {
    title: "Program Partner",
    description: "Support an ongoing program with funding, materials, or expertise.",
    corners: "rounded-bl-[30px] rounded-br-[100px] rounded-tl-[30px] rounded-tr-[30px]",
  },
  {
    title: "Community Partner",
    description: "Work with local groups on events, outreach, and field visits.",
    corners: "rounded-bl-[100px] rounded-br-[30px] rounded-tl-[30px] rounded-tr-[30px]",
  },
  {
    title: "Skill Partner",
    description: "Share professional skills through training, mentoring, or pro bono help.",
    corners: "rounded-bl-[30px] rounded-br-[30px] rounded-tl-[30px] rounded-tr-[100px]",
  },
  {
    title: "Campaign Partner",
    description: "Collaborate on a focused drive for food, education, or wellness.",
    corners: "rounded-bl-[30px] rounded-br-[30px] rounded-tl-[100px] rounded-tr-[30px]",
  },
];

export function PartnerWithUsPage() {
  return (
    <InvolvementDetailPage
      source="partner"
      heroTitle="Partner With Us"
      heroSubtitle="Organizations, institutions, and local groups can work with Nalvalam Foundation to extend care, resources, and opportunity."
      heroImage="/images/get-involved/grid-3.png"
      ctaLabel="Become a Partner"
      formId="partner-registration"
      whyLead="Why"
      whyHighlight="Partner"
      whyRest="With Us"
      benefits={benefits}
      pathsTitle="Partnership"
      pathsRest="Paths"
      pathsIntro="Choose the way your organization can stand with the communities we serve."
      paths={paths}
      formTitle="Partnership Registration"
      fields={[
        { label: "Organization Name", placeholder: "Enter your organization name" },
        { label: "Contact Name", placeholder: "Enter the contact person's name" },
        { label: "Email", placeholder: "Enter your email", type: "email" },
        { label: "Phone", placeholder: "Enter your phone number", type: "tel" },
        { label: "City", placeholder: "Enter your city" },
      ]}
      splitFields={[
        { label: "Partnership Interest", placeholder: "Program, skills, or campaign" },
        { label: "Preferred Timeline", placeholder: "When you would like to begin" },
      ]}
      submitLabel="Submit Partnership"
      actionLead="Our"
      actionHighlight="Partners"
      actionRest="In Action"
    />
  );
}
