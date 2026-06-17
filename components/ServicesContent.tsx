'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeInSection from '@/components/FadeInSection';
import { useLanguage } from '@/components/LanguageContext';
import { usePageTransition } from '@/components/PageTransition';

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
          title: 'Website Redesign',
          description:
            'Refreshing existing sites with modern design, improved UX, and up-to-date technology.',
        },
        {
          icon: '✦',
          title: 'Creative Website Design',
          description:
            'Custom visual design with animations and interactions that make your brand stand out.',
        },
        {
          icon: '✦',
          title: 'Interactive Development',
          description:
            'Bringing designs to life with GSAP, Framer Motion, and Three.js for immersive web experiences.',
        },
        {
          icon: '✦',
          title: 'CMS Setup & Integration',
          description:
            'Building content management systems with Sanity or headless CMS for easy content updates.',
        },
        {
          icon: '✦',
          title: 'Deployment & Launch',
          description:
            'Getting your site live with hosting, custom domain, and automatic deployments.',
        },
        {
          icon: '✦',
          title: 'Full Package',
          description:
            'End-to-end service from design to development to deployment — everything handled for you.',
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
          price: '$ 800+',
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
          price: '$ 1,000+',
          description: 'For multi-page websites with custom design and interactions.',
          features: [
            'Up to 5 pages',
            'UI/UX planning & design',
            'Interactive animations',
            'CMS integration',
            '2 rounds of revisions',
            'Delivery in 4–6 weeks',
          ],
          highlighted: true,
        },
        {
          name: 'Premium',
          price: '$ 1,600+',
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
      longTerm: {
        name: 'Long-term Partnership',
        description: 'Quarterly or annual collaboration agreements with pricing tailored through discussion.',
      },
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
          title: '網站改版',
          description: '以現代設計與技術重新打造既有網站，提升使用體驗與視覺質感。',
        },
        {
          icon: '✦',
          title: '創意網站設計',
          description: '結合動畫與互動效果的客製化視覺設計，讓品牌脫穎而出。',
        },
        {
          icon: '✦',
          title: '互動開發',
          description: '運用 GSAP、Framer Motion、Three.js 打造沉浸式網頁互動體驗。',
        },
        {
          icon: '✦',
          title: 'CMS 建置與整合',
          description: '透過 Sanity 或 Headless CMS 建立內容管理系統，輕鬆更新網站內容。',
        },
        {
          icon: '✦',
          title: '部署與上線',
          description: '處理主機架設與網域設定，讓網站順利上線並自動更新。',
        },
        {
          icon: '✦',
          title: '全套服務',
          description: '從設計到開發到部署，一站式全包服務。',
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
          price: 'NT$ 25,000+',
          description: '適合簡單的單頁網站或著陸頁。',
          features: [
            '單頁 / 著陸頁',
            '響應式設計',
            '基礎動畫效果',
            '1 次設計修改回合',
            '2–3 週交付',
          ],
        },
        {
          name: '標準方案',
          price: 'NT$ 30,000+',
          description: '適合需要客製設計與互動效果的多頁網站。',
          features: [
            '最多 5 頁',
            'UI/UX 規劃與設計',
            '互動動畫效果',
            'CMS 內容管理整合',
            '2 次設計修改回合',
            '4–6 週交付',
          ],
          highlighted: true,
        },
        {
          name: '進階方案',
          price: 'NT$ 50,000+',
          description: '完整專案，包含進階功能與持續支援。',
          features: [
            '不限頁數',
            '品牌識別設計',
            '進階互動與 3D 效果',
            'CMS + 客製功能',
            '3 次設計修改回合',
            '上線後 1 個月支援',
          ],
        },
      ],
      longTerm: {
        name: '長期合作方案',
        description: '季度或年度的長期合作協議，價格依需求討論決定。',
      },
    },
    cta: '聯繫我',
  },
};

export default function ServicesContent() {
  const { lang } = useLanguage();
  const { navigateTo } = usePageTransition();
  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Header />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
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
          </div>
        </section>
      </FadeInSection>

      {/* Process */}
      <FadeInSection>
        <section className="py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1a1a1a] mb-16 sm:mb-20 text-center">
              {t.process.heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {t.process.steps.map((step, i) => (
                <div
                  key={i}
                  className="p-8 sm:p-10 rounded-3xl border border-[#1a1a1a]/8 bg-white/40"
                >
                  <span className="font-cinzel text-4xl font-bold text-[#3b64f6]/20 block mb-4">
                    {step.number}
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-semibold text-[#1a1a1a] mb-3">
                    {step.title}
                  </h3>
                  <p className="font-noto-sans text-[#1a1a1a]/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Pricing */}
      <FadeInSection>
        <section className="py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1a1a1a] mb-6 text-center">
              {t.pricing.heading}
            </h2>
            <p className="font-noto-sans text-[#1a1a1a]/60 text-center mb-16 sm:mb-20 max-w-2xl mx-auto">
              {t.pricing.note}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
              {t.pricing.tiers.map((tier, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col rounded-2xl transition-all duration-500 ${
                    tier.highlighted
                      ? 'border border-[#3b64f6]/40 bg-white shadow-2xl shadow-[#3b64f6]/15 py-6 md:-mt-8'
                      : 'border border-[#e5e5e5] bg-white self-stretch'
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-[#3b64f6] text-white text-xs font-cinzel font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full">
                        Popular
                      </span>
                    </div>
                  )}
                  <div className="p-8 sm:p-10 flex flex-col flex-1">
                    <h3 className="font-noto-sans text-lg font-bold text-[#1a1a1a] mb-2">
                      {tier.name}
                    </h3>
                    <p className="font-cinzel text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-3">
                      {tier.price}
                    </p>
                    <p className="font-noto-sans text-sm text-[#1a1a1a] mb-6">
                      {tier.description}
                    </p>
                    <ul className="space-y-3 flex-1">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="font-noto-sans text-sm text-[#1a1a1a] flex items-center gap-2.5">
                          <span className={`text-lg ${tier.highlighted ? 'text-[#3b64f6]' : 'text-[#1a1a1a]/30'}`}>✦</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 sm:mt-16 text-center border border-dashed border-[#1a1a1a]/15 rounded-2xl py-8 px-6 sm:py-10 sm:px-10">
              <h3 className="font-noto-sans text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-2">
                {t.pricing.longTerm.name}
              </h3>
              <p className="font-noto-sans text-[#1a1a1a]/50 max-w-lg mx-auto">
                {t.pricing.longTerm.description}
              </p>
            </div>
            <div className="mt-16 sm:mt-20 text-center">
              <button
                onClick={() => navigateTo(`/${lang}/contact`)}
                className="inline-block bg-[#1a1a1a] text-white px-12 py-5 rounded-full font-inter font-medium tracking-wider text-base sm:text-lg hover:bg-[#333] transition-all duration-300 cursor-pointer"
              >
                {t.cta}
              </button>
            </div>
          </div>
        </section>
      </FadeInSection>

      <Footer />
    </div>
  );
}
