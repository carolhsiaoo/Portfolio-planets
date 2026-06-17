import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SyncLanguage from '@/components/SyncLanguage';

const SUPPORTED_LANGS = ['en', 'zh'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

const siteUrl = 'https://www.carolhsiao.com';

const meta: Record<Lang, { title: string; description: string; ogDescription: string; locale: string }> = {
  en: {
    title: 'Carol Hsiao | Creative Website Developer & Designer',
    description:
      'Carol Hsiao is a creative website developer and designer specializing in interactive web experiences, UI/UX design, and frontend development.',
    ogDescription:
      'Creative website developer and designer specializing in interactive web experiences, UI/UX design, and frontend development. Portfolio featuring interactive experiences, finance apps, and time-tracking tools.',
    locale: 'en_CA',
  },
  zh: {
    title: 'Carol Hsiao | 創意網站開發與設計',
    description:
      'Carol Hsiao 是一位專注於互動式網頁體驗、UI/UX 設計與前端開發的創意網站開發者與設計師。',
    ogDescription:
      '創意網站開發者與設計師，專精於互動式網頁體驗、UI/UX 設計與前端開發。作品集包含互動體驗、金融應用與時間管理工具。',
    locale: 'zh_TW',
  },
};

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang as Lang] ?? meta.en;

  return {
    title: {
      default: m.title,
      template: '%s | Carol Hsiao',
    },
    description: m.description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        'zh-TW': '/zh',
      },
    },
    openGraph: {
      title: m.title,
      description: m.ogDescription,
      url: `${siteUrl}/${lang}`,
      siteName: 'Carol Hsiao Portfolio',
      locale: m.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.ogDescription,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!SUPPORTED_LANGS.includes(lang as Lang)) {
    notFound();
  }

  return (
    <>
      <SyncLanguage lang={lang} />
      {children}
    </>
  );
}
