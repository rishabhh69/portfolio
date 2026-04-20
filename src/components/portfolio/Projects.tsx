import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { useTilt } from "@/hooks/useTilt";
import { PROJECT_LIST, type ProjectDossier } from "@/data/projects";

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 md:py-32 px-6 bg-surface/30 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <SectionHeader index="02" eyebrow="Experience / The Proof" title="Built. Shipped. Compounding." />

        <div className="space-y-3">
          {PROJECT_LIST.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: ProjectDossier; index: number }) => {
  const tilt = useTilt(3);
  return (
    <div className="perspective-1200">
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="group relative bg-background border border-border hover:border-primary/40 hover:cyan-glow transition-all duration-500 will-change-transform"
        style={{
          background:
            "radial-gradient(circle at var(--mx,50%) var(--my,50%), hsl(var(--primary)/0.06), hsl(var(--background)) 60%)",
        }}
      >
      <Link to={`/projects/${project.id}`} className="block">
        <div className="p-6 md:p-8 grid grid-cols-12 gap-6 items-center">
          <div className="col-span-1 hidden md:block">
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              0{index + 1}
            </span>
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase mb-2">
              {project.tag}
            </div>
            <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight group-hover:text-primary transition-colors">
              {project.name}
              <span className="text-foreground/30 text-xl md:text-2xl font-light ml-3">
                / {project.role}
              </span>
            </h3>
            <p className="mt-3 text-muted-foreground max-w-2xl">{project.short}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 5).map((s) => (
                <span
                  key={s}
                  className="font-mono text-[9px] uppercase tracking-[0.2em] border border-border px-2 py-1 text-foreground/60"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:justify-end">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest border border-border-strong px-4 py-2 text-foreground/70 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
              Open Dossier
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
      </div>
    </div>
  );
};

export default Projects;