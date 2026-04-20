import { useEffect, useState } from "react";
import ParticleNetwork from "./ParticleNetwork";
import { useScramble } from "@/hooks/useScramble";

const Hero = () => {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setArmed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const tag = useScramble("ARCHITECT // FOUNDER // QUANT_DEV", { delay: 100, trigger: armed });
  const first = useScramble("Rishabh", { delay: 250, speed: 36, trigger: armed });
  const last = useScramble("Shukla.", { delay: 500, speed: 36, trigger: armed });
  const sub = useScramble(
    "Architecting $10B financial infrastructure. Shipping code. Skipping sleep.",
    { delay: 950, speed: 18, trigger: armed }
  );

  return (
    <section className="relative min-h-dvh w-full overflow-hidden grid-pattern pt-24 pb-16 md:pt-28 md:pb-24">
      {/* WebGL-feel particle network */}
      <div className="absolute inset-0 opacity-70">
        <ParticleNetwork />
      </div>
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, transparent 0%, hsl(var(--background)) 80%)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8 lg:gap-12">
        {/* Left: headline */}
        <div className="col-span-12 lg:col-span-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-primary" />
            <span className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase">
              {tag}
            </span>
          </div>

          <h1 className="font-display font-black tracking-tighter leading-[0.85] text-foreground">
            <span className="block text-[clamp(3.5rem,11vw,11rem)]">{first}</span>
            <span className="block text-[clamp(3.5rem,11vw,11rem)] text-foreground/25">
              {last.replace(".", "")}<span className="text-primary">.</span>
            </span>
          </h1>

          <p className="mt-10 max-w-2xl text-xl md:text-2xl text-muted-foreground font-light tracking-tight text-balance">
            {sub}
          </p>

          <p className="mt-6 max-w-2xl font-mono text-xs md:text-sm text-foreground/50 leading-relaxed">
            <span className="text-primary">{">"}</span> 4th-semester <span className="text-foreground">CSE</span> @ JIIT.
            Architecting NLP-to-C++ execution engines for{" "}
            <span className="text-foreground">TradeKy</span>. Sub-50ms order routing,
            multi-threaded API choreography, sleep is optional.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all hover:cyan-glow-strong active:scale-[0.97]"
            >
              View Proof
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#terminal"
              className="inline-flex items-center gap-3 border border-border-strong text-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-surface transition-colors"
            >
              Talk to Mini-Rishabh
            </a>
          </div>
        </div>

        {/* Right: terminal preview */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-surface/60 border border-border p-1 cyan-glow">
            <div className="bg-background border border-border p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-destructive/60" />
                  <span className="size-2 rounded-full bg-terminal-amber/60" />
                  <span className="size-2 rounded-full bg-terminal-green/60" />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  ~/rishabh — zsh
                </span>
              </div>
              <div className="font-mono text-[11px] leading-relaxed space-y-1.5">
                <Line cmd="whoami" out="rishabh.shukla // founder@tradeky" />
                <Line cmd="cat /etc/stack" out="C++20, Python, TypeScript, FastAPI" />
                <Line cmd="ping execution.engine" out="reply: 47ms — OK" outClass="text-primary" />
                <Line cmd="systemctl status sleep" out="inactive (dead) since SEM_4" outClass="text-destructive/80" />
                <div className="flex gap-2 pt-1 text-primary">
                  <span>$</span>
                  <span className="cursor-blink">_</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-px bg-border border border-border">
            <Stat label="Exec Latency" value="<50ms" />
            <Stat label="Geoloc Query" value="<150ms" />
            <Stat label="Chess ELO" value="1420+" />
            <Stat label="High School" value="94.3%" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Line = ({ cmd, out, outClass = "text-foreground/60" }: { cmd: string; out: string; outClass?: string }) => (
  <div>
    <div className="text-primary">$ <span className="text-foreground/90">{cmd}</span></div>
    <div className={`pl-3 ${outClass}`}>{out}</div>
  </div>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-background p-3">
    <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-1">
      {label}
    </div>
    <div className="font-mono text-base text-foreground tabular-nums">{value}</div>
  </div>
);

export default Hero;