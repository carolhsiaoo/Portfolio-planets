import { memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingVariant = 'display' | 'hero' | 'section' | 'subsection' | 'card';

interface HeadingProps {
  as?: HeadingLevel;
  variant?: HeadingVariant;
  serif?: boolean;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<HeadingVariant, string> = {
  display: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight',
  hero: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight',
  section: 'text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug',
  subsection: 'text-xl sm:text-2xl md:text-3xl font-semibold leading-snug',
  card: 'text-base sm:text-lg md:text-xl font-medium leading-normal',
};

const Heading = memo(function Heading({
  as: Component = 'h2',
  variant = 'section',
  serif = false,
  className,
  children,
}: HeadingProps) {
  return (
    <Component
      className={cn(
        variantStyles[variant],
        serif && 'font-serif',
        className
      )}
    >
      {children}
    </Component>
  );
});

export default Heading;
