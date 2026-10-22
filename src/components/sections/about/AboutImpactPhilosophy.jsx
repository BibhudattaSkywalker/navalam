import Image from "@/components/next/Image";
// import { Section } from "@/components/ui/Section";
const impactStats = [
    { value: "25,000+", label: "Live Impacted" },
    { value: "120+", label: "Live Reached" },
    { value: "8+", label: "Yeras of Services" },
    { value: "5", label: "States Covered" },
];
export function AboutImpactPhilosophy() {
    return (<section className="relative h-auto min-h-[370px] w-full overflow-hidden lg:h-[550px]">
      <div>
      <Image src="/images/about/impact-bg.jpg" alt="" fill className="object-cover" sizes="100vw"/>
      <div className="absolute inset-0 bg-black/70"/>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-14">
        <h2 className="mt-5 text-center font-[family-name:var(--font-poppins)] text-5xl font-light text-white lg:text-[56px] lg:leading-[61px]">
          Impact <span className="font-medium text-yellow">Philosophy</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[990px] text-center font-[family-name:var(--font-poppins)] text-xl leading-[28px] text-white lg:mt-[20px] lg:text-[26px]">
          Our impact philosophy focuses on measurable change, community
          participation, and sustainable solutions
        </p>

        <div className="mt-12 flex flex-wrap justify-start gap-[18px] lg:mt-[50px] lg:pl-[132px]">
          {impactStats.map((stat, i) => (<div key={i} className="flex h-[150px] w-[246px] flex-col items-center justify-center rounded-[8px] bg-[#ebebeb] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.25)]">
              <p className="font-[family-name:var(--font-poppins)] text-[32px] font-semibold leading-[31px] text-orange">
                {stat.value}
              </p>
              <p className="mt-2 font-[family-name:var(--font-poppins)] text-[14px] font-medium leading-[26px] text-orange">
                {stat.label}
              </p>
            </div>))}
        </div>
      </div>
      </div>
    </section>);
}
