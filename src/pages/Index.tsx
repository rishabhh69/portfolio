import StatusBar from "@/components/portfolio/StatusBar";
import Hero from "@/components/portfolio/Hero";
import BentoGrid from "@/components/portfolio/BentoGrid";
import Projects from "@/components/portfolio/Projects";
import TechMarquee from "@/components/portfolio/TechMarquee";
import Footer from "@/components/portfolio/Footer";
import MiniRishabhTerminal from "@/components/portfolio/MiniRishabhTerminal";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <StatusBar />
      <main>
        <Hero />
        <BentoGrid />
        <Projects />
        <TechMarquee />
      </main>
      <Footer />
      <MiniRishabhTerminal />
    </div>
  );
};

export default Index;
