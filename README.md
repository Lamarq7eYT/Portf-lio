# Llew Cinematic Portfolio

A scroll-driven, cinematic portfolio for Llew, built with React, Vite, TypeScript, GSAP, Framer Motion, Three.js, and Tailwind CSS.

The site is intentionally not a generic portfolio grid. It is a narrative runtime: boot sequence, identity reveal, project scenes, embedded demos, live code, debug mode, and a final contact frame.

## Run Locally

```bash
npm install
npm run dev
```

The dev server runs with Vite. Open the URL printed in the terminal.

## Build

```bash
npm run build
```

The Vite config uses `base: './'` and manual chunks for Three.js, GSAP, Framer Motion, syntax highlighting, and shared vendor code.

## GitHub Pages

This repository includes `.github/workflows/deploy-pages.yml`. When the project is pushed to `main`, GitHub Actions builds the Vite app and deploys `dist/` to GitHub Pages.

In the repository settings, set Pages to use GitHub Actions as the source if GitHub does not enable it automatically on the first workflow run.

## Interaction Map

- Boot screen: press any key or click to enter.
- Scroll: advances the cinematic frame timeline.
- Timeline scrubber: drag the bottom playhead on desktop to jump through the experience.
- Performance toggle: top-right icon switches between Cinematic and Fluid modes.
- Debug mode: press `D` to inspect project metadata, press `Escape` to close.
- Project demos: each project scene includes a runnable in-page demo.
- Easter egg: enter the Konami code to unlock root access feedback.
- Easter egg: type `AEGIS` anywhere to open the AegisCore status panel.
- Easter egg: click the hero name seven times for a glitch response.

## Content

- AegisCore: request defense and risk-scoring simulation.
- BreachRoom / HackerPage: compact incident investigation demo.
- AegisHub: simulated Rust release build terminal.
- Polybech: interactive TypeScript blueprint generator.

## Contact

- GitHub: <https://github.com/Lamarq7eYT>
- Discord: `maxvib3official` / ID `760864815970254848`

## Accessibility And Motion

The app detects `prefers-reduced-motion` and defaults to Fluid mode when needed. On mobile, WebGL is disabled, the timeline scrubber is hidden, and the experience uses simpler CSS-based atmosphere.
