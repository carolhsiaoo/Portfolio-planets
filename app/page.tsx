'use client'

import { useState } from 'react';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProjectsTable from "@/components/ProjectsTable";
import About from "@/components/About";
import Footer from "@/components/Footer";
import FadeInSection from "@/components/FadeInSection";
import LoadingIntro from "@/components/LoadingIntro";
import { usePageTransition } from "@/components/PageTransition";

export default function Home() {
  const { hasNavigated } = usePageTransition();
  const [pageReady, setPageReady] = useState(hasNavigated);

  return (
    <div className="min-h-screen overflow-hidden">
      {!hasNavigated && <LoadingIntro onComplete={() => setPageReady(true)} />}

      <div
        style={{
          visibility: pageReady ? 'visible' : 'hidden',
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
