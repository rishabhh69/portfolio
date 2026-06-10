import { useEffect, useRef } from "react";

const Hero = () => {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const robotRef = useRef<SVGGElement | null>(null);
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
      const cy = r.top + r.height * 0.34;
      targetX = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width * 0.55)));
      targetY = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height * 0.45)));
    };
    const tick = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      if (robotRef.current) {
        robotRef.current.style.transform = `translate(${x * 40}px, ${y * 28}px)`;
      }
      if (headRef.current) {
        headRef.current.style.transform = `translate(${x * 14}px, ${y * 9}px) rotate(${x * 5}deg)`;
      }
      if (leftPupilRef.current && rightPupilRef.current) {
        const pupilTransform = `translate(${x * 10}px, ${y * 7}px)`;
        leftPupilRef.current.style.transform = pupilTransform;
        rightPupilRef.current.style.transform = pupilTransform;
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

  return (
    <section className="relative w-full pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-8 paper-texture">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Masthead */}
        <div className="col-span-12 lg:col-span-8 animate-fade-up">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">
              Portfolio · 2026
            </span>
            <span className="h-px flex-1 max-w-[120px] bg-gold" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
              Bengaluru, IN
            </span>
          </div>

          <h1 className="font-serif font-bold tracking-[-0.02em] leading-[0.95] text-foreground text-[clamp(3rem,9vw,8rem)]">
            Rishabh
            <br />
            <span className="italic text-primary">Shukla.</span>
          </h1>

          <div className="gold-rule mt-10 w-24" />

          <p className="mt-10 max-w-2xl font-serif italic text-2xl md:text-[28px] text-foreground/85 leading-snug text-balance">
            Software engineer and founder building low-latency systems
            for capital markets.
          </p>

          <p className="mt-8 max-w-xl text-base md:text-[17px] text-muted-foreground leading-relaxed">
            Computer Science undergraduate at JIIT, currently{" "}
            <span className="text-foreground font-medium">
              Software Development Intern at InternPe
            </span>{" "}
            and founder of{" "}
            <span className="text-foreground font-medium">TradeKy</span> —
            an NLP-driven execution platform for Registered Investment Advisors.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium tracking-tight hover:bg-primary-glow transition-colors"
            >
              View selected work
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="/rishabh-shukla-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-border-strong text-foreground px-6 py-3.5 text-sm font-medium tracking-tight hover:border-primary hover:text-primary transition-colors"
            >
              Download résumé
              <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
          </div>
        </div>

        {/* Sidebar: cursor-tracking robot */}
        <aside className="col-span-12 lg:col-span-4 lg:pt-4 animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="relative bg-card border border-border shadow-soft p-1">
            <div ref={frameRef} className="relative bg-background border border-border aspect-[3/4] overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 26%, hsl(var(--primary) / 0.10), transparent 38%), linear-gradient(180deg, hsl(var(--surface) / 0.6), hsl(var(--background) / 0.95))",
                }}
              />
              <svg
                viewBox="0 0 520 680"
                role="img"
                aria-label="Cursor-tracking robot"
                className="absolute inset-x-[-8%] bottom-[-4%] h-[108%] w-[116%]"
              >
                <defs>
                  <linearGradient id="robotMetal" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="hsl(var(--foreground) / 0.85)" />
                    <stop offset="0.48" stopColor="hsl(var(--muted-foreground) / 0.45)" />
                    <stop offset="1" stopColor="hsl(var(--surface) / 0.95)" />
                  </linearGradient>
                  <linearGradient id="robotCore" x1="0" x2="1">
                    <stop offset="0" stopColor="hsl(var(--primary) / 0.2)" />
                    <stop offset="0.52" stopColor="hsl(var(--primary) / 0.95)" />
                    <stop offset="1" stopColor="hsl(var(--gold) / 0.4)" />
                  </linearGradient>
                  <filter id="robotGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g ref={robotRef} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
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
                >
                  <path d="M192 126 C192 92 220 70 260 70 C300 70 328 92 328 126 V140 H192 Z" fill="hsl(var(--surface) / 0.78)" stroke="hsl(var(--border))" strokeWidth="3" />
                  <path d="M156 142 C156 108 184 82 218 82 H302 C336 82 364 108 364 142 V236 C364 272 335 300 300 300 H220 C185 300 156 272 156 236 Z" fill="url(#robotMetal)" stroke="hsl(var(--border-strong))" strokeWidth="4" />
                  <path d="M181 158 C181 128 204 109 231 109 H289 C316 109 339 128 339 158 V220 C339 252 314 276 282 276 H238 C206 276 181 252 181 220 Z" fill="hsl(var(--background) / 0.9)" stroke="hsl(var(--primary) / 0.4)" strokeWidth="2" />
                  <rect x="196" y="172" width="128" height="52" rx="24" fill="hsl(var(--surface) / 0.82)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="2" />
                  <circle cx="228" cy="198" r="17" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
                  <circle cx="292" cy="198" r="17" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
                  <circle ref={leftPupilRef} cx="228" cy="198" r="7" fill="hsl(var(--primary))" filter="url(#robotGlow)" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
                  <circle ref={rightPupilRef} cx="292" cy="198" r="7" fill="hsl(var(--primary))" filter="url(#robotGlow)" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
                  <path d="M228 244 H292" stroke="hsl(var(--foreground) / 0.7)" strokeWidth="4" strokeLinecap="square" />
                  <path d="M174 188 H148 V230 H174 M346 188 H372 V230 H346" fill="none" stroke="hsl(var(--primary) / 0.6)" strokeWidth="4" />
                  <path d="M260 70 V38" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="260" cy="32" r="8" fill="hsl(var(--gold))" filter="url(#robotGlow)" />
                </g>
                </g>
              </svg>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                Bengaluru, IN
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-primary">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                Available
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;