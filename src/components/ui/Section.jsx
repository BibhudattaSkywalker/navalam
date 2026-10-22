import { useInView } from "@/hooks/useInView";

const bgClasses = {
  white: "",
  gray: "bg-[#f6f6f6]",
  "green-tint": "bg-[rgba(128,178,48,0.1)]",
  "orange-tint": "bg-[rgba(241,132,5,0.05)]",
  improvement: "bg-[rgba(185,184,181,0.08)]",
};

export function Section({
  id,
  children,
  className = "",
  innerClassName = "",
  bg = "white",
}) {
  const [ref, inView] = useInView(0, "0px 0px -80px 0px");

  return (
    <section
      ref={ref}
      id={id}
      className={`mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-14 ${bgClasses[bg]} ${inView ? "fade-up" : "reveal-pending"} ${className}`}
    >
      <div className={innerClassName}>{children}</div>
    </section>
  );
}
