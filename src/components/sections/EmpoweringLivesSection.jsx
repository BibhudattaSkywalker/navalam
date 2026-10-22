import { AssetImage } from "@/components/ui/AssetImage";
// import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import Link from "@/components/next/Link";

const actionCards = [
  {
    title: "Donate",
    description:
      "Lock down exams with advanced security measures to prevent. Lock down exams with measures to prevent.",
    icon: "/images/icons/icon-donate-green.svg",
    border: "border-green",
  },
  {
    title: "Become a Volunteer",
    description:
      "Lock down exams with advanced security measures to prevent. Lock down exams with measures to prevent.",
    icon: "/images/icons/icon-volunteer-orange.svg",
    border: "border-orange",
  },
  {
    title: "Partner with Us",
    description:
      "Lock down exams with advanced security measures to prevent. Lock down exams with measures to prevent.",
    icon: "/images/icons/partner-icon-handshake.png",
    border: "border-orange",
  },
  {
    title: "Fundraise for a Cause",
    description:
      "Lock down exams with advanced security measures to prevent. Lock down exams with measures to prevent.",
    icon: "/images/icons/icon-health-green.svg",
    border: "border-green",
  },
];

export function EmpoweringLivesSection() {
  return (
    <Section>
      <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div>
          <h2 className="section-title">
            Empowering <span className="font-medium text-green">Lives Through</span>{" "}
            Compassionate Action
          </h2>
          <p className="section-copy mt-4">
            We work together to uplift communities through compassion, action,
            sustainability, and long-term social impact. Driven by empathy, we
            support vulnerable communities by inspire hope and dignity.
          </p>
          <div className="mt-6">
            {/* <Button size="sm">Read More..</Button> */}
            <Link
              href="#"
              className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:h-11 sm:px-8 sm:text-base"
            >
              Read More..
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {actionCards.map((card) => (
            <article
              key={card.title}
              className={`rounded-3xl border bg-white p-5 ${card.border}`}
            >
              <AssetImage
                src={card.icon}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
              <h3 className="mt-4 font-[family-name:var(--font-poppins)] text-lg font-medium text-text-body">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-text-body">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
