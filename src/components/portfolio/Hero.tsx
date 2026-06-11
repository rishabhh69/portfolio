import { useEffect, useRef } from "react";
import robotBody from "@/assets/robot-body.jpg";
import robotHead from "@/assets/robot-head.png";

const Hero = () => {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const headWrapRef = useRef<HTMLDivElement | null>(null);
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
      const cy = r.top + r.height * 0.3;
      targetX = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth * 0.45)));
      targetY = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight * 0.45)));
    };
    const tick = () => {
      x += (targetX - x) * 0.14;
      y += (targetY - y) * 0.14;
      if (headWrapRef.current) {
        headWrapRef.current.style.transform = `perspective(700px) translate3d(${x * 14}px, ${y * 8}px, 0) rotateY(${x * 26}deg) rotateX(${-y * 14}deg) rotateZ(${x * 2.5}deg)`;
      }
      if (leftPupilRef.current && rightPupilRef.current) {
        const t = `translate(calc(-50% + ${x * 9}px), calc(-50% + ${y * 7}px))`;
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
              NOIDA, IN
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
            <div ref={frameRef} className="relative bg-background border border-border aspect-[3/4] overflow-hidden" style={{ perspective: "900px" }}>
              {/* Headless body — static */}
              <img
                src={robotBody}
                alt="Figure in a grey blazer"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              {/* TV head — cut out, swivels toward the cursor */}
              <div
                ref={headWrapRef}
                className="absolute will-change-transform pointer-events-none"
                style={{
                  left: "17.87%",
                  top: "20.33%",
                  width: "61%",
                  height: "43.9%",
                  transformStyle: "preserve-3d",
                  transformOrigin: "50% 95%",
                }}
              >
                <img
                  src={robotHead}
                  alt="Retro TV monitor head"
                  className="absolute inset-0 w-full h-full"
                  draggable={false}
                />
                <div
                  ref={leftPupilRef}
                  className="absolute rounded-full bg-primary"
                  style={{
                    left: "22.9%",
                    top: "38.8%",
                    width: "10px",
                    height: "10px",
                    transform: "translate(-50%, -50%)",
                    mixBlendMode: "screen",
                    boxShadow: "0 0 10px hsl(var(--primary) / 0.9)",
                  }}
                />
                <div
                  ref={rightPupilRef}
                  className="absolute rounded-full bg-primary"
                  style={{
                    left: "49.6%",
                    top: "37.8%",
                    width: "10px",
                    height: "10px",
                    transform: "translate(-50%, -50%)",
                    mixBlendMode: "screen",
                    boxShadow: "0 0 10px hsl(var(--primary) / 0.9)",
                  }}
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 30%, transparent 50%, hsl(var(--background) / 0.4) 100%)",
                }}
              />
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                NOIDA, IN
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