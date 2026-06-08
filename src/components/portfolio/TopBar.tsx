import { Link, useLocation } from "react-router-dom";

const NAV = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Contact", href: "/#contact" },
];

const TopBar = () => {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-14">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="size-1.5 bg-primary rounded-full" />
          <span className="font-serif text-base md:text-[17px] tracking-tight text-foreground group-hover:text-primary transition-colors">
            Rishabh Shukla
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={onHome ? item.href.replace("/", "") || "/" : item.href}
              className="font-sans text-[13px] text-muted-foreground hover:text-primary transition-colors tracking-tight"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/rishabh-shukla-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex font-sans text-[12px] tracking-tight text-foreground/70 hover:text-primary border border-border hover:border-primary/40 px-3 py-1.5 transition-colors"
          >
            Résumé ↗
          </a>
          <a
            href="mailto:rishabhshukla2510@gmail.com"
            className="inline-flex font-sans text-[12px] tracking-tight bg-primary text-primary-foreground hover:bg-primary-glow px-3 py-1.5 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
};

export default TopBar;