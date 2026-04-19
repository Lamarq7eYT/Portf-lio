import * as THREE from 'three';

let sharedRenderer: THREE.WebGLRenderer | null = null;

export const getSharedRenderer = () => {
  if (!sharedRenderer) {
    sharedRenderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    sharedRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  }

  return sharedRenderer;
};

export const resizeRenderer = (renderer: THREE.WebGLRenderer, width: number, height: number) => {
  renderer.setSize(width, height, false);
};

export const disposeObject = (object: THREE.Object3D) => {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;

    if (mesh.geometry) {
      mesh.geometry.dispose();
    }

    const material = mesh.material;
    if (Array.isArray(material)) {
      material.forEach((entry) => entry.dispose());
    } else if (material) {
      material.dispose();
    }
  });
};
