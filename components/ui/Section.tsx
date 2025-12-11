import { memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionVariant = 'default' | 'hero' | 'tight' | 'loose';

interface SectionProps {
  variant?: SectionVariant;
  className?: string;
  id?: string;
  children: ReactNode;
}

const variantStyles: Record<SectionVariant, string> = {
  default: 'py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8',
  hero: 'pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-8 min-h-[600px] sm:min-h-[700px] md:min-h-screen',
  tight: 'py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8',
  loose: 'py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-8',
};

const Section = memo(function Section({
  variant = 'default',
  className,
  id,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn(variantStyles[variant], className)}>
      {children}
    </section>
  );
});

export default Section;
