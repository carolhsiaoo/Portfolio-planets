'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type Lang = 'en' | 'zh';

const STORAGE_KEY = 'lang';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
});

// Returns null on routes without a lang prefix (e.g. /projects/[slug]),
// where the URL alone can't tell us the language.
function getLangFromPathname(pathname: string): Lang | null {
  const firstSegment = pathname.split('/')[1];
  if (firstSegment === 'zh') return 'zh';
  if (firstSegment === 'en') return 'en';
  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [lang, setLangState] = useState<Lang>(() => getLangFromPathname(pathname) ?? 'en');

  // Persist every explicit choice so un-prefixed routes can restore it
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const toggleLang = useCallback(
    () => setLang(lang === 'en' ? 'zh' : 'en'),
    [lang, setLang]
  );

  // On un-prefixed routes, restore the last choice after mount (reading
  // localStorage in the initializer would cause a hydration mismatch)
  useEffect(() => {
    if (getLangFromPathname(pathname) !== null) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'zh' || stored === 'en') setLangState(stored);
    } catch {}
  }, [pathname]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
