// src/components/interactive/scroll-progress.tsx
'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollProgressProps {
  className?: string
  position?: 'top' | 'bottom'
  height?: number
  showPercentage?: boolean
  variant?: 'red' | 'gold' | 'black'
}

export default function ScrollProgress({
  className,
  position = 'top',
  height = 2,
  showPercentage = false,
  variant = 'red'
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  
  // Smooth spring animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const variantClasses = {
    red: 'bg-topuria-red',
    gold: 'bg-topuria-gold',
    black: 'bg-topuria-black'
  }

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className={cn(
          'fixed left-0 right-0 z-50 origin-left',
          variantClasses[variant],
          position === 'top' ? 'top-0' : 'bottom-0',
          className
        )}
        style={{
          scaleX,
          height: `${height}px`
        }}
      />

      {/* Percentage indicator */}
      {showPercentage && (
        <motion.div
          className={cn(
            'fixed z-50 bg-background border-2 border-border px-3 py-1',
            'text-xs font-bold uppercase tracking-wider',
            position === 'top' ? 'top-4 right-4' : 'bottom-4 right-4'
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.span className="text-topuria-red">
            {Math.round(scrollYProgress.get() * 100)}%
          </motion.span>
        </motion.div>
      )}
    </>
  )
}