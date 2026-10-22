import { apiUrl } from "@/lib/api";
import { useState } from "react";
import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { AssetImage } from "@/components/ui/AssetImage";

function BenefitCard({ title, description }) {
  return (
    <article className="flex h-full w-full flex-col rounded-[36px] bg-white px-6 pb-7 pt-8 sm:px-7">
      <div className="mx-auto flex h-[77px] w-[77px] items-center justify-center rounded-[8px] border border-green bg-[rgba(128,178,48,0.04)]">
        <AssetImage
          src="/images/volunteer/benefit-icon.svg"
          alt=""
          width={60}
          height={60}
          className="h-[54px] w-[54px] object-contain"
        />
      </div>
      <h3 className="mt-6 text-center font-[family-name:var(--font-poppins)] text-[20px] font-medium leading-7 text-[#514c4c]">
        {title}
      </h3>
      <p className="mt-2 text-center font-[family-name:var(--font-poppins)] text-[14px] leading-6 text-[rgba(130,130,130,0.7)]">
        {description}
      </p>
    </article>
  );
}

function RoleCard({ title, description, corners }) {
  return (
    <article className={`flex h-full w-full flex-col bg-white px-5 py-8 sm:px-6 ${corners}`}>
      <div className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center">
        <AssetImage
          src="/images/volunteer/role-icon.svg"
          alt=""
          width={98}
          height={98}
          className="h-[60px] w-[60px] object-contain"
        />
      </div>
      <h3 className="text-center font-[family-name:var(--font-poppins)] text-[18px] font-medium leading-7 text-[#514c4c] sm:text-[20px]">
        {title}
      </h3>
      <p className="mt-2 text-center font-[family-name:var(--font-poppins)] text-[14px] leading-6 text-[rgba(130,130,130,0.7)]">
        {description}
      </p>
    </article>
  );
}

function FormField({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="font-[family-name:var(--font-outfit)] text-sm leading-7 tracking-[-0.2px] text-black">
        {label}
      </label>
      <input
        required
        name={label}
        type={type}
        placeholder={placeholder}
        className="mt-1 h-12 w-full rounded-[10px] border border-[#c2c2c2] px-4 font-[family-name:var(--font-inter)] text-base text-[#232222] placeholder:text-[#9e9e9e] focus:outline-none focus:ring-1 focus:ring-green"
      />
    </div>
  );
}

export function InvolvementDetailPage({
  heroTitle,
  heroSubtitle,
  heroImage,
  ctaLabel,
  formId,
  whyLead,
  whyHighlight,
  whyRest = "",
  benefits,
  pathsTitle,
  pathsRest,
  pathsIntro,
  paths,
  formTitle,
  fields,
  splitFields,
  submitLabel,
  source = "volunteer",
  contactEmail = "nalvalaminfo@ngo.com",
  actionLead,
  actionHighlight,
  actionRest,
}) {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const details = Object.fromEntries(new FormData(event.currentTarget).entries());
    setPending(true);
    setError("");
    try {
      const response = await fetch(apiUrl("/api/leads"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, enquiryType: source, details }),
      });
      if (!response.ok) throw new Error("Could not send your details. Please try again.");
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="overflow-x-hidden bg-[#fafafa]">
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(-90deg, rgba(217, 217, 217, 0) 0%, rgb(128, 178, 48) 100%), url('${heroImage}')`,
        }}
      >
        <section className="relative mx-auto flex min-h-[380px] max-w-[1400px] flex-col justify-center px-6 py-14 sm:min-h-[440px] sm:px-8 lg:min-h-[500px] lg:px-12">
          <h1 className="max-w-[740px] font-[family-name:var(--font-poppins)] text-[32px] font-medium leading-tight text-white sm:text-[44px] lg:text-[60px]">
            {heroTitle}
          </h1>
          <p className="mt-4 max-w-[540px] font-[family-name:var(--font-poppins)] text-sm font-light leading-6 text-white sm:text-[15px]">
            {heroSubtitle}
          </p>
          <Link
            href={`#${formId}`}
            className="gradient-orange mt-8 inline-flex h-12 w-fit max-w-full items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-base text-white"
          >
            {ctaLabel}
          </Link>
        </section>
      </div>

      <section className="mx-auto max-w-[1400px] px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
        <h2 className="text-center font-[family-name:var(--font-poppins)] text-[32px] font-light leading-tight text-[#232222] lg:text-[45px]">
          {whyLead}{" "}
          <span className="font-semibold text-green">{whyHighlight}</span>
          {whyRest ? ` ${whyRest}` : ""}
        </h2>
        <div className="mt-10 grid justify-items-stretch gap-5 sm:grid-cols-2 lg:mt-14 xl:grid-cols-4">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title} title={benefit.title} description={benefit.description} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-14 sm:px-8 lg:px-12 lg:pb-20">
        <div className="rounded-[15px] bg-[rgba(128,178,48,0.2)] px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
          <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.95fr)] xl:gap-12">
            <div>
              <h2 className="font-[family-name:var(--font-poppins)] text-[32px] leading-tight text-[#0d0d0d] lg:text-[45px]">
                <span className="font-normal">{pathsTitle}</span>{" "}
                <span className="font-light text-black">{pathsRest}</span>
              </h2>
              <p className="mt-4 max-w-xl font-[family-name:var(--font-poppins)] text-lg leading-7 text-[rgba(85,85,85,0.7)] sm:text-xl">
                {pathsIntro}
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2">
                {paths.map((path) => (
                  <RoleCard
                    key={path.title}
                    title={path.title}
                    description={path.description}
                    corners={path.corners}
                  />
                ))}
              </div>
            </div>

            <div
              id={formId}
              className="scroll-mt-24 w-full rounded-[30px] bg-white px-5 py-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] sm:px-8 sm:py-10 lg:px-12 lg:py-14"
            >
              <h2 className="text-center font-[family-name:var(--font-poppins)] text-[28px] leading-tight text-[#0d0d0d] sm:text-[34px] lg:text-[45px]">
                {formTitle}
              </h2>
              {submitted ? (
                <p className="mt-8 text-center font-[family-name:var(--font-poppins)] text-base leading-7 text-[#232222] sm:text-lg">
                  Thank you. Your details are noted, and we will reply at the email address you shared.
                </p>
              ) : (
              <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                {fields.map((field) => (
                  <FormField key={field.label} {...field} />
                ))}
                <div className="grid gap-6 sm:grid-cols-2">
                  {splitFields.map((field) => (
                    <FormField key={field.label} {...field} />
                  ))}
                </div>
                {error ? <p className="text-center text-sm text-[#c2410c]">{error}</p> : null}
                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex h-14 w-full max-w-[280px] items-center justify-center rounded-full bg-green px-6 font-[family-name:var(--font-lato)] text-lg text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {pending ? "Sending…" : submitLabel}
                  </button>
                </div>
              </form>
              )}
              <p className="mt-8 text-center font-[family-name:var(--font-poppins)] text-base leading-7 text-[rgba(85,85,85,0.7)] sm:text-lg">
                We respect your privacy. Your data is safe with us.
              </p>
              <Link
                className="mt-3 block w-full break-all text-center font-[family-name:var(--font-poppins)] text-base leading-7 text-green"
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1400px]">
        <h2 className="px-6 pb-8 text-center font-[family-name:var(--font-poppins)] text-[32px] font-light leading-tight text-[#232222] sm:px-8 lg:px-12 lg:pb-12 lg:text-[45px]">
          {actionLead}{" "}
          <span className="font-semibold text-green">{actionHighlight}</span>{" "}
          <span className="text-black">{actionRest}</span>
        </h2>
        <div className="relative min-h-[320px] overflow-hidden sm:min-h-[380px] lg:h-[420px]">
          <Image
            src="/images/volunteer/action-bg.png"
            alt=""
            fill
            className="object-cover"
            sizes="1400px"
          />
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)]" />
          <div className="relative grid grid-cols-2 items-center gap-4 px-6 py-8 sm:grid-cols-4 sm:gap-6 sm:px-8 sm:py-10 lg:absolute lg:inset-0 lg:mx-auto lg:max-w-[1136px]">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="relative mx-auto aspect-square w-full max-w-[150px] overflow-hidden rounded-full border-[5px] border-white shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)] sm:max-w-[180px] lg:max-w-[220px]"
              >
                <Image
                  src="/images/volunteer/portrait.png"
                  alt="Community portrait"
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
}
