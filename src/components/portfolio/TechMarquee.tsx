import SectionHeader from "./SectionHeader";

const GROUPS: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["TypeScript", "Python", "C++", "JavaScript", "SQL"] },
  { label: "Backend & APIs", items: ["FastAPI", "Node.js", "Express", "REST", "Webhooks", "JWT"] },
  { label: "Data & Storage", items: ["PostgreSQL", "Supabase", "MongoDB", "Pandas", "NumPy"] },
  { label: "Product & Frontend", items: ["React", "TypeScript", "TanStack Query", "Vite", "Tailwind"] },
  { label: "Domain", items: ["AngelOne SmartAPI", "NLP / LLMs", "Algorithmic Execution", "Google Maps API"] },
];

const TechMarquee = () => (
  <section id="stack" className="relative py-24 md:py-32 px-6 md:px-8 bg-surface/50 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        index="04"
        eyebrow="Stack"
        title="The tools I reach for."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
        {GROUPS.map((g) => (
          <div key={g.label} className="grid grid-cols-12 gap-4 border-t border-border pt-6">
            <div className="col-span-12 md:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{g.label}</div>
            </div>
            <div className="col-span-12 md:col-span-8 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="bg-card border border-border px-3 py-1.5 text-[13px] text-foreground/80 hover:border-primary hover:text-primary transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TechMarquee;
