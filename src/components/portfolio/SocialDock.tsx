import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const LINKS = [
  { label: "Email", icon: Mail, href: "mailto:rishabhshukla2510@gmail.com" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/rishabh-shukla-70260231b/" },
  { label: "GitHub", icon: Github, href: "https://github.com/rishabhh69" },
  { label: "X", icon: Twitter, href: "https://x.com/rishabhh69_" },
];

const SocialDock = () => (
  <div className="flex md:justify-end gap-2">
    {LINKS.map(({ label, icon: Icon, href }) => (
      <a
        key={label}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={label}
        className="size-10 grid place-items-center border border-border bg-card hover:border-primary hover:text-primary text-foreground/70 transition-colors"
      >
        <Icon className="size-4" strokeWidth={1.5} />
      </a>
    ))}
  </div>
);

export default SocialDock;
