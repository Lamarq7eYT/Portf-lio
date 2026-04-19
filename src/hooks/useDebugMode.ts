import { useEffect, useState } from 'react';

export const useDebugMode = () => {
  const [isDebugOpen, setIsDebugOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;

      if (isTyping) {
        return;
      }

      if (event.key.toLowerCase() === 'd') {
        setIsDebugOpen((open) => !open);
      }

      if (event.key === 'Escape') {
        setIsDebugOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { isDebugOpen, setIsDebugOpen };
};
