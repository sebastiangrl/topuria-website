// src/components/common/logo.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'light' | 'dark'
  showText?: boolean
}

export default function Logo({ 
  className, 
  size = 'md',
  variant = 'default',
  showText = true
}: LogoProps) {
  const sizeClasses = {
    sm: { mark: 'w-8 h-8', text: 'text-sm', subtext: 'text-xs' },
    md: { mark: 'w-12 h-12', text: 'text-xl', subtext: 'text-xs' },
    lg: { mark: 'w-16 h-16', text: 'text-2xl', subtext: 'text-sm' }
  }

  const currentSize = sizeClasses[size]

  return (
    <Link href="/" className="block">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'flex items-center space-x-3 cursor-pointer group',
          className
        )}
      >
        {/* Logo Mark */}
        <motion.div
          className="relative hover-press"
          whileHover={{ 
            rotate: [0, -2, 2, -1, 0],
            transition: { duration: 0.5 }
          }}
        >
          <div className={cn(
            'bg-topuria-black border-2 border-topuria-black flex items-center justify-center',
            'group-hover:bg-topuria-white transition-colors duration-200',
            currentSize.mark
          )}>
            <span className={cn(
              'text-topuria-white group-hover:text-topuria-black font-black transition-colors duration-200',
              size === 'sm' ? 'text-xs' : size === 'md' ? 'text-lg' : 'text-xl'
            )}>
              IT
            </span>
          </div>
          
          {/* Champion indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className={cn(
              'absolute -top-1 -right-1 bg-topuria-red',
              size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'
            )}
          />
          
          {/* Gold accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-topuria-gold origin-left"
          />
        </motion.div>

        {/* Logo Text */}
        {showText && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Main name */}
            <motion.div 
              className="flex items-center"
              whileHover={{ 
                letterSpacing: '0.05em',
                transition: { duration: 0.2 }
              }}
            >
              {['I', 'L', 'I', 'A'].map((letter, i) => (
                <motion.span
                  key={`first-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.2 }}
                  whileHover={{ 
                    y: -2,
                    transition: { duration: 0.1 }
                  }}
                  className={cn(
                    'text-display leading-none',
                    currentSize.text,
                    variant === 'light' ? 'text-white' : 
                    variant === 'dark' ? 'text-topuria-black' : 
                    'text-foreground'
                  )}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Surname */}
            <motion.div 
              className="flex items-center -mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {['T', 'O', 'P', 'U', 'R', 'I', 'A'].map((letter, i) => (
                <motion.span
                  key={`last-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (0.05 * i), duration: 0.2 }}
                  whileHover={{ 
                    y: -1,
                    transition: { duration: 0.1 }
                  }}
                  className={cn(
                    'font-bold tracking-[0.2em] uppercase',
                    currentSize.subtext,
                    'text-topuria-red'
                  )}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Champion Badge */}
        {size !== 'sm' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="badge badge-outline text-xs px-2 py-1"
          >
            <motion.span
              animate={{
                opacity: [1, 0.6, 1],
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
        )}
      </motion.div>
    </Link>
  )
}