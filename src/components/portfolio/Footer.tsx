import SocialDock from "./SocialDock";

const Footer = () => (
  <footer className="relative border-t border-border py-12 px-6 md:px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
      <div>
        <div className="font-serif text-2xl tracking-tight text-foreground">
          Rishabh Shukla<span className="text-primary">.</span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">
          Software Engineer · Founder
        </div>
      </div>
      <div className="font-mono text-[11px] text-muted-foreground space-y-1">
        <div>Bengaluru, India</div>
        <div>Currently @ InternPe · Building TradeKy</div>
      </div>
      <SocialDock />
    </div>
    <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-3 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
      <span>© {new Date().getFullYear()} Rishabh Shukla — All rights reserved</span>
      <span>Designed and built in Bengaluru</span>
    </div>
  </footer>
);

export default Footer;
