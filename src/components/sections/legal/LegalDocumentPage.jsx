import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { AboutContainer } from "@/components/sections/about/AboutContainer";

function LegalSection({ section }) {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-poppins)] text-[20px] font-normal leading-snug text-[#232222] lg:text-[24px]">
        {section.title}
      </h2>
      {section.type === "paragraph" ? (
        <p className="mt-2 font-[family-name:var(--font-poppins)] text-[15px] font-light leading-7 text-[#232222]">
          {section.content}
        </p>
      ) : (
        <ul className="mt-2 list-disc space-y-1 pl-6 font-[family-name:var(--font-poppins)] text-[15px] font-light leading-7 text-[#232222] lg:pl-8">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function LegalDocumentPage({ titleLead, titleRest, updated, sections }) {
  return (
    <main className="overflow-x-hidden bg-white">
      <section className="pb-16 pt-8 lg:pb-[84px] lg:pt-[24px]">
        <AboutContainer>
          <div className="max-w-[1184px]">
            <h1 className="font-[family-name:var(--font-poppins)] text-[32px] font-medium leading-tight text-[#232222] lg:text-[60px]">
              <span className="font-light">{titleLead}</span>
              <span className="text-green"> {titleRest}</span>
            </h1>
            <p className="mt-3 font-[family-name:var(--font-poppins)] text-[15px] leading-normal text-[#232222]">
              <span>Latest </span>
              <span className="text-orange">Updates-{updated}</span>
            </p>
            <div className="mt-7 space-y-8 lg:mt-[30px] lg:space-y-6">
              {sections.map((section) => (
                <LegalSection key={section.title} section={section} />
              ))}
            </div>
          </div>
        </AboutContainer>
      </section>
      <NewsletterSection />
    </main>
  );
}
