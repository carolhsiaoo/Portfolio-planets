import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getAdjacentPosts } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import SanityTable from "@/components/SanityTable";

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
    <div className="min-h-screen bg-(--background) text-(--foreground)">
      <Header hideOnScroll />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 pt-28 pb-20 font-noto-sans">
        <Link
          href={`/${lang}/blog`}
          className="text-(--foreground)/40 hover:text-(--foreground)/70 transition-opacity duration-500 mb-8 inline-block font-inter text-sm tracking-wider"
        >
          &larr; BACK TO BLOG
        </Link>

        <h1 className="text-4xl sm:text-5xl lg:text-5xl font-cinzel font-semibold mb-4 leading-[1.05] text-neutral-900">
          {post.title}
        </h1>

        {post.publishedAt && (
          <time className="text-sm text-(--foreground)/40 block mb-10 font-inter">
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

        <nav className="flex justify-between items-center mt-16 pt-8 border-t border-(--foreground)/10 font-inter text-base">
          {prev && (
            <Link
              href={`/${lang}/blog/${prev.slug}`}
              className="group flex flex-col gap-1 max-w-[45%]"
            >
              <span className="text-(--foreground)/70 group-hover:text-(--foreground) tracking-wider text-sm transition-colors duration-300">&larr; {lang === "zh" ? "上一篇" : "PREVIOUS"}</span>
              <span className="text-(--foreground)/70 group-hover:text-(--foreground) transition-colors duration-300 line-clamp-2">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/${lang}/blog/${next.slug}`}
              className="group flex flex-col items-end gap-1 max-w-[45%] ml-auto"
            >
              <span className="text-(--foreground)/70 group-hover:text-(--foreground) tracking-wider text-sm transition-colors duration-300">{lang === "zh" ? "下一篇" : "NEXT"} &rarr;</span>
              <span className="text-(--foreground)/70 group-hover:text-(--foreground) transition-colors duration-300 line-clamp-2 text-right">{next.title}</span>
            </Link>
          )}
        </nav>
      </main>
    </div>
  );
}
