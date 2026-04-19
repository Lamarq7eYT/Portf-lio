import { type CSSProperties, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import Github from 'lucide-react/dist/esm/icons/github';
import MoveRight from 'lucide-react/dist/esm/icons/move-right';
import type { Project } from '../../data/projects';
import { fireGlitch } from '../../utils/glitch';
import { GlitchText } from '../ui/GlitchText';
import { ProjectCard } from './ProjectCard';

type ProjectSceneProps = {
  project: Project;
  index: number;
};

export const ProjectScene = ({ project, index }: ProjectSceneProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          fireGlitch({
            label: index === 0 ? 'PROJECTS UNLOCKED' : `SCENE 0${index + 1}`,
            intensity: index === 0 ? 'hard' : 'soft',
            duration: index === 0 ? 560 : 360
          });
        }
      },
      { threshold: 0.42 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [index]);

  return (
    <section
      ref={sectionRef}
      id={`project-${project.id}`}
      data-timeline-section
      data-timeline-label={project.name}
      data-project-id={project.id}
      className="project-scene flex items-center px-5 py-24 md:px-10"
      style={{ '--project-accent': project.accentColor } as CSSProperties}
    >
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 46 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-7"
        >
          <div className="flex items-center gap-3 font-mono text-xs uppercase text-[var(--project-accent)]">
            <span>[scene {String(index + 1).padStart(2, '0')}]</span>
            <span className="h-px w-16 bg-[var(--project-accent)]" />
            <span>runtime narrative</span>
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-4xl font-extrabold leading-tight text-slate-100 md:text-7xl">
              <GlitchText text={project.name}>{project.name}</GlitchText>
            </h2>
            <p className="font-mono text-sm uppercase text-slate-300 md:text-base">{project.tagline}</p>
            <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">{project.narrativeHook}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techBadges.map((badge) => (
              <span
                key={badge}
                className="border border-border bg-void/60 px-2.5 py-1.5 font-mono text-[0.68rem] uppercase text-slate-300"
              >
                {badge}
              </span>
            ))}
          </div>

          <ul className="space-y-3 border-l border-[var(--project-accent)]/50 pl-5 text-sm leading-6 text-slate-300">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <MoveRight size={15} className="mt-1 shrink-0 text-[var(--project-accent)]" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 border border-[var(--project-accent)] px-4 font-mono text-xs uppercase text-[var(--project-accent)] transition hover:bg-white/5"
            >
              <Github size={16} aria-hidden="true" />
              Repository
            </a>
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 border border-border px-4 font-mono text-xs uppercase text-slate-300 transition hover:border-cyan hover:text-cyan"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Live site
              </a>
            ) : null}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
          className="space-y-5"
        >
          <ProjectVisual project={project} />
          <ProjectCard project={project} />
        </motion.div>
      </div>
    </section>
  );
};

const ProjectVisual = ({ project }: { project: Project }) => {
  if (project.visual === 'defense-flow') {
    return <DefenseFlowVisual />;
  }

  if (project.visual === 'breach-monitor') {
    return <BreachMonitorVisual />;
  }

  if (project.visual === 'cargo-build') {
    return <CargoBuildVisual />;
  }

  return <BlueprintVisual />;
};

const DefenseFlowVisual = () => {
  const nodes = ['Request', 'CORS', 'Session', 'CSRF', 'Auth', 'RBAC', 'Rate', 'Audit'];

  return (
    <div className="terminal-shell relative overflow-hidden p-5">
      <div className="mb-4 flex items-center justify-between font-mono text-[0.68rem] uppercase text-muted">
        <span>request lifecycle</span>
        <span className="text-breach">threat neutralized</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {nodes.map((node, index) => (
          <div key={node} className="relative border border-border bg-void/70 p-3">
            <p className="font-mono text-[0.65rem] text-muted">0{index + 1}</p>
            <p className="font-mono text-xs uppercase text-slate-200">{node}</p>
            {index < nodes.length - 1 ? (
              <span className="absolute -right-3 top-1/2 hidden h-px w-3 bg-[var(--project-accent)] sm:block" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

const BreachMonitorVisual = () => (
  <div className="terminal-shell relative overflow-hidden p-5">
    <div className="mb-4 flex items-center justify-between font-mono text-[0.68rem] uppercase text-cyan">
      <span>investigation room</span>
      <span>packet trace active</span>
    </div>
    <div className="grid gap-3 sm:grid-cols-[1fr_0.7fr]">
      <div className="min-h-48 border border-cyan/30 bg-cyan/5 p-4">
        <div className="mb-4 h-24 border border-cyan/30 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.28),transparent_45%)]" />
        <p className="font-mono text-xs leading-6 text-slate-300">
          INCIDENT / AUTH-207
          <br />
          entry: reused credential
          <br />
          status: reconstructing timeline
        </p>
      </div>
      <div className="space-y-3">
        {['log fragment', 'old token', 'network burst'].map((item) => (
          <div key={item} className="border border-border bg-void/70 p-3 font-mono text-[0.68rem] uppercase text-muted">
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CargoBuildVisual = () => (
  <div className="terminal-shell overflow-hidden p-5">
    <div className="mb-4 flex items-center justify-between font-mono text-[0.68rem] uppercase text-amber">
      <span>cargo output</span>
      <span>release profile</span>
    </div>
    <div className="space-y-2 font-mono text-xs text-slate-300">
      <p>
        <span className="text-muted">$</span> cargo build --release
      </p>
      <p className="text-amber">Compiling precision modules</p>
      <p>Checking zero-cost abstractions</p>
      <p className="text-hacker">Finished optimized target</p>
    </div>
  </div>
);

const BlueprintVisual = () => (
  <div className="terminal-shell overflow-hidden p-5">
    <div className="mb-4 flex items-center justify-between font-mono text-[0.68rem] uppercase text-hacker">
      <span>typed blueprint</span>
      <span>interface stable</span>
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      {['Data model', 'Runtime contract', 'Scene shell', 'Audit boundary'].map((item) => (
        <div key={item} className="border border-hacker/30 bg-hacker/5 p-4">
          <p className="font-mono text-xs uppercase text-slate-200">{item}</p>
          <div className="mt-3 h-1 bg-hacker/40" />
        </div>
      ))}
    </div>
  </div>
);
