import { client } from "./sanity";

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
  `
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
    { slug }
  );
}
