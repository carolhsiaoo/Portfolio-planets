'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/components/LanguageContext';

const OPEN_DURATION = 280;
const CLOSE_DURATION = 220;

const serviceOptions = [
  { value: 'website-redesign', en: 'Website Redesign', zh: '網站改版' },
  { value: 'creative-design', en: 'Creative Website Design', zh: '創意網站設計' },
  { value: 'interactive-dev', en: 'Interactive Development', zh: '互動開發' },
  { value: 'cms', en: 'CMS Setup & Integration', zh: 'CMS 建置與整合' },
  { value: 'deployment', en: 'Deployment & Launch', zh: '部署與上線' },
  { value: 'full-package', en: 'Full Package', zh: '全套服務' },
  { value: 'other', en: 'Other', zh: '其他' },
];

const content = {
  en: {
    form: {
      heading: "Let's Build Something Great",
      responseTime: "Share your idea and I'll follow up within 1–2 business days.",
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      phone: 'Phone',
      phonePlaceholder: 'Your phone number',
      serviceType: 'Service Type (multiple)',
      message: 'Project Details',
      messagePlaceholder: 'Tell me about your project, goals, timeline, and budget...',
      submit: 'Submit',
      submitting: 'Submitting...',
      success: 'Thank you! I’ll get back to you soon.',
      error: 'Something went wrong. Please try again.',
    },
  },
  zh: {
    form: {
      heading: '一起打造好作品',
      responseTime: '分享你的想法，我會在 1～2 個工作天內與你聯繫。',
      name: '姓名',
      namePlaceholder: '您的姓名',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      phone: '聯繫電話',
      phonePlaceholder: '您的電話號碼',
      serviceType: '需求類型（可複選）',
      message: '需求描述',
      messagePlaceholder: '請描述您的專案、目標、時程與預算...',
      submit: '送出表單',
      submitting: '提交中...',
      success: '感謝你的填寫！我會盡快回覆',
      error: '發生錯誤，請稍後再試。',
    },
  },
};

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useLanguage();
  const t = content[lang];

  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceTypes: [] as string[],
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [msgVisible, setMsgVisible] = useState(false);
  const [lastStatus, setLastStatus] = useState<'success' | 'error' | null>(null);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, CLOSE_DURATION);
  }, [onClose]);

  // Fade in on open, lock body scroll, close on Escape
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => setVisible(true));
    // Lock scrolling on <html>: globals.css sets overflow-x on it, which stops
    // body overflow from propagating to the viewport, so body alone isn't enough
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, handleClose]);

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      setLastStatus(status);
      requestAnimationFrame(() => setMsgVisible(true));
      const timer = setTimeout(() => {
        setMsgVisible(false);
        setTimeout(() => { setStatus('idle'); setLastStatus(null); }, 500);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const toggleService = (value: string) => {
    setForm((prev) => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(value)
        ? prev.serviceTypes.filter((s) => s !== value)
        : [...prev.serviceTypes, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', email: '', phone: '', serviceTypes: [], message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-70 overflow-y-auto overscroll-contain bg-[#0a0a0a]/50 backdrop-blur-md transition-opacity ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDuration: `${visible ? OPEN_DURATION : CLOSE_DURATION}ms` }}
    >
      <div className="min-h-full flex items-center justify-center px-3 py-3 sm:px-5 sm:py-5">
        {/* Floating white panel — same treatment as the case study pages */}
        <div
          className={`relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/30 transition-all ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none will-change-transform ${
            visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-[0.97]'
          }`}
          style={{ transitionDuration: `${visible ? OPEN_DURATION : CLOSE_DURATION}ms` }}
        >
          {/* Close */}
          <button
            onClick={handleClose}
            aria-label="Close contact form"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black text-white transition-colors duration-300 hover:bg-[#333] cursor-pointer"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8 sm:p-12">
            <h2 className="font-cinzel text-2xl sm:text-3xl font-semibold text-[#1a1a1a] mb-1 text-center">
              {t.form.heading}
            </h2>
            <p className="font-noto-sans text-sm sm:text-base text-[#1a1a1a]/70 mb-8 text-center">
              {t.form.responseTime}
            </p>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Name */}
              <div>
                <label className="block font-noto-sans text-sm sm:text-base font-medium text-[#1a1a1a]/70 mb-2">
                  {t.form.name}
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t.form.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#faf8f5] font-noto-sans text-base text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 focus:outline-none focus:border-[#3b64f6]/40 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-noto-sans text-sm sm:text-base font-medium text-[#1a1a1a]/70 mb-2">
                  {t.form.email}
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t.form.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#faf8f5] font-noto-sans text-base text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 focus:outline-none focus:border-[#3b64f6]/40 transition-colors"
                />
              </div>

              {/* Service Types */}
              <div>
                <label className="block font-noto-sans text-sm sm:text-base font-medium text-[#1a1a1a]/70 mb-3">
                  {t.form.serviceType}
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {serviceOptions.map((opt) => {
                    const selected = form.serviceTypes.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => toggleService(opt.value)}
                        className={`px-4 py-2 rounded-full font-noto-sans text-sm sm:text-base transition-all duration-200 ${
                          selected
                            ? 'bg-[#3b64f6] border border-[#3b64f6] text-white'
                            : 'bg-[#faf8f5] border border-[#e5e5e5] text-[#1a1a1a]/60 hover:border-[#3b64f6]/30 hover:text-[#3b64f6]'
                        }`}
                      >
                        {lang === 'zh' ? opt.zh : opt.en}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-noto-sans text-sm sm:text-base font-medium text-[#1a1a1a]/70 mb-2">
                  {t.form.message}
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t.form.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#faf8f5] font-noto-sans text-base text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 focus:outline-none focus:border-[#3b64f6]/40 transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-[#1a1a1a] text-white px-12 py-5 rounded-full font-inter font-medium tracking-wider text-sm sm:text-base hover:bg-[#333] transition-all duration-300 disabled:opacity-50"
                >
                  {status === 'submitting' ? t.form.submitting : t.form.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {lastStatus && (
        <div className={`fixed bottom-20 sm:bottom-8 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-80 pointer-events-none transition-all duration-500 ease-in-out ${msgVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-white border border-[#1a1a1a]/8 text-xs sm:text-base font-semibold text-center ${lastStatus === 'error' ? 'text-[#c45c5c]' : 'text-[#1a1a1a]'} ${lang === 'zh' ? 'font-noto-sans' : 'font-cinzel'}`}>
            ✦ {lastStatus === 'success' ? t.form.success : t.form.error} ✦
          </p>
        </div>
      )}
    </div>
  );
}
