import { useEffect, useRef, useState } from "react";
import { Pager } from "@/components/ui/Pager";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { AboutContainer } from "@/components/sections/about/AboutContainer";
import { BlogPostCard, } from "@/components/sections/blog/BlogPostCard";
const blogPosts = [
    {
        category: "Cleaning food",
        title: "Food Distribution Drive",
        description: "Our food distribution program focuses on delivering nutritious ration to families in need. ",
        image: "/images/blog/card-1.png",
        avatar: "/images/blog/avatar-1.png",
        author: "Olivia Rhye",
        date: "20 Jan 2022",
        href: "/about/programs/food-distribution-drive",
    },
    {
        category: "childhood",
        title: "Child Welfare & Care",
        description: "We are committed to the safety, health, and overall development of children. By providing education, care, and emotional support.",
        image: "/images/blog/card-2.png",
        avatar: "/images/blog/avatar-2.png",
        author: "Phoenix Baker",
        date: "19 Jan 2022",
        href: "/about/programs/child-welfare-care",
    },
    {
        category: "Ngo children",
        title: "Community Support Programs",
        description: "We work closely with local communities to promote sustainable development. These programs empower individuals",
        image: "/images/blog/card-3.png",
        avatar: "/images/blog/avatar-3.png",
        author: "Lana Steiner",
        date: "18 Jan 2022",
        href: "/about/programs/community-support",
    },
    {
        category: "Health",
        title: "Healthcare Assistance",
        description: "Providing access to basic healthcare is one of our key initiatives. Through medical support and health awareness.",
        image: "/images/blog/card-4.png",
        avatar: "/images/blog/avatar-4.png",
        author: "Alec Whitten",
        date: "17 Jan 2022",
        href: "/about/programs/healthcare-assistance",
    },
    {
        category: "Food",
        title: "Education for All",
        description: "Education is a fundamental right for every child. Our initiative supports underprivileged students with learning resources.",
        image: "/images/blog/card-5.png",
        avatar: "/images/blog/avatar-5.png",
        author: "Demi WIlkinson",
        date: "16 Jan 2022",
        href: "/about/programs/education-for-all",
    },
    {
        category: "water",
        title: "Women Empowerment Initiative",
        description: "Empowering women is essential for building strong communities. Through skill development and support programs.",
        image: "/images/blog/card-6.png",
        avatar: "/images/blog/avatar-6.png",
        author: "Candice Wu",
        date: "15 Jan 2022",
        href: "/about/programs/women-empowerment",
    },
];
const PAGE_SIZES = [6, 9, 12, 24];

export function BlogPage() {
    const [posts, setPosts] = useState(blogPosts);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
    const [pagination, setPagination] = useState(null);
    const listTop = useRef(null);
    useEffect(() => {
        fetch(`/api/posts?page=${page}&limit=${pageSize}`)
            .then((response) => response.json())
            .then((data) => {
                if (!data.posts?.length) return;
                setPagination(data.pagination);
                setPosts(data.posts.map((post) => ({
                    category: post.category,
                    title: post.title,
                    description: post.excerpt,
                    image: post.image || "/images/blog/card-1.png",
                    avatar: "/images/blog/avatar-1.png",
                    author: post.author,
                    date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "",
                    href: `/blog/${post.slug}`,
                })));
            })
            .catch(() => {});
    }, [page, pageSize]);
    const changePageSize = (size) => {
        setPageSize(size);
        setPage(1);
    };
    const goToPage = (next) => {
        setPage(next);
        listTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    return (<main className="overflow-x-hidden bg-[#fffdfd]">

      <section className="pb-12 pt-8 lg:pb-16 lg:pt-12">
        <AboutContainer>
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-poppins)] text-[32px] leading-[1.1] text-[#232222] lg:text-[60px] lg:leading-[61px]">
              <span>Our </span>
              <span className="font-medium text-green">Blog</span>
            </h1>
            <div className="mx-auto mt-6 max-w-[805px] font-[family-name:var(--font-poppins)] text-[16px] font-light leading-[26px] text-[#909090] lg:text-[15px]">
              <p>
                communities thrive when empathy, action Updates, stories, and
                insights from our work on the ground
              </p>
              <p>Sharing impact, voices, and change from our community </p>
            </div>
          </div>

          <div ref={listTop} className="mx-auto mt-12 max-w-[973px] scroll-mt-24 space-y-8 lg:mt-[65px] lg:space-y-[38px]">
            <div className="flex justify-end">
              <label className="flex items-center gap-2 font-[family-name:var(--font-poppins)] text-[14px] text-[#909090]">
                Posts per page
                <select
                  value={pageSize}
                  onChange={(event) => changePageSize(Number(event.target.value))}
                  className="h-10 rounded-full border border-[#d9d9d9] bg-white px-4 text-[14px] text-[#232222] outline-none focus:border-green"
                >
                  {PAGE_SIZES.map((size) => (<option key={size} value={size}>{size}</option>))}
                </select>
              </label>
            </div>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
              {posts.slice(0, 3).map((post) => (<BlogPostCard key={post.title} {...post}/>))}
            </div>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
              {posts.slice(3).map((post) => (<BlogPostCard key={post.title} {...post}/>))}
            </div>
            <Pager pagination={pagination} onPage={goToPage} className="pt-4"/>
          </div>
        </AboutContainer>
      </section>

      <NewsletterSection />
    </main>);
}
