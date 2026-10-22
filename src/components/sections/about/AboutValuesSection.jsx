import { AssetImage } from "@/components/ui/AssetImage";
// import { Button } from "@/components/ui/Button";
import { AboutContainer } from "@/components/sections/about/AboutContainer";
import Link from "@/components/next/Link";
const values = [
    {
        title: "Education for All",
        description: "Serving Society By Improving Lives Through Kindness, Care,",
    },
    {
        title: "Education for All",
        description: "Serving Society By Improving Lives Through Kindness, Care,",
    },
    {
        title: "Education for All",
        description: "Serving Society By Improving Lives Through Kindness, Care,",
    },
    {
        title: "Education for All",
        description: "Serving Society By Improving Lives Through Kindness, Care,",
    },
];
export function AboutValuesSection() {
    return (<section className="bg-[#fafafa] ">
      <AboutContainer>
        <h2 className="font-[family-name:var(--font-poppins)] text-5xl font-light text-text-body lg:text-[39px] lg:leading-[61px]">
          Our <span className="font-medium text-green">Values</span>
        </h2>

        <div className="mt-10 grid gap-[21px] sm:grid-cols-2 xl:grid-cols-[repeat(4,289px)] xl:justify-start">
          {values.map((value, i) => (<article key={i} className="flex h-auto w-full max-w-[289px] flex-col rounded-[36px] bg-white px-[30px] pb-[28px] pt-[28px]">
              <div className="flex h-[77px] w-[77px] py-4 items-center justify-center rounded-[8px] border border-green bg-[rgba(128,178,48,0.04)]">
                <AssetImage src="/images/icons/icon-education-green.svg" alt="" width={60} height={60} className="h-[54px] w-[54px] object-contain"/>
              </div>
              <h4 className="mt-[26px] font-[family-name:var(--font-poppins)] text-[24px] font-light leading-[26px] text-text-body">
                {value.title}
              </h4>
              <p className="mt-2 max-w-[237px] font-[family-name:var(--font-poppins)] text-[14px] leading-[1.4] text-[rgba(130,130,130,0.7)]">
                {value.description}
              </p>
              <div className="mt-auto pt-6">
                {/* <Button  size="sm" className="gradient-orange border-0 text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)]">
                  Read More..
                </Button> */}
                <Link
              href="#"
              className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:h-11 sm:px-8 sm:text-base"
            >
              Read More..
            </Link>
              </div>
            </article>))}
        </div>
      </AboutContainer>
    </section>);
}
