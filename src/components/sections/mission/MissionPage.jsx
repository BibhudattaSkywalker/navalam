import Image from "@/components/next/Image";
// import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { AssetImage } from "@/components/ui/AssetImage";
import { Button } from "@/components/ui/Button";
const smallBulletItems = [
  "Empowerment through education, action opportunity",
  "Compassion driven by care, empathy",
  "Empowerment through education, action opportunity",
  "Compassion driven by care, empathy",
];
const largeBulletItems = [
  "Empowerment through education, action opportunity",
  "Empowerment through education.",
  "Empowerment through education.",
  "Empowerment through education, action opportunity",
];
const stats = [
  { value: "25+", label: "Education for All Lives Compassion" },
  { value: "25+", label: "Education for All Lives Compassion" },
  { value: "25+", label: "Education for All Lives Compassion" },
  { value: "25+", label: "Education for All Lives Compassion" },
];
// function GradientCta({ href = "#", children, className = "" }) {
//   return (
//     <Link
//       href={href}
//       className={`inline-flex items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] ${className}`}
//     >
//       {children}
//     </Link>
//   );
// }
function SmallChecklist() {
  return (
    <ul className="grid gap-y-9">
      {smallBulletItems.map((item) => (
        <li key={item} className="flex items-start gap-[10px]">
          <AssetImage
            src="/images/icons/mission-check-sm.svg"
            alt=""
            width={24}
            height={24}
            className="mt-[2px] h-6 w-6 shrink-0"
          />
          <span className="max-w-[442px] font-[family-name:var(--font-poppins)] text-[20px] font-light leading-[24px] text-foreground">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
function LargeChecklist() {
  return (
    <ul className="grid gap-y-[25px]">
      {largeBulletItems.map((item, index) => (
        <li key={`${item}-${index}`} className="flex items-center gap-[32px]">
          <AssetImage
            src="/images/icons/mission-check-lg.svg"
            alt=""
            width={44}
            height={44}
            className="mt-[2px] h-8 w-8 shrink-0"
          />
          <span className="max-w-[670px] font-[family-name:var(--font-poppins)] text-[26px] font-light leading-[32px] text-foreground xl:text-[25px]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
export function MissionPage() {
  return (
    <main className="overflow-x-hidden bg-[#fafafa]">
      <section className="pt-14 lg:pt-[114px]">
        <div className="mx-auto max-w-[1400px] px-[27px] lg:px-[41px]">
          <h1 className="text-center font-[family-name:var(--font-lato)] text-[36px] leading-[1.05] text-green lg:text-[60px] lg:leading-[67px]">
            Our Mission
          </h1>
          <p className="mx-auto mt-5 max-w-[632px] text-center font-[family-name:var(--font-lato)] text-[22px] leading-[30px] text-foreground lg:text-[27px]">
            Our initiatives reach people across different regions, driven by
            compassion and purpose.
          </p>
          <div className="mt-6 flex justify-center">
            {/* <GradientCta className="h-[53px] w-[220px] text-[20px] leading-normal">
              Support Our Mission
            </GradientCta> */}
            <Button
              size="md"
              className="gradient-orange border-0 text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)]"
            >
              Support Our Mission
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-10 lg:mt-[40px]">
        <div className="relative mx-auto h-[311px] max-w-[1400px] overflow-hidden lg:h-[714px]">
          <Image
            src="/images/mission/hero-image.png"
            alt="Children smiling and raising their hands"
            fill
            className="object-cover"
            sizes="1400px"
            priority
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-[27px] pb-16 pt-16 lg:px-[248px] lg:pb-[96px] lg:pt-[84px]">
        <p className="text-center font-[family-name:var(--font-lato)] text-[34px] leading-[1.1] text-black lg:text-[60px] lg:leading-[67px]">
          What <span className="text-green">Drive Us</span>
        </p>
        <p className="mx-auto mt-8 max-w-[878px] text-justify font-[family-name:var(--font-poppins)] text-[16px] font-light leading-[25px] text-[#3d3d3d] lg:text-[20px] lg:leading-[28px]">
          At Nalvalam Foundation, our women empowerment initiative focuses on
          enabling women to become confident, independent, and self-reliant. We
          support women by creating opportunities that help them strengthen
          their skills, improve their livelihoods, and make informed life
          choices. At Nalvalam Foundation, our women empowerment initiative
          focuses on enabling
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-[27px] lg:px-[41px]">
        <div className="rounded-[10px] bg-[#e2ecd2] px-8 py-10 lg:h-[500px] lg:px-[81px] lg:py-[32px]">
          <h2 className="text-center font-[family-name:var(--font-lato)] text-[27px] leading-[1.15] text-black lg:text-[45px] lg:leading-[67px]">
            How we Deliver Impact
          </h2>
          <div className="mt-8 grid items-center gap-10 lg:mt-[34px] lg:grid-cols-[469px_425px] lg:justify-between">
            <SmallChecklist />
            <div className="mx-auto w-full max-w-[425px] border border-green p-[22px]">
              <div className="relative h-[208px] w-full lg:h-[258px]">
                <Image
                  src="/images/mission/impact-photo.png"
                  alt="Children gathered together"
                  fill
                  className="object-cover"
                  sizes="483px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-[27px] pb-16 pt-16 lg:px-[41px] lg:pb-[50px] lg:pt-[50px]">
        <h2 className="text-center font-[family-name:var(--font-lato)] text-[27px] leading-[1.15] text-black lg:text-[45px] lg:leading-[67px]">
          How we Deliver Impact
        </h2>
        <div className="mt-8 grid gap-10 lg:mt-[68px] lg:grid-cols-[462px_1fr] lg:items-start lg:gap-[67px]">
          <div className="relative mx-auto h-[256px] w-full max-w-[462px] overflow-hidden rounded-[19px] border-2 border-green lg:h-[300px]">
            <Image
              src="/images/mission/impact-photo.png"
              alt="Children gathered together"
              fill
              className="object-cover"
              sizes="578px"
            />
          </div>
          <div className="lg:pt-[71px]">
            <LargeChecklist />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/mission/stats-bg.png"
            alt=""
            fill
            className="object-cover"
            sizes="1400px"
          />
          <div className="absolute inset-0 bg-[rgba(128,178,48,0.9)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-[27px] py-12 lg:px-[222px] lg:py-[83px]">
          <div className="grid gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={`${stat.value}-${index}`}
                className={`text-white ${index < stats.length - 1 ? "lg:border-r lg:border-white/70" : ""} lg:pr-[47px]`}
              >
                <p className="font-[family-name:var(--font-poppins)] text-[35px] font-semibold leading-[39px] lg:text-[35px]">
                  {stat.value}
                </p>
                <p className="mt-1 max-w-[193px] font-[family-name:var(--font-poppins)] text-[18px] font-medium leading-[26px] lg:text-[20px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-[27px] py-16 text-center lg:py-[100px]">
        <h2 className="font-[family-name:var(--font-lato)] text-[32px] font-light leading-[1.15] text-black lg:text-[45px] lg:leading-[67px]">
          Be a part of our <span className="text-green">Mission Today</span>
        </h2>
        <div className="mt-8 flex justify-center lg:mt-[39px]">
          {/* <GradientCta className="h-[68px] w-[302px] text-[26px] leading-normal max-w-full">
            Support Our Cause
          </GradientCta> */}
          <Button  size="md" className="gradient-orange border-0 text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)]">
                  Support Our Cause
                </Button>
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
}
