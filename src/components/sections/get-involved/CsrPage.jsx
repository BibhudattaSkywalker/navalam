import { InvolvementDetailPage } from "@/components/sections/get-involved/InvolvementDetailPage";

const benefits = [
  {
    title: "Measurable Impact",
    description: "See how funds and volunteer hours reach a defined community need.",
  },
  {
    title: "Employee Engagement",
    description: "Give teams a practical way to take part in field and outreach work.",
  },
  {
    title: "Transparent Reporting",
    description: "Receive clear updates on activities, reach, and outcomes.",
  },
  {
    title: "Community Goodwill",
    description: "Support programs that communities already trust and use.",
  },
];

const paths = [
  {
    title: "Education",
    description: "Fund learning support, materials, and school outreach.",
    corners: "rounded-bl-[30px] rounded-br-[100px] rounded-tl-[30px] rounded-tr-[30px]",
  },
  {
    title: "Health",
    description: "Back health camps, awareness, and preventive care.",
    corners: "rounded-bl-[100px] rounded-br-[30px] rounded-tl-[30px] rounded-tr-[30px]",
  },
  {
    title: "Environment",
    description: "Support planting, clean-up, and local conservation drives.",
    corners: "rounded-bl-[30px] rounded-br-[30px] rounded-tl-[30px] rounded-tr-[100px]",
  },
  {
    title: "Livelihood",
    description: "Help farmers and families build steadier sources of income.",
    corners: "rounded-bl-[30px] rounded-br-[30px] rounded-tl-[100px] rounded-tr-[30px]",
  },
];

export function CsrPage() {
  return (
    <InvolvementDetailPage
      source="csr"
      heroTitle="Corporate Social Responsibility"
      heroSubtitle="Companies can direct CSR support toward education, health, the environment, and livelihoods through Nalvalam Foundation."
      heroImage="/images/get-involved/grid-2.png"
      ctaLabel="Start a CSR Partnership"
      formId="csr-enquiry"
      whyLead="Why"
      whyHighlight="CSR"
      whyRest="With Us"
      benefits={benefits}
      pathsTitle="CSR"
      pathsRest="Focus Areas"
      pathsIntro="Choose a focus area that fits your company's responsibility goals."
      paths={paths}
      formTitle="CSR Enquiry"
      fields={[
        { label: "Company Name", placeholder: "Enter your company name" },
        { label: "Contact Name", placeholder: "Enter the contact person's name" },
        { label: "Email", placeholder: "Enter your email", type: "email" },
        { label: "Phone", placeholder: "Enter your phone number", type: "tel" },
        { label: "City", placeholder: "Enter your city" },
      ]}
      splitFields={[
        { label: "CSR Focus", placeholder: "Education, health, or another area" },
        { label: "Support Timeline", placeholder: "When you would like to begin" },
      ]}
      submitLabel="Submit Enquiry"
      actionLead="Our"
      actionHighlight="CSR"
      actionRest="In Action"
    />
  );
}
