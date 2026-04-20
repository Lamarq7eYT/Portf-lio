import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';
import X from 'lucide-react/dist/esm/icons/x';
import { BootSequence } from './components/BootSequence/BootSequence';
import { Hero } from './components/Hero/Hero';
import { DebugPanel } from './components/ui/DebugPanel';
import { GlobalEffects } from './components/ui/GlobalEffects';
import { PerformanceToggle } from './components/ui/PerformanceToggle';
import { TimelineScrubber } from './components/ui/TimelineScrubber';
import { useDebugMode } from './hooks/useDebugMode';
import { useGlitchEffect } from './hooks/useGlitchEffect';
import { usePerformanceMode } from './hooks/usePerformanceMode';
import { useScrollTimeline } from './hooks/useScrollTimeline';

const About = lazy(() => import('./components/About/About').then((module) => ({ default: module.About })));
const Projects = lazy(() => import('./components/Projects/Projects').then((module) => ({ default: module.Projects })));
const LiveCode = lazy(() => import('./components/LiveCode/LiveCode').then((module) => ({ default: module.LiveCode })));
const Contact = lazy(() => import('./components/Contact/Contact').then((module) => ({ default: module.Contact })));

const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export const App = () => {
  const performance = usePerformanceMode();
  const timeline = useScrollTimeline();
  const debug = useDebugMode();
  const glitch = useGlitchEffect();
  const triggerGlitch = glitch.trigger;
  const [bootComplete, setBootComplete] = useState(
    () => window.sessionStorage.getItem('llew-boot-complete') === 'true' || Boolean(window.location.hash)
  );
  const [mobileNoticeDismissed, setMobileNoticeDismissed] = useState(false);
  const [rootAccess, setRootAccess] = useState(false);
  const [aegisPanel, setAegisPanel] = useState(false);
  const [niceTry, setNiceTry] = useState(false);
  const [heroClicks, setHeroClicks] = useState(0);

  const completeBoot = useCallback(() => {
    window.sessionStorage.setItem('llew-boot-complete', 'true');
    setBootComplete(true);
    triggerGlitch({ label: 'RUNTIME READY', intensity: 'hard', duration: 520 });
  }, [triggerGlitch]);

  useEffect(() => {
    let konamiIndex = 0;
    let typed = '';

    const handleKeys = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;

      if (!isTyping) {
        const expected = konami[konamiIndex];
        const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
        konamiIndex = key === expected ? konamiIndex + 1 : key === konami[0] ? 1 : 0;

        if (konamiIndex === konami.length) {
          konamiIndex = 0;
          setRootAccess(true);
          triggerGlitch({ label: 'ROOT ACCESS GRANTED', intensity: 'hard', duration: 720 });
          void import('canvas-confetti').then(({ default: confetti }) => {
            void confetti({
              particleCount: 120,
              spread: 70,
              colors: ['#00ff88', '#00e5ff'],
              origin: { y: 0.72 }
            });
          });
        }
      }

      if (event.key.length === 1) {
        typed = `${typed}${event.key.toUpperCase()}`.slice(-5);
        if (typed === 'AEGIS') {
          setAegisPanel(true);
          triggerGlitch({ label: 'AEGISCORE ONLINE', intensity: 'soft', duration: 420 });
        }
      }
    };

    window.addEventListener('keydown', handleKeys);

    return () => window.removeEventListener('keydown', handleKeys);
  }, [triggerGlitch]);

  useEffect(() => {
    if (timeline.activeLabel === 'Final frame') {
      triggerGlitch({ label: 'FINAL FRAME', intensity: 'soft', duration: 380 });
    }
  }, [timeline.activeLabel, triggerGlitch]);

  useEffect(() => {
    if (!bootComplete || !window.location.hash) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      document.querySelector(window.location.hash)?.scrollIntoView({ block: 'start' });
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [bootComplete]);

  const handleHeroNameClick = useCallback(() => {
    setHeroClicks((clicks) => {
      const next = clicks + 1;
      if (next >= 7) {
        triggerGlitch({ label: 'NICE TRY', intensity: 'hard', duration: 900 });
        setNiceTry(true);
        window.setTimeout(() => setNiceTry(false), 3000);
        return 0;
      }

      return next;
    });
  }, [triggerGlitch]);

  const loadingFallback = useMemo(
    () => (
      <div className="mx-auto max-w-6xl px-5 py-16 font-mono text-xs uppercase text-muted md:px-10">
        Loading scene chunk...
      </div>
    ),
    []
  );

  return (
    <>
      <GlobalEffects
        glitchActive={glitch.active}
        glitchLabel={glitch.label}
        glitchIntensity={glitch.intensity}
        effectsEnabled={performance.effectsEnabled}
      />

      <PerformanceToggle
        mode={performance.mode}
        reducedMotion={performance.reducedMotion}
        onToggle={performance.toggleMode}
      />

      {performance.isMobile && !mobileNoticeDismissed ? (
        <div className="fixed inset-x-3 top-16 z-[76] border border-cyan/40 bg-void/95 p-3 font-mono text-xs text-slate-300 shadow-cyan backdrop-blur md:hidden">
          <div className="flex items-start gap-3">
            <p className="flex-1">
              This experience is fully responsive, but the cinematic WebGL timeline is best experienced on desktop.
            </p>
            <button
              type="button"
              aria-label="Dismiss mobile notice"
              title="Dismiss mobile notice"
              onClick={() => setMobileNoticeDismissed(true)}
              className="grid h-7 w-7 shrink-0 place-items-center border border-border text-muted"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      <main>
        <Hero
          mode={performance.mode}
          reducedMotion={performance.reducedMotion}
          isMobile={performance.isMobile}
          onNameClick={handleHeroNameClick}
        />
        <Suspense fallback={loadingFallback}>
          <About />
          <Projects />
          <LiveCode reducedMotion={performance.reducedMotion} />
          <Contact reducedMotion={performance.reducedMotion} />
        </Suspense>
      </main>

      <TimelineScrubber
        progress={timeline.progress}
        frame={timeline.frame}
        activeLabel={timeline.activeLabel}
        onScrub={timeline.scrubTo}
      />

      <DebugPanel
        open={debug.isDebugOpen}
        activeLabel={timeline.activeLabel}
        activeProjectId={timeline.activeProjectId}
        onClose={() => debug.setIsDebugOpen(false)}
      />

      {aegisPanel ? (
        <div className="fixed right-4 top-20 z-[82] w-[min(23rem,calc(100vw-2rem))] border border-hacker/50 bg-void/95 p-4 font-mono text-xs text-slate-300 shadow-neon">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-hacker">AegisCore status panel</p>
            <button
              type="button"
              aria-label="Close AegisCore panel"
              title="Close AegisCore panel"
              onClick={() => setAegisPanel(false)}
              className="grid h-7 w-7 place-items-center border border-border text-muted"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
          {['System active', 'No threats detected', 'Session protected'].map((line) => (
            <p key={line} className="flex items-center gap-2 py-1">
              <CheckCircle2 size={14} className="text-hacker" aria-hidden="true" />
              {line}
            </p>
          ))}
        </div>
      ) : null}

      {rootAccess ? (
        <div className="fixed left-4 top-20 z-[82] border border-cyan/50 bg-void/95 p-4 font-mono text-xs text-cyan shadow-cyan">
          ACCESS LEVEL ROOT GRANTED / secret projects remain classified
        </div>
      ) : null}

      {niceTry ? (
        <div className="fixed bottom-14 left-1/2 z-[82] -translate-x-1/2 border border-hacker/50 bg-void/95 px-4 py-2 font-mono text-xs text-hacker shadow-neon">
          nice try
        </div>
      ) : null}

      {!bootComplete ? <BootSequence reducedMotion={performance.reducedMotion} onComplete={completeBoot} /> : null}
    </>
  );
};
