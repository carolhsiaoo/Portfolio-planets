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
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 sm:pt-44 pb-24">
        {/* Editorial hero header */}
        <div className="mb-24 sm:mb-32">
          <h1 className="font-cinzel font-medium text-5xl sm:text-6xl md:text-7xl text-neutral-900 leading-[0.95] tracking-tight">
            Journal
          </h1>
          <div className="mt-6 flex items-center gap-4">
            <div className="h-px bg-neutral-300 w-16" />
            <p className="font-inter text-sm sm:text-base text-neutral-400 tracking-wide">
              Design, code & creative process
            </p>
          </div>
        </div>

        {posts.length === 0 ? (
          <p className="font-inter text-neutral-400">No posts yet. Check back soon!</p>
        ) : (
          <div className="flex flex-col gap-20 sm:gap-28">
            {posts.map(
              (post: {
                _id: string;
                title: string;
                slug: { current: string };
                publishedAt: string;
                excerpt?: string;
                coverImage?: object;
                category?: { title: string };
              }, index: number) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group block"
                >
                  <article className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-start`}>
                    {/* Image */}
                    {post.coverImage && (
                      <div className="relative w-full lg:w-[40%] aspect-4/3 overflow-hidden rounded-sm">
                        <Image
                          src={urlFor(post.coverImage)
                            .width(900)
                            .height(560)
                            .url()}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className={`flex-1 flex flex-col justify-center ${post.coverImage ? '' : 'lg:w-full'}`}>
                      <div className="flex items-center gap-3 mb-5">
                        <span className="font-inter text-[11px] tracking-[0.2em] uppercase text-neutral-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {post.category && (
                          <>
                            <span className="text-neutral-300">/</span>
                            <span className="font-inter text-[11px] tracking-[0.2em] uppercase text-neutral-400">
                              {post.category.title}
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="font-cinzel font-medium text-3xl sm:text-4xl lg:text-5xl text-neutral-900 leading-[1.05] group-hover:text-black group-hover:scale-[1.02] origin-left transition-all duration-500">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="font-inter text-neutral-500 mt-5 leading-relaxed line-clamp-3 text-sm sm:text-base max-w-lg">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="mt-8 flex items-center gap-4">
                        {post.publishedAt && (
                          <time className="font-inter text-[11px] text-neutral-400 tracking-[0.2em] uppercase">
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </time>
                        )}
                        <span className="font-inter text-[11px] tracking-[0.2em] uppercase text-neutral-400 group-hover:tracking-[0.3em] transition-all duration-500">
                          Read &rarr;
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
}
