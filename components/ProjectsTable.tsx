'use client'

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';

const ProjectsTable = memo(function ProjectsTable() {

  return (
    <section id="work" className="pt-[72px] sm:pt-[96px] md:pt-[120px] pb-12 sm:pb-16 md:pb-20 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Projects heading with stars */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-medium mb-16 flex items-center justify-center gap-4">
          <span className="text-3xl sm:text-4xl">✦</span>
          Projects
          <span className="text-3xl sm:text-4xl">✦</span>
        </h2>

        {/* Asymmetrical Exhibition Grid - matching Frame 13 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-6 lg:gap-x-16 lg:gap-y-16 lg:grid-flow-dense">
          {projects.map((project, index) => {
            // Define exact layout from Frame 13
            const gridLayout = {
              0: { span: "lg:col-span-12", aspect: "aspect-[4/5] lg:aspect-[5/2]" }, // FireFree - same as others on mobile/tablet, full width on large
              1: { span: "lg:col-span-4", aspect: "aspect-[4/5] lg:aspect-auto" }, // DailyPay - stretches to match CoreHour row height
              2: { span: "lg:col-span-8", aspect: "aspect-[4/5] lg:aspect-[8/5]" }, // CoreHour - defines row height
              3: { span: "lg:col-span-8", aspect: "aspect-[4/5] lg:aspect-[8/5]" }, // HandyTools - defines row height
              4: { span: "lg:col-span-4", aspect: "aspect-[4/5] lg:aspect-auto" }, // Cleaning Service - stretches to match HandyTools row height
            };

            const layout = gridLayout[index as keyof typeof gridLayout];

            return (
              <Link
                key={index}
                href={`/projects/${project.slug}`}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer block ${layout.span} ${layout.aspect}`}
              >
                {/* Media Container with text overlay */}
                <div className={`relative w-full h-full overflow-hidden bg-gray-200`}>
                  {project.video ? (
                    project.video.endsWith('.gif') ? (
                      <>
                        {/* Mobile video (if provided for GIF) */}
                        {project.videoMobile && (
                          <video
                            src={project.videoMobile}
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster={project.image}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 lg:hidden"
                          />
                        )}
                        {/* GIF for desktop */}
                        <Image
                          src={project.video}
                          alt={project.name}
                          fill
                          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${project.videoMobile ? 'hidden lg:block' : ''}`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized
                        />
                      </>
                    ) : (
                      <>
                        {/* Mobile video (shown on small screens) */}
                        {project.videoMobile && (
                          <video
                            src={project.videoMobile}
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster={project.image}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 lg:hidden"
                          />
                        )}
                        {/* Desktop video (shown on large screens, or always if no mobile video) */}
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          poster={project.image}
                          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${project.videoMobile ? 'hidden lg:block' : ''}`}
                        />
                      </>
                    )
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={95}
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Text overlay at bottom-left */}
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <div className="text-sm font-inter mb-2 opacity-90">{project.year}</div>
                    <h3 className="text-2xl font-inter font-medium mb-1">{project.name}</h3>
                    <div className="text-sm font-inter opacity-90">{project.type}</div>
                    <div className="text-sm font-inter opacity-90">{project.role}</div>
                  </div>

                  {/* Arrow icon at bottom-right */}
                  <div className="absolute bottom-0 right-0 p-6">
                    <svg
                      className="w-6 h-6 text-white opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default ProjectsTable;
