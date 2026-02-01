'use client';

import { motion } from 'framer-motion';

export const FadeUp = ({ children, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: 'easeOut', delay }}
  >
    {children}
  </motion.div>
);

export const FadeIn = ({ children }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);
