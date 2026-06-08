const Hero = () => {
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

        {/* Sidebar card */}
        <aside className="col-span-12 lg:col-span-4 lg:pt-4 animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="bg-card border border-border shadow-soft p-7">
            <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">
              Currently
            </div>
            <div className="gold-rule mt-3 w-10" />
            <div className="mt-5 space-y-5">
              <Row label="Role" value="Software Development Intern" sub="InternPe · Jun 2026 → Present" />
              <Row label="Building" value="TradeKy" sub="Founder & Lead Architect" link="https://tradeky.in" />
              <Row label="Studying" value="B.Tech, Computer Science" sub="JIIT · Bengaluru" />
              <Row label="Live work" value="sannidh.in" sub="Regulatory intelligence platform" link="https://www.sannidh.in" />
            </div>
            <div className="mt-7 pt-5 border-t border-border flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                Open to elite engineering roles
              </span>
              <a
                href="mailto:rishabhshukla2510@gmail.com"
                className="text-xs text-primary hover:text-primary-glow transition-colors"
              >
                Email →
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

const Row = ({ label, value, sub, link }: { label: string; value: string; sub: string; link?: string }) => (
  <div>
    <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">{label}</div>
    <div className="mt-1 font-serif text-[17px] text-foreground">
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
          {value} <span className="text-gold">↗</span>
        </a>
      ) : (
        value
      )}
    </div>
    <div className="text-[12px] text-muted-foreground mt-0.5">{sub}</div>
  </div>
);

export default Hero;