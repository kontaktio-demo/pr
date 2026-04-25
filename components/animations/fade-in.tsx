'use client';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations/variants';

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
