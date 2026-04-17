'use client'

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { projects } from '@/data/projects';

export default function ProjectsTable() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Use motion values + spring for smooth trailing cursor effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseX.set(e.clientX - 150); // half of preview width (300/2)
      mouseY.set(e.clientY - 100); // half of preview height (200/2)
    },
    [mouseX, mouseY]
  );

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative bg-[#faf8f5] py-24 sm:py-32"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section label */}
        <span className="block font-inter text-xs tracking-widest uppercase text-neutral-400 mb-12">
          Selected Work
        </span>

        {/* Project rows */}
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group border-t border-neutral-200 last:border-b py-6 sm:py-8 flex items-center justify-between gap-4 transition-opacity duration-300"
              style={{
                opacity: hoveredIndex === null || hoveredIndex === i ? 1 : 0.25,
              }}
            >
              {/* Left — big title */}
              <h3 className="font-cinzel font-medium text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-neutral-900 leading-[1.1] transition-transform duration-300 group-hover:translate-x-3">
                {project.name}
              </h3>

              {/* Right — type + year */}
              <div className="shrink-0 text-right">
                <span className="block font-inter text-sm sm:text-base lg:text-lg text-neutral-500">
                  {project.type}
                </span>
                <span className="block font-inter text-sm sm:text-base lg:text-lg text-neutral-500 tabular-nums">
                  {project.year}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Cursor-following media preview */}
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
            className="fixed top-0 left-0 z-50 pointer-events-none w-[300px] h-[200px] rounded-xl overflow-hidden shadow-2xl hidden lg:block"
          >
            {(() => {
              const project = projects[hoveredIndex];
              if (project.video && !project.video.endsWith('.gif')) {
                return (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                );
              }
              if (project.video?.endsWith('.gif')) {
                return (
                  <Image
                    src={project.video}
                    alt={project.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                );
              }
              return (
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
