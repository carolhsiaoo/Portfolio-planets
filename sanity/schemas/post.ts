import { defineType, defineField, defineArrayMember } from "sanity";

const richTextMembers = [
  defineArrayMember({ type: "block" }),
  defineArrayMember({
    type: "object",
    name: "divider",
    title: "Divider",
    fields: [
      defineField({
        name: "style",
        title: "Style",
        type: "string",
        initialValue: "default",
        options: {
          list: [{ title: "Default", value: "default" }],
        },
      }),
    ],
    preview: {
      prepare() {
        return { title: "── Divider ──" };
      },
    },
  }),
  defineArrayMember({
    type: "object",
    name: "codeBlock",
    title: "Code Block",
    fields: [
      defineField({
        name: "code",
        title: "Code",
        type: "text",
        rows: 10,
      }),
      defineField({
        name: "language",
        title: "Language",
        type: "string",
        initialValue: "javascript",
        options: {
          list: [
            { title: "JavaScript", value: "javascript" },
            { title: "TypeScript", value: "typescript" },
            { title: "CSS", value: "css" },
            { title: "HTML", value: "html" },
            { title: "Bash", value: "bash" },
          ],
        },
      }),
    ],
    preview: {
      select: { code: "code" },
      prepare({ code }) {
        return { title: code?.slice(0, 50) || "Code block" };
      },
    },
  }),
  defineArrayMember({
    type: "object",
    name: "table",
    title: "Table",
    fields: [
      defineField({
        name: "rows",
        title: "Rows",
        type: "array",
        of: [
          {
            type: "object",
            name: "row",
            fields: [
              defineField({
                name: "cells",
                title: "Cells",
                type: "array",
                of: [{ type: "string" }],
              }),
            ],
            preview: {
              select: { cells: "cells" },
              prepare({ cells }) {
                return { title: cells?.join(" | ") || "Empty row" };
              },
            },
          },
        ],
      }),
      defineField({
        name: "hasHeaderRow",
        title: "First row is header",
        type: "boolean",
        initialValue: true,
      }),
    ],
    preview: {
      prepare() {
        return { title: "Table" };
      },
    },
  }),
  defineArrayMember({
    type: "file",
    name: "video",
    title: "Video",
    options: { accept: "video/*" },
    fields: [
      {
        name: "autoplay",
        title: "Autoplay (GIF-like)",
        description:
          "Plays automatically, muted, in a loop, without controls — for short demo clips",
        type: "boolean",
        initialValue: false,
      },
      {
        name: "caption",
        title: "Caption",
        type: "array",
        of: [
          {
            type: "block",
            styles: [{ title: "Normal", value: "normal" }],
            lists: [],
            marks: {
              decorators: [],
              annotations: [
                {
                  name: "link",
                  type: "object",
                  title: "Link",
                  fields: [{ name: "href", type: "url", title: "URL" }],
                },
              ],
            },
          },
        ],
      },
    ],
  }),
  defineArrayMember({
    type: "image",
    options: { hotspot: true },
    fields: [
      { name: "alt", title: "Alt text", type: "string" },
      {
        name: "caption",
        title: "Caption",
        type: "array",
        of: [
          {
            type: "block",
            styles: [{ title: "Normal", value: "normal" }],
            lists: [],
            marks: {
              decorators: [],
              annotations: [
                {
                  name: "link",
                  type: "object",
                  title: "Link",
                  fields: [{ name: "href", type: "url", title: "URL" }],
                },
              ],
            },
          },
        ],
      },
    ],
  }),
];

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fieldsets: [
    { name: "english", title: "🇺🇸 English", options: { collapsible: true } },
    { name: "chinese", title: "🇹🇼 中文（繁體）", options: { collapsible: true } },
  ],
  fields: [
    // Shared fields
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),

    // English fields
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      fieldset: "english",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      fieldset: "english",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: richTextMembers,
      fieldset: "english",
    }),

    // Chinese fields
    defineField({
      name: "title_zhTw",
      title: "標題",
      type: "string",
      fieldset: "chinese",
    }),
    defineField({
      name: "excerpt_zhTw",
      title: "摘要",
      type: "text",
      rows: 3,
      fieldset: "chinese",
    }),
    defineField({
      name: "body_zhTw",
      title: "內文",
      type: "array",
      of: richTextMembers,
      fieldset: "chinese",
    }),
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt" },
  },
});
