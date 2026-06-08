import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PROJECTS, type ProjectDossier } from "@/data/projects";

const ProjectLayout = ({ dossier }: { dossier: ProjectDossier }) => {
  const next = PROJECTS[dossier.next];

  return (
    <div className="relative pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-8 pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-3.5" strokeWidth={2} />
          Back to portfolio
        </Link>
      </div>

      {/* Editorial header */}
      <header className="relative max-w-4xl mx-auto px-6 md:px-8 pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">
            Case Study · {dossier.index}
          </span>
          <span className="h-px w-16 bg-gold" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            {dossier.tag}
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-[-0.015em] leading-[1.05] text-foreground">
          {dossier.header}
        </h1>

        <div className="gold-rule mt-10 w-24" />

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] mr-2">Role</span>
            <span className="text-foreground">{dossier.role}</span>
          </div>
          {dossier.link && (
            <a
              href={dossier.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary-glow transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] mr-1 text-muted-foreground">Live</span>
              {dossier.link.label} <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </div>
      </header>

      {/* Stat strip */}
      <section className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
          {dossier.stats.map((s) => (
            <div key={s.label} className="bg-card p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {s.label}
              </div>
              <div className="mt-3 font-serif text-2xl md:text-3xl font-bold text-primary">
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 mt-20 md:mt-28 grid grid-cols-1 gap-16">
        <article>
          <h2 className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-5">
            The problem
          </h2>
          <p className="font-serif text-xl md:text-[22px] leading-snug text-foreground/90 text-balance">
            {dossier.problem}
          </p>
        </article>

        <article>
          <h2 className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-6">
            What I built
          </h2>
          <div className="space-y-7">
            {dossier.built.map((b, i) => (
              <div key={i} className="grid grid-cols-[auto_1fr] gap-5 md:gap-7">
                <div className="font-serif text-2xl text-gold tabular-nums leading-none pt-1">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-foreground/85 leading-relaxed text-[16px] md:text-[17px]">
                  <span className="font-serif italic text-primary mr-1.5">{b.verb}</span>{" "}
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article>
          <h2 className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-5">
            Technology
          </h2>
          <div className="flex flex-wrap gap-2">
            {dossier.stack.map((s) => (
              <span
                key={s}
                className="border border-border bg-card px-3 py-1.5 text-[13px] text-foreground/80"
              >
                {s}
              </span>
            ))}
          </div>
        </article>

        {dossier.link && (
          <a
            href={dossier.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-between gap-4 bg-primary text-primary-foreground px-7 py-5 hover:bg-primary-glow transition-colors"
          >
            <span className="font-serif text-lg">Visit {dossier.link.label}</span>
            <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        )}
      </section>

      {/* Next */}
      <section className="mt-28 border-t border-border bg-surface/50">
        <Link
          to={`/projects/${next.id}`}
          className="group block max-w-6xl mx-auto px-6 md:px-8 py-14 md:py-20 grid grid-cols-12 gap-6 items-center hover:bg-surface transition-colors"
        >
          <div className="col-span-12 md:col-span-3 font-mono text-[10px] tracking-[0.3em] text-primary uppercase">
            Next case →
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-2">
              {next.tag}
            </div>
            <h3 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {next.name}
            </h3>
          </div>
          <div className="col-span-12 md:col-span-2 md:text-right text-sm text-foreground/60 group-hover:text-primary transition-colors">
            Open <span className="text-gold">↗</span>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default ProjectLayout;
