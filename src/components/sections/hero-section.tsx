// src/components/sections/hero-section.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Crown, Trophy, ArrowDown } from 'lucide-react'
import Image from 'next/image'
import { FIGHTER_INFO } from '@/lib/constants'
import { useMounted } from '@/hooks/use-mounted'
import { useUFCStatsSimple } from '@/hooks/use-ufc-stats'
import type { Variants } from 'framer-motion'

export default function HeroSection() {
  const mounted = useMounted()
  
  // UFC stats simplificado
  const baseStats = useUFCStatsSimple()

  // Stats counters
  const [winsCount, setWinsCount] = useState(0)
  const [koCount, setKoCount] = useState(0)
  const [subCount, setSubCount] = useState(0)
  const [finishRateCount, setFinishRateCount] = useState(0)
  
  // Scroll effects
  const { scrollYProgress } = useScroll()

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  // Stats actuales
  const currentStats = {
    record: `${baseStats.record.wins}-${baseStats.record.losses}-${baseStats.record.draws}`,
    wins: baseStats.record.wins,
    koTko: baseStats.finishes.koTko,
    submissions: baseStats.finishes.submissions,
    titles: baseStats.titles,
    ranking: baseStats.ranking.poundForPound,
    weightClass: baseStats.ranking.weightClass,
    finishRate: Math.round(((baseStats.finishes.koTko + baseStats.finishes.submissions) / baseStats.record.wins) * 100),
    strikesPMinute: 4.69
  }

  // Animación de contadores
  useEffect(() => {
    if (!mounted) return

    const animateCounters = () => {
      const duration = 2000
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        setWinsCount(Math.floor(currentStats.wins * progress))
        setKoCount(Math.floor(currentStats.koTko * progress))
        setSubCount(Math.floor(currentStats.submissions * progress))
        setFinishRateCount(Math.floor(currentStats.finishRate * progress))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      const timeout = setTimeout(() => {
        requestAnimationFrame(animate)
      }, 800)

      return () => clearTimeout(timeout)
    }

    return animateCounters()
  }, [mounted, currentStats.wins, currentStats.koTko, currentStats.submissions, currentStats.finishRate])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  }

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  }

  const scaleIn: Variants = {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!mounted) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-topuria-red/20 animate-pulse" />
          <div className="text-lg text-muted-foreground">Cargando El Matador...</div>
        </div>
      </div>
    )
  }

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden bg-background flex items-center"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-topuria-white via-gray-50 to-gray-100 dark:from-topuria-black dark:via-gray-900 dark:to-gray-800" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="w-full h-full bg-[linear-gradient(45deg,_transparent_24%,_var(--color-topuria-black)_25%,_var(--color-topuria-black)_26%,_transparent_27%,_transparent_74%,_var(--color-topuria-black)_75%,_var(--color-topuria-black)_76%,_transparent_77%,_transparent)] bg-[length:40px_40px]"
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 lg:px-8 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Info & Stats */}
          <motion.div variants={slideInLeft} className="space-y-6">
            
            {/* Champion Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
            >
              <div className="inline-flex items-center gap-2 bg-topuria-red text-topuria-white px-4 py-2 text-sm font-bold uppercase tracking-wider shadow-solid-sm">
                <Crown className="w-4 h-4" />
                Campeón UFC Peso Ligero
              </div>
            </motion.div>

            {/* Main Title */}
            <div className="space-y-3">
              <motion.h1 
                variants={fadeInUp}
                className="text-display text-5xl md:text-6xl lg:text-7xl leading-none"
              >
                <span className="block text-foreground">ILIA</span>
                <span className="block text-topuria-red">TOPURIA</span>
              </motion.h1>
              
              <motion.div 
                variants={fadeInUp}
                className="flex items-center gap-3 text-xl md:text-2xl"
              >
                <span className="text-topuria-gold font-bold">&ldquo;EL MATADOR&rdquo;</span>
                <div className="w-2 h-2 bg-topuria-red animate-pulse" />
                <span className="text-muted-foreground">#{currentStats.ranking} P4P</span>
              </motion.div>
            </div>

            {/* Fighter Info Grid */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-4 gap-3"
            >
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {FIGHTER_INFO.height}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Altura
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {FIGHTER_INFO.reach}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Alcance
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {FIGHTER_INFO.weight}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Peso
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {FIGHTER_INFO.stance}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Guardia
                </div>
              </div>
            </motion.div>

            {/* Fight Stats - Más compactas */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-3 gap-4"
            >
              <div className="stat-card text-center p-4">
                <div className="text-2xl font-black text-topuria-red mb-1">
                  {winsCount}
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  Victorias
                </div>
              </div>
              
              <div className="stat-card text-center p-4">
                <div className="text-2xl font-black text-topuria-gold mb-1">
                  {koCount}
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  KOs
                </div>
              </div>
              
              <div className="stat-card text-center p-4">
                <div className="text-2xl font-black text-topuria-red mb-1">
                  {subCount}
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  Sumisiones
                </div>
              </div>
            </motion.div>

            {/* Record y Finish Rate */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 gap-4"
            >
              <div className="stat-card text-center p-4">
                <div className="text-2xl font-black text-topuria-gold mb-1">
                  {currentStats.record}
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  Récord
                </div>
              </div>
              
              <div className="stat-card text-center p-4">
                <div className="text-2xl font-black text-topuria-red mb-1">
                  {finishRateCount}%
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  Finalizaciones
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex gap-4"
            >
              <button
                onClick={() => scrollToSection('stats')}
                className="btn-red px-6 py-3 text-sm font-bold uppercase tracking-wider hover-press shadow-solid-sm"
              >
                <Trophy className="w-4 h-4 mr-2 inline" />
                Estadísticas
              </button>
              
              <button
                onClick={() => scrollToSection('career')}
                className="btn-secondary px-6 py-3 text-sm font-bold uppercase tracking-wider hover-press shadow-solid-sm"
              >
                Carrera
              </button>
            </motion.div>

          </motion.div>

          {/* Right Side - Hero Image & Belt */}
          <motion.div 
            variants={slideInRight}
            className="relative flex items-center justify-center"
          >

            {/* Main Hero Image - Más compacta */}
            <motion.div
              variants={scaleIn}
              style={mounted ? { y: imageY } : undefined}
              className="relative w-full max-w-md h-[500px] lg:h-[600px]"
            >
              <Image
                src="/images/topuria.webp"
                alt="Ilia Topuria - El Matador"
                fill
                className="object-contain object-bottom"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Image Glow Effect */}
              <motion.div
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                  scale: [0.95, 1.05, 0.95]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-topuria-red/10 blur-2xl"
              />
            </motion.div>

            {/* Floating Stats Cards - Más pequeñas */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-16 left-0 bg-background/90 backdrop-blur-sm border-2 border-border p-3 shadow-solid-sm"
            >
              <div className="text-center">
                <div className="text-xl font-black text-topuria-red">
                  #{currentStats.ranking}
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  Ranking P4P
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute top-24 left-0 bg-background/90 backdrop-blur-sm border-2 border-border p-3 shadow-solid-sm"
            >
              <div className="text-center">
                <div className="text-xl font-black text-topuria-gold">
                  {currentStats.weightClass}
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  División
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-1 text-muted-foreground cursor-pointer hover-press"
          onClick={() => scrollToSection('about')}
        >
          <span className="text-xs uppercase tracking-wide font-bold">Deslizar</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Background Particles - Más sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 2 }}
          className="absolute top-20 left-20 w-3 h-3 bg-topuria-red"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 2.3 }}
          className="absolute top-32 right-32 w-4 h-4 bg-topuria-gold"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 2.6 }}
          className="absolute bottom-32 left-32 w-2 h-2 bg-topuria-red"
        />
      </div>

    </section>
  )
}