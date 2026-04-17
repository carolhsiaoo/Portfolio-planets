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
      { id: 'hero', label: 'Overview' },
    ];
    if (project.heroSummary) list.push({ id: 'tldr', label: 'TL;DR' });
    if (project.challenge) list.push({ id: 'challenge', label: 'Challenge' });
    if (project.solutionSection) list.push({ id: 'solution', label: 'Solution' });
    if (project.process) list.push({ id: 'process', label: 'Process' });
    if (project.discovery || project.system || project.build) list.push({ id: 'design-build', label: 'Design & Build' });
    if (project.validation) list.push({ id: 'results', label: 'Results' });
    if (project.reflection?.learnings) list.push({ id: 'reflections', label: 'Reflections' });
    if (project.reflection?.nextSteps) list.push({ id: 'next-steps', label: 'Next Steps' });
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
          if (entry.isIntersecting) setActiveId(id);
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
      {/* Header */}
      <header className="w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Carol Hsiao Logo" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </Link>
          <nav className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            <Link href="/#work" className="text-sm sm:text-base md:text-lg font-inter font-medium tracking-wider hover:opacity-60 transition-all duration-500 text-black">PROJECTS</Link>
            <Link href="/#about" className="text-sm sm:text-base md:text-lg font-inter font-medium tracking-wider hover:opacity-60 transition-all duration-500 text-black">ABOUT</Link>
            <Link href="/#contact" className="text-sm sm:text-base md:text-lg font-inter font-medium tracking-wider hover:opacity-60 transition-all duration-500 text-black">CONTACT</Link>
          </nav>
        </div>
      </header>

      <Sidebar sections={sections} activeId={activeId} />

      {/* Hero Section — Overview / Company / Role + Screen Recording */}
      <section id="hero" className="pt-12 sm:pt-20 pb-12 sm:pb-16">
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
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-inter font-medium tracking-wider uppercase bg-white rounded-full text-gray-600 border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Meta: Company / Role / Type / Timeline */}
            <div className="mb-12 sm:mb-16 bg-white rounded-2xl px-6 sm:px-8 py-8 sm:py-10">
              <div className="flex flex-col sm:flex-row sm:items-start">
                {project.company && (
                  <div className="py-2 sm:py-0 sm:flex-1 sm:pr-8 sm:self-stretch sm:flex sm:flex-col sm:justify-start">
                    <p className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase text-gray-400 mb-2">Company</p>
                    <p className="text-sm sm:text-base font-inter text-gray-900">{project.company}</p>
                  </div>
                )}
                <div className={`${project.company ? 'border-t sm:border-t-0 sm:border-l border-gray-200 py-3 sm:py-0 sm:px-8' : 'py-2 sm:py-0 sm:pr-8'} sm:flex-1 sm:self-stretch sm:flex sm:flex-col sm:justify-start`}>
                  <p className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase text-gray-400 mb-2 mt-2 sm:mt-0">Role</p>
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
              </div>
            </div>
          </FadeInSection>

          {/* Quick links */}
          {(project.validation?.liveUrl || project.link) && (
            <div className="flex flex-wrap gap-3 mb-12 sm:mb-16">
              <a href={project.validation?.liveUrl || project.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-inter font-medium hover:bg-gray-800 transition-colors duration-300">
                Try It Live
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}

          {/* Screen recording / hero media */}
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

      {/* TL;DR — Problem / Solution / Results */}
      {project.heroSummary && (
        <section id="tldr" className="py-16 sm:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>TL;DR</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#faf8f5] rounded-2xl p-6 sm:p-8">
                  <p className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase text-gray-400 mb-3">Problem</p>
                  <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{project.heroSummary.problem}</p>
                </div>
                <div className="bg-[#faf8f5] rounded-2xl p-6 sm:p-8">
                  <p className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase text-gray-400 mb-3">Solution</p>
                  <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{project.heroSummary.solution}</p>
                </div>
                <div className="bg-[#faf8f5] rounded-2xl p-6 sm:p-8">
                  <p className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase text-gray-400 mb-3">Results</p>
                  <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{project.heroSummary.results}</p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Challenge */}
      {project.challenge && (
        <section id="challenge" className="py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>Challenge</SectionHeading>
              <div className={project.challenge.image ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center' : ''}>
                <p className="text-sm sm:text-base md:text-lg font-inter text-gray-700 leading-relaxed">
                  {project.challenge.description}
                </p>
                {project.challenge.image && (
                  <div className="rounded-2xl overflow-hidden">
                    <MediaDisplay src={project.challenge.image} alt={`${project.name} challenge`} />
                  </div>
                )}
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Solution */}
      {project.solutionSection && (
        <section id="solution" className="py-16 sm:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>Solution</SectionHeading>
              <div className={project.solutionSection.image ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center' : ''}>
                <p className="text-sm sm:text-base md:text-lg font-inter text-gray-700 leading-relaxed">
                  {project.solutionSection.description}
                </p>
                {project.solutionSection.image && (
                  <div className="rounded-2xl overflow-hidden">
                    <MediaDisplay src={project.solutionSection.image} alt={`${project.name} solution`} />
                  </div>
                )}
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Process — Timeline */}
      {project.process && (
        <section id="process" className="py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>Process</SectionHeading>

              {/* Desktop: horizontal timeline */}
              <div className="hidden md:flex items-start mb-12 sm:mb-16">
                {project.process!.steps.map((step, i) => (
                  <div key={i} className="flex items-start flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0 mb-3">
                        <span className="text-white text-xs font-inter font-medium">{i + 1}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-inter font-medium text-center leading-tight px-2">{step.label}</p>
                      {step.description && (
                        <p className="text-xs font-inter text-gray-500 text-center mt-2 px-2 leading-relaxed">{step.description}</p>
                      )}
                    </div>
                    {i < project.process!.steps.length - 1 && (
                      <div className="flex items-center pt-4 shrink-0">
                        <div className="w-8 h-px bg-gray-300" />
                        <svg className="w-3 h-3 text-gray-300 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile: vertical timeline */}
              <div className="md:hidden space-y-0 mb-12">
                {project.process!.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
                        <span className="text-white text-xs font-inter font-medium">{i + 1}</span>
                      </div>
                      {i < project.process!.steps.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 my-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="text-sm font-inter font-medium mb-1 pt-1">{step.label}</p>
                      {step.description && (
                        <p className="text-xs font-inter text-gray-500 leading-relaxed">{step.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {project.process!.image && (
                <div className="rounded-2xl overflow-hidden">
                  <MediaDisplay src={project.process!.image} alt={`${project.name} process`} />
                </div>
              )}
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Design + Research + Build */}
      {(project.discovery || project.system || project.build) && (
        <section id="design-build" className="py-16 sm:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>Design + Research + Build</SectionHeading>

              {/* Discovery insights */}
              {project.discovery && project.discovery.insights.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-6">Discovery Insights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {project.discovery.insights.map((insight, i) => (
                      <FadeInSection key={i} delay={i * 100}>
                        <div className="bg-[#faf8f5] rounded-2xl p-6 sm:p-8 h-full">
                          <p className="text-xs font-inter font-medium tracking-wider uppercase text-gray-400 mb-3">Insight {i + 1}</p>
                          <h4 className="text-base sm:text-lg font-inter font-semibold mb-2">{insight.title}</h4>
                          <p className="text-sm font-inter text-gray-600 leading-relaxed">{insight.description}</p>
                        </div>
                      </FadeInSection>
                    ))}
                  </div>
                </div>
              )}

              {/* HMW statement */}
              {project.discovery?.hmwStatement && (
                <div className="mb-12 sm:mb-16 bg-[#faf8f5] rounded-2xl p-8 sm:p-10">
                  <p className="text-xs font-inter font-medium tracking-wider uppercase text-gray-400 mb-4">How Might We</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-cinzel font-medium text-gray-800 leading-relaxed italic">
                    &ldquo;{project.discovery.hmwStatement}&rdquo;
                  </p>
                </div>
              )}

              {/* Discovery description + image */}
              {(project.discovery?.description || project.discovery?.image) && (
                <div className="mb-12 sm:mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                  {project.discovery?.description && (
                    <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">
                      {project.discovery.description}
                    </p>
                  )}
                  {project.discovery?.image && (
                    <div className="rounded-2xl overflow-hidden">
                      <MediaDisplay src={project.discovery.image} alt={`${project.name} discovery`} />
                    </div>
                  )}
                </div>
              )}

              {/* User Flow */}
              {project.system?.userFlow && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-3">User Flow</h3>
                  <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{project.system.userFlow}</p>
                  {project.system.userFlowImage && (
                    <div className="mt-6 rounded-2xl overflow-hidden">
                      <MediaDisplay src={project.system.userFlowImage} alt={`${project.name} user flow`} />
                    </div>
                  )}
                </div>
              )}

              {/* Design System */}
              {project.system?.designSystem && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-3">Design System</h3>
                  <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{project.system.designSystem}</p>
                </div>
              )}

              {project.system?.designSystemImages && project.system.designSystemImages.length > 0 && (
                <div className="mb-12 sm:mb-16 space-y-8">
                  {project.system.designSystemImages.map((img, i) => (
                    <FadeInSection key={i} delay={i * 100}>
                      <figure>
                        <div className="rounded-2xl overflow-hidden bg-gray-100">
                          <MediaDisplay src={img.src} alt={img.caption} />
                        </div>
                        <figcaption className="mt-3 text-sm font-inter text-gray-500 text-center">{img.caption}</figcaption>
                      </figure>
                    </FadeInSection>
                  ))}
                </div>
              )}

              {/* Accessibility */}
              {project.system?.accessibilityNotes && project.system.accessibilityNotes.length > 0 && (
                <div className="mb-12 sm:mb-16 bg-[#faf8f5] rounded-2xl p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-4">Accessibility</h3>
                  <ul className="space-y-3">
                    {project.system.accessibilityNotes.map((note, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-gray-300 mt-1 shrink-0">&#x2022;</span>
                        <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{note}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Build: Design → Code comparisons */}
              {project.build?.comparisons && project.build.comparisons.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-6">Design → Code</h3>
                  <div className="space-y-8">
                    {project.build.comparisons.map((comp, i) => (
                      <FadeInSection key={i} delay={i * 100}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs font-inter font-medium tracking-wider uppercase text-gray-400 mb-3">Figma</p>
                            <div className="rounded-2xl overflow-hidden bg-gray-100">
                              <MediaDisplay src={comp.figma} alt={`${comp.caption}, Figma`} />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-inter font-medium tracking-wider uppercase text-gray-400 mb-3">Code</p>
                            <div className="rounded-2xl overflow-hidden bg-gray-100">
                              <MediaDisplay src={comp.code} alt={`${comp.caption}, Code`} />
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-sm font-inter text-gray-500 text-center">{comp.caption}</p>
                      </FadeInSection>
                    ))}
                  </div>
                </div>
              )}

              {/* Build: Core features */}
              {project.build?.features && project.build.features.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-4">Core Features</h3>
                  <ul className="space-y-4">
                    {project.build.features.map((feature, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-gray-300 mt-1 shrink-0">&#x2022;</span>
                        <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Build: Challenges & Solutions */}
              {project.build?.challenges && project.build.challenges.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-6">Challenges & Solutions</h3>
                  <div className="space-y-8">
                    {project.build.challenges.map((challenge, i) => (
                      <div key={i} className="grid md:grid-cols-2 gap-6 p-6 sm:p-8 bg-[#faf8f5] rounded-2xl">
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

              {/* Build: Code snippets */}
              {project.build?.codeSnippets && project.build.codeSnippets.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-4">Code Highlights</h3>
                  <div className="space-y-6">
                    {project.build.codeSnippets.map((snippet, i) => (
                      <div key={i}>
                        <div className="rounded-2xl overflow-hidden bg-gray-900 p-6">
                          <pre className="text-sm text-gray-200 overflow-x-auto"><code>{snippet.code}</code></pre>
                        </div>
                        <p className="mt-3 text-sm font-inter text-gray-500 text-center">{snippet.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Build: AI Workflow */}
              {project.build?.aiWorkflow && (
                <div className="bg-[#faf8f5] rounded-2xl p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-3">AI-Assisted Workflow</h3>
                  <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{project.build.aiWorkflow}</p>
                </div>
              )}
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Results */}
      {project.validation && (
        <section id="results" className="py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>Results</SectionHeading>

              {project.validation.metrics && project.validation.metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 sm:mb-16">
                  {project.validation.metrics.map((metric, i) => (
                    <FadeInSection key={i} delay={i * 100}>
                      <div className="bg-white rounded-2xl p-6 sm:p-8 text-center">
                        <p className="text-3xl sm:text-4xl font-cinzel font-medium mb-2">{metric.value}</p>
                        <p className="text-sm font-inter font-semibold uppercase tracking-wider text-gray-800 mb-1">{metric.label}</p>
                        {metric.description && (
                          <p className="text-xs font-inter text-gray-500">{metric.description}</p>
                        )}
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              )}

              {project.validation.affinityDiagram && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-6">Affinity Diagram</h3>
                  <div className="rounded-2xl overflow-hidden">
                    <MediaDisplay src={project.validation.affinityDiagram} alt={`${project.name} affinity diagram`} />
                  </div>
                </div>
              )}

              {project.validation.iterations && project.validation.iterations.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-6">Iterative Design</h3>
                  <div className="space-y-8">
                    {project.validation.iterations.map((iter, i) => (
                      <FadeInSection key={i} delay={i * 100}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs font-inter font-medium tracking-wider uppercase text-gray-400 mb-3">Before</p>
                            <div className="rounded-2xl overflow-hidden bg-white">
                              <MediaDisplay src={iter.before} alt={`${iter.caption}, Before`} />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-inter font-medium tracking-wider uppercase text-gray-400 mb-3">After</p>
                            <div className="rounded-2xl overflow-hidden bg-white">
                              <MediaDisplay src={iter.after} alt={`${iter.caption}, After`} />
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-sm font-inter text-gray-500 text-center">{iter.caption}</p>
                      </FadeInSection>
                    ))}
                  </div>
                </div>
              )}

              {project.validation.marketingResults && project.validation.marketingResults.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <ul className="space-y-3">
                    {project.validation.marketingResults.map((result, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-gray-300 mt-1 shrink-0">&#x2022;</span>
                        <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{result}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.validation.demoVideo && (
                <div className="mb-10 sm:mb-14 rounded-2xl overflow-hidden bg-white">
                  <MediaDisplay src={project.validation.demoVideo} alt={`${project.name} demo`} />
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {project.validation.liveUrl && (
                  <a href={project.validation.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-inter font-medium hover:bg-gray-800 transition-colors duration-300">
                    Try It Live
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                {project.validation.githubUrl && (
                  <a href={project.validation.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-sm font-inter font-medium hover:border-gray-500 transition-colors duration-300">
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

      {/* Reflections */}
      {project.reflection?.learnings && (
        <section id="reflections" className="py-16 sm:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>Reflections</SectionHeading>
              <ul className="space-y-4">
                {project.reflection.learnings.map((learning, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-gray-300 mt-1 shrink-0">&#x2022;</span>
                    <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{learning}</p>
                  </li>
                ))}
              </ul>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Next Steps */}
      {project.reflection?.nextSteps && (
        <section id="next-steps" className="py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>Next Steps</SectionHeading>
              <ul className="space-y-4">
                {project.reflection.nextSteps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-gray-300 mt-1 shrink-0">&#x2022;</span>
                    <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ul>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <FadeInSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-medium mb-4">
              Have a similar idea?
            </h2>
            <p className="text-sm sm:text-base font-inter text-gray-600 mb-8">
              I'd love to help you build it.
            </p>
            <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full text-sm font-inter font-medium hover:bg-gray-800 transition-colors duration-300">
              Get in Touch
            </a>
          </FadeInSection>
        </div>
      </section>

      {/* Bottom navigation */}
      {(() => {
        const currentIndex = projects.findIndex((p) => p.slug === project.slug);
        const prev = projects[(currentIndex - 1 + projects.length) % projects.length];
        const next = projects[(currentIndex + 1) % projects.length];

        return (
          <section className="py-12 sm:py-16 border-t border-gray-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex items-center justify-between mb-10">
                <Link href={`/projects/${prev.slug}`} className="group flex items-center gap-3 hover:opacity-60 transition-opacity duration-300">
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div>
                    <p className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase text-gray-400">Previous</p>
                    <p className="text-sm sm:text-base font-inter font-medium">{prev.name}</p>
                  </div>
                </Link>

                <Link href={`/projects/${next.slug}`} className="group flex items-center gap-3 text-right hover:opacity-60 transition-opacity duration-300">
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
                <Link href="/#work" className="inline-flex items-center gap-2 text-sm font-inter font-medium hover:opacity-60 transition-opacity duration-300">
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
