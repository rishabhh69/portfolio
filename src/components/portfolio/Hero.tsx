import { useEffect, useRef } from "react";

const ROBOT_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/generated-videos/d8a51f3d-8fa2-46e3-9f82-1a89c8e1c4e0.mp4";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let targetTime = 0;
    let seeking = false;
    let ready = false;

    const onMeta = () => {
      ready = true;
      // Park the head in the middle position at first
      targetTime = video.duration / 2;
      try {
        video.currentTime = targetTime;
      } catch {}
    };

    const seekToTarget = () => {
      if (!ready || seeking) return;
      const clamped = Math.max(0, Math.min(video.duration - 0.01, targetTime));
      if (Math.abs(clamped - video.currentTime) < 0.01) return;
      seeking = true;
      try {
        video.currentTime = clamped;
      } catch {
        seeking = false;
      }
    };

    const onSeeked = () => {
      seeking = false;
      // If target moved while we were seeking, chase it
      if (Math.abs(targetTime - video.currentTime) > 0.01) seekToTarget();
    };

    const onMove = (e: MouseEvent) => {
      if (!ready) return;
      // Map cursor X across the viewport to the full video timeline.
      // Center cursor → middle frame (head facing forward).
      const t = e.clientX / window.innerWidth; // 0..1
      targetTime = t * video.duration;
      seekToTarget();
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
            <div className="relative bg-background border border-border aspect-[3/4] overflow-hidden">
              <video
                ref={videoRef}
                src={ROBOT_VIDEO_URL}
                muted
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ objectPosition: "70% 30%" }}
              />
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