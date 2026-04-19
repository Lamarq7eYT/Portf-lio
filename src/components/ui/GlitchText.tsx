import { type ReactNode } from 'react';

type GlitchTextProps = {
  children: ReactNode;
  text?: string;
  active?: boolean;
  className?: string;
};

export const GlitchText = ({ children, text, active = false, className = '' }: GlitchTextProps) => (
  <span className={`glitch-text ${active ? 'is-active' : ''} ${className}`} data-text={text ?? String(children)}>
    {children}
  </span>
);
