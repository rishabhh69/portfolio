import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import SectionHeader from "./SectionHeader";

const CHANNELS = [
  { label: "Email", value: "rishabhshukla2510@gmail.com", href: "mailto:rishabhshukla2510@gmail.com", icon: Mail },
  { label: "LinkedIn", value: "linkedin.com/in/rishabh-shukla-70260231b", href: "https://www.linkedin.com/in/rishabh-shukla-70260231b/", icon: Linkedin },
  { label: "GitHub", value: "github.com/rishabhh69", href: "https://github.com/rishabhh69", icon: Github },
  { label: "X", value: "x.com/rishabhh69_", href: "https://x.com/rishabhh69_", icon: Twitter },
];

const Contact = () => (
  <section id="contact" className="relative py-28 md:py-40 px-6 md:px-8 border-t border-border">
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-10">
      <div className="col-span-12 lg:col-span-7">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">05 · Contact</span>
          <span className="h-px w-24 bg-gold" />
        </div>
        <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-[-0.015em] text-foreground leading-[1.05] max-w-3xl">
          Let's build something
          <span className="italic text-primary"> serious.</span>
        </h2>
        <p className="mt-7 max-w-xl text-lg text-muted-foreground leading-relaxed">
          I'm open to elite engineering roles, founder collaborations, and consulting on
          execution infrastructure. Response time is typically under 24 hours.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="mailto:rishabhshukla2510@gmail.com"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium tracking-tight hover:bg-primary-glow transition-colors"
          >
            Email me directly <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="/rishabh-shukla-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-border-strong text-foreground px-6 py-3.5 text-sm font-medium tracking-tight hover:border-primary hover:text-primary transition-colors"
          >
            Download résumé <span>↗</span>
          </a>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <div className="bg-card border border-border shadow-soft divide-y divide-border">
          {CHANNELS.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-5 p-5 group hover:bg-background transition-colors"
            >
              <div className="size-10 grid place-items-center border border-border bg-background group-hover:border-primary transition-colors">
                <Icon className="size-4 text-foreground/70 group-hover:text-primary transition-colors" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">{label}</div>
                <div className="text-sm text-foreground truncate mt-0.5">{value}</div>
              </div>
              <span className="text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
          ))}
        </div>
        <div className="mt-5 text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-mono flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          NOIDA, IN · IST (UTC+5:30)
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
