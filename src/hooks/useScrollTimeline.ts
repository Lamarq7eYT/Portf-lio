import { useCallback, useEffect, useMemo, useState } from 'react';

export type TimelineState = {
  progress: number;
  frame: number;
  activeLabel: string;
  activeProjectId: string | null;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const getDocumentProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) {
    return 0;
  }

  return clamp(window.scrollY / max);
};

const getActiveTimelineElement = () => {
  const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-timeline-section]'));
  const viewportAnchor = window.innerHeight * 0.5;

  return (
    elements.find((element) => {
      const rect = element.getBoundingClientRect();
      return rect.top <= viewportAnchor && rect.bottom >= viewportAnchor;
    }) ?? elements[0]
  );
};

export const useScrollTimeline = () => {
  const [state, setState] = useState<TimelineState>({
    progress: 0,
    frame: 0,
    activeLabel: 'Boot',
    activeProjectId: null
  });

  const update = useCallback(() => {
    const progress = getDocumentProgress();
    const active = getActiveTimelineElement();
    const label = active?.dataset.timelineLabel ?? 'Boot';
    const projectId = active?.dataset.projectId ?? null;

    setState({
      progress,
      frame: Math.round(progress * 999),
      activeLabel: label,
      activeProjectId: projectId
    });
  }, []);

  useEffect(() => {
    let raf = 0;
    const requestUpdate = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [update]);

  const scrubTo = useCallback((progress: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: clamp(progress) * Math.max(max, 0),
      behavior: 'smooth'
    });
  }, []);

  return useMemo(() => ({ ...state, scrubTo }), [state, scrubTo]);
};
