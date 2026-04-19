import { useCallback, useEffect, useRef, useState } from 'react';
import { GLITCH_EVENT, type GlitchEventDetail } from '../utils/glitch';

export const useGlitchEffect = () => {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('');
  const [intensity, setIntensity] = useState<'soft' | 'hard'>('soft');
  const timeout = useRef<number | null>(null);

  const trigger = useCallback((detail: GlitchEventDetail = {}) => {
    if (timeout.current) {
      window.clearTimeout(timeout.current);
    }

    setLabel(detail.label ?? '');
    setIntensity(detail.intensity ?? 'soft');
    setActive(true);

    timeout.current = window.setTimeout(() => setActive(false), detail.duration ?? 420);
  }, []);

  useEffect(() => {
    const listener = (event: Event) => {
      trigger((event as CustomEvent<GlitchEventDetail>).detail);
    };

    window.addEventListener(GLITCH_EVENT, listener);

    return () => {
      window.removeEventListener(GLITCH_EVENT, listener);
      if (timeout.current) {
        window.clearTimeout(timeout.current);
      }
    };
  }, [trigger]);

  return { active, label, intensity, trigger };
};
