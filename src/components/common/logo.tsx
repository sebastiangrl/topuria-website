// src/components/common/logo.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Variants } from 'framer-motion'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'light' | 'dark'
}

export default function Logo({ 
  className, 
  size = 'md',
  variant = 'default' 
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-12 w-auto'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  const logoVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  const letterVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  return (
    <Link href="/" className="block">
      <motion.div
        variants={logoVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className={cn(
          'flex items-center space-x-2 cursor-pointer',
          className
        )}
      >
        {/* Logo Icon/Symbol */}
        <motion.div
          className={cn(
            'relative flex items-center justify-center rounded-lg',
            'bg-gradient-to-br from-spanish-red to-dark-red',
            'shadow-lg',
            size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-10 h-10' : 'w-12 h-12'
          )}
          whileHover={{
            boxShadow: '0 10px 30px rgba(198, 11, 30, 0.3)',
            transition: { duration: 0.2 }
          }}
        >
          {/* "IT" Monogram */}
          <motion.span
            className={cn(
              'font-bold text-white',
              size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
            )}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            IT
          </motion.span>
          
          {/* Crown/Champion indicator */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-spanish-gold rounded-full border-2 border-white"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, duration: 0.4, type: 'spring' }}
          />
        </motion.div>

        {/* Logo Text */}
        <div className="flex flex-col">
          <motion.div className="flex items-center">
            {['I', 'L', 'I', 'A'].map((letter, i) => (
              <motion.span
                key={`first-${i}`}
                custom={i}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className={cn(
                  'font-bold tracking-tight',
                  textSizeClasses[size],
                  variant === 'light' 
                    ? 'text-white' 
                    : variant === 'dark' 
                    ? 'text-black' 
                    : 'text-foreground'
                )}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.div className="flex items-center -mt-1">
            {['T', 'O', 'P', 'U', 'R', 'I', 'A'].map((letter, i) => (
              <motion.span
                key={`last-${i}`}
                custom={i + 4}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className={cn(
                  'font-medium tracking-wider',
                  size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base',
                  'text-spanish-red'
                )}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Champion Badge */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.3 }}
          className={cn(
            'ml-2 px-2 py-1 bg-spanish-gold/20 border border-spanish-gold/30 rounded-full',
            size === 'sm' ? 'hidden' : 'block'
          )}
        >
          <motion.span
            className={cn(
              'text-spanish-gold font-semibold',
              size === 'md' ? 'text-xs' : 'text-sm'
            )}
            animate={{
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            CHAMP
          </motion.span>
        </motion.div>
      </motion.div>
    </Link>
  )
}