import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
const paragraphOne =
  "At Nalvalam Foundation, we are committed to addressing hunger and food insecurity among underprivileged communities. Our food distribution drive focuses on delivering nutritious and essential food supplies to families who struggle to meet their daily needs. Through this initiative, we aim to ensure dignity, care, and nourishment for every individual we serve.At Nalvalam Foundation, we are committed to addressing hunger and food insecurity among .";
const paragraphTwo =
  "Millions of families continue to face food shortages due to economic challenges, natural disasters, and lack of resources. This program is designed to support vulnerable households by providing timely food assistance, reducing hunger, and promoting better health and well-being within communities.";
const impactParagraph =
  "This initiative has positively impacted numerous families by providing consistent access to food. Beyond meeting immediate needs, our efforts help communities feel supported and empowered. The smiles, gratitude, and improved well-being of families motivate us to continue expanding this program.";
// const leftCircles = [
//   "/images/food-distribution/circle-1.png",
//   "/images/food-distribution/circle-3.png",
//   "/images/food-distribution/circle-2.png",
//   "/images/food-distribution/circle-4.png",
// ];
// const rightCircles = [
//   "/images/food-distribution/circle-5.png",
//   "/images/food-distribution/circle-7.png",
//   "/images/food-distribution/circle-6.png",
//   "/images/food-distribution/circle-8.png",
// ];
function DonateButton({ href = "/about/donate/one-time", className = "" }) {
  return (
    <Link
      href={href}
      className={`inline-flex h-[50px] w-[170px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[15px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] transition-opacity hover:opacity-90 ${className}`}
    >
      Donate Now
    </Link>
  );
}
// function CircleImageGrid({ images }) {
//   return (
//     <div className="grid w-full max-w-[480px] grid-cols-2 gap-x-[18px] gap-y-[18px]">
//       {images.map((src) => (
//         <div
//           key={src}
//           className="relative mx-auto aspect-square w-full max-w-[233px] overflow-hidden rounded-br-[126px] rounded-tl-[126px] rounded-tr-[126px]"
//         >
//           <Image src={src} alt="" fill className="object-cover" sizes="291px" />
//         </div>
//       ))}
//     </div>
//   );
// }
// function OrangePlusDivider() {
//   return (
//     <div className="relative mx-auto mt-12 flex h-[108px] w-[108px] items-center justify-center lg:mt-16">
//       <div className="absolute h-[108px] w-[2px] bg-orange" />
//       <div className="absolute h-[2px] w-[78px] bg-orange" />
//     </div>
//   );
// }
export function FoodDistributionDrivePage() {
  return (
    <main className="overflow-x-hidden bg-[#fafafa]">
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('/images/food-distribution/hero.png')
    `,
        }}
      >
        <section className="relative">
          <div className="relative mx-auto flex h-[311px] max-w-[1400px] flex-col items-center justify-center overflow-hidden px-6 text-center text-white lg:h-[450px]">
            <h1 className="max-w-[864px] font-[family-name:var(--font-poppins)] text-[35px] leading-[1.1] lg:text-[65px] lg:leading-[26px]">
              <span className="font-medium">Food</span>
              <span className="font-normal"> Distribution Drive</span>
            </h1>

            <p className="mt-6 max-w-[594px] font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[20px] lg:mt-8 lg:text-[15px] mb-5">
              Nourishing young lives for healthy growth and brighter futures.
            </p>

            {/* <DonateButton className="mt-8" /> */}
                  <Link
              href="/about/donate/one-time"
              className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:h-11 sm:px-8 sm:text-base"
            >
              Donate Now
            </Link>
          </div>
        </section>
      </div>
      <section className="py-16 lg:py-[84px]">
        <div className="mx-auto max-w-[1400px] px-[27px] lg:px-[46px]">
          <div className="grid items-center gap-10 lg:grid-cols-[390px_minmax(0,1fr)] lg:gap-x-[65px]">
            {/* LEFT IMAGE DESIGN */}
            <div className="mx-auto grid w-full max-w-[390px] grid-cols-2 gap-[10px]">
              {/* Top Left */}
              <div
                className="
            relative aspect-square overflow-hidden
            rounded-tl-[999px]
            rounded-tr-[999px]
            rounded-bl-[999px]
          "
              >
                <Image
                  src="/images/food-distribution/circle-1.png"
                  alt="Food distribution"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 190px"
                />
              </div>

              {/* Top Right */}
              <div
                className="
            relative aspect-square overflow-hidden
            rounded-tl-[999px]
            rounded-tr-[999px]
            rounded-br-[999px]
          "
              >
                <Image
                  src="/images/food-distribution/circle-3.png"
                  alt="Children receiving nutritious food"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 190px"
                />
              </div>

              {/* Bottom Left */}
              <div
                className="
            relative aspect-square overflow-hidden
            rounded-tl-[999px]
            rounded-bl-[999px]
            rounded-br-[999px]
          "
              >
                <Image
                  src="/images/food-distribution/circle-2.png"
                  alt="Children eating food"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 190px"
                />
              </div>

              {/* Bottom Right */}
              <div
                className="
            relative aspect-square overflow-hidden
            rounded-tr-[999px]
            rounded-bl-[999px]
            rounded-br-[999px]
          "
              >
                <Image
                  src="/images/food-distribution/circle-4.png"
                  alt="Community food initiative"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 190px"
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <h2
                className="
            font-[family-name:var(--font-poppins)]
            text-[26px]
            font-light
            leading-[1.25]
            text-[#232222]
            lg:text-[35px]
            lg:leading-[45px]
          "
              >
                Providing{" "}
                <span className="font-normal text-green">Nutritious Food</span>{" "}
                to
                <br className="hidden xl:block" /> Families in Need
              </h2>

              <p
                className="
            mt-5
            font-[family-name:var(--font-poppins)]
            text-[15px]
            font-light
            leading-[1.55]
            text-[#3d3d3d]
            lg:text-justify
          "
              >
                {paragraphOne}
              </p>

              <h3
                className="
            mt-7
            font-[family-name:var(--font-poppins)]
            text-[25px]
            font-light
            leading-[1.3]
            text-[#514c4c]
            lg:text-[25px]
          "
              >
                Why This <span className="text-green">Initiative Matters</span>
              </h3>

              <p
                className="
            mt-4
            font-[family-name:var(--font-poppins)]
            text-[15px]
            font-light
            leading-[1.55]
            text-[#3d3d3d]
            lg:text-justify
          "
              >
                {paragraphTwo}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-[84px]">
        <div className="mx-auto max-w-[1400px] px-[27px] lg:px-[46px]">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-x-[65px]">
            {/* LEFT CONTENT */}
            <div>
              <h2
                className="
            font-[family-name:var(--font-poppins)]
            text-[26px]
            font-light
            leading-[1.25]
            text-[#232222]
            lg:text-[35px]
            lg:leading-[45px]
          "
              >
                How the{" "}
                <span className="font-normal text-green">Distribution Process</span>
              </h2>

              <p
                className="
            mt-5
            font-[family-name:var(--font-poppins)]
            text-[15px]
            font-light
            leading-[1.55]
            text-[#3d3d3d]
            lg:text-justify
          "
              >
                {impactParagraph}
              </p>

              <h3
                className="
            mt-7
            font-[family-name:var(--font-poppins)]
            text-[25px]
            font-light
            leading-[1.3]
            text-[#514c4c]
            lg:text-[25px]
          "
              >
                Community  <span className="text-green">Impact</span>
              </h3>

              <p
                className="
            mt-4
            font-[family-name:var(--font-poppins)]
            text-[15px]
            font-light
            leading-[1.55]
            text-[#3d3d3d]
            lg:text-justify
          "
              >
                {impactParagraph}
              </p>
            </div>

            {/* RIGHT IMAGE DESIGN */}
            <div className="mx-auto grid w-full max-w-[390px] grid-cols-2 gap-[10px]">
              {/* Top Left */}
              <div
                className="
            relative aspect-square overflow-hidden
            rounded-tl-[999px]
            rounded-tr-[999px]
            rounded-bl-[999px]
          "
              >
                <Image
                  src="/images/food-distribution/circle-1.png"
                  alt="Food distribution"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 190px"
                />
              </div>

              {/* Top Right */}
              <div
                className="
            relative aspect-square overflow-hidden
            rounded-tl-[999px]
            rounded-tr-[999px]
            rounded-br-[999px]
          "
              >
                <Image
                  src="/images/food-distribution/circle-3.png"
                  alt="Children receiving nutritious food"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 190px"
                />
              </div>

              {/* Bottom Left */}
              <div
                className="
            relative aspect-square overflow-hidden
            rounded-tl-[999px]
            rounded-bl-[999px]
            rounded-br-[999px]
          "
              >
                <Image
                  src="/images/food-distribution/circle-2.png"
                  alt="Children eating food"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 190px"
                />
              </div>

              {/* Bottom Right */}
              <div
                className="
            relative aspect-square overflow-hidden
            rounded-tr-[999px]
            rounded-bl-[999px]
            rounded-br-[999px]
          "
              >
                <Image
                  src="/images/food-distribution/circle-4.png"
                  alt="Community food initiative"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 190px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="pb-16 lg:pb-[67px]">
        <div className="mx-auto max-w-[1400px] px-[27px] lg:px-[46px]">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,480px)] lg:gap-x-[65px]">
            <div className="order-2 lg:order-1">
              <h2 className="font-[family-name:var(--font-poppins)] text-[26px] font-light leading-[1.2] text-[#232222] lg:text-[35px] lg:leading-[45px]">
                <span>How the </span>
                <span className="font-medium text-green">
                  Distribution Process
                </span>
                <span> Works</span>
              </h2>
              <div className="mt-2 h-[2px] w-[85px] bg-green" />
              <p className="mt-8 text-justify font-[family-name:var(--font-poppins)] text-[16px] font-light leading-[28px] text-[#3d3d3d] lg:text-[15px]">
                {paragraphOne}
              </p>
              <div className="mt-8">
                <h3 className="font-[family-name:var(--font-poppins)] text-[25px] font-medium leading-[1.2] text-[#514c4c] lg:text-[35px] lg:leading-[61px]">
                  Community Impact
                </h3>
              </div>
              <p className="mt-6 text-justify font-[family-name:var(--font-poppins)] text-[16px] font-light leading-[28px] text-[#3d3d3d] lg:text-[15px]">
                {impactParagraph}
              </p>
            </div>

            <div className="order-1 lg:order-2"> */}
              {/* <CircleImageGrid images={rightCircles} /> */}
            {/* </div>
          </div> */}

          {/* <OrangePlusDivider /> */}
        {/* </div>
      </section> */}

      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
      linear-gradient(
        to right,
        rgba(0, 0, 0, 0.8),
        rgba(0, 0, 0, 0.4),
        transparent
      ),
      url('/images/food-distribution/cta-banner.png')
    `,
        }}
      >
        <section className="relative">
          <div className="relative mx-auto flex h-[311px] max-w-[1400px] flex-col justify-center py-3 overflow-hidden px-[27px] lg:h-[461px] lg:px-[46px]">
            <h2 className="max-w-[763px] font-[family-name:var(--font-poppins)] text-[29px] font-medium leading-[1.15] text-white lg:text-[45px] lg:leading-[45px]">
              Support Our Food Distribution Drive Team
            </h2>

            <p className="mt-4 max-w-[654px] font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[26px] text-white lg:mt-6 lg:text-[15px]">
              Help us deliver nutritious food to more families in need. Your
              support can make a meaningful difference in someone&apos;s life.
            </p>

            <DonateButton className="mt-5" />
            {/* <Link
              href="#"
              className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:h-11 sm:px-8 sm:text-base"
            >
              Donate Now
            </Link> */}
          </div>
        </section>
      </div>
      <NewsletterSection />
    </main>
  );
}
