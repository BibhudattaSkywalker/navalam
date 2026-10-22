import { apiUrl } from "@/lib/api";
import { useState } from "react";
export function NewsletterSection() {
    const [submitted, setSubmitted] = useState(false);
    return (<section className="bg-[rgba(247,183,13,0.1)] py-12 sm:py-14">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-5 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-8">
        <div className="shrink-0">
          <h3 className="font-[family-name:var(--font-poppins)] text-[24px] font-medium capitalize leading-[28.8px] text-footer-blue">
            Get Our Latest
            <br />
            News & Update
          </h3>
        </div>

        <form
          className="flex w-full max-w-[718px] flex-col gap-3 sm:flex-row sm:items-center lg:ml-[35px]"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            try {
              const response = await fetch(apiUrl("/api/leads"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ source: "newsletter", name: form.get("name"), email: form.get("email") }),
              });
              if (response.ok) setSubmitted(true);
            } catch {
              setSubmitted(false);
            }
          }}
        >
          <input required type="text" name="name" placeholder="Name" className="h-[50px] w-full rounded-full bg-white px-5 font-[family-name:var(--font-lato)] text-[14px] leading-[17px] text-[#6f6f6f] outline-none sm:w-[250px]"/>
          <input required type="email" name="email" placeholder="E-mail" className="h-[50px] w-full rounded-full bg-white px-5 font-[family-name:var(--font-lato)] text-[14px] leading-[17px] text-[#6f6f6f] outline-none sm:w-[250px]"/>
          <button type="submit" className="h-[50px] w-full rounded-full cursor-pointer bg-yellow px-8 font-[family-name:var(--font-poppins)] text-[14px] font-semibold capitalize leading-[14px] text-white sm:w-[171.63px]">
            {submitted ? "Thank you" : "Submit Now"}
          </button>
        </form>

        <div className="flex items-center gap-4 lg:ml-auto">
          <span className="font-[family-name:var(--font-manrope)] text-[18px] font-bold leading-[21.6px] text-yellow">
            Follow Us:
          </span>
          <div className="flex gap-3">
            {["facebook", "twitter", "instagram", "linkedin"].map((social) => (<a key={social} href="#" aria-label={social} className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-yellow text-white">
                <SocialIcon name={social}/>
              </a>))}
          </div>
        </div>
      </div>
    </section>);
}
function SocialIcon({ name }) {
    const icons = {
        facebook: "f",
        twitter: "t",
        instagram: "ig",
        linkedin: "in",
    };
    return (<span className="font-[family-name:var(--font-manrope)] text-[12px] font-extrabold uppercase leading-none">
      {icons[name] ?? "•"}
    </span>);
}
