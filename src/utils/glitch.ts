export const GLITCH_EVENT = 'llew:glitch';

export type GlitchEventDetail = {
  intensity?: 'soft' | 'hard';
  duration?: number;
  label?: string;
};

export const fireGlitch = (detail: GlitchEventDetail = {}) => {
  window.dispatchEvent(new CustomEvent<GlitchEventDetail>(GLITCH_EVENT, { detail }));
};
