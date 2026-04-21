import SectionHeader from "./SectionHeader";
import { useTilt } from "@/hooks/useTilt";
import { useEffect, useRef, useState, type ReactNode } from "react";

const TimelineNode = ({
  index,
  marker,
  era,
  title,
  metric,
  body,
}: {
  index: number;
  marker: string;
  era: string;
  title: string;
  metric: ReactNode;
  body: string;
}) => {
  const tilt = useTilt(4);
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[auto_1fr] gap-6 md:gap-10"
      style={{
        transitionDelay: `${index * 90}ms`,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        opacity: shown ? 1 : 0,
        transition:
          "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Rail + node */}
      <div className="relative flex flex-col items-center">
        <div className="size-3 border border-primary bg-background relative z-10">
          <div className="absolute inset-0.5 bg-primary animate-pulse" />
        </div>
        <div className="flex-1 w-px bg-border mt-1" />
      </div>

      {/* Card */}
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="group bg-surface border border-border p-6 md:p-7 mb-8 transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:cyan-glow preserve-3d will-change-transform"
        style={{
          background:
            "radial-gradient(circle at var(--mx,50%) var(--my,50%), hsl(var(--primary)/0.07), hsl(var(--surface)) 60%)",
        }}
      >
        <div className="flex items-center justify-between mb-3 font-mono text-[10px] uppercase tracking-[0.25em]">
          <span className="text-primary">{marker}</span>
          <span className="text-muted-foreground">{era}</span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-2">
          {title}
        </h3>
        <div className="font-mono text-sm md:text-base text-foreground/80 mb-3 tabular-nums">
          {metric}
        </div>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  );
};

const EarlyBaseline = () => {
  return (
    <section id="baseline" className="relative py-24 md:py-32 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          index="02"
          eyebrow="Origin / Mercy Memorial School"
          title="The Baseline: Early Execution."
        />

        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-10 flex items-center gap-3">
          <span className="h-px w-8 bg-primary" />
          <span>Pre-JIIT // Markers of Compounding Discipline</span>
        </div>

        <div className="space-y-2">
          <TimelineNode
            index={0}
            marker="01 · Academics"
            era="ISC Boards"
            title="Flawless Execution."
            metric={
              <>
                10th Boards: <span className="text-primary">94.2%</span> · 12th Boards:{" "}
                <span className="text-primary">94.33%</span>
              </>
            }
            body="Perfect 100 in Computer Science — a clean signal of zero-error execution under standardized pressure."
          />
          <TimelineNode
            index={1}
            marker="02 · Athletics"
            era="U19 ISC Basketball"
            title="Elite Physical Discipline."
            metric={
              <>
                <span className="text-primary">Bronze</span> U19 National ·{" "}
                <span className="text-primary">Gold</span> U19 State
              </>
            }
            body="Court vision translates to architectural vision. Reading the floor is reading the system — anticipating the next move before the play breaks."
          />
          <TimelineNode
            index={2}
            marker="03 · Early Tech"
            era="Class 12"
            title="First Algorithmic Win."
            metric={
              <>
                <span className="text-primary">Champion</span> · Intra-School Coding
                Competition
              </>
            }
            body="The first proof that compiler-grade thinking and competitive pressure compound. The same instinct now powers TradeKy's execution engine."
          />
        </div>
      </div>
    </section>
  );
};

export default EarlyBaseline;