import { AssetImage } from "@/components/ui/AssetImage";
// import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import Link from "../next/Link";
// import { Links } from "react-router-dom";

const cards = [
  {
    title: "Education for All",
    featured: true,
    icon: "/images/icons/icon-education.svg",
  },
  {
    title: "Education for All",
    featured: false,
    icon: "/images/icons/icon-health-orange.svg",
  },
  {
    title: "Education for All",
    featured: false,
    icon: "/images/icons/icon-donate-orange.svg",
  },
  {
    title: "Education for All",
    featured: false,
    icon: "/images/icons/icon-volunteer-orange.svg",
  },
];

export function ImprovementSection() {
  return (
    <Section>
      <div className="rounded-3xl bg-[rgba(185,184,181,0.08)] px-5 pb-24 pt-12 sm:px-8 sm:pb-28">
        <h2 className="section-title text-center">
          <span className="font-medium text-green">Improvement</span> For Every{" "}
          <span className="relative inline-block px-2">
            <img
              src="/images/icons/improvement-badge.svg"
              alt=""
              className="pointer-events-none absolute left-1/2 top-1/2 h-[1.7em] w-[150%] max-w-none -translate-x-1/2 -translate-y-[46%] object-fill"
            />
            <span className="relative font-medium">Child</span>
          </span>
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => (
            <article
              key={index}
              className="flex flex-col rounded-3xl bg-white p-5 shadow-[0px_4px_18px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${
                  card.featured
                    ? "gradient-orange"
                    : "border border-orange bg-[rgba(247,183,13,0.05)]"
                }`}
              >
                <AssetImage
                  src={card.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <h3 className="font-[family-name:var(--font-poppins)] text-lg font-medium text-text-body">
                {card.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-[rgba(130,130,130,0.85)]">
                Serving Society By Improving Lives Through Kindness, Care,
              </p>
              <div className="mt-5">
                {card.featured ? (
                  // <Button size="sm">Read More..</Button>
                  <Link
                                href="/about/donate"
                                className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:h-11 sm:px-8 sm:text-base"
                              >
                                Read More..
                              </Link>
                ) : (
                  // <Button variant="outline-orange" size="sm">
                  //   Read More..
                  // </Button>
                  <Link
                                href="/about/donate"
                                className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:h-11 sm:px-8 sm:text-base"
                              >
                                Read More..
                              </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
