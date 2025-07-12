// src/app/loading.tsx
'use client'

import { motion } from 'framer-motion'
import { Crown } from 'lucide-react'
import type { Variants } from 'framer-motion'

export default function Loading() {
  const containerVariants: Variants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const logoVariants: Variants = {
    initial: {
      scale: 0.8,
      opacity: 0
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const pulseVariants: Variants = {
    initial: {
      scale: 1,
      opacity: 0.7
    },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const textVariants: Variants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const progressVariants: Variants = {
    initial: {
      width: '0%'
    },
    animate: {
      width: '100%',
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  }

  const crownVariants: Variants = {
    initial: {
      rotate: 0,
      y: 0
    },
    animate: {
      rotate: [0, -10, 10, 0],
      y: [0, -2, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--spanish-red)_1px,_transparent_1px)] bg-[length:40px_40px] animate-pulse" />
      </div>

      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-spanish-red/5 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="text-center z-10"
      >
        {/* Logo and Crown */}
        <motion.div
          variants={logoVariants}
          className="relative mb-8"
        >
          <motion.div
            variants={pulseVariants}
            className="relative inline-flex items-center justify-center w-24 h-24 mx-auto"
          >
            {/* Main logo circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-spanish-red to-dark-red shadow-2xl" />
            
            {/* Inner glow */}
            <motion.div
              className="absolute inset-2 rounded-full bg-gradient-to-br from-spanish-red/50 to-transparent"
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            
            {/* Logo text */}
            <span className="relative z-10 text-white font-bold text-xl">IT</span>
            
            {/* Crown */}
            <motion.div
              variants={crownVariants}
              className="absolute -top-2 -right-2"
            >
              <Crown className="h-6 w-6 text-spanish-gold fill-current drop-shadow-lg" />
            </motion.div>
          </motion.div>

          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-spanish-red/30"
            animate={{
              scale: [1, 1.5, 2],
              opacity: [0.6, 0.3, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut'
            }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.div variants={textVariants} className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            <motion.span
              className="inline-block"
              animate={{
                color: ['var(--foreground)', 'var(--spanish-red)', 'var(--foreground)']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              ILIA TOPURIA
            </motion.span>
          </h1>
          
          <motion.p
            className="text-muted-foreground"
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            Loading the champion's legacy...
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          variants={textVariants}
          className="mt-8 w-64 mx-auto"
        >
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              variants={progressVariants}
              className="h-full bg-gradient-to-r from-spanish-red to-spanish-gold rounded-full"
            />
          </div>
        </motion.div>

        {/* Loading dots */}
        <motion.div
          variants={textVariants}
          className="flex justify-center space-x-1 mt-6"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-spanish-red rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}