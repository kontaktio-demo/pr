'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { HeroVisual } from '@/components/3d/hero-visual';
import { MagneticButton } from '@/components/animations/magnetic-button';
import { TextReveal } from '@/components/animations/text-reveal';
import { ClockIcon } from '@/components/ui/icons';

/**
 * Sekcja HERO strony głównej — duże pomarańczowe tło (jak na saltos.pl),
 * mocny nagłówek z reveal per word, dwa CTA z magnetic motion oraz
 * dynamicznie ładowana scena 3D R3F (HeroVisual).
 */
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-brand text-white"
    >
      {/* Subtle confetti dots — animated with Framer Motion */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {[
          { top: '15%', left: '10%', size: 12, color: 'bg-teal', delay: 0 },
          { top: '20%', right: '15%', size: 8, color: 'bg-ink', delay: 0.4 },
          { bottom: '15%', left: '20%', size: 10, color: 'bg-accent', delay: 0.8 },
          { bottom: '10%', right: '10%', size: 12, color: 'bg-white', delay: 1.2 },
          { top: '60%', right: '25%', size: 8, color: 'bg-teal', delay: 0.2 },
          { top: '8%', left: '40%', size: 8, color: 'bg-accent', delay: 1 },
        ].map((d, i) => (
          <motion.span
            key={i}
            className={`absolute rounded-full ${d.color}`}
            style={{
              top: d.top,
              bottom: d.bottom,
              left: d.left,
              right: d.right,
              width: d.size,
              height: d.size,
            }}
            animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 3 + i * 0.4,
              delay: d.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container relative grid items-center gap-12 py-20 md:grid-cols-2 md:py-28 lg:py-36">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-sm font-bold uppercase tracking-widest text-white/85"
          >
            {siteConfig.contact.address.city} · {siteConfig.contact.address.district}
          </motion.p>

          <h1
            id="hero-title"
            className="font-display text-5xl font-extrabold leading-[1.05] md:text-6xl lg:text-7xl"
          >
            <TextReveal text={siteConfig.tagline} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-md text-lg text-white/95 md:text-xl"
          >
            Bezpieczne trampoliny, certyfikowani trenerzy, strefy na każdy wiek.
            Skacz, baw się, świętuj — i wracaj po więcej.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <MagneticButton>
              <Link
                href="/rezerwacje"
                className="inline-block rounded-full bg-ink px-7 py-3 text-base font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-ink-muted"
              >
                Kup bilet
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/zajecia"
                className="inline-block rounded-full border-2 border-white px-7 py-3 text-base font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-brand"
              >
                Zarezerwuj zajęcia
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-6 flex items-start gap-2 text-sm text-white/85"
          >
            <ClockIcon className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>
              Przyjdź <strong>{siteConfig.rules.arriveEarlyMinutes} min wcześniej</strong>.
              Wejścia o pełnych godzinach. Skarpetki antypoślizgowe obowiązkowe (10 zł na miejscu).
            </span>
          </motion.p>
        </div>

        <div className="relative mx-auto hidden aspect-square w-full max-w-md md:block">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
