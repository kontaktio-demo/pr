'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import type { Group, Mesh } from 'three';

/**
 * Hero 3D scene — premium playful composition for the landing page.
 *
 * - Three floating primitives (torus, sphere, icosahedron) keyed to brand
 *   colors, with `Float` for organic idle motion.
 * - Soft studio environment + key/rim lights for a premium look.
 * - Distortion material on the centerpiece sphere reacts to time, giving the
 *   "blob in a snow globe" feel.
 * - `Sparkles` add subtle particle motion in the background.
 *
 * The scene is mounted via `next/dynamic({ ssr: false })` from
 * `components/3d/hero-visual.tsx`, so it never runs on the server, never
 * blocks LCP, and is skipped entirely on small screens / reduced-motion.
 */
function SpinningGroup({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.15;
  });
  return <group ref={group}>{children}</group>;
}

function Blob() {
  const mesh = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.4;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} castShadow>
        <icosahedronGeometry args={[1.1, 16]} />
        <MeshDistortMaterial
          color="#F39200"
          distort={0.35}
          speed={2}
          roughness={0.2}
          metalness={0.15}
        />
      </mesh>
    </Float>
  );
}

function OrbitingTorus() {
  return (
    <Float speed={1.6} rotationIntensity={1.2} floatIntensity={0.6}>
      <mesh position={[1.7, 0.6, -0.3]} rotation={[0.5, 0.4, 0]}>
        <torusGeometry args={[0.55, 0.16, 24, 64]} />
        <meshStandardMaterial color="#1FA9A8" roughness={0.25} metalness={0.4} />
      </mesh>
    </Float>
  );
}

function OrbitingDiamond() {
  return (
    <Float speed={1} rotationIntensity={0.8} floatIntensity={0.9}>
      <mesh position={[-1.6, -0.5, 0.2]} rotation={[0.2, 0.3, 0.1]}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial color="#2FA84F" roughness={0.3} metalness={0.3} />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 4.6], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 4, 2]} intensity={1.2} castShadow />
        <directionalLight position={[-4, -2, -2]} intensity={0.5} color="#1FA9A8" />

        <SpinningGroup>
          <Blob />
          <OrbitingTorus />
          <OrbitingDiamond />
        </SpinningGroup>

        <Sparkles
          count={40}
          scale={6}
          size={2.4}
          speed={0.4}
          opacity={0.7}
          color="#ffffff"
        />

        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

export default HeroScene;
