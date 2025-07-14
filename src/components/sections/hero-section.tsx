// src/components/sections/hero-section.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Crown, ArrowDown } from 'lucide-react'
import type { Variants } from 'framer-motion'

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  
  // Scroll effects
  const { scrollYProgress } = useScroll()
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7])

  // Stats actualizados 2025
  const currentStats = {
    record: "17-0-0", // Actualizado - invicto
    wins: 17,
    ranking: 1, // #1 P4P actual
    weightClass: "Dos Divisiones", // Campeón de dos divisiones
    titles: 2 // Peso pluma y peso ligero
  }

  // Auto-play del video
  useEffect(() => {
    if (videoRef.current && isVideoLoaded) {
      videoRef.current.play().catch(() => {
        // Si no se puede autoplay, no hacer nada
      })
    }
  }, [isVideoLoaded])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const statsVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden bg-background"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          onLoadedData={() => setIsVideoLoaded(true)}
          onEnded={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = 0
              videoRef.current.play()
            }
          }}
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
        >
          <source src="/videos/topuria-vs-charles.webm" type="video/webm" />
          <source src="/videos/topuria-vs-charles.mp4" type="video/mp4" />
          <p className="text-white/60 text-center mt-4">
            Tu navegador no soporta el elemento video.
          </p>
        </video>
        
        {/* Heavy Dark Overlay for Sophisticated Look */}
        <div className="absolute inset-0 bg-topuria-black/70" />
        
        {/* Gradient Overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-topuria-black via-topuria-black/80 to-topuria-black/50"
        />
        
        {/* Additional subtle texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-topuria-black/20 to-topuria-black/40" />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 h-full flex items-center"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Champion Badge - More Subtle */}
            <motion.div
              variants={subtitleVariants}
              className="mb-8 flex justify-center"
            >
              <div className="inline-flex items-center gap-3 bg-topuria-black/80 backdrop-blur-sm text-topuria-white/90 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm border border-topuria-white/10">
                <Crown className="w-4 h-4 text-topuria-gold/70" />
                Bicampeón UFC - Dos Divisiones
              </div>
            </motion.div>

            {/* Main Title - Bold and Centered */}
            <motion.div
              variants={titleVariants}
              style={{ y: titleY }}
              className="mb-12"
            >
              <h1 className="text-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none mb-6">
                <span className="block text-topuria-white font-bold">ILIA</span>
                <span className="block text-topuria-white font-black">TOPURIA</span>
              </h1>
              
              <div className="flex items-center justify-center gap-4 text-lg md:text-xl">
                <span className="text-topuria-gold/80 font-bold italic">&ldquo;El Matador&rdquo;</span>
                <div className="w-1 h-1 bg-topuria-white/40 rounded-full" />
                <span className="text-topuria-white/60 font-bold">Bicampeón UFC</span>
              </div>
            </motion.div>

            {/* Essential Stats - Bold and Centered */}
            <motion.div 
              variants={statsVariants}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-topuria-white/95 mb-2">
                  {currentStats.record}
                </div>
                <div className="text-sm uppercase tracking-widest text-topuria-white/50 font-bold">
                  Invicto
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-topuria-gold/90 mb-2">
                  #{currentStats.ranking}
                </div>
                <div className="text-sm uppercase tracking-widest text-topuria-white/50 font-bold">
                  P4P Mundial
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-topuria-white/95 mb-2">
                  {currentStats.titles}
                </div>
                <div className="text-sm uppercase tracking-widest text-topuria-white/50 font-bold">
                  Cinturones
                </div>
              </div>
            </motion.div>

            {/* Centered CTA */}
            <motion.div 
              variants={statsVariants}
              className="text-center"
            >
              <button
                onClick={() => scrollToSection('stats')}
                className="bg-transparent border-2 border-topuria-gold/60 text-topuria-white/90 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-topuria-gold/10 hover:border-topuria-gold transition-all duration-500 hover:scale-105"
              >
                Conoce al Bicampeón
              </button>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-2 text-topuria-white/40 cursor-pointer hover:text-topuria-white/60 transition-colors"
          onClick={() => scrollToSection('stats')}
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Subtle Branding Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Minimal corner accents */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 left-0 w-20 h-px bg-topuria-white/20 origin-left"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 2.2, duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 left-0 w-px h-20 bg-topuria-white/20 origin-top"
        />
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.4, duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-0 right-0 w-20 h-px bg-topuria-gold/30 origin-right"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 2.6, duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-0 right-0 w-px h-20 bg-topuria-gold/30 origin-bottom"
        />
      </div>

    </section>
  )
}