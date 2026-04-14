'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  pageKey: string
}

// Book-opening page transition: pages "open" like book covers from center
const bookVariants = {
  initial: {
    opacity: 0,
    rotateY: -8,
    scale: 0.97,
    transformOrigin: 'left center',
    filter: 'brightness(0.85)',
  },
  animate: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    filter: 'brightness(1)',
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    rotateY: 8,
    scale: 0.97,
    filter: 'brightness(0.85)',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
}

export default function PageTransition({ children, pageKey }: Props) {
  return (
    <div style={{ perspective: 1200 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pageKey}
          variants={bookVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
