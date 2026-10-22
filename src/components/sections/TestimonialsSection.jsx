import { useState } from "react";
import Image from "@/components/next/Image";
import { Section } from "@/components/ui/Section";

const testimonials = [
  {
    name: "Hannah Schmitt",
    role: "Lead designer",
    avatar: "/images/testimonial-2.png",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis.",
  },
  {
    name: "Hannah Schmitt",
    role: "Lead designer",
    avatar: "/images/testimonial-1.png",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim",
  },
  {
    name: "Hannah Schmitt",
    role: "Lead designer",
    avatar: "/images/testimonial-3.png",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis.",
  },
];

function QuoteMark() {
  return (
    <span className="font-[family-name:var(--font-poppins)] text-2xl leading-none text-[#d0d0d0]" aria-hidden>
      “
    </span>
  );
}

function TestimonialCard({ item, featured = false }) {
  return (
    <article className={`relative ${featured ? "w-full max-w-[340px]" : "w-full max-w-[250px]"}`}>
      <div
        className={`absolute rounded-[40%] bg-yellow ${
          featured
            ? "-bottom-3 -right-2 h-28 w-16"
            : "-bottom-3 -left-2 h-20 w-16"
        }`}
        aria-hidden
      />
      {!featured ? (
        <div className="absolute -bottom-1 -right-2 h-14 w-14 rounded-[40%] bg-yellow/90" aria-hidden />
      ) : null}
      <div className="relative rounded-[28px] bg-white px-5 pb-6 pt-12 text-center shadow-[0px_10px_30px_rgba(0,0,0,0.05)]">
        <Image
          src={item.avatar}
          alt={item.name}
          width={64}
          height={64}
          className={`absolute left-1/2 -translate-x-1/2 rounded-full object-cover ring-4 ring-white ${
            featured ? "-top-8 h-16 w-16" : "-top-7 h-14 w-14"
          }`}
        />
        <p className="font-[family-name:var(--font-poppins)] text-base font-semibold text-[#2b2b2b]">
          {item.name}
        </p>
        <p className="text-sm text-[#8a8a8a]">{item.role}</p>
        <div className="mt-3">
          <QuoteMark />
        </div>
        <p className="mt-2 text-left text-sm leading-6 text-[#6b6b6b]">{item.quote}</p>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  const [active, setActive] = useState(1);
  const prev = () =>
    setActive((index) => (index - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((index) => (index + 1) % testimonials.length);
  const left = testimonials[(active - 1 + testimonials.length) % testimonials.length];
  const right = testimonials[(active + 1) % testimonials.length];

  return (
    <Section>
      <div className="rounded-[28px] bg-[#fbf6ee] px-4 py-10 sm:px-8 sm:py-12">
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={prev}
            className="flex h-9 w-9 items-center justify-center text-2xl text-[#2b2b2b] transition hover:text-orange"
          >
            ‹
          </button>
          <h2 className="section-title text-center text-[1.35rem] sm:text-[1.75rem]">
            What Our Clients Say About Us
          </h2>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={next}
            className="flex h-9 w-9 items-center justify-center text-2xl text-[#2b2b2b] transition hover:text-orange"
          >
            ›
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-1.5">
          {testimonials.map((item, index) => (
            <button
              key={item.avatar}
              type="button"
              aria-label={`Go to testimonial ${index + 1}`}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all ${
                index === active ? "w-2 bg-orange" : "w-2 bg-[#d9d9d9]"
              }`}
            />
          ))}
        </div>

        <div className="mt-12 hidden items-end justify-center gap-6 lg:flex">
          <div className="-rotate-6">
            <TestimonialCard item={left} />
          </div>
          <div className="z-10 -mb-2">
            <TestimonialCard item={testimonials[active]} featured />
          </div>
          <div className="rotate-6">
            <TestimonialCard item={right} />
          </div>
        </div>

        <div className="mt-12 flex justify-center lg:hidden">
          <TestimonialCard item={testimonials[active]} featured />
        </div>
      </div>
    </Section>
  );
}
