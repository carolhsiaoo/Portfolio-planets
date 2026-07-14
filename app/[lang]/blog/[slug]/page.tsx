import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getAdjacentPosts } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import SanityTable from "@/components/SanityTable";
import FadeInSection from "@/components/FadeInSection";
import BlogPostNavLink from "@/components/BlogPostNavLink";

function sanityLang(lang: string) {
  return lang === 'zh' ? 'zh-tw' : 'en';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getPost(slug, sanityLang(lang));
  if (!post) return {};

  const title = post.title;
  const description =
    post.excerpt || `${post.title} — a blog post by Carol Hsiao`;
  const image = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      ...(image && { images: [{ url: image, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const sLang = sanityLang(lang);
  const post = await getPost(slug, sLang);

  if (!post) notFound();

  const { prev, next } = await getAdjacentPosts(slug, sLang);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-16 sm:pb-24">
      {/* Header — same behavior as the case study pages: hidden at the top
          and while scrolling down; shows when scrolling up */}
      <Header hideOnScroll hideAtTop />

      {/* Floating white panel — the post itself, presented like a modal
          over the dark backdrop (matches the project case study pages) */}
      <div className="sm:px-5 sm:pt-5">
        <div className="relative bg-white rounded-b-2xl sm:rounded-3xl overflow-hidden">
          {/* Close — back to the blog list */}
          <Link
            href={`/${lang}/blog`}
            aria-label="Close post"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black text-white transition-colors duration-300 hover:bg-[#333]"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>

          <main className="max-w-3xl mx-auto px-6 sm:px-8 md:px-10 pt-20 sm:pt-28 pb-20 sm:pb-28 font-noto-sans text-(--foreground)">
        {/* Keyed by slug so prev/next navigation remounts these and replays
            the entrance animation (page client components otherwise keep
            their state when only the route params change) */}
        <FadeInSection key={`title-${slug}`} direction="bottom">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-cinzel font-semibold mb-8 leading-[1.05] text-neutral-900">
            {post.title}
          </h1>
        </FadeInSection>

        <FadeInSection key={`meta-${slug}`} direction="bottom" delay={150}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-14">
          {post.category?.title && (
            <>
              <span className="font-inter text-xs sm:text-sm text-neutral-500 tracking-[0.2em] uppercase">
                {post.category.title}
              </span>
              <span className="text-neutral-500 leading-none -translate-y-0.5 hidden sm:inline">·</span>
            </>
          )}
          {post.publishedAt && (
            <time className="font-inter text-xs sm:text-sm text-neutral-500 tracking-[0.2em] uppercase">
              {new Date(post.publishedAt).toLocaleDateString(
                lang === "zh" ? "zh-TW" : "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </time>
          )}
        </div>
        </FadeInSection>

        {post.coverImage && (
          <div className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={urlFor(post.coverImage).width(1200).height(600).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none font-noto-sans text-(--foreground) prose-headings:font-cinzel prose-h2:font-medium prose-h3:font-medium prose-a:text-(--foreground) prose-a:underline prose-strong:text-(--foreground) prose-img:rounded-lg prose-img:m-0 prose-video:m-0">
          <PortableText
            value={post.body}
            components={{
              types: {
                table: SanityTable,
                divider: () => (
                  <div className="flex items-center justify-center gap-4 my-12 select-none">
                    <div className="h-px flex-1 bg-linear-to-r from-transparent via-neutral-300 to-transparent" />
                    <span className="text-neutral-300 text-xs tracking-[0.5em]">&#x2726;&#x2726;&#x2726;</span>
                    <div className="h-px flex-1 bg-linear-to-r from-transparent via-neutral-300 to-transparent" />
                  </div>
                ),
                codeBlock: ({ value }) => (
                  <pre className="bg-neutral-900 text-neutral-100 rounded-xl p-5 my-6 overflow-x-auto text-sm leading-relaxed font-mono border border-neutral-800">
                    <code>{value.code}</code>
                  </pre>
                ),
                video: ({ value }) => (
                  <figure className="my-8">
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <video
                        src={value.videoUrl}
                        controls
                        className="w-full"
                      />
                    </div>
                    {value.caption && (
                      <figcaption className="mt-3 text-sm font-inter text-gray-500 text-center">
                        <PortableText
                          value={value.caption}
                          components={{
                            marks: {
                              link: ({ children, value: mark }) => (
                                <a
                                  href={mark?.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-500! underline hover:text-gray-700! transition-colors"
                                >
                                  {children}
                                </a>
                              ),
                            },
                          }}
                        />
                      </figcaption>
                    )}
                  </figure>
                ),
                image: ({ value }) => (
                  <figure className="my-8">
                    <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={urlFor(value).width(1200).height(600).url()}
                        alt={value.alt || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {value.caption && (
                      <figcaption className="mt-3 text-sm font-inter text-gray-500 text-center">
                        <PortableText
                          value={value.caption}
                          components={{
                            marks: {
                              link: ({ children, value: mark }) => (
                                <a
                                  href={mark?.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-500! underline hover:text-gray-700! transition-colors"
                                >
                                  {children}
                                </a>
                              ),
                            },
                          }}
                        />
                      </figcaption>
                    )}
                  </figure>
                ),
              },
            }}
          />
        </div>

          </main>
        </div>
      </div>

      {/* Previous / next — quiet text links on the dark backdrop,
          pushed to the edges (matches the case study prev/next) */}
      {(prev || next) && (
        <nav className="pt-16 sm:pt-24 px-6 sm:px-10 lg:px-16 flex justify-between items-start gap-6 sm:gap-8 font-inter">
          {prev ? (
            <BlogPostNavLink
              href={`/${lang}/blog/${prev.slug}`}
              className="group flex flex-col gap-3 max-w-[45%]"
            >
              <span className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-white/60 transition-colors duration-300 group-hover:text-white">
                <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
                {lang === "zh" ? "上一篇" : "Prev"}
              </span>
              <span className="font-cinzel font-medium text-base md:text-xl lg:text-2xl text-white/60 transition-colors duration-300 group-hover:text-white line-clamp-2">
                {prev.title}
              </span>
            </BlogPostNavLink>
          ) : (
            <div />
          )}
          {next && (
            <BlogPostNavLink
              href={`/${lang}/blog/${next.slug}`}
              className="group flex flex-col items-end gap-3 max-w-[45%] ml-auto text-right"
            >
              <span className="flex items-center justify-end gap-2 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-white/60 transition-colors duration-300 group-hover:text-white">
                {lang === "zh" ? "下一篇" : "Next"}
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </span>
              <span className="font-cinzel font-medium text-base md:text-xl lg:text-2xl text-white/60 transition-colors duration-300 group-hover:text-white line-clamp-2">
                {next.title}
              </span>
            </BlogPostNavLink>
          )}
        </nav>
      )}
    </div>
  );
}
