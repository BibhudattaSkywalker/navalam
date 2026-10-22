import { useEffect, useState } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { useInView } from "@/hooks/useInView";

const stats = [
  { value: 25, suffix: "+", label: "Education for All Lives Compassion" },
  { value: 25, suffix: "+", label: "Education for All Lives Compassion" },
  { value: 25, suffix: "+", label: "Education for All Lives Compassion" },
  { value: 25, suffix: "+", label: "Education for All Lives Compassion" },
];

function CountUp({ value, suffix, start }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCurrent(value);
      return undefined;
    }

    const duration = 1400;
    const startTime = performance.now();
    let frame = 0;

    function tick(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, value]);

  return (
    <p className="font-[family-name:var(--font-poppins)] text-4xl font-semibold leading-none">
      {current}
      {suffix}
    </p>
  );
}

export function ImpactSection() {
  const [ref, inView] = useInView(0.35);

  return (
    <div ref={ref} className="relative z-10 mx-auto -mt-16 w-[calc(100%-2.5rem)] max-w-[1120px] sm:-mt-20">
      <div className="rounded-2xl bg-green px-5 py-8 shadow-[0px_12px_30px_rgba(128,178,48,0.25)] sm:px-8 sm:py-10">
        <div className="mb-6 text-center">
          <p className="font-[family-name:var(--font-poppins)] text-sm font-light text-white/90">
            Impact
          </p>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-medium text-white sm:text-4xl">
            Our Impact
          </h2>
          <div className="mt-3 flex justify-center">
            <AssetImage
              src="/images/icons/impact-line.svg"
              alt=""
              width={140}
              height={16}
              className="h-4 w-auto"
            />
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-white">
              <CountUp value={stat.value} suffix={stat.suffix} start={inView} />
              <p className="mt-3 text-sm leading-6 text-white/95">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
