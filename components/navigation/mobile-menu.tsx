'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { mainNav } from '@/config/navigation';
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';
import { ArrowRightIcon, PhoneIcon, PinIcon, socialIcons } from '@/components/ui/icons';

/**
 * Pełnoekranowy mobile drawer.
 *
 * - Wjeżdża z prawej (slide + opacity), tło ink z subtelnym blob-akcentem.
 * - Linki staggerują się od góry (Framer Motion `staggerChildren`).
 * - Lock body scroll dopóki drawer otwarty.
 * - Aktywne tylko poniżej `lg`; nawbar zarządza stanem.
 */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useLockBodyScroll(open);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-30 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Zamknij menu"
            onClick={onClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col overflow-hidden bg-ink pt-24 text-white shadow-2xl"
          >
            {/* Decorative offsets */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/30 blur-3xl"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-teal/20 blur-3xl"
            />

            <motion.nav
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
              }}
              initial="hidden"
              animate="visible"
              className="relative flex flex-col px-8"
              aria-label="Menu mobilne"
            >
              {mainNav.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, x: 24 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-center justify-between border-b border-white/10 py-4 font-display text-2xl font-bold uppercase tracking-wide transition hover:text-brand"
                  >
                    <span>{item.label}</span>
                    <ArrowRightIcon className="h-5 w-5 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="relative mt-auto space-y-4 px-8 pb-10 pt-8"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/rezerwacje"
                  onClick={onClose}
                  className="flex-1 rounded-full bg-brand px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-dark"
                >
                  Kup bilet
                </Link>
                <Link
                  href="/faq"
                  onClick={onClose}
                  className="flex-1 rounded-full border-2 border-white px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-ink"
                >
                  Ważne
                </Link>
              </div>

              <div className="space-y-2 text-sm text-white/75">
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 hover:text-white"
                >
                  <PhoneIcon className="h-4 w-4 text-brand" />
                  {siteConfig.contact.phoneDisplay}
                </a>
                <p className="flex items-center gap-2">
                  <PinIcon className="h-4 w-4 text-brand" />
                  {siteConfig.contact.address.street}, {siteConfig.contact.address.city}
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                {Object.entries(siteConfig.social).map(([name, url]) => {
                  const Icon = socialIcons[name];
                  if (!Icon) return null;
                  return (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={name}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-brand hover:text-brand"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
