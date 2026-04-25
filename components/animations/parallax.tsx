'use client';

import { useGsap } from '@/hooks/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap/register';

/**
 * Vertical parallax wrapper backed by GSAP ScrollTrigger.
 *
 * Translates the child up/down as it crosses the viewport. `speed` is the
 * fraction of the viewport height to shift (negative = upward / classic
 * parallax). Honors `prefers-reduced-motion` by skipping the animation.
 */
export function Parallax({
  children,
  speed = -0.15,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useGsap<HTMLDivElement>(({ scope }) => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const inner = scope.querySelector<HTMLElement>('[data-parallax-inner]');
    if (!inner) return;

    const distance = () => window.innerHeight * speed;

    const tween = gsap.fromTo(
      inner,
      { y: -distance() },
      {
        y: distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: scope,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.refresh();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      <div data-parallax-inner className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
