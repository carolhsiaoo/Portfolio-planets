import type { Metadata } from 'next';
import ServicesContent from '@/components/ServicesContent';

const meta = {
  en: {
    title: 'Services',
    description: 'Creative website design, interactive development, CMS integration, and full-package web solutions.',
  },
  zh: {
    title: '接案服務',
    description: '創意網站設計、互動開發、CMS 整合與全套網站解決方案。',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang as keyof typeof meta] ?? meta.en;
  return {
    title: m.title,
    description: m.description,
  };
}

export default function ServicesPage() {
  return <ServicesContent />;
}
