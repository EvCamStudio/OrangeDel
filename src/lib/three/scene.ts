import * as THREE from "three";

/**
 * Setup dasar Three.js scene, camera, dan renderer
 */
export function createScene(canvas: HTMLCanvasElement) {
  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  return { scene, camera, renderer };
}

/**
 * Handle resize — update camera & renderer
 */
export function handleResize(
  canvas: HTMLCanvasElement,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

/**
 * Render loop
 */
export function startRenderLoop(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  onFrame?: (delta: number) => void
) {
  const clock = new THREE.Clock();
  let animationId: number;

  const loop = () => {
    animationId = requestAnimationFrame(loop);
    const delta = clock.getDelta();
    onFrame?.(delta);
    renderer.render(scene, camera);
  };

  loop();

  return () => cancelAnimationFrame(animationId);
}
