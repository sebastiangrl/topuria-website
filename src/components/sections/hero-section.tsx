// src/components/sections/hero-section.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'
import { Crown, Trophy, Zap, Target, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { FIGHTER_INFO } from '@/lib/constants'
import { useMounted } from '@/hooks/use-mounted'
import type { Variants } from 'framer-motion'

interface FighterStats {
  record: string
  wins: number
  losses: number
  draws: number
  koTko: number
  submissions: number
  decisions: number
  title: string
  ranking: string
  weightClass: string
  nextFight?: {
    opponent: string
    date: string
    event: string
  }
}

export default function HeroSection() {
  const mounted = useMounted()
  const [currentStats, setCurrentStats] = useState<FighterStats>({
    record: '16-0-0',
    wins: 16,
    losses: 0,
    draws: 0,
    koTko: 7,
    submissions: 8,
    decisions: 1,
    title: 'UFC Lightweight Champion',
    ranking: '#1 P4P',
    weightClass: 'Lightweight',
    nextFight: {
      opponent: 'TBD',
      date: '2025',
      event: 'UFC TBD'
    }
  })

  // Simplified spring animation without scroll dependency
  const ySpring = useSpring(0, { stiffness: 100, damping: 30 })

  useEffect(() => {
    // Simular carga de datos actualizados
    // En producción, esto vendría de una API
    const updateStats = () => {
      // Datos actualizados basados en la investigación
      setCurrentStats({
        record: '16-0-0',
        wins: 16,
        losses: 0,
        draws: 0,
        koTko: 7,
        submissions: 8,
        decisions: 1,
        title: 'UFC Lightweight Champion',
        ranking: '#1 P4P',
        weightClass: 'Lightweight',
        nextFight: {
          opponent: 'Next Challenger',
          date: '2025',
          event: 'UFC 318'
        }
      })
    }
    
    if (mounted) {
      updateStats()
    }
  }, [mounted])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const titleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "backOut"
      }
    }
  }

  const statsVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.8 + i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!mounted) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--spanish-red)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_center,_transparent_0%,_var(--spanish-gold)_50%,_transparent_100%)]" />
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-[linear-gradient(45deg,_transparent_24%,_var(--border)_25%,_var(--border)_26%,_transparent_27%,_transparent_74%,_var(--border)_75%,_var(--border)_76%,_transparent_77%,_transparent)] bg-[length:20px_20px]"
        />
      </div>

      {/* Floating Elements */}
      {mounted && (
        <>
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute top-20 left-20 w-4 h-4 bg-spanish-red rounded-full blur-sm"
          />
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '1s' }}
            className="absolute top-40 right-32 w-6 h-6 bg-spanish-gold rounded-full blur-sm"
          />
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '2s' }}
            className="absolute bottom-32 left-40 w-3 h-3 bg-spanish-red rounded-full blur-sm"
          />
        </>
      )}

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        className="container mx-auto px-4 text-center z-10"
      >
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Champion Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <Badge 
              variant="outline" 
              className="px-6 py-3 text-lg font-bold bg-spanish-red/10 border-spanish-red/30 text-spanish-red hover:bg-spanish-red/20 transition-colors"
            >
              <Crown className="w-5 h-5 mr-2" />
              {currentStats.title}
            </Badge>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={titleVariants} className="space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
              <span className="block text-foreground">ILIA</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-spanish-red via-spanish-gold to-spanish-red animate-gradient-x">
                TOPURIA
              </span>
            </h1>
            
            <div className="flex items-center justify-center space-x-4 text-2xl md:text-3xl font-bold">
              <span className="text-spanish-red">"EL MATADOR"</span>
              <div className="w-2 h-2 bg-spanish-gold rounded-full animate-pulse" />
              <span className="text-muted-foreground">{currentStats.ranking}</span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto"
          >
            {[
              { 
                label: 'Record', 
                value: currentStats.record, 
                icon: Trophy,
                color: 'text-spanish-red',
                bgColor: 'bg-spanish-red/10'
              },
              { 
                label: 'Wins', 
                value: currentStats.wins.toString(), 
                icon: Target,
                color: 'text-spanish-gold',
                bgColor: 'bg-spanish-gold/10'
              },
              { 
                label: 'Knockouts', 
                value: currentStats.koTko.toString(), 
                icon: Zap,
                color: 'text-spanish-red',
                bgColor: 'bg-spanish-red/10'
              },
              { 
                label: 'Submissions', 
                value: currentStats.submissions.toString(), 
                icon: Crown,
                color: 'text-spanish-gold',
                bgColor: 'bg-spanish-gold/10'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                variants={statsVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className={cn(
                  'relative p-6 rounded-2xl border border-border/50 backdrop-blur-sm',
                  stat.bgColor,
                  'hover:border-spanish-red/30 transition-all duration-300'
                )}
              >
                <div className="flex items-center justify-center mb-3">
                  <stat.icon className={cn('w-8 h-8', stat.color)} />
                </div>
                <div className={cn('text-3xl md:text-4xl font-black mb-1', stat.color)}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Fighter Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Born in <span className="text-spanish-red font-semibold">Germany</span>, 
              raised with <span className="text-spanish-gold font-semibold">Georgian</span> heart 
              and <span className="text-spanish-red font-semibold">Spanish</span> spirit. 
              Undefeated champion who brings honor to both nations.
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <span>Height: {FIGHTER_INFO.height}</span>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span>Reach: {FIGHTER_INFO.reach}</span>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span>Weight: {FIGHTER_INFO.weight}</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('stats')}
              className="bg-spanish-red hover:bg-dark-red text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Trophy className="w-5 h-5 mr-2" />
              View Full Stats
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('about')}
              className="px-8 py-4 rounded-full font-medium border-spanish-red/30 hover:bg-spanish-red/5 hover:border-spanish-red transition-all duration-300"
            >
              Learn His Story
            </Button>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll Indicator */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center space-y-2 text-muted-foreground cursor-pointer"
            onClick={() => scrollToSection('about')}
          >
            <span className="text-sm uppercase tracking-wide">Scroll</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      )}

      {/* Next Fight Preview */}
      {mounted && currentStats.nextFight && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-20 right-8 hidden lg:block"
        >
          <div className="bg-background/80 backdrop-blur-md border border-border rounded-xl p-4 max-w-sm">
            <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
              Next Fight
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-foreground">
                vs {currentStats.nextFight.opponent}
              </div>
              <div className="text-sm text-spanish-red">
                {currentStats.nextFight.event}
              </div>
              <div className="text-sm text-muted-foreground">
                {currentStats.nextFight.date}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}