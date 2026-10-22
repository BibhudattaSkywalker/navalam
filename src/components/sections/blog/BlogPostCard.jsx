import Image from "@/components/next/Image";
import Link from "@/components/next/Link";
export function BlogPostCard({ category, title, description, image, avatar, author, date, href, }) {
    return (<article className="flex h-full min-h-[385px] flex-col gap-8 bg-white px-6 pb-8 pt-6 shadow-[0px_12px_8px_rgba(16,24,40,0.08),0px_4px_3px_rgba(16,24,40,0.03)] lg:min-h-[429px] lg:gap-8 lg:px-6 lg:pb-8 lg:pt-6">
      <div className="relative h-[168px] w-full overflow-hidden lg:h-[192px]">
        <Image src={image} alt="" fill className="object-cover" sizes="384px"/>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-3">
          <p className="font-[family-name:var(--font-inter)] text-[14px] font-semibold leading-[20px] text-[#6941c6]">
            {category}
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <Link href={href} className="group flex-1">
                <h3 className="font-[family-name:var(--font-inter)] text-[20px] font-semibold leading-[26px] text-[#101828] transition-opacity group-hover:opacity-70 lg:text-[22px]">
                  {title}
                </h3>
              </Link>
              <Link href={href} className="mt-1 shrink-0 transition-opacity hover:opacity-70" aria-label={`Read ${title}`}>
                <Image src="/images/blog/arrow-up-right.svg" alt="" width={24} height={24} className="h-6 w-6"/>
              </Link>
            </div>

            <p className="font-[family-name:var(--font-inter)] text-[15px] font-normal leading-[22px] text-[#667085]">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image src={avatar} alt="" fill className="object-cover" sizes="40px"/>
          </div>
          <div>
            <p className="font-[family-name:var(--font-inter)] text-[14px] font-medium leading-[20px] text-[#101828]">
              {author}
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[20px] text-[#667085]">
              {date}
            </p>
          </div>
        </div>
      </div>
    </article>);
}
