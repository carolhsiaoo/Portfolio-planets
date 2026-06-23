import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "z4kjle0n",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error("Error: SANITY_WRITE_TOKEN env var is required.");
    process.exit(1);
  }

  // 1. Rename "Website Development" → "Tech" (or create if not found)
  const existing = await client.fetch(
    `*[_type == "category" && title == "Website Development"][0]`
  );

  if (existing) {
    await client
      .patch(existing._id)
      .set({ title: "Tech", slug: { _type: "slug", current: "tech" } })
      .commit();
    console.log(`Renamed "Website Development" → "Tech" (${existing._id})`);
  } else {
    const techExists = await client.fetch(
      `*[_type == "category" && title == "Tech"][0]._id`
    );
    if (!techExists) {
      const r = await client.create({
        _type: "category",
        title: "Tech",
        slug: { _type: "slug", current: "tech" },
      });
      console.log(`Created "Tech" (${r._id})`);
    } else {
      console.log(`"Tech" already exists (${techExists})`);
    }
  }

  // 2. Create "Design" and "BTS" if they don't exist
  for (const cat of [
    { title: "Design", slug: "design" },
    { title: "Behind the Scene", slug: "behind-the-scene" },
  ]) {
    const id = await client.fetch(
      `*[_type == "category" && title == "${cat.title}"][0]._id`
    );
    if (id) {
      console.log(`"${cat.title}" already exists (${id})`);
    } else {
      const r = await client.create({
        _type: "category",
        title: cat.title,
        slug: { _type: "slug", current: cat.slug },
      });
      console.log(`Created "${cat.title}" (${r._id})`);
    }
  }

  // 3. Assign "BTS" category to the "why-creative-developer" post
  const btsId = await client.fetch(
    `*[_type == "category" && title == "Behind the Scene"][0]._id`
  );
  const postId = await client.fetch(
    `*[_type == "post" && slug.current == "why-creative-developer"][0]._id`
  );

  if (btsId && postId) {
    await client
      .patch(postId)
      .set({ category: { _type: "reference", _ref: btsId } })
      .commit();
    console.log(`Assigned "BTS" category to "why-creative-developer" post`);
  }

  console.log("\nDone!");
}

main();
