import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
import { AboutContainer } from "@/components/sections/about/AboutContainer";
const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Causes", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Help", href: "#" },
    { label: "Blogs", href: "/blog" },
];
const pillLeftByIndex = [0, 142, 308, 500, 648, 757];
export function SiteNavbar({ activeLink = "About Us" }) {
    const activeIndex = navLinks.findIndex((l) => l.label === activeLink);
    return (<AboutContainer className="relative z-30 pt-[52px] lg:px-0">
      <div className="relative hidden h-[109px] lg:block">
        <Link href="/" className="absolute left-[69px] top-0">
          <Image src="/images/footer-logo.png" alt="Nalvalam Foundation" width={265} height={109} className="h-[109px] w-[265px] object-contain" priority/>
        </Link>

        <nav className="absolute left-[420px] top-[19px] h-[90px] w-[887px] rounded-full border-2 border-yellow backdrop-blur-[14.1px]" aria-label="Main navigation">
          {activeIndex >= 0 && (<div className="absolute top-[10px] h-[70px] w-[163px] rounded-full gradient-orange" style={{ left: `${pillLeftByIndex[activeIndex]}px` }}/>)}
          <ul className="relative z-10 flex h-full items-center pl-[40px] font-[family-name:var(--font-lato)] text-[28px]">
            {navLinks.map((link, i) => (<li key={link.label} style={{ marginLeft: i === 0 ? 0 : 50 }}>
                <Link href={link.href} className={`block whitespace-nowrap ${link.label === activeLink
                ? "font-medium text-white"
                : "text-foreground"}`}>
                  {link.label}
                </Link>
              </li>))}
          </ul>
        </nav>

        <Link href="#" className="absolute left-[1478px] top-[19px] flex h-[90px] w-[186px] items-center justify-center rounded-full border-2 border-yellow backdrop-blur-[14.1px]">
          <span className="font-[family-name:var(--font-lato)] text-[28px] text-foreground">
            Join Now
          </span>
        </Link>
      </div>

      <div className="flex items-center justify-between px-[27px] lg:hidden">
        <Link href="/">
          <Image src="/images/footer-logo.png" alt="Nalvalam Foundation" width={265} height={109} className="h-[70px] w-auto" priority/>
        </Link>
        <div className="flex h-12 items-center justify-center rounded-full border-2 border-yellow px-6">
          <span className="font-[family-name:var(--font-lato)] text-sm text-foreground">
            Menu
          </span>
        </div>
      </div>
    </AboutContainer>);
}
