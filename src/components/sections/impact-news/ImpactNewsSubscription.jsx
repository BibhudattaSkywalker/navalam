import { apiUrl } from "@/lib/api";
import { useState } from "react";
import Image from "@/components/next/Image";
export function ImpactNewsSubscription() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    async function handleSubmit(event) {
        event.preventDefault();
        if (!email.trim())
            return;
        try {
            const response = await fetch(apiUrl("/api/leads"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ source: "impact-news", email: email.trim(), name: "Newsletter subscriber" }),
            });
            if (response.ok)
                setSubmitted(true);
        }
        catch {
            setSubmitted(false);
        }
    }
    return (<section className="relative overflow-hidden bg-[rgba(255,227,195,0.39)]">
      <div className="mx-auto grid max-w-[1400px] items-end gap-10 px-[27px] py-16 lg:grid-cols-[minmax(0,447px)_1fr] lg:gap-x-16 lg:px-[46px] lg:py-[65px]">
        <div className="relative mx-auto h-[266px] w-full max-w-[447px] lg:mx-0 lg:h-[389px]">
          <Image src="/images/impact-news/newsletter-boy.png" alt="Smiling child" fill className="object-contain object-bottom" sizes="559px"/>
        </div>

        <div className="pb-4 lg:pb-10">
          <h2 className="font-[family-name:var(--font-poppins)] text-[34px] leading-[1.1] text-black lg:text-[45px] lg:leading-[58px]">
            <span className="font-light">Newsletter</span>
            <br />
            <span className="text-orange">Subscription</span>
          </h2>

          <form onSubmit={handleSubmit} className="mt-10 lg:mt-14">
            <div className="flex w-full max-w-[696px] flex-col gap-0 sm:flex-row">
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" required className="h-[57px] w-full rounded-[14px] border border-orange bg-white px-6 font-[family-name:var(--font-poppins)] text-[18px] text-[#232222] outline-none focus:ring-2 focus:ring-orange/30 sm:h-[57px] sm:flex-1 sm:rounded-r-none sm:text-[20px] lg:max-w-[690px]"/>
              <button type="submit" className="mt-3 flex h-[67px] w-full items-center justify-center rounded-[14px] bg-orange transition-opacity hover:opacity-90 sm:mt-0 sm:h-[57px] sm:w-[80px] sm:shrink-0 sm:rounded-l-none" aria-label="Subscribe">
                <Image src="/images/impact-news/arrow.svg" alt="" width={30} height={30} className="h-[21px] w-[30px] -rotate-45"/>
              </button>
            </div>
          </form>

          {submitted ? (<p className="mt-4 font-[family-name:var(--font-poppins)] text-[16px] text-green">
              Thank you for subscribing.
            </p>) : null}

          <p className="mt-6 font-[family-name:var(--font-poppins)] text-[16px] text-[#8b8b8bbf] lg:mt-8 lg:text-[15px]">
            hello@ngonavalam.com
          </p>
        </div>
      </div>
    </section>);
}
