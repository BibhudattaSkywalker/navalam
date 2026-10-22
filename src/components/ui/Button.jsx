const variants = {
    primary: "gradient-orange border-0 text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)]",
    outline: "border-2 border-white bg-transparent text-white backdrop-blur-[14.1px]",
    "outline-orange": "border border-orange bg-transparent text-orange shadow-[0px_6px_17px_0px_rgba(120,80,20,0)]",
};
const sizes = {
    hero: "h-12 px-7 text-base leading-none cursor-pointer",
    lg: "h-11 px-6 text-base leading-none cursor-pointer",
    md: "h-10 px-5 text-sm leading-none cursor-pointer",
    sm: "h-9 px-5 text-sm leading-none cursor-pointer",
    xs: "h-8 px-4 text-xs leading-none cursor-pointer",
};
export function Button({ variant = "primary", size = "lg", children, className = "", ...props }) {
    return (<button className={`inline-flex items-center justify-center rounded-full font-[family-name:var(--font-lato)] transition-opacity hover:opacity-90 ${variants[variant]} ${sizes[size]} ${variant === "outline-orange" ? "font-[family-name:var(--font-outfit)]" : ""} ${className}`} {...props}>
      {children}
    </button>);
}
