import { projects } from '../../data/projects';
import { ProjectScene } from './ProjectScene';

export const Projects = () => (
  <section id="projects" aria-label="Project scenes">
    <div
      data-timeline-section
      data-timeline-label="Project gateway"
      className="relative overflow-hidden border-y border-border bg-void px-5 py-20 md:px-10"
    >
      <div className="absolute inset-0 grid-fade opacity-20" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-xs uppercase text-hacker">[chapter unlocked]</p>
        <h2 className="max-w-4xl font-display text-4xl font-extrabold leading-tight text-slate-100 md:text-6xl">
          Projects as executable scenes, not static cards.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
          Each project opens like a system state: part narrative, part technical artifact, part demo you can run
          directly in the portfolio.
        </p>
      </div>
    </div>

    {projects.map((project, index) => (
      <ProjectScene key={project.id} project={project} index={index} />
    ))}
  </section>
);
