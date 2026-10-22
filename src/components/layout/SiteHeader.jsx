import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Image from "@/components/next/Image";
import Link from "@/components/next/Link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Causes", href: "#" },
  { label: "Contact", href: "/contact" },
  { label: "Help", href: "#" },
  { label: "Blogs", href: "/blog" },
];

function activeLabel(pathname) {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/blog")) return "Blogs";
  if (pathname.startsWith("/contact")) return "Contact";
  if (pathname.startsWith("/about")) return "About Us";
  return "";
}

function MenuIcon({ open }) {
  return (
    <span className="relative block h-3.5 w-5" aria-hidden>
      <span
        className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition duration-300 ${
          open ? "top-1.5 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition duration-300 ${
          open ? "top-1.5 -rotate-45" : "top-3"
        }`}
      />
    </span>
  );
}

export function SiteHeader() {
  const { pathname } = useLocation();
  const overlay = pathname === "/";
  const current = activeLabel(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    }

    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const linkClass = (label) => {
    const active = label === current;
    if (overlay) {
      return `inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-3 text-center font-[family-name:var(--font-lato)] text-sm leading-none text-white transition hover:bg-white/10 ${
        active ? "gradient-orange font-medium" : ""
      }`;
    }
    return `inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-3 text-center font-[family-name:var(--font-lato)] text-sm leading-none transition ${
      active ? "gradient-orange font-medium text-white" : "text-foreground hover:bg-orange/10"
    }`;
  };

  return (
    <header
      ref={rootRef}
      className={`z-50 ${
        overlay
          ? "absolute inset-x-0 top-0"
          : "sticky top-0 border-b border-black/5 bg-white/95 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className="relative z-20 shrink-0">
          <Image
            src={overlay ? "/images/logo.png" : "/images/footer-logo.png"}
            alt="Nalvalam Foundation"
            width={265}
            height={109}
            priority
            className={`w-auto object-contain ${
              overlay
                ? "!h-14 mix-blend-lighten sm:!h-16"
                : "!h-12 sm:!h-14"
            }`}
          />
        </Link>

        <nav className="hidden lg:block" aria-label="Main navigation">
          <ul
            className={`flex items-center gap-1 rounded-full px-2 py-1 xl:gap-3 xl:px-2 ${
              overlay ? "glass-nav" : "border border-yellow/80"
            }`}
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={linkClass(link.label)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end">
          <Link
            href="/about/get-involved"
            className={`hidden h-11 items-center justify-center rounded-full px-5 font-[family-name:var(--font-lato)] text-sm leading-none lg:inline-flex ${
              overlay
                ? "glass-nav text-white"
                : "border border-yellow text-foreground"
            }`}
          >
            Join Now
          </Link>
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${
              overlay ? "glass-nav text-white" : "border border-yellow text-foreground"
            }`}
            aria-expanded={open}
            aria-controls="site-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <div
        id="site-mobile-menu"
        aria-hidden={!open}
        inert={open ? undefined : true}
        className={`overflow-hidden px-4 transition-[max-height,opacity] duration-300 ease-out sm:px-6 lg:hidden ${
          open ? "max-h-[28rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul
          className={`mb-4 rounded-2xl p-2 shadow-lg ${
            overlay
              ? "border border-white/40 bg-black/60 text-white backdrop-blur-md"
              : "border border-black/5 bg-white text-foreground"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`block rounded-xl px-3 py-3 font-[family-name:var(--font-lato)] text-sm ${
                  link.label === current ? "gradient-orange font-medium text-white" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/about/get-involved"
              className="mt-1 block rounded-full bg-orange/10 px-3 py-3 text-center font-[family-name:var(--font-lato)] text-sm"
              onClick={() => setOpen(false)}
            >
              Join Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
