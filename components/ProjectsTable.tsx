'use client'

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';

export default function ProjectsTable() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Watch scroll position within the tall container to determine active project
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const sectionTop = -rect.top; // how far we've scrolled into the section
      const sectionHeight = el.offsetHeight - window.innerHeight;

      if (sectionTop < 0 || sectionTop > sectionHeight) return;

      const progress = sectionTop / sectionHeight; // 0 to 1
      const newIndex = Math.min(
        projects.length - 1,
        Math.floor(progress * projects.length)
      );

      setActiveIndex((prev) => {
        if (prev !== newIndex) {
          setDirection(newIndex > prev ? 1 : -1);
        }
        return newIndex;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const sectionHeight = el.offsetHeight - window.innerHeight;
    // Add half a segment offset so we land in the middle of each project's scroll range
    const targetScroll = el.offsetTop + ((index + 0.5) / projects.length) * sectionHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const project = projects[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="work"
      // Tall container: each project gets ~100vh of scroll runway
      style={{ height: `${projects.length * 100}vh` }}
      className="relative bg-[#faf8f5]"
    >
      {/* Sticky viewport — stays pinned while user scrolls through the tall section */}
      <div className="sticky top-0 h-screen flex flex-col lg:flex-row overflow-hidden">
        {/* Left panel — integrated list with inline details */}
        <div className="w-full lg:w-[45%] h-[40%] lg:h-full flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 bg-[#faf8f5] relative z-10">
          {/* Project list with expandable details */}
          <nav className="hidden lg:flex flex-col gap-2">
            {projects.map((p, i) => {
              const isActive = i === activeIndex;
              return (
                <div key={p.slug} className="border-b border-neutral-200/40 last:border-b-0">
                  <button
                    onClick={() => goTo(i)}
                    className={`w-full text-left cursor-pointer transition-all duration-300 py-3 ${
                      isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    {/* Collapsed: small inline row / Active: large title */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isActive ? 0 : 'auto',
                        opacity: isActive ? 0 : 1,
                      }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="flex items-baseline gap-3 overflow-hidden"
                    >
                      <span className="font-cinzel font-medium text-sm text-neutral-900">
                        {p.name}
                      </span>
                      <span className="font-inter text-xs text-neutral-900 tabular-nums">
                        {p.year} &middot; {p.type.toLowerCase()}
                      </span>
                    </motion.div>
                  </button>

                  {/* Expanded: big title + details */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? 'auto' : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5">
                      <span className="text-sm font-inter tracking-widest uppercase text-neutral-500 mb-3 block">
                        {p.year} &mdash; {p.type}
                      </span>
                      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-cinzel font-medium text-neutral-900 mb-2 leading-[1.1]">
                        {p.name}
                      </h3>
                      <span className="text-sm font-inter text-neutral-500 mb-4 block">{p.role}</span>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.tags?.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-inter px-3 py-1 rounded-full border border-neutral-300 text-neutral-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </nav>

          {/* Mobile: simplified view */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="text-sm font-inter tracking-widest uppercase text-neutral-400 mb-3 block">
                  {project.year} &mdash; {project.type}
                </span>
                <h3 className="text-3xl sm:text-4xl font-cinzel font-medium text-neutral-900 mb-3 leading-[1.1]">
                  {project.name}
                </h3>
                {project.tagline && (
                  <p className="text-sm font-inter text-neutral-500 leading-relaxed mb-4">
                    {project.tagline}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-2 mt-4 justify-center">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex ? 'w-8 h-2 bg-neutral-900' : 'w-2 h-2 bg-neutral-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right panel — media crossfade */}
        <div className="w-full lg:w-[55%] h-[60%] lg:h-full relative flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#faf8f5]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden"
            >
              {project.video && !project.video.endsWith('.gif') ? (
                <>
                  {project.videoMobile && (
                    <video
                      src={project.videoMobile}
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={project.image}
                      className="absolute inset-0 w-full h-full object-cover lg:hidden"
                    />
                  )}
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={project.image}
                    className={`absolute inset-0 w-full h-full object-cover ${project.videoMobile ? 'hidden lg:block' : ''}`}
                  />
                </>
              ) : project.video?.endsWith('.gif') ? (
                <>
                  {project.videoMobile && (
                    <video
                      src={project.videoMobile}
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={project.image}
                      className="absolute inset-0 w-full h-full object-cover lg:hidden"
                    />
                  )}
                  <Image
                    src={project.video}
                    alt={project.name}
                    fill
                    className={`object-cover ${project.videoMobile ? 'hidden lg:block' : ''}`}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    unoptimized
                  />
                </>
              ) : (
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  quality={95}
                  priority={activeIndex === 0}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
