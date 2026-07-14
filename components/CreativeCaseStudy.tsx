'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type ProjectData, projects } from '@/data/projects';
import FadeInSection from '@/components/FadeInSection';
import Header from '@/components/Header';
import { usePageTransition } from '@/components/PageTransition';
import { useLanguage } from '@/components/LanguageContext';

function AutoPlayVideo({
  src,
  className,
  allowPlay = true,
  showProgress = false,
  progressColor = '#000000',
}: {
  src: string;
  className: string;
  allowPlay?: boolean;
  showProgress?: boolean;
  progressColor?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const poster = src.startsWith('/') ? `/posters${src.replace(/\.(mp4|webm)$/, '.webp')}` : undefined;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let inView = false;

    // Only fetch and play the video while it is near the viewport,
    // and never before the entrance animation has finished (allowPlay)
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && allowPlay) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(video);

    // Retry on user interaction (autoplay can be blocked in in-app browsers)
    const retryOnTouch = () => {
      if (inView && allowPlay && video.paused) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener('touchstart', retryOnTouch, { passive: true });
    document.addEventListener('scroll', retryOnTouch, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener('touchstart', retryOnTouch);
      document.removeEventListener('scroll', retryOnTouch);
    };
  }, [allowPlay]);

  // Progress bar — driven by rAF while playing (timeupdate only fires ~4x/s,
  // which looks choppy on a bar this thin)
  useEffect(() => {
    if (!showProgress) return;
    const video = videoRef.current;
    const bar = progressRef.current;
    if (!video || !bar) return;
    let raf = 0;

    const tick = () => {
      if (video.duration) {
        bar.style.width = `${(video.currentTime / video.duration) * 100}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const stop = () => cancelAnimationFrame(raf);

    video.addEventListener('play', start);
    video.addEventListener('pause', stop);
    if (!video.paused) start();

    return () => {
      video.removeEventListener('play', start);
      video.removeEventListener('pause', stop);
      cancelAnimationFrame(raf);
    };
  }, [showProgress]);

  const video = (
    <video
      ref={videoRef}
      src={src}
      preload="metadata"
      poster={poster}
      loop
      muted
      playsInline
      className={className}
    />
  );

  if (!showProgress) return video;

  return (
    <div className="relative">
      {video}
      {/* Bottom border doubling as playback progress — no track, only the
          played portion is visible. Width (not scaleX) so the rounded right
          cap keeps its shape as the bar grows. */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 sm:h-1">
        <div
          ref={progressRef}
          className="h-full rounded-r-full"
          style={{ width: '0%', backgroundColor: progressColor }}
        />
      </div>
    </div>
  );
}

export default function CreativeCaseStudy({ project }: { project: ProjectData }) {
  const study = project.creativeStudy!;
  const { isTransitioning } = usePageTransition();
  const { lang } = useLanguage();

  // Hero entrance: blur + slide up on load; the video only starts playing
  // once the animation has finished (heroReady)
  const [heroIn, setHeroIn] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  // Arriving via the shared-element view transition from the home page:
  // the browser is already morphing the preview into the hero, so skip the
  // blur entrance and show the hero immediately. The pre-paint first frame
  // is handled by the data-vt-hero attribute (inline script in layout.tsx)
  // — here we just hand over to React state and clean up.
  useLayoutEffect(() => {
    if (sessionStorage.getItem('vt-project-hero') === '1') {
      sessionStorage.removeItem('vt-project-hero');
      setHeroIn(true);
      setHeroReady(true);
    }
    document.documentElement.removeAttribute('data-vt-hero');
  }, []);

  useEffect(() => {
    if (isTransitioning) return;
    const inTimer = setTimeout(() => setHeroIn(true), 100);
    const readyTimer = setTimeout(() => setHeroReady(true), 1100);
    return () => {
      clearTimeout(inTimer);
      clearTimeout(readyTimer);
    };
  }, [isTransitioning]);

  const studyProjects = projects.filter((p) => p.creativeStudy);
  const currentIndex = studyProjects.findIndex((p) => p.slug === project.slug);
  const next = studyProjects[(currentIndex + 1) % studyProjects.length];
  const prev = studyProjects[(currentIndex - 1 + studyProjects.length) % studyProjects.length];
  const hasNext = studyProjects.length > 1;
  const hasPrev = studyProjects.length > 2; // with 2 projects prev === next

  // The global `scroll-behavior: smooth` makes Next's scroll-to-top on
  // navigation animate, which the header reads as "scrolling up" and flashes
  // in. Jump instantly for prev/next navigation instead.
  const jumpToTopOnNav = () => {
    document.documentElement.style.scrollBehavior = 'auto';
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-16 sm:pb-24">
      {/* Header — hides scrolling down and at the very top; shows when
          scrolling up anywhere else on the page */}
      <Header hideOnScroll hideAtTop />

      {/* Floating white panel — the case itself */}
      <div className="px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden">
          {/* Close — back to the projects list. A plain anchor (full-page
              navigation) so the cross-document view transition collapses the
              hero on the way out; the flag tells the home page to skip the
              loading intro. */}
          <a
            href={`/${lang}#work`}
            aria-label="Close case study"
            onClick={() => sessionStorage.setItem('skip-intro', '1')}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black text-white transition-colors duration-300 hover:bg-[#333]"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </a>

          {/* Hero — blur + slide-up entrance; playback starts after it settles.
              Carries the view-transition-name that the home-page preview morphs into. */}
          <section id="hero" className="relative" style={{ viewTransitionName: 'project-hero' }}>
            <div
              className={`hero-entrance transition-all duration-1000 ease-out ${
                heroIn ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-16 blur-xl'
              }`}
            >
              {project.video ? (
                <AutoPlayVideo
                  src={project.video}
                  allowPlay={heroReady}
                  showProgress
                  progressColor={project.themeColor}
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div className="relative w-full aspect-video">
                  <Image
                    src={project.image}
                    alt={`${project.name} — ${project.type}`}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Title + description */}
          <section className="px-6 sm:px-12 lg:px-20 pt-16 sm:pt-28 pb-8 sm:pb-12">
            <FadeInSection>
              {/* Same 2-col grid + gap as the styleframes below, so the
                  description column lines up with the right image column */}
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 sm:gap-16 md:items-start">
                <div>
                  <h1 className="font-cinzel font-medium text-4xl sm:text-5xl lg:text-6xl leading-tight">
                    {project.name}
                  </h1>
                  <p className="mt-4 font-cinzel font-medium text-lg sm:text-xl text-gray-900 leading-relaxed">
                    {study.meta.role} · {study.meta.year} · {study.meta.tech.join(' · ')}
                  </p>
                </div>
                <div>
                  {project.tagline && (
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-inter font-normal leading-relaxed text-gray-900">
                      {project.tagline}
                    </p>
                  )}
                </div>
              </div>
            </FadeInSection>
          </section>

          {/* Styleframes — 2 × 2 grid */}
          <section className="px-6 sm:px-12 lg:px-20 py-20 sm:py-32 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16">
            {study.visuals.map((visual, i) => (
              <FadeInSection key={visual.src} direction="bottom">
                <figure>
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-black/10">
                    <Image
                      src={visual.src}
                      alt={visual.alt ?? visual.caption ?? `${project.name} styleframe ${i + 1}`}
                      width={1440}
                      height={810}
                      className="w-full"
                      quality={95}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  {visual.caption && (
                    <figcaption className="mt-3 text-sm font-inter text-gray-500">
                      {visual.caption}
                    </figcaption>
                  )}
                </figure>
              </FadeInSection>
            ))}
          </section>

          {/* CTA — after the styleframes */}
          <section className="pb-20 sm:pb-28">
            <FadeInSection>
              <div className="flex flex-wrap items-center justify-center gap-3 px-6">
                <a
                  href={study.playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full text-base sm:text-lg font-inter font-medium tracking-wider hover:bg-[#333] transition-colors duration-300"
                >
                  {study.ctaLabel ?? 'See It Live'}
                </a>
                {study.blogUrl && (
                  <Link
                    href={study.blogUrl}
                    className="inline-flex items-center gap-2 px-8 py-4 border border-gray-300 rounded-full text-base sm:text-lg font-inter font-medium tracking-wider hover:border-gray-500 transition-colors duration-300"
                  >
                    Read the Build Story
                  </Link>
                )}
              </div>
            </FadeInSection>
          </section>
        </div>
      </div>

      {/* Previous / next — quiet text + small thumbnail, pushed to the edges */}
      {hasNext && (
        <section className="pt-16 sm:pt-24 px-6 sm:px-10 lg:px-16">
          <div className="flex items-start justify-between gap-6 sm:gap-8">
            {hasPrev ? (
              <FadeInSection direction="bottom">
              <Link href={`/projects/${prev.slug}`} onClick={jumpToTopOnNav} className="group block">
                <span className="flex items-center gap-2 font-inter text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-white/60 transition-colors duration-300 group-hover:text-white">
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                  Prev
                </span>
                <div className="relative mt-4 sm:mt-5 w-28 md:w-64 lg:w-96 aspect-video overflow-hidden rounded-md border border-white/20">
                  <Image
                    src={prev.image}
                    alt={`${prev.name} — ${prev.type}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 112px, 384px"
                  />
                </div>
                <p className="mt-3 sm:mt-4 font-cinzel font-medium text-base md:text-xl lg:text-2xl text-white/60 transition-colors duration-300 group-hover:text-white">
                  {prev.name}
                </p>
              </Link>
              </FadeInSection>
            ) : (
              <div />
            )}

            <FadeInSection direction="bottom" delay={150}>
            <Link href={`/projects/${next.slug}`} onClick={jumpToTopOnNav} className="group block text-right">
              <span className="flex items-center justify-end gap-2 font-inter text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-white/60 transition-colors duration-300 group-hover:text-white">
                Next
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <div className="relative mt-4 sm:mt-5 ml-auto w-28 md:w-64 lg:w-96 aspect-video overflow-hidden rounded-md border border-white/20">
                <Image
                  src={next.image}
                  alt={`${next.name} — ${next.type}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 112px, 384px"
                />
              </div>
              <p className="mt-3 sm:mt-4 font-cinzel font-medium text-base md:text-xl lg:text-2xl text-white/60 transition-colors duration-300 group-hover:text-white">
                {next.name}
              </p>
            </Link>
            </FadeInSection>
          </div>
        </section>
      )}
    </div>
  );
}
