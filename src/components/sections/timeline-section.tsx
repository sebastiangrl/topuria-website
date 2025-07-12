// src/components/sections/timeline-section.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin, Trophy, Zap, Award, Play, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CAREER_HIGHLIGHTS } from '@/lib/constants'
import type { Variants } from 'framer-motion'

interface Fight {
  id: string
  date: string
  event: string
  opponent: string
  result: 'Win' | 'Loss' | 'Draw' | 'NC'
  method: string
  round: number
  time: string
  location: string
  significance: 'debut' | 'title-fight' | 'defense' | 'elimination' | 'regular'
  bonus?: 'potn' | 'fotn' | 'sub-night' | 'ko-night'
  description: string
  image?: string
  videoUrl?: string
}

const professionalFights: Fight[] = [
  {
    id: 'ufc-317-2025',
    date: '2025-06-28',
    event: 'UFC 317',
    opponent: 'Charles Oliveira',
    result: 'Win',
    method: 'KO (Punch)',
    round: 1,
    time: '2:27',
    location: 'Las Vegas, Nevada',
    significance: 'title-fight',
    bonus: 'potn',
    description: 'Won UFC Lightweight Championship with devastating first-round knockout',
  },
  {
    id: 'ufc-308-2024',
    date: '2024-10-26',
    event: 'UFC 308',
    opponent: 'Max Holloway',
    result: 'Win',
    method: 'KO (Punch)',
    round: 3,
    time: '1:34',
    location: 'Abu Dhabi, UAE',
    significance: 'defense',
    bonus: 'potn',
    description: 'First featherweight title defense, knocked out legendary Max Holloway',
  },
  {
    id: 'ufc-298-2024',
    date: '2024-02-17',
    event: 'UFC 298',
    opponent: 'Alexander Volkanovski',
    result: 'Win',
    method: 'KO (Punch)',
    round: 2,
    time: '3:32',
    location: 'Anaheim, California',
    significance: 'title-fight',
    bonus: 'potn',
    description: 'Won UFC Featherweight Championship, ending Volkanovski\'s historic reign',
  },
  {
    id: 'ufc-abc-2023',
    date: '2023-06-24',
    event: 'UFC on ABC 5',
    opponent: 'Josh Emmett',
    result: 'Win',
    method: 'Decision (Unanimous)',
    round: 5,
    time: '5:00',
    location: 'Jacksonville, Florida',
    significance: 'elimination',
    bonus: 'fotn',
    description: 'Earned title shot with dominant performance against top contender',
  },
  {
    id: 'ufc-282-2022',
    date: '2022-12-10',
    event: 'UFC 282',
    opponent: 'Bryce Mitchell',
    result: 'Win',
    method: 'Submission (Arm Triangle)',
    round: 2,
    time: '3:10',
    location: 'Las Vegas, Nevada',
    significance: 'regular',
    bonus: 'potn',
    description: 'Dominated undefeated prospect with superior grappling',
  },
  {
    id: 'ufc-fight-night-2022',
    date: '2022-03-19',
    event: 'UFC Fight Night 204',
    opponent: 'Jai Herbert',
    result: 'Win',
    method: 'KO (Punch)',
    round: 2,
    time: '1:07',
    location: 'London, England',
    significance: 'regular',
    bonus: 'potn',
    description: 'First lightweight appearance, devastating knockout',
  },
  {
    id: 'ufc-264-2021',
    date: '2021-07-10',
    event: 'UFC 264',
    opponent: 'Ryan Hall',
    result: 'Win',
    method: 'KO (Punch)',
    round: 1,
    time: '1:47',
    location: 'Las Vegas, Nevada',
    significance: 'regular',
    description: 'Showcase performance on McGregor vs Poirier 3 card',
  },
  {
    id: 'ufc-espn-2020',
    date: '2020-12-05',
    event: 'UFC on ESPN 19',
    opponent: 'Damon Jackson',
    result: 'Win',
    method: 'KO (Punch)',
    round: 1,
    time: '2:38',
    location: 'Abu Dhabi, UAE',
    significance: 'regular',
    description: 'Second UFC fight, early knockout statement',
  },
  {
    id: 'ufc-fight-night-2020',
    date: '2020-10-10',
    event: 'UFC Fight Night 179',
    opponent: 'Youssef Zalal',
    result: 'Win',
    method: 'Decision (Unanimous)',
    round: 3,
    time: '5:00',
    location: 'Abu Dhabi, UAE',
    significance: 'debut',
    description: 'UFC debut during COVID-19 pandemic, convincing victory',
  }
]

export default function TimelineSection() {
  const [selectedFight, setSelectedFight] = useState<Fight | null>(professionalFights[0])
  const [filter, setFilter] = useState<'all' | 'title-fights' | 'bonuses'>('all')
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const filteredFights = professionalFights.filter(fight => {
    if (filter === 'title-fights') return ['title-fight', 'defense'].includes(fight.significance)
    if (filter === 'bonuses') return fight.bonus
    return true
  })

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

  const fightVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
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

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'title-fight': return 'bg-spanish-red text-white'
      case 'defense': return 'bg-spanish-gold text-black'
      case 'elimination': return 'bg-purple-500 text-white'
      case 'debut': return 'bg-blue-500 text-white'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getBonusColor = (bonus?: string) => {
    switch (bonus) {
      case 'potn': return 'border-spanish-red text-spanish-red'
      case 'fotn': return 'border-spanish-gold text-spanish-gold'
      case 'sub-night': return 'border-purple-500 text-purple-500'
      case 'ko-night': return 'border-red-500 text-red-500'
      default: return ''
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <section
      ref={sectionRef}
      id="career"
      className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/30 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-spanish-red rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-spanish-gold rounded-full blur-3xl" />
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
            <Calendar className="w-4 h-4 mr-2" />
            Fight Timeline
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">
            Road to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-spanish-red to-spanish-gold">
              Greatness
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every fight tells a story. From UFC debut to two-division champion, 
            witness the journey of El Matador through the octagon.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div variants={itemVariants} className="flex justify-center mb-12">
          <div className="flex space-x-2 p-1 bg-muted rounded-lg">
            {[
              { key: 'all', label: 'All Fights', icon: Trophy },
              { key: 'title-fights', label: 'Title Fights', icon: Award },
              { key: 'bonuses', label: 'Bonuses', icon: Zap }
            ].map((filterOption) => (
              <Button
                key={filterOption.key}
                variant={filter === filterOption.key ? "default" : "ghost"}
                onClick={() => setFilter(filterOption.key as any)}
                className={cn(
                  'flex items-center space-x-2',
                  filter === filterOption.key 
                    ? 'bg-spanish-red text-white' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <filterOption.icon className="w-4 h-4" />
                <span>{filterOption.label}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Timeline Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Fights List */}
          <div className="lg:col-span-2">
            <motion.div variants={itemVariants} className="space-y-4">
              {filteredFights.map((fight, index) => (
                <motion.div
                  key={fight.id}
                  variants={fightVariants}
                  custom={index}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedFight(fight)}
                  className={cn(
                    'relative cursor-pointer transition-all duration-300',
                    selectedFight?.id === fight.id ? 'scale-[1.02]' : ''
                  )}
                >
                  <Card className={cn(
                    'p-6 bg-background/80 backdrop-blur-sm transition-all duration-300',
                    selectedFight?.id === fight.id 
                      ? 'border-spanish-red/50 shadow-lg' 
                      : 'border-border/50 hover:border-spanish-red/30'
                  )}>
                    <CardContent className="p-0">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getSignificanceColor(fight.significance)}>
                              {fight.event}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {formatDate(fight.date)}
                            </Badge>
                            {fight.bonus && (
                              <Badge variant="outline" className={cn('text-xs', getBonusColor(fight.bonus))}>
                                {fight.bonus.toUpperCase()}
                              </Badge>
                            )}
                          </div>
                          
                          <h3 className={cn(
                            'text-lg font-bold transition-colors',
                            selectedFight?.id === fight.id 
                              ? 'text-spanish-red' 
                              : 'text-foreground'
                          )}>
                            vs {fight.opponent}
                          </h3>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {fight.location}
                            </span>
                            <span>{fight.method}</span>
                            <span>R{fight.round} {fight.time}</span>
                          </div>
                        </div>
                        
                        <div className={cn(
                          'text-right',
                          fight.result === 'Win' ? 'text-emerald-500' : 'text-red-500'
                        )}>
                          <div className="text-2xl font-black">
                            {fight.result === 'Win' ? 'W' : 'L'}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {fight.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Fight Details */}
          <div className="lg:sticky lg:top-8">
            {selectedFight && (
              <motion.div
                key={selectedFight.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8 bg-background/90 backdrop-blur-md border-spanish-red/20">
                  <CardContent className="p-0">
                    {/* Fight Header */}
                    <div className="text-center mb-6">
                      <Badge className={getSignificanceColor(selectedFight.significance)} variant="outline">
                        {selectedFight.event}
                      </Badge>
                      <h3 className="text-2xl font-bold text-foreground mt-2 mb-1">
                        vs {selectedFight.opponent}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(selectedFight.date)} • {selectedFight.location}
                      </div>
                    </div>

                    {/* Fight Result */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className={cn(
                          'text-3xl font-black mb-1',
                          selectedFight.result === 'Win' ? 'text-emerald-500' : 'text-red-500'
                        )}>
                          {selectedFight.result}
                        </div>
                        <div className="text-xs text-muted-foreground">Result</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold text-foreground mb-1">
                          R{selectedFight.round} {selectedFight.time}
                        </div>
                        <div className="text-xs text-muted-foreground">Finish Time</div>
                      </div>
                    </div>

                    {/* Method */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-2">Method</h4>
                      <div className="p-3 bg-spanish-red/10 rounded-lg border border-spanish-red/20">
                        <span className="text-spanish-red font-semibold">
                          {selectedFight.method}
                        </span>
                      </div>
                    </div>

                    {/* Bonuses */}
                    {selectedFight.bonus && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-2">Performance Bonus</h4>
                        <Badge className={cn('text-sm', getBonusColor(selectedFight.bonus))}>
                          <Award className="w-4 h-4 mr-1" />
                          {selectedFight.bonus === 'potn' && 'Performance of the Night'}
                          {selectedFight.bonus === 'fotn' && 'Fight of the Night'}
                          {selectedFight.bonus === 'sub-night' && 'Submission of the Night'}
                          {selectedFight.bonus === 'ko-night' && 'KO of the Night'}
                        </Badge>
                      </div>
                    )}

                    {/* Description */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-2">Fight Summary</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedFight.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {selectedFight.videoUrl && (
                        <Button className="w-full bg-spanish-red hover:bg-dark-red text-white">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Highlights
                        </Button>
                      )}
                      
                      <Button variant="outline" className="w-full border-spanish-red/30 hover:bg-spanish-red/5">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Full Fight Stats
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>

        {/* Career Milestones */}
        <motion.div variants={itemVariants} className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Career Milestones
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key achievements that define the legacy of El Matador
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'UFC Debut',
                value: '2020',
                description: 'First fight in the octagon',
                icon: Trophy,
                color: 'text-blue-500'
              },
              {
                title: 'Title Shot',
                value: '4 Years',
                description: 'From debut to championship',
                icon: Zap,
                color: 'text-purple-500'
              },
              {
                title: 'Two Divisions',
                value: '1 Year',
                description: 'Time between championships',
                icon: Award,
                color: 'text-spanish-gold'
              },
              {
                title: 'Undefeated',
                value: '16-0',
                description: 'Perfect professional record',
                icon: Trophy,
                color: 'text-spanish-red'
              }
            ].map((milestone, index) => (
              <motion.div
                key={milestone.title}
                variants={fightVariants}
                custom={index}
                whileHover={{ y: -4, scale: 1.02 }}
                className="text-center"
              >
                <Card className="p-6 bg-background/80 backdrop-blur-sm border-border/50 hover:border-spanish-red/30 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center">
                        <milestone.icon className={cn('w-8 h-8', milestone.color)} />
                      </div>
                    </div>
                    
                    <div className={cn('text-3xl font-black mb-2', milestone.color)}>
                      {milestone.value}
                    </div>
                    
                    <h4 className="font-semibold text-foreground mb-1">
                      {milestone.title}
                    </h4>
                    
                    <p className="text-sm text-muted-foreground">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fight Record Summary */}
        <motion.div variants={itemVariants} className="mt-16">
          <Card className="p-8 bg-gradient-to-br from-spanish-red/5 to-spanish-gold/5 border-spanish-red/20">
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Professional Record
                </h3>
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-spanish-red to-spanish-gold mb-4">
                  16-0-0
                </div>
                <p className="text-muted-foreground">
                  Undefeated in professional mixed martial arts
                </p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-500 mb-1">
                    15
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Finishes
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-black text-red-500 mb-1">
                    7
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Knockouts
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-500 mb-1">
                    8
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Submissions
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-black text-spanish-gold mb-1">
                    5
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Bonuses
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </section>
  )
}