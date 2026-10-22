import { apiUrl } from "@/lib/api";
import { useState } from "react";
import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { AssetImage } from "@/components/ui/AssetImage";
const donateCards = [
    { title: "Food supplies" },
    { title: "Clothes" },
    { title: "Books & stationery" },
];
const cardDescription = "Make a one-time contribution and change a life today ";
const howItWorksDescription = "We work together to uplift communities through compassion, action.";
function DonateCategoryCard({ title, selected, onChoose }) {
    return (<article className="flex h-auto w-full max-w-[396px] flex-col items-center rounded-[37px] bg-white px-8 pb-10 pt-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
      <div className="relative flex h-[110px] w-[110px] items-center justify-center p-5">
        <AssetImage src="/images/in-kind-support/icon-circle.svg" alt="" width={131} height={131} className="absolute inset-0 h-[110px] w-[110px] object-contain"/>
        <Image src="/images/in-kind-support/donate-icon.png" alt="" width={100} height={60} className="relative z-10 object-contain rounded-[55px]"/>
      </div>

      <h3 className="mt-4 text-center font-[family-name:var(--font-poppins)] text-[24px] leading-[40px] text-green">
        {title}
      </h3>
      <p className="mt-3 max-w-[282px] text-center font-[family-name:var(--font-poppins)] text-[18px] font-light leading-[22px] text-[#232222] lg:text-[15px]">
        {cardDescription}
      </p>

      {/* <Link href="#" className="mt-auto inline-flex h-[53px] w-[176px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[20px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] transition-opacity hover:opacity-90">
        Donate Now
      </Link> */}
      <button
        type="button"
        onClick={onChoose}
        className={`mt-5 inline-flex h-[40px] w-[150px] cursor-pointer items-center justify-center rounded-full font-[family-name:var(--font-lato)] text-[20px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] lg:h-[50px] lg:text-[15px] ${selected ? "bg-green" : "gradient-orange"}`}
      >
        {selected ? "Selected" : "Donate Now"}
      </button>
    </article>);
}
function HowItWorksStep() {
    return (<div className="flex flex-1 items-center gap-6 px-6 py-8 lg:px-10">
      <Image src="/images/in-kind-support/how-it-works-icon.png" alt="" width={98} height={98} className="h-[70px] w-[70px] shrink-0 object-contain"/>
      <div>
        <h3 className="font-[family-name:var(--font-poppins)] text-[24px] leading-[1.2] text-black">
          Immediate impact
        </h3>
        <p className="mt-2 max-w-[236px] font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[20px] text-[#a8a8a8]">
          {howItWorksDescription}
        </p>
      </div>
    </div>);
}
const formInput = "mt-1 h-12 w-full rounded-[10px] border border-[#c2c2c2] px-4 outline-none focus:ring-1 focus:ring-green";
const formLabel = "font-[family-name:var(--font-outfit)] text-sm text-black";
export function InKindSupportPage() {
    const [category, setCategory] = useState(donateCards[0].title);
    const [submitted, setSubmitted] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
    function chooseCategory(title) {
        setCategory(title);
        setSubmitted(false);
        document.getElementById("donation-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    async function onSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        setPending(true);
        setError("");
        try {
            const response = await fetch(apiUrl("/api/leads"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source: "in-kind",
                    enquiryType: "in-kind",
                    name: form.get("name"),
                    email: form.get("email"),
                    phone: form.get("phone"),
                    subject: category,
                    message: form.get("note"),
                    details: { category, note: form.get("note") },
                }),
            });
            if (!response.ok)
                throw new Error("Could not send your offer. Please try again.");
            setSubmitted(true);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setPending(false);
        }
    }
    return (<main className="overflow-x-hidden bg-[#fafafa]">

      <section className="bg-[#f1f1f1]">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-[27px] py-16 lg:grid-cols-[minmax(0,512px)_minmax(0,448px)] lg:justify-between lg:gap-x-[43px] lg:px-[50px] lg:py-[54px]">
          <div>
            <h1 className="font-[family-name:var(--font-poppins)] text-[32px] font-medium leading-[1.1] text-black lg:text-[60px] lg:leading-[61px]">
              In-Kind Support
            </h1>
            <p className="mt-4 font-[family-name:var(--font-poppins)] text-[20px] font-light leading-[30px] text-black lg:text-[15px]">
              Support us with goods, services, or skills. Updating works Support us with goods, services, or skills. Updating works Support us with goods, services, or skills. Updating works Support us with goods, services, or skills. Updating works Support us with goods, services, or skills. Updating works Support us with goods, services, or skills. Updating works.
            </p>
            {/* <Link href="#what-you-can-donate" className="mt-8 inline-flex h-[53px] w-full max-w-[285px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[20px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] transition-opacity hover:opacity-90 lg:h-[76px] lg:text-[25px]">
              Offer Support
            </Link> */}
            <Link
              href="#donation-form"
              className="mt-8 inline-flex h-[40px] w-auto items-center justify-center rounded-full px-8 gradient-orange font-[family-name:var(--font-lato)] text-[20px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] lg:h-[50px] lg:text-[15px]"
            >
              Offer Support
            </Link>
          </div>

          <div className="relative mx-auto h-[311px] w-full max-w-[448px] sm:h-[425px]">
            <div className="absolute right-0 top-0 h-[311px] w-full max-w-[390px] overflow-hidden rounded-t-[151px] sm:h-[425px] sm:rounded-t-[200px]">
              <Image src="/images/in-kind-support/hero-large.png" alt="Donation box with clothes and shoes" fill className="object-cover" sizes="488px" priority/>
            </div>
            <div className="absolute bottom-0 left-0 z-10 h-[185px] w-[168px] overflow-hidden rounded-t-[118px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] sm:h-[274px] sm:w-[233px] sm:rounded-t-[200px]">
              <Image src="/images/in-kind-support/hero-small.png" alt="Hands holding tools and a hard hat" fill className="object-cover" sizes="291px"/>
            </div>
          </div>
        </div>
      </section>

      <section id="what-you-can-donate" className="mx-auto max-w-[1400px] px-[27px] py-16 lg:px-[46px] lg:py-[84px]">
        <h2 className="text-center font-[family-name:var(--font-poppins)] text-[34px] leading-[1.1] lg:text-[45px] lg:leading-[41px]">
          <span className="text-black">What You Can</span>
          <span className="text-green"> Donate</span>
        </h2>

        <div className="mt-12 grid justify-center gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-[43px] lg:mt-[65px]">
          {donateCards.map((card) => (<DonateCategoryCard key={card.title} title={card.title} selected={category === card.title} onChoose={() => chooseCategory(card.title)}/>))}
        </div>
      </section>

      <section className="bg-[#f1f1f1] py-16 lg:py-[84px]">
        <div className="mx-auto max-w-[1400px] px-[27px] lg:px-[50px]">
          <h2 className="text-center font-[family-name:var(--font-poppins)] text-[34px] leading-[1.1] lg:text-[45px] lg:leading-[61px]">
            <span className="text-black">How It</span>
            <span className="text-green"> Works</span>
          </h2>

          <div className="mx-auto mt-12 w-full max-w-[1211px] overflow-hidden rounded-[20px] border border-green lg:mt-[65px]">
            <div className="flex flex-col lg:flex-row">
              <HowItWorksStep />
              <div className="hidden w-px shrink-0 bg-green lg:block"/>
              <HowItWorksStep />
              <div className="hidden w-px shrink-0 bg-green lg:block"/>
              <HowItWorksStep />
            </div>
          </div>
        </div>
      </section>

      <section id="donation-form" className="mx-auto max-w-[720px] scroll-mt-28 px-[27px] py-16 lg:px-8 lg:py-[84px]">
        <h2 className="text-center font-[family-name:var(--font-poppins)] text-[34px] leading-[1.1] text-[#232222] lg:text-[45px]">
          Offer <span className="text-green">support</span>
        </h2>
        {submitted ? (<p className="mt-8 text-center font-[family-name:var(--font-poppins)] text-lg leading-8 text-[#232222]">
            Thank you. We have noted your offer of {category} and will reply with the next step.
          </p>) : (<form className="mt-8 space-y-5 rounded-[24px] bg-white px-6 py-8 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]" onSubmit={onSubmit}>
            <label className="block">
              <span className={formLabel}>What you can give</span>
              <select name="category" value={category} onChange={(event) => setCategory(event.target.value)} className={`${formInput} bg-white`}>
                {donateCards.map((card) => (<option key={card.title}>{card.title}</option>))}
              </select>
            </label>
            <label className="block">
              <span className={formLabel}>Name</span>
              <input required name="name" className={formInput} placeholder="Enter your name"/>
            </label>
            <label className="block">
              <span className={formLabel}>Email</span>
              <input required type="email" name="email" className={formInput} placeholder="Enter your email"/>
            </label>
            <label className="block">
              <span className={formLabel}>Phone</span>
              <input required type="tel" name="phone" className={formInput} placeholder="Enter your phone number"/>
            </label>
            <label className="block">
              <span className={formLabel}>Note</span>
              <textarea required name="note" rows={4} className="mt-1 w-full rounded-[10px] border border-[#c2c2c2] px-4 py-3 outline-none focus:ring-1 focus:ring-green" placeholder="Quantity, city, or a skill you can offer"/>
            </label>
            {error ? <p className="text-center text-sm text-[#c2410c]">{error}</p> : null}
            <div className="flex justify-center">
              <button type="submit" disabled={pending} className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-green px-8 font-[family-name:var(--font-lato)] text-white disabled:opacity-60">
                {pending ? "Sending…" : "Send offer"}
              </button>
            </div>
          </form>)}
      </section>

      <NewsletterSection />
    </main>);
}
