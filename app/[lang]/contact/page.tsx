import type { Metadata } from 'next';
import ContactContent from '@/components/ContactContent';

const meta = {
  en: {
    title: 'Contact',
    description: 'Get in touch to discuss your project. Creative website design, interactive development, and full-package web solutions.',
  },
  zh: {
    title: '聯繫我',
    description: '聯繫我討論您的專案。創意網站設計、互動開發與全套網站解決方案。',
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

export default function ContactPage() {
  return <ContactContent />;
}
