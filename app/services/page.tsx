'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeInSection from '@/components/FadeInSection';

const content = {
  en: {
    hero: {
      title: 'Service',
      subtitle: 'Crafting digital experiences that leave a lasting impression.',
    },
    services: {
      heading: 'What I Do',
      items: [
        {
          icon: '✦',
          title: 'Web Design & Development',
          description:
            'Custom websites built with modern frameworks, responsive, performant, and visually refined.',
        },
        {
          icon: '✦',
          title: 'UI/UX Design',
          description:
            'User-centered interfaces designed with clarity, consistency, and delight in mind.',
        },
        {
          icon: '✦',
          title: 'Brand & Visual Identity',
          description:
            'Cohesive visual systems from logos and color palettes to typography and guidelines.',
        },
        {
          icon: '✦',
          title: 'Interactive & Motion Design',
          description:
            'Purposeful animations and micro-interactions that elevate the user experience.',
        },
        {
          icon: '✦',
          title: 'Landing Page & Campaign',
          description:
            'High-converting pages designed for product launches, events, or marketing campaigns.',
        },
        {
          icon: '✦',
          title: 'Consultation & Strategy',
          description:
            'Design audits, technical guidance, and product strategy for teams of any size.',
        },
      ],
    },
    process: {
      heading: 'How I Work',
      steps: [
        {
          number: '01',
          title: 'Discovery',
          description: 'Understanding your goals, audience, and project scope through an initial consultation.',
        },
        {
          number: '02',
          title: 'Proposal',
          description: 'Delivering a clear project plan with timeline, deliverables, and transparent pricing.',
        },
        {
          number: '03',
          title: 'Design',
          description: 'Creating wireframes and visual designs with iterative feedback rounds.',
        },
        {
          number: '04',
          title: 'Development',
          description: 'Building your project with clean, maintainable code and pixel-perfect execution.',
        },
        {
          number: '05',
          title: 'Review & Launch',
          description: 'Final QA, revisions, and a smooth handoff or deployment.',
        },
        {
          number: '06',
          title: 'Support',
          description: 'Post-launch maintenance and ongoing support as needed.',
        },
      ],
    },
    pricing: {
      heading: 'Pricing',
      note: "Final pricing is tailored to each project's scope and requirements.",
      tiers: [
        {
          name: 'Starter',
          price: 'NT$ 30,000+',
          description: 'Perfect for simple, single-page sites or landing pages.',
          features: [
            'Single page / Landing page',
            'Responsive design',
            'Basic animations',
            '1 round of revisions',
            'Delivery in 2–3 weeks',
          ],
        },
        {
          name: 'Standard',
          price: 'NT$ 80,000+',
          description: 'For multi-page websites with custom design and interactions.',
          features: [
            'Up to 5 pages',
            'Custom UI/UX design',
            'Interactive animations',
            'CMS integration',
            '2 rounds of revisions',
            'Delivery in 4–6 weeks',
          ],
          highlighted: true,
        },
        {
          name: 'Premium',
          price: 'NT$ 150,000+',
          description: 'Full-scope projects with advanced features and ongoing support.',
          features: [
            'Unlimited pages',
            'Brand identity design',
            'Advanced interactions & 3D',
            'CMS + custom features',
            '3 rounds of revisions',
            '1 month post-launch support',
          ],
        },
      ],
    },
    cta: "Let's Talk",
  },
  zh: {
    hero: {
      title: '接案服務',
      subtitle: '打造令人印象深刻的數位體驗。',
    },
    services: {
      heading: '服務項目',
      items: [
        {
          icon: '✦',
          title: '網頁設計與開發',
          description: '使用現代框架打造客製化網站，響應式、高效能、視覺精緻。',
        },
        {
          icon: '✦',
          title: 'UI/UX 設計',
          description: '以使用者為中心的介面設計，注重清晰度、一致性與愉悅感。',
        },
        {
          icon: '✦',
          title: '品牌與視覺識別',
          description: '從標誌、色彩到字體排版，建構完整的品牌視覺系統。',
        },
        {
          icon: '✦',
          title: '互動與動態設計',
          description: '有目的性的動畫與微互動，提升整體使用體驗。',
        },
        {
          icon: '✦',
          title: '著陸頁與活動頁面',
          description: '為產品發佈、活動或行銷活動設計的高轉換頁面。',
        },
        {
          icon: '✦',
          title: '諮詢與策略規劃',
          description: '設計審查、技術指導，以及適合各種規模團隊的產品策略。',
        },
      ],
    },
    process: {
      heading: '接案流程',
      steps: [
        {
          number: '01',
          title: '需求探索',
          description: '透過初步諮詢了解您的目標、受眾與專案範圍。',
        },
        {
          number: '02',
          title: '提案報價',
          description: '提供清晰的專案計畫，包含時程、交付內容與透明報價。',
        },
        {
          number: '03',
          title: '設計階段',
          description: '製作線框稿與視覺設計，並進行多輪迭代反饋。',
        },
        {
          number: '04',
          title: '開發實作',
          description: '以乾淨、可維護的程式碼進行像素級完美的開發。',
        },
        {
          number: '05',
          title: '審查與上線',
          description: '最終品質檢查、修訂，以及順暢的交付或部署。',
        },
        {
          number: '06',
          title: '後續支援',
          description: '上線後的維護與持續技術支援。',
        },
      ],
    },
    pricing: {
      heading: '預計報價',
      note: '最終報價將依專案範圍與需求進行調整。',
      tiers: [
        {
          name: '基礎方案',
          price: 'NT$ 30,000+',
          description: '適合簡單的單頁網站或著陸頁。',
          features: [
            '單頁 / 著陸頁',
            '響應式設計',
            '基礎動畫效果',
            '1 次修改回合',
            '2–3 週交付',
          ],
        },
        {
          name: '標準方案',
          price: 'NT$ 80,000+',
          description: '適合需要客製設計與互動效果的多頁網站。',
          features: [
            '最多 5 頁',
            '客製 UI/UX 設計',
            '互動動畫效果',
            'CMS 內容管理整合',
            '2 次修改回合',
            '4–6 週交付',
          ],
          highlighted: true,
        },
        {
          name: '進階方案',
          price: 'NT$ 150,000+',
          description: '完整專案，包含進階功能與持續支援。',
          features: [
            '不限頁數',
            '品牌識別設計',
            '進階互動與 3D 效果',
            'CMS + 客製功能',
            '3 次修改回合',
            '上線後 1 個月支援',
          ],
        },
      ],
    },
    cta: '聯繫我',
  },
};

type Lang = 'en' | 'zh';

export default function ServicesPage() {
  const [lang, setLang] = useState<Lang>('en');
  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Header />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Language Toggle */}
          <div className="flex items-center gap-1 mb-12 bg-black/5 rounded-full p-1 text-sm font-inter">
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                lang === 'en'
                  ? 'bg-[#1a1a1a] text-white'
                  : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('zh')}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                lang === 'zh'
                  ? 'bg-[#1a1a1a] text-white'
                  : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'
              }`}
            >
              中
            </button>
          </div>

          <h1 className="font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-[#1a1a1a]">
            {t.hero.title}
          </h1>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl font-noto-sans text-[#1a1a1a]/60 max-w-2xl">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Services */}
      <FadeInSection>
        <section className="py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1a1a1a] mb-16 sm:mb-20 text-center">
              {t.services.heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {t.services.items.map((service, i) => (
                <div
                  key={i}
                  className="group p-8 sm:p-10 rounded-3xl border border-[#1a1a1a]/8 hover:border-[#1a1a1a]/15 bg-white/40 hover:bg-white/70 transition-all duration-500 hover:-translate-y-1"
                >
                  <span className="text-2xl mb-6 block text-[#3b64f6]">
                    {service.icon}
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-semibold text-[#1a1a1a] mb-3">
                    {service.title}
                  </h3>
                  <p className="font-noto-sans text-[#1a1a1a]/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-16 sm:mt-20 text-center">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => window.dispatchEvent(new Event('footer-star-burst')), 350);
                }}
                className="inline-block bg-[#1a1a1a] text-white px-10 py-4 rounded-full font-inter font-medium tracking-wider text-sm hover:bg-[#333] transition-all duration-300"
              >
                {t.cta}
              </a>
            </div>
          </div>
        </section>
      </FadeInSection>

      <Footer />
    </div>
  );
}
