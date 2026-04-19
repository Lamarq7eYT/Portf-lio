import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right';
import Check from 'lucide-react/dist/esm/icons/check';
import Copy from 'lucide-react/dist/esm/icons/copy';
import Github from 'lucide-react/dist/esm/icons/github';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import Terminal from 'lucide-react/dist/esm/icons/terminal';
import { GlitchText } from '../ui/GlitchText';

type ContactProps = {
  reducedMotion: boolean;
};

const sequence = [
  '[ FRAME 999 / 999 ]',
  'The story reached this point.',
  'But it does not end on its own.',
  '"Want to continue this story with me?"'
];

export const Contact = ({ reducedMotion }: ContactProps) => {
  const [visibleCount, setVisibleCount] = useState(reducedMotion ? sequence.length : 0);
  const [revealed, setRevealed] = useState(false);
  const [discordCopied, setDiscordCopied] = useState(false);

  useEffect(() => {
    if (reducedMotion || visibleCount >= sequence.length) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setVisibleCount((count) => count + 1), visibleCount === 0 ? 220 : 820);

    return () => window.clearTimeout(timeout);
  }, [reducedMotion, visibleCount]);

  const revealContact = () => {
    setRevealed(true);

    if (!reducedMotion) {
      void confetti({
        particleCount: 72,
        spread: 58,
        scalar: 0.82,
        colors: ['#00ff88', '#00e5ff', '#ffb800'],
        origin: { y: 0.78 }
      });
    }
  };

  const copyDiscord = async () => {
    await navigator.clipboard.writeText('maxvib3official');
    setDiscordCopied(true);
    window.setTimeout(() => setDiscordCopied(false), 1800);
  };

  return (
    <section
      id="contact"
      data-timeline-section
      data-timeline-label="Final frame"
      className="relative flex min-h-screen items-center overflow-hidden px-5 py-24 md:px-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(0,255,136,0.16),transparent_28rem),linear-gradient(180deg,#090b0f,#020304)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hacker to-transparent" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <div className="mb-10 space-y-4 font-mono text-sm text-slate-300 md:text-base">
          {sequence.slice(0, visibleCount).map((line, index) => (
            <p key={line} className={index === 0 ? 'text-hacker' : ''}>
              {line}
            </p>
          ))}
        </div>

        {visibleCount >= sequence.length ? (
          <div className="space-y-7">
            <h2 className="font-display text-4xl font-extrabold leading-tight text-slate-100 md:text-7xl">
              <GlitchText text="Start collaboration">Start collaboration</GlitchText>
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300">
              Llew builds differently: secure systems with motion, atmosphere, and sharp technical intent.
            </p>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={revealContact}
                className="inline-flex h-12 items-center gap-3 border border-hacker px-5 font-mono text-xs uppercase text-hacker shadow-neon transition hover:bg-hacker/10"
              >
                <Terminal size={17} aria-hidden="true" />
                [ initialize contact ]
              </button>
            </div>

            {revealed ? (
              <div className="mx-auto max-w-xl space-y-3 border border-hacker/40 bg-void/90 p-5 text-left font-mono text-sm shadow-neon">
                <p className="mb-3 text-hacker">contact channel resolved</p>
                <a
                  href="https://github.com/Lamarq7eYT"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-4 border border-border bg-panel/70 px-4 py-3 text-slate-200 transition hover:border-hacker hover:text-hacker"
                >
                  <span className="inline-flex items-center gap-3">
                    <Github size={18} aria-hidden="true" />
                    github.com/Lamarq7eYT
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <div className="grid gap-2 border border-border bg-panel/70 p-4 text-slate-200 sm:grid-cols-[1fr_auto] sm:items-center">
                  <a
                    href="https://discord.com/users/760864815970254848"
                    target="_blank"
                    rel="noreferrer"
                    className="min-w-0 transition hover:text-cyan"
                  >
                    <span className="mb-1 flex items-center gap-3">
                      <MessageCircle size={18} aria-hidden="true" />
                      Discord
                    </span>
                    <span className="block truncate text-hacker">maxvib3official</span>
                    <span className="block truncate text-[0.68rem] text-muted">ID 760864815970254848</span>
                  </a>
                  <button
                    type="button"
                    onClick={copyDiscord}
                    className="inline-flex h-10 items-center justify-center gap-2 border border-border px-3 text-[0.68rem] uppercase text-muted transition hover:border-hacker hover:text-hacker"
                    aria-label="Copy Discord username"
                    title="Copy Discord username"
                  >
                    {discordCopied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                    {discordCopied ? 'copied' : 'copy'}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        <footer className="mt-16 font-mono text-[0.68rem] uppercase text-muted">
          Llew / Full-Stack Dev / Brazil / Building the future, line by line.
        </footer>
      </div>
    </section>
  );
};
