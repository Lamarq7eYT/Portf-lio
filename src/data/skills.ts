export type SkillCategory = {
  label: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    label: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Rust', 'Python', 'C++', 'C#', 'Java', 'Assembly']
  },
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'Vue.js', 'Svelte', 'Angular', 'Vite', 'Tailwind', 'Three.js', 'WebGL']
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'Fastify', 'Express', 'NestJS']
  },
  {
    label: 'Data',
    skills: ['PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Prisma']
  },
  {
    label: 'Infra',
    skills: ['Docker', 'Linux', 'Git', 'pnpm']
  },
  {
    label: 'Exploring',
    skills: ['Blender', '3D Modeling', '3D Animation']
  }
];
