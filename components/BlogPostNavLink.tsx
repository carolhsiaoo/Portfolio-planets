'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

// Prev/next navigation between posts. The global `scroll-behavior: smooth`
// makes Next's scroll-to-top on navigation animate, which reads as rewinding
// through the whole article (and the hide-on-scroll header flashes in).
// Jump instantly instead — same trick as the case study prev/next.
export default function BlogPostNavLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const jumpToTopOnNav = () => {
    document.documentElement.style.scrollBehavior = 'auto';
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 1000);
  };

  return (
    <Link href={href} onClick={jumpToTopOnNav} className={className}>
      {children}
    </Link>
  );
}
