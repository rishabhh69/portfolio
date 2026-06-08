import SectionHeader from "./SectionHeader";

type Item = {
  era: string;
  role: string;
  org: string;
  body: string;
  href?: string;
  current?: boolean;
};

const ITEMS: Item[] = [
  {
    era: "Jun 2026 — Present",
    role: "Software Development Intern",
    org: "InternPe",
    body: "Shipping production features across the stack. Owning components end-to-end — from API design to delivered UI — within a fast-moving engineering team.",
    current: true,
  },
  {
    era: "2025 — Present",
    role: "Founder & Lead Architect",
    org: "TradeKy",
    href: "https://tradeky.in",
    body: "Architected an NLP-to-Python compilation engine and multi-tenant routing pipeline for Registered Investment Advisors. Sub-50ms execution across hundreds of client accounts via the AngelOne SmartAPI.",
  },
  {
    era: "2025",
    role: "Backend & Systems Architect",
    org: "Sannidh",
    href: "https://www.sannidh.in",
    body: "Built a regulatory-intelligence platform — distributed extraction pipelines across 7 government portals, 40+ hardened REST endpoints, and role-based access for 5 user personas.",
  },
  {
    era: "2024 — Present",
    role: "B.Tech, Computer Science",
    org: "Jaypee Institute of Information Technology (JIIT)",
    body: "Coursework in systems, algorithms, distributed computing, and applied machine learning. Active open-source contributor alongside coursework.",
  },
];

const Experience = () => (
  <section id="experience" className="relative py-24 md:py-32 px-6 md:px-8 bg-surface/50 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        index="02"
        eyebrow="Experience"
        title="A short, deliberate track record."
      />

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-3 hidden lg:block">
          <div className="sticky top-28 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <div className="gold-rule w-10 mb-4" />
            Roles · Education ·<br />Founding work
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9 divide-y divide-border border-t border-border">
          {ITEMS.map((item, i) => (
            <article key={i} className="grid grid-cols-12 gap-6 py-8 md:py-10 group">
              <div className="col-span-12 md:col-span-3">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {item.era}
                </div>
                {item.current && (
                  <div className="inline-flex items-center gap-1.5 mt-2 text-[10px] uppercase tracking-[0.2em] text-primary font-mono">
                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                    Current
                  </div>
                )}
              </div>
              <div className="col-span-12 md:col-span-9">
                <h3 className="font-serif text-xl md:text-2xl text-foreground tracking-tight">
                  {item.role}{" "}
                  <span className="text-muted-foreground italic font-normal">— </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-glow transition-colors"
                    >
                      {item.org} <span className="text-gold text-base">↗</span>
                    </a>
                  ) : (
                    <span className="text-foreground/80">{item.org}</span>
                  )}
                </h3>
                <p className="mt-3 text-foreground/75 leading-relaxed max-w-2xl">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;