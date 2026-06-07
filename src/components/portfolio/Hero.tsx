import { useEffect, useRef, useState } from "react";
import ParticleNetwork from "./ParticleNetwork";
import { useScramble } from "@/hooks/useScramble";

const Hero = () => {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setArmed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const frameRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<SVGGElement | null>(null);
  const leftPupilRef = useRef<SVGCircleElement | null>(null);
  const rightPupilRef = useRef<SVGCircleElement | null>(null);
  useEffect(() => {
    let raf = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    const onMove = (e: MouseEvent) => {
      const el = frameRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.30;
      targetX = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth * 0.5)));
      targetY = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight * 0.5)));
    };
    const tick = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      if (headRef.current) {
        headRef.current.style.transform = `translate(${x * 14}px, ${y * 9}px) rotate(${x * 5}deg)`;
        headRef.current.style.transformBox = "fill-box";
        headRef.current.style.transformOrigin = "center";
      }
      if (leftPupilRef.current && rightPupilRef.current) {
        const tx = x * 6;
        const ty = y * 5;
        leftPupilRef.current.setAttribute("cx", String(220 + tx));
        leftPupilRef.current.setAttribute("cy", String(255 + ty));
        rightPupilRef.current.setAttribute("cx", String(300 + tx));
        rightPupilRef.current.setAttribute("cy", String(255 + ty));
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const tag = useScramble("ARCHITECT // FOUNDER // QUANT_DEV", { delay: 100, trigger: armed });
  const first = useScramble("Rishabh", { delay: 250, speed: 36, trigger: armed });
  const last = useScramble("Shukla.", { delay: 500, speed: 36, trigger: armed });
  const sub = useScramble(
    "Architecting $10B Financial Infrastructure. Engineering Execution Edge.",
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left: headline */}
        <div className="col-span-12 lg:col-span-7">
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
              href="https://tradeky.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] font-bold cyan-glow-strong hover:bg-primary-glow active:scale-[0.97] transition-all"
            >
              <span className="absolute inset-0 border border-primary animate-ping opacity-30 pointer-events-none" />
              <span className="size-1.5 bg-primary-foreground rounded-full animate-pulse" />
              LIVE → tradeky.in
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 border border-border-strong text-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-surface hover:border-primary hover:text-primary transition-all"
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

        {/* Right: responsive robot */}
        <div className="col-span-12 lg:col-span-5">
          <div className="relative bg-surface/60 border border-border p-1 cyan-glow-strong overflow-hidden">
            <div ref={frameRef} className="relative bg-background border border-border aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
              {/* Ambient backdrop */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 35%, hsl(187 100% 50% / 0.18) 0%, transparent 60%), linear-gradient(180deg, hsl(0 0% 6%) 0%, hsl(0 0% 4%) 100%)",
                }}
              />
              {/* SVG Robot */}
              <svg
                viewBox="0 0 520 680"
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 h-full w-full"
              >
                <defs>
                  <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0 0% 18%)" />
                    <stop offset="100%" stopColor="hsl(0 0% 8%)" />
                  </linearGradient>
                  <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0 0% 22%)" />
                    <stop offset="100%" stopColor="hsl(0 0% 10%)" />
                  </linearGradient>
                  <radialGradient id="eyeGlow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="hsl(187 100% 70%)" />
                    <stop offset="60%" stopColor="hsl(187 100% 50%)" />
                    <stop offset="100%" stopColor="hsl(187 100% 40% / 0)" />
                  </radialGradient>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Shoulders / body */}
                <g>
                  <path
                    d="M120 520 Q120 430 200 410 L320 410 Q400 430 400 520 L400 640 L120 640 Z"
                    fill="url(#bodyGrad)"
                    stroke="hsl(187 100% 50% / 0.35)"
                    strokeWidth="1.5"
                  />
                  {/* Chest core */}
                  <circle cx="260" cy="500" r="28" fill="hsl(0 0% 5%)" stroke="hsl(187 100% 50%)" strokeWidth="1.5" />
                  <circle cx="260" cy="500" r="14" fill="url(#eyeGlow)" filter="url(#glow)">
                    <animate attributeName="r" values="12;16;12" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  {/* Neck */}
                  <rect x="240" y="370" width="40" height="50" fill="hsl(0 0% 12%)" stroke="hsl(187 100% 50% / 0.3)" />
                  <line x1="245" y1="385" x2="275" y2="385" stroke="hsl(187 100% 50%)" strokeWidth="0.8" />
                  <line x1="245" y1="400" x2="275" y2="400" stroke="hsl(187 100% 50%)" strokeWidth="0.8" />
                </g>

                {/* Head group — tracks cursor */}
                <g ref={headRef} style={{ transition: "transform 60ms linear" }}>
                  {/* Helmet */}
                  <path
                    d="M150 240 Q150 130 260 130 Q370 130 370 240 L370 340 Q370 380 330 380 L190 380 Q150 380 150 340 Z"
                    fill="url(#headGrad)"
                    stroke="hsl(187 100% 50% / 0.5)"
                    strokeWidth="1.5"
                  />
                  {/* Top antenna */}
                  <line x1="260" y1="130" x2="260" y2="95" stroke="hsl(187 100% 50%)" strokeWidth="2" />
                  <circle cx="260" cy="90" r="5" fill="hsl(187 100% 50%)" filter="url(#glow)">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
                  </circle>
                  {/* Side ear modules */}
                  <rect x="138" y="240" width="18" height="60" rx="3" fill="hsl(0 0% 10%)" stroke="hsl(187 100% 50% / 0.4)" />
                  <rect x="364" y="240" width="18" height="60" rx="3" fill="hsl(0 0% 10%)" stroke="hsl(187 100% 50% / 0.4)" />
                  {/* Visor */}
                  <path
                    d="M180 220 Q180 200 210 200 L310 200 Q340 200 340 220 L340 290 Q340 310 310 310 L210 310 Q180 310 180 290 Z"
                    fill="hsl(0 0% 3%)"
                    stroke="hsl(187 100% 50%)"
                    strokeWidth="1.5"
                  />
                  {/* Eye sockets */}
                  <circle cx="220" cy="255" r="22" fill="hsl(0 0% 2%)" stroke="hsl(187 100% 50% / 0.6)" />
                  <circle cx="300" cy="255" r="22" fill="hsl(0 0% 2%)" stroke="hsl(187 100% 50% / 0.6)" />
                  {/* Glowing pupils — re-position on cursor */}
                  <circle ref={leftPupilRef} cx="220" cy="255" r="9" fill="url(#eyeGlow)" filter="url(#glow)" />
                  <circle ref={rightPupilRef} cx="300" cy="255" r="9" fill="url(#eyeGlow)" filter="url(#glow)" />
                  {/* Mouth grill */}
                  <g stroke="hsl(187 100% 50% / 0.7)" strokeWidth="1.5">
                    <line x1="225" y1="345" x2="295" y2="345" />
                    <line x1="235" y1="355" x2="285" y2="355" />
                    <line x1="245" y1="365" x2="275" y2="365" />
                  </g>
                </g>
              </svg>
              <div className="absolute left-1/2 top-[30%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 opacity-60 animate-ping pointer-events-none" />
              {/* Scanlines */}
              <div className="absolute inset-0 pointer-events-none scanline" />
              {/* HUD frame */}
              <div className="absolute top-2 left-2 right-2 flex justify-between items-center font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                  A.R.I.A · online
                </span>
                <span className="text-foreground/50">v2.1.0</span>
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/60">
                <span>adaptive_response_interface</span>
                <span className="text-primary">◉ rec</span>
              </div>
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-4 h-4 border-l border-t border-primary" />
              <span className="absolute top-0 right-0 w-4 h-4 border-r border-t border-primary" />
              <span className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-primary" />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;