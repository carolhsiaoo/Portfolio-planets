'use client'

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { projects } from '@/data/projects';

// Build a flat list with inline category headers
type Row =
  | { kind: 'label'; label: string }
  | { kind: 'project'; project: (typeof projects)[number]; globalIndex: number };

function buildRows(): Row[] {
  const creative = projects.filter((p) => p.category === 'creative');
  const functional = projects.filter((p) => p.category === 'functional');
  const rows: Row[] = [];

  rows.push({ kind: 'label', label: 'Functional Products' });
  functional.forEach((p, i) => rows.push({ kind: 'project', project: p, globalIndex: i }));

  rows.push({ kind: 'label', label: 'Immersive Experiences' });
  creative.forEach((p, i) =>
    rows.push({ kind: 'project', project: p, globalIndex: functional.length + i })
  );

  return rows;
}

const rows = buildRows();
const allProjects = rows.filter((r): r is Extract<Row, { kind: 'project' }> => r.kind === 'project');

export default function ProjectsTable() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

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
      className="relative bg-[#faf8f5] py-24 sm:py-32"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col">
          {rows.map((row, i) => {
            if (row.kind === 'label') {
              return (
                <span
                  key={row.label}
                  className={`block font-inter text-xs tracking-widest uppercase text-neutral-400 ${
                    i === 0 ? 'mb-4' : 'mt-16 mb-4'
                  }`}
                >
                  {row.label}
                </span>
              );
            }

            const { project, globalIndex } = row;
            return (
              <a
                key={project.slug}
                href={project.link || `/projects/${project.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIndex(globalIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group border-t border-neutral-200 last:border-b py-6 sm:py-8 flex flex-col gap-4 lg:transition-opacity lg:duration-300 ${
                  hoveredIndex !== null && hoveredIndex !== globalIndex ? 'lg:opacity-25' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-4 w-full">
                  <h3 className="font-cinzel font-medium text-2xl sm:text-5xl md:text-6xl lg:text-7xl text-neutral-900 leading-[1.1]">
                    {project.name}
                  </h3>

                  <div className="shrink-0 text-right">
                    <span className="block font-inter text-xs sm:text-sm lg:text-base text-neutral-500">
                      {project.type}
                    </span>
                    <span className="block font-inter text-xs sm:text-sm lg:text-base text-neutral-500">
                      {project.role}
                    </span>
                  </div>
                </div>

                {/* Mobile inline thumbnail */}
                <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-lg overflow-hidden lg:hidden">
                  {project.video && !project.video.endsWith('.gif') ? (
                    <video
                      src={project.videoMobile || project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : project.video?.endsWith('.gif') ? (
                    <Image
                      src={project.video}
                      alt={project.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  )}
                </div>
              </a>
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
            className="fixed top-0 left-0 z-50 pointer-events-none w-[450px] h-[300px] rounded-xl overflow-hidden shadow-2xl hidden lg:block"
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
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
