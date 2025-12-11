# UI Refactoring Guide - Using Primitives for Consistency

This guide shows you how to refactor your existing components to use the new UI primitives for a more consistent design system.

---

## Example 1: Hero Component

### **BEFORE** (Current - Inconsistent)
```tsx
<section className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-8 relative min-h-[600px] sm:min-h-[700px] md:min-h-screen flex items-center justify-center">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col justify-center sm:justify-between gap-80 sm:gap-0 py-12 sm:py-20 md:py-24">
    <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-black leading-tight ${textColor} select-none transition-colors duration-300`}>
      Carol Hsiao
    </h1>
    <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif mb-2 leading-relaxed ${textColor} select-none transition-colors duration-300`}>
      Designer and Developer
    </p>
  </div>
</section>
```

### **AFTER** (With Primitives - Consistent)
```tsx
import { Heading, Text, Section, Container } from '@/components/ui';

<Section variant="hero" className="relative flex items-center justify-center">
  <Container className="h-full flex flex-col justify-center sm:justify-between gap-80 sm:gap-0 py-12 sm:py-20 md:py-24">
    <Heading
      as="h1"
      variant="display"
      serif
      className={`${textColor} select-none transition-colors duration-300`}
    >
      Carol Hsiao
    </Heading>
    <Text
      variant="hero"
      serif
      className={`mb-2 ${textColor} select-none transition-colors duration-300`}
    >
      Designer and Developer
    </Text>
  </Container>
</Section>
```

### **Benefits:**
✓ Removed manual responsive classes (`text-4xl sm:text-5xl md:...`)
✓ Semantic component names (`<Heading variant="display">` instead of `<h1 className="text-4xl...">`)
✓ Consistent spacing with `<Section variant="hero">`
✓ Easy to change all hero text sizes by editing one component

---

## Example 2: Header Component

### **BEFORE** (Current)
```tsx
<header className="fixed top-0 left-0 right-0 bg-[#faf8f5]/90 backdrop-blur-sm z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between">
    <span className="text-base sm:text-lg">✦</span>
    <span className="font-medium text-xs sm:text-sm tracking-wide">CAROL HSIAO</span>
    <nav className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10">
      <a href="#work" className="text-[10px] sm:text-xs font-medium tracking-wider hover:opacity-60 transition-opacity">
        WORK
      </a>
    </nav>
  </div>
</header>
```

### **AFTER** (With Primitives)
```tsx
import { Text, Container } from '@/components/ui';

<header className="fixed top-0 left-0 right-0 bg-[#faf8f5]/90 backdrop-blur-sm z-50">
  <Container className="py-4 sm:py-5 md:py-6 flex items-center justify-between">
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Text as="span" variant="large">✦</Text>
      <Text as="span" variant="small" className="font-medium tracking-wide">
        CAROL HSIAO
      </Text>
    </div>
    <nav className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10">
      <Text
        as="a"
        variant="label"
        className="hover:opacity-60 transition-opacity"
        href="#work"
      >
        WORK
      </Text>
    </nav>
  </Container>
</header>
```

### **Benefits:**
✓ Consistent text sizing using `variant="label"` for nav items
✓ Container handles max-width and padding consistently
✓ Easy to change all navigation text sizes globally

---

## Example 3: About Component

### **BEFORE** (Current - Inconsistent spacing)
```tsx
<section id="about" className="py-20 px-8">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-serif mb-10">About</h2>
    <p className="text-base leading-relaxed mb-5">
      I'm a product designer...
    </p>
  </div>
</section>
```

### **AFTER** (With Primitives - Consistent)
```tsx
import { Heading, Text, Section, Container } from '@/components/ui';

<Section id="about" variant="default">
  <Container variant="narrow">
    <Heading variant="section" serif className="mb-10">
      About
    </Heading>
    <Text variant="base" className="mb-5">
      I'm a product designer...
    </Text>
    <Text variant="base" className="mb-12">
      I believe the best digital experiences...
    </Text>
  </Container>
</Section>
```

### **Benefits:**
✓ Consistent section padding across all pages
✓ Heading size matches other section headings
✓ Container width is semantic (`variant="narrow"`)

---

## Example 4: Contact Component

### **BEFORE** (Current)
```tsx
<section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-xl sm:text-2xl font-serif mb-6 sm:mb-8 md:mb-10">Let's talk!</h2>
    <a className="text-base sm:text-lg font-normal hover:opacity-60">
      carolhsiaostudio@gmail.com
    </a>
    <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 text-[10px] sm:text-xs">
      {socialLinks.map((link) => (
        <a href={link.url}>{link.name}</a>
      ))}
    </div>
  </div>
</section>
```

### **AFTER** (With Primitives)
```tsx
import { Heading, Text, Section, Container } from '@/components/ui';

<Section id="contact" variant="default">
  <Container variant="narrow">
    <Heading variant="subsection" serif className="mb-6 sm:mb-8 md:mb-10">
      Let's talk!
    </Heading>

    <Text
      as="a"
      variant="large"
      href="mailto:carolhsiaostudio@gmail.com"
      className="hover:opacity-60 transition-opacity inline-block mb-6 sm:mb-8 md:mb-10"
    >
      carolhsiaostudio@gmail.com
    </Text>

    <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8">
      {socialLinks.map((link, index) => (
        <Text
          key={index}
          as="a"
          variant="label"
          href={link.url}
          className="hover:opacity-60 transition-opacity"
        >
          {link.name}
        </Text>
      ))}
    </div>
  </Container>
</Section>
```

### **Benefits:**
✓ All social links use `variant="label"` for consistency
✓ Email uses `variant="large"` to stand out
✓ Section padding matches other sections

---

## How This Achieves Consistency

### **1. Typography Consistency**
- **All headings** use the same size scale (display → hero → section → subsection → card)
- **All body text** uses the same size scale (hero → large → base → small → caption)
- **All labels** use the same `variant="label"` style

### **2. Spacing Consistency**
- **All sections** use consistent vertical padding (default, hero, tight, loose)
- **All containers** use consistent horizontal padding and max-widths
- No more random `py-20` vs `py-12 sm:py-16 md:py-20` differences

### **3. Easy Global Changes**
Want to make all section headings bigger?
```tsx
// Just edit components/ui/Heading.tsx
section: 'text-3xl sm:text-4xl md:text-5xl', // Changed from text-2xl...
```

Want to increase all section spacing?
```tsx
// Just edit components/ui/Section.tsx
default: 'py-20 sm:py-28 md:py-36', // Changed from py-16...
```

### **4. Better Developer Experience**
```tsx
// Instead of remembering:
<h2 className="text-2xl sm:text-3xl md:text-4xl font-serif">

// You write:
<Heading variant="section" serif>
```

---

## Migration Strategy

### **Option 1: Gradual Migration** (Recommended)
1. Start with **new components** - use primitives from the start
2. Refactor **one section at a time** when you make changes
3. Test each refactored section to ensure it looks the same

### **Option 2: Full Migration**
1. Refactor all components at once
2. Compare before/after screenshots
3. Deploy all changes together

---

## Quick Reference: Which Variant to Use?

| Current Class | Primitive Replacement |
|---------------|----------------------|
| `text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl` | `<Heading variant="display">` |
| `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` | `<Heading variant="hero">` |
| `text-2xl sm:text-3xl md:text-4xl` | `<Heading variant="section">` |
| `text-xl sm:text-2xl md:text-3xl` | `<Heading variant="subsection">` |
| `text-base sm:text-lg md:text-xl` | `<Heading variant="card">` |
| `text-lg sm:text-xl md:text-2xl lg:text-3xl` | `<Text variant="hero">` |
| `text-base sm:text-lg md:text-xl` | `<Text variant="large">` |
| `text-sm sm:text-base md:text-lg` | `<Text variant="base">` |
| `text-xs sm:text-sm md:text-base` | `<Text variant="small">` |
| `text-[10px] sm:text-xs md:text-sm` | `<Text variant="caption">` |
| `text-[10px] sm:text-xs font-medium tracking-wider uppercase` | `<Text variant="label">` |
| `max-w-7xl mx-auto px-4 sm:px-6 md:px-8` | `<Container>` |
| `max-w-6xl mx-auto px-4 sm:px-6 md:px-8` | `<Container variant="narrow">` |
| `py-16 sm:py-24 md:py-32` | `<Section variant="default">` |
| `pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32` | `<Section variant="hero">` |

---

## Next Steps

Would you like me to:
1. **Refactor one component** as a demonstration?
2. **Refactor all components** at once?
3. **Adjust the variant sizes** to better match your preferences first?
4. **Add more primitives** (Button, Link, Badge, etc.)?
