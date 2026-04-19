import { useState } from 'react';
import Code2 from 'lucide-react/dist/esm/icons/code-2';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw';
import { codeSnippets } from '../../data/codeSnippets';
import { TypedSnippet } from './TypedSnippet';

type LiveCodeProps = {
  reducedMotion: boolean;
};

export const LiveCode = ({ reducedMotion }: LiveCodeProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const activeSnippet = codeSnippets[activeIndex];

  return (
    <section
      id="live-code"
      data-timeline-section
      data-timeline-label="Live code"
      className="relative min-h-screen overflow-hidden px-5 py-24 md:px-10"
    >
      <div className="absolute inset-0 grid-fade opacity-20" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6">
          <p className="font-mono text-xs uppercase text-hacker">[live code area]</p>
          <h2 className="font-display text-4xl font-extrabold leading-tight text-slate-100 md:text-6xl">
            Watch the craft compile in real time.
          </h2>
          <p className="max-w-xl text-base leading-8 text-slate-300">
            These snippets are not filler. They mirror the way Llew thinks: security gates, rendering systems,
            native code, and the occasional typo caught before it ships.
          </p>

          <div className="flex flex-wrap gap-2">
            {codeSnippets.map((snippet, index) => (
              <button
                key={snippet.label}
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  setRunKey((key) => key + 1);
                }}
                className={`inline-flex h-10 items-center gap-2 border px-3 font-mono text-[0.68rem] uppercase transition ${
                  activeIndex === index ? 'border-hacker text-hacker' : 'border-border text-muted hover:border-cyan hover:text-cyan'
                }`}
              >
                <Code2 size={14} aria-hidden="true" />
                {snippet.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setRunKey((key) => key + 1)}
            className="grid h-10 w-10 place-items-center border border-border text-muted transition hover:border-hacker hover:text-hacker"
            aria-label="Replay active snippet"
            title="Replay active snippet"
          >
            <RotateCcw size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="terminal-shell overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-3 font-mono text-[0.68rem] uppercase text-muted">
            <span>{activeSnippet.label}</span>
            <span className="text-hacker">typing</span>
          </div>
          <TypedSnippet key={`${activeSnippet.label}-${runKey}`} snippet={activeSnippet} reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
};
