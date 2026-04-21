import Hero from "@/components/portfolio/Hero";
import BentoGrid from "@/components/portfolio/BentoGrid";
import EarlyBaseline from "@/components/portfolio/EarlyBaseline";
import Projects from "@/components/portfolio/Projects";
import TechMarquee from "@/components/portfolio/TechMarquee";
import Contact from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <main>
      <Hero />
      <BentoGrid />
      <Projects />
      <EarlyBaseline />
      <TechMarquee />
      <Contact />
    </main>
  );
};

export default Index;
