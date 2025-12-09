import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectsTable from "@/components/ProjectsTable";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SceneMoon from "@/components/SceneMoon";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <SceneMoon />
      <ProjectsTable />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
