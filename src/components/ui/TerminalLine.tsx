type TerminalLineProps = {
  prefix?: string;
  status?: 'OK' | 'WARN' | 'BLOCK' | 'RUN' | 'TRACE';
  children: string;
  delay?: number;
};

const statusClass = {
  OK: 'text-hacker',
  WARN: 'text-amber',
  BLOCK: 'text-breach',
  RUN: 'text-cyan',
  TRACE: 'text-muted'
};

export const TerminalLine = ({ prefix = 'SYS', status = 'TRACE', children, delay = 0 }: TerminalLineProps) => (
  <p
    className="font-mono text-xs leading-relaxed text-slate-300 md:text-sm"
    style={{ animationDelay: `${delay}ms` }}
  >
    <span className="text-muted">[ {prefix} ]</span> <span>{children}</span>{' '}
    <span className={statusClass[status]}>{status}</span>
  </p>
);
