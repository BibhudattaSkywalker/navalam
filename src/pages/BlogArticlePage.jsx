import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "@/components/next/Image";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export const pageMeta = {
  title: "Blog | Nalvalam Foundation",
  description: "Stories and updates from Nalvalam Foundation.",
};

export default function BlogArticlePage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((response) => {
        if (!response.ok) throw new Error("missing");
        return response.json();
      })
      .then((data) => {
        setPost(data.post);
        document.title = `${data.post.seoTitle || data.post.title} | Nalvalam Foundation`;
      })
      .catch(() => setMissing(true));
  }, [slug]);

  return (
    <main className="overflow-x-hidden bg-white">
      <article className="mx-auto max-w-[860px] px-6 py-12 sm:px-8 lg:py-16">
        {missing ? <h1 className="font-[family-name:var(--font-poppins)] text-4xl">This story is not available.</h1> : null}
        {post ? (
          <>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#80b230]">{post.category}</p>
            <h1 className="mt-3 font-[family-name:var(--font-poppins)] text-4xl leading-tight text-[#232222] lg:text-5xl">{post.title}</h1>
            <p className="mt-3 text-sm text-[#667085]">{post.author}</p>
            {post.image ? (
              <div className="relative mt-8 h-64 overflow-hidden rounded-3xl sm:h-80">
                <Image src={post.image} alt="" fill className="object-cover" />
              </div>
            ) : null}
            <div className="mt-8 space-y-4 text-[16px] leading-8 text-[#3f3f3f]">
              {post.content.split(/\n\n+/).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </>
        ) : null}
      </article>
      <NewsletterSection />
    </main>
  );
}
