import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectsTable from "@/components/ProjectsTable";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FadeInSection from "@/components/FadeInSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <FadeInSection delay={100}>
        <ProjectsTable />
      </FadeInSection>
      <FadeInSection delay={100}>
        <About />
      </FadeInSection>

      <FadeInSection delay={100}>
        <Footer />
      </FadeInSection>
    </div>
  );
}
