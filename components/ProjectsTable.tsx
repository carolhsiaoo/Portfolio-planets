'use client'

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { projects } from '@/data/projects';
import { useLanguage } from './LanguageContext';

function VideoWithFallback({ src, fallbackImage, alt }: { src: string; fallbackImage: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;

    // Retry autoplay on any user interaction (for in-app browsers)
    const retryOnTouch = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener('touchstart', retryOnTouch, { once: true });
    document.addEventListener('scroll', retryOnTouch, { once: true });

    return () => {
      document.removeEventListener('touchstart', retryOnTouch);
      document.removeEventListener('scroll', retryOnTouch);
    };
  }, [failed]);

  // Thumbnail shows instantly; the video fades in over it once it can play,
  // so the preview panel is never blank while the video buffers.
  return (
    <div className="absolute inset-0">
      <Image src={fallbackImage} alt={alt} fill className="object-cover" sizes="450px" quality={90} />
      {!failed && (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setVideoReady(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}

// Build a flat list with inline category headers
type Row =
  | { kind: 'label'; label: string }
  | { kind: 'project'; project: (typeof projects)[number]; globalIndex: number };

function buildRows(): Row[] {
  const hidden = new Set(['Timez', 'Healing Drinks', 'Equation Pyramid']);
  const creative = projects.filter((p) => p.category === 'creative' && !hidden.has(p.name));
  const functional = projects.filter((p) => p.category === 'functional' && !hidden.has(p.name));
  const rows: Row[] = [];

  rows.push({ kind: 'label', label: 'Interactive Websites' });
  creative.forEach((p, i) => rows.push({ kind: 'project', project: p, globalIndex: i }));

  rows.push({ kind: 'label', label: 'Functional Products' });
  functional.forEach((p, i) =>
    rows.push({ kind: 'project', project: p, globalIndex: creative.length + i })
  );

  return rows;
}

const rows = buildRows();
const allProjects = rows.filter((r): r is Extract<Row, { kind: 'project' }> => r.kind === 'project');

// Transitional: once every visible project has a case study page, the
// interaction is uniform and the per-row "Case Study" chip becomes noise.
const allHaveCaseStudy = allProjects.every((r) => r.project.creativeStudy);

const categoryLabels: Record<string, Record<string, string>> = {
  'Functional Products': { en: 'Functional Products', zh: '功能性產品' },
  'Interactive Websites': { en: 'Interactive Websites', zh: '互動網站體驗' },
};

// Where does clicking this project take you? Shown as an overlay on previews.
function destinationLabel(project: (typeof projects)[number], lang: string) {
  if (project.creativeStudy) return lang === 'zh' ? '作品解析' : 'Case Study';
  return lang === 'zh' ? '線上觀看' : 'See It Live';
}

export default function ProjectsTable() {
  const { lang } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Preload a project's hover media on first hover intent, so we never
  // download previews the user doesn't reach for (matters a lot on mobile,
  // where the hover preview is never shown at all).
  const preloadedRef = useRef(new Set<string>());
  const preloadProject = useCallback((project: (typeof projects)[number]) => {
    const key = project.slug;
    if (preloadedRef.current.has(key)) return;
    preloadedRef.current.add(key);

    if (project.video) {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.src = project.video;
      video.load();
    }
    if (project.image) {
      const img = new window.Image();
      // Match the Next.js Image optimization URL so the cache hit is exact
      img.src = project.image.startsWith('http')
        ? project.image
        : `/_next/image?url=${encodeURIComponent(project.image)}&w=640&q=90`;
    }
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 100);
    },
    [mouseX, mouseY]
  );

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative bg-[#faf8f5] py-16 sm:py-24 lg:py-32"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col">
          {rows.map((row, i) => {
            if (row.kind === 'label') {
              return (
                <span
                  key={row.label}
                  className={`block font-inter text-xs tracking-widest uppercase text-neutral-500 ${
                    i === 0 ? 'mb-4' : 'mt-16 mb-4'
                  }`}
                >
                  {categoryLabels[row.label]?.[lang] ?? row.label}
                </span>
              );
            }

            const { project, globalIndex } = row;
            // Projects with a creative case study route internally; the rest
            // open their live site directly in a new tab.
            const hasCaseStudy = !!project.creativeStudy;
            return (
              <motion.a
                key={project.slug}
                href={hasCaseStudy ? `/projects/${project.slug}` : project.link || `/projects/${project.slug}`}
                target={hasCaseStudy ? undefined : '_blank'}
                rel={hasCaseStudy ? undefined : 'noopener noreferrer'}
                onMouseEnter={() => {
                  preloadProject(project);
                  setHoveredIndex(globalIndex);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: Math.min(globalIndex * 0.08, 0.24) }}
                className={`group border-t border-neutral-200 lg:last:border-b py-10 sm:py-12 lg:py-8 flex flex-col gap-6 lg:gap-4 lg:transition-opacity lg:duration-300 ${
                  hoveredIndex !== null && hoveredIndex !== globalIndex ? 'lg:opacity-25' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6 min-w-0">
                    <h3 className="font-cinzel font-medium text-2xl sm:text-5xl md:text-6xl lg:text-7xl text-neutral-900 leading-[1.1]">
                      {project.name}
                    </h3>
                    {hasCaseStudy && !allHaveCaseStudy && (
                      <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 font-inter text-[10px] sm:text-xs tracking-widest uppercase text-neutral-600">
                        ✦ {lang === 'zh' ? '作品解析' : 'Case Study'}
                      </span>
                    )}
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="block font-inter text-xs sm:text-sm lg:text-base text-neutral-600">
                      {project.type}
                    </span>
                    <span className="block font-inter text-xs sm:text-sm lg:text-base text-neutral-600">
                      {project.role}
                    </span>
                  </div>
                </div>

                {project.tagline && (
                  <p className="sr-only">
                    {project.tagline}
                  </p>
                )}

                {/* Mobile inline thumbnail — always show image, no video.
                    The destination label is always visible here since touch
                    devices have no hover preview. */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-black/10 lg:hidden">
                  <Image
                    src={project.image}
                    alt={`${project.name} — ${project.type} by Carol Hsiao`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm font-inter text-[10px] font-medium tracking-widest uppercase text-neutral-900">
                    {destinationLabel(project, lang)}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              x: springX,
              y: springY,
            }}
            className="fixed top-0 left-0 z-50 pointer-events-none w-[450px] aspect-video rounded-xl overflow-hidden border border-black/10 shadow-2xl hidden lg:block"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                {(() => {
                  const project = allProjects[hoveredIndex]?.project;
                  if (!project) return null;
                  return (
                    <>
                      {project.video ? (
                        <VideoWithFallback
                          src={project.video}
                          fallbackImage={project.image}
                          alt={`${project.name} — ${project.type} by Carol Hsiao`}
                        />
                      ) : (
                        <Image
                          src={project.image}
                          alt={`${project.name} — ${project.type} by Carol Hsiao`}
                          fill
                          className="object-cover"
                          sizes="450px"
                          quality={90}
                        />
                      )}
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
