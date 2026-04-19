import { useEffect, useRef, useState } from 'react';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { CodeSnippet } from '../../data/codeSnippets';
import { SyntaxHighlighter } from '../../utils/syntaxHighlighter';

type TypedSnippetProps = {
  snippet: CodeSnippet;
  reducedMotion: boolean;
};

export const TypedSnippet = ({ snippet, reducedMotion }: TypedSnippetProps) => {
  const [display, setDisplay] = useState(reducedMotion ? snippet.code : '');
  const [flash, setFlash] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    if (reducedMotion) {
      setDisplay(snippet.code);
      return undefined;
    }

    let index = 0;
    let paused = false;
    let typoDone = false;
    const typoStart = snippet.typo ? snippet.code.indexOf(snippet.typo.match) : -1;
    const typoEnd = typoStart >= 0 && snippet.typo ? typoStart + snippet.typo.match.length : -1;

    setDisplay('');
    setFlash(false);

    const interval = window.setInterval(() => {
      if (paused) {
        return;
      }

      if (snippet.typo && !typoDone && index === typoEnd) {
        paused = true;
        typoDone = true;
        setDisplay(`${snippet.code.slice(0, typoStart)}${snippet.typo.wrong}`);
        setFlash(true);
        timeoutRef.current = window.setTimeout(() => {
          setDisplay(snippet.code.slice(0, index));
          setFlash(false);
          paused = false;
        }, 420);
        return;
      }

      index += 1;
      setDisplay(snippet.code.slice(0, index));

      if (index >= snippet.code.length) {
        window.clearInterval(interval);
      }
    }, 32);

    return () => {
      window.clearInterval(interval);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [reducedMotion, snippet]);

  return (
    <div className={`code-window min-h-[28rem] overflow-hidden border border-border bg-void/80 ${flash ? 'typing-error' : ''}`}>
      <SyntaxHighlighter
        language={snippet.language}
        style={oneDark}
        customStyle={{ padding: '1.25rem', background: 'transparent', minHeight: '28rem' }}
        wrapLongLines
      >
        {display}
      </SyntaxHighlighter>
    </div>
  );
};
