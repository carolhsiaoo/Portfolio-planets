# Blog Post Script Guide

## Quick Start

1. Copy `create-post.mjs` and rename it for your new post (e.g. `create-my-new-post.mjs`)
2. Update the post content (see template below)
3. Run:
   ```bash
   SANITY_TOKEN="your_token_here" node scripts/create-my-new-post.mjs
   ```

## Sanity Token

Get your token from: https://www.sanity.io/manage/project/z4kjle0n/api#tokens

Create a token with **Editor** permissions.

## Post Template

```js
const post = {
  _type: "post",
  slug: { _type: "slug", current: "your-post-slug" },
  publishedAt: new Date().toISOString(),

  // English
  title: "Your English Title",
  excerpt: "A short summary of the post in English.",
  body: [
    block("Section Heading"),                    // h2 heading
    block("Sub Heading", "h3"),                  // h3 heading
    paragraph("Your paragraph text here."),      // normal paragraph
    bullet("A bullet point item."),              // bullet list item
  ],

  // Traditional Chinese
  title_zhTw: "你的中文標題",
  excerpt_zhTw: "文章的中文摘要。",
  body_zhTw: [
    block("章節標題"),
    paragraph("你的中文段落內容。"),
    bullet("項目符號內容。"),
  ],
};
```

## Content Building Blocks

| Function | Usage | Description |
|----------|-------|-------------|
| `block("text")` | Section heading | Renders as `<h2>` |
| `block("text", "h3")` | Sub-heading | Renders as `<h3>` |
| `paragraph("text")` | Body text | Normal paragraph |
| `bullet("text")` | Bullet point | Bulleted list item |

## Create vs Patch

- **New post:** The script creates a new post by default if no matching slug is found.
- **Update existing post:** If a post with the same slug already exists, the script patches it in place (no duplicates).

## English Translation Tone

When translating Chinese content to English, follow these guidelines:

- **Conversational and approachable**, like you're explaining to a friend (e.g. "you name it," "think web apps," "once you've got the hang of it")
- **No dashes** (no em dashes `—` or en dashes `–`), use commas, periods, or restructure the sentence instead
- **Beginner-friendly**, avoid overly formal or academic phrasing
- **Keep technical accuracy** while making it feel natural and easy to read
- Reference the blog post "A Beginner's Guide to Creative Web Development" and `create-post.mjs` for tone examples

## Full Working Example

See `create-post.mjs` for a complete reference with both English and Chinese content.

## Checklist

- [ ] Set a unique `slug` (this becomes the URL: `/blog/en/your-post-slug`)
- [ ] Fill in both English and Chinese fields
- [ ] Set `publishedAt` (defaults to now, or use a specific date like `"2026-05-23T00:00:00Z"`)
- [ ] Add a cover image later via Sanity Studio at `/studio`
- [ ] Optionally assign a category via Studio as well
