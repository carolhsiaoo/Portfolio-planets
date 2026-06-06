# Blog Style Guide

Rules for writing and formatting blog posts in Sanity.

## Title

- English titles should be short and simple (under 10 words ideally)
- Chinese titles can be more descriptive

## Tone

- Write naturally and conversationally, like explaining to a friend
- When translating Chinese to English, don't translate literally. Rewrite the idea in natural English that a native speaker would actually say
- Avoid stiff or academic phrasing

## Formatting

- No dashes (—) in lists or inline text. Use colons or commas instead
- Use `h2` for main section headings, `h3` for sub-sections, `h4` for individual points under a sub-section
- Chinese sub-section labels: 程式碼範例 (not 代碼), 避坑指南

## Dividers

- Add a divider before every `h2` heading except the first one in the article
- Divider uses the custom `divider` block type which renders as gradient lines with diamond ornaments (✦✦✦)

## Bold Emphasis

- Do not bold proper nouns or library names just because they are technical terms
- Bold the key insight, takeaway, or most important phrase within a paragraph
- Bold critical warnings, solutions, or conclusions the reader should remember
- Keep bold sparse. One or two bolded phrases per paragraph at most
- Both English and Chinese versions should have bold emphasis

## Code Blocks

- Use the custom `codeBlock` block type (not inline code marks)
- Renders with a dark background (Notion-style)
- Add comments in the code to explain what each line does

## Pitfall / Tips Sections

- The section title (e.g. "Pitfall Guide" / "避坑指南") is an `h3`
- Each individual pitfall is an `h4` with just the title text
- The explanation goes in a separate paragraph below the `h4`, not on the same line
