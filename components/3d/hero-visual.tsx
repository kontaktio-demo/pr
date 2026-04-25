'use client';

import dynamic from 'next/dynamic';
import { useMediaQuery } from '@/hooks/use-media-query';

/**
 * SSR-safe wrapper around the R3F `HeroScene`.
 *
 * - Loaded with `next/dynamic({ ssr: false })` so the heavy three.js bundle
 *   never hits the server and never blocks the initial HTML.
 * - Renders a lightweight CSS-only fallback while the chunk is downloading,
 *   on small screens (where 3D would be a battery/perf hit), and when the
 *   user prefers reduced motion.
 */
const HeroScene = dynamic(
  () => import('@/components/3d/scenes/hero-scene').then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => <HeroFallback />,
  },
);

function HeroFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative h-72 w-72 md:h-96 md:w-96">
        <span className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-white/30 via-accent/30 to-teal/30 blur-2xl" />
        <span className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm md:h-56 md:w-56" />
      </div>
    </div>
  );
}

export function HeroVisual() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  if (!isDesktop || prefersReducedMotion) {
    return <HeroFallback />;
  }

  return <HeroScene />;
}
