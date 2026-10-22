import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { AssetImage } from "@/components/ui/AssetImage";
import { Button } from "@/components/ui/Button";
const heroDescription = "We work together to uplift communities through compassion, action, sustainability, and long-term social impact. Driven by empathy, we support vulnerable communities by inspire hope and dignity.  Driven by empathy, we support vulnerable communities by inspire hope and dignity.";
const programs = [
    {
        title: "Education Support",
        image: "/images/programs/education-support.png",
        href: "/about/programs/education-support",
    },
    {
        title: "Health & Wellness",
        image: "/images/programs/health-wellness.png",
        href: "/about/programs/health-wellness",
    },
    {
        title: "Community Development",
        image: "/images/programs/community-development.png",
        href: "/about/programs/community-development",
    },
    {
        title: "Supporting Farmers",
        image: "/images/programs/supporting-farmers.png",
        href: "/about/programs/supporting-farmers",
    },
    {
        title: "Environmental Initiatives",
        image: "/images/programs/environmental-initiatives.png",
        href: "/about/programs/environmental-initiatives",
    },
    {
        title: "Supplying Nutritional Food for Children",
        image: "/images/programs/nutritional-food.png",
        href: "/about/programs/supplying-nutrition",
    },
];
const legendItems = [
    { label: "Education", icon: "/images/programs/legend-education.svg" },
    { label: "Health", icon: "/images/programs/legend-health.svg" },
    { label: "Farmers", icon: "/images/programs/legend-farmers.svg" },
];
function ProgramCard({ title, image, href, }) {
    const content = (<article className="w-full max-w-[530px] overflow-hidden rounded-[25px] p-[10px] bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-95 lg:p-[10px]">
      <div className="relative aspect-[724/357] w-full overflow-hidden">
        <Image src={image} alt={title} fill  className="object-cover rounded-[25px]" sizes="724px"/>
      </div> 
      <h3 className="px-6 py-5 font-[family-name:var(--font-poppins)] text-[25px] font-normal leading-[26px] text-[#232222] lg:px-8 lg:py-6 lg:text-[25px]">
        {title}
      </h3>
    </article>);
    if (!href)
        return content;
    return (<Link href={href} className="block w-full max-w-[579px]">
      {content}
    </Link>);
}
export function ProgramsPage() {
    return (<main className="overflow-x-hidden bg-[#fafafa]">

      <section className="mx-auto max-w-[1400px] px-[27px] pb-16 pt-10 lg:px-[46px] lg:pb-[67px] lg:pt-[24px]">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,512px)_minmax(0,579px)] lg:justify-between lg:gap-x-[36px]">
          <div className="lg:pt-[54px]">
            <h1 className="font-[family-name:var(--font-poppins)] text-[32px] font-normal leading-[1.1] text-[#232222] lg:text-[50px] lg:leading-[61px]">
              Programs{" "}
              <span className="font-light text-green">Initiatives</span>
            </h1>
            <p className="mt-4 font-[family-name:var(--font-poppins)] text-[20px] font-light leading-[26px] text-[#232222] lg:mt-6 lg:text-[20px]">
              Communities thrive when empathy, action
            </p>
            <p className="mt-4 max-w-[512px] whitespace-pre-wrap font-[family-name:var(--font-poppins)] text-[14px] font-light leading-[20px] text-[#a8a8a8] lg:mt-5 lg:text-[15px]">
              {heroDescription}
            </p>
            <div className="mt-8">
              <Button variant="outline-orange" size="md">
                Read More..
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[579px]">
            <div className="relative h-[256px] overflow-hidden rounded-[24px] sm:h-[296px] lg:h-[450px]">
              <Image src="/images/programs/environmental-initiatives.png" alt="Hands holding soil with seedlings" fill className="object-cover" sizes="724px" priority/>
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]"/>
            </div>

            <div className="mt-6 flex  flex-col gap-4 lg:absolute lg:bottom-[24px] lg:right-[24px] lg:mt-0 lg:w-[320px]">
              <div className=" flex items-center gap-3 min-h-[99px] rounded-[24px] bg-white px-5 py-3 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)]">
                <div >
                <p className="text-center font-[family-name:var(--font-poppins)] text-[10px] font-medium leading-[26px] text-[#514c4c]">
                  Education Growth
                </p>
                <p className="text-start font-bold font-[family-name:var(--font-poppins)] text-[24px] font-medium leading-[26px] text-green">
                  45%
                </p>
                </div>
                <div className="mt-2 flex items-center justify-center gap-3">
                  {legendItems.map((item) => (<div key={item.label} className="flex flex-col items-center">
                      <AssetImage src={item.icon} alt="" width={50} height={50} className="h-[45px] w-[45px]"/>
                      <span className="mt-1 font-[family-name:var(--font-poppins)] text-[10px] font-medium leading-[22px] text-[#514c4c]">
                        {item.label}
                      </span>
                    </div>))}
                </div>
              </div>

              <div className="min-h-[179px] rounded-[24px] bg-white px-5 py-4 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)]">
                <p className="text-start pb-2 font-[family-name:var(--font-poppins)] text-[23px] font-medium leading-[26px] text-[#514c4c] lg:pb-4">
                  Programs Growth
                </p>
                <p className="text-start pb-2 font-[family-name:var(--font-poppins)] text-[32px] font-medium leading-[26px] text-orange lg:pb-3 lg:text-[24px]">
                  88%
                </p>
                <div className="relative mx-auto mt-2 h-[70px] w-full max-w-[270px]">
                  <AssetImage src="/images/programs/growth-graph.png" alt="" fill className="object-contain object-bottom"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-[27px] pb-16 lg:px-[46px] lg:pb-[84px]">
        <h2 className="text-center font-[family-name:var(--font-poppins)] text-[36px] font-normal leading-[1.05] text-orange lg:text-[45px] lg:leading-[61px]">
          Programs
        </h2>

        <div className="mx-auto mt-10 grid max-w-[1200px] justify-items-center gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-[47px] lg:gap-x-[70px] lg:gap-y-[60px]">
          {programs.map((program) => (<ProgramCard key={program.title} title={program.title} image={program.image} href={program.href}/>))}
        </div>
      </section>

      <NewsletterSection />
    </main>);
}
