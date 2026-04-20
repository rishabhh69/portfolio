import { Github, Instagram, Linkedin } from "lucide-react";

const LINKS = [
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/rishabhshukla" },
  { label: "GitHub", icon: Github, href: "https://github.com/rishabh-shukla" },
  { label: "Instagram", icon: Instagram, href: "https://instagram.com/rishabh.shukla" },
];

const SocialDock = () => {
  return (
    <div className="flex md:justify-end gap-2">
      {LINKS.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group relative size-11 grid place-items-center border border-border bg-surface/40 hover:border-primary hover:cyan-glow transition-all"
        >
          <Icon className="size-4 text-foreground/70 group-hover:text-primary transition-colors" strokeWidth={1.5} />
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialDock;