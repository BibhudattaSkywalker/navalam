import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { BankDetailsCard } from "@/components/sections/donation/BankDetailsCard";
import { FaEnvelope } from "react-icons/fa6";
const infoText = "We work together to uplift communities through compassion, action, sustainability, and long-term social impact. Driven by empathy, we support vulnerable communities by inspire hope and";
const impactDescription = "We work together to uplift communities through compassion, action.";
function ImpactItem() {
    return (<div className="flex items-center gap-6">
      <Image src="/images/bank-details/impact-icon-only.png" alt="" width={98} height={98} className="h-[60px] w-[60px] shrink-0 object-contain"/>
      <div>
        <h3 className="font-[family-name:var(--font-poppins)] text-[24px] leading-[1.2] text-black">
          Immediate impact
        </h3>
        <p className="mt-2 max-w-[300px] font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[20px] text-[#a8a8a8]">
          {impactDescription}
        </p>
      </div>
    </div>);
}
export function BankDetailsPage() {
    return (<main className="overflow-x-hidden bg-[#fafafa]">

      <section className="relative">
        <div className="relative mx-auto h-[311px] max-w-[1400px] overflow-hidden lg:h-[508px]">
          <Image src="/images/bank-details/hero.png" alt="Financial planning background" fill className="object-cover object-[center_20%] lg:object-[center_35%]" sizes="1400px" priority/>
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]"/>

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <h1 className="font-[family-name:var(--font-poppins)] text-[34px] leading-[1.1] lg:text-[60px] lg:leading-[26px]">
              <span className="font-medium">Bank </span>
              <span className="font-normal">Details</span>
            </h1>
            <p className="mt-6 max-w-[616px] font-[family-name:var(--font-poppins)] text-[18px] font-light leading-[20px] lg:mt-8 lg:text-[15px]">
              Prefer direct bank transfer? Details below.Prefer direct bank .
            </p>
            {/* <Link href="#bank-details-card" className="mt-8 inline-flex h-[53px] w-[176px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[20px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] transition-opacity hover:opacity-90">
              Donate Now
            </Link> */}
            <Link
              href="#bank-details-card"
              className="mt-8 inline-flex h-[40px] w-[150px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[20px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] lg:h-[50px] lg:text-[15px]"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1400px] px-[27px] pb-12 lg:-mt-[129px] lg:px-[46px] lg:pb-16">
        <div id="bank-details-card" className="mx-auto min-h-0 w-full max-w-[987px] rounded-[37px] bg-white px-8 py-10 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] lg:min-h-[382px] lg:px-[70px] lg:py-[54px]">
          <BankDetailsCard />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-[27px] py-12 lg:px-[46px] lg:py-16">
        <div className="mx-auto flex max-w-[987px] flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-[38px]">
          {/* <Image src="/images/bank-details/envelope-icon.png" alt="" width={94} height={94} className="h-[79px] w-[79px] shrink-0 object-contain"/> */}
<div className="flex h-[79px] w-[79px] items-center justify-center rounded-full border border-black">
  <FaEnvelope className="text-[40px]" />
</div>
          <p className="max-w-[769px] font-[family-name:var(--font-poppins)] text-[16px] font-light leading-[26px] text-[#050505] lg:text-[15px]">
            <span>{infoText}</span>
            <span className="font-normal"> we support vulnerable communities by inspire hope and</span>
          </p>
        </div>
      </section>

      <section className="bg-[#f6f6f6]">
        <div className="mx-auto flex min-h-[146px] max-w-[1400px] flex-col items-center justify-center gap-10 px-[27px] py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-[46px] lg:py-0">
          <Image src="/images/footer-logo.png" alt="Nalvalam Foundation" width={265} height={109} className="h-[67px] w-auto object-contain lg:h-[92px]"/>
          <ImpactItem />
          <ImpactItem />
        </div>
      </section>

      <NewsletterSection />
    </main>);
}
