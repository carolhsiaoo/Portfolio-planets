import { client } from "./sanity";

export async function getPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      coverImage,
      category->{title, slug}
    }
  `);
}

export async function getPost(slug: string) {
  return client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      coverImage,
      body,
      category->{title, slug}
    }
  `,
    { slug }
  );
}
