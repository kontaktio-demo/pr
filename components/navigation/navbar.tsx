'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { mainNav } from '@/config/navigation';
import { SaltosLogo } from '@/components/ui/saltos-logo';
import { MagneticButton } from '@/components/animations/magnetic-button';
import { MenuIcon, CloseIcon } from '@/components/ui/icons';
import { MobileMenu } from '@/components/navigation/mobile-menu';

/**
 * Główna nawigacja parku.
 *
 * - Sticky + scroll-aware: po przewinięciu >24px header się "kompresuje"
 *   (mniejsza wysokość + lekki backdrop-blur), co dodaje premium feel.
 * - Każdy link ma underline rosnący od lewej w hover/active.
 * - CTA "ważne" osadzone w `MagneticButton` dla cursor follow.
 * - Hamburger uruchamia `MobileMenu` (drawer z Framer Motion).
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 24);
  });

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          height: scrolled ? 64 : 80,
          backgroundColor: scrolled ? 'rgba(243, 146, 0, 0.92)' : 'rgba(243, 146, 0, 1)',
          backdropFilter: scrolled ? 'blur(8px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 text-white shadow-sm"
      >
        <div className="container flex h-full items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${siteConfig.name} – strona główna`}
          >
            <motion.span
              whileHover={{ rotate: -8, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-flex"
            >
              <SaltosLogo className="h-10 w-10 text-white" />
            </motion.span>
            <span className="font-display text-2xl font-extrabold tracking-wide">
              SALTOS
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Główna nawigacja"
          >
            {mainNav.map((item) => {
              const active =
                item.href === pathname ||
                (item.href !== '/' && pathname.startsWith(item.href.split('#')[0]));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-3 py-2 text-sm font-semibold uppercase tracking-wide text-white/95 transition hover:text-white"
                >
                  {item.label}
                  <span
                    className={`absolute bottom-1 left-3 right-3 h-0.5 origin-left scale-x-0 rounded-full bg-white transition-transform duration-300 group-hover:scale-x-100 ${active ? 'scale-x-100' : ''}`}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <MagneticButton>
                <Link
                  href="/faq"
                  className="inline-block rounded-full border-2 border-white px-6 py-2 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-brand"
                >
                  ważne
                </Link>
              </MagneticButton>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 text-white transition hover:bg-white hover:text-brand lg:hidden"
            >
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
