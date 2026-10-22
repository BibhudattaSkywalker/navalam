import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Cou Causes", href: "#" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "Help", href: "#" },
];
const helpLinks = ["Trust", "Testimonials", "New Updates"];
const exploreLinks = ["Blog", "Testimonials", "Educations"];
const socialLinks = [
    "facebook",
    "Twitter",
    "Instagram",
    "Youtube",
    "Pinterest",
];
function FooterColumn({ title, links, }) {
    return (<div className="min-w-[150px]">
      <h3 className="font-[family-name:var(--font-manrope)] text-xl font-extrabold text-footer-blue">
        {title}
      </h3>
      <div className="mt-2 h-[5px] w-8 rounded-sm bg-orange"/>
      <ul className="mt-5 space-y-3">
        {links.map((link) => {
            const label = typeof link === "string" ? link : link.label;
            const href = typeof link === "string" ? "#" : link.href;
            return (<li key={label}>
              <Link href={href} className="font-[family-name:var(--font-inter)] text-[15px] font-medium text-footer-text capitalize transition-colors hover:text-orange">
                {label}
              </Link>
            </li>);
        })}
      </ul>
    </div>);
}
export function Footer() {
    return (<footer className="w-full bg-white pt-12 lg:pt-0">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 pt-12 lg:flex-row lg:items-start lg:gap-16 lg:pt-16">
          {/* Brand column */}
          <div className="w-full max-w-[265px] shrink-0">
            <Image src="/images/footer-logo.png" alt="Nalvalam Foundation" width={266} height={109} className="h-auto w-[180px]"/>
            <p className="mt-6 font-[family-name:var(--font-inter)] text-[15px] leading-7 text-footer-text">
              Browned butter and brown sugar
              <br />
              caramelly goodness, crispy edges
              <br />
              thick and soft centers and melty
              <br />
              little puddles of chocolate.
            </p>
          </div>

          {/* Link columns — horizontal row matching Figma */}
          <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            <FooterColumn title="Company" links={companyLinks}/>
            <FooterColumn title="Get Help" links={helpLinks}/>
            <FooterColumn title="Explore" links={exploreLinks}/>
            <FooterColumn title="Follow us On" links={socialLinks}/>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[#dfdfdf] py-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-4 font-[family-name:var(--font-inter)] text-[16px] leading-[28px] text-footer-text">
            <Link href="/privacy-policy-terms" className="hover:text-orange">
              Privacy Policy & Terms
            </Link>
            <span className="h-1 w-1 rounded-sm bg-[#7c91aa]"/>
            <Link href="/terms-of-use" className="hover:text-orange">
              Terms of Use
            </Link>
            <span className="h-1 w-1 rounded-sm bg-[#7c91aa]"/>
            <Link href="/refund-policy" className="hover:text-orange">
              Refund Policy
            </Link>
            <span className="h-1 w-1 rounded-sm bg-[#7c91aa]"/>
            <a href="#" className="hover:text-orange">
              Site Credits
            </a>
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[16px] leading-[28px] text-footer-text">
            © 2023 All Rights Reserved
          </p>
        </div>
      </div>
    </footer>);
}
