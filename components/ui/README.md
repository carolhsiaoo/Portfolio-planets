# UI Primitives

Reusable components for consistent design across your portfolio.

## Installation

Dependencies already installed:
- `clsx` - Conditional className utility
- `tailwind-merge` - Tailwind class merging

## Components

### Heading

Consistent heading styles with semantic variants.

```tsx
import { Heading } from '@/components/ui';

// Display heading (largest) - for hero sections
<Heading variant="display" serif>Carol Hsiao</Heading>

// Hero heading - large prominent text
<Heading variant="hero" as="h1">Welcome</Heading>

// Section heading - for major sections
<Heading variant="section" as="h2">About Me</Heading>

// Subsection heading - for subsections
<Heading variant="subsection" as="h3">Experience</Heading>

// Card heading - for card titles
<Heading variant="card" as="h3">Project Name</Heading>
```

**Props:**
- `as`: `'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'` (default: `'h2'`)
- `variant`: `'display' | 'hero' | 'section' | 'subsection' | 'card'` (default: `'section'`)
- `serif`: `boolean` - Use Playfair Display font
- `className`: Additional Tailwind classes

---

### Text

Consistent body text and labels.

```tsx
import { Text } from '@/components/ui';

// Hero text - large body text for hero sections
<Text variant="hero" serif>Designer and Developer</Text>

// Large text - prominent body text
<Text variant="large">Currently Building @FireFree</Text>

// Base text - standard body text
<Text variant="base">This is standard body text.</Text>

// Small text - smaller body text
<Text variant="small">Additional details here.</Text>

// Caption - very small text
<Text variant="caption">© 2024</Text>

// Label - uppercase small text for labels/nav
<Text variant="label">WORK</Text>
```

**Props:**
- `as`: `'p' | 'span' | 'div' | 'label'` (default: `'p'`)
- `variant`: `'hero' | 'large' | 'base' | 'small' | 'caption' | 'label'` (default: `'base'`)
- `serif`: `boolean` - Use Playfair Display font
- `className`: Additional Tailwind classes

---

### Container

Consistent max-width and horizontal padding.

```tsx
import { Container } from '@/components/ui';

// Default container (max-w-7xl)
<Container>
  <YourContent />
</Container>

// Narrow container (max-w-4xl) - for focused content
<Container variant="narrow">
  <Article />
</Container>

// Wide container (max-w-[1400px]) - for wider layouts
<Container variant="wide">
  <Gallery />
</Container>

// Full width - with padding only
<Container variant="full">
  <FullWidthContent />
</Container>
```

**Props:**
- `variant`: `'default' | 'narrow' | 'wide' | 'full'` (default: `'default'`)
- `className`: Additional Tailwind classes

---

### Section

Consistent vertical spacing for page sections.

```tsx
import { Section } from '@/components/ui';

// Default section - standard spacing
<Section id="about">
  <Container>
    <Heading variant="section">About Me</Heading>
  </Container>
</Section>

// Hero section - special spacing for hero
<Section variant="hero">
  <YourHeroContent />
</Section>

// Tight section - less spacing
<Section variant="tight">
  <CompactContent />
</Section>

// Loose section - more spacing
<Section variant="loose">
  <SpreadOutContent />
</Section>
```

**Props:**
- `variant`: `'default' | 'hero' | 'tight' | 'loose'` (default: `'default'`)
- `id`: Section ID for anchor links
- `className`: Additional Tailwind classes

---

## Usage Example

Here's how to refactor a component using these primitives:

**Before:**
```tsx
<section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">About Me</h2>
    <p className="text-sm sm:text-base md:text-lg">I'm a designer and developer...</p>
  </div>
</section>
```

**After:**
```tsx
<Section id="about">
  <Container>
    <Heading variant="section">About Me</Heading>
    <Text variant="base">I'm a designer and developer...</Text>
  </Container>
</Section>
```

## Benefits

✓ **Consistency** - All text sizes and spacing follow the same scale
✓ **Maintainability** - Change design system in one place
✓ **Responsive** - All components have built-in responsive behavior
✓ **Type-safe** - Full TypeScript support
✓ **Performance** - Memoized components prevent unnecessary re-renders
✓ **Flexible** - Override with className when needed

## Customization

To adjust the design system, edit the variant styles in each component file:
- `components/ui/Heading.tsx` - Heading sizes
- `components/ui/Text.tsx` - Text sizes
- `components/ui/Container.tsx` - Container widths
- `components/ui/Section.tsx` - Section spacing
