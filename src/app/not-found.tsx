// src/app/not-found.tsx
'use client'

import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Variants } from 'framer-motion'

export default function NotFound() {
  const containerVariants: Variants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    initial: {
      opacity: 0,
      y: 30
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

  const numberVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const glitchVariants: Variants = {
    animate: {
      x: [0, -2, 2, 0],
      textShadow: [
        '0 0 0 transparent',
        '2px 0 0 #ff0000, -2px 0 0 #00ff00',
        '0 0 0 transparent'
      ],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--spanish-red)_1px,_transparent_1px)] bg-[length:50px_50px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="text-center max-w-2xl mx-auto px-4 z-10"
      >
        {/* 404 Number */}
        <motion.div
          variants={numberVariants}
          className="relative mb-8"
        >
          <motion.h1
            variants={glitchVariants}
            animate="animate"
            className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-spanish-red via-spanish-gold to-spanish-red bg-size-200 animate-gradient-x"
          >
            404
          </motion.h1>
          
          {/* Shadow effect */}
          <div className="absolute inset-0 text-8xl md:text-9xl font-black text-spanish-red/10 blur-sm -z-10">
            404
          </div>
        </motion.div>

        {/* Warning icon */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <motion.div
            animate={{
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="inline-flex items-center justify-center w-16 h-16 bg-spanish-red/10 rounded-full border-2 border-spanish-red/20"
          >
            <AlertTriangle className="h-8 w-8 text-spanish-red" />
          </motion.div>
        </motion.div>

        {/* Error message */}
        <motion.div variants={itemVariants} className="space-y-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Round Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            Looks like this page got knocked out! Even champions miss sometimes, 
            but we'll help you get back in the ring.
          </p>
        </motion.div>

        {/* Fun facts card */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="bg-muted/50 border-spanish-red/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Did you know?
              </h3>
              <p className="text-muted-foreground">
                Ilia Topuria has never lost a round in his UFC career, 
                but this page seems to have taken an unexpected detour!
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-spanish-red hover:bg-dark-red text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="px-8 py-3 rounded-full font-medium border-spanish-red/30 hover:bg-spanish-red/5 hover:border-spanish-red transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </motion.div>

        {/* Search suggestion */}
        <motion.div
          variants={itemVariants}
          className="mt-8 p-4 bg-muted/30 rounded-lg border border-border/50"
        >
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>Try searching for what you need or explore the main sections</span>
          </div>
        </motion.div>

        {/* Quick links */}
        <motion.div
          variants={itemVariants}
          className="mt-8"
        >
          <p className="text-sm text-muted-foreground mb-4">Or explore these sections:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'About', href: '/#about' },
              { label: 'Career', href: '/#career' },
              { label: 'Stats', href: '/#stats' },
              { label: 'Gallery', href: '/#gallery' },
              { label: 'Contact', href: '/#contact' }
            ].map((link, index) => (
              <motion.div
                key={link.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-spanish-red hover:text-dark-red hover:bg-spanish-red/5 transition-colors"
                >
                  <Link href={link.href}>
                    {link.label}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-2 h-2 bg-spanish-red rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-10 w-3 h-3 bg-spanish-gold rounded-full"
        animate={{
          y: [0, 15, 0],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />
    </div>
  )
}