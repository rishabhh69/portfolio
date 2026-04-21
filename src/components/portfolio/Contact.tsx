import { Github, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import SectionHeader from "./SectionHeader";

type Channel = {
  label: string;
  value: string;
  href: string;
  icon: typeof Linkedin;
  cmd: string;
};

const CHANNELS: Channel[] = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/rishabhshukla",
    href: "https://linkedin.com/in/rishabhshukla",
    icon: Linkedin,
    cmd: "open --net linkedin",
  },
  {
    label: "GitHub",
    value: "github.com/rishabh-shukla",
    href: "https://github.com/rishabh-shukla",
    icon: Github,
    cmd: "git clone --user rishabh",
  },
  {
    label: "Instagram",
    value: "instagram.com/rishabh.shukla",
    href: "https://instagram.com/rishabh.shukla",
    icon: Instagram,
    cmd: "open --net instagram",
  },
  {
    label: "Email",
    value: "rishabh.shukla@example.com",
    href: "mailto:rishabh.shukla@example.com",
    icon: Mail,
    cmd: "send --priority p0",
  },
  {
    label: "Phone",
    value: "+91 90000 00000",
    href: "tel:+919000000000",
    icon: Phone,
    cmd: "dial --secure",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <SectionHeader index="05" eyebrow="Contact / Direct Line" title="Open a Channel." />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left: terminal-style intro */}
          <div className="md:col-span-5 bg-surface border border-border p-6 md:p-8 cyan-glow">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-4">
              {">"} status_check
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Available for elite roles, founder collabs, and quant infra.
            </h3>
            <p className="mt-5 text-muted-foreground text-sm leading-relaxed">
              I respond fastest on LinkedIn and email. Phone is reserved for
              high-priority signals.
            </p>

            <div className="mt-8 font-mono text-[11px] leading-relaxed space-y-1 text-foreground/70">
              <div><span className="text-primary">$</span> location → Bengaluru, IN</div>
              <div><span className="text-primary">$</span> timezone → IST (UTC+5:30)</div>
              <div><span className="text-primary">$</span> response_p99 → &lt; 24h</div>
              <div className="flex gap-2 pt-1 text-primary">
                <span>$</span><span className="cursor-blink">_</span>
              </div>
            </div>
          </div>

          {/* Right: channel grid */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHANNELS.map(({ label, value, href, icon: Icon, cmd }, i) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative bg-surface/40 border border-border hover:border-primary p-5 transition-all hover:cyan-glow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="size-10 grid place-items-center border border-border group-hover:border-primary/60 transition-colors">
                    <Icon className="size-4 text-foreground/70 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground tabular-nums">
                    0{i + 1}
                  </span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-1">
                  {label}
                </div>
                <div className="font-mono text-sm text-foreground break-all">
                  {value}
                </div>
                <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>$ {cmd}</span>
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-primary">↗</span>
                </div>
              </a>
            ))}

            {/* CV download tile — primary cyan accent */}
            <a
              href="/Rishabh_s_resume.pdf"
              download
              className="group relative bg-primary text-primary-foreground border border-primary p-5 cyan-glow-strong hover:bg-primary-glow transition-all sm:col-span-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] mb-1 opacity-80">
                    Download · PDF
                  </div>
                  <div className="font-display text-xl font-bold">
                    Rishabh_s_resume.pdf
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] flex items-center gap-2">
                  <span className="size-1.5 bg-primary-foreground rounded-full animate-pulse" />
                  GET → ↓
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;