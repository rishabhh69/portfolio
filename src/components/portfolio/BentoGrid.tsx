import SectionHeader from "./SectionHeader";

type Capability = {
  index: string;
  title: string;
  body: string;
};

const CAPS: Capability[] = [
  { index: "01", title: "Systems Architecture", body: "Designing multi-tenant, event-driven backends that survive contention, partial failure, and real load." },
  { index: "02", title: "Low-Latency Execution", body: "Sub-50ms order routing pipelines, broker integrations, and asynchronous choreography for capital-markets workloads." },
  { index: "03", title: "Backends & APIs", body: "Production REST and webhook APIs with hardened security middleware, JWT, and predictable error semantics." },
  { index: "04", title: "Data Pipelines", body: "Distributed extraction, scheduling, and parsing pipelines with custom retry, back-off, and audit guarantees." },
  { index: "05", title: "Algorithmic Trading", body: "NLP-to-Python compilation, paper-vs-live runtime parity, and execution analytics for Registered Investment Advisors." },
  { index: "06", title: "Full-Stack Product", body: "React + TypeScript SPAs with role-based access, typed server state, and an opinionated, recruiter-grade design language." },
];

const BentoGrid = () => (
  <section id="capabilities" className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        index="03"
        eyebrow="Capabilities"
        title="What I bring to an engineering team."
        kicker="A focused set of capabilities I've built and operated in production — not a list of buzzwords."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
        {CAPS.map((c) => (
          <article key={c.index} className="bg-card p-8 md:p-10 group hover:bg-background transition-colors">
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-mono text-[11px] text-primary tracking-[0.25em]">{c.index}</span>
              <span className="h-px flex-1 bg-gold/40 group-hover:bg-gold transition-colors" />
            </div>
            <h3 className="font-serif text-xl md:text-2xl text-foreground tracking-tight leading-snug">
              {c.title}
            </h3>
            <p className="mt-4 text-foreground/70 text-[15px] leading-relaxed">
              {c.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default BentoGrid;
