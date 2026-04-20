import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useScramble } from "@/hooks/useScramble";
import { useTilt } from "@/hooks/useTilt";
import ParticleNetwork from "./ParticleNetwork";
import { PROJECTS, type ProjectDossier } from "@/data/projects";

const ProjectLayout = ({ dossier }: { dossier: ProjectDossier }) => {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setArmed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const back = useScramble("← BACK_TO_TERMINAL", { trigger: armed, speed: 22, delay: 60 });
  const headerScramble = useScramble(dossier.header, { trigger: armed, speed: 30, delay: 220 });
  const tagScramble = useScramble(dossier.tag, { trigger: armed, speed: 18, delay: 100 });

  const next = PROJECTS[dossier.next];

  return (
    <div className="relative pt-24 pb-16">
      {/* Back dock */}
      <div className="fixed top-16 left-4 md:left-6 z-30">
        <Link
          to="/"
          className="inline-flex items-center gap-2 border border-border bg-background/80 backdrop-blur-md px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/80 hover:text-primary hover:border-primary hover:cyan-glow transition-all"
        >
          <ArrowLeft className="size-3" strokeWidth={2} />
          {back || "← BACK_TO_TERMINAL"}
        </Link>
      </div>

      {/* Hero band */}
      <section className="relative overflow-hidden border-b border-border grid-pattern">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <ParticleNetwork />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, transparent 0%, hsl(var(--background)) 85%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">
            HOME / PROJECTS / <span className="text-primary">{dossier.name.toUpperCase()}</span>
          </div>
          <div className="font-mono text-[10px] tracking-[0.35em] text-primary uppercase mb-6">
            DOSSIER {dossier.index} // {tagScramble || dossier.tag}
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-balance">
            {armed ? headerScramble : dossier.header}
          </h1>
          <div className="mt-6 inline-flex items-center gap-3 border border-border-strong px-4 py-2 bg-surface/60">
            <span className="size-1.5 bg-primary rounded-full animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/80">
              ROLE: <span className="text-primary">{dossier.role}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-12 gap-6 md:gap-10">
        {/* Left col */}
        <div className="col-span-12 lg:col-span-7 space-y-12">
          {/* The Problem */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              THE PROBLEM
            </div>
            <p className="font-mono text-sm md:text-base leading-relaxed text-foreground/80">
              <span className="text-primary mr-2">{">"}</span>
              {dossier.problem}
            </p>
          </div>

          {/* What I Built — terminal log */}
          <div className="relative bg-surface/40 border border-border-strong scanline">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface">
              <div className="flex gap-1.5">
                <span className="size-2 rounded-full bg-destructive/60" />
                <span className="size-2 rounded-full bg-terminal-amber/60" />
                <span className="size-2 rounded-full bg-terminal-green/60" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                ~/build_log — zsh
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {dossier.built.length} entries
              </span>
            </div>
            <div className="p-5 md:p-7 space-y-6">
              <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-2">
                $ cat what_i_built.log
              </div>
              {dossier.built.map((b, i) => (
                <BuildEntry key={i} index={i} verb={b.verb} body={b.body} />
              ))}
              <div className="font-mono text-[10px] text-foreground/40 pt-2 border-t border-border">
                <span className="text-primary">$</span> exit 0 — build complete
              </div>
            </div>
          </div>
        </div>

        {/* Right col — sticky */}
        <aside className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-6">
            {/* Stat block */}
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                CORE METRICS
              </div>
              <div className="grid grid-cols-2 gap-px bg-border border border-border">
                {dossier.stats.map((s) => (
                  <StatTile key={s.label} label={s.label} value={s.value} />
                ))}
              </div>
            </div>

            {/* Tech stack pixel grid */}
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                TECH STACK
              </div>
              <div className="flex flex-wrap gap-1.5">
                {dossier.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] border border-border bg-surface/40 px-3 py-2 text-foreground/75 hover:border-primary hover:text-primary transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            {dossier.link && (
              <a
                href={dossier.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 bg-primary text-primary-foreground px-5 py-4 font-mono text-xs uppercase tracking-[0.2em] font-bold cyan-glow-strong hover:bg-primary-glow transition-all"
              >
                <span>LIVE → {dossier.link.label}</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </aside>
      </section>

      {/* Next dossier */}
      <section className="relative border-t border-border bg-surface/20">
        <Link
          to={`/projects/${next.id}`}
          className="group block max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-12 gap-6 items-center hover:bg-surface/40 transition-colors"
        >
          <div className="col-span-12 md:col-span-3 font-mono text-[10px] tracking-[0.3em] text-primary uppercase">
            NEXT DOSSIER →
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-2">
              {next.tag}
            </div>
            <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tighter group-hover:text-primary transition-colors">
              {next.name}.
            </h3>
          </div>
          <div className="col-span-12 md:col-span-2 md:text-right font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60 group-hover:text-primary transition-colors">
            OPEN →
          </div>
        </Link>
      </section>
    </div>
  );
};

const BuildEntry = ({ index, verb, body }: { index: number; verb: string; body: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSeen(true),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const v = useScramble(verb, { trigger: seen, speed: 18 });
  return (
    <div ref={ref} className="grid grid-cols-[auto,1fr] gap-4 items-start">
      <span className="font-mono text-[10px] text-primary tabular-nums pt-1">
        [{String(index + 1).padStart(2, "0")}]
      </span>
      <p className="text-foreground/85 leading-relaxed text-[14px] md:text-[15px]">
        <span className="font-mono text-primary text-[11px] tracking-[0.2em] uppercase mr-2">
          {seen ? v : verb}
        </span>
        {body}
      </p>
    </div>
  );
};

const StatTile = ({ label, value }: { label: string; value: string }) => {
  const tilt = useTilt(4);
  return (
    <div className="perspective-1200">
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="bg-background p-4 md:p-5 hover:bg-surface transition-colors will-change-transform"
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
          {label}
        </div>
        <div className="font-display text-2xl md:text-3xl font-bold text-primary tabular-nums">
          {value}
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;