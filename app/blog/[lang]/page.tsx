import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Header from "@/components/Header";

const VALID_LANGS = ["en", "zh-tw"] as const;

export function generateStaticParams() {
  return VALID_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return {
    title: lang === "zh-tw" ? "部落格 | Carol Hsiao" : "Blog | Carol Hsiao",
    description:
      lang === "zh-tw"
        ? "關於設計、開發與創作過程的想法。"
        : "Thoughts on design, development, and creative work.",
  };
}

export default async function BlogLangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!VALID_LANGS.includes(lang as (typeof VALID_LANGS)[number])) {
    notFound();
  }

  const posts = await getPosts(lang);

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

        {/* Language switcher */}
        <div className="inline-flex items-center rounded-full bg-neutral-100 p-1 mb-16">
          {([
            { code: "en", label: "EN" },
            { code: "zh-tw", label: "中文" },
          ] as const).map(({ code, label }) => (
            <Link
              key={code}
              href={`/blog/${code}`}
              className={`font-inter text-xs tracking-[0.15em] px-4 py-1.5 rounded-full transition-all duration-300 ${
                lang === code
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <p className="font-inter text-neutral-400">
            {lang === "zh-tw" ? "目前還沒有文章，請稍後再來！" : "No posts yet. Check back soon!"}
          </p>
        ) : (
          <div className="flex flex-col gap-20 sm:gap-28">
            {posts.map(
              (
                post: {
                  _id: string;
                  title: string;
                  slug: { current: string };
                  publishedAt: string;
                  excerpt?: string;
                  coverImage?: object;
                  category?: { title: string };
                },
                index: number
              ) => (
                <Link
                  key={post._id}
                  href={`/blog/${lang}/${post.slug.current}`}
                  className="group block"
                >
                  <article
                    className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-start`}
                  >
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
                    <div
                      className={`flex-1 flex flex-col justify-center ${post.coverImage ? "" : "lg:w-full"}`}
                    >
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


                      <div className="mt-8 flex items-center gap-4">
                        {post.publishedAt && (
                          <time className="font-inter text-[11px] text-neutral-400 tracking-[0.2em] uppercase">
                            {new Date(post.publishedAt).toLocaleDateString(
                              lang === "zh-tw" ? "zh-TW" : "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </time>
                        )}
                        <span className="font-inter text-[11px] tracking-[0.2em] uppercase text-neutral-400 group-hover:tracking-[0.3em] transition-all duration-500">
                          {lang === "zh-tw" ? "閱讀 →" : "Read →"}
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
