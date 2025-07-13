// src/hooks/use-ufc-stats.ts
'use client'

import { useState, useEffect } from 'react'
import { FIGHTER_INFO, FIGHT_STATS } from '@/lib/constants'

export interface UFCFighterStats {
  record: {
    wins: number
    losses: number
    draws: number
  }
  finishes: {
    koTko: number
    submissions: number
    decisions: number
  }
  titles: string[]
  ranking: {
    poundForPound: number
    weightClass: string
  }
}

interface UseUFCStatsOptions {
  fighterId?: string
  autoRefresh?: boolean
}

interface UseUFCStatsResult {
  stats: UFCFighterStats | null
  loading: boolean
  error: string | null
}

// Datos estáticos optimizados
const TOPURIA_STATS: UFCFighterStats = {
  record: {
    wins: FIGHT_STATS.record.wins,
    losses: FIGHT_STATS.record.losses,
    draws: FIGHT_STATS.record.draws
  },
  finishes: {
    koTko: FIGHT_STATS.finishRate.ko,
    submissions: FIGHT_STATS.finishRate.submissions,
    decisions: FIGHT_STATS.finishRate.decisions
  },
  titles: [...FIGHT_STATS.titles],
  ranking: {
    poundForPound: 1,
    weightClass: FIGHTER_INFO.division
  }
}

export function useUFCStats(): UseUFCStatsResult {
  const [stats, setStats] = useState<UFCFighterStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simular carga de datos
    const loadStats = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Simular delay mínimo
        await new Promise(resolve => setTimeout(resolve, 100))
        
        setStats(TOPURIA_STATS)
      } catch {
        setError('Error loading stats')
        setStats(TOPURIA_STATS) // Fallback
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return {
    stats,
    loading,
    error
  }
}

// Hook simplificado que no tiene loading
export function useUFCStatsSimple(): UFCFighterStats {
  return TOPURIA_STATS
}

export default useUFCStats