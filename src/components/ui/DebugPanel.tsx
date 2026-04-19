import X from 'lucide-react/dist/esm/icons/x';
import { getProjectById } from '../../data/projects';

type DebugPanelProps = {
  open: boolean;
  activeProjectId: string | null;
  activeLabel: string;
  onClose: () => void;
};

export const DebugPanel = ({ open, activeProjectId, activeLabel, onClose }: DebugPanelProps) => {
  if (!open) {
    return null;
  }

  const project = activeProjectId ? getProjectById(activeProjectId) : undefined;

  return (
    <aside className="fixed bottom-16 right-4 z-[80] w-[min(28rem,calc(100vw-2rem))] border border-hacker/40 bg-void/95 p-4 font-mono text-xs text-slate-300 shadow-neon backdrop-blur md:bottom-14">
      <div className="mb-3 flex items-center justify-between gap-4 border-b border-border pb-2">
        <div>
          <p className="text-hacker">DEBUG MODE</p>
          <p className="text-[0.68rem] uppercase text-muted">{activeLabel}</p>
        </div>
        <button
          type="button"
          aria-label="Close debug panel"
          title="Close debug panel"
          onClick={onClose}
          className="grid h-8 w-8 place-items-center border border-border text-muted transition hover:border-hacker hover:text-hacker"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      {project ? (
        <div className="space-y-3">
          <p>
            <span className="text-cyan">project:</span> {project.name}
          </p>
          <p>
            <span className="text-cyan">stack:</span> {project.debug.stack}
          </p>
          <p>
            <span className="text-cyan">architecture:</span> {project.debug.architecture}
          </p>
          <div>
            <p className="mb-1 text-cyan">key decisions:</p>
            <ul className="space-y-1 text-muted">
              {project.debug.keyDecisions.map((decision) => (
                <li key={decision}>- {decision}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-1 text-cyan">challenges:</p>
            <ul className="space-y-1 text-muted">
              {project.debug.challenges.map((challenge) => (
                <li key={challenge}>- {challenge}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-muted">Scroll into a project scene to inspect runtime metadata.</p>
      )}
    </aside>
  );
};
