import { client, fetchOptions } from "./sanity";

export async function getPosts(lang: string = "en") {
  const isZh = lang === "zh-tw";
  return client.fetch(
    `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      "title": select(
        ${isZh} && title_zhTw != null => title_zhTw,
        title
      ),
      slug,
      publishedAt,
      "excerpt": select(
        ${isZh} && excerpt_zhTw != null => excerpt_zhTw,
        excerpt
      ),
      coverImage,
      category->{title, slug}
    }
  `,
    {},
    fetchOptions
  );
}

export async function getPost(slug: string, lang: string = "en") {
  const isZh = lang === "zh-tw";
  return client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      "title": select(
        ${isZh} && title_zhTw != null => title_zhTw,
        title
      ),
      slug,
      publishedAt,
      "excerpt": select(
        ${isZh} && excerpt_zhTw != null => excerpt_zhTw,
        excerpt
      ),
      coverImage,
      "body": select(
        ${isZh} && body_zhTw != null => body_zhTw[] {
          ...,
          _type == "video" => {
            ...,
            "videoUrl": asset->url
          }
        },
        body[] {
          ...,
          _type == "video" => {
            ...,
            "videoUrl": asset->url
          }
        }
      ),
      category->{title, slug}
    }
  `,
    { slug },
    fetchOptions
  );
}

export async function getAdjacentPosts(slug: string, lang: string = "en") {
  const isZh = lang === "zh-tw";
  const allPosts = await client.fetch(
    `
    *[_type == "post"] | order(publishedAt desc) {
      "slug": slug.current,
      "title": select(
        ${isZh} && title_zhTw != null => title_zhTw,
        title
      )
    }
  `,
    {},
    fetchOptions
  );

  const currentIndex = allPosts.findIndex((p: { slug: string }) => p.slug === slug);
  if (currentIndex === -1) return { prev: null, next: null };

  const total = allPosts.length;
  const prev = allPosts[(currentIndex + 1) % total]; // older post (next in desc order)
  const next = allPosts[(currentIndex - 1 + total) % total]; // newer post

  return { prev, next };
}
