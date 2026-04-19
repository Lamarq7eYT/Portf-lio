import { useCallback, useEffect, useMemo, useState } from 'react';
import './BootSequence.css';

type BootSequenceProps = {
  reducedMotion: boolean;
  onComplete: () => void;
};

const bootLines = [
  '[ SYS ] Initializing kernel.....................OK',
  '[ NET ] Handshake secured......................OK',
  '[ MEM ] Allocating identity buffer.............OK',
  '[ ART ] Loading frame-by-frame renderer........OK',
  '[ SEC ] AegisCore modules detected.............OK',
  '[ USR ] Identity resolved: Llew.................OK',
  '> Press any key to begin.'
];

export const BootSequence = ({ reducedMotion, onComplete }: BootSequenceProps) => {
  const [visibleLines, setVisibleLines] = useState<string[]>(() => (reducedMotion ? bootLines : ['']));
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  const finishedTyping = useMemo(
    () => reducedMotion || (lineIndex >= bootLines.length - 1 && visibleLines[bootLines.length - 1] === bootLines[bootLines.length - 1]),
    [lineIndex, reducedMotion, visibleLines]
  );

  const exitBoot = useCallback(() => {
    if (exiting) {
      return;
    }

    if (!finishedTyping) {
      setVisibleLines(bootLines);
    }

    setExiting(true);
    window.setTimeout(onComplete, reducedMotion ? 80 : 560);
  }, [exiting, finishedTyping, onComplete, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || finishedTyping || exiting) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const currentLine = bootLines[lineIndex];
      const nextText = currentLine.slice(0, charIndex + 1);

      setVisibleLines((lines) => {
        const next = [...lines];
        next[lineIndex] = nextText;
        return next;
      });

      if (charIndex + 1 >= currentLine.length) {
        if (lineIndex + 1 < bootLines.length) {
          setLineIndex((index) => index + 1);
          setCharIndex(0);
          setVisibleLines((lines) => [...lines, '']);
        }
      } else {
        setCharIndex((index) => index + 1);
      }
    }, lineIndex === bootLines.length - 1 ? 24 : 16);

    return () => window.clearTimeout(timeout);
  }, [charIndex, exiting, finishedTyping, lineIndex, reducedMotion]);

  useEffect(() => {
    const handleStart = () => exitBoot();

    window.addEventListener('keydown', handleStart);
    window.addEventListener('click', handleStart);

    return () => {
      window.removeEventListener('keydown', handleStart);
      window.removeEventListener('click', handleStart);
    };
  }, [exitBoot]);

  useEffect(() => {
    if (reducedMotion || !finishedTyping || exiting) {
      return undefined;
    }

    const timeout = window.setTimeout(exitBoot, 1250);

    return () => window.clearTimeout(timeout);
  }, [exitBoot, exiting, finishedTyping, reducedMotion]);

  return (
    <section className={`boot-sequence ${exiting ? 'boot-exit' : ''}`} aria-label="System boot sequence">
      <div className="boot-terminal">
        <div className="boot-terminal__bar">
          <span className="boot-terminal__dot" aria-hidden="true" />
          <span>LLEW_OS / cinematic runtime</span>
        </div>
        <div aria-live="polite">
          {visibleLines.map((line, index) => (
            <p
              key={`${line}-${index}`}
              className={`boot-terminal__line ${finishedTyping && index === bootLines.length - 1 ? 'cursor-blink' : ''}`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
