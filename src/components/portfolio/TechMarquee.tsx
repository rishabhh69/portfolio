import SectionHeader from "./SectionHeader";

const STACK = [
  "Python", "C++", "TypeScript", "FastAPI", "React", "Node.js",
  "Express", "Supabase", "PostgreSQL", "NLP", "LLMs", "Pandas", "NumPy",
];

const Row = ({ reverse = false }: { reverse?: boolean }) => (
  <div className="flex overflow-hidden mask-fade">
    <div
      className="flex shrink-0 gap-4 pr-4 marquee-track"
      style={{ animationDirection: reverse ? "reverse" : "normal" }}
    >
      {[...STACK, ...STACK].map((s, i) => (
        <div
          key={`${s}-${i}`}
          className="group shrink-0 border border-border bg-surface px-6 py-4 font-mono text-sm uppercase tracking-widest text-foreground/80 hover:text-primary hover:border-primary/40 transition-colors"
        >
          <span className="text-primary mr-2">::</span>
          {s}
        </div>
      ))}
    </div>
  </div>
);

const TechMarquee = () => {
  return (
    <section id="stack" className="relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader index="03" eyebrow="The Arsenal" title="Tools of the Trade." />
      </div>

      <div className="space-y-4">
        <Row />
        <Row reverse />
      </div>

      <style>{`
        .mask-fade {
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
      `}</style>
    </section>
  );
};

export default TechMarquee;