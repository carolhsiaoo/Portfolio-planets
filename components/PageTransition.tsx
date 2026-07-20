'use client'

import { createContext, useContext, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type TransitionContextType = {
  navigateTo: (href: string) => void;
  hasNavigated: boolean;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextType>({ navigateTo: () => {}, hasNavigated: false, isTransitioning: false });

export function usePageTransition() {
  return useContext(TransitionContext);
}

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  // Tracks whether the user has navigated within the session, so the home
  // page shows its LoadingIntro only on the very first load — not when
  // returning from another page.
  const [hasNavigated, setHasNavigated] = useState(false);

  const navigateTo = useCallback((href: string) => {
    if (href === pathname) return;
    setHasNavigated(true);
    router.push(href);
  }, [pathname, router]);

  return (
    <TransitionContext.Provider value={{ navigateTo, hasNavigated, isTransitioning: false }}>
      {children}
    </TransitionContext.Provider>
  );
}
