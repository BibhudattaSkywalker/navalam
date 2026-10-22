import Image from "@/components/next/Image";
import { AboutContainer } from "@/components/sections/about/AboutContainer";
// import { Section } from "@/components/ui/Section";
const stats = [
    { value: "2500+", label: "Our Explores" },
    { value: "2500+", label: "Our Explores" },
    { value: "2500+", label: "Our Explores" },
];
export function AboutStoryHero() {
    return (<section className="relative  lg:min-h-[600px] lg:pb-0">
      <AboutContainer className="">
        {/* <Section className=""> */}
          <p className=" font-[family-name:var(--font-poppins)] text-[20px] italic font-bold leading-none text-text-body ">
            <span className="font-light">Our </span>
            <span className="text-green">Story-</span>
          </p>

          <h1 className="mt-5 max-w-[922px] font-[family-name:var(--font-poppins)] text-[29px] font-light leading-[44px] text-foreground  lg:text-[45px]">
            Together We{" "}
            <span className="font-semibold text-green">Empower</span>
            <br />
            Lives <span className="font-normal">Compassion</span>
          </h1>

          <h4 className="mt-6 max-auto font-[family-name:var(--font-poppins)] text-[24px] font-light leading-[26px] text-foreground lg:mt-4 lg:text-[24px]">
            communities thrive when empathy, action
          </h4>

          <p className="mt-5 max-w-[526px] font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[20px] text-text-light">
            We work together to uplift communities through compassion, action,
            sustainability, and long-term social impact. Driven by empathy, we
            support vulnerable communities by inspire hope and dignity.
          </p>

          <div className="mt-8 flex flex-wrap justify-start  gap-3">
            {stats.map((stat, i) => (<div key={i} className="flex min-h-[72px] w-[168px] max-w-full flex-col justify-center  rounded-[8px] bg-[rgba(235,235,235,0.5)] px-4 py-4">
                <p className="font-[family-name:var(--font-poppins)] text-[26px] font-semibold leading-none text-orange">
                  {stat.value}
                </p>
                <p className="mt-1 font-[family-name:var(--font-poppins)] text-[14px] font-medium leading-5 text-orange">
                  {stat.label}
                </p>
              </div>))}
          </div>
        {/* </Section> */}

        {/* Figma frame coords: main x1086 y392, overlay x839 y493 */}
        <div className="relative mt-10 lg:absolute lg:right-[58px] lg:top-[100px] lg:mt-0 lg:h-[400px] lg:w-[462px] max-w-full">
          <div className="relative h-[240px] w-full overflow-hidden rounded-[19px] border-2 border-green sm:h-[296px] lg:h-[400px]">
            <Image src="/images/about/story-main.jpg" alt="Community members together" fill className="object-cover" sizes="578px"/>
          </div>
        </div>

        <div className="relative -mt-16 ml-[27px] h-[185px] w-[min(90%,306px)] overflow-hidden rounded-[19px] border-[3px] border-white shadow-[0px_4px_5.3px_0px_rgba(0,0,0,0.25)] sm:ml-0 sm:h-[224px] lg:absolute lg:left-[671px] lg:top-[200px] lg:mt-0 lg:ml-0 lg:h-[271px] lg:w-[306px] max-w-full">
          <Image src="/images/about/story-overlay.jpg" alt="Children raising hands" fill className="object-cover" sizes="383px"/>
        </div>
      </AboutContainer>
    </section>);
}
