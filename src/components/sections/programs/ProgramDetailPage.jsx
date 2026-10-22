import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { AssetImage } from "@/components/ui/AssetImage";

const galleryCorners = [
  "rounded-tl-[100px]",
  "",
  "rounded-tr-[100px]",
  "rounded-bl-[100px]",
  "",
  "rounded-br-[100px]",
];

function ObjectiveCard({ title, description }) {
  return (
    <article className="flex h-[273px] w-full max-w-[289px] flex-col rounded-[36px] bg-white px-[30px] pb-[28px] pt-[28px]">
      <div className="flex h-[77px] w-[77px] items-center justify-center rounded-[8px] border border-green bg-[rgba(128,178,48,0.04)] p-2">
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
      <p className="mb-3 mt-2 max-w-[237px] font-[family-name:var(--font-poppins)] text-[14px] leading-[1.4] text-[rgba(130,130,130,0.7)]">
        {description}
      </p>
      <div className="mt-auto">
        <Link
          href="/about/donate"
          className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:h-11 sm:px-8 sm:text-base"
        >
          Donate Now
        </Link>
      </div>
    </article>
  );
}

export function ProgramDetailPage({
  titleLead,
  titleRest,
  subtitle,
  heroImage,
  detailLead,
  detailRest,
  detailIntro,
  detailBody,
  detailImage,
  detailAlt,
  objectives,
  gallery,
}) {
  return (
    <main className="overflow-x-hidden bg-[#fafafa]">
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${heroImage}')`,
        }}
      >
        <section className="relative mt-[11px]">
          <div className="relative mx-auto flex h-[311px] max-w-[1400px] flex-col items-center justify-center overflow-hidden px-6 text-center text-white lg:h-[372px]">
            <h1 className="font-[family-name:var(--font-poppins)] text-[35px] leading-[1.1] lg:text-[65px]">
              <span className="font-semibold">{titleLead}</span> {titleRest}
            </h1>
            <p className="mb-5 mt-4 max-w-[616px] font-[family-name:var(--font-poppins)] text-[18px] font-light leading-[30px]">
              {subtitle}
            </p>
            <Link
              href="/about/donate"
              className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:px-8 sm:text-base"
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
              {detailLead}
              <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-green" />
            </span>{" "}
            {detailRest} <span className="text-green">Details</span>
          </h2>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:mt-[65px] lg:grid-cols-[510px_1fr] lg:gap-x-[65px]">
          <div className="relative mx-auto h-[266px] w-full max-w-[510px] overflow-hidden rounded-bl-[84px] rounded-tr-[84px] lg:mx-0 lg:h-[450px]">
            <Image
              src={detailImage}
              alt={detailAlt}
              fill
              className="object-cover"
              sizes="638px"
            />
          </div>
          <div className="lg:pt-8">
            <p className="font-[family-name:var(--font-poppins)] text-[26px] font-normal leading-[1.2] text-[#232222] lg:text-[24px] lg:leading-[39px]">
              {detailIntro}
            </p>
            <p className="mt-6 text-justify font-[family-name:var(--font-poppins)] text-[16px] font-light leading-[25px] text-[#3d3d3d] lg:mt-5 lg:text-[15px] lg:leading-[28px]">
              {detailBody}
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
              <ObjectiveCard key={objective.title} title={objective.title} description={objective.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-[27px] py-16 lg:px-[46px] lg:py-[84px]">
        <div className="relative mx-auto flex h-[118px] w-full max-w-[422px] items-center justify-center sm:h-[144px]">
          <h2 className="relative font-[family-name:var(--font-poppins)] text-[34px] leading-[61px] text-orange lg:text-[45px]">
            Gallery
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1301px] gap-5 sm:grid-cols-2 lg:mt-[47px] xl:grid-cols-3">
          {gallery.map((image, index) => (
            <div
              key={image.src}
              className={`relative aspect-[527/395] w-full overflow-hidden ${galleryCorners[index] ?? ""}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
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
