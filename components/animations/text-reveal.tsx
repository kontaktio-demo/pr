'use client';

import { motion, type Variants } from 'framer-motion';

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: '0.6em' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Per-word reveal animation. Splits `text` on whitespace and staggers each
 * word from below with an easing curve that matches the rest of the design
 * system. Falls back gracefully when JS / motion is disabled because each
 * word is still rendered as plain text.
 */
export function TextReveal({
  text,
  children,
  as: As = 'span',
  className,
}: {
  text?: string;
  children?: React.ReactNode;
  as?: 'span' | 'div';
  className?: string;
}) {
  const content = text ?? (typeof children === 'string' ? children : null);

  if (content == null) {
    // Non-string children: just fade the whole thing in.
    return (
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={className}
      >
        {children}
      </motion.span>
    );
  }

  const words = content.split(/(\s+)/);
  const MotionTag = As === 'div' ? motion.div : motion.span;

  return (
    <MotionTag
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      aria-label={content}
    >
      {words.map((w, i) =>
        /^\s+$/.test(w) ? (
          <span key={i}>{w}</span>
        ) : (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            aria-hidden="true"
          >
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
        ),
      )}
    </MotionTag>
  );
}
