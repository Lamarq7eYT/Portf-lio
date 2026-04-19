import { type ReactNode, useEffect, useMemo, useState } from 'react';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';
import Play from 'lucide-react/dist/esm/icons/play';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw';
import ShieldAlert from 'lucide-react/dist/esm/icons/shield-alert';
import Terminal from 'lucide-react/dist/esm/icons/terminal';
import type { Project } from '../../data/projects';
import { SeverityBadge } from '../ui/SeverityBadge';

type ProjectCardProps = {
  project: Project;
};

const scenarioMap = {
  clean: {
    label: 'Normal login',
    score: 12,
    verdict: 'ALLOW',
    lines: ['CORS verified', 'Session signed', 'CSRF token valid', 'Rate limit clear', 'Audit event written']
  },
  injection: {
    label: 'Encoded SQL payload',
    score: 86,
    verdict: 'BLOCK',
    lines: ['Payload normalized by native Rust module', 'Suspicious token chain detected', 'Risk score escalated', 'Request blocked']
  },
  burst: {
    label: 'Credential stuffing burst',
    score: 74,
    verdict: 'CHALLENGE',
    lines: ['IP velocity exceeded', 'Account spray pattern detected', 'Adaptive throttle enabled', 'Step-up challenge required']
  }
} as const;

const clueData = [
  {
    id: 'logs',
    label: 'Server logs',
    result: 'Repeated failed auth attempts from a rotating IP cluster.'
  },
  {
    id: 'session',
    label: 'Session file',
    result: 'A stale token appears after password rotation. The breach window narrows.'
  },
  {
    id: 'board',
    label: 'Incident board',
    result: 'Credential stuffing led to one reused password, then lateral access.'
  }
];

const cargoSteps = [
  'Compiling aegishub-core v0.1.0',
  'Checking memory safety gates',
  'Optimizing release profile',
  'Finished release [optimized] target in 2.41s'
];

const blueprintModules = ['AuthGate', 'ProjectScene', 'RuntimeDemo', 'AuditTrail'];

export const ProjectCard = ({ project }: ProjectCardProps) => {
  if (project.demo.kind === 'aegis-simulator') {
    return <AegisDemo project={project} />;
  }

  if (project.demo.kind === 'breach-room') {
    return <BreachDemo project={project} />;
  }

  if (project.demo.kind === 'cargo-terminal') {
    return <CargoDemo project={project} />;
  }

  return <BlueprintDemo project={project} />;
};

const DemoShell = ({
  project,
  children
}: {
  project: Project;
  children: ReactNode;
}) => (
  <div className="terminal-shell relative overflow-hidden p-4">
    <div className="mb-4 flex items-start justify-between gap-4 border-b border-border pb-3">
      <div>
        <p className="font-mono text-[0.68rem] uppercase text-hacker">embedded demo</p>
        <h4 className="mt-1 font-display text-xl font-bold text-slate-100">{project.demo.title}</h4>
      </div>
      <project.icon size={22} className="shrink-0 text-[var(--project-accent)]" aria-hidden="true" />
    </div>
    <p className="mb-4 text-sm leading-6 text-slate-400">{project.demo.description}</p>
    {children}
  </div>
);

const AegisDemo = ({ project }: ProjectCardProps) => {
  const [scenario, setScenario] = useState<keyof typeof scenarioMap>('clean');
  const current = scenarioMap[scenario];
  const severity = current.score >= 80 ? 'high' : current.score >= 60 ? 'medium' : 'ok';

  return (
    <DemoShell project={project}>
      <div className="mb-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(scenarioMap) as Array<keyof typeof scenarioMap>).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setScenario(key)}
            className={`border px-3 py-2 text-left font-mono text-[0.68rem] uppercase transition ${
              scenario === key ? 'border-[var(--project-accent)] text-white' : 'border-border text-muted hover:border-cyan'
            }`}
          >
            {scenarioMap[key].label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
        <div className="grid place-items-center border border-border bg-void/60 p-4">
          <div className="text-center">
            <p className="font-mono text-[0.68rem] uppercase text-muted">risk score</p>
            <p className="font-display text-5xl font-extrabold text-[var(--project-accent)]">{current.score}</p>
            <SeverityBadge severity={severity}>{current.verdict}</SeverityBadge>
          </div>
        </div>
        <div className="space-y-2 border border-border bg-void/60 p-4">
          {current.lines.map((line, index) => (
            <p key={line} className="font-mono text-xs text-slate-300">
              <span className="text-muted">0{index + 1}</span> <span className="text-hacker">OK</span> {line}
            </p>
          ))}
        </div>
      </div>
    </DemoShell>
  );
};

const BreachDemo = ({ project }: ProjectCardProps) => {
  const [activeClue, setActiveClue] = useState(clueData[0]);
  const confidence = activeClue.id === 'board' ? 92 : activeClue.id === 'session' ? 76 : 48;

  return (
    <DemoShell project={project}>
      <div className="grid gap-3 sm:grid-cols-[10rem_1fr]">
        <div className="space-y-2">
          {clueData.map((clue) => (
            <button
              key={clue.id}
              type="button"
              onClick={() => setActiveClue(clue)}
              className={`w-full border px-3 py-2 text-left font-mono text-[0.68rem] uppercase transition ${
                activeClue.id === clue.id ? 'border-cyan text-cyan' : 'border-border text-muted hover:border-cyan'
              }`}
            >
              {clue.label}
            </button>
          ))}
        </div>
        <div className="border border-cyan/30 bg-cyan/5 p-4">
          <p className="mb-3 font-mono text-[0.68rem] uppercase text-cyan">analysis monitor</p>
          <p className="min-h-16 text-sm leading-6 text-slate-300">{activeClue.result}</p>
          <div className="mt-4">
            <div className="mb-1 flex justify-between font-mono text-[0.68rem] uppercase text-muted">
              <span>timeline confidence</span>
              <span>{confidence}%</span>
            </div>
            <div className="h-1.5 bg-border">
              <div className="h-full bg-cyan transition-all" style={{ width: `${confidence}%` }} />
            </div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
};

const CargoDemo = ({ project }: ProjectCardProps) => {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>(['target: release']);

  useEffect(() => {
    if (!running) {
      return undefined;
    }

    setLogs(['cargo build --release']);
    let index = 0;
    const interval = window.setInterval(() => {
      setLogs((current) => [...current, cargoSteps[index]]);
      index += 1;

      if (index >= cargoSteps.length) {
        setRunning(false);
        window.clearInterval(interval);
      }
    }, 520);

    return () => window.clearInterval(interval);
  }, [running]);

  return (
    <DemoShell project={project}>
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => setRunning(true)}
          disabled={running}
          className="inline-flex h-9 items-center gap-2 border border-amber/60 px-3 font-mono text-[0.68rem] uppercase text-amber transition hover:bg-amber/10 disabled:cursor-wait disabled:opacity-60"
        >
          <Play size={14} aria-hidden="true" />
          Run
        </button>
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setLogs(['target: release']);
          }}
          className="grid h-9 w-9 place-items-center border border-border text-muted transition hover:border-amber hover:text-amber"
          aria-label="Reset cargo demo"
          title="Reset cargo demo"
        >
          <RotateCcw size={14} aria-hidden="true" />
        </button>
      </div>
      <div className="min-h-40 border border-border bg-void/70 p-4 font-mono text-xs text-slate-300">
        {logs.map((line, index) => (
          <p key={`${line}-${index}`} className={line.includes('Finished') ? 'text-hacker' : ''}>
            <span className="text-muted">$</span> {line}
          </p>
        ))}
        {running ? <p className="cursor-blink text-amber">compiling</p> : null}
      </div>
    </DemoShell>
  );
};

const BlueprintDemo = ({ project }: ProjectCardProps) => {
  const [enabled, setEnabled] = useState<string[]>(['ProjectScene', 'RuntimeDemo']);

  const interfaceCode = useMemo(() => {
    const fields = enabled.map((module) => `  ${module.charAt(0).toLowerCase()}${module.slice(1)}: ModuleConfig;`);
    return `interface LlewBlueprint {\n${fields.join('\n')}\n  status: 'draft' | 'ready';\n}`;
  }, [enabled]);

  return (
    <DemoShell project={project}>
      <div className="mb-4 flex flex-wrap gap-2">
        {blueprintModules.map((module) => {
          const active = enabled.includes(module);
          return (
            <button
              key={module}
              type="button"
              onClick={() =>
                setEnabled((current) =>
                  current.includes(module) ? current.filter((entry) => entry !== module) : [...current, module]
                )
              }
              className={`border px-3 py-2 font-mono text-[0.68rem] uppercase transition ${
                active ? 'border-hacker text-hacker' : 'border-border text-muted hover:border-hacker'
              }`}
            >
              {active ? <CheckCircle2 size={13} className="mr-1 inline" aria-hidden="true" /> : null}
              {module}
            </button>
          );
        })}
      </div>
      <pre className="overflow-x-auto border border-hacker/30 bg-void/70 p-4 font-mono text-xs leading-6 text-slate-300">
        <code>{interfaceCode}</code>
      </pre>
    </DemoShell>
  );
};

export const DemoStatus = ({ blocked }: { blocked: boolean }) => (
  <span className={`inline-flex items-center gap-2 font-mono text-xs ${blocked ? 'text-breach' : 'text-hacker'}`}>
    {blocked ? <ShieldAlert size={14} aria-hidden="true" /> : <Terminal size={14} aria-hidden="true" />}
    {blocked ? 'blocked' : 'running'}
  </span>
);
