"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import styles from "./HeroCanvas.module.css";

interface HeroCanvasProps {
  onReady?: () => void;
}

export default function HeroCanvas({ onReady }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ─── Renderer ───────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // ─── Scene & Camera ─────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6);

    // ─── Lighting ───────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0x080804, 2);
    scene.add(ambient);

    // Main orange key light
    const keyLight = new THREE.PointLight(0xff6b00, 60, 20);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    // Gold rim light (dari belakang kiri)
    const rimLight = new THREE.PointLight(0xd4a017, 20, 15);
    rimLight.position.set(-4, -1, -2);
    scene.add(rimLight);

    // Cool fill (dari bawah, subtle)
    const fillLight = new THREE.PointLight(0x1a1000, 10, 10);
    fillLight.position.set(0, -5, 2);
    scene.add(fillLight);

    // ─── Main Orange Container ──────────────────────────────────
    const orangeGroup = new THREE.Group();
    orangeGroup.position.set(2.2, 0.3, 0);
    scene.add(orangeGroup);

    // Fallback sphere (tampil instan sebelum model GLB selesai dimuat)
    const sphereGeo = new THREE.IcosahedronGeometry(1.8, 8);
    const sphereMat = new THREE.MeshStandardMaterial({
      color:             new THREE.Color("#E85A00"),
      emissive:          new THREE.Color("#FF2200"),
      emissiveIntensity: 0.15,
      roughness:         0.35,
      metalness:         0.05,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    orangeGroup.add(sphere);

    // ─── Glow Layers (concentric transparent shells) ────────────
    const glowMats = [
      { scale: 1.06, opacity: 0.06, color: "#FF6B00" },
      { scale: 1.15, opacity: 0.035, color: "#FF8C00" },
      { scale: 1.30, opacity: 0.015, color: "#FFA040" },
    ];

    const glowMeshes: THREE.Mesh[] = glowMats.map(({ scale, opacity, color }) => {
      const g = new THREE.IcosahedronGeometry(1.8 * scale, 4);
      const m = new THREE.MeshBasicMaterial({
        color:       new THREE.Color(color),
        transparent: true,
        opacity,
        side:        THREE.BackSide,
        depthWrite:  false,
      });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.copy(orangeGroup.position);
      scene.add(mesh);
      return mesh;
    });

    // ─── Particle Field ─────────────────────────────────────────
    const particleCount = 1200;
    const positions     = new Float32Array(particleCount * 3);
    const colors        = new Float32Array(particleCount * 3);

    const orangeColor = new THREE.Color("#FF6B00");
    const goldColor   = new THREE.Color("#D4A017");

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a sphere shell
      const r     = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 2;

      // Mix orange & gold colors
      const mixed = orangeColor.clone().lerp(goldColor, Math.random());
      colors[i * 3]     = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size:         0.04,
      vertexColors: true,
      transparent:  true,
      opacity:      0.7,
      sizeAttenuation: true,
      depthWrite:   false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ─── Ring / Orbit ────────────────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(2.6, 0.008, 8, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color:       new THREE.Color("#FF6B00"),
      transparent: true,
      opacity:     0.15,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(orangeGroup.position);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    const ring2 = ring.clone();
    (ring2.material as THREE.MeshBasicMaterial).opacity = 0.07;
    ring2.scale.set(1.3, 1.3, 1.3);
    ring2.rotation.x = Math.PI / 2.2;
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // ─── Mouse Parallax ─────────────────────────────────────────
    const mouse   = { x: 0, y: 0 };
    const target  = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ─── Resize ─────────────────────────────────────────────────
    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ─── Load GLB Model ─────────────────────────────────────────
    const loader = new GLTFLoader();
    loader.load(
      "/MandarinOrange.gltf",
      (gltf) => {
        const model = gltf.scene;

        // Auto-scale dan center model agar ukurannya pas dengan sphere fallback
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 3.6 / maxDim; // diameter disamakan dengan sphere (1.8 * 2)
        model.scale.setScalar(targetScale);

        const center = box.getCenter(new THREE.Vector3());
        model.position.set(-center.x * targetScale, -center.y * targetScale, -center.z * targetScale);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        // Hapus sphere fallback dan tambahkan model jeruk asli
        if (orangeGroup.children.includes(sphere)) {
          orangeGroup.remove(sphere);
          sphereGeo.dispose();
          sphereMat.dispose();
        }
        
        orangeGroup.add(model);
        onReady?.();
      },
      undefined,
      (error) => {
        console.error("Error loading orange model:", error);
        // Jika gagal, scene tetap berjalan menggunakan sphere fallback
        onReady?.();
      }
    );

    // ─── Render Loop ────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId: number | null = null;
    let isVisible = true;

    const tick = () => {
      if (!isVisible) {
        animId = null;
        return;
      }

      animId = requestAnimationFrame(tick);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      target.x += (mouse.x - target.x) * 0.04;
      target.y += (mouse.y - target.y) * 0.04;

      // Orange container rotation + mouse parallax
      orangeGroup.rotation.y  = elapsed * 0.12 + target.x * 0.3;
      orangeGroup.rotation.x  = target.y * 0.2;
      orangeGroup.position.x  = 2.2 + target.x * 0.4;
      orangeGroup.position.y  = 0.3 - target.y * 0.3;

      // Glow follows orange
      glowMeshes.forEach((m) => m.position.copy(orangeGroup.position));
      ring.position.copy(orangeGroup.position);
      ring2.position.copy(orangeGroup.position);

      // Rings rotate independently
      ring.rotation.z  = elapsed * 0.08;
      ring2.rotation.z = -elapsed * 0.05;

      // Particle drift
      particles.rotation.y = elapsed * 0.018;
      particles.rotation.x = elapsed * 0.008;

      // Subtle breathing scale on orange
      const breathe = 1 + Math.sin(elapsed * 0.8) * 0.008;
      orangeGroup.scale.setScalar(breathe);

      renderer.render(scene, camera);
    };

    // Mulai loop pertama kali
    animId = requestAnimationFrame(tick);

    // Setup IntersectionObserver untuk menjeda loop saat canvas di luar viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;

        // Jika menjadi terlihat dan loop sedang mati, hidupkan kembali
        if (isVisible && !wasVisible && animId === null) {
          animId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // ─── Cleanup ────────────────────────────────────────────────
    return () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
      }
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize",    onResize);

      // Cleanup fallback sphere if it wasn't replaced
      if (orangeGroup.children.includes(sphere)) {
        sphereGeo.dispose();
        sphereMat.dispose();
      }
      glowMeshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
