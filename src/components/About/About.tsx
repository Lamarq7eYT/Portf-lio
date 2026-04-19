import { motion } from 'framer-motion';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { skillCategories } from '../../data/skills';
import { SyntaxHighlighter } from '../../utils/syntaxHighlighter';
import { GlitchText } from '../ui/GlitchText';

const identityCode = `const llew = {
  role: 'Full-Stack Developer',
  education: 'Systems Analysis and Development student',
  location: 'Brazil',
  learning: ['3D Modeling', '3D Animation', 'Blender', 'WebGL'],
  focus: 'Digital experiences that mix code, design, and motion',
  currentlyBuilding: ['AegisCore', 'HackerPage', 'AegisHub'],
  available: true,
};`;

export const About = () => (
  <section
    id="about"
    data-timeline-section
    data-timeline-label="Identity object"
    className="relative min-h-screen overflow-hidden px-5 py-24 md:px-10"
  >
    <div className="absolute inset-0 grid-fade opacity-20" aria-hidden="true" />
    <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="space-y-6"
      >
        <div className="font-mono text-xs uppercase text-hacker">[identity buffer]</div>
        <h2 className="font-display text-4xl font-extrabold leading-tight text-slate-100 md:text-6xl">
          <GlitchText text="Who is Llew?">Who is Llew?</GlitchText>
        </h2>
        <p className="max-w-2xl text-balance text-base leading-8 text-slate-300 md:text-lg">
          A developer from Brazil who treats engineering as atmosphere: secure systems, kinetic interfaces,
          browser-native 3D, and the kind of polish that makes a project feel alive before a single button is pressed.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        className="terminal-shell code-window overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3 font-mono text-[0.68rem] uppercase text-muted">
          <span>identity.ts</span>
          <span className="text-hacker">resolved</span>
        </div>
        <SyntaxHighlighter
          language="typescript"
          style={oneDark}
          customStyle={{ padding: '1.25rem', background: 'transparent' }}
          wrapLongLines
        >
          {identityCode}
        </SyntaxHighlighter>
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="relative z-10 mx-auto mt-16 max-w-6xl"
    >
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-3">
        <h3 className="font-mono text-xs uppercase text-cyan">skill graph</h3>
        <span className="font-mono text-[0.68rem] uppercase text-muted">hover nodes to inspect</span>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: categoryIndex * 0.04 }}
            className="border border-border bg-panel/55 p-4 backdrop-blur"
          >
            <h4 className="mb-3 font-mono text-xs uppercase text-hacker">{category.label}</h4>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: skillIndex * 0.035 }}
                  className="border border-border bg-void/70 px-2.5 py-1.5 font-mono text-[0.7rem] text-slate-300 transition hover:border-hacker hover:text-hacker hover:shadow-neon"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);
