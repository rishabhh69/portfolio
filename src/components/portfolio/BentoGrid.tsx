import SectionHeader from "./SectionHeader";
import { useTilt } from "@/hooks/useTilt";
import { useEffect, useRef, useState, type ReactNode } from "react";

const TiltCard = ({
  className = "",
  children,
  index,
}: {
  className?: string;
  children: ReactNode;
  index: number;
}) => {
  const tilt = useTilt(6);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`perspective-1200 ${className}`}
      style={{
        transitionDelay: `${index * 70}ms`,
        transform: shown ? "translateY(0)" : "translateY(40px)",
        opacity: shown ? 1 : 0,
        transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="group relative h-full bg-surface border border-border p-6 md:p-7 transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:cyan-glow preserve-3d will-change-transform"
        style={{
          background:
            "radial-gradient(circle at var(--mx,50%) var(--my,50%), hsl(var(--primary)/0.08), hsl(var(--surface)) 60%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const Label = ({ tag }: { tag: string }) => (
  <div className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase mb-3">
    {tag}
  </div>
);

const BentoGrid = () => {
  return (
    <section id="grit" className="relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader index="01" eyebrow="About / The Grit" title="The Operator." />

        <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[minmax(180px,auto)] gap-3 md:gap-4">
          {/* Box 1 — Academics */}
          <TiltCard index={0} className="md:col-span-3 md:row-span-2">
            <Label tag="01 · Open Source" />
            <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              <span className="text-primary tabular-nums">200+</span>{" "}
              GitHub contributions.
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Active open-source contributor — shipping commits, reviewing PRs,
              and maintaining infra across personal and collaborative repos.
              Running a full CS curriculum at{" "}
              <span className="text-foreground">JIIT</span> as a background
              process while building startups in the foreground.
            </p>
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>200+ COMMITS</span>
              <span>CSE · JIIT</span>
            </div>
          </TiltCard>

          {/* Box 2 — Strategy */}
          <TiltCard index={1} className="md:col-span-3">
            <Label tag="02 · Strategy" />
            <div className="flex items-end gap-4">
              <div className="font-display text-6xl md:text-7xl font-bold text-primary tabular-nums leading-none">
                1420
              </div>
              <div className="font-mono text-xs text-muted-foreground pb-2">+ ELO</div>
            </div>
            <p className="mt-4 text-muted-foreground">
              Chess at a national-rated level. Thinking 5 moves ahead in
              architecture, markets, and conversations.
            </p>
          </TiltCard>

          {/* Box 5 — Awards */}
          <TiltCard index={2} className="md:col-span-3">
            <Label tag="03 · Recognition" />
            <h3 className="font-display text-2xl font-bold tracking-tight mb-2">
              Podium @ Startup Showdown
            </h3>
            <p className="text-muted-foreground text-sm">
              Top 3 of 100+ teams. Top performer in{" "}
              <span className="text-foreground">Execute 25.1</span> algorithmic
              competition.
            </p>
            <div className="mt-5 flex gap-2 font-mono text-[10px] uppercase tracking-widest">
              <span className="border border-border px-2 py-1 text-foreground/70">TOP 3 / 100+</span>
              <span className="border border-primary/40 text-primary px-2 py-1">ALGO WINNER</span>
            </div>
          </TiltCard>

          {/* Box 3 — Hardware */}
          <TiltCard index={3} className="md:col-span-2">
            <Label tag="04 · Hardware" />
            <h3 className="font-display text-xl font-bold tracking-tight mb-2">
              UAV Calibrator
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Built and calibrated physics-based flight control systems for
              Unmanned Aerial Vehicles. Bits to atoms, atoms to flight.
            </p>
          </TiltCard>

          {/* Process */}
          <TiltCard index={4} className="md:col-span-4">
            <Label tag="05 · Process" />
            <div className="flex flex-col h-full">
              <div className="font-mono text-[11px] leading-relaxed space-y-1 text-foreground/70">
                <div><span className="text-primary">$</span> profile --target hot_path</div>
                <div><span className="text-primary">$</span> optimize --latency p99</div>
                <div><span className="text-primary">$</span> ship --features daily</div>
                <div><span className="text-primary">$</span> measure --metric execution_edge</div>
              </div>
              <a
                href="/Rishabh_s_resume.pdf"
                download
                className="group mt-6 inline-flex items-center justify-between gap-3 bg-primary text-primary-foreground px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] font-bold cyan-glow hover:bg-primary-glow active:scale-[0.98] transition-all w-full"
              >
                <span className="flex items-center gap-2">
                  <span className="size-1.5 bg-primary-foreground rounded-full animate-pulse" />
                  Download CV
                </span>
                <span className="transition-transform group-hover:translate-y-0.5">↓ PDF</span>
              </a>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;