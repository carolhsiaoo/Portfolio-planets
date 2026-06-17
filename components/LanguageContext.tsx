'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type Lang = 'en' | 'zh';

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

function getLangFromPathname(pathname: string): Lang {
  const firstSegment = pathname.split('/')[1];
  return firstSegment === 'zh' ? 'zh' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [lang, setLang] = useState<Lang>(() => getLangFromPathname(pathname));
  const toggleLang = useCallback(() => setLang((l) => (l === 'en' ? 'zh' : 'en')), []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
