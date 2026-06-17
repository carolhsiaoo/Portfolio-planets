'use client';

import { useEffect } from 'react';
import { useLanguage } from './LanguageContext';

export default function SyncLanguage({ lang }: { lang: string }) {
  const { setLang } = useLanguage();

  useEffect(() => {
    setLang(lang === 'zh' || lang === 'zh-tw' ? 'zh' : 'en');
  }, [lang, setLang]);

  return null;
}
