import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';

SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('rust', rust);

export { SyntaxHighlighter };
