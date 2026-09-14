import fs from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";

// Inserts side-by-side Windows vs Mac comparison blocks (type "videoCompare")
// into the "better-screens-reveal-more-flaws" post, right after:
//   1. the "same effect looks different on Windows vs Mac" paragraph
//   2. the "the right direction was to draw the blob finer" paragraph
//
// Usage:
//   # Insert empty placeholders (upload videos later in Studio):
//   SANITY_WRITE_TOKEN=... node scripts/insert-screen-comparison-videos.mjs
//
//   # Upload files directly into a spot (1 or 2):
//   SANITY_WRITE_TOKEN=... node scripts/insert-screen-comparison-videos.mjs \
//     --spot 1 --windows win1.mp4 --mac mac1.mp4
//
// Re-running updates the existing blocks instead of duplicating them.

const client = createClient({
  projectId: "z4kjle0n",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN,
});

const SLUG = "better-screens-reveal-more-flaws";

// Anchor = the paragraph the comparison goes after, matched by its opening text
const SPOTS = [
  { zh: "一樣的效果在 Windows", en: "The exact same effect" },
  { zh: "後來發現，正確的方向", en: "Eventually I realized" },
];

let keyCounter = 0;
function key() {
  return `cmp${Date.now()}${keyCounter++}`;
}

function blockText(block) {
  if (block._type !== "block") return "";
  return (block.children || []).map((c) => c.text || "").join("");
}

function makeCompareBlock(assets) {
  const block = {
    _type: "videoCompare",
    _key: key(),
    leftLabel: "Windows",
    rightLabel: "Mac",
  };
  if (assets?.windows) {
    block.leftVideo = {
      _type: "file",
      asset: { _type: "reference", _ref: assets.windows },
    };
  }
  if (assets?.mac) {
    block.rightVideo = {
      _type: "file",
      asset: { _type: "reference", _ref: assets.mac },
    };
  }
  return block;
}

function upsertAfterAnchor(body, anchorText, assets) {
  const idx = body.findIndex((b) => blockText(b).startsWith(anchorText));
  if (idx === -1) {
    console.warn(`  Anchor not found: "${anchorText}" — skipped.`);
    return body;
  }
  const next = body[idx + 1];
  if (next && next._type === "videoCompare") {
    // Update in place: keep existing videos unless new ones are provided
    const updated = { ...next };
    if (assets?.windows) {
      updated.leftVideo = {
        _type: "file",
        asset: { _type: "reference", _ref: assets.windows },
      };
    }
    if (assets?.mac) {
      updated.rightVideo = {
        _type: "file",
        asset: { _type: "reference", _ref: assets.mac },
      };
    }
    return [...body.slice(0, idx + 1), updated, ...body.slice(idx + 2)];
  }
  return [
    ...body.slice(0, idx + 1),
    makeCompareBlock(assets),
    ...body.slice(idx + 1),
  ];
}

function parseArgs(argv) {
  const args = { spot: null, windows: null, mac: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--spot") args.spot = Number(argv[++i]);
    else if (argv[i] === "--windows") args.windows = argv[++i];
    else if (argv[i] === "--mac") args.mac = argv[++i];
  }
  return args;
}

async function uploadVideo(file) {
  console.log(`Uploading ${file}...`);
  const asset = await client.assets.upload("file", fs.createReadStream(file), {
    filename: path.basename(file),
  });
  console.log(`  Uploaded asset ${asset._id}`);
  return asset._id;
}

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN && !process.env.SANITY_TOKEN) {
    console.error("Error: SANITY_WRITE_TOKEN env var is required.");
    process.exit(1);
  }

  const args = parseArgs(process.argv.slice(2));
  for (const f of [args.windows, args.mac]) {
    if (f && !fs.existsSync(f)) {
      console.error(`Error: file not found: ${f}`);
      process.exit(1);
    }
  }
  if ((args.windows || args.mac) && ![1, 2].includes(args.spot)) {
    console.error("Error: --spot 1 or --spot 2 is required when passing files.");
    process.exit(1);
  }

  const post = await client.fetch(
    `*[_type == "post" && slug.current == "${SLUG}"][0]{_id, body, body_zhTw}`
  );
  if (!post) {
    console.error(`Error: post with slug "${SLUG}" not found.`);
    process.exit(1);
  }

  const assetsBySpot = [null, null];
  if (args.windows || args.mac) {
    assetsBySpot[args.spot - 1] = {
      windows: args.windows ? await uploadVideo(args.windows) : null,
      mac: args.mac ? await uploadVideo(args.mac) : null,
    };
  }

  let body = post.body || [];
  let bodyZh = post.body_zhTw || [];

  for (let i = 0; i < SPOTS.length; i++) {
    console.log(`Spot ${i + 1}:`);
    bodyZh = upsertAfterAnchor(bodyZh, SPOTS[i].zh, assetsBySpot[i]);
    body = upsertAfterAnchor(body, SPOTS[i].en, assetsBySpot[i]);
  }

  await client.patch(post._id).set({ body, body_zhTw: bodyZh }).commit();
  console.log("Done! Comparison blocks are in both language versions.");
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
