type Severity = 'low' | 'medium' | 'high' | 'ok';

type SeverityBadgeProps = {
  severity: Severity;
  children: string;
};

const severityClasses: Record<Severity, string> = {
  low: 'border-cyan/50 bg-cyan/10 text-cyan',
  medium: 'border-amber/60 bg-amber/10 text-amber',
  high: 'border-breach/60 bg-breach/10 text-breach',
  ok: 'border-hacker/60 bg-hacker/10 text-hacker'
};

export const SeverityBadge = ({ severity, children }: SeverityBadgeProps) => (
  <span
    className={`inline-flex h-7 items-center border px-2.5 font-mono text-[0.68rem] uppercase ${severityClasses[severity]}`}
  >
    {children}
  </span>
);
