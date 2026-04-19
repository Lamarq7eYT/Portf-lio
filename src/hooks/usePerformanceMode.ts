import { useEffect, useMemo, useState } from 'react';

export type PerformanceMode = 'cinematic' | 'fluid';

const getReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const getIsMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

export const usePerformanceMode = () => {
  const [reducedMotion, setReducedMotion] = useState(getReducedMotion);
  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [mode, setMode] = useState<PerformanceMode>(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('llew-performance-mode') : null;
    if (stored === 'cinematic' || stored === 'fluid') {
      return stored;
    }

    return getReducedMotion() ? 'fluid' : 'cinematic';
  });

  useEffect(() => {
    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 767px)');

    const sync = () => {
      setReducedMotion(reduceQuery.matches);
      setIsMobile(mobileQuery.matches);
      if (reduceQuery.matches) {
        setMode('fluid');
      }
    };

    sync();
    reduceQuery.addEventListener('change', sync);
    mobileQuery.addEventListener('change', sync);

    return () => {
      reduceQuery.removeEventListener('change', sync);
      mobileQuery.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem('llew-performance-mode', mode);
    document.documentElement.dataset.performanceMode = mode;
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
  }, [mode, reducedMotion]);

  return useMemo(
    () => ({
      mode,
      setMode,
      toggleMode: () => setMode((current) => (current === 'cinematic' ? 'fluid' : 'cinematic')),
      reducedMotion,
      isMobile,
      effectsEnabled: mode === 'cinematic' && !reducedMotion && !isMobile
    }),
    [mode, reducedMotion, isMobile]
  );
};
