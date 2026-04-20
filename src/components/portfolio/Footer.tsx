const Footer = () => {
  return (
    <footer className="relative border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        <div>
          <div className="font-display text-3xl font-bold tracking-tight">Rishabh Shukla<span className="text-primary">.</span></div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-2">
            Quant Developer · Founder · Sleep-Skipper
          </div>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground space-y-1">
          <div><span className="text-primary">$</span> location → Bengaluru, IN</div>
          <div><span className="text-primary">$</span> currently → building TradeKy</div>
          <div><span className="text-primary">$</span> status → open to elite roles</div>
        </div>
        <div className="flex md:justify-end gap-3">
          <a className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors" href="#terminal">Terminal</a>
          <a className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors" href="#projects">Proof</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-3 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
        <span>© {new Date().getFullYear()} RS_INFRA — All rights reserved</span>
        <span>build: 1.0.0 · sha: 0xA1F3 · uptime 99.999%</span>
      </div>
    </footer>
  );
};

export default Footer;