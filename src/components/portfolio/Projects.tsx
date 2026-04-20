import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { useTilt } from "@/hooks/useTilt";

interface Project {
  id: string;
  name: string;
  role: string;
  tag: string;
  short: string;
  long: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
}

const PROJECTS: Project[] = [
  {
    id: "tradeky",
    name: "TradeKy",
    role: "Founder & Lead Architect",
    tag: "INSTITUTIONAL // ALGO_EXECUTION",
    short:
      "Institutional-grade algorithmic execution platform with NLP-to-Python compilation.",
    long: [
      "Engineered a proprietary NLP-to-Python compiler that translates natural-language strategy into deterministic, backtest-ready execution code.",
      "Designed multi-threaded AngelOne API routing layer achieving sub-50ms execution under live market load.",
      "Architected the order-management state machine, risk gate, and post-trade reconciliation pipeline end-to-end.",
    ],
    stack: ["Python", "C++", "FastAPI", "NLP", "AngelOne API", "PostgreSQL"],
    metrics: [
      { label: "Exec Latency", value: "<50ms" },
      { label: "Threads", value: "Multi" },
      { label: "Compiler", value: "NLP→PY" },
    ],
  },
  {
    id: "kyte",
    name: "Kyte",
    role: "Founder & Full-Stack",
    tag: "MOBILITY // RIDE_HAILING",
    short:
      "Complete ride-hailing architecture with custom matching and sub-150ms geolocation.",
    long: [
      "Shipped end-to-end ride-hailing stack: rider app, driver app, dispatcher service, payment rails.",
      "Designed custom matching algorithms tuned for low-density supply markets.",
      "Hit sub-150ms geolocation queries across 500+ simulated nodes using spatial indexing.",
    ],
    stack: ["TypeScript", "React", "Node.js", "Express", "PostgreSQL", "Supabase"],
    metrics: [
      { label: "Geo Query", value: "<150ms" },
      { label: "Nodes", value: "500+" },
      { label: "Surface", value: "Full-stack" },
    ],
  },
  {
    id: "regulon",
    name: "Regulon",
    role: "Backend Architect",
    tag: "DATA // GOV_INTELLIGENCE",
    short:
      "Distributed extraction pipelines parsing unstructured government portals at scale.",
    long: [
      "Built distributed crawlers and parsers for fragmented, JS-heavy public-sector portals.",
      "Designed a normalized PostgreSQL schema on Supabase with row-level security and audit trails.",
      "Hardened the ingestion pipeline against rate limits, captchas, and schema drift.",
    ],
    stack: ["Python", "Pandas", "Supabase", "PostgreSQL", "RLS"],
    metrics: [
      { label: "Pipelines", value: "Distributed" },
      { label: "Auth", value: "RLS" },
      { label: "Scale", value: "Multi-portal" },
    ],
  },
];

const Projects = () => {
  const [open, setOpen] = useState<string | null>("tradeky");

  return (
    <section id="projects" className="relative py-24 md:py-32 px-6 bg-surface/30 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <SectionHeader index="02" eyebrow="Experience / The Proof" title="Built. Shipped. Compounding." />

        <div className="space-y-3">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              open={open === p.id}
              onToggle={() => setOpen(open === p.id ? null : p.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  open,
  onToggle,
  index,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
  index: number;
}) => {
  const tilt = useTilt(3);
  return (
    <div className="perspective-1200">
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className={`relative bg-background border transition-all duration-500 will-change-transform ${
          open ? "border-primary/40 cyan-glow" : "border-border hover:border-border-strong"
        }`}
        style={{
          background:
            "radial-gradient(circle at var(--mx,50%) var(--my,50%), hsl(var(--primary)/0.05), hsl(var(--background)) 60%)",
        }}
      >
        <button
          onClick={onToggle}
          className="w-full text-left p-6 md:p-8 grid grid-cols-12 gap-6 items-center"
        >
          <div className="col-span-1 hidden md:block">
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              0{index + 1}
            </span>
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase mb-2">
              {project.tag}
            </div>
            <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              {project.name}
              <span className="text-foreground/30 text-xl md:text-2xl font-light ml-3">
                / {project.role}
              </span>
            </h3>
            <p className="mt-3 text-muted-foreground max-w-2xl">{project.short}</p>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:justify-end">
            <span
              className={`font-mono text-xs uppercase tracking-widest border border-border-strong px-4 py-2 transition-colors ${
                open ? "bg-primary text-primary-foreground border-primary" : "text-foreground/70"
              }`}
            >
              {open ? "Collapse —" : "Expand +"}
            </span>
          </div>
        </button>

        <div
          className="grid transition-all duration-500"
          style={{
            gridTemplateRows: open ? "1fr" : "0fr",
          }}
        >
          <div className="overflow-hidden">
            <div className="px-6 md:px-8 pb-8 grid grid-cols-12 gap-6 border-t border-border pt-8">
              <div className="col-span-12 md:col-span-7 space-y-3">
                {project.long.map((line) => (
                  <p key={line} className="text-foreground/80 leading-relaxed">
                    <span className="text-primary mr-2 font-mono">{">"}</span>
                    {line}
                  </p>
                ))}
                <div className="flex flex-wrap gap-2 pt-3">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] uppercase tracking-widest border border-border px-2.5 py-1 text-foreground/70"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-12 md:col-span-5">
                <div className="grid grid-cols-3 gap-px bg-border border border-border">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="bg-background p-4">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-1">
                        {m.label}
                      </div>
                      <div className="font-display text-lg font-bold tabular-nums text-primary">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;