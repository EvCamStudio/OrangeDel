"use client";

import { useEffect, useRef } from "react";
import { createScene, handleResize, startRenderLoop } from "@/lib/three/scene";
import * as THREE from "three";

/**
 * Hook reusable untuk setup Three.js di atas canvas
 * @param onFrame - callback tiap frame (delta time)
 * @param onSetup - callback saat scene pertama dibuat
 */
export function useThreeScene(
  onSetup?: (ctx: {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
  }) => void,
  onFrame?: (
    delta: number,
    ctx: {
      scene: THREE.Scene;
      camera: THREE.PerspectiveCamera;
      renderer: THREE.WebGLRenderer;
    }
  ) => void
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { scene, camera, renderer } = createScene(canvas);

    onSetup?.({ scene, camera, renderer });

    const stopLoop = startRenderLoop(renderer, scene, camera, (delta) => {
      onFrame?.(delta, { scene, camera, renderer });
    });

    const onResize = () => handleResize(canvas, camera, renderer);
    window.addEventListener("resize", onResize);

    return () => {
      stopLoop();
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return canvasRef;
}
