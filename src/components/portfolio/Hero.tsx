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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const leftPupilRef = useRef<HTMLDivElement | null>(null);
  const rightPupilRef = useRef<HTMLDivElement | null>(null);
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
      // Subtle "head turn" — slight 3D tilt of the whole robot video
      if (videoRef.current) {
        videoRef.current.style.transform = `scale(1.1) perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
      }
      if (leftPupilRef.current && rightPupilRef.current) {
        const t = `translate(calc(-50% + ${x * 5}px), calc(-50% + ${y * 5}px))`;
        leftPupilRef.current.style.transform = t;
        rightPupilRef.current.style.transform = t;
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
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 26%, hsl(var(--primary) / 0.18), transparent 36%), linear-gradient(180deg, hsl(var(--surface) / 0.65), hsl(var(--background) / 0.92))",
                }}
              />
              <svg
                viewBox="0 0 520 680"
                role="img"
                aria-label="Cursor-tracking robot assistant"
                className="absolute inset-x-[-8%] bottom-[-4%] h-[108%] w-[116%]"
              >
                <defs>
                  <linearGradient id="robotMetal" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="hsl(var(--foreground) / 0.9)" />
                    <stop offset="0.48" stopColor="hsl(var(--muted-foreground) / 0.5)" />
                    <stop offset="1" stopColor="hsl(var(--surface) / 0.95)" />
                  </linearGradient>
                  <linearGradient id="robotCore" x1="0" x2="1">
                    <stop offset="0" stopColor="hsl(var(--primary) / 0.18)" />
                    <stop offset="0.52" stopColor="hsl(var(--primary) / 0.95)" />
                    <stop offset="1" stopColor="hsl(var(--primary-glow) / 0.24)" />
                  </linearGradient>
                  <filter id="robotGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g opacity="0.42" stroke="hsl(var(--primary) / 0.42)" strokeWidth="1" fill="none">
                  <path d="M58 138 H172 M348 138 H462 M260 34 V90 M98 528 H206 M314 528 H422" />
                  <path d="M82 214 H138 V270 M438 214 H382 V270 M118 598 H402" strokeDasharray="8 10" />
                </g>

                <g id="robot-body">
                  <path d="M157 397 C167 334 205 300 260 300 C315 300 353 334 363 397 L394 642 H126 Z" fill="hsl(var(--surface) / 0.82)" stroke="hsl(var(--border))" strokeWidth="3" />
                  <path d="M178 418 C186 370 216 346 260 346 C304 346 334 370 342 418 L360 618 H160 Z" fill="url(#robotMetal)" opacity="0.72" />
                  <path d="M221 432 H299 L313 555 H207 Z" fill="hsl(var(--background) / 0.86)" stroke="hsl(var(--border))" strokeWidth="2" />
                  <path d="M235 462 H285" stroke="url(#robotCore)" strokeWidth="5" strokeLinecap="round" filter="url(#robotGlow)" />
                  <circle cx="260" cy="520" r="24" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
                  <circle cx="260" cy="520" r="9" fill="hsl(var(--primary))" filter="url(#robotGlow)" />
                  <path d="M148 440 L76 495 L102 536 L165 497" fill="hsl(var(--surface) / 0.75)" stroke="hsl(var(--border))" strokeWidth="3" />
                  <path d="M372 440 L444 495 L418 536 L355 497" fill="hsl(var(--surface) / 0.75)" stroke="hsl(var(--border))" strokeWidth="3" />
                </g>

                <g
                  ref={headRef}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  className="transition-none"
                >
                  <path d="M192 126 C192 92 220 70 260 70 C300 70 328 92 328 126 V140 H192 Z" fill="hsl(var(--surface) / 0.78)" stroke="hsl(var(--border))" strokeWidth="3" />
                  <path d="M156 142 C156 108 184 82 218 82 H302 C336 82 364 108 364 142 V236 C364 272 335 300 300 300 H220 C185 300 156 272 156 236 Z" fill="url(#robotMetal)" stroke="hsl(var(--border-strong))" strokeWidth="4" />
                  <path d="M181 158 C181 128 204 109 231 109 H289 C316 109 339 128 339 158 V220 C339 252 314 276 282 276 H238 C206 276 181 252 181 220 Z" fill="hsl(var(--background) / 0.9)" stroke="hsl(var(--primary) / 0.48)" strokeWidth="2" />
                  <rect x="196" y="172" width="128" height="52" rx="24" fill="hsl(var(--surface) / 0.82)" stroke="hsl(var(--primary) / 0.55)" strokeWidth="2" />
                  <circle cx="228" cy="198" r="17" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
                  <circle cx="292" cy="198" r="17" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
                  <circle ref={leftPupilRef} cx="228" cy="198" r="7" fill="hsl(var(--primary))" filter="url(#robotGlow)" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
                  <circle ref={rightPupilRef} cx="292" cy="198" r="7" fill="hsl(var(--primary))" filter="url(#robotGlow)" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
                  <path d="M228 244 H292" stroke="hsl(var(--foreground) / 0.72)" strokeWidth="4" strokeLinecap="square" />
                  <path d="M174 188 H148 V230 H174 M346 188 H372 V230 H346" fill="none" stroke="hsl(var(--primary) / 0.7)" strokeWidth="4" />
                  <path d="M260 70 V38" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="260" cy="32" r="8" fill="hsl(var(--primary))" filter="url(#robotGlow)" />
                </g>
              </svg>
              <div className="absolute left-1/2 top-[30%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 opacity-60 animate-ping pointer-events-none" />
              {/* Cyan tint + scanlines */}
              <div className="absolute inset-0 pointer-events-none mix-blend-color" style={{ background: "hsl(187 100% 50% / 0.18)" }} />
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