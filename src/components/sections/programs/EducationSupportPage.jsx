import Image from "@/components/next/Image";
// import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { AssetImage } from "@/components/ui/AssetImage";
// import { Button } from "@/components/ui/Button";
import Link from "@/components/next/Link";
const detailsBody =
  "The Y4D Health Care Initiative through Health Camps is an essential program that aims to provide top-notch medical services and equipment at no cost as well as educate participants on how to identify and treat common diseases to improve the physical and mental wellbeing of every citizen. Health camps have been held under the meticulous oversight of technical staff and medical professionals. In order to have a significant impact and execute effectively on the ground, the health camps are carried out with a proper structure and precise planning based on a baseline survey. For the past two years, Y4D has been diligently pursuing its mission to improve the nation's disadvantaged population's access to high-quality healthcare facilities.";
const objectives = [
  { title: "Free learning material" },
  { title: "Volunteer teachers" },
  { title: "After-school support" },
  { title: "School readiness" },
];
const galleryImages = [
  {
    src: "/images/education-support/gallery-1.png",
    className: "rounded-tl-[100px]",
  },
  { src: "/images/education-support/gallery-2.png", className: "" },
  {
    src: "/images/education-support/gallery-3.png",
    className: "rounded-tr-[100px]",
  },
  {
    src: "/images/education-support/gallery-4.png",
    className: "rounded-bl-[100px]",
  },
  { src: "/images/education-support/gallery-5.png", className: "" },
  {
    src: "/images/education-support/gallery-6.png",
    className: "rounded-br-[100px]",
  },
];
function ObjectiveCard({ title }) {
  return (
    <article className="flex h-[273px] w-full max-w-[289px] flex-col rounded-[36px] bg-white px-[30px] pb-[28px] pt-[28px]">
      <div className="flex h-[77px] w-[77px] items-center justify-center rounded-[8px] p-2 border border-green bg-[rgba(128,178,48,0.04)]">
        <AssetImage
          src="/images/education-support/objective-icon-composite.png"
          alt=""
          width={60}
          height={60}
          className="h-[45px] w-[45px] object-contain"
        />
      </div>
      <h3 className="mt-[26px] font-[family-name:var(--font-poppins)] text-[20px] font-medium leading-[26px] text-[#514c4c]">
        {title}
      </h3>
      <p className="mt-2 max-w-[237px] font-[family-name:var(--font-poppins)] text-[14px] leading-[1.4] text-[rgba(130,130,130,0.7)] mb-3">
        Serving Society By Improving Lives Through Kindness, Care,
      </p>
      <div className="mt-auto ">
        {/* <Button variant="outline-orange" className="h-[50px] w-[154px] px-0 text-[22px] leading-normal">
          Donate
        </Button> */}
        {/* <Button size="lg" className="mt-5">
          Donate Now
        </Button> */}
              <Link
              href="/about/donate/one-time"
              className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:h-11 sm:px-8 sm:text-base"
            >
              Donate Now
            </Link>
      </div>
    </article>
  );
}
export function EducationSupportPage() {
  return (
    <main className="overflow-x-hidden bg-[#fafafa]">
<div
  className="bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('/images/education-support/hero.png')
    `,
  }}
>
  <section className="relative mt-[11px]">
    <div className="relative mx-auto flex h-[311px] max-w-[1400px] flex-col items-center justify-center overflow-hidden px-6 text-center text-white lg:h-[372px]">
      <h1 className="font-[family-name:var(--font-poppins)] text-[35px] leading-[1.1] lg:text-[65px]">
        <span className="font-semibold">Education</span> Support
      </h1>

      <p className="mt-4 mb-5 max-w-[616px] font-[family-name:var(--font-poppins)] text-[18px] font-light leading-[30px] lg:text-[18px]">
        Empowering underprivileged children through quality education
      </p>

      {/* <Button size="lg" className="mt-5">
        Donate Now
      </Button> */}
      <Link
              href="/about/donate/one-time"
              className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:h-11 sm:px-8 sm:text-base"
            >
              Donate Now
            </Link>
    </div>
  </section>
</div>
      <section className="mx-auto max-w-[1400px] px-[27px] py-16 lg:px-[46px] lg:py-[84px]">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-poppins)] text-[32px] leading-[1.1] text-[#232222] lg:text-[45px] lg:leading-[61px]">
            <span className="relative inline-block font-medium">
              Education
              <span className="absolute -bottom-2 left-0 h-[2px] w-[102px] bg-green" />
            </span>{" "}
            Support <span className="text-green">Details</span>
          </h2>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:mt-[65px] lg:grid-cols-[510px_1fr] lg:gap-x-[65px]">
          <div className="relative flex justify-center items-center mx-auto h-[266px] w-full max-w-[510px] overflow-hidden rounded-bl-[84px] rounded-tr-[84px] lg:mx-0 lg:h-[450px]">
            <Image
              src="/images/education-support/details.png"
              alt="Students reading together"
              cover
              className="object-cover"
              sizes="638px"
            />
          </div>
          <div className="lg:pt-8">
            <p className="font-[family-name:var(--font-poppins)] text-[26px] font-normal leading-[1.2] text-[#232222] lg:text-[24px] lg:leading-[39px]">
              Education is the foundation of a strong society.
            </p>
            <p className="mt-6 text-justify font-[family-name:var(--font-poppins)] text-[16px] font-light leading-[25px] text-[#3d3d3d] lg:mt-5 lg:text-[15px] lg:leading-[28px]">
              {detailsBody}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f6f6] py-16 lg:py-[66px]">
        <div className="mx-auto max-w-[1400px] px-[27px] lg:pl-[93px] lg:pr-[62px]">
          <h2 className="font-[family-name:var(--font-poppins)] text-[29px] font-medium leading-[1.1] lg:text-[34px] lg:leading-[61px]">
            <span className="text-green">Objectives</span>{" "}
            <span className="font-light text-[#514c4c]">& What We Do</span>
          </h2>
          <div className="mt-[85px] grid gap-[21px] sm:grid-cols-2 xl:grid-cols-[repeat(4,289px)] xl:justify-start">
            {objectives.map((objective) => (
              <ObjectiveCard key={objective.title} title={objective.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-[27px] py-16 lg:px-[46px] lg:py-[84px]">
        <div className="relative mx-auto flex h-[118px] w-full max-w-[422px] items-center justify-center sm:h-[144px]">
          {/* <div className="absolute inset-0 rounded-bl-[84px] rounded-tr-[84px] border border-orange"/>
          <span className="absolute -left-3 top-8 hidden h-[108px] w-px bg-orange lg:block"/>
          <span className="absolute -left-3 top-8 hidden h-px w-[78px] bg-orange lg:block"/>
          <span className="absolute -right-3 bottom-8 hidden h-[108px] w-px bg-orange lg:block"/>
          <span className="absolute -right-3 bottom-8 hidden h-px w-[78px] bg-orange lg:block"/> */}
          <h2 className="relative font-[family-name:var(--font-poppins)] text-[34px] leading-[61px] text-orange lg:text-[45px]">
            Gallery
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1301px] gap-5 sm:grid-cols-2 lg:mt-[47px] xl:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-[527/395] w-full overflow-hidden ${image.className}`}
            >
              <Image
                src={image.src}
                alt={`Education support gallery image ${index + 1}`}
                fill
                className="object-cover"
                sizes="527px"
              />
            </div>
          ))}
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
}
