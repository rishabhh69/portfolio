import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { PROJECT_LIST, type ProjectDossier } from "@/data/projects";

const Projects = () => {
  const [featured, ...rest] = PROJECT_LIST;
  return (
    <section id="work" className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="01"
          eyebrow="Selected Work"
          title="Production systems, shipped and running."
          kicker="A small set of projects I've designed, built, and operated end-to-end — focused on infrastructure that handles real users, real capital, or real regulatory weight."
        />

        <FeaturedCard project={featured} />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedCard = ({ project }: { project: ProjectDossier }) => (
  <Link
    to={`/projects/${project.id}`}
    className="group block bg-card border border-border shadow-soft hover:shadow-elevated hover:border-primary/40 transition-all"
  >
    <div className="grid grid-cols-12 gap-0">
      <div className="col-span-12 lg:col-span-7 p-8 md:p-12">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">
            Featured · {project.index}
          </span>
          <span className="h-px w-10 bg-gold" />
        </div>
        <h3 className="font-serif text-4xl md:text-5xl font-bold tracking-[-0.015em] text-foreground group-hover:text-primary transition-colors leading-[1.05]">
          {project.name}
        </h3>
        <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mt-3">
          {project.role}
        </div>
        <div className="gold-rule mt-7 w-20" />
        <p className="mt-6 text-foreground/80 leading-relaxed max-w-xl">
          {project.short}
        </p>
        <div className="mt-7 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((s) => (
            <span key={s} className="text-[11px] border border-border px-2.5 py-1 text-foreground/70 bg-background">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-8 inline-flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all">
          Read case study <span>→</span>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-5 border-t lg:border-t-0 lg:border-l border-border bg-surface/60 p-8 md:p-12 grid grid-cols-2 gap-px bg-border">
        {project.stats.map((s) => (
          <div key={s.label} className="bg-surface/60 p-5">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">{s.label}</div>
            <div className="mt-3 font-serif text-2xl md:text-3xl font-bold text-primary">{s.value}</div>
          </div>
        ))}
        {project.link && (
          <div className="col-span-2 bg-surface/60 p-5 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-mono">Live</span>
            <span className="text-sm text-primary">{project.link.label} ↗</span>
          </div>
        )}
      </div>
    </div>
  </Link>
);

const ProjectCard = ({ project, index }: { project: ProjectDossier; index: number }) => (
  <Link
    to={`/projects/${project.id}`}
    className="group block bg-card border border-border shadow-soft hover:shadow-elevated hover:border-primary/40 transition-all p-7 md:p-8"
  >
    <div className="flex items-center justify-between mb-5">
      <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">
        0{index + 1} · {project.tag}
      </span>
      <span className="text-gold text-sm opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
    </div>
    <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
      {project.name}
    </h3>
    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-2">
      {project.role}
    </div>
    <p className="mt-5 text-foreground/75 text-[15px] leading-relaxed">
      {project.short}
    </p>
    <div className="mt-6 flex flex-wrap gap-1.5">
      {project.stack.slice(0, 5).map((s) => (
        <span key={s} className="text-[11px] border border-border px-2 py-0.5 text-foreground/65">
          {s}
        </span>
      ))}
    </div>
    {project.link && (
      <div className="mt-6 pt-5 border-t border-border text-sm text-primary">
        {project.link.label} <span className="text-gold">↗</span>
      </div>
    )}
  </Link>
);

export default Projects;