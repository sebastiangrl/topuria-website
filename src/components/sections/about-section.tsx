// src/components/sections/about-section.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Trophy, Star, Flag, Zap, Medal, Heart, Crown, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Variants } from 'framer-motion'

interface TimelineEvent {
  id: string
  date: string
  year: string
  title: string
  subtitle: string
  description: string
  details: string[]
  location: string
  category: 'origen' | 'formacion' | 'profesional' | 'ufc' | 'campeon'
  icon: typeof MapPin
  backgroundImage: string
  color: string
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1997',
    date: '21 de enero, 1997',
    year: '1997',
    title: 'Nace el Futuro Campeón',
    subtitle: 'Halle, Alemania',
    description: 'Un niño georgiano ve la luz en tierra alemana',
    details: [
      'Padres georgianos refugiados de Abjasia',
      'Primeros años en ambiente multicultural',
      'Las raíces de tres naciones se plantan'
    ],
    location: 'Halle, Alemania',
    category: 'origen',
    icon: MapPin,
    backgroundImage: '/images/timeline/germany-bg.jpg',
    color: 'from-blue-900 to-gray-800'
  },
  {
    id: '2004',
    date: '2004',
    year: '2004',
    title: 'El Despertar del Guerrero',
    subtitle: 'Georgia, Tierra de Luchadores',
    description: 'Descubre la lucha grecorromana en su patria ancestral',
    details: [
      'Traslado a Georgia a los 7 años',
      'Inicio en lucha grecorromana escolar',
      'Su padre reconoce el talento natural',
      'Primeras bases del combate'
    ],
    location: 'Georgia',
    category: 'formacion',
    icon: Star,
    backgroundImage: '/images/timeline/georgia-bg.jpg',
    color: 'from-red-900 to-orange-800'
  },
  {
    id: '2012',
    date: '2012',
    year: '2012',
    title: 'España, El Hogar Definitivo',
    subtitle: 'Alicante - Donde Nace El Matador',
    description: 'La familia encuentra su hogar en tierras valencianas',
    details: [
      'Llegada a Alicante tras guerra ruso-georgiana',
      'Descubrimiento de las MMA en Climent Club',
      'Jorge y Agustín Climent como mentores',
      'Fusión de culturas y estilos de lucha'
    ],
    location: 'Alicante, España',
    category: 'formacion',
    icon: Flag,
    backgroundImage: '/images/timeline/spain-bg.jpg',
    color: 'from-red-700 to-yellow-600'
  },
  {
    id: '2015',
    date: 'Mayo 2015',
    year: '2015',
    title: 'El Sueño Comienza',
    subtitle: 'Debut Profesional',
    description: 'De cajero de Stradivarius a luchador profesional',
    details: [
      'Debut profesional a los 18 años',
      'Victoria por sumisión en primer asalto',
      'Trabajaba como cajero mientras entrenaba',
      'El sueño UFC se convierte en obsesión'
    ],
    location: 'España',
    category: 'profesional',
    icon: Zap,
    backgroundImage: '/images/timeline/debut-bg.jpg',
    color: 'from-green-800 to-emerald-700'
  },
  {
    id: '2018',
    date: 'Junio 2018',
    year: '2018',
    title: 'Campeón de Europa',
    subtitle: 'Cage Warriors',
    description: 'El primer cinturón que cambió todo',
    details: [
      'Título peso gallo Cage Warriors en Bélgica',
      'Victoria en menos de 2 minutos',
      'UFC toma nota del fenómeno español',
      'El ascenso meteórico comienza'
    ],
    location: 'Amberes, Bélgica',
    category: 'profesional',
    icon: Medal,
    backgroundImage: '/images/timeline/cage-warriors-bg.jpg',
    color: 'from-yellow-600 to-amber-700'
  },
  {
    id: '2020',
    date: '10 de octubre, 2020',
    year: '2020',
    title: 'Bienvenido a UFC',
    subtitle: 'El Sueño Se Hace Realidad',
    description: 'Debut victorioso en la jaula más prestigiosa del mundo',
    details: [
      'Enfrentamiento vs Youssef Zalal',
      'Victoria por decisión unánime',
      'Debut durante pandemia en Abu Dhabi',
      'Primer español en brillar en UFC'
    ],
    location: 'Abu Dhabi, UAE',
    category: 'ufc',
    icon: Trophy,
    backgroundImage: '/images/timeline/ufc-debut-bg.jpg',
    color: 'from-orange-700 to-red-600'
  },
  {
    id: '2022',
    date: '10 de diciembre, 2022',
    year: '2022',
    title: 'Rompiendo Invictos',
    subtitle: 'Bryce Mitchell Cae',
    description: 'La sumisión que anunció a un contendiente',
    details: [
      'Triángulo de brazo en segundo asalto',
      'Primera derrota de Mitchell',
      'Performance of the Night',
      'Camino al título se acelera'
    ],
    location: 'Las Vegas, Nevada',
    category: 'ufc',
    icon: Zap,
    backgroundImage: '/images/timeline/mitchell-bg.jpg',
    color: 'from-purple-800 to-indigo-700'
  },
  {
    id: '2024-feb',
    date: '17 de febrero, 2024',
    year: '2024',
    title: 'Corona Española',
    subtitle: 'Primer Campeón UFC de España',
    description: 'Volkanovski cae ante El Matador',
    details: [
      'KO devastador en segundo asalto',
      'Cumple promesa de noquear al australiano',
      'Primer español campeón UFC',
      'España celebra a su nuevo héroe'
    ],
    location: 'Anaheim, California',
    category: 'campeon',
    icon: Crown,
    backgroundImage: '/images/timeline/volkanovski-bg.jpg',
    color: 'from-red-600 to-pink-700'
  },
  {
    id: '2024-oct',
    date: '26 de octubre, 2024',
    year: '2024',
    title: 'Leyenda vs Leyenda',
    subtitle: 'El Primer KO de Holloway',
    description: 'Haciendo historia ante un grande',
    details: [
      'Noquea a Max Holloway en tercer asalto',
      'Primer KO en carrera de Holloway',
      'Defensa exitosa del título',
      'Silencia a todos los críticos'
    ],
    location: 'Abu Dhabi, UAE',
    category: 'campeon',
    icon: Trophy,
    backgroundImage: '/images/timeline/holloway-bg.jpg',
    color: 'from-yellow-600 to-orange-600'
  },
  {
    id: '2025',
    date: '28 de junio, 2025',
    year: '2025',
    title: 'El Matador Supremo',
    subtitle: 'Bicampeón UFC',
    description: 'Conquista segunda división y hace historia',
    details: [
      'KO a Charles Oliveira en primer asalto',
      'Campeón de dos divisiones',
      'Ranking #1 libra por libra',
      'Legado histórico consolidado'
    ],
    location: 'Las Vegas, Nevada',
    category: 'campeon',
    icon: Crown,
    backgroundImage: '/images/timeline/oliveira-bg.jpg',
    color: 'from-red-600 via-yellow-500 to-red-600'
  }
]

const CategoryIcon = ({ category }: { category: string }) => {
  const icons = {
    origen: MapPin,
    formacion: Star,
    profesional: Zap,
    ufc: Trophy,
    campeon: Crown
  }
  
  const Icon = icons[category as keyof typeof icons] || MapPin
  return <Icon className="w-5 h-5" />
}

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" })

  const currentEvent = timelineEvents[currentIndex]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !isInView) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % timelineEvents.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isInView])

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % timelineEvents.length)
  }

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + timelineEvents.length) % timelineEvents.length)
  }

  const goToIndex = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen bg-topuria-white relative overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative h-screen"
      >
        {/* Section Header */}
        <motion.div 
          variants={itemVariants}
          className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-topuria-white/90 backdrop-blur-sm border-2 border-topuria-red px-4 py-2 text-topuria-red font-bold uppercase tracking-wider text-sm shadow-solid-sm">
            <Heart className="w-4 h-4" />
            La Historia de El Matador
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="relative h-full">
          {/* Background Image with Overlay */}
          <motion.div
            key={currentEvent.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Placeholder background */}
            <div className={cn(
              'w-full h-full bg-gradient-to-br',
              currentEvent.color
            )} />
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />
            
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:50px_50px]" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Side - Event Content */}
                <motion.div
                  key={`content-${currentEvent.id}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-white"
                >
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-topuria-red flex items-center justify-center">
                      <CategoryIcon category={currentEvent.category} />
                    </div>
                    <span className="bg-topuria-white/20 backdrop-blur-sm px-3 py-1 text-sm font-bold uppercase tracking-wider">
                      {currentEvent.category}
                    </span>
                  </div>

                  {/* Year */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-6xl md:text-8xl font-black text-topuria-red mb-4 leading-none"
                  >
                    {currentEvent.year}
                  </motion.div>

                  {/* Title & Subtitle */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight">
                      {currentEvent.title}
                    </h2>
                    <h3 className="text-xl md:text-2xl font-medium text-topuria-gold mb-4">
                      {currentEvent.subtitle}
                    </h3>
                  </motion.div>

                  {/* Date & Location */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-4 mb-6 text-white/80"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{currentEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{currentEvent.location}</span>
                    </div>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-xl text-white/90 mb-6 leading-relaxed"
                  >
                    {currentEvent.description}
                  </motion.p>

                  {/* Details List */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-3"
                  >
                    {currentEvent.details.map((detail, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-topuria-gold mt-2 flex-shrink-0" />
                        <span className="text-white/80 leading-relaxed">{detail}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right Side - Visual Element */}
                <motion.div
                  key={`visual-${currentEvent.id}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative"
                >
                  {/* Large Icon Display */}
                  <div className="relative">
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-80 h-80 mx-auto bg-topuria-white/10 backdrop-blur-sm border-4 border-topuria-white/30 flex items-center justify-center"
                    >
                      <currentEvent.icon className="w-40 h-40 text-topuria-white" />
                    </motion.div>
                    
                    {/* Floating elements */}
                    <motion.div
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -top-4 -right-4 w-8 h-8 bg-topuria-gold"
                    />
                    
                    <motion.div
                      animate={{
                        y: [10, -10, 10],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                      }}
                      className="absolute -bottom-4 -left-4 w-6 h-6 bg-topuria-red"
                    />
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center gap-6">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="w-12 h-12 bg-topuria-white/20 backdrop-blur-sm border-2 border-topuria-white/30 flex items-center justify-center text-white hover:bg-topuria-white/30 transition-all duration-300 hover-press"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Timeline Dots */}
            <div className="flex items-center gap-2">
              {timelineEvents.map((event, index) => (
                <button
                  key={event.id}
                  onClick={() => goToIndex(index)}
                  className={cn(
                    'relative group transition-all duration-300',
                    index === currentIndex ? 'scale-125' : 'hover:scale-110'
                  )}
                >
                  <div className={cn(
                    'w-4 h-4 border-2 transition-all duration-300',
                    index === currentIndex
                      ? 'bg-topuria-red border-topuria-red'
                      : 'bg-topuria-white/20 border-topuria-white/50 hover:bg-topuria-white/40'
                  )} />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-topuria-black text-topuria-white px-3 py-1 text-xs font-bold whitespace-nowrap">
                      {event.year} - {event.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="w-12 h-12 bg-topuria-white/20 backdrop-blur-sm border-2 border-topuria-white/30 flex items-center justify-center text-white hover:bg-topuria-white/30 transition-all duration-300 hover-press"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Auto-play indicator */}
        {isAutoPlaying && (
          <div className="absolute top-8 right-8 z-20">
            <div className="flex items-center gap-2 bg-topuria-white/20 backdrop-blur-sm px-3 py-2 text-white text-sm">
              <div className="w-2 h-2 bg-topuria-red animate-pulse" />
              <span>Auto-reproducción</span>
              <button 
                onClick={() => setIsAutoPlaying(false)}
                className="ml-2 text-topuria-white/60 hover:text-topuria-white"
              >
                ✕
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </section>
  )
}