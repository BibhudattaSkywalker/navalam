import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
// import { Button } from "@/components/ui/Button";
const valueCards = Array.from({ length: 5 }, (_, index) => ({
    id: index,
    title: "Food supplies",
    description: "Make a one-time contribution and change a life today",
}));
function GradientCta({ href = "#", children, className = "", }) {
    return (<Link href={href} className={`inline-flex items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] ${className}`}>
      {children}
    </Link>);
}
function ValueCard({ title, description, }) {
    return (<article className="flex h-[335px] w-full max-w-[339px] flex-col items-center rounded-[37px] bg-white px-8 pb-10 pt-6 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
      <div className="relative h-[110px] w-[110px] shrink-0">
        <Image src="/images/vision/value-icon-circle.svg" alt="" fill className="object-contain"/>
        <div className="absolute inset-0 flex items-center justify-center">
          <Image src="/images/vision/value-icon.png" alt="" width={60} height={50} className="h-[45px] w-[54px] object-contain"/>
        </div>
      </div>
      <h3 className="mt-5 text-center font-[family-name:var(--font-poppins)] text-[25px] font-normal leading-[1.2] text-green lg:mt-6 lg:text-[28px]">
        {title}
      </h3>
      <p className="mx-auto mt-1 max-w-[282px] text-center font-[family-name:var(--font-poppins)] text-[18px] font-light leading-[22px] text-[#232222] lg:text-[18px]">
        {description}
      </p>
      <div className="mt-auto pt-6">
        <GradientCta href="/about/donate/one-time" className="h-[40px] w-[150px] text-[15px] leading-normal">
          Donate Now
        </GradientCta>
        
      </div>
    </article>);
}
export function VisionPage() {
    return (<main className="overflow-x-hidden bg-[#fafafa]">

      <section className="pt-14 lg:pt-[114px]">
        <div className="mx-auto max-w-[1400px] px-[27px] lg:px-[41px]">
          <h1 className="text-center font-[family-name:var(--font-lato)] text-[36px] leading-[1.05] text-green lg:text-[60px] lg:leading-[67px]">
            Our Vision
          </h1>
          <p className="mx-auto mt-5 max-w-[632px] text-center font-[family-name:var(--font-lato)] text-[22px] leading-[30px] text-[#232222] lg:text-[27px]">
            Our initiatives reach people across different regions, driven by
            compassion and purpose.
          </p>
          <div className="mt-6 flex justify-center">
            <GradientCta href="/about/get-involved" className="h-[50px] w-[180px] text-[17px] leading-normal">
              Join Our Mission
            </GradientCta>
            {/* <Button  size="lg" className="gradient-orange border-0 text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)]">
                  Join Our Mission
                </Button> */}
          </div>
        </div>
      </section>

      <section className="mt-10 lg:mt-[40px]">
        <div className="relative mx-auto h-[311px] max-w-[1400px] overflow-hidden lg:h-[714px]">
          <Image src="/images/vision/hero-image.png" alt="Children smiling and raising their hands" fill className="object-cover" sizes="1400px" priority/>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-[27px] pb-16 pt-16 lg:px-[248px] lg:pb-[96px] lg:pt-[84px]">
        <p className="text-center font-[family-name:var(--font-lato)] text-[34px] leading-[1.1] text-black lg:text-[60px] lg:leading-[67px]">
          Our <span className="text-green">Long-Term Dream</span>
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

      <section className="mx-auto max-w-[1400px] px-[27px] pb-16 lg:px-[46px] lg:pb-[123px]">
        <div className="rounded-[10px] bg-[#e2ecd2] px-6 py-8 lg:min-h-[805px] lg:px-[30px] lg:py-[32px]">
          <div className="rounded-[15px] bg-green px-6 py-10 lg:min-h-[758px] lg:px-[70px] lg:py-[32px]">
            <h2 className="text-center font-[family-name:var(--font-lato)] text-[32px] font-medium leading-[1.15] text-white lg:text-[42px] lg:leading-[67px]">
              Our Core Values
            </h2>
            <div className="mx-auto mt-8 grid max-w-[1093px] justify-items-center gap-x-[62px] gap-y-[47px] sm:grid-cols-2 lg:mt-[34px] xl:grid-cols-[repeat(3,339px)] xl:justify-center">
              {valueCards.map((card) => (<ValueCard key={card.id} title={card.title} description={card.description}/>))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-[27px] py-16 text-center lg:py-[100px]">
        <h2 className="font-[family-name:var(--font-lato)] text-[32px] font-light leading-[1.15] text-black lg:text-[45px] lg:leading-[67px]">
          Together,{" "}
          <span className="font-medium text-green">we build a future of hope</span>
        </h2>
        <div className="mt-8 flex justify-center lg:mt-[39px]">
          <GradientCta href="/about/donate" className="h-[50px] w-[180px] text-[17px] leading-normal">
            Support Our Cause
          </GradientCta>
        </div>
      </section>

      <NewsletterSection />
    </main>);
}
