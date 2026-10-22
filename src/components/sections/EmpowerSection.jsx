import { useEffect, useState } from "react";
import Image from "@/components/next/Image";
import { Section } from "@/components/ui/Section";

const slides = [
  {
    title: "NGO Planning Health And Hope",
    lines: [
      "Supporting Poor Families Through Education, Healthcare, Skills And Social Development",
      "Creating Opportunities For Youth To Grow, Learn, Lead And Inspire Others",
    ],
    left: {
      src: "/images/empower-1.jpg",
      alt: "Helping the vulnerable",
      captionTitle: "Hope For Humanity",
      caption: "Helping People Rise Together For A Better And Brighter Future",
    },
    right: [
      { src: "/images/empower-3.jpg", alt: "Children raising hands" },
      { src: "/images/empower-2.jpg", alt: "Children in classroom" },
    ],
  },
  {
    title: "Education For Every Child",
    lines: [
      "Learning materials, volunteer teachers, and after-school support for families who need them most.",
      "Creating classrooms where children can grow, learn, and lead with confidence.",
    ],
    left: {
      src: "/images/empower-2.jpg",
      alt: "Children in a classroom",
      captionTitle: "Education Support",
      caption: "Quality learning for children who need a fair start",
    },
    right: [
      { src: "/images/campaign-2.jpg", alt: "Students learning together" },
      { src: "/images/empower-1.jpg", alt: "Community care" },
    ],
  },
  {
    title: "Food, Care And Community",
    lines: [
      "Nutritious meals and local drives that keep families fed with dignity.",
      "Neighbors and volunteers working together for long-term community health.",
    ],
    left: {
      src: "/images/empower-3.jpg",
      alt: "Children raising their hands",
      captionTitle: "Community Care",
      caption: "Shared effort that brings health and hope closer to home",
    },
    right: [
      { src: "/images/campaign-1.jpg", alt: "Community support" },
      { src: "/images/campaign-3.jpg", alt: "Volunteers at work" },
    ],
  },
];

export function EmpowerSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[active];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || paused) return undefined;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <Section>
      <div className="grid items-end gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
        <h2 className="section-title">
          Together We <span className="font-medium text-green">Empower</span>
          <br />
          Lives Compassion
        </h2>
        <p className="section-copy lg:pb-1">
          Our mission is to create meaningful change across education,
          healthcare, and community development initiatives. A trusted
          non-profit organization committed to empowering lives through ethical,
          transparent, community-driven programs.
        </p>
      </div>

      <div
        className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-3 lg:items-stretch"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <figure className="overflow-hidden rounded-2xl border-2 border-green bg-white">
          <figcaption className="px-5 py-4">
            <h3 key={slide.left.captionTitle} className="fade-up text-[20px]  lg:text-[24px] font-semibold text-foreground">
              {slide.left.captionTitle}
            </h3>
            <p className="mt-1 text-[15px] leading-6 text-text-muted">{slide.left.caption}</p>
          </figcaption>
          <div className="relative mx-5 mb-5 h-full overflow-hidden rounded-xl sm:h-60 lg:h-96 ">
            {slides.map((item, index) => (
              <Image
                key={item.left.src}
                src={item.left.src}
                alt={index === active ? item.left.alt : ""}
                fill
                className={`object-cover object-center  transition-opacity duration-700 ${
                  index === active ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            ))}
          </div>
        </figure>

        <div className="flex flex-col justify-center rounded-2xl bg-green px-6 py-8 text-center text-white sm:px-8">
          <div key={slide.title} className="fade-up">
            <h3 className="font-[family-name:var(--font-poppins)] text-xl font-semibold leading-snug sm:text-2xl">
              {slide.title}
            </h3>
            {slide.lines.map((line) => (
              <p key={line} className="mt-4 text-sm leading-6 sm:text-base">
                {line}
              </p>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Empower slides">
            {slides.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`Show ${item.title}`}
                onClick={() => setActive(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === active ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {slide.right.map((image) => (
            <div key={image.src} className="relative h-48 overflow-hidden rounded-2xl sm:h-60">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="fade-up object-cover object-center"
                sizes="(max-width: 1024px) 50vw, 360px"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
