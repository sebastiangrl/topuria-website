// src/components/sections/stats-section.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Crown } from 'lucide-react'
import Image from 'next/image'

interface CircularStat {
  id: string
  label: string
  value: number
  total: number
  percentage: number
  color: string
  description: string
}

interface SimpleStat {
  label: string
  value: string
  description: string
}

interface MiniCard {
  title: string
  subtitle: string
  icon: typeof Crown
}

const circularStats: CircularStat[] = [
  {
    id: 'finish-rate',
    label: 'Tasa de Finalización',
    value: 15,
    total: 17,
    percentage: 88,
    color: '#D20A0A',
    description: '15 de 17 peleas terminadas'
  },
  {
    id: 'ko-rate',
    label: 'Ratio de KOs',
    value: 7,
    total: 17,
    percentage: 41,
    color: '#D20A0A',
    description: '7 nocauts profesionales'
  },
  {
    id: 'sub-rate',
    label: 'Ratio de Sumisiones',
    value: 8,
    total: 17,
    percentage: 47,
    color: '#D20A0A',
    description: '8 sumisiones totales'
  },
  {
    id: 'first-round',
    label: 'Primer Asalto',
    value: 11,
    total: 17,
    percentage: 65,
    color: '#D20A0A',
    description: '11 finalizaciones R1'
  },
  {
    id: 'precision',
    label: 'Precisión Golpeo',
    value: 61,
    total: 100,
    percentage: 61,
    color: '#D20A0A',
    description: '61% golpes conectados'
  },
  {
    id: 'takedown-defense',
    label: 'Defensa Takedown',
    value: 95,
    total: 100,
    percentage: 95,
    color: '#D20A0A',
    description: '95% derribos defendidos'
  }
]

const rightStats: SimpleStat[] = [
  {
    label: 'Golpes Sig. Recibidos',
    value: '3.83',
    description: 'POR MINUTO'
  },
  {
    label: 'Golpes Conectados',
    value: '4.69',
    description: 'POR MINUTO'
  },
  {
    label: 'Tiempo Promedio',
    value: '1.8',
    description: 'ASALTOS POR PELEA'
  },
  {
    label: 'Bonos UFC',
    value: '5',
    description: 'PERFORMANCE/FIGHT'
  },
  {
    label: 'Títulos UFC',
    value: '2',
    description: 'DIVISIONES'
  },
  {
    label: 'Victorias UFC',
    value: '8',
    description: 'EN OCTÁGONO'
  },
  {
    label: 'Finalizaciones R1',
    value: '11',
    description: 'PRIMER ASALTO'
  },
  {
    label: 'Invicto',
    value: '17',
    description: 'PELEAS GANADAS'
  }
]

const leftMiniCards: MiniCard[] = [
  {
    title: 'Bicampeón UFC',
    subtitle: 'Peso Ligero & Pluma',
    icon: Crown
  }
]

const rightMiniCards: MiniCard[] = [
  {
    title: 'Pionero Español',
    subtitle: 'Primer Campeón UFC',
    icon: Trophy
  }
]

const CircularProgress = ({ stat, delay = 0 }: { stat: CircularStat; delay?: number }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(elementRef, { once: true, amount: 0.3 })
  
  const radius = 35
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (currentPercentage / 100) * circumference

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const start = 0
        const end = stat.percentage
        const duration = 2000
        const startTime = Date.now()
        
        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easeOutQuart = 1 - Math.pow(1 - progress, 4)
          
          setCurrentPercentage(start + (end - start) * easeOutQuart)
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            setCurrentPercentage(end)
          }
        }
        
        requestAnimationFrame(animate)
      }, delay)
      
      return () => clearTimeout(timer)
    }
  }, [isInView, stat.percentage, delay])

  return (
    <div ref={elementRef} className="text-center group cursor-pointer">
      <motion.div 
        className="relative w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-2"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <svg className="w-16 h-16 lg:w-20 lg:h-20 transform -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#f3f4f6"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            stroke={stat.color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transition={{ duration: 0.1, ease: "easeOut" }}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-sm lg:text-lg font-black text-topuria-black">
            {Math.round(currentPercentage)}%
          </div>
        </div>
      </motion.div>
      
      <motion.div
        whileHover={{ y: -1 }}
        transition={{ duration: 0.2 }}
      >
        <h4 className="font-bold text-topuria-black text-xs lg:text-sm mb-1 group-hover:text-topuria-red transition-colors duration-200">
          {stat.label}
        </h4>
        <p className="text-xs text-gray-600 leading-tight hidden lg:block">
          {stat.description}
        </p>
      </motion.div>
    </div>
  )
}

const StatCard = ({ stat, index }: { stat: SimpleStat; index: number }) => {
  const [currentValue, setCurrentValue] = useState('0')
  const elementRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(elementRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        if (!isNaN(Number(stat.value))) {
          const start = 0
          const end = Number(stat.value)
          const duration = 1500
          const startTime = Date.now()
          
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const current = Math.floor(start + (end - start) * progress)
            
            setCurrentValue(current.toString())
            
            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCurrentValue(stat.value)
            }
          }
          
          requestAnimationFrame(animate)
        } else {
          setCurrentValue(stat.value)
        }
      }, index * 100)
      
      return () => clearTimeout(timer)
    }
  }, [isInView, stat.value, index])

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -2, scale: 1.02 }}
      className="text-center p-2 lg:p-3 bg-gray-50 border-l-4 border-topuria-red hover:bg-gray-100 transition-all duration-300 cursor-pointer group"
    >
      <div className="text-lg lg:text-2xl font-black text-topuria-black mb-1 group-hover:text-topuria-red transition-colors duration-200">
        {currentValue}
      </div>
      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-bold">
        {stat.description}
      </div>
      <div className="text-xs font-bold text-topuria-black group-hover:text-topuria-red transition-colors duration-200">
        {stat.label}
      </div>
    </motion.div>
  )
}

const MiniCardComponent = ({ card, delay = 0 }: { card: MiniCard; delay?: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true })
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ delay: 1.0 + delay, duration: 0.6 }}
      className="bg-topuria-white border-2 border-gray-200 p-2 lg:p-3 shadow-sm hover:border-topuria-red transition-all duration-300 text-center hover:shadow-lg"
    >
      <div className="w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-2 flex items-center justify-center text-topuria-red">
        <card.icon className="w-4 h-4 lg:w-5 lg:h-5" />
      </div>
      <div className="text-xs lg:text-sm font-bold text-topuria-black">{card.title}</div>
      <div className="text-xs text-gray-600">{card.subtitle}</div>
    </motion.div>
  )
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="min-h-screen lg:h-screen bg-topuria-white relative overflow-hidden flex items-center py-12 lg:py-0"
    >
      {/* Background "MATADOR" text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.04, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[6rem] md:text-[8rem] lg:text-[12rem] xl:text-[16rem] font-black text-topuria-black leading-none"
          style={{ letterSpacing: '0.15em' }}
        >
          MATADOR
        </motion.h1>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-20 w-full">
        
        {/* MOBILE LAYOUT - Stack vertical */}
        <div className="lg:hidden space-y-8">
          
          {/* Mobile Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            {/* Champion Badge */}
            <div className="bg-topuria-red text-topuria-white px-4 py-2 font-bold uppercase tracking-wider text-xs mb-4 inline-block">
              Campeón Activo
            </div>
            
            {/* Title */}
            <h2 className="text-5xl font-black text-topuria-black leading-none tracking-[0.2em] mb-2">
              ILIA
            </h2>
            <h1 className="text-4xl font-black text-topuria-red leading-none tracking-[0.1em]">
              TOPURIA
            </h1>
          </motion.div>

          {/* Mobile Fighter Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative mx-auto"
          >
            <div className="relative h-80 w-64 mx-auto">
              <Image
                src="/images/ilia-hero.webp"
                alt="Ilia Topuria - El Matador"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
            
            {/* Record overlay */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-topuria-red via-topuria-black to-topuria-red text-topuria-white font-black text-2xl px-6 py-2 z-10">
              <div className="flex items-center gap-3">
                <span>17</span>
                <span>-</span>
                <span>0</span>
                <span>-</span>
                <span>0</span>
              </div>
            </div>
          </motion.div>

          {/* Mobile Mini Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {leftMiniCards.map((card, index) => (
              <MiniCardComponent key={index} card={card} delay={0} />
            ))}
            {rightMiniCards.map((card, index) => (
              <MiniCardComponent key={index} card={card} delay={0.2} />
            ))}
          </div>

          {/* Mobile Stats - Combined */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Circular Stats */}
            <div>
              <h3 className="text-lg font-bold text-topuria-black mb-4 text-center">
                Efectividad de Combate
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {circularStats.map((stat, index) => (
                  <CircularProgress 
                    key={stat.id} 
                    stat={stat} 
                    delay={index * 100}
                  />
                ))}
              </div>
            </div>

            {/* Simple Stats */}
            <div>
              <h3 className="text-lg font-bold text-topuria-black mb-4 text-center">
                Estadísticas Técnicas
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {rightStats.map((stat, index) => (
                  <StatCard key={stat.label} stat={stat} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* DESKTOP LAYOUT - Original grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 items-center h-full">
          
          {/* Left Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Mini card arriba */}
            <div className="mb-6">
              {leftMiniCards.map((card, index) => (
                <MiniCardComponent key={index} card={card} delay={0} />
              ))}
            </div>
            
            <div className="text-left">
              <h3 className="text-lg font-bold text-topuria-black mb-1">
                Efectividad de Combate
              </h3>
              <p className="text-xs text-gray-600">
                Análisis de rendimiento
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {circularStats.map((stat, index) => (
                <CircularProgress 
                  key={stat.id} 
                  stat={stat} 
                  delay={index * 150}
                />
              ))}
            </div>
          </motion.div>

          {/* Center Panel - Fighter */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex flex-col items-center justify-center h-full"
          >
            {/* Champion Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-topuria-red text-topuria-white px-6 py-2 font-bold uppercase tracking-wider text-sm z-10"
            >
              Campeón Activo
            </motion.div>

            {/* ILIA arriba */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10 text-center"
            >
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-topuria-black leading-none tracking-[0.3em]">
                ILIA
              </h2>
            </motion.div>

            {/* TOPURIA debajo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute top-40 left-1/2 transform -translate-x-1/2 z-10"
            >
              <h1 className="text-5xl md:text-6xl font-black text-topuria-red leading-none tracking-[0.1em]">
                TOPURIA
              </h1>
            </motion.div>

            {/* Fighter Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative h-full w-full max-w-[370px] mx-auto cursor-pointer mt-8 z-20"
            >
              <Image
                src="/images/ilia-hero.webp"
                alt="Ilia Topuria - El Matador"
                fill
                className="object-contain object-bottom"
                priority
              />
              
              {/* Subtle hover glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-topuria-red/5 to-transparent pointer-events-none"
              />
            </motion.div>

            {/* Record at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-topuria-red via-topuria-black to-topuria-red text-topuria-white font-black text-3xl px-8 py-3 z-50"
            >
              <div className="flex items-center gap-4">
                <span>17</span>
                <span>-</span>
                <span>0</span>
                <span>-</span>
                <span>0</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {/* Mini card arriba */}
            <div className="mb-6">
              {rightMiniCards.map((card, index) => (
                <MiniCardComponent key={index} card={card} delay={0.2} />
              ))}
            </div>
            
            <div className="text-left">
              <h3 className="text-lg font-bold text-topuria-black mb-1">
                Estadísticas Técnicas
              </h3>
              <p className="text-xs text-gray-600">
                Datos de rendimiento UFC
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {rightStats.map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}