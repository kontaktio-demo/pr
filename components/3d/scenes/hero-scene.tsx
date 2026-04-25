'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Sparkles } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import type { Group, Mesh } from 'three';

/**
 * Hero 3D scene — a playful bouncing ball on a trampoline.
 *
 * Composition:
 * - Circular trampoline mat (flat cylinder) sitting on a brand-orange torus
 *   frame, lifted by four short legs. The mat compresses (squash on Y) for
 *   a few frames whenever the ball lands, giving an elastic feel.
 * - A sphere ball bounces vertically following a `|sin|` curve so the apex
 *   hangs and the contact moment is sharp — exactly like a real trampoline.
 *   The ball also squashes/stretches in flight (anticipation + impact).
 * - The whole rig slowly spins so all sides are visible from the static
 *   camera; subtle `Sparkles` add atmosphere.
 *
 * Hex literals are duplicated from `--color-brand` (#F39200), `--color-teal`
 * (#1FA9A8) and `--color-accent` (#2FA84F) because three.js materials cannot
 * resolve CSS variables at runtime. Mounted via `next/dynamic({ ssr:false })`
 * from `components/3d/hero-visual.tsx`.
 */

function CameraRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    // pointer is normalized to [-1, 1]; small offsets feel premium, big ones cheap.
    // R3F encourages direct mutation inside useFrame for per-frame updates;
    // the immutability lint rule does not apply here.
    const targetX = pointer.x * 0.6;
    const targetY = 0.6 + pointer.y * 0.3;
    /* eslint-disable react-hooks/immutability */
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
    /* eslint-enable react-hooks/immutability */
  });
  return null;
}

function SpinningGroup({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.15;
  });
  return <group ref={group}>{children}</group>;
}

/** Bounce period in seconds. Lower = faster bounces. */
const BOUNCE_PERIOD = 0.95;
/** Peak height of the ball above the mat. */
const BOUNCE_HEIGHT = 1.6;
/** Y position of the trampoline mat surface. */
const MAT_Y = -0.6;
/** Ball radius — kept in sync between geometry and bounce math. */
const BALL_R = 0.45;
/**
 * How sharply the mat compression spikes around impact (phase ≈ 0 / 1).
 * Higher = narrower contact window (mat snaps back faster).
 */
const MAT_CONTACT_SHARPNESS = 12;
/** Maximum mat compression at impact, as a fraction of mat height (0–1). */
const MAX_MAT_COMPRESSION = 0.55;

function Trampoline({ matRef }: { matRef: React.RefObject<Group | null> }) {
  return (
    <group position={[0, MAT_Y, 0]}>
      {/* Outer frame ring (brand orange) */}
      <mesh position={[0, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[1.45, 0.09, 20, 64]} />
        <meshStandardMaterial color="#F39200" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Jumping mat (squashes on impact via matRef scale.y) */}
      <group ref={matRef}>
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[1.35, 1.35, 0.1, 64]} />
          <meshStandardMaterial color="#13294B" roughness={0.6} metalness={0.1} />
        </mesh>
      </group>
      {/* Legs */}
      {[
        [1.05, -0.55, 1.05],
        [-1.05, -0.55, 1.05],
        [1.05, -0.55, -1.05],
        [-1.05, -0.55, -1.05],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.1, 16]} />
          <meshStandardMaterial color="#1FA9A8" roughness={0.4} metalness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function BouncingBall({ matRef }: { matRef: React.RefObject<Group | null> }) {
  const mesh = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;
    // Phase in [0, 1) within one bounce period.
    const phase = (t % BOUNCE_PERIOD) / BOUNCE_PERIOD;
    // |sin(pi * phase)| gives a smooth arch with sharp contact at phase 0 / 1.
    const archY = Math.sin(Math.PI * phase) * BOUNCE_HEIGHT;
    mesh.current.position.y = MAT_Y + 0.05 + BALL_R + archY;
    // Slow rotation while in flight for visual interest.
    mesh.current.rotation.x = t * 0.8;
    mesh.current.rotation.z = t * 0.6;

    // Squash & stretch: stretch on take-off / landing, near-spherical at apex.
    const apexCloseness = Math.sin(Math.PI * phase); // 0 at contact, 1 at apex
    const squash = 1 - apexCloseness * 0.18; // less squash at apex
    const stretch = 1 + apexCloseness * 0.18;
    mesh.current.scale.set(squash, stretch, squash);

    // Mat compression: squash mat scale.y briefly around contact (phase ~0).
    if (matRef.current) {
      const contact = Math.max(
        0,
        1 - Math.min(phase, 1 - phase) * MAT_CONTACT_SHARPNESS,
      );
      const matSquash = 1 - contact * MAX_MAT_COMPRESSION;
      matRef.current.scale.y = matSquash;
      matRef.current.position.y = -(1 - matSquash) * 0.05;
    }
  });
  return (
    <mesh ref={mesh} castShadow>
      <sphereGeometry args={[BALL_R, 48, 48]} />
      <meshStandardMaterial color="#F39200" roughness={0.25} metalness={0.2} />
    </mesh>
  );
}

function TrampolineRig() {
  const matRef = useRef<Group>(null);
  return (
    <>
      <Trampoline matRef={matRef} />
      <BouncingBall matRef={matRef} />
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 5], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      shadows
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 4, 2]} intensity={1.2} castShadow />
        <directionalLight position={[-4, -2, -2]} intensity={0.5} color="#1FA9A8" />

        <SpinningGroup>
          <TrampolineRig />
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
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}

export default HeroScene;
