import { useCallback, useRef, useState } from 'react';
import CircleDot from 'lucide-react/dist/esm/icons/circle-dot';

type TimelineScrubberProps = {
  progress: number;
  frame: number;
  activeLabel: string;
  onScrub: (progress: number) => void;
};

const formatFrame = (frame: number) => String(frame).padStart(3, '0');

export const TimelineScrubber = ({ progress, frame, activeLabel, onScrub }: TimelineScrubberProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const scrubFromClientX = useCallback(
    (clientX: number) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }

      const nextProgress = (clientX - rect.left) / rect.width;
      onScrub(nextProgress);
    },
    [onScrub]
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    scrubFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) {
      return;
    }

    scrubFromClientX(event.clientX);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] hidden h-10 border-t border-border bg-void/95 px-4 font-mono text-[0.7rem] text-slate-300 backdrop-blur md:flex">
      <div className="flex w-full items-center gap-4">
        <div className="w-28 text-hacker">[FRAME {formatFrame(frame)}/999]</div>
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="Scroll timeline"
          aria-valuemin={0}
          aria-valuemax={999}
          aria-valuenow={frame}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              onScrub(progress - 0.04);
            }

            if (event.key === 'ArrowRight') {
              event.preventDefault();
              onScrub(progress + 0.04);
            }

            if (event.key === 'Home') {
              event.preventDefault();
              onScrub(0);
            }

            if (event.key === 'End') {
              event.preventDefault();
              onScrub(1);
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
          className="relative h-6 flex-1 cursor-ew-resize touch-none"
        >
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border" />
          <div className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-hacker" style={{ width: `${progress * 100}%` }} />
          <div
            className="absolute top-1/2 grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center text-hacker"
            style={{ left: `${progress * 100}%` }}
          >
            <CircleDot size={18} aria-hidden="true" />
          </div>
        </div>
        <div className="w-44 truncate text-right uppercase text-muted">{activeLabel}</div>
      </div>
    </div>
  );
};
