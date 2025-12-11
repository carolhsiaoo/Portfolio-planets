import { memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ContainerVariant = 'default' | 'narrow' | 'wide' | 'full';

interface ContainerProps {
  variant?: ContainerVariant;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<ContainerVariant, string> = {
  default: 'max-w-7xl mx-auto px-4 sm:px-6 md:px-8',
  narrow: 'max-w-4xl mx-auto px-4 sm:px-6 md:px-8',
  wide: 'max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8',
  full: 'w-full px-4 sm:px-6 md:px-8',
};

const Container = memo(function Container({
  variant = 'default',
  className,
  children,
}: ContainerProps) {
  return (
    <div className={cn(variantStyles[variant], className)}>
      {children}
    </div>
  );
});

export default Container;
