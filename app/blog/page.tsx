import Link from "next/link";
import { getPosts } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Header from "@/components/Header";

export const metadata = {
  title: "Blog | Carol Hsiao",
  description: "Thoughts on design, development, and creative work.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Header />
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 sm:pt-40 pb-24">
        <span className="block font-inter text-xs tracking-widest uppercase text-neutral-400 mb-4">
          Writing
        </span>
        <h1 className="font-cinzel font-medium text-4xl sm:text-5xl md:text-6xl text-neutral-900 leading-[1.1] mb-6">
          Blog
        </h1>
        <p className="font-inter text-base sm:text-lg text-neutral-500 max-w-xl mb-20">
          Thoughts on design, development, and creative work.
        </p>

        {posts.length === 0 ? (
          <p className="font-inter text-neutral-400">No posts yet. Check back soon!</p>
        ) : (
          <div className="flex flex-col">
            {posts.map(
              (post: {
                _id: string;
                title: string;
                slug: { current: string };
                publishedAt: string;
                excerpt?: string;
                coverImage?: object;
                category?: { title: string };
              }) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group border-t border-neutral-200 last:border-b py-8 sm:py-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 transition-opacity duration-300 hover:opacity-70"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-4 mb-3">
                      {post.category && (
                        <span className="font-inter text-xs tracking-widest uppercase text-neutral-400">
                          {post.category.title}
                        </span>
                      )}
                      {post.publishedAt && (
                        <span className="font-inter text-xs sm:text-sm text-neutral-400">
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      )}
                    </div>
                    <h2 className="font-cinzel font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-900 leading-[1.1]">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="font-inter text-neutral-500 mt-4 line-clamp-2 max-w-2xl text-sm sm:text-base">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  {post.coverImage && (
                    <div className="relative w-full lg:w-80 h-48 sm:h-56 lg:h-52 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={urlFor(post.coverImage)
                          .width(640)
                          .height(420)
                          .url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  )}
                </Link>
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
}
