import { useEffect, useState } from "react";

export function useCountUp(value, start) {
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

  return current;
}

export function CountUp({ value, suffix = "", start }) {
  const current = useCountUp(value, start);
  const text = value >= 10000 ? current.toLocaleString("en-US") : String(current);

  return (
    <span className="tabular-nums">
      {text}{suffix}
    </span>
  );
}
