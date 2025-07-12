// src/hooks/use-ufc-stats.ts
import { useState, useEffect, useCallback } from 'react'
import { ufcService, type FighterStats, type Fight } from '@/lib/api/ufc-service'

interface UseUFCStatsResult {
  stats: FighterStats | null
  loading: boolean
  error: string | null
  refreshStats: () => Promise<void>
  lastUpdated: Date | null
}

interface UseUFCStatsOptions {
  fighterId?: string
  autoRefresh?: boolean
  refreshInterval?: number // en milisegundos
}

export function useUFCStats(options: UseUFCStatsOptions = {}): UseUFCStatsResult {
  const {
    fighterId = 'ilia-topuria',
    autoRefresh = false,
    refreshInterval = 300000 // 5 minutos por defecto
  } = options

  const [stats, setStats] = useState<FighterStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await ufcService.getFighterStats(fighterId)
      setStats(data)
      setLastUpdated(new Date())
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching UFC stats'
      setError(errorMessage)
      console.error('Error in useUFCStats:', err)
    } finally {
      setLoading(false)
    }
  }, [fighterId])

  const refreshStats = useCallback(async () => {
    await fetchStats()
  }, [fetchStats])

  // Fetch inicial
  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  // Auto refresh si está habilitado
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchStats()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, fetchStats])

  // Cleanup
  useEffect(() => {
    return () => {
      setStats(null)
      setLoading(false)
      setError(null)
    }
  }, [])

  return {
    stats,
    loading,
    error,
    refreshStats,
    lastUpdated
  }
}

/**
 * Hook para obtener el próximo evento/pelea
 */
export function useNextFight(fighterId: string = 'ilia-topuria') {
  const [nextFight, setNextFight] = useState<Fight | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNextFight = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const fight = await ufcService.getNextFight(fighterId)
        setNextFight(fight)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error fetching next fight'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchNextFight()
  }, [fighterId])

  return { nextFight, loading, error }
}

/**
 * Hook para datos con caché local
 */
export function useUFCStatsWithCache(fighterId: string = 'ilia-topuria') {
  const [stats, setStats] = useState<FighterStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFromCache, setIsFromCache] = useState(false)

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true)
        setError(null)

        // Intentar cargar desde caché primero
        const cacheKey = `fighter_${fighterId}`
        const cached = localStorage.getItem(cacheKey)
        
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          
          // Si los datos tienen menos de 1 hora, usarlos
          if (ufcService.isDataFresh(timestamp)) {
            setStats(data)
            setIsFromCache(true)
            setLoading(false)
            return
          }
        }

        // Si no hay caché o está obsoleto, cargar datos frescos
        const freshData = await ufcService.refreshData(fighterId)
        setStats(freshData)
        setIsFromCache(false)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error loading UFC stats'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [fighterId])

  const forceRefresh = useCallback(async () => {
    try {
      setLoading(true)
      const freshData = await ufcService.refreshData(fighterId)
      setStats(freshData)
      setIsFromCache(false)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error refreshing stats'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [fighterId])

  return {
    stats,
    loading,
    error,
    isFromCache,
    forceRefresh
  }
}