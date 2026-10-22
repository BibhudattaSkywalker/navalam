import { InvolvementDetailPage } from "@/components/sections/get-involved/InvolvementDetailPage";

const benefits = [
  {
    title: "Sound Governance",
    description: "Help the foundation stay accountable, careful, and well led.",
  },
  {
    title: "Community Stewardship",
    description: "Keep decisions close to the people our programs serve.",
  },
  {
    title: "Strategic Guidance",
    description: "Shape priorities for programs, partnerships, and growth.",
  },
  {
    title: "A Lasting Legacy",
    description: "Leave a structure that can carry this work into the future.",
  },
];

const paths = [
  {
    title: "Advisory Trustee",
    description: "Offer guidance on direction, partnerships, and long-term plans.",
    corners: "rounded-bl-[30px] rounded-br-[100px] rounded-tl-[30px] rounded-tr-[30px]",
  },
  {
    title: "Program Trustee",
    description: "Review how education, health, and community programs are delivered.",
    corners: "rounded-bl-[100px] rounded-br-[30px] rounded-tl-[30px] rounded-tr-[30px]",
  },
  {
    title: "Finance Trustee",
    description: "Support careful use of funds, reporting, and financial oversight.",
    corners: "rounded-bl-[30px] rounded-br-[30px] rounded-tl-[30px] rounded-tr-[100px]",
  },
  {
    title: "Community Trustee",
    description: "Bring local insight so decisions stay grounded in real needs.",
    corners: "rounded-bl-[30px] rounded-br-[30px] rounded-tl-[100px] rounded-tr-[30px]",
  },
];

export function BecomeTrusteePage() {
  return (
    <InvolvementDetailPage
      source="trustee"
      heroTitle="Become a Trustee"
      heroSubtitle="This is a future opportunity to guide Nalvalam Foundation with care, integrity, and long-term stewardship. Register your interest to be considered when trustee roles open."
      heroImage="/images/leadership/hero-image.png"
      ctaLabel="Register Your Interest"
      formId="trustee-interest"
      whyLead="Why Serve as a"
      whyHighlight="Trustee"
      benefits={benefits}
      pathsTitle="Trustee"
      pathsRest="Roles"
      pathsIntro="Future trustee roles will cover guidance, programs, finance, and community voice."
      paths={paths}
      formTitle="Trustee Interest"
      fields={[
        { label: "Full Name", placeholder: "Enter your full name" },
        { label: "Email", placeholder: "Enter your email", type: "email" },
        { label: "Phone", placeholder: "Enter your phone number", type: "tel" },
        { label: "City", placeholder: "Enter your city" },
        { label: "Professional Background", placeholder: "Share a short background" },
      ]}
      splitFields={[
        { label: "Area of Guidance", placeholder: "Programs, finance, or community" },
        { label: "Availability", placeholder: "How you can take part" },
      ]}
      submitLabel="Register Interest"
      actionLead="Our"
      actionHighlight="Trustees"
      actionRest="In Action"
    />
  );
}
