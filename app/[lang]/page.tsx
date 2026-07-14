'use client'

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FadeInSection from "@/components/FadeInSection";
import LoadingIntro from "@/components/LoadingIntro";
import { usePageTransition } from "@/components/PageTransition";

const ProjectsTable = dynamic(() => import("@/components/ProjectsTable"));
const Marquee = dynamic(() => import("@/components/Marquee"));
const About = dynamic(() => import("@/components/About"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  const { hasNavigated } = usePageTransition();
  const [pageReady, setPageReady] = useState(hasNavigated);

  return (
    <div className="min-h-screen overflow-hidden">
      {!hasNavigated && <LoadingIntro onComplete={() => setPageReady(true)} />}

      <div
        className="home-page-content"
        style={{
          opacity: pageReady ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Header />
        <FadeInSection>
          <Hero pageReady={pageReady} skipDelay={hasNavigated} />
        </FadeInSection>
        <ProjectsTable />
        <FadeInSection delay={100}>
          <Marquee />
        </FadeInSection>
        <FadeInSection delay={100} direction="bottom">
          <About />
        </FadeInSection>
        <FadeInSection delay={100} direction="bottom">
          <Footer />
        </FadeInSection>
      </div>
    </div>
  );
}
