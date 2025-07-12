// src/components/interactive/scroll-progress.tsx
'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollProgressProps {
  className?: string
  position?: 'top' | 'bottom'
  height?: number
  showPercentage?: boolean
}

export default function ScrollProgress({ 
  className, 
  position = 'top',
  height = 3,
  showPercentage = false
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  
  // Add spring animation for smoother movement
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className={cn(
          'fixed left-0 right-0 z-50 bg-gradient-to-r from-spanish-red via-spanish-gold to-spanish-red origin-left',
          position === 'top' ? 'top-0' : 'bottom-0',
          className
        )}
        style={{
          scaleX,
          height: `${height}px`
        }}
      />

      {/* Percentage indicator (optional) */}
      {showPercentage && (
        <motion.div
          className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-1 text-xs font-medium"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.span className="text-spanish-red">
            {Math.round(scrollYProgress.get() * 100)}%
          </motion.span>
        </motion.div>
      )}
    </>
  )
}