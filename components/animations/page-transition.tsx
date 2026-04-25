'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { pageVariants } from '@/lib/animations/page-transitions';

/**
 * Page transition wrapper for the App Router.
 *
 * Uses `usePathname()` as the AnimatePresence key so route changes trigger
 * the exit/enter cycle. `mode="wait"` ensures the exit animation completes
 * before the next page mounts, eliminating flicker.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
