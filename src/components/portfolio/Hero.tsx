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
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let targetTime = 0;
    let seeking = false;
    let ready = false;
    const onMeta = () => {
      if (!video.duration || !isFinite(video.duration)) return;
      ready = true;
      targetTime = video.duration / 2;
      try { video.currentTime = targetTime; } catch {}
    };
    const seekIfNeeded = () => {
      if (!ready || seeking) return;
      if (Math.abs(video.currentTime - targetTime) < 0.01) return;
      seeking = true;
      try { video.currentTime = targetTime; } catch { seeking = false; }
    };
    const onSeeked = () => {
      seeking = false;
      if (Math.abs(video.currentTime - targetTime) > 0.01) seekIfNeeded();
    };
    const onMove = (e: MouseEvent) => {
      if (!ready || !video.duration) return;
      // Cursor X across viewport scrubs the head-turn timeline so the
      // robot's head + eyes track the cursor.
      const t = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      targetTime = t * video.duration;
      seekIfNeeded();
    };
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("seeked", onSeeked);
    window.addEventListener("mousemove", onMove);
    if (video.readyState >= 1) onMeta();
    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("mousemove", onMove);
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
      <div className="absolute inset-0 opacity-70">
        <ParticleNetwork />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, transparent 0%, hsl(var(--background)) 80%)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8 lg:gap-10 items-center">
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

        <div className="col-span-12 lg:col-span-5">
          <div className="relative bg-surface/60 border border-border p-1 cyan-glow-strong overflow-hidden">
            <div ref={frameRef} className="relative bg-background border border-border aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
              {/* Mainframe robot — cursor-scrubbed head turn */}
              <video
                ref={videoRef}
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
                muted
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "70% center", transform: "scale(1.08)" }}
              />
              {/* Cyan tint */}
              <div className="absolute inset-0 pointer-events-none mix-blend-color" style={{ background: "hsl(187 100% 50% / 0.18)" }} />
              <div className="absolute left-1/2 top-[30%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 opacity-60 animate-ping pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none scanline" />
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