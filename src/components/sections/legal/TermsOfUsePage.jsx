import { LegalDocumentPage } from "@/components/sections/legal/LegalDocumentPage";

const sections = [
  {
    title: "1. Using This Website",
    type: "paragraph",
    content:
      "These Terms of Use apply when you browse, read, or submit information on the Nalvalam Foundation website. By continuing to use the site, you agree to these terms.",
  },
  {
    title: "2. Permitted Use",
    type: "list",
    items: [
      "You may use the website to learn about our programs, read updates, and contact the foundation.",
      "You may share links to public pages for personal or informational purposes.",
      "You may submit forms only with information that is accurate and your own.",
    ],
  },
  {
    title: "3. Prohibited Use",
    type: "list",
    items: [
      "Do not attempt to disrupt, scrape, or gain unauthorized access to the website.",
      "Do not post false, misleading, or unlawful information through any form.",
      "Do not copy the foundation’s name, logo, or materials for another organization without written permission.",
    ],
  },
  {
    title: "4. Accounts and Messages",
    type: "paragraph",
    content:
      "Messages sent through the website are reviewed by the foundation team. We may be unable to reply to every enquiry, and we may decline a request that falls outside our programs.",
  },
  {
    title: "5. Donations and Programs",
    type: "paragraph",
    content:
      "Information about donations, volunteering, and programs is provided in good faith. Program details can change with community need, funding, and local conditions. Donation terms are also covered in our Refund Policy.",
  },
  {
    title: "6. Website Content",
    type: "paragraph",
    content:
      "Text, photographs, and graphics on this website belong to Nalvalam Foundation unless another credit is shown. You may not reuse them for commercial purposes without permission.",
  },
  {
    title: "7. Disclaimer",
    type: "paragraph",
    content:
      "The website is provided as available. We work to keep information current, but we do not guarantee that every page is free of error or that the site will always be uninterrupted.",
  },
  {
    title: "8. Changes",
    type: "paragraph",
    content:
      "We may update these Terms of Use when the website or our practices change. The revised terms apply from the date shown at the top of this page.",
  },
  {
    title: "9. Contact",
    type: "paragraph",
    content:
      "Questions about these Terms of Use can be sent through the Contact Us page or to nalvalaminfo@ngo.com.",
  },
];

export function TermsOfUsePage() {
  return (
    <LegalDocumentPage
      titleLead="Terms of"
      titleRest="Use"
      updated="13/10/2026"
      sections={sections}
    />
  );
}
