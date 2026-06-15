import Hero from "@/components/portfolio/Hero";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Capabilities from "@/components/portfolio/BentoGrid";
import TechStack from "@/components/portfolio/TechMarquee";
import Contact from "@/components/portfolio/Contact";
import BackgroundFX from "@/components/portfolio/BackgroundFX";

const Index = () => (
  <main className="relative">
    <BackgroundFX />
    <Hero />
    <Projects />
    <Experience />
    <Capabilities />
    <TechStack />
    <Contact />
  </main>
);

export default Index;
