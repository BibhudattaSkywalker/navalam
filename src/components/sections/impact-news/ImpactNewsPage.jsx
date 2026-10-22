import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { AboutContainer } from "@/components/sections/about/AboutContainer";
import { ImpactNewsSubscription } from "@/components/sections/impact-news/ImpactNewsSubscription";
const heroDescription = "We work together to uplift communities through compassion, action, sustainability, and long-term social impact. ";
const initiativeDescription = "We work together to uplift communities through compassion, action, sustainability, and long-term social impact. ";
const newsListDescription = "We work together to uplift communities through compassion, action, sustainability, and long-term social impact. ";
const initiativeTitles = [
    "NGO Organizes Free Health Camp for Underprivileged Communities",
    "Youth-Led NGO Hosts Skill Development Workshop",
];
const newsListItems = [
    {
        image: "/images/impact-news/list-thumb-1.png",
        date: "NGO Highlights -03 June 2026",
        title: "Ighting Hunger Together: NGO Mobilizes Volunteers Across.",
    },
    {
        image: "/images/impact-news/list-thumb-2.png",
        date: "NGO Highlights -03 June 2026",
        title: "Ighting Hunger Together: NGO Mobilizes Volunteers Across.",
    },
    {
        image: "/images/impact-news/list-thumb-3.png",
        date: "NGO Highlights -03 June 2026",
        title: "Ighting Hunger Together: NGO Mobilizes Volunteers Across.",
    },
];
const featuredCards = [
    {
        image: "/images/impact-news/news-card-1.png",
        showBadge: true,
    },
    {
        image: "/images/impact-news/news-card-2.png",
        showBadge: false,
    },
];
function NewsCardOverlay({ image, showBadge = false, }) {
    return (<article className="relative h-[208px] w-full overflow-hidden rounded-[21px] sm:h-[240px] lg:h-[277px]">
      <Image src={image} alt="" fill className="object-cover" sizes="519px"/>
      {showBadge ? (<div className="absolute left-0 top-0 flex h-[53px] w-[149px] items-center justify-center rounded-[2px] bg-[#c5b9b9]">
          <span className="font-[family-name:var(--font-poppins)] text-[26px] font-medium leading-[44px] text-white">
            Today
          </span>
        </div>) : null}
      <div className="absolute inset-x-0 bottom-0 h-[143px] bg-gradient-to-b from-transparent via-[rgba(39,39,39,0.4)] to-[rgba(0,0,0,0.7)]"/>
      <div className="absolute bottom-5 left-5 right-5">
        <p className="font-[family-name:var(--font-poppins)] text-[15px] leading-[26px] text-[#ffe3e3]">
          NGO Highlights -03 June 2026
        </p>
        <p className="mt-1 font-[family-name:var(--font-poppins)] text-[16px] font-medium leading-[20px] text-[#ffe3e3]">
          Ighting Hunger Together: NGO Mobilizes Volunteers Across.
        </p>
      </div>
    </article>);
}
function NewsListItem({ image, date, title, description, showDivider = true, href = "/about/impact-news/providing-nutritious-food", }) {
    return (<div>
      <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center lg:gap-10">
        <Link href={href} className="relative h-[168px] w-full shrink-0 overflow-hidden rounded-[20px] sm:h-[217px] sm:w-[263px]">
          <Image src={image} alt="" fill className="object-cover" sizes="329px"/>
        </Link>
        <div className="min-w-0 flex-1">
          <p className="font-[family-name:var(--font-poppins)] text-[16px] leading-[26px] text-[#b5b5b5] lg:text-[15px]">
            {date}
          </p>
          <Link href={href}>
            <h3 className="mt-2 font-[family-name:var(--font-poppins)] text-[25px] font-medium leading-[1.2] text-[#232222] transition-opacity hover:opacity-70 lg:text-[24px] lg:leading-[32px]">
              {title}
            </h3>
          </Link>
          <p className="mt-4 max-w-[383px] font-[family-name:var(--font-poppins)] text-[16px] font-light leading-[20px] text-[#959595] lg:text-[15px]">
            {description}
          </p>
        </div>
      </div>
      {showDivider ? (<div className="h-px w-full bg-[#e5e5e5]"/>) : null}
    </div>);
}
export function ImpactNewsPage() {
    return (<main className="overflow-x-hidden bg-white">

      <section className="relative pb-16 lg:pb-[20px]">
        <AboutContainer>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,544px)] lg:gap-x-8">
            <div className="">
              <p className="font-[family-name:var(--font-poppins)] text-[22px] leading-none text-[#232222] lg:text-[15px] ">
                <span>Impact </span>
                <span className="font-medium">stories-</span>
              </p>

              <h1 className="mt-6 max-w-[720px] font-[family-name:var(--font-poppins)] text-[29px] font-light leading-[1.15] text-[#232222] lg:text-[60px] lg:leading-[44px]">
                <span>Singal We </span>
                <span className="font-medium text-green underline decoration-solid underline-offset-4">
                  Empower
                </span>
                <br />
                <span className="font-light">Lives</span>
                <span className="font-normal"> Compassion</span>
              </h1>

              <p className="mt-6 max-w-[526px] font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[20px] text-[#a8a8a8]">
                {heroDescription}
              </p>

              <div className="mt-10 flex items-center gap-5 ">
                <div>
                  <p className="font-[family-name:var(--font-poppins)] text-[32px] font-semibold leading-[39px] text-orange lg:text-[34px]">
                    2500+
                  </p>
                  <p className="font-[family-name:var(--font-poppins)] max-w-[300px] text-[20px] leading-[26px] text-[#232222] mt-2 lg:text-[22px]">
                    Single Impact stories and drives growth.
                  </p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-poppins)] text-[32px] font-semibold leading-[39px] text-orange lg:text-[34px]">
                    250+
                  </p>
                  <p className="font-[family-name:var(--font-poppins)] text-[20px] leading-[26px] text-[#232222] max-w-[300px] mt-2 lg:text-[22px]">
                    Single Impact stories and drives growth.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto h-[385px] w-full max-w-[544px] lg:mr-0 lg:h-[480px]">
              <div className="absolute left-0 top-0 h-[311px] w-[min(100%,282px)] overflow-hidden rounded-bl-[164px] rounded-tl-[168px] rounded-tr-[168px] lg:h-[480px]">
                <Image src="/images/impact-news/hero-main.png" alt="Community members in a village" fill className="object-cover object-[20%_center]" sizes="352px" priority/>
              </div>

              <div className="absolute right-0 top-0 h-[185px] w-[min(48%,254px)] overflow-hidden rounded-br-[126px] rounded-tl-[126px] rounded-tr-[126px] sm:h-[230px]">
                <Image src="/images/impact-news/hero-circle-top.png" alt="Volunteers in orange clothing" fill className="object-cover" sizes="317px"/>
              </div>
              <div className="absolute bottom-0 right-0 h-[285px] w-[min(48%,254px)] overflow-hidden rounded-br-[126px] rounded-tl-[126px] rounded-bl-[126px] sm:h-[230px]">
                <Image src="/images/impact-news/hero-circle-bottom.png" alt="Community gathering" fill className="object-cover" sizes="317px"/>
              </div>

            </div>
          </div>
        </AboutContainer>
      </section>

      <section className="bg-[#fafafa]">
        <AboutContainer>
          <h2 className="text-center font-[family-name:var(--font-poppins)] text-[29px] font-light leading-[1.15] text-[#232222] lg:text-[45px] lg:leading-[44px]">
            <span className="font-medium text-orange">News</span>
            <span> & announcements</span>
          </h2>

          <div className="mt-12 grid gap-12 lg:mt-[65px] lg:grid-cols-[minmax(0,1fr)_minmax(0,594px)] lg:items-center lg:gap-x-10">
            <div>
              <h3 className="font-[family-name:var(--font-lato)] text-[32px] font-normal leading-[1.1] text-[#232222] lg:text-[45px] lg:leading-[67px]">
                <span>NGO&apos;s </span>
                <span className="text-[32px] lg:text-[24px]"> </span>
                <span>GrassrootsInitiative</span>
              </h3>
              <p className="font-[family-name:var(--font-lato)] text-[32px] font-normal leading-[1.1] text-green lg:text-[24px] lg:leading-[41px]">
                Villages
              </p>

              <p className="mt-6 max-w-[383px] font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[20px] text-[#959595] lg:mt-1 lg:text-[15px]">
                {initiativeDescription}
              </p>

              <div className="mt-8 space-y-2 font-[family-name:var(--font-poppins)] text-[20px] leading-[26px] text-[#232222] lg:text-[18px]">
                {initiativeTitles.map((title) => (<p key={title}>{title}</p>))}
              </div>
{/* 
              <Link href="/about/impact-news/providing-nutritious-food" className="mt-10 inline-flex h-[53px] w-[176px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[20px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] transition-opacity hover:opacity-90">
                Learn More..
              </Link> */}
              <Link
                            href="#bank-details-card"
                            className="mt-8 inline-flex h-[40px] w-[150px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[20px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] lg:h-[50px] lg:text-[15px]"
                          >
                            Learn More..
                          </Link>
            </div>

            <div className="relative rounded-tl-[67px] bg-[rgba(247,183,13,0.1)] px-6 py-8 sm:rounded-tl-[118px] sm:p-8 lg:px-15 lg:py-20">
              <div className="space-y-6">
                {featuredCards.map((card) => (<NewsCardOverlay key={card.image} image={card.image} showBadge={card.showBadge}/>))}
              </div>
            </div>
          </div>
        </AboutContainer>
      </section>

      <section id="news-list" className="py-16 lg:py-[30px]">
        <AboutContainer>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,831px)_minmax(0,568px)] lg:gap-x-10">
            <div>
              {newsListItems.map((item, index) => (<NewsListItem key={item.image} image={item.image} date={item.date} title={item.title} description={newsListDescription} showDivider={index < newsListItems.length - 1}/>))}
            </div>

            <div className="relative mx-auto h-[385px] w-full max-w-[568px] overflow-hidden lg:mx-0 lg:h-[800px]">
              <Image src="/images/impact-news/featured-large.png" alt="Children smiling together" fill className="object-cover" sizes="710px"/>
              <div className="absolute inset-x-0 bottom-0 h-[224px] bg-gradient-to-b from-transparent via-[rgba(39,39,39,0.4)] to-[rgba(0,0,0,0.7)] lg:h-[267px]"/>
              <div className="absolute bottom-8 left-6 right-6 lg:bottom-10 lg:left-8 lg:right-8">
                <p className="font-[family-name:var(--font-poppins)] text-[16px] leading-[26px] text-[#ffe3e3] lg:text-[15px]">
                  NGO Highlights -03 June 2026
                </p>
                <p className="mt-2 font-[family-name:var(--font-poppins)] text-[25px] font-medium leading-[1.2] text-[#ffe3e3] lg:text-[24px] lg:leading-[27px]">
                  Ighting Hunger Together: NGO Mobilizes Volunteers Across.
                </p>
              </div>
            </div>
          </div>
        </AboutContainer>
      </section>

      <ImpactNewsSubscription />
      <NewsletterSection />
    </main>);
}
