// import Image from "@/components/next/Image";
import { Section } from "@/components/ui/Section";

const partners = [
  { name: "Corporate partners" },
  { name: "Government associations" },
  { name: "NGOs" },
  { name: "Institutions" },
];

function PartnerIcon({ name }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-5 w-5",
    "aria-hidden": true,
  };

  if (name === "Corporate partners") {
    return (
      <svg {...common}>
        <path d="M4 20V8l4-2v14" />
        <path d="M8 20V5l8-2v17" />
        <path d="M16 20V9l4 1.5V20" />
        <path d="M3 20h18" />
      </svg>
    );
  }

  if (name === "Government associations") {
    return (
      <svg {...common}>
        <path d="M8 12.5c.8-1.6 2.4-2.5 4-2.5" />
        <path d="M7 11.5 4.5 9.2a1.5 1.5 0 0 1 2-2.2L9 8.5" />
        <path d="M16 12.5c-.8-1.6-2.4-2.5-4-2.5" />
        <path d="M17 11.5 19.5 9.2a1.5 1.5 0 0 0-2-2.2L15 8.5" />
        <path d="M8.5 14.5 11 17l2-2 2 2 2.5-2.5" />
      </svg>
    );
  }

  if (name === "NGOs") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12h16M12 4c2.2 2.4 3.2 5.1 3.2 8S14.2 17.6 12 20c-2.2-2.4-3.2-5.1-3.2-8S9.8 6.4 12 4Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M4 20V10l8-5 8 5v10" />
      <path d="M9 20v-6h6v6" />
      <path d="M3 20h18" />
    </svg>
  );
}

function PartnerPill({ partner }) {
  return (
    <div className="flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 shadow-[0px_8px_24px_rgba(0,0,0,0.08)]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green text-white">
        <PartnerIcon name={partner.name} />
      </span>
      <span className="font-[family-name:var(--font-poppins)] text-sm font-medium text-[#3a3a3a] sm:text-base">
        {partner.name}
      </span>
    </div>
  );
}

export function PartnerSection() {
  return (
    <Section>
      <div className="rounded-[28px] bg-[#f7f7f7] px-5 py-10 sm:px-8 sm:py-12">
        <h2 className="section-title">
          Partner <span className="font-medium text-green">& Support</span>
        </h2>
        <p className="section-copy mt-4 max-w-xl">
          We work together to uplift communities through compassion, action,
          sustainability, and long-term social impact. Driven by empathy, we
          support vulnerable communities by inspire hope and dignity.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:hidden">
          {partners.map((partner) => (
            <PartnerPill key={partner.name} partner={partner} />
          ))}
        </div>

        <div className="relative mt-6 grid gap-5 lg:mt-4 lg:grid-cols-2 lg:items-end">
          <div className="relative min-h-[280px] lg:min-h-[420px] ">
            <div className="absolute right-[-250px] top-0 z-20 hidden w-[270px] space-y-3 lg:block xl:w-[300px] xl:translate-x-6">
              <PartnerPill partner={partners[0]} />
              <PartnerPill partner={partners[1]} />
            </div>
            <div className="relative mt-0 h-64 overflow-hidden rounded-tl-[92px] sm:h-72 lg:absolute lg:bottom-0 lg:left-0 lg:mt-0 lg:h-[400px] flex justify-end">
              <img
                src="/images/partner-left.jpg"
                alt="Children receiving school supplies"
                
                className="lg:w-[60%] lg:h-[400px] rounded-tl-[92px] object-cover"
              />
            </div>
            <div className="absolute top-20 left-4 z-20 hidden w-[230px] space-y-3 lg:block">
              <PartnerPill partner={partners[2]} />
              <PartnerPill partner={partners[3]} />
            </div>
          </div>

          <div className="relative h-72 flex justify-end overflow-hidden rounded-tl-[110px] sm:h-80  lg:h-[500px]">
            <img
              src="/images/partner-right.jpg"
              alt="Woman and child smiling"
              
              className="w-[70%] rounded-tl-[110px]"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
