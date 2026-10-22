import Image from "@/components/next/Image";
import { AssetImage } from "@/components/ui/AssetImage";
// import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import Link from "@/components/next/Link";

const trustCards = [
  {
    image: "/images/trust-1.jpg",
    title: "NGO registration details",
    description:
      "NGO registration requires documents, identity proofs, address, and trustees.",
  },
  {
    image: "/images/trust-2.jpg",
    title: "80G / FCRA (if applicable)",
    description:
      "Complete NGO registration online with PAN, Aadhaar, and documentation.",
  },
  {
    image: "/images/trust-1.jpg",
    title: "Annual reports",
    description:
      "Complete NGO registration online with PAN, Aadhaar, and documentation.",
  },
  {
    image: "/images/trust-2.jpg",
    title: "Financial statement",
    description:
      "NGO registration requires documents, identity proofs, address, and trustees.",
  },
  {
    image: "/images/trust-1.jpg",
    title: "Partner logos",
    description:
      "NGO registration requires documents, identity proofs, address, and trustees.",
  },
];

export function TrustSection() {
  return (
    <Section>
      <h2 className="section-title">
        Transparency <span className="font-medium text-green">& Trust</span>
      </h2>
      <p className="section-copy mt-4 max-w-2xl">
        We work together to uplift communities through compassion, action,
        sustainability, and long-term social impact. Driven by empathy, we
        support vulnerable communities by inspire hope and dignity.
      </p>

      <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {trustCards.map((card) => (
          <article key={card.title} className="overflow-hidden rounded-3xl bg-[#fafafa] border-green border-1">
            <div className="relative h-44">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="font-[family-name:var(--font-poppins)] text-lg font-medium text-text-body">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-text-muted">
                {card.description}
              </p>
              <div className="mt-4">
                {/* <Button size="sm">Read More..</Button> */}
                <Link
              href="/about/donate"
              className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:h-11 sm:px-8 sm:text-base"
            >
              Read More..
            </Link>
              </div>
            </div>
          </article>
        ))}

        <article className="overflow-hidden rounded-3xl bg-[#fafafa] border-1 border-green">
          <div className="relative h-44">
            <Image
              src="/images/trust-2.jpg"
              alt="NGO Growth"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 flex flex-col justify-center p-5 text-white">
              <h3 className="font-[family-name:var(--font-poppins)] text-lg font-medium">
                NGO Growth Graph
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/85">
                NGO registration requires documents, identity proofs, address,
                and trustees.
              </p>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-[family-name:var(--font-poppins)] text-lg font-medium text-text-body">
              Currently Growth
            </h3>
            <p className="mt-2 font-[family-name:var(--font-poppins)] text-4xl font-medium text-green">
              86%
            </p>
            <AssetImage
              src="/images/graph.svg"
              alt="Growth graph"
              width={280}
              height={68}
              className="mt-3 w-full"
            />
          </div>
        </article>
      </div>
    </Section>
  );
}
