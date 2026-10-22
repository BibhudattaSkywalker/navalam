import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { AssetImage } from "@/components/ui/AssetImage";
import { Button } from "@/components/ui/Button";
const heroDescription = "We work together to uplift communities through compassion, action, sustainability, and long-term social impact. Driven by empathy, we support vulnerable communities by inspire hope and dignity.  Driven by empathy, we support vulnerable communities by inspire hope and dignity.";
const involvementCards = [
    { title: "Volunteer", tall: false, href: "/about/get-involved/volunteer" },
    { title: "Partner With Us", tall: false, href: "/about/get-involved/partner-with-us" },
    { title: "Corporate Social Responsibility", tall: true, href: "/about/get-involved/csr" },
    { title: "Become a Trustee (future)", tall: true, href: "/about/get-involved/become-a-trustee" },
];
const gridImages = [
    {
        src: "/images/get-involved/grid-1.png",
        radius: "rounded-br-[50px]",
        border: "border-orange",
    },
    {
        src: "/images/get-involved/grid-2.png",
        radius: "rounded-bl-[50px]",
        border: "border-green",
    },
    {
        src: "/images/get-involved/grid-3.png",
        radius: "rounded-tr-[50px]",
        border: "border-green",
    },
    {
        src: "/images/get-involved/grid-4.png",
        radius: "rounded-tl-[50px]",
        border: "border-orange",
    },
];
function HeroGridCell({ src, alt, radius, border, priority = false, }) {
    return (<div className="relative h-[185px] w-full sm:h-[217px] sm:max-w-[331px]">
      <div className={`pointer-events-none absolute -left-1 -top-1 h-[calc(100%+8px)] w-[calc(100%+8px)] border ${border} ${radius}`}/>
      <div className={`relative h-full w-full overflow-hidden ${radius}`}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="406px" priority={priority}/>
      </div>
    </div>);
}
function AvatarRow() {
    return (<div className="flex items-center justify-center">
      {Array.from({ length: 4 }).map((_, index) => (<div key={index} className={`relative h-[70px] w-[70px] overflow-hidden rounded-full border-[5px] border-white shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)] ${index > 0 ? "-ml-[14px]" : ""}`}>
          <Image src="/images/get-involved/avatar.png" alt="" fill className="object-cover" sizes="109px"/>
        </div>))}
    </div>);
}
function InvolvementCard({ title, tall = false, href, }) {
    return (<article className={`relative w-full max-w-[623px] rounded-[15px] bg-[rgba(128,178,48,0.2)] px-[22px] pb-[28px] pt-[28px] ${tall ? "min-h-[398px]" : "min-h-[374px]"}`}>
      {href ? (<Link href={href} className="absolute inset-0 z-20 rounded-[15px]" aria-label={title}/>) : null}
      <div className="absolute left-1/2 top-[-29px] z-10 -translate-x-1/2">
        <div className="relative h-[100px] w-[100px]">
          <AssetImage src="/images/get-involved/icon-circle.svg" alt="" fill className="object-contain"/>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/images/get-involved/card-icon.png" alt="" width={92} height={92} className="h-[77px] w-[77px] object-contain"/>
          </div>
        </div>
      </div>

      <div className={`mx-auto flex w-full max-w-[589px] flex-col items-center rounded-[15px] bg-green px-6 pb-10 pt-[65px] text-center text-white sm:px-10 ${tall ? "min-h-[349px]" : "min-h-[328px]"}`}>
        <h3 className="font-[family-name:var(--font-poppins)] text-[29px] font-normal leading-[37px] lg:text-[35px]">
          {title}
        </h3>
        <p className="mt-4 max-w-[416px] font-[family-name:var(--font-lato)] text-[16px] font-light leading-[18px] text-[#efefef]">
          Join compassionate volunteers empowering communities through service,
          action, and hope with{" "}
          <span className="font-semibold">our NGO</span>
        </p>

        <div className="relative mt-8 h-[49px] w-full max-w-[329px]">
          <div className="flex h-full items-center rounded-full border-2 border-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.2)] pl-5 pr-[43px] backdrop-blur-[14.1px]">
            <span className="truncate font-[family-name:var(--font-poppins)] text-[20px] leading-normal">
              nalvalaminfo@ngo.com
            </span>
            <button type="button" aria-label="Submit email" className="absolute right-[10px] top-1/2 flex h-[32px] w-[32px] -translate-y-1/2 items-center justify-center">
              <AssetImage src="/images/get-involved/arrow-circle.svg" alt="" width={35} height={35} className="h-[32px] w-[32px]"/>
              <AssetImage src="/images/get-involved/arrow.svg" alt="" width={20} height={15} className="absolute h-[15px] w-[20px]"/>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[-20px] left-1/2 z-10 -translate-x-1/2">
        <AvatarRow />
      </div>
    </article>);
}
export function GetInvolvedPage() {
    return (<main className="overflow-x-hidden bg-[#fffdfd]">

      <section className="mx-auto max-w-[1400px] px-[27px] pb-16 pt-10 lg:px-[46px] lg:pb-[87px] lg:pt-[24px]">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,512px)_minmax(0,664px)] lg:justify-between lg:gap-x-[43px]">
          <div className="lg:pt-[54px]">
            <h1 className="font-[family-name:var(--font-poppins)] text-[32px] font-normal leading-[1.1] text-[#232222] lg:text-[60px] lg:leading-[61px]">
              Get <span className="font-light text-green">Involved</span>
            </h1>
            <p className="mt-4 font-[family-name:var(--font-poppins)] text-[20px] font-light leading-[26px] text-[#232222] lg:mt-6 lg:text-[27px]">
              communities thrive when empathy, action
            </p>
            <p className="mt-4 max-w-[512px] whitespace-pre-wrap font-[family-name:var(--font-poppins)] text-[14px] font-light leading-[20px] text-[#a8a8a8] lg:mt-5 lg:text-[15px]">
              {heroDescription}
            </p>
            <div className="mt-8 lg:mt-10">
              <Button variant="outline-orange" size="md">
                Read More..
              </Button>
            </div>
          </div>

          <div className="mx-auto grid w-full max-w-[664px] grid-cols-2 gap-[14px] justify-items-center">
            {gridImages.map((item, index) => (<HeroGridCell key={item.src} src={item.src} alt={`Community involvement ${index + 1}`} radius={item.radius} border={item.border} priority={index < 2}/>))}
          </div>
        </div>
      </section>

      <section className="bg-[#fafafa] pb-24 pt-16 lg:pb-[118px] lg:pt-[87px]">
        <div className="mx-auto max-w-[1400px] px-[27px] lg:px-[46px]">
          <div className="grid justify-items-center gap-x-[43px] gap-y-[92px] lg:grid-cols-2">
            {involvementCards.map((card) => (<InvolvementCard key={card.title} title={card.title} tall={card.tall} href={card.href}/>))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </main>);
}
