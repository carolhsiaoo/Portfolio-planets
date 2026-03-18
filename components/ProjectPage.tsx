'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectData, projects } from '@/data/projects';
import FadeInSection from '@/components/FadeInSection';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-medium mb-8 sm:mb-10 flex items-center gap-3">
      <span className="text-xl sm:text-2xl">✦</span>
      {children}
    </h2>
  );
}

function MediaDisplay({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');
  const isGif = src.endsWith('.gif');

  if (isVideo) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={`w-full rounded-2xl ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={800}
      className={`w-full rounded-2xl ${className}`}
      unoptimized={isGif}
    />
  );
}

function Sidebar({ sections, activeId }: { sections: { id: string; label: string }[]; activeId: string }) {
  return (
    <nav className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-30">
      <ul className="space-y-4">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`flex items-center gap-3 text-xs font-inter tracking-wider uppercase transition-all duration-300 ${
                activeId === section.id
                  ? 'text-black font-medium'
                  : 'text-gray-300 hover:text-gray-500'
              }`}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function ProjectPage({ project }: { project: ProjectData }) {
  const sections = useMemo(() => {
    const list: { id: string; label: string }[] = [
      { id: 'overview', label: 'Overview' },
    ];
    if (project.problem) list.push({ id: 'problem', label: 'Problem' });
    if (project.solution) list.push({ id: 'solution', label: 'Solution & Design' });
    if (project.implementation) list.push({ id: 'implementation', label: 'Implementation' });
    if (project.result) list.push({ id: 'result', label: 'Final Result' });
    if (project.reflection) list.push({ id: 'reflection', label: 'Reflection' });
    return list;
  }, [project]);

  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: '-20% 0px -60% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Static header for project pages */}
      <header className="w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Carol Hsiao Logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            />
          </Link>
          <nav className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            <Link href="/#work" className="text-sm sm:text-base md:text-lg font-inter font-medium tracking-wider hover:opacity-60 transition-all duration-500 text-black">
              PROJECTS
            </Link>
            <Link href="/#about" className="text-sm sm:text-base md:text-lg font-inter font-medium tracking-wider hover:opacity-60 transition-all duration-500 text-black">
              ABOUT
            </Link>
            <Link href="/#contact" className="text-sm sm:text-base md:text-lg font-inter font-medium tracking-wider hover:opacity-60 transition-all duration-500 text-black">
              CONTACT
            </Link>
          </nav>
        </div>
      </header>

      <Sidebar sections={sections} activeId={activeId} />

      {/* Section 1: Overview / Hero */}
      <section id="overview" className="pt-12 sm:pt-20 pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <FadeInSection>
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cinzel font-medium mb-4">
                {project.name}
              </h1>
              {project.tagline && (
                <p className="text-lg sm:text-xl md:text-2xl font-inter text-gray-600 max-w-3xl">
                  {project.tagline}
                </p>
              )}
            </div>

            {/* Meta info */}
            <div className="mb-12 sm:mb-16 bg-white rounded-2xl px-6 sm:px-8 py-8 sm:py-10">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <div className="py-2 sm:py-0 sm:flex-1 sm:pr-8">
                  <p className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase text-gray-400 mb-2">Role</p>
                  <p className="text-sm sm:text-base font-inter text-gray-900 leading-relaxed">{project.role}</p>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-gray-200 py-3 sm:py-0 sm:flex-1 sm:px-8 sm:self-stretch sm:flex sm:flex-col sm:justify-start">
                  <p className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase text-gray-400 mb-2 mt-2 sm:mt-0">Type</p>
                  <p className="text-sm sm:text-base font-inter text-gray-900">{project.type}</p>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-gray-200 py-3 sm:py-0 sm:flex-1 sm:px-8 sm:self-stretch sm:flex sm:flex-col sm:justify-start">
                  <p className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase text-gray-400 mb-2 mt-2 sm:mt-0">Timeline</p>
                  <p className="text-sm sm:text-base font-inter text-gray-900">{project.timeline || project.year}</p>
                </div>
                {project.techStack && (
                  <div className="border-t sm:border-t-0 sm:border-l border-gray-200 py-3 sm:py-0 sm:flex-1 sm:pl-8 sm:self-stretch sm:flex sm:flex-col sm:justify-start">
                    <p className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase text-gray-400 mb-2 mt-2 sm:mt-0">Stack</p>
                    <p className="text-sm sm:text-base font-inter text-gray-900">{project.techStack.join(' · ')}</p>
                  </div>
                )}
              </div>
            </div>
          </FadeInSection>

          {/* Hero media */}
          <FadeInSection delay={100}>
            <div className="rounded-2xl overflow-hidden">
              {project.video ? (
                <MediaDisplay src={project.video} alt={project.name} />
              ) : (
                <MediaDisplay src={project.image} alt={project.name} />
              )}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Section 2: The Problem */}
      {project.problem && (
        <section id="problem" className="py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>The Problem</SectionHeading>
              <div className="grid md:grid-cols-2 gap-10 sm:gap-16">
                <div>
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-4">Pain Points</h3>
                  <ul className="space-y-4">
                    {project.problem.painPoints.map((point, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-gray-300 mt-1 shrink-0">—</span>
                        <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{point}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-4">Goals</h3>
                  <ul className="space-y-4">
                    {project.problem.goals.map((goal, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-gray-300 mt-1 shrink-0">—</span>
                        <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{goal}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Section 3: Solution & Design */}
      {project.solution && (
        <section id="solution" className="py-16 sm:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>Solution & Design</SectionHeading>

              {project.solution.userFlow && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-3">User Flow</h3>
                  <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">
                    {project.solution.userFlow}
                  </p>
                </div>
              )}

              {project.solution.designSystem && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-3">Design System</h3>
                  <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">
                    {project.solution.designSystem}
                  </p>
                </div>
              )}

              {project.solution.keyScreens && project.solution.keyScreens.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-6">Key Screens</h3>
                  <div className="space-y-8">
                    {project.solution.keyScreens.map((screen, i) => (
                      <FadeInSection key={i} delay={i * 100}>
                        <figure>
                          <div className="rounded-2xl overflow-hidden bg-gray-100">
                            <MediaDisplay src={screen.src} alt={screen.caption} />
                          </div>
                          <figcaption className="mt-3 text-sm font-inter text-gray-500 text-center">
                            {screen.caption}
                          </figcaption>
                        </figure>
                      </FadeInSection>
                    ))}
                  </div>
                </div>
              )}
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Section 4: Implementation */}
      {project.implementation && (
        <section id="implementation" className="py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>Implementation</SectionHeading>

              {project.implementation.features && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-4">Core Features</h3>
                  <ul className="space-y-4">
                    {project.implementation.features.map((feature, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-gray-300 mt-1 shrink-0">—</span>
                        <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.implementation.challenges && project.implementation.challenges.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-6">Challenges & Solutions</h3>
                  <div className="space-y-8">
                    {project.implementation.challenges.map((challenge, i) => (
                      <div key={i} className="grid md:grid-cols-2 gap-6 p-6 sm:p-8 bg-white rounded-2xl border border-gray-100">
                        <div>
                          <p className="text-xs font-inter font-medium tracking-wider uppercase text-gray-400 mb-2">Challenge</p>
                          <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{challenge.problem}</p>
                        </div>
                        <div>
                          <p className="text-xs font-inter font-medium tracking-wider uppercase text-gray-400 mb-2">Solution</p>
                          <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{challenge.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.implementation.codeSnippet && (
                <div>
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-4">Code Highlight</h3>
                  <div className="rounded-2xl overflow-hidden bg-gray-900 p-6">
                    <pre className="text-sm text-gray-200 overflow-x-auto">
                      <code>{project.implementation.codeSnippet.code}</code>
                    </pre>
                  </div>
                  <p className="mt-3 text-sm font-inter text-gray-500 text-center">
                    {project.implementation.codeSnippet.caption}
                  </p>
                </div>
              )}
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Section 5: Final Result & Demo */}
      {project.result && (
        <section id="result" className="py-16 sm:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>Final Result</SectionHeading>

              {project.result.demoVideo && (
                <div className="mb-10 sm:mb-14 rounded-2xl overflow-hidden bg-gray-100">
                  <MediaDisplay src={project.result.demoVideo} alt={`${project.name} demo`} />
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {project.result.liveUrl && (
                  <a
                    href={project.result.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-inter font-medium hover:bg-gray-800 transition-colors duration-300"
                  >
                    Try It Live
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                {project.result.githubUrl && (
                  <a
                    href={project.result.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-sm font-inter font-medium hover:border-gray-500 transition-colors duration-300"
                  >
                    View on GitHub
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Section 6: Reflection */}
      {project.reflection && (
        <section id="reflection" className="py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>Reflection</SectionHeading>
              <div className="grid md:grid-cols-2 gap-10 sm:gap-16">
                {project.reflection.learnings && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-inter font-semibold mb-4">What I Learned</h3>
                    <ul className="space-y-4">
                      {project.reflection.learnings.map((learning, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-gray-300 mt-1 shrink-0">—</span>
                          <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{learning}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.reflection.improvements && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-inter font-semibold mb-4">What I'd Do Differently</h3>
                    <ul className="space-y-4">
                      {project.reflection.improvements.map((improvement, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-gray-300 mt-1 shrink-0">—</span>
                          <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{improvement}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Bottom navigation */}
      {(() => {
        const currentIndex = projects.findIndex((p) => p.slug === project.slug);
        const prev = projects[(currentIndex - 1 + projects.length) % projects.length];
        const next = projects[(currentIndex + 1) % projects.length];

        return (
          <section className="py-12 sm:py-16 border-t border-gray-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex items-center justify-between mb-10">
                <Link
                  href={`/projects/${prev.slug}`}
                  className="group flex items-center gap-3 hover:opacity-60 transition-opacity duration-300"
                >
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div>
                    <p className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase text-gray-400">Previous</p>
                    <p className="text-sm sm:text-base font-inter font-medium">{prev.name}</p>
                  </div>
                </Link>

                <Link
                  href={`/projects/${next.slug}`}
                  className="group flex items-center gap-3 text-right hover:opacity-60 transition-opacity duration-300"
                >
                  <div>
                    <p className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase text-gray-400">Next</p>
                    <p className="text-sm sm:text-base font-inter font-medium">{next.name}</p>
                  </div>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="text-center">
                <Link
                  href="/#work"
                  className="inline-flex items-center gap-2 text-sm font-inter font-medium hover:opacity-60 transition-opacity duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to all projects
                </Link>
              </div>
            </div>
          </section>
        );
      })()}
    </div>
  );
}
