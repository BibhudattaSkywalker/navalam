import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { useState } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { DemoPaymentModal } from "@/components/sections/donation/DemoPaymentModal";
const amounts = ["500", "1000", "2500", "Custom"];
const paymentMethods = ["UPI", "Card", "Net banking"];
const impactDescription =
  "We work together to uplift communities through compassion, action.";
function AmountTile({ label, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex h-[60px] w-auto items-center justify-center rounded-[7.5px] font-[family-name:var(--font-poppins)] text-[20px] text-black ${
        selected ? "border-2 border-green bg-white" : "bg-[#d9d9d9]"
      }`}
    >
      {label === "Custom" ? label : `₹${label}`}
    </button>
  );
}
function FormField({ label, placeholder, className = "", value, onChange, error, type = "text" }) {
  return (
    <div className={className}>
      <label className="font-[family-name:var(--font-outfit)] text-[14px] leading-[29px] tracking-[-0.235px] text-black">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 h-[50px] w-full rounded-[10px] border border-[#c2c2c2] px-[23px] font-[family-name:var(--font-inter)] text-[14px] leading-[21px] tracking-[-0.71px] text-[#232222] placeholder:text-[#9e9e9e] focus:outline-none focus:ring-1 focus:ring-green"
      />
      {error && <p className="mt-1 text-[13px] text-red-600">{error}</p>}
    </div>
  );
}
function ImpactCard() {
  return (
    <article className="flex justify-center items-center gap-4 h-auto w-full max-w-[396px]  rounded-[20px] bg-white px-8 pb-8 pt-10 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
      <Image
        src="/images/one-time-donation/impact-icon-only.png"
        alt=""
        width={98}
        height={98}
        className="h-[60px] w-[60px] object-contain"
      />
      <div>
      <h3 className="mt-4 font-[family-name:var(--font-poppins)] text-[22px] leading-[1.2] text-black">
        Immediate impact
      </h3>
      <p className="mt-2 max-w-[236px] font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[20px] text-[#a8a8a8]">
        {impactDescription}
      </p>
      </div>
    </article>
  );
}
export function OneTimeDonationPage() {
  const [selected, setSelected] = useState("500");
  const [custom, setCustom] = useState("");
  const [donor, setDonor] = useState({ name: "", mobile: "", email: "" });
  const [errors, setErrors] = useState({});
  const [payOpen, setPayOpen] = useState(false);
  const amount = selected === "Custom" ? custom : selected;
  const setField = (key) => (e) => setDonor((p) => ({ ...p, [key]: e.target.value }));

  const proceed = () => {
    const e = {};
    if (!amount || Number(amount) < 1) e.amount = "Enter a valid amount";
    if (!donor.name.trim()) e.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(donor.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    if (!/^\S+@\S+\.\S+$/.test(donor.email)) e.email = "Enter a valid email";
    setErrors(e);
    if (!Object.keys(e).length) setPayOpen(true);
  };

  return (
    <main className="overflow-x-hidden bg-[#fafafa]">
      <section className="bg-[#f1f1f1]">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-[27px] py-16 lg:grid-cols-[minmax(0,612px)_minmax(0,448px)] lg:justify-between lg:gap-x-[30px] lg:px-[50px] lg:py-[54px]">
          <div>
            <h1 className="font-[family-name:var(--font-poppins)] text-[32px] font-medium leading-[1.1] text-black lg:text-[60px] lg:leading-[61px]">
              One-Time Donation
            </h1>
            <p className="mt-4 font-[family-name:var(--font-poppins)] text-[20px] font-light leading-[30px] text-black lg:text-[15px]">
              Your one-time contribution can change a life today Your one-time
              contribution can change a life today Your one-time contribution
              can change a life today Your one-time contribution can change a
              life today Your one-time contribution can change a life today Your
              one-time contribution can change a life today Your one-time
              contribution can change a life today Your one-time contribution
              can change a life today Your one-time contribution can change a
              life today.
            </p>
            <Link
              href="#donation-form"
              className="mt-8 inline-flex h-[40px] w-[150px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[20px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] lg:h-[50px] lg:text-[15px]"
            >
              Donate Now
            </Link>
          </div>

          <div className="relative mx-auto h-[311px] w-full max-w-[448px] sm:h-[425px]">
            <div className="absolute right-0 top-0 h-[311px] w-full max-w-[390px] overflow-hidden rounded-t-[151px] sm:h-[425px] sm:rounded-t-[200px]">
              <Image
                src="/images/one-time-donation/hero-large.png"
                alt="Hands holding soil with coins and a sprout"
                fill
                className="object-cover"
                sizes="488px"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 z-10 h-[185px] w-[168px] overflow-hidden rounded-t-[118px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] sm:h-[274px] sm:w-[233px] sm:rounded-t-[200px]">
              <Image
                src="/images/one-time-donation/hero-small.png"
                alt="Hands exchanging coins for donation"
                fill
                className="object-cover"
                sizes="291px"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="donation-form"
        className="mx-auto max-w-[1400px] px-[27px] py-16 lg:px-[50px] lg:py-[84px]"
      >
        <h2 className="text-center font-[family-name:var(--font-poppins)] text-[34px] leading-[1.1] lg:text-[45px] lg:leading-[61px]">
          <span className="text-green">Donation </span>
          <span className="text-black">Amount</span>
        </h2>

        <div className="mt-12 grid grid-cols-2 justify-center gap-5 lg:mt-[65px] lg:grid-cols-4 lg:gap-x-5">
          {amounts.map((label) => (
            <AmountTile key={label} label={label} selected={selected === label} onSelect={() => setSelected(label)} />
          ))}
        </div>

        {selected === "Custom" && (
          <div className="mx-auto mt-6 max-w-[320px]">
            <FormField label="Custom amount (₹)" placeholder="Enter amount" value={custom}
              onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))} />
          </div>
        )}
        {errors.amount && <p className="mt-3 text-center text-[13px] text-red-600">{errors.amount}</p>}

        <form className="mt-12 space-y-[30px] lg:mt-[71px]" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-[30px] lg:grid-cols-2">
            <FormField label="Name" placeholder="Enter name" value={donor.name} onChange={setField("name")} error={errors.name} />
            <FormField label="Mobile number" placeholder="Enter mobile no" value={donor.mobile} onChange={setField("mobile")} error={errors.mobile} />
          </div>
          <FormField label="Email" placeholder="Enter Email" type="email" value={donor.email} onChange={setField("email")} error={errors.email} />
        </form>

        <div className="mx-auto mt-12 flex h-[111px] w-full max-w-[1301px] flex-wrap items-center justify-center gap-8 rounded-[10px] bg-[#e4e4e4] px-6 sm:justify-around lg:mt-[71px]">
          {paymentMethods.map((method) => (
            <div key={method} className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-[24px] bg-[#f7f7f7]">
                <AssetImage
                  src="/images/one-time-donation/payment-logo.svg"
                  alt=""
                  width={32}
                  height={20}
                  className="h-5 w-8 object-contain"
                />
              </div>
              <span className="font-[family-name:var(--font-poppins)] text-[20px] text-black sm:text-[27px]">
                {method}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center lg:mt-[71px]">
          <button
            type="button"
            onClick={proceed}
            className="inline-flex h-[40px] w-full max-w-[200px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[20px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] lg:h-[50px] lg:text-[15px]"
          >
            Proceed to Donate
          </button>
          {/* <Link
            href="#donation-form"
            className="mt-8 inline-flex h-[40px] w-[150px] items-center justify-center rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[20px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] lg:h-[50px] lg:text-[15px]"
          >
            Donate Now
          </Link> */}
        </div>
      </section>

      <section className="bg-[#f1f1f1] py-16 lg:py-[84px]">
        <div className="mx-auto grid max-w-[1400px] justify-center gap-8 px-[27px] md:grid-cols-2 xl:grid-cols-3 xl:gap-x-[43px] lg:px-[50px]">
          {Array.from({ length: 3 }).map((_, index) => (
            <ImpactCard key={index} />
          ))}
        </div>
      </section>

      <NewsletterSection />
      <DemoPaymentModal open={payOpen} onClose={() => setPayOpen(false)} amount={amount} donor={donor} frequency="One-time" />
    </main>
  );
}
