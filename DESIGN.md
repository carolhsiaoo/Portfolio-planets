# Design System — Carol Hsiao Portfolio

Use this design system for all slides, PDFs, proposals, and design artifacts generated for this project. It captures the exact visual language of the portfolio site.

---

## 1. Color Palette

### Core

| Token              | Value      | Usage                          |
|-------------------|------------|--------------------------------|
| Background        | `#faf8f5`  | Page background, warm off-white |
| Foreground        | `#1a1a1a`  | Primary text                   |
| Accent Blue       | `#3b64f6`  | CTAs, highlights, icons        |
| Gold              | `#d4a843`  | Secondary accent, decorative   |
| Star Yellow       | `#F1CD5B`  | Animated highlights            |
| Black             | `#000000`  | Footer, overlays, marquee      |
| White             | `#ffffff`  | Cards, contrast                |

### Neutrals & Muted

| Token              | Value              | Usage                    |
|-------------------|--------------------|--------------------------|
| Text muted        | `#1a1a1a` at 60%   | Secondary text           |
| Text subtle       | `#1a1a1a` at 50%   | Tertiary text            |
| Border default    | `#e5e5e5`          | Card borders             |
| Border muted      | `#1a1a1a` at 8%    | Subtle dividers          |
| Border hover      | `#1a1a1a` at 15%   | Hover state borders      |
| Footer border     | `#252423`          | Dark theme dividers      |
| Gray 400          | `#a3a3a3`          | Placeholders, icons      |

### Accent Variants

| Token               | Value                           | Usage            |
|---------------------|---------------------------------|------------------|
| Blue overlay        | `rgba(59, 100, 246, 0.88)`      | Washi tape       |
| Blue shadow         | `rgba(59, 100, 246, 0.15)`      | Popular card glow|
| Blue border         | `#3b64f6` at 40%                | Highlighted card |

---

## 2. Typography

### Font Families

| Role        | Family          | Usage                                     |
|------------|-----------------|-------------------------------------------|
| Display    | **Cinzel**      | Headings, nav, hero, labels, badges       |
| Body       | **Noto Sans**   | Body text, descriptions, paragraphs       |
| CJK        | **Noto Sans TC**| Chinese/Traditional Chinese fallback      |

### Type Scale (responsive mobile / tablet / desktop)

| Level          | Size                      | Weight    | Font     |
|---------------|---------------------------|-----------|----------|
| Display XL    | 2.25rem / 3rem / 3.75-6rem | 700-900   | Cinzel   |
| Heading 1     | 1.5rem / 1.875rem / 2.25rem | 600-700  | Cinzel   |
| Heading 2     | 1.25rem / 1.5rem / 1.875rem | 600      | Cinzel   |
| Heading 3     | 1rem / 1.125rem / 1.25rem   | 500-600  | Cinzel   |
| Body Large    | 1rem / 1.125rem / 1.25rem   | 400      | Noto Sans|
| Body          | 0.875rem / 1rem / 1.125rem  | 400      | Noto Sans|
| Small         | 0.75rem / 0.875rem / 1rem   | 400      | Noto Sans|
| Caption       | 0.75rem / 0.875rem          | 400      | Noto Sans|
| Label         | 0.75rem                     | 500-600  | Cinzel   |

### Text Treatments

- **Uppercase labels**: `text-xs tracking-widest uppercase` (Cinzel)
- **Hero paragraph**: `text-lg sm:text-xl md:text-2xl leading-relaxed` (Noto Sans)
- **Muted description**: `text-[#1a1a1a]/60 leading-relaxed` (Noto Sans)
- **Font smoothing**: antialiased on all text

---

## 3. Spacing

### Base Unit: 4px

| Token   | Value   | Rem     |
|---------|---------|---------|
| xs      | 4px     | 0.25rem |
| sm      | 8px     | 0.5rem  |
| md      | 16px    | 1rem    |
| lg      | 24px    | 1.5rem  |
| xl      | 32px    | 2rem    |
| 2xl     | 48px    | 3rem    |
| 3xl     | 64px    | 4rem    |
| 4xl     | 80px    | 5rem    |

### Container Widths

| Variant  | Max Width | Usage              |
|---------|-----------|--------------------|
| Narrow  | 896px     | Blog, focused content |
| Default | 1280px    | Standard sections  |
| Wide    | 1400px    | Expanded layouts   |

### Horizontal Padding (responsive)

`px-4 → sm:px-6 → md:px-8` (16px → 24px → 32px)

### Section Vertical Spacing

| Variant  | Mobile   | Tablet   | Desktop  |
|---------|----------|----------|----------|
| Tight   | 32px     | 48px     | 64px     |
| Default | 64px     | 96px     | 128px    |
| Loose   | 96px     | 128px    | 160px    |

---

## 4. Visual Style

### Border Radius

| Token       | Value   | Usage                    |
|------------|---------|--------------------------|
| sm         | 0.5rem  | Small elements           |
| md         | 0.75rem | Medium cards             |
| lg         | 1rem    | Cards, images            |
| xl         | 1.5rem  | Service cards            |
| pill       | 9999px  | Badges, buttons          |
| feature    | 3rem    | Hero images              |

### Shadows

| Token       | Value                                    | Usage           |
|------------|------------------------------------------|-----------------|
| Subtle     | `drop-shadow(0 2px 4px rgba(0,0,0,0.08))` | Stickers, icons |
| Elevated   | `shadow-2xl`                              | Hover cards     |
| Accent     | `shadow-2xl shadow-[#3b64f6]/15`          | Featured cards  |

### Backdrop & Glass

- Glass header: `bg-white/30 backdrop-blur-xl rounded-full`
- Card glass: `bg-white/40 hover:bg-white/70`

### Opacity Scale

| Usage         | Value |
|--------------|-------|
| Text muted   | 60%   |
| Text subtle  | 50%   |
| Border muted | 8%    |
| Border hover | 15%   |
| Link hover   | 60-70% |
| Overlay      | 88%   |

---

## 5. Motion & Animation

### Easing Functions

| Token     | Value                              | Usage              |
|----------|------------------------------------|--------------------|
| Standard | `cubic-bezier(0.4, 0, 0.2, 1)`    | Most animations    |
| Dramatic | `cubic-bezier(0.77, 0, 0.18, 1)`  | Menu, hero         |
| Simple   | `ease-out`                          | Fade-ins           |

### Duration Scale

| Token   | Value  | Usage                  |
|--------|--------|------------------------|
| Fast   | 300ms  | Hover states           |
| Medium | 500ms  | Card transitions       |
| Slow   | 700ms  | Page entrance, menus   |
| XSlow  | 1000ms | Section fade-ins       |

### Common Patterns

- **Fade in + slide up**: `opacity 0→1, translateY 48px→0, 1000ms ease-out`
- **Fade in + slide right**: `opacity 0→1, translateX 48px→0, 1000ms ease-out`
- **Card hover**: `translateY -4px, 500ms all`
- **Link hover**: `opacity → 60%, 500ms`
- **Scale hover**: `scale 1.1, 300ms`

---

## 6. Component Patterns

### Cards

```
Service Card:
  border: 1px solid #1a1a1a/8
  background: white/40 → hover: white/70
  padding: 32px-40px
  radius: 1.5rem
  hover: translateY(-4px), border #1a1a1a/15

Pricing Card:
  border: 1px solid #e5e5e5
  background: white
  radius: 1rem

Pricing Card (Featured):
  border: 1px solid #3b64f6/40
  shadow: shadow-2xl #3b64f6/15
  badge: bg-#3b64f6 text-white rounded-full uppercase
```

### Buttons & Links

- Primary: `bg-[#3b64f6] text-white rounded-full px-4 py-1.5`
- Ghost: `text-[#1a1a1a] hover:opacity-60 transition-opacity duration-500`
- Text roll hover effect on links (character-by-character Y animation)

### Footer

- `bg-black text-white`
- Rounded top corners: 60px mobile / 100px tablet / 150px desktop
- Social icons: 20-28px, hover opacity-70 + scale-110

### Header

- Fixed position, scroll-aware
- Glass effect on scroll: `bg-white/30 backdrop-blur-xl`
- Mobile: Full-screen overlay menu

---

## 7. Layout Grid

### Breakpoints

| Name   | Min Width |
|--------|-----------|
| Mobile | 0px       |
| sm     | 640px     |
| md     | 1024px    |
| lg     | 1280px    |
| xl     | 1536px    |

### Grid Columns

- 1 column → 2 columns at md → 3 columns at lg (services, process)
- 1 column → 3 columns at md (pricing)

### Standard Container

```
max-w-7xl mx-auto px-4 sm:px-6 md:px-8
```

---

## 8. Design Principles

1. **Sophisticated minimalism** — Restrained palette, generous whitespace, elegant typography
2. **Warm not cold** — `#faf8f5` background over pure white; serif headings over geometric sans
3. **Subtle interactivity** — Smooth easing, opacity transitions, gentle hover lifts
4. **Typography hierarchy** — Cinzel serif for authority, Noto Sans for readability
5. **Blue as the only accent** — `#3b64f6` used sparingly for maximum impact
6. **Glass & translucency** — Frosted glass headers, semi-transparent card backgrounds
7. **Generous spacing** — Sections breathe with 96-128px vertical rhythm on desktop

---

## 9. Applying to Slides / PDFs / Proposals

### Slide Deck

- **Background**: `#faf8f5`
- **Title slides**: Cinzel 48-72pt, `#1a1a1a`, centered
- **Body text**: Noto Sans 18-24pt, `#1a1a1a` at 60-100%
- **Accent elements**: `#3b64f6` for highlights, underlines, icons
- **Section dividers**: Black full-bleed with white Cinzel text
- **Card layouts**: White cards with `#1a1a1a/8` borders, 1.5rem radius
- **Margins**: 64-80px from edges

### PDF / Proposal

- **Page background**: `#faf8f5` or white
- **Headers**: Cinzel semibold, `#1a1a1a`
- **Body**: Noto Sans regular, 11-12pt, `#1a1a1a`
- **Callout boxes**: `bg-white border border-[#1a1a1a]/8 rounded-xl p-6`
- **Featured callout**: `border-[#3b64f6]/40 shadow`
- **Pull quotes**: Cinzel italic, `#3b64f6`
- **Page numbers**: Noto Sans, 9pt, `#a3a3a3`
- **Horizontal rules**: `#1a1a1a/8`, 1px

### Do's

- Use Cinzel for any heading or label
- Keep text hierarchy to 3 levels max per page
- Use `#3b64f6` only for 1-2 elements per page
- Let content breathe with generous margins
- Use opacity for text hierarchy (100%, 60%, 50%)

### Don'ts

- Don't use bright or saturated colors beyond the defined palette
- Don't use more than 2 font families
- Don't crowd content — whitespace is a feature
- Don't use heavy drop shadows — keep shadows subtle
- Don't use sharp corners — minimum radius 0.5rem
