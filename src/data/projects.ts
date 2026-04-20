import type { LucideIcon } from 'lucide-react';
import Boxes from 'lucide-react/dist/esm/icons/boxes';
import Braces from 'lucide-react/dist/esm/icons/braces';
import Cpu from 'lucide-react/dist/esm/icons/cpu';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';

export type ProjectDemoKind = 'aegis-simulator' | 'breach-room' | 'cargo-terminal' | 'typescript-blueprint';

export type Project = {
  id: string;
  name: string;
  repo: string;
  live?: string;
  tagline: string;
  accentColor: string;
  narrativeHook: string;
  techBadges: string[];
  highlights: string[];
  visual: 'defense-flow' | 'breach-monitor' | 'cargo-build' | 'blueprint';
  icon: LucideIcon;
  demo: {
    kind: ProjectDemoKind;
    title: string;
    description: string;
  };
  debug: {
    stack: string;
    architecture: string;
    keyDecisions: string[];
    challenges: string[];
  };
};

export const projects: Project[] = [
  {
    id: 'aegiscore',
    name: 'AegisCore',
    repo: 'https://github.com/Lamarq7eYT/AegisCore',
    tagline: 'Hybrid TypeScript + Rust web defense for applied security.',
    accentColor: '#ff2d55',
    narrativeHook:
      'The system was under pressure: credential stuffing, brute force, session theft. Then AegisCore entered the request path.',
    techBadges: ['TypeScript', 'Rust', 'Node.js', 'Fastify', 'React', 'PostgreSQL', 'Redis', 'N-API', 'Docker'],
    highlights: [
      'Monorepo architecture across apps, packages, native modules, docs, and tests.',
      'Rust modules through N-API for payload normalization, request inspection, and risk scoring.',
      'Multidimensional rate limiting, CSRF, RBAC/ABAC, session defense, and audit trails.',
      'Threat modeling documented as a first-class engineering artifact.'
    ],
    visual: 'defense-flow',
    icon: ShieldCheck,
    demo: {
      kind: 'aegis-simulator',
      title: 'Run defense simulation',
      description: 'Send a mock request through the AegisCore pipeline and watch the risk score decide the response.'
    },
    debug: {
      stack: 'TypeScript 80% / Rust 14% / JavaScript 2.5% / CSS 2.1%',
      architecture: 'Monorepo: apps / packages / native / docs / tests',
      keyDecisions: [
        'Rust via N-API for critical performance modules.',
        'TypeScript as the platform base for maintainability and developer velocity.',
        'Fastify over Express for lower overhead and schema-first routing.'
      ],
      challenges: [
        'Bridge TypeScript and Rust without turning the native boundary into a bottleneck.',
        'Prevent IDOR/BOLA flaws in endpoints that cross user-owned resources.',
        'Adapt throttling in real time from behavioral risk signals.'
      ]
    }
  },
  {
    id: 'hackerpage',
    name: 'BreachRoom / HackerPage',
    repo: 'https://github.com/Lamarq7eYT/HackerPage',
    live: 'https://lamarq7eyt.github.io/HackerPage/',
    tagline: 'An immersive investigative room about hacker history and incident storytelling.',
    accentColor: '#00e5ff',
    narrativeHook:
      'What if you could step inside a security incident instead of reading about it from the outside?',
    techBadges: ['Three.js', 'TypeScript', 'HTML5', 'CSS3', 'GitHub Pages'],
    highlights: [
      'Immersive browser scene built around Three.js.',
      'Historical security narrative framed through an investigative environment.',
      'A room-like interface with monitors, overlays, files, and terminal fragments.',
      'The result of two years studying 3D, TypeScript, and narrative design.'
    ],
    visual: 'breach-monitor',
    icon: Cpu,
    demo: {
      kind: 'breach-room',
      title: 'Enter investigation demo',
      description: 'Open a compact incident board, inspect clues, and reconstruct the breach sequence.'
    },
    debug: {
      stack: 'HTML 62% / TypeScript 38%',
      architecture: 'breachroom-scene static Three.js layer plus TSX-style interface components',
      keyDecisions: [
        'Moved from Spline to native Three.js for stronger authorship and control.',
        'Kept deployment static on GitHub Pages to avoid unnecessary backend weight.'
      ],
      challenges: [
        'Build an investigative atmosphere with CSS and Three.js instead of static imagery.',
        'Make hacker history accessible without glamorizing attacks.'
      ]
    }
  },
  {
    id: 'aegishub',
    name: 'AegisHub',
    repo: 'https://github.com/Lamarq7eYT/AegisHub',
    tagline: 'Rust. Performance. Precision. No compromise.',
    accentColor: '#ffb800',
    narrativeHook: 'Where JavaScript stops being enough, Rust takes control.',
    techBadges: ['Rust', 'CLI', 'Systems', 'Memory Safety'],
    highlights: [
      'Built in Rust with a systems-programming mindset.',
      'Focused on performance, memory safety, and deterministic behavior.',
      'A compact foundation for tooling that values speed and precision.'
    ],
    visual: 'cargo-build',
    icon: Boxes,
    demo: {
      kind: 'cargo-terminal',
      title: 'Run release build',
      description: 'Start a simulated cargo build and watch the compiler pipeline resolve.'
    },
    debug: {
      stack: 'Rust 100%',
      architecture: 'Single-language systems project with release-oriented build discipline',
      keyDecisions: [
        'Use Rust for low-level control and memory safety.',
        'Keep the project narrow and performance-focused.'
      ],
      challenges: [
        'Balance raw speed with clean abstractions.',
        'Keep the tooling precise without overbuilding the first version.'
      ]
    }
  },
  {
    id: 'polybech',
    name: 'Polybech',
    repo: 'https://github.com/Lamarq7eYT/Polybech',
    tagline: 'A TypeScript engineering system for turning ideas into stable, scalable product architecture.',
    accentColor: '#00ff88',
    narrativeHook:
      'Polybech is the discipline layer: the place where raw ideas become typed contracts, clean modules, reusable flows, and a project shape that can keep growing without losing control.',
    techBadges: ['TypeScript', 'Architecture', 'Domain Modeling', 'DX', 'Typed Contracts', 'Modular Systems'],
    highlights: [
      'Designed as a serious TypeScript foundation, not a throwaway scaffold.',
      'Focuses on reusable architecture: contracts, module boundaries, data flow, runtime states, and developer ergonomics.',
      "Represents Llew's methodical side: planning the system before the interface starts moving.",
      'Built to support bigger ideas with clear structure instead of letting complexity spread everywhere.',
      'One of the strongest signals that the craft is not only visual; it is architectural.'
    ],
    visual: 'blueprint',
    icon: Braces,
    demo: {
      kind: 'typescript-blueprint',
      title: 'Assemble Polybech architecture',
      description:
        'Toggle architectural modules and watch Polybech generate a typed product blueprint with contracts, boundaries, runtime state, and implementation priority.'
    },
    debug: {
      stack: 'TypeScript 100% / architecture-first project design',
      architecture: 'Typed contracts, modular boundaries, state surfaces, reusable flows, and DX-oriented project structure',
      keyDecisions: [
        'Treat TypeScript as an architecture language, not only a safety net.',
        'Make boundaries explicit so future features can be added without rewriting the core.',
        'Prioritize readable contracts and developer experience before visual polish.',
        'Model runtime states early so the product can scale with less guesswork.'
      ],
      challenges: [
        'Keep the project flexible without letting abstraction become noise.',
        'Build enough structure for growth while still staying fast to iterate.',
        'Turn a strong internal architecture into a story that portfolio visitors can understand quickly.',
        'Show that one of the best projects can be quiet, technical, and deeply intentional.'
      ]
    }
  }
];

export const getProjectById = (id: string) => projects.find((project) => project.id === id);
