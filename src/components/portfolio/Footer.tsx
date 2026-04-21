import SocialDock from "./SocialDock";

const Footer = () => {
  return (
    <footer className="relative border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        <div>
          <div className="font-display text-3xl font-bold tracking-tight">Rishabh Shukla<span className="text-primary">.</span></div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-2">
            Quant Developer · Founder · Systems Architect
          </div>
          <a
            href="https://tradeky.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary hover:text-primary-glow transition-colors group"
          >
            <span className="size-1.5 bg-primary rounded-full animate-pulse" />
            tradeky.in
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground space-y-1">
          <div><span className="text-primary">$</span> location → Bengaluru, IN</div>
          <div><span className="text-primary">$</span> currently → building TradeKy</div>
          <div><span className="text-primary">$</span> status → open to elite roles</div>
        </div>
        <SocialDock />
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-3 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
        <span>© {new Date().getFullYear()} RS_INFRA — All rights reserved</span>
        <span>build: 1.0.0 · sha: 0xA1F3 · uptime 99.999%</span>
      </div>
    </footer>
  );
};

export default Footer;