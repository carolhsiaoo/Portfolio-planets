import { notFound } from "next/navigation";
import { getPost } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-(--background) text-(--foreground)">
      <Header hideOnScroll />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 pt-28 pb-20 font-noto-sans">
        <Link
          href="/blog"
          className="text-(--foreground)/40 hover:text-(--foreground)/70 transition-opacity duration-500 mb-8 inline-block font-inter text-sm tracking-wider"
        >
          &larr; BACK TO BLOG
        </Link>

        {post.category && (
          <span className="block text-xs font-inter font-medium tracking-widest uppercase text-(--foreground)/40 mb-2">
            {post.category.title}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-medium mb-4 leading-[1.05] text-neutral-900">
          {post.title}
        </h1>

        {post.publishedAt && (
          <time className="text-sm text-(--foreground)/40 block mb-10 font-inter">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}

        {post.coverImage && (
          <div className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden">
            <Image
              src={urlFor(post.coverImage).width(1200).height(600).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none font-noto-sans text-(--foreground) prose-headings:font-cinzel prose-a:text-(--foreground) prose-a:underline prose-strong:text-(--foreground)">
          <PortableText
            value={post.body}
            components={{
              types: {
                image: ({ value }) => (
                  <div className="relative w-full h-64 md:h-96 my-8 rounded-lg overflow-hidden">
                    <Image
                      src={urlFor(value).width(1200).height(600).url()}
                      alt={value.alt || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                ),
              },
            }}
          />
        </div>
      </main>
    </div>
  );
}
