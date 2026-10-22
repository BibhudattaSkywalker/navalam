import Image from "@/components/next/Image";
import { AssetImage } from "@/components/ui/AssetImage";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import Link from "@/components/next/Link";

const campaigns = [
  { image: "/images/campaign-1.jpg", topic: "Topic Name", progress: 85 },
  { image: "/images/campaign-2.jpg", topic: "Topic Name", progress: 85 },
  { image: "/images/campaign-3.jpg", topic: "Topic Name", progress: 85 },
];

export function CampaignsSection() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-3xl bg-[rgba(128,178,48,0.1)] p-5 sm:p-8">
        <AssetImage
          src="/images/icons/campaigns-wave.svg"
          alt=""
          width={1120}
          height={64}
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 w-full object-cover opacity-60"
        />

        <div className="relative z-10 flex flex-col  lg:flex-row lg:items-start lg:justify-between">
          <h2 className="section-title  ">
            Featured <span className="font-medium text-green">Campaigns Urgent</span><br/>
            Causes Purpose: Drive <strong>donations</strong> for active needs
          </h2>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            {/* <p className="font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-wide text-text-muted">
              Your donations matter
            </p> */}
            {/* <Button size="sm" className="cursor-pointer">Your donations matter</Button> */}
            <Link
              href="/about/donate"
              className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:h-11 sm:px-8 sm:text-base"
            >
              Your donations matter
            </Link>
          </div>
        </div>
        <div className="flex justify-between mt-2">

        <div className="relative z-10 mt-6 flex just items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white"
              >
                <Image
                  src="/images/avatar-1.jpg"
                  alt="Supporter"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <p className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-foreground">
            17M+ people helping
          </p>
        </div>

        <p className="section-copy relative z-10 mt-3 max-w-xl">
          We work together to uplift communities through compassion, action,
          sustainability, and long-term support for vulnerable communities.
        </p>
</div>
        <div className="relative z-10 mt-16 grid gap-5 lg:grid-cols-3">
          {campaigns.map((campaign, i) => (
            <article key={i} className="overflow-hidden rounded-2xl bg-white">
              <div className="relative h-48">
                <Image
                  src={campaign.image}
                  alt={`Campaign ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center">
                <p className="mt-3 text-sm leading-6 text-text-body">
                  Featured Campaigns Urgent Causes Purpose.
                </p>
                <Button size="xs">Flood</Button>
                </div>
                <div className="mt-4 flex justify-between text-sm text-text-body">
                  <span>{campaign.topic}</span>
                  <span className="font-semibold">{campaign.progress}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full gradient-orange"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
                <div className="mt-4">
                  {/* <Button size="sm">Donate Now</Button> */}
                  <Link
              href="/about/donate"
              className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:h-11 sm:px-8 sm:text-base"
            >
              Donate Now
            </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
