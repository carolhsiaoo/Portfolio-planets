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

export default function Home() {
  const [pageReady, setPageReady] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden">
      <LoadingIntro onComplete={() => setPageReady(true)} />

      <div
        style={{
          visibility: pageReady ? 'visible' : 'hidden',
          opacity: pageReady ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Header />
        <FadeInSection>
          <Hero pageReady={pageReady} />
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
