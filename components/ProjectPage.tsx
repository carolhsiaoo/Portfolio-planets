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
    if (project.discovery) list.push({ id: 'discovery', label: 'Discovery' });
    if (project.system) list.push({ id: 'system', label: 'System' });
    if (project.build) list.push({ id: 'build', label: 'Build' });
    if (project.validation) list.push({ id: 'validation', label: 'Validation' });
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

      {/* Module 0: Hero Section */}
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
              {/* Highlight tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-inter font-medium tracking-wider uppercase bg-white rounded-full text-gray-600 border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
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

          {/* 3-Card Summary: Problem / Solution / Outcome */}
          {project.heroSummary && (
            <FadeInSection delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 sm:mt-16">
                <div className="bg-white rounded-2xl p-6 sm:p-8">
                  <p className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase text-gray-400 mb-3">Problem</p>
                  <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{project.heroSummary.problem}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 sm:p-8">
                  <p className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase text-gray-400 mb-3">Solution</p>
                  <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{project.heroSummary.solution}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 sm:p-8">
                  <p className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase text-gray-400 mb-3">Outcome</p>
                  <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{project.heroSummary.outcome}</p>
                </div>
              </div>
            </FadeInSection>
          )}
        </div>
      </section>

      {/* Module 1: Discovery & Strategy */}
      {project.discovery && (
        <section id="discovery" className="py-16 sm:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>Discovery & Strategy</SectionHeading>

              {/* Insight cards */}
              {project.discovery.insights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 sm:mb-16">
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
              )}

              {/* HMW Statement */}
              {project.discovery.hmwStatement && (
                <div className="mb-12 sm:mb-16 bg-[#faf8f5] rounded-2xl p-8 sm:p-10">
                  <p className="text-xs font-inter font-medium tracking-wider uppercase text-gray-400 mb-4">How Might We</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-cinzel font-medium text-gray-800 leading-relaxed italic">
                    &ldquo;{project.discovery.hmwStatement}&rdquo;
                  </p>
                </div>
              )}

              {/* Description + Image */}
              {(project.discovery.description || project.discovery.image) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                  {project.discovery.description && (
                    <div>
                      <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">
                        {project.discovery.description}
                      </p>
                    </div>
                  )}
                  {project.discovery.image && (
                    <div className="rounded-2xl overflow-hidden">
                      <MediaDisplay src={project.discovery.image} alt={`${project.name} discovery`} />
                    </div>
                  )}
                </div>
              )}
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Module 2: The Brain & System */}
      {project.system && (
        <section id="system" className="py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>The Brain & System</SectionHeading>

              {/* User Flow */}
              {project.system.userFlow && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-3">User Flow</h3>
                  <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">
                    {project.system.userFlow}
                  </p>
                  {project.system.userFlowImage && (
                    <div className="mt-6 rounded-2xl overflow-hidden">
                      <MediaDisplay src={project.system.userFlowImage} alt={`${project.name} user flow`} />
                    </div>
                  )}
                </div>
              )}

              {/* Design System */}
              {project.system.designSystem && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-3">Design System</h3>
                  <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">
                    {project.system.designSystem}
                  </p>
                </div>
              )}

              {/* Design system images */}
              {project.system.designSystemImages && project.system.designSystemImages.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <div className="space-y-8">
                    {project.system.designSystemImages.map((img, i) => (
                      <FadeInSection key={i} delay={i * 100}>
                        <figure>
                          <div className="rounded-2xl overflow-hidden bg-gray-100">
                            <MediaDisplay src={img.src} alt={img.caption} />
                          </div>
                          <figcaption className="mt-3 text-sm font-inter text-gray-500 text-center">
                            {img.caption}
                          </figcaption>
                        </figure>
                      </FadeInSection>
                    ))}
                  </div>
                </div>
              )}

              {/* Accessibility Notes */}
              {project.system.accessibilityNotes && project.system.accessibilityNotes.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-4">Accessibility</h3>
                  <ul className="space-y-3">
                    {project.system.accessibilityNotes.map((note, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-gray-300 mt-1 shrink-0">—</span>
                        <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{note}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Module 3: The Build — Design-to-Code */}
      {project.build && (
        <section id="build" className="py-16 sm:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>The Build</SectionHeading>

              {/* Design-to-Code Comparisons */}
              {project.build.comparisons && project.build.comparisons.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-6">Design → Code</h3>
                  <div className="space-y-8">
                    {project.build.comparisons.map((comp, i) => (
                      <FadeInSection key={i} delay={i * 100}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs font-inter font-medium tracking-wider uppercase text-gray-400 mb-3">Figma</p>
                            <div className="rounded-2xl overflow-hidden bg-gray-100">
                              <MediaDisplay src={comp.figma} alt={`${comp.caption} — Figma`} />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-inter font-medium tracking-wider uppercase text-gray-400 mb-3">Code</p>
                            <div className="rounded-2xl overflow-hidden bg-gray-100">
                              <MediaDisplay src={comp.code} alt={`${comp.caption} — Code`} />
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-sm font-inter text-gray-500 text-center">{comp.caption}</p>
                      </FadeInSection>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Features */}
              {project.build.features && project.build.features.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-4">Core Features</h3>
                  <ul className="space-y-4">
                    {project.build.features.map((feature, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-gray-300 mt-1 shrink-0">—</span>
                        <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenges & Solutions */}
              {project.build.challenges && project.build.challenges.length > 0 && (
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

              {/* Code Snippets */}
              {project.build.codeSnippets && project.build.codeSnippets.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-4">Code Highlights</h3>
                  <div className="space-y-6">
                    {project.build.codeSnippets.map((snippet, i) => (
                      <div key={i}>
                        <div className="rounded-2xl overflow-hidden bg-gray-900 p-6">
                          <pre className="text-sm text-gray-200 overflow-x-auto">
                            <code>{snippet.code}</code>
                          </pre>
                        </div>
                        <p className="mt-3 text-sm font-inter text-gray-500 text-center">{snippet.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Workflow */}
              {project.build.aiWorkflow && (
                <div className="bg-[#faf8f5] rounded-2xl p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-3">AI-Assisted Workflow</h3>
                  <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{project.build.aiWorkflow}</p>
                </div>
              )}
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Module 4: Validation & Growth */}
      {project.validation && (
        <section id="validation" className="py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>Validation & Growth</SectionHeading>

              {/* Metrics Dashboard */}
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

              {/* Affinity Diagram */}
              {project.validation.affinityDiagram && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-6">Affinity Diagram</h3>
                  <div className="rounded-2xl overflow-hidden">
                    <MediaDisplay src={project.validation.affinityDiagram} alt={`${project.name} affinity diagram`} />
                  </div>
                </div>
              )}

              {/* Iterative Design: Before & After */}
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
                              <MediaDisplay src={iter.before} alt={`${iter.caption} — Before`} />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-inter font-medium tracking-wider uppercase text-gray-400 mb-3">After</p>
                            <div className="rounded-2xl overflow-hidden bg-white">
                              <MediaDisplay src={iter.after} alt={`${iter.caption} — After`} />
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-sm font-inter text-gray-500 text-center">{iter.caption}</p>
                      </FadeInSection>
                    ))}
                  </div>
                </div>
              )}

              {/* Marketing Results */}
              {project.validation.marketingResults && project.validation.marketingResults.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <h3 className="text-lg sm:text-xl font-inter font-semibold mb-4">Marketing Results</h3>
                  <ul className="space-y-3">
                    {project.validation.marketingResults.map((result, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-gray-300 mt-1 shrink-0">—</span>
                        <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{result}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Demo + Links */}
              {project.validation.demoVideo && (
                <div className="mb-10 sm:mb-14 rounded-2xl overflow-hidden bg-white">
                  <MediaDisplay src={project.validation.demoVideo} alt={`${project.name} demo`} />
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {project.validation.liveUrl && (
                  <a
                    href={project.validation.liveUrl}
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
                {project.validation.githubUrl && (
                  <a
                    href={project.validation.githubUrl}
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

      {/* Module 5: Reflection & Next Steps */}
      {project.reflection && (
        <section id="reflection" className="py-16 sm:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeInSection>
              <SectionHeading>Reflection & Next Steps</SectionHeading>
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
                {project.reflection.nextSteps && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-inter font-semibold mb-4">Next Steps</h3>
                    <ul className="space-y-4">
                      {project.reflection.nextSteps.map((step, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-gray-300 mt-1 shrink-0">—</span>
                          <p className="text-sm sm:text-base font-inter text-gray-700 leading-relaxed">{step}</p>
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
