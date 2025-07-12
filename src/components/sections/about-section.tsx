// src/components/sections/about-section.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Heart, Trophy, Star, Flag, Calendar, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Variants } from 'framer-motion'

interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  location: string
  icon: any
  category: 'life' | 'career' | 'achievement'
  image?: string
  details?: string[]
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1997',
    year: '1997',
    title: 'Born in Germany',
    description: 'Ilia Topuria born in Halle, Germany to Georgian parents',
    location: 'Halle, Germany',
    icon: MapPin,
    category: 'life',
    details: [
      'Born January 21st to Georgian immigrant parents',
      'First exposure to European culture and values',
      'Early childhood in multicultural environment'
    ]
  },
  {
    id: '2008',
    year: '2008',
    title: 'Move to Spain',
    description: 'Family relocates to Spain, where Ilia would grow up',
    location: 'Alicante, Spain',
    icon: Flag,
    category: 'life',
    details: [
      'Family moved to Alicante seeking better opportunities',
      'Learned Spanish and embraced Spanish culture',
      'Developed deep connection to Spain'
    ]
  },
  {
    id: '2001',
    year: '2001',
    title: 'First Steps in Combat',
    description: 'Started training in Brazilian Jiu-Jitsu at age 4',
    location: 'Spain',
    icon: Users,
    category: 'career',
    details: [
      'Father introduced him to martial arts',
      'Began with Brazilian Jiu-Jitsu fundamentals',
      'Showed natural talent and dedication'
    ]
  },
  {
    id: '2015',
    year: '2015',
    title: 'Professional Debut',
    description: 'First professional MMA fight in Venezuela',
    location: 'Venezuela',
    icon: Star,
    category: 'career',
    details: [
      'Won by submission in first round',
      'Against Francisco Javier Asprilla',
      'Marked beginning of professional career'
    ]
  },
  {
    id: '2020',
    year: '2020',
    title: 'UFC Debut',
    description: 'Signed with UFC and made successful debut',
    location: 'Abu Dhabi, UAE',
    icon: Trophy,
    category: 'achievement',
    details: [
      'Defeated Youssef Zalal by unanimous decision',
      'Fought during COVID-19 pandemic',
      'Proved he belonged on biggest stage'
    ]
  },
  {
    id: '2024',
    year: '2024',
    title: 'Featherweight Champion',
    description: 'Defeated Alexander Volkanovski to become champion',
    location: 'Anaheim, California',
    icon: Trophy,
    category: 'achievement',
    details: [
      'Knocked out Volkanovski in round 2',
      'Became first Spanish UFC champion',
      'Achieved childhood dream'
    ]
  },
  {
    id: '2025',
    year: '2025',
    title: 'Lightweight Champion',
    description: 'Moved up and conquered second division',
    location: 'Las Vegas, Nevada',
    icon: Trophy,
    category: 'achievement',
    details: [
      'Defeated Charles Oliveira for lightweight title',
      'Became two-division champion',
      'Reached #1 P4P ranking'
    ]
  }
]

const personalStats = [
  {
    label: 'Countries',
    value: '3',
    description: 'Germany, Georgia, Spain',
    icon: MapPin,
    color: 'text-blue-500'
  },
  {
    label: 'Languages',
    value: '4',
    description: 'Spanish, Georgian, German, English',
    icon: Users,
    color: 'text-green-500'
  },
  {
    label: 'Training Age',
    value: '20+',
    description: 'Years in martial arts',
    icon: Calendar,
    color: 'text-purple-500'
  },
  {
    label: 'Citizenship',
    value: '2',
    description: 'Georgian & Spanish',
    icon: Flag,
    color: 'text-spanish-red'
  }
]

export default function AboutSection() {
  const [activeEvent, setActiveEvent] = useState<string>('2025')
  const [hoveredStat, setHoveredStat] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
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

  const timelineVariants: Variants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  }

  const eventVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'life': return 'bg-blue-500/10 border-blue-500/20 text-blue-600'
      case 'career': return 'bg-spanish-gold/10 border-spanish-gold/20 text-spanish-gold'
      case 'achievement': return 'bg-spanish-red/10 border-spanish-red/20 text-spanish-red'
      default: return 'bg-muted'
    }
  }

  const selectedEvent = timelineEvents.find(event => event.id === activeEvent)

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/30 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_var(--spanish-red)_0%,_transparent_50%),_radial-gradient(circle_at_75%_75%,_var(--spanish-gold)_0%,_transparent_50%)]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4 relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-spanish-red border-spanish-red/30">
            <Heart className="w-4 h-4 mr-2" />
            The Journey
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">
            From Three Nations,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-spanish-red to-spanish-gold">
              One Champion
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The extraordinary story of a fighter who carries the heart of Georgia, 
            the spirit of Spain, and was born under German skies. 
            Three cultures, one unbreakable will.
          </p>
        </motion.div>

        {/* Personal Stats */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto"
        >
          {personalStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={eventVariants}
              custom={index}
              onHoverStart={() => setHoveredStat(stat.label)}
              onHoverEnd={() => setHoveredStat(null)}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Card className="p-6 bg-background/50 backdrop-blur-sm border-border/50 hover:border-spanish-red/30 transition-all duration-300">
                <CardContent className="p-0">
                  <motion.div
                    animate={{
                      scale: hoveredStat === stat.label ? 1.1 : 1,
                      rotate: hoveredStat === stat.label ? 5 : 0
                    }}
                    className="flex items-center justify-center mb-3"
                  >
                    <stat.icon className={cn('w-8 h-8', stat.color)} />
                  </motion.div>
                  <div className="text-3xl font-black text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Timeline Navigation */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-spanish-red" />
              Life Timeline
            </h3>
            
            <motion.div 
              variants={timelineVariants}
              className="relative"
            >
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-spanish-red via-spanish-gold to-spanish-red" />
              
              {/* Timeline Events */}
              <div className="space-y-6">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    variants={eventVariants}
                    custom={index}
                    whileHover={{ x: 4 }}
                    onClick={() => setActiveEvent(event.id)}
                    className={cn(
                      'relative flex items-center cursor-pointer group',
                      'transition-all duration-300'
                    )}
                  >
                    {/* Timeline Dot */}
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={cn(
                        'relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center',
                        'transition-all duration-300',
                        activeEvent === event.id
                          ? 'bg-spanish-red border-spanish-red text-white shadow-lg'
                          : 'bg-background border-border text-muted-foreground group-hover:border-spanish-red/50'
                      )}
                    >
                      <event.icon className="w-5 h-5" />
                    </motion.div>

                    {/* Event Content */}
                    <div className="ml-6 flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <span className={cn(
                          'text-sm font-bold px-2 py-1 rounded-full',
                          getCategoryColor(event.category)
                        )}>
                          {event.year}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {event.location}
                        </Badge>
                      </div>
                      
                      <h4 className={cn(
                        'font-semibold transition-colors',
                        activeEvent === event.id 
                          ? 'text-spanish-red' 
                          : 'text-foreground group-hover:text-spanish-red'
                      )}>
                        {event.title}
                      </h4>
                      
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Event Details */}
          <motion.div variants={itemVariants} className="lg:sticky lg:top-8">
            {selectedEvent && (
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8 bg-background/80 backdrop-blur-md border-spanish-red/20">
                  <CardContent className="p-0">
                    {/* Event Header */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-spanish-red/10 rounded-full flex items-center justify-center">
                        <selectedEvent.icon className="w-8 h-8 text-spanish-red" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className="bg-spanish-red text-white">
                            {selectedEvent.year}
                          </Badge>
                          <Badge variant="outline">
                            {selectedEvent.location}
                          </Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">
                          {selectedEvent.title}
                        </h3>
                      </div>
                    </div>

                    {/* Event Description */}
                    <p className="text-lg text-muted-foreground mb-6">
                      {selectedEvent.description}
                    </p>

                    {/* Event Details */}
                    {selectedEvent.details && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">Key Details:</h4>
                        <ul className="space-y-2">
                          {selectedEvent.details.map((detail, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start space-x-2 text-sm text-muted-foreground"
                            >
                              <div className="w-1.5 h-1.5 bg-spanish-red rounded-full mt-2 flex-shrink-0" />
                              <span>{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Cultural Heritage */}
        <motion.div variants={itemVariants} className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Cultural Heritage
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three nations shaped the champion. Each culture contributed to his unique fighting style and mentality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                country: 'Germany',
                flag: '🇩🇪',
                contribution: 'Discipline & Precision',
                description: 'German engineering mindset brought systematic approach to training and technique refinement.',
                color: 'border-yellow-500/30 hover:border-yellow-500'
              },
              {
                country: 'Georgia',
                flag: '🇬🇪',
                contribution: 'Warrior Spirit',
                description: 'Georgian wrestling traditions and unbreakable warrior mentality formed his fighting foundation.',
                color: 'border-red-500/30 hover:border-red-500'
              },
              {
                country: 'Spain',
                flag: '🇪🇸',
                contribution: 'Passion & Heart',
                description: 'Spanish passion and "El Matador" spirit gave him the killer instinct and showmanship.',
                color: 'border-spanish-red/30 hover:border-spanish-red'
              }
            ].map((culture, index) => (
              <motion.div
                key={culture.country}
                variants={eventVariants}
                custom={index}
                whileHover={{ y: -4, scale: 1.02 }}
                className={cn(
                  'p-6 rounded-xl border-2 bg-background/50 backdrop-blur-sm',
                  'transition-all duration-300',
                  culture.color
                )}
              >
                <div className="text-4xl mb-4 text-center">{culture.flag}</div>
                <h4 className="text-xl font-bold text-foreground mb-2 text-center">
                  {culture.country}
                </h4>
                <div className="text-spanish-red font-semibold text-center mb-3">
                  {culture.contribution}
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  {culture.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}