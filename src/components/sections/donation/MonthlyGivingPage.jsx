import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { MonthlyPlanCards } from "@/components/sections/donation/MonthlyPlanCards";
const impactDescription = "We work together to uplift communities through compassion, action.";
function ImpactCard() {
    return (<article className="flex justify-center items-center h-auto w-full max-w-[396px]  gap-6 rounded-[20px] bg-white px-8 py-8 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
      <Image src="/images/monthly-giving/impact-icon-only.png" alt="" width={98} height={98} className="h-[60px] w-[60px] shrink-0 object-contain"/>
      <div>
        <h3 className="font-[family-name:var(--font-poppins)] text-[22px] leading-[1.2] text-black">
          Immediate impact
        </h3>
        <p className="mt-2 max-w-[236px] font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[20px] text-[#a8a8a8]">
          {impactDescription}
        </p>
      </div>
    </article>);
}
export function MonthlyGivingPage() {
    return (<main className="overflow-x-hidden bg-[#fafafa]">

      <section className="bg-[#f1f1f1]">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-[27px] py-16 lg:grid-cols-[minmax(0,512px)_minmax(0,448px)] lg:justify-between lg:gap-x-[43px] lg:px-[50px] lg:py-[54px]">
          <div>
            <h1 className="font-[family-name:var(--font-poppins)] text-[32px] font-medium leading-[1.1] text-black lg:text-[60px] lg:leading-[61px]">
              Monthly Giving
            </h1>
            <p className="mt-4 font-[family-name:var(--font-poppins)] text-[20px] font-light leading-[30px] text-black lg:text-[15px]">
              Small monthly support. Big long-term impact Small monthly support. Big long-term impact Small monthly support. Big long-term impact Small monthly support. Big long-term impact Small monthly support. Big long-term impactSmall monthly support. Big long-term impact Small monthly support. Big long-term impact .
              Small monthly support. Big long-term impact Small monthly support. Big long-term impact.
            </p>
            {/* <Link href="#monthly-plans" className="mt-8 inline-flex h-[53px] w-full max-w-[285px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[20px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] lg:h-[76px] lg:text-[25px]">
              Start Monthly Giving
            </Link> */}
            <Link
              href="#monthly-plans"
              className="mt-8 inline-flex h-[40px] w-[200px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[20px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] lg:h-[50px] lg:text-[15px]"
            >
              Start Monthly Giving
            </Link>
          </div>

          <div className="relative mx-auto h-[311px] w-full max-w-[448px] sm:h-[425px]">
            <div className="absolute right-0 top-0 h-[311px] w-full max-w-[390px] overflow-hidden rounded-t-[151px] sm:h-[425px] sm:rounded-t-[200px]">
              <Image src="/images/monthly-giving/hero-large.png" alt="Smiling children supported by monthly giving" fill className="object-cover" sizes="488px" priority/>
            </div>
            <div className="absolute bottom-0 left-[-100px] z-10 h-[185px] w-[168px] overflow-hidden rounded-t-[118px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] sm:h-[274px] sm:w-[233px] sm:rounded-t-[200px]">
              <Image src="/images/monthly-giving/hero-small.png" alt="Hands holding a sapling" fill className="object-cover" sizes="291px"/>
            </div>
          </div>
        </div>
      </section>

      <section id="monthly-plans" className="mx-auto max-w-[1400px] px-[27px] py-16 lg:px-[53px] lg:py-[84px]">
        <h2 className="text-center font-[family-name:var(--font-poppins)] text-[34px] leading-[1.1] lg:text-[45px] lg:leading-[61px]">
          <span className="text-green">Monthly Plan </span>
          <span className="text-black">Supports</span>
        </h2>

        <div className="mt-12 lg:mt-[65px]">
          <MonthlyPlanCards />
        </div>
      </section>

      <section className="bg-[#f1f1f1] py-16 lg:py-[84px]">
        <div className="mx-auto max-w-[1400px] px-[27px] lg:px-[50px]">
          <h2 className="text-center font-[family-name:var(--font-poppins)] text-[34px] leading-[1.1] lg:text-[45px] lg:leading-[61px]">
            <span className="text-black">Become a </span>
            <span className="text-green">regular supporter</span>
          </h2>

          <div className="mt-12 grid justify-center gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-[43px] lg:mt-[65px]">
            {Array.from({ length: 3 }).map((_, index) => (<ImpactCard key={index}/>))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </main>);
}
