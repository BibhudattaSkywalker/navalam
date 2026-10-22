import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
const paragraphOne =
  "At Nalvalam Foundation, we are committed to addressing hunger and food insecurity among underprivileged communities. Our food distribution drive focuses on delivering nutritious and essential food supplies to families who struggle to meet their daily needs. Through this initiative, we aim to ensure dignity, care, and nourishment for every individual we serve.At Nalvalam Foundation, we are committed to addressing hunger and food insecurity among .";
const paragraphTwo =
  "Millions of families continue to face food shortages due to economic challenges, natural disasters, and lack of resources. This program is designed to support vulnerable households by providing timely food assistance, reducing hunger, and promoting better health and well-being within communities.";
const impactParagraph =
  "This initiative has positively impacted numerous families by providing consistent access to food. Beyond meeting immediate needs, our efforts help communities feel supported and empowered. The smiles, gratitude, and improved well-being of families motivate us to continue expanding this program.";
function DonateButton({ href = "/about/donate/one-time", className = "" }) {
  return (
    <Link
      href={href}
      className={`inline-flex h-[45px] w-[176px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[15px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] transition-opacity hover:opacity-90 ${className}`}
    >
      Donate Now
    </Link>
  );
}
export function NewsAnnouncementsPage() {
  return (
    <main className="overflow-x-hidden bg-[#fafafa]">
<div
  className="bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('/images/news-announcements/hero.png')
    `,
  }}
>
  <section className="relative">
    <div className="relative mx-auto flex h-[311px] max-w-[1400px] flex-col items-center justify-center overflow-hidden px-6 text-center text-white lg:h-[450px]">
      <h1 className="max-w-[939px] font-[family-name:var(--font-poppins)] text-[34px] leading-[1.1] lg:text-[60px] lg:leading-[44px]">
        <span className="font-medium">News</span>
        <span className="font-light"> & announcements</span>
      </h1>

      <p className="mt-4 max-w-[594px] font-[family-name:var(--font-poppins)] text-[18px] font-light leading-[20px] lg:mt-6 lg:text-[15px]">
        Nourishing young lives for healthy growth and brighter futures.
      </p>

      <DonateButton className="mt-8" />
    </div>
  </section>
</div>
      <section className="bg-[#f8f6f6] py-16 lg:py-[84px]">
        <div className="mx-auto max-w-[1400px] px-[27px] lg:px-[46px]">
          <div className="grid items-center gap-10 lg:grid-cols-[510px_1fr] lg:gap-x-[65px]">
            <div className="relative mx-auto h-[266px] w-full max-w-[510px] overflow-hidden rounded-[21px] lg:mx-0 lg:h-[423px]">
              <Image
                src="/images/news-announcements/food-distribution.png"
                alt="Volunteers packing food donation boxes"
                fill
                className="object-cover object-[20%_center]"
                sizes="638px"
              />
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-poppins)] text-[26px] font-light leading-[1.2] text-[#232222] lg:text-[24px] lg:leading-[45px]">
                <span>Providing </span>
                <span className="font-normal text-green">Nutritious Food</span>
                <span className="font-normal"> </span>
                <span>to Families in Need</span>
              </h2>

              <p className="mt-4 font-[family-name:var(--font-poppins)] text-[16px] font-light leading-[28px] text-[#3d3d3d] text-justify lg:text-[15px]">
                {paragraphOne}
              </p>
              <h3 className="mt-12 text-start font-[family-name:var(--font-poppins)] text-[25px] font-light leading-[1.2] text-[#514c4c] lg:mt-5 lg:text-[24px] lg:leading-[61px]">
                <span>Why This </span>
                <span className="text-green">Initiative Matters</span>
              </h3>
              <p className="mt-6 font-[family-name:var(--font-poppins)] text-[16px] font-light leading-[28px] text-[#3d3d3d] text-justify lg:text-[15px]">
                {paragraphTwo}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-[84px]">
        <div className="mx-auto max-w-[1400px] px-[27px] lg:px-[46px]">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_510px] lg:gap-x-[65px]">
            <div className="order-2 lg:order-1">
              <h2 className="font-[family-name:var(--font-poppins)] text-[26px] font-light leading-[1.2] text-[#232222] lg:text-[45px] lg:leading-[45px]">
                <span>How the </span>
                <span className="font-medium text-green">
                  Distribution Process
                </span>
                <span> Works</span>
              </h2>
              <p className="mt-5 font-[family-name:var(--font-poppins)] text-[16px] font-light leading-[28px] text-[#3d3d3d] text-justify lg:text-[15px]">
                {paragraphOne}
              </p>{" "}
              <div className="mt-5">
                <h3 className="font-[family-name:var(--font-poppins)] text-[25px] font-medium leading-[1.2] text-[#514c4c] lg:text-[24px] lg:leading-[61px]">
                  Community Impact
                </h3>
                <div className="mt-2 h-[2px] w-[85px] bg-green" />
              </div>
              <p className="mt-6 font-[family-name:var(--font-poppins)] text-[16px] font-light leading-[28px] text-[#3d3d3d] text-justify lg:text-[15px]">
                {impactParagraph}
              </p>
            </div>

            <div className="relative order-1 mx-auto h-[266px] w-full max-w-[510px] overflow-hidden rounded-[21px] lg:order-2 lg:mx-0 lg:h-[450px]">
              <Image
                src="/images/news-announcements/community-child.png"
                alt="Smiling child supported by food distribution"
                fill
                className="object-cover"
                sizes="638px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="relative mx-auto h-[311px] max-w-[1400px] overflow-hidden lg:h-[461px]">
          <Image
            src="/images/news-announcements/cta-banner.png"
            alt="Newspaper collage background"
            fill
            className="object-cover"
            sizes="1400px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.4)] to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-center px-[27px] lg:px-[72px]">
            <h2 className="max-w-[717px] font-[family-name:var(--font-poppins)] text-[29px] font-medium leading-[1.15] text-white lg:text-[45px] lg:leading-[45px]">
              Today Latest News For NGO Mobilizes
            </h2>
            <p className="mt-4 max-w-[654px] font-[family-name:var(--font-poppins)] text-[18px] font-light leading-[26px] text-white lg:mt-6 lg:text-[15px]">
              Help us deliver nutritious food to more families in need. Your
              support can make a meaningful difference in someone&apos;s life.
            </p>
            <DonateButton className="mt-8" />
          </div>
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
}
