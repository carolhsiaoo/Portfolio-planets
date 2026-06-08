import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Header from "@/components/Header";
import FadeInSection from "@/components/FadeInSection";
import SyncLanguage from "@/components/SyncLanguage";

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
      <SyncLanguage lang={lang} />
      <Header />
      {/* Hero */}
      <section className="pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-[#1a1a1a]">
            {lang === "zh-tw" ? "部落格" : "Blog"}
          </h1>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl font-noto-sans text-[#1a1a1a]/60 max-w-2xl">
            {lang === "zh-tw" ? "關於設計、開發與創作過程的想法。" : "Design, code & creative process"}
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32 md:py-40">

        <FadeInSection delay={200}>
        {posts.length === 0 ? (
          <p className="font-inter text-neutral-400">
            {lang === "zh-tw" ? "目前還沒有文章，請稍後再來！" : "No posts yet. Check back soon!"}
          </p>
        ) : (
          <div className="flex flex-col gap-10 sm:gap-14">
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
                <div key={post._id}>
                {index > 0 && (
                  <hr className="border-t border-neutral-200 mb-10 sm:mb-14" />
                )}
                <Link
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

                      <h2 className="font-cinzel font-medium text-3xl sm:text-4xl lg:text-5xl text-neutral-900 leading-[1.05] group-hover:text-black group-hover:scale-[1.02] origin-left transition-all duration-500">
                        {post.title}
                      </h2>


                      <div className="mt-8 flex items-center gap-4">
                        {post.publishedAt && (
                          <time className="font-inter text-sm text-neutral-400 tracking-[0.2em] uppercase">
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
                      </div>
                    </div>
                  </article>
                </Link>
                </div>
              )
            )}
          </div>
        )}
        </FadeInSection>
      </main>
    </div>
  );
}
