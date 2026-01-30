'use client'

import { memo } from 'react';
import Image from 'next/image';

const ProjectsTable = memo(function ProjectsTable() {
  const projects = [
    {
      name: "FireFree",
      type: "Web & Mobile App",
      role: "Designer/Developer",
      year: "2025 ~ now",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=400&fit=crop",
      video: "/firefree-demo.mp4",
      videoMobile: "/firefre-demo-small.mp4",
      link: "https://firefree.app",
    },
    {
      name: "DailyPay",
      type: "Mobile App",
      role: "Designer/Developer",
      year: "2026",
      image: "/dailypay-img.png",
      link: "https://dailypay.aburi.app",
    },
    {
      name: "CoreHour",
      type: "Web",
      role: "Designer/Developer",
      year: "2025",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      video: "/corehour-demo.gif",
      videoMobile: "/corehour-demo-small.mp4",
      link: "https://corehour.app/",
    },
    {
      name: "HandyTools",
      type: "ARVR",
      role: "Designer/Developer",
      year: "2024",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=600&h=700&fit=crop",
      video: "/handytools-demo.mp4",
    },
    {
      name: "Cleaning Service Platform",
      type: "Web",
      role: "UI/UX Designer",
      year: "2023",
      image: "/cleaingserviceplatform-img.png",
    },
  ];

  return (
    <section id="work" className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Projects heading with stars */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-medium mb-16 flex items-center justify-center gap-4">
          <span className="text-3xl sm:text-4xl">✦</span>
          Projects
          <span className="text-3xl sm:text-4xl">✦</span>
        </h2>

        {/* Asymmetrical Exhibition Grid - matching Frame 13 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6 lg:grid-flow-dense">
          {projects.map((project, index) => {
            // Define exact layout from Frame 13
            const gridLayout = {
              0: { span: "lg:col-span-12", aspect: "aspect-[4/5] lg:aspect-[5/2]" }, // FireFree - same as others on mobile/tablet, full width on large
              1: { span: "lg:col-span-4", aspect: "aspect-[4/5] lg:aspect-[4/5.16]" }, // DailyPay - same height as CoreHour on large screens
              2: { span: "lg:col-span-8", aspect: "aspect-[4/5] lg:aspect-[8/5]" }, // CoreHour - same as others on mobile/tablet, taller on large
              3: { span: "lg:col-span-8", aspect: "aspect-[4/5] lg:aspect-[8/5]" }, // HandyTools - same as others on mobile/tablet
              4: { span: "lg:col-span-4", aspect: "aspect-[4/5] lg:aspect-[4/5.17]" }, // Cleaning Service - consistent 4:5 ratio
            };

            const layout = gridLayout[index as keyof typeof gridLayout];

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl ${project.link ? 'cursor-pointer' : ''} ${layout.span} ${layout.aspect}`}
                onClick={() => {
                  if (project.link) {
                    window.open(project.link, '_blank', 'noopener,noreferrer');
                  }
                }}
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

                  {/* Open icon at bottom-right for projects with links */}
                  {project.link && (
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default ProjectsTable;
