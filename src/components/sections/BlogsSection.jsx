import { useEffect, useState } from "react";
import Image from "@/components/next/Image";
import { Pager } from "@/components/ui/Pager";
// import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import Link from "@/components/next/Link";

const blogs = [
  { title: "Recent events", featured: true, offset: "xl:mt-0" },
  { title: "Field updates", featured: false, offset: "xl:mt-10" },
  { title: "Awareness blogs", featured: false, offset: "xl:mt-20" },
  { title: "Press mentions", featured: false, offset: "xl:mt-6" },
];

export function BlogsSection() {
  const [items, setItems] = useState(blogs);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  useEffect(() => {
    fetch(`/api/posts?page=${page}&limit=4`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.posts?.length) return;
        setPagination(data.pagination);
        const offsets = ["xl:mt-0", "xl:mt-10", "xl:mt-20", "xl:mt-6"];
        setItems(data.posts.map((post, index) => ({
          title: post.title,
          excerpt: post.excerpt,
          image: post.image || "/images/blog.jpg",
          href: `/blog/${post.slug}`,
          featured: index === 0,
          offset: offsets[index] || "xl:mt-0",
        })));
      })
      .catch(() => {});
  }, [page]);
  return (
    <Section>
      <div className="rounded-[28px] bg-[rgba(128,178,48,0.12)] px-5 py-12 sm:px-8 xl:pb-16">
        <h2 className="section-title text-center">
          Latest News <span className="font-medium text-green">/Blogs</span>
        </h2>
        <p className="section-copy mx-auto mt-4 max-w-3xl text-center text-[#8d8d8d]">
          We work together to uplift communities through compassion, action,
          sustainability, and long-term social impact. Driven by empathy, we
          support vulnerable communities by inspire hope and dignity.
        </p>

        <div className="mt-10 grid items-start gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((blog) => (
            <article
              key={blog.title}
              className={`flex flex-col rounded-[24px] bg-white p-3 shadow-[0px_8px_24px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 ${blog.offset}`}
            >
              <div className="relative h-44 overflow-hidden rounded-[18px]">
                <Image
                  src={blog.image || "/images/blog.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 px-2 font-[family-name:var(--font-poppins)] text-lg font-semibold text-[#2c2c2c]">
                {blog.title}
              </h3>
              <p className="mt-2 flex-1 px-2 text-sm leading-6 text-[#8a8a8a]">
                {blog.excerpt || "NGO registration requires documents, identity proofs, address."}
              </p>
              <div className="mt-4 px-2 pb-2">
                {blog.featured ? (
                  // <Button size="xs">Read More..</Button>
                  <Link
              href="#"
              className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:h-11 sm:px-8 sm:text-base"
            >
              Read More..
            </Link>
                ) : (
                  // <Button variant="outline-orange" size="sm">
                  //   Read More..
                  // </Button>
                  <Link
              href="#"
              className="gradient-orange inline-flex h-11 items-center justify-center rounded-full px-6 font-[family-name:var(--font-lato)] text-sm text-white sm:h-11 sm:px-8 sm:text-base"
            >
              Read More..
            </Link>
                )}
              </div>
            </article>
          ))}
        </div>
        <Pager pagination={pagination} onPage={setPage} className="mt-10" />
      </div>
    </Section>
  );
}
