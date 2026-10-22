import { useState } from "react";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { api } from "@/lib/api";

const contactEmail = "nalvalaminfo@ngo.com";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="font-[family-name:var(--font-outfit)] text-sm leading-7 tracking-[-0.2px] text-black">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "mt-1 h-12 w-full rounded-[10px] border border-[#c2c2c2] px-4 font-[family-name:var(--font-inter)] text-base text-[#232222] placeholder:text-[#9e9e9e] focus:outline-none focus:ring-1 focus:ring-green";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  return (
    <main className="overflow-x-hidden bg-[#fafafa]">
      <section className="mx-auto max-w-[1400px] px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        <h1 className="font-[family-name:var(--font-poppins)] text-[32px] font-medium leading-tight text-[#232222] lg:text-[60px]">
          Contact <span className="font-light text-green">Us</span>
        </h1>
        <p className="mt-4 max-w-2xl font-[family-name:var(--font-poppins)] text-[15px] font-light leading-7 text-[#555]">
          Write to Nalvalam Foundation about programs, volunteering, partnerships, or donations. We read every message sent through this page.
        </p>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,380px)] lg:gap-10">
          <div className="rounded-[30px] bg-white px-5 py-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] sm:px-8 sm:py-10">
            <h2 className="font-[family-name:var(--font-poppins)] text-[28px] leading-tight text-[#0d0d0d] sm:text-[34px]">
              Send a Message
            </h2>
            {submitted ? (
              <p className="mt-6 font-[family-name:var(--font-poppins)] text-base leading-7 text-[#232222]">
                Thank you. Your message has been noted. We will reply at the email address you shared.
              </p>
            ) : (
              <form
                className="mt-6 space-y-5"
                onSubmit={async (event) => {
                  event.preventDefault();
                  const data = Object.fromEntries(new FormData(event.currentTarget));
                  setPending(true);
                  setError("");
                  try {
                    await api("/api/leads", {
                      method: "POST",
                      body: JSON.stringify({ ...data, source: "contact", enquiryType: "contact" }),
                    });
                    setSubmitted(true);
                  } catch (err) {
                    setError(err.message);
                  } finally {
                    setPending(false);
                  }
                }}
              >
                <Field label="Full Name">
                  <input required name="name" placeholder="Enter your full name" className={inputClass} />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email">
                    <input required type="email" name="email" placeholder="Enter your email" className={inputClass} />
                  </Field>
                  <Field label="Phone">
                    <input type="tel" name="phone" placeholder="Enter your phone number" className={inputClass} />
                  </Field>
                </div>
                <Field label="Subject">
                  <input required name="subject" placeholder="What is this about?" className={inputClass} />
                </Field>
                <Field label="Message">
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="Write your message"
                    className={`${inputClass} h-auto py-3`}
                  />
                </Field>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex h-14 w-full max-w-[240px] items-center justify-center rounded-full bg-green px-6 font-[family-name:var(--font-lato)] text-lg text-white transition-opacity hover:opacity-90"
                >
                  {pending ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <aside className="grid gap-4">
            <article className="rounded-[24px] bg-[rgba(128,178,48,0.2)] px-6 py-7">
              <h2 className="font-[family-name:var(--font-poppins)] text-xl text-[#232222]">Email</h2>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-2 block break-all font-[family-name:var(--font-poppins)] text-base leading-7 text-green"
              >
                {contactEmail}
              </a>
            </article>
            <article className="rounded-[24px] bg-white px-6 py-7 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]">
              <h2 className="font-[family-name:var(--font-poppins)] text-xl text-[#232222]">What to include</h2>
              <p className="mt-2 font-[family-name:var(--font-poppins)] text-[15px] font-light leading-7 text-[#555]">
                Share your name, a way to reach you, and whether you are writing about a program, a donation, or a partnership.
              </p>
            </article>
            <article className="rounded-[24px] bg-white px-6 py-7 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]">
              <h2 className="font-[family-name:var(--font-poppins)] text-xl text-[#232222]">Where we work</h2>
              <p className="mt-2 font-[family-name:var(--font-poppins)] text-[15px] font-light leading-7 text-[#555]">
                Nalvalam Foundation supports communities across India through education, health, food, and local partnerships.
              </p>
            </article>
          </aside>
        </div>
      </section>
      <NewsletterSection />
    </main>
  );
}
