import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { PerformanceMode } from '../../hooks/usePerformanceMode';
import { disposeObject, getSharedRenderer, resizeRenderer } from '../../utils/threeSetup';

type HeroCanvasProps = {
  mode: PerformanceMode;
  enabled: boolean;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const HeroCanvas = ({ mode, enabled }: HeroCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) {
      return undefined;
    }

    const renderer = getSharedRenderer();
    const canvas = renderer.domElement;
    canvas.className = 'absolute inset-0 h-full w-full';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090b0f, 0.06);

    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 120);
    camera.position.set(0, 0, 18);

    const count = mode === 'cinematic' ? 2000 : 500;
    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorA = new THREE.Color('#00ff88');
    const colorB = new THREE.Color('#00e5ff');

    const gridColumns = Math.ceil(Math.sqrt(count));
    const gridSpacing = 0.34;

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 34;
      const y = (Math.random() - 0.5) * 22;
      const z = (Math.random() - 0.5) * 18;
      const gridX = (i % gridColumns - gridColumns / 2) * gridSpacing;
      const gridY = (Math.floor(i / gridColumns) - gridColumns / 2) * gridSpacing;
      const color = i % 3 === 0 ? colorA : colorB;

      base[i3] = x;
      base[i3 + 1] = y;
      base[i3 + 2] = z;
      target[i3] = gridX;
      target[i3 + 1] = gridY;
      target[i3 + 2] = (Math.sin(i * 0.23) + Math.cos(i * 0.17)) * 1.2;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: mode === 'cinematic' ? 0.035 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      resizeRenderer(renderer, width, height);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    let raf = 0;
    const animate = (time: number) => {
      const scrollBlend = clamp(window.scrollY / (window.innerHeight * 1.65));
      const wave = time * 0.00035;
      const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;

      for (let i = 0; i < count; i += 1) {
        const i3 = i * 3;
        const drift = Math.sin(wave + i * 0.017) * 0.32;
        positions[i3] = base[i3] + (target[i3] - base[i3]) * scrollBlend + drift;
        positions[i3 + 1] = base[i3 + 1] + (target[i3 + 1] - base[i3 + 1]) * scrollBlend + Math.cos(wave + i) * 0.1;
        positions[i3 + 2] = base[i3 + 2] + (target[i3 + 2] - base[i3 + 2]) * scrollBlend;
      }

      positionAttribute.needsUpdate = true;
      particles.rotation.y = wave * 0.24 + scrollBlend * 0.35;
      particles.rotation.x = scrollBlend * 0.16;
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };

    raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      scene.remove(particles);
      disposeObject(particles);
      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
    };
  }, [enabled, mode]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {!enabled ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,229,255,0.18),transparent_28rem),linear-gradient(180deg,#05070a,#090b0f)]" />
      ) : null}
    </div>
  );
};
