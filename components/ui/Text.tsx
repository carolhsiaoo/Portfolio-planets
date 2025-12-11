import { memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TextElement = 'p' | 'span' | 'div' | 'label';
type TextVariant = 'hero' | 'large' | 'base' | 'small' | 'caption' | 'label';

interface TextProps {
  as?: TextElement;
  variant?: TextVariant;
  serif?: boolean;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<TextVariant, string> = {
  hero: 'text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed',
  large: 'text-base sm:text-lg md:text-xl leading-relaxed',
  base: 'text-sm sm:text-base md:text-lg leading-normal',
  small: 'text-xs sm:text-sm md:text-base leading-normal',
  caption: 'text-xs md:text-sm leading-snug',
  label: 'text-xs font-medium tracking-wider uppercase leading-tight',
};

const Text = memo(function Text({
  as: Component = 'p',
  variant = 'base',
  serif = false,
  className,
  children,
}: TextProps) {
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

export default Text;
