'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type ProjectData, projects } from '@/data/projects';
import FadeInSection from '@/components/FadeInSection';
import Header from '@/components/Header';

function AutoPlayVideo({ src, className }: { src: string; className: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const poster = src.startsWith('/') ? `/posters${src.replace(/\.(mp4|webm)$/, '.webp')}` : undefined;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let inView = false;

    // Only fetch and play the video while it is near the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
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
      if (inView && video.paused) {
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
  }, []);

  return (
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
}

export default function CreativeCaseStudy({ project }: { project: ProjectData }) {
  const study = project.creativeStudy!;

  const studyProjects = projects.filter((p) => p.creativeStudy);
  const currentIndex = studyProjects.findIndex((p) => p.slug === project.slug);
  const next = studyProjects[(currentIndex + 1) % studyProjects.length];
  const prev = studyProjects[(currentIndex - 1 + studyProjects.length) % studyProjects.length];
  const hasNext = studyProjects.length > 1;
  const hasPrev = studyProjects.length > 2; // with 2 projects prev === next

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-16 sm:pb-24">
      {/* Header — same as homepage, hidden until scrolled past the hero */}
      <Header revealAfterId="hero" />

      {/* Floating white panel — the case itself */}
      <div className="px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden">
          {/* Close — back to the projects list */}
          <Link
            href="/#work"
            aria-label="Close case study"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black text-white transition-colors duration-300 hover:bg-gray-700"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>

          {/* Hero — clean video, no overlay */}
          <section id="hero" className="relative">
            {project.video ? (
              <AutoPlayVideo src={project.video} className="w-full aspect-video object-cover" />
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
          </section>

          {/* Title + description */}
          <section className="px-6 sm:px-12 lg:px-20 pt-16 sm:pt-28 pb-8 sm:pb-12">
            <FadeInSection>
              {/* Same 2-col grid + gap as the styleframes below, so the
                  description column lines up with the right image column */}
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 sm:gap-16 md:items-start">
                <h1 className="font-cinzel font-medium text-4xl sm:text-5xl lg:text-6xl leading-tight">
                  {project.name}
                </h1>
                <div>
                  {project.tagline && (
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-inter font-normal leading-relaxed text-gray-900">
                      {project.tagline}
                    </p>
                  )}
                  <p className="mt-6 text-base sm:text-lg font-inter text-gray-900 leading-relaxed">
                    {study.meta.role} · {study.meta.year} · {study.meta.tech.join(' · ')}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
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
                      alt={visual.caption ?? `${project.name} styleframe ${i + 1}`}
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
        </div>
      </div>

      {/* Back to home — on the dark stage */}
      <div className="pt-12 sm:pt-16 text-center">
        <Link
          href="/#work"
          className="font-inter text-xs sm:text-sm tracking-[0.2em] uppercase text-white/60 transition-colors duration-300 hover:text-white"
        >
          Back to Home
        </Link>
      </div>

      {/* Previous / next — quiet text + small thumbnail, pushed to the edges */}
      {hasNext && (
        <section className="pt-16 sm:pt-24 px-6 sm:px-10 lg:px-16">
          <div className="flex items-start justify-between gap-8">
            {hasPrev ? (
              <Link href={`/projects/${prev.slug}`} className="group block">
                <span className="flex items-center gap-2 font-inter text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-white/60 transition-colors duration-300 group-hover:text-white">
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                  Prev
                </span>
                <div className="relative mt-5 w-64 sm:w-96 aspect-video overflow-hidden rounded-md border border-white/20">
                  <Image
                    src={prev.image}
                    alt={`${prev.name} — ${prev.type}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="384px"
                  />
                </div>
                <p className="mt-4 font-cinzel font-medium text-xl sm:text-2xl text-white/60 transition-colors duration-300 group-hover:text-white">
                  {prev.name}
                </p>
              </Link>
            ) : (
              <div />
            )}

            <Link href={`/projects/${next.slug}`} className="group block text-right">
              <span className="flex items-center justify-end gap-2 font-inter text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-white/60 transition-colors duration-300 group-hover:text-white">
                Next
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <div className="relative mt-5 ml-auto w-64 sm:w-96 aspect-video overflow-hidden rounded-md border border-white/20">
                <Image
                  src={next.image}
                  alt={`${next.name} — ${next.type}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="384px"
                />
              </div>
              <p className="mt-4 font-cinzel font-medium text-xl sm:text-2xl text-white/60 transition-colors duration-300 group-hover:text-white">
                {next.name}
              </p>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
