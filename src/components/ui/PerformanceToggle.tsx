import Wind from 'lucide-react/dist/esm/icons/wind';
import Zap from 'lucide-react/dist/esm/icons/zap';
import type { PerformanceMode } from '../../hooks/usePerformanceMode';

type PerformanceToggleProps = {
  mode: PerformanceMode;
  reducedMotion: boolean;
  onToggle: () => void;
};

export const PerformanceToggle = ({ mode, reducedMotion, onToggle }: PerformanceToggleProps) => {
  const cinematic = mode === 'cinematic';
  const label = cinematic ? 'Cinematic mode' : 'Fluid mode';
  const Icon = cinematic ? Zap : Wind;

  return (
    <button
      type="button"
      aria-label={`${label}. ${reducedMotion ? 'Reduced motion is active.' : 'Toggle visual performance mode.'}`}
      title={`${label}${reducedMotion ? ' - reduced motion active' : ''}`}
      onClick={onToggle}
      disabled={reducedMotion}
      className="fixed right-4 top-4 z-[75] grid h-11 w-11 place-items-center border border-border bg-void/85 text-hacker shadow-neon backdrop-blur transition hover:border-hacker disabled:cursor-not-allowed disabled:text-muted disabled:shadow-none"
    >
      <Icon size={20} aria-hidden="true" />
    </button>
  );
};
