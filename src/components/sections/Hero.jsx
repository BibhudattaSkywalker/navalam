import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "/images/hero/slide-1.jpg",
    alt: "Volunteers distributing food in the community",
  },
  {
    src: "/images/hero/slide-2.jpg",
    alt: "Students learning together in a classroom",
  },
  {
    src: "/images/hero/slide-3.jpg",
    alt: "Volunteers preparing fresh produce for distribution",
  },
];

const FADE_MS = 1000;
const INTERVAL_MS = 6500;

export function Hero() {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const paused = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const timer = window.setTimeout(() => setReady(true), 500);
    if (media.matches) return () => window.clearTimeout(timer);

    const id = window.setInterval(() => {
      if (paused.current || document.hidden) return;
      setActive((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(id);
    };
  }, []);

  const visibleSlides = ready ? slides : slides.slice(0, 1);

  return (
    <section className="bg-white">
      <div
        className="relative h-[clamp(460px,62vw,600px)] overflow-hidden"
        onMouseEnter={() => {
          paused.current = true;
        }}
        onMouseLeave={() => {
          paused.current = false;
        }}
      >
        <div className="absolute inset-0 bg-[#243028]" aria-hidden>
          {visibleSlides.map((slide, index) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={index === active ? slide.alt : ""}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover object-center ${
                reduceMotion ? "" : "transition-opacity ease-in-out"
              } ${index === active ? "opacity-100" : "opacity-0"}`}
              style={reduceMotion ? undefined : { transitionDuration: `${FADE_MS}ms` }}
            />
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.18)_46%,rgba(0,0,0,0.45)_100%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col items-center justify-end px-5 pb-10 text-center sm:px-6 sm:pb-12">
          <h1 className="max-w-[21ch] font-[family-name:var(--font-poppins)] text-[1.75rem] font-semibold leading-[1.2] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.45)] sm:text-[35px] lg:text-[65px]">
            Support <span className="humanity-text text-green">Humanity</span>, Spread Kindness Today
          </h1>
          <p className="mt-3 max-w-xl font-[family-name:var(--font-poppins)] text-sm text-white/95 sm:text-base lg:text-lg">
            Your small dignity, to those who need it most.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/about/donate"
              className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:h-11 sm:px-8 sm:text-base"
            >
              Donate Now
            </Link>
            <Link
              href="/about/get-involved"
              className="inline-flex h-11 items-center justify-center rounded-full border-2 border-white/90 bg-white/10 px-6 font-[family-name:var(--font-lato)] text-sm text-white backdrop-blur-sm transition-all duration-300 hover:border-[#f7b70d] hover:bg-[linear-gradient(90deg,#f18405_1%,#f7b70d_98%)] sm:h-11 sm:px-8 sm:text-base"
            >
              Join Now
            </Link>
          </div>
          <div className="mt-5 flex items-center gap-1.5" role="tablist" aria-label="Hero slides">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`Show slide ${index + 1}`}
                onClick={() => {
                  setReady(true);
                  setActive(index);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  index === active ? "w-5 bg-white" : "w-1.5 bg-white/65 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
