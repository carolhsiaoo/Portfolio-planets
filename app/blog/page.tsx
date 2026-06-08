'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';

export default function BlogPage() {
  const { lang } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    router.replace(lang === 'zh' ? '/blog/zh-tw' : '/blog/en');
  }, [lang, router]);

  return null;
}
