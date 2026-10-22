import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { AssetImage } from "@/components/ui/AssetImage";
const heroDescription =
  "We work together to uplift communities through compassion, action, sustainability, and long-term social impact. Driven by empathy, we support vulnerable communities by inspire hope and dignity.  Driven by empathy, we support vulnerable communities by inspire hope and dignity.";
const cardDescription = "Make a one-time contribution and change a life today ";
const transparencyDescription =
  "We work together to uplift communities through compassion, action, sustainability, and long-term social impact. Driven by empathy, we support vulnerable communities by inspire hope and dignity.  Driven by empathy, we support vulnerable communities by inspire hope and dignity.";
const transparencyItems = [
  {
    label: "Annual reports(future)",
    value: "30%",
    color: "bg-green",
  },
  {
    label: "Financials (future)",
    value: "45%",
    color: "bg-yellow",
  },
  {
    label: "Governance & Policies",
    value: "75%",
    color: "bg-orange",
  },
  {
    label: "Compliance Documents",
    value: "80%",
    color: "bg-gradient-to-b from-[#f49f09] to-[#f28c06]",
  },
];
const donationCards = [
  {
    title: "One‑time donation",
    icon: "/images/donation/icon-onetime.png",
    iconWidth: 120,
    iconHeight: 99,
    href: "/about/donate/one-time",
  },
  {
    title: "Monthly giving",
    icon: "/images/donation/icon-monthly.png",
    iconWidth: 130,
    iconHeight: 130,
    href: "/about/donate/monthly-giving",
  },
  {
    title: "In‑kind support",
    icon: "/images/donation/icon-inkind.png",
    iconWidth: 148,
    iconHeight: 130,
    href: "/about/donate/in-kind-support",
  },
  {
    title: "Bank details",
    icon: "/images/donation/icon-bank.png",
    iconWidth: 130,
    iconHeight: 100,
    href: "/about/donate/bank-details",
  },
];
const donationGrid = [
  {
    type: "image",
    src: "/images/donation/grid-1.png",
    alt: "Volunteer helping children",
  },
  {
    type: "card",
    ...donationCards[0],
  },
  {
    type: "card",
    ...donationCards[1],
  },
  {
    type: "card",
    ...donationCards[2],
  },
  {
    type: "card",
    ...donationCards[3],
  },
  {
    type: "image",
    src: "/images/donation/grid-2.png",
    alt: "Donation handoff",
  },
];
function DonationCard({ title, icon, iconWidth, iconHeight, href = "#" }) {
  return (
    <article className="relative flex h-auto w-full max-w-[396px] flex-col items-center rounded-[37px] bg-white px-8 pb-10 pt-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
      <div className="relative flex h-[80px] w-[80px] items-center justify-center p-[17px]">
        <AssetImage
          src="/images/donation/icon-circle.svg"
          alt=""
          width={131}
          height={131}
          className="absolute inset-0 h-[80px] w-[80px] object-contain"
        />
        <Image
          src={icon}
          alt=""
          width={iconWidth}
          height={iconHeight}
          className="relative z-10 object-contain"
          style={{ width: iconWidth, height: iconHeight }}
        />
      </div>

      <h3 className="mt-6 text-center font-[family-name:var(--font-poppins)] text-[24px] leading-[32px] text-green">
        {title}
      </h3>
      <p className="max-w-[282px] text-center font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[22px] text-[#232222] mt-4">
        {cardDescription}
      </p>

      <Link
        href={href}
        className="mt-6 inline-flex h-[45px] w-[150px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[15px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)]"
      >
        Donate Now
      </Link>
      {/* <Button size="lg" className="mt-7">
                Donate Now
              </Button> */}
    </article>
  );
}
function GridImage({ src, alt }) {
  return (
    <div className="relative h-[334px] w-full max-w-[396px] overflow-hidden rounded-[37px]">
      <Image src={src} alt={alt} fill className="object-cover" sizes="495px" />
    </div>
  );
}
export function DonationPage() {
  return (
    <main className="overflow-x-hidden bg-white">
      <div
        className="bg-no-repeat "
        style={{
          backgroundImage: "url('/images/donation/hero.png')",
          backgroundPosition: "left center",
          backgroundSize: "auto 100%",
          
        }}
      >
        <section className="mx-auto max-w-[1400px] px-[27px] pb-16 pt-10 lg:px-[46px] lg:pb-[65px] lg:pt-[24px]">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,775px)_minmax(0,1fr)] lg:gap-x-[43px]">
            <div className="relative mx-auto h-[281px] w-full max-w-[775px] overflow-hidden rounded-tr-[168px] rounded-br-[168px]  sm:rounded-tr-[272.5px] sm:rounded-br-[272.5px] lg:mx-0 lg:h-[403px]">
              {/* <Image src="/images/donation/hero.png" alt="Volunteers carrying donation boxes" fill className="object-cover" sizes="969px" priority/> */}
            </div>

            <div className="flex flex-col items-end text-right">
              <h1 className="font-[family-name:var(--font-poppins)] text-[34px] font-normal leading-[1.05] text-orange lg:text-[60px] lg:leading-[61px]">
                Donatation
              </h1>
              <p className="mt-6 max-w-[526px] font-[family-name:var(--font-poppins)] text-[14px] font-light leading-[20px] text-[#a8a8a8] lg:text-[15px]">
                {heroDescription}
              </p>
              {/* <Link
                href="#donation-options"
                className="mt-8 inline-flex h-[53px] w-[209px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[20px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] lg:h-[76px] lg:text-[25px]"
              >
                Donate Now
              </Link> */}
              <Link
                href="#donation-options"
                className="mt-7 inline-flex h-11 items-center justify-center rounded-full gradient-orange px-6 font-[family-name:var(--font-lato)] text-base leading-none text-white transition-opacity hover:opacity-90"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-[#fafafa] ">
        <section
          id="donation-options"
          className="mx-auto max-w-[1400px] px-[27px] lg:px-[46px] "
        >
          <div className="rounded-[20px] py-12  lg:py-[90px]">
            <div className="grid justify-center gap-x-[42px] gap-y-[49px] md:grid-cols-2 xl:grid-cols-3">
              {donationGrid.map((cell, index) =>
                cell.type === "image" ? (
                  <GridImage
                    key={`${cell.src}-${index}`}
                    src={cell.src}
                    alt={cell.alt}
                  />
                ) : (
                  <DonationCard
                    key={cell.title}
                    title={cell.title}
                    icon={cell.icon}
                    iconWidth={cell.iconWidth}
                    iconHeight={cell.iconHeight}
                    href={cell.href}
                  />
                ),
              )}
            </div>
          </div>
        </section>
      </div>
      <section className="bg-[#f6fbee] py-16 lg:py-[84px]">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-[27px] lg:grid-cols-[minmax(0,512px)_minmax(0,384px)] lg:justify-between lg:gap-x-[43px] lg:px-[46px]">
          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-[32px] leading-[1.1] text-[#232222] lg:text-[45px] lg:leading-[61px]">
              Transparency
            </h2>
            <p className="mt-4 font-[family-name:var(--font-poppins)] text-[20px] font-light leading-[26px] text-[#232222] lg:text-[27px]">
              communities thrive when empathy, action
            </p>
            <p className="mt-6 max-w-[512px] font-[family-name:var(--font-poppins)] text-[14px] font-light leading-[20px] text-[#8a8a8a] lg:text-[15px]">
              {transparencyDescription}
            </p>

            <ul className="mt-10 space-y-[26px]">
              {transparencyItems.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-4 w-4 shrink-0 rounded-full ${item.color}`}
                    />
                    <span className="font-[family-name:var(--font-lato)] text-[14px] font-medium leading-[20px] tracking-[-0.28px] text-[#4b5563]">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-[family-name:var(--font-inter)] text-[14px] font-medium leading-[20px] tracking-[-0.28px] text-black">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto aspect-[900/484] w-full max-w-[384px]">
            <Image
              src="/images/donation/pie-chart.png"
              alt="Transparency breakdown pie chart"
              fill
              className="object-contain"
              sizes="480px"
            />
          </div>
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
}
