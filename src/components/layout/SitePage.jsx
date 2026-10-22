import { useLayoutEffect, useRef } from "react";

export function SitePage({ children }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = [...root.querySelectorAll("section")].slice(1);
    if (reduce || sections.length === 0) return undefined;

    sections.forEach((node) => node.classList.add("reveal-pending"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("reveal-pending");
          entry.target.classList.add("fade-up");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -48px 0px", threshold: 0.01 },
    );

    sections.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="site-page">
      {children}
    </div>
  );
}
