import Image from "@/components/next/Image";
// import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { Button } from "@/components/ui/Button";
const introText = "We work together to uplift communities through compassion, action, sustainability, and long-term social impact. Driven by empathy, we support vulnerable communities by inspire hope and dignity. Professor. Social worker. Educationist. Economist. Activist. These are Pratham's leaders: visionaries dedicated to improving opportunities for children and youth in India. Here are some of the pillars of Pratham. We work together to uplift communities through compassion, action, sustainability, and long-term social impact. Driven by empathy, we support vulnerable communities by inspire hope and dignity. Professor. Social worker. Educationist. Economist. Activist. These are Pratham's leaders: visionaries dedicated to improving opportunities for children and youth in India. Here are some of the pillars of Pratham.";
const bioText = "Dr. Madhav Singh is Founder of Nalvalam Education Foundation, an organization that reaches over 7 million children and youth in India every year. After obtaining a PhD in chemistry from Ohio State University and working as a visiting faculty at the University of Houston, Dr. Madhav Chavan returned to India in 1986 to research and…";
const leadershipProfiles = [
    { nameSize: "40px", role: "Founder" },
    { nameSize: "55px" },
    { nameSize: "55px" },
    { nameSize: "55px" },
];
const trusteeFeatures = [
    {
        title: "Manage",
        description: "Dr. Madhav Singh is Founder of Nalvalam Education Foundation",
        align: "left",
    },
    {
        title: "Develop",
        description: "Dr. Madhav Singh is Founder of Nalvalam Education Foundation",
        align: "right",
    },
    {
        title: "Strategic Direction",
        description: "Dr. Madhav Singh is Founder of Nalvalam Education Foundation",
        align: "left",
    },
    {
        title: "Ambassadors",
        description: "Dr. Madhav Singh is Founder of Nalvalam Education Foundation",
        align: "right",
    },
];
function LeadershipCard({  role, }) {
    return (<article className="flex w-full max-w-[1276px] flex-col gap-8 bg-[#fafafa] p-6 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] sm:flex-row sm:items-start sm:gap-10 sm:p-[38px_32px] lg:h-[355px]">
      <div className="relative mx-auto h-[224px] w-full max-w-[349px] shrink-0 overflow-hidden shadow-[3px_4px_21.1px_0px_rgba(0,0,0,0.2)] sm:mx-0 sm:h-[292px]">
        <Image src="/images/leadership/founder-portrait.png" alt="Dr. Madav Signh" fill className="object-cover object-[center_20%]" sizes="436px"/>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="font-[family-name:var(--font-poppins)] font-light leading-[1.2] text-[30px] lg:text-[39px] text-green" >
          DR. Madav Signh
        </h3>
        {role ? (<p className="mt-1 font-[family-name:var(--font-lato)] text-[22px] leading-[1.2] text-[#525252] lg:text-[18px] lg:leading-[44px]">
            {role}
          </p>) : null}
        <p className="mt-4 font-[family-name:var(--font-poppins)] text-[16px] font-light leading-[25px] text-[#232222] lg:text-[18px] lg:leading-[26px]">
          {bioText}
        </p>
        <div className="mt-6">
          <Button variant="outline-orange" size="md">
            Read More..
          </Button>
        </div>
      </div>
    </article>);
}
function TrusteeIcon() {
    return (<div className="relative h-[150px] w-[150px] shrink-0">
      <Image src="/images/leadership/trustees-green-circle.svg" alt="" fill className="object-contain"/>
      <div className="absolute inset-0 flex items-center justify-center">
        <Image src="/images/leadership/trustees-corner-icon.png" alt="" width={119} height={119} className="h-[100px] w-[100px] object-contain "/>
      </div>
    </div>);
}
function TrusteeFeature({ title, description, align, }) {
    const isRight = align === "right";
    return (<div className={`flex items-center gap-6 lg:gap-10 ${isRight ? "flex-row-reverse text-right" : "flex-row text-left"}`}>
      <TrusteeIcon />
      <div className="min-w-0 flex-1">
        <h3 className="font-[family-name:var(--font-poppins)] text-[29px] font-light leading-[1.2] text-[#514c4c] lg:text-[30px] lg:leading-[44px]">
          {title}
        </h3>
        <p className="mt-2 font-[family-name:var(--font-poppins)] text-[16px] font-light leading-[26px] text-[#232222] lg:text-[18px]">
          {description}
        </p>
      </div>
    </div>);
}
export function LeadershipPage() {
    return (<main className="overflow-x-hidden bg-white">

      <section className="relative">
        <div className="relative mx-auto h-[266px] max-w-[1400px] overflow-hidden sm:h-[370px] lg:mt-[11px] lg:h-[446px]">
          <Image src="/images/leadership/hero-image.png" alt="Children in school uniforms cheering" fill className="object-cover w-full" sizes="1400px" priority/>
        </div>
        <div className="relative mx-auto max-w-[1400px] px-[27px] lg:absolute lg:inset-x-0 lg:bottom-[-36px] lg:px-[201px]">
          <h1 className="font-[family-name:var(--font-poppins)] text-[32px] font-light leading-[1.1] sm:text-[45px] lg:text-[60px] lg:leading-[43px]  text-center">
            <span className="text-[#545e69]">Founder &</span>{" "}
            <span className="text-green">Executive Lead</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-[27px] pt-16 lg:px-[86px] ">
        <div className="flex justify-center">
          {/* <Link href="#" className="inline-flex h-[65px] w-full max-w-[462px] items-center justify-center rounded-full gradient-orange px-8 font-[family-name:var(--font-poppins)] text-[25px] font-semibold uppercase leading-normal text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] sm:h-[81px] sm:text-[32px] lg:h-[102px] lg:text-[34px]">
            Introduction
          </Link> */}
          <Button size="lg">Introduction</Button>
        </div>
        <p className="mx-auto mt-10 max-w-[1160px] font-[family-name:var(--font-poppins)] text-[16px] font-light leading-[25px] text-[#8d8d8d] lg:mt-[47px] lg:text-[18px] lg:leading-[28px]">
          {introText}
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-[27px] py-16 lg:px-[59px] lg:py-[67px]">
        <div className="flex flex-col gap-[39px]">
          {leadershipProfiles.map((profile, index) => (<LeadershipCard key={index} nameSize={profile.nameSize} role={profile.role}/>))}
        </div>
      </section>

      <section className="bg-[rgba(247,183,13,0.04)] py-16 lg:py-[84px]">
        <div className="mx-auto max-w-[1400px] px-[27px] lg:px-[59px]">
          <h2 className="text-center font-[family-name:var(--font-poppins)] text-[34px] leading-[1.1] lg:text-[56px] lg:leading-[61px]">
            <span className="text-[#514c4c]">Our</span>{" "}
            <span className="font-light text-green">Trustees</span>
          </h2>

          <div className=" mx-auto mt-12  lg:mt-[40px]">
            <div className="flex justify-center items-center">
              <div className="relative h-[185px] w-[185px] lg:h-[230px] lg:w-[230px]">
                <Image src="/images/leadership/trustees-orange-circle.svg" alt="" fill className="object-contain"/>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="-rotate-[29.56deg]">
                    <Image src="/images/leadership/trustees-center-icon.png" alt="" width={160} height={160} className="h-[81px] w-[118px] object-contain  lg:h-[81x] lg:w-[168px]"/>
                  </div>
                  <p className="mt-2 font-[family-name:var(--font-poppins)] text-[25px] leading-[61px] text-white lg:text-[29px]">
                    Trustees
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-[70px] lg:gap-y-[50px] ">
              <TrusteeFeature {...trusteeFeatures[0]}/>
              <TrusteeFeature {...trusteeFeatures[1]}/>
              <TrusteeFeature {...trusteeFeatures[2]}/>
              <TrusteeFeature {...trusteeFeatures[3]}/>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </main>);
}
