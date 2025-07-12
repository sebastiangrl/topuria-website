// src/components/sections/stats-section.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Target, Zap, Shield, Award, BarChart3, Trophy, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { FIGHT_STATS } from '@/lib/constants'
import type { Variants } from 'framer-motion'

interface StatCard {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon: any
  description: string
  color: string
  bgColor: string
}

interface FightMetric {
  label: string
  value: number
  max: number
  color: string
  description: string
}

const performanceStats: StatCard[] = [
  {
    title: 'Win Rate',
    value: '100%',
    trend: 'up',
    icon: Trophy,
    description: 'Undefeated professional record',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500/10'
  },
  {
    title: 'Finish Rate',
    value: '93.7%',
    change: '+5%',
    trend: 'up',
    icon: Zap,
    description: 'Percentage of fights finished before decision',
    color: 'text-spanish-red',
    bgColor: 'bg-spanish-red/10'
  },
  {
    title: 'Avg Fight Time',
    value: '1.8',
    change: '-0.5',
    trend: 'down',
    icon: Clock,
    description: 'Average rounds per fight',
    color: 'text-spanish-gold',
    bgColor: 'bg-spanish-gold/10'
  },
  {
    title: 'Title Defenses',
    value: '2',
    change: '+2',
    trend: 'up',
    icon: Shield,
    description: 'Successful championship defenses',
    color: 'text-purple-600',
    bgColor: 'bg-purple-500/10'
  }
]

const fightingMetrics: FightMetric[] = [
  {
    label: 'Striking Accuracy',
    value: 89,
    max: 100,
    color: 'bg-spanish-red',
    description: 'Significant strikes landed percentage'
  },
  {
    label: 'Takedown Defense',
    value: 95,
    max: 100,
    color: 'bg-spanish-gold',
    description: 'Percentage of takedowns defended'
  },
  {
    label: 'Submission Rate',
    value: 50,
    max: 100,
    color: 'bg-purple-500',
    description: 'Wins by submission percentage'
  },
  {
    label: 'KO/TKO Rate',
    value: 44,
    max: 100,
    color: 'bg-red-500',
    description: 'Wins by knockout percentage'
  }
]

const recordBreakdown = [
  { category: 'Total Wins', value: FIGHT_STATS.record.wins, color: 'text-emerald-600' },
  { category: 'Knockouts', value: FIGHT_STATS.finishRate.ko, color: 'text-red-500' },
  { category: 'Submissions', value: FIGHT_STATS.finishRate.submissions, color: 'text-purple-500' },
  { category: 'Decisions', value: FIGHT_STATS.finishRate.decisions, color: 'text-blue-500' }
]

const championshipStats = [
  { division: 'Lightweight', status: 'Current Champion', defenses: 0, color: 'border-spanish-red' },
  { division: 'Featherweight', status: 'Former Champion', defenses: 1, color: 'border-spanish-gold' }
]

export default function StatsSection() {
  const [activeMetric, setActiveMetric] = useState<string | null>(null)
  const [animatedValues, setAnimatedValues] = useState<{[key: string]: number}>({})
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Animate counters when section comes into view
  useEffect(() => {
    if (isInView) {
      const animateValue = (key: string, start: number, end: number, duration: number) => {
        const startTime = performance.now()
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          const easeOutCubic = 1 - Math.pow(1 - progress, 3)
          const current = start + (end - start) * easeOutCubic
          
          setAnimatedValues(prev => ({ ...prev, [key]: Math.floor(current) }))
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }
        requestAnimationFrame(animate)
      }

      // Animate metrics
      fightingMetrics.forEach((metric, index) => {
        setTimeout(() => {
          animateValue(metric.label, 0, metric.value, 2000)
        }, index * 200)
      })

      // Animate record breakdown
      recordBreakdown.forEach((record, index) => {
        setTimeout(() => {
          animateValue(record.category, 0, record.value, 1500)
        }, index * 150)
      })
    }
  }, [isInView])

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

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-spanish-red rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-spanish-gold rounded-full blur-3xl" />
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
            <BarChart3 className="w-4 h-4 mr-2" />
            Performance Analytics
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">
            Championship
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-spanish-red to-spanish-gold">
              Statistics
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Numbers that define dominance. Every statistic tells the story of precision, 
            power, and the relentless pursuit of perfection inside the octagon.
          </p>
        </motion.div>

        {/* Performance Overview Cards */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {performanceStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <Card className="p-6 bg-background/80 backdrop-blur-sm border-border/50 hover:border-spanish-red/30 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn('p-3 rounded-lg', stat.bgColor)}>
                      <stat.icon className={cn('w-6 h-6', stat.color)} />
                    </div>
                    {stat.trend && (
                      <TrendingUp className={cn(
                        'w-4 h-4',
                        stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'
                      )} />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-black text-foreground">
                        {stat.value}
                      </span>
                      {stat.change && (
                        <span className={cn(
                          'text-sm font-medium',
                          stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'
                        )}>
                          {stat.change}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-foreground group-hover:text-spanish-red transition-colors">
                      {stat.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Fighting Metrics */}
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Fighting Metrics
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {fightingMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                variants={cardVariants}
                onHoverStart={() => setActiveMetric(metric.label)}
                onHoverEnd={() => setActiveMetric(null)}
                className="group"
              >
                <Card className="p-6 bg-background/80 backdrop-blur-sm border-border/50 hover:border-spanish-red/30 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-foreground group-hover:text-spanish-red transition-colors">
                        {metric.label}
                      </h4>
                      <span className="text-2xl font-black text-spanish-red">
                        {animatedValues[metric.label] || 0}%
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{animatedValues[metric.label] || 0}/{metric.max}</span>
                      </div>
                      
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={cn(metric.color, 'h-full rounded-full')}
                          initial={{ width: 0 }}
                          animate={{ 
                            width: isInView ? `${(animatedValues[metric.label] || 0)}%` : 0 
                          }}
                          transition={{ 
                            duration: 2, 
                            delay: index * 0.2,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {metric.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Record Breakdown and Championships */}
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Record Breakdown */}
          <motion.div variants={itemVariants}>
            <Card className="p-8 bg-background/80 backdrop-blur-sm border-spanish-red/20">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="flex items-center">
                  <Award className="w-6 h-6 mr-2 text-spanish-red" />
                  Fight Record Breakdown
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="space-y-6">
                  {recordBreakdown.map((record, index) => (
                    <motion.div
                      key={record.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-center justify-between"
                    >
                      <span className="font-medium text-foreground">
                        {record.category}
                      </span>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <span className={cn('text-2xl font-black', record.color)}>
                            {animatedValues[record.category] || 0}
                          </span>
                        </div>
                        
                        <div className="w-16 bg-muted rounded-full h-2">
                          <motion.div
                            className={cn('h-full rounded-full', record.color.replace('text-', 'bg-'))}
                            initial={{ width: 0 }}
                            animate={{ 
                              width: isInView ? `${(animatedValues[record.category] || 0) * 6.25}%` : 0 
                            }}
                            transition={{ 
                              duration: 1.5, 
                              delay: index * 0.1,
                              ease: "easeOut"
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-spanish-red/5 rounded-lg border border-spanish-red/20">
                  <div className="text-center">
                    <div className="text-4xl font-black text-spanish-red mb-1">
                      {FIGHT_STATS.record.wins}-{FIGHT_STATS.record.losses}-{FIGHT_STATS.record.draws}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Professional MMA Record
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Championship History */}
          <motion.div variants={itemVariants}>
            <Card className="p-8 bg-background/80 backdrop-blur-sm border-spanish-gold/20">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-spanish-gold" />
                  Championship History
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="space-y-6">
                  {championshipStats.map((division, index) => (
                    <motion.div
                      key={division.division}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      className={cn(
                        'p-6 rounded-lg border-2 bg-muted/20',
                        division.color
                      )}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-foreground">
                          {division.division}
                        </h4>
                        <Badge 
                          variant={division.status === 'Current Champion' ? 'default' : 'outline'}
                          className={division.status === 'Current Champion' ? 'bg-spanish-red text-white' : ''}
                        >
                          {division.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Title Defenses:</span>
                          <div className="text-xl font-black text-foreground">
                            {division.defenses}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <div className="font-semibold text-foreground">
                            {division.status === 'Current Champion' ? 'Active' : 'Vacated'}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-spanish-gold/10 rounded-full border border-spanish-gold/30">
                    <Trophy className="w-5 h-5 text-spanish-gold" />
                    <span className="font-semibold text-spanish-gold">
                      Two-Division Champion
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* UFC Comparison */}
        <motion.div variants={itemVariants} className="mt-16">
          <Card className="p-8 bg-gradient-to-br from-spanish-red/5 to-spanish-gold/5 border-spanish-red/20">
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  UFC Elite Status
                </h3>
                <p className="text-muted-foreground">
                  Among the most dominant champions in UFC history
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-black text-spanish-red mb-2">
                    #1
                  </div>
                  <div className="font-semibold text-foreground mb-1">
                    P4P Ranking
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Pound-for-pound best fighter
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-black text-spanish-gold mb-2">
                    10th
                  </div>
                  <div className="font-semibold text-foreground mb-1">
                    Two-Division Champion
                  </div>
                  <div className="text-sm text-muted-foreground">
                    In UFC history
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-black text-purple-500 mb-2">
                    1st
                  </div>
                  <div className="font-semibold text-foreground mb-1">
                    Spanish UFC Champion
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Historic achievement
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