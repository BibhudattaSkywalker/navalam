import { LegalDocumentPage } from "@/components/sections/legal/LegalDocumentPage";

const sections = [
  {
    title: "1. Purpose",
    type: "paragraph",
    content:
      "This Refund Policy explains how Nalvalam Foundation handles money given through the website or other official donation channels. Donations support education, health, food, and community programs.",
  },
  {
    title: "2. Voluntary Donations",
    type: "paragraph",
    content:
      "Donations are voluntary gifts. Once a donation is received and applied to foundation work, it is generally not refundable.",
  },
  {
    title: "3. When a Refund May Be Considered",
    type: "list",
    items: [
      "The same donation was charged more than once because of a payment error.",
      "A donation was made by mistake, and you write to us within 7 days.",
      "A payment was taken without the donor’s authorization.",
    ],
  },
  {
    title: "4. How to Request a Review",
    type: "list",
    items: [
      "Write to nalvalaminfo@ngo.com or use the Contact Us page.",
      "Include the donor name, date, amount, and any payment reference you received.",
      "Tell us whether the request is for a duplicate charge, a mistake, or an unauthorized payment.",
    ],
  },
  {
    title: "5. Review and Timing",
    type: "paragraph",
    content:
      "We review eligible requests and reply by email. If a refund is approved, it is returned to the original payment method. Banks and payment partners may take additional time to show the amount in your account.",
  },
  {
    title: "6. In-Kind Support",
    type: "paragraph",
    content:
      "Goods donated in kind are used for programs as soon as they are received. Items that have already been distributed cannot be returned. Please contact us before sending goods if you need to confirm that a gift can be accepted.",
  },
  {
    title: "7. Changes",
    type: "paragraph",
    content:
      "We may update this Refund Policy to reflect payment partners or legal requirements. The date at the top of this page shows the latest version.",
  },
  {
    title: "8. Contact",
    type: "paragraph",
    content:
      "Refund questions can be sent through the Contact Us page or to nalvalaminfo@ngo.com. Please include the payment details so we can find the transaction.",
  },
];

export function RefundPolicyPage() {
  return (
    <LegalDocumentPage
      titleLead="Refund"
      titleRest="Policy"
      updated="13/10/2026"
      sections={sections}
    />
  );
}
