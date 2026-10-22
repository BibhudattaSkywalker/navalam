import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

function DonateButton({ className = "" }) {
  return (
    <Link
      href="/about/donate"
      className={`inline-flex h-[50px] w-[170px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[15px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] transition-opacity hover:opacity-90 ${className}`}
    >
      Donate Now
    </Link>
  );
}

function CircleGrid({ images }) {
  const shapes = [
    "rounded-tl-[999px] rounded-tr-[999px] rounded-bl-[999px]",
    "rounded-tl-[999px] rounded-tr-[999px] rounded-br-[999px]",
    "rounded-tl-[999px] rounded-bl-[999px] rounded-br-[999px]",
    "rounded-tr-[999px] rounded-bl-[999px] rounded-br-[999px]",
  ];

  return (
    <div className="mx-auto grid w-full max-w-[390px] grid-cols-2 gap-[10px]">
      {images.map((image, index) => (
        <div
          key={image.src}
          className={`relative aspect-square overflow-hidden ${shapes[index]}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 45vw, 190px"
          />
        </div>
      ))}
    </div>
  );
}

export function InitiativeDetailPage({
  heroTitleLead,
  heroTitleRest,
  heroSubtitle,
  heroImage,
  introBefore,
  introHighlight,
  introAfter,
  introBody,
  whyBody,
  processBefore,
  processHighlight,
  processBody,
  impactBody,
  ctaTitle,
  ctaBody,
  images,
}) {
  return (
    <main className="overflow-x-hidden bg-[#fafafa]">
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${heroImage}')`,
        }}
      >
        <section className="relative">
          <div className="relative mx-auto flex min-h-[340px] max-w-[1400px] flex-col items-center justify-center px-6 py-12 text-center text-white lg:min-h-[450px]">
            <h1 className="max-w-[864px] font-[family-name:var(--font-poppins)] text-[35px] leading-tight lg:text-[60px]">
              <span className="font-medium">{heroTitleLead}</span>
              <span className="font-normal"> {heroTitleRest}</span>
            </h1>
            <p className="mt-6 max-w-[594px] font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[20px] lg:mt-8">
              {heroSubtitle}
            </p>
            <Link
              href="/about/donate"
              className="gradient-orange mt-5 inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:px-8 sm:text-base"
            >
              Donate Now
            </Link>
          </div>
        </section>
      </div>

      <section className="py-16 lg:py-[84px]">
        <div className="mx-auto max-w-[1400px] px-[27px] lg:px-[46px]">
          <div className="grid items-center gap-10 lg:grid-cols-[390px_minmax(0,1fr)] lg:gap-x-[65px]">
            <CircleGrid images={images} />
            <div>
              <h2 className="font-[family-name:var(--font-poppins)] text-[26px] font-light leading-[1.25] text-[#232222] lg:text-[35px] lg:leading-[45px]">
                {introBefore}{" "}
                <span className="font-normal text-green">{introHighlight}</span>{" "}
                {introAfter}
              </h2>
              <p className="mt-5 font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[1.55] text-[#3d3d3d] lg:text-justify">
                {introBody}
              </p>
              <h3 className="mt-7 font-[family-name:var(--font-poppins)] text-[25px] font-light leading-[1.3] text-[#514c4c]">
                Why This <span className="text-green">Initiative Matters</span>
              </h3>
              <p className="mt-4 font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[1.55] text-[#3d3d3d] lg:text-justify">
                {whyBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-[84px]">
        <div className="mx-auto max-w-[1400px] px-[27px] lg:px-[46px]">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-x-[65px]">
            <div>
              <h2 className="font-[family-name:var(--font-poppins)] text-[26px] font-light leading-[1.25] text-[#232222] lg:text-[35px] lg:leading-[45px]">
                {processBefore}{" "}
                <span className="font-normal text-green">{processHighlight}</span>
              </h2>
              <p className="mt-5 font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[1.55] text-[#3d3d3d] lg:text-justify">
                {processBody}
              </p>
              <h3 className="mt-7 font-[family-name:var(--font-poppins)] text-[25px] font-light leading-[1.3] text-[#514c4c]">
                Community <span className="text-green">Impact</span>
              </h3>
              <p className="mt-4 font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[1.55] text-[#3d3d3d] lg:text-justify">
                {impactBody}
              </p>
            </div>
            <CircleGrid images={images} />
          </div>
        </div>
      </section>

      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), transparent),
            url('/images/food-distribution/cta-banner.png')
          `,
        }}
      >
        <section className="relative">
          <div className="relative mx-auto flex min-h-[311px] max-w-[1400px] flex-col justify-center px-[27px] py-10 lg:min-h-[461px] lg:px-[46px]">
            <h2 className="max-w-[763px] font-[family-name:var(--font-poppins)] text-[29px] font-medium leading-[1.15] text-white lg:text-[45px]">
              {ctaTitle}
            </h2>
            <p className="mt-4 max-w-[654px] font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[26px] text-white lg:mt-6">
              {ctaBody}
            </p>
            <DonateButton className="mt-5" />
          </div>
        </section>
      </div>

      <NewsletterSection />
    </main>
  );
}
