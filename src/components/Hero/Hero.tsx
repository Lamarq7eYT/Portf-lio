import { useEffect, useRef } from 'react';
import ArrowDown from 'lucide-react/dist/esm/icons/arrow-down';
import type { PerformanceMode } from '../../hooks/usePerformanceMode';
import { setupGsap } from '../../utils/gsapSetup';
import { GlitchText } from '../ui/GlitchText';
import { HeroCanvas } from './HeroCanvas';

type HeroProps = {
  mode: PerformanceMode;
  reducedMotion: boolean;
  isMobile: boolean;
  onNameClick: () => void;
};

const letters = ['L', 'l', 'e', 'w'];

export const Hero = ({ mode, reducedMotion, isMobile, onNameClick }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion || isMobile) {
      return undefined;
    }

    const { gsap } = setupGsap();
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1
        }
      });

      timeline
        .fromTo(
          '.hero-letter',
          { opacity: 0, y: 110, filter: 'blur(18px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.08, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo(
          '.hero-subline',
          { opacity: 0, x: -80 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.25'
        )
        .fromTo(
          '.hero-tagline',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.25'
        )
        .fromTo(
          '.hero-grid',
          { opacity: 0.12, scale: 1.2 },
          { opacity: 0.42, scale: 1, duration: 1.2, ease: 'none' },
          0
        )
        .fromTo('.hero-scroll-cue', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.1');
    }, section);

    return () => context.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      data-timeline-section
      data-timeline-label="Identity reveal"
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-5 py-24 md:px-10"
    >
      <HeroCanvas enabled={!isMobile} mode={mode} />
      <div className="hero-grid grid-fade absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="font-mono text-xs uppercase text-hacker md:text-sm">LLEW_OS / frame-player online</div>
        <button
          type="button"
          onClick={onNameClick}
          aria-label="Trigger identity glitch"
          className="w-fit text-left font-display text-[clamp(5rem,17vw,14rem)] font-extrabold leading-none text-slate-100"
        >
          <GlitchText text="Llew">
            {letters.map((letter, index) => (
              <span key={`${letter}-${index}`} className="hero-letter inline-block">
                {letter}
              </span>
            ))}
          </GlitchText>
        </button>
        <div className="max-w-3xl space-y-4">
          <p className="hero-subline font-mono text-sm uppercase text-cyan md:text-lg">
            Full-stack dev / Motion / Security / 3D
          </p>
          <p className="hero-tagline text-balance font-display text-2xl font-bold leading-tight text-slate-200 md:text-5xl">
            Building digital experiences where code turns into narrative.
          </p>
        </div>
        <div className="hero-scroll-cue flex items-center gap-3 pt-8 font-mono text-xs uppercase text-muted">
          <ArrowDown size={16} aria-hidden="true" />
          <span>[ scroll to advance the frames ]</span>
        </div>
      </div>
    </section>
  );
};
