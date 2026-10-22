import { LegalDocumentPage } from "@/components/sections/legal/LegalDocumentPage";

const sections = [
  {
    title: "1. Acceptance of Terms",
    type: "paragraph",
    content:
      "By accessing or using any service, donation facility, program, or activity associated with this website or NGO, you agree to be bound by these Terms & Conditions.",
  },
  {
    title: "2. About the NGO",
    type: "paragraph",
    content:
      "The NGO is a non-profit organization working in the areas of social welfare, education, healthcare, environment, and community development. All activities are non-commercial and carried out for public benefit.",
  },
  {
    title: "3. Donations",
    type: "list",
    items: [
      "All donations made to the NGO are voluntary.",
      "Donations are non-refundable.",
      "Funds received will be used solely for the objectives and activities of the organization.",
      "Donors may receive general information regarding the utilization of their donations.",
    ],
  },
  {
    title: "4. Use of Funds",
    type: "paragraph",
    content:
      "The NGO may use collected funds for programs, administrative expenses, awareness initiatives, and legal or regulatory compliance.",
  },
  {
    title: "5. Volunteers & Participation",
    type: "list",
    items: [
      "Volunteers participate in NGO activities of their own free will.",
      "The NGO reserves the right to accept or reject any volunteer without providing a reason.",
      "Volunteers are required to follow the NGO’s policies, rules, and code of conduct.",
    ],
  },
  {
    title: "6. Intellectual Property",
    type: "paragraph",
    content:
      "The NGO’s name, logo, content, images, and other materials are the intellectual property of the organization. Unauthorized use without prior written permission is strictly prohibited.",
  },
  {
    title: "7. Privacy Policy",
    type: "paragraph",
    content:
      "Personal information of users and donors is kept secure and will not be shared with third parties without consent, except where required by law.",
  },
  {
    title: "8. Limitation of Liability",
    type: "paragraph",
    content:
      "The NGO shall not be held responsible for any direct or indirect loss, damage, or inconvenience arising from participation in programs, events, or use of the website.",
  },
  {
    title: "9. Changes to Terms",
    type: "paragraph",
    content:
      "The NGO reserves the right to update or modify these Terms & Conditions at any time without prior notice. Updated terms will be effective once published on the website.",
  },
  {
    title: "10. Governing Law",
    type: "paragraph",
    content:
      "These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of local courts.",
  },
  {
    title: "11. Contact Information",
    type: "paragraph",
    content:
      "For any questions or concerns regarding these Terms & Conditions, please contact the NGO through its official communication channels.",
  },
];

export function TermsConditionsPage() {
  return (
    <LegalDocumentPage
      titleLead="Terms &"
      titleRest="Conditions"
      updated="26/21/2025"
      sections={sections}
    />
  );
}
