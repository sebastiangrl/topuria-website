// src/lib/api/ufc-service.ts

export interface FighterStats {
  id: string
  name: string
  nickname: string
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
    position: number
    weightClass: string
    poundForPound?: number
  }
  physicalStats: {
    height: string
    weight: string
    reach: string
    stance: string
  }
  birthInfo: {
    date: string
    place: string
    age: number
  }
  nationality: string[]
  fightingOutOf: string
  nextFight?: {
    opponent: string
    date: string
    event: string
    location: string
  }
  recentFights: Fight[]
}

export interface Fight {
  id: string
  date: string
  event: string
  opponent: string
  result: 'Win' | 'Loss' | 'Draw' | 'NC'
  method: string
  round: number
  time: string
  weightClass: string
  fightOfNight?: boolean
  performanceBonus?: boolean
}

export interface UFCEvent {
  id: string
  name: string
  date: string
  location: string
  mainCard: Fight[]
  prelimCard: Fight[]
}

class UFCService {
  private baseURL = 'https://api.ufc.com/api/v3'
  private fallbackData: FighterStats = {
    id: 'ilia-topuria',
    name: 'Ilia Topuria',
    nickname: 'El Matador',
    record: {
      wins: 16,
      losses: 0,
      draws: 0
    },
    finishes: {
      koTko: 7,
      submissions: 8,
      decisions: 1
    },
    titles: [
      'UFC Lightweight Champion',
      'Former UFC Featherweight Champion'
    ],
    ranking: {
      position: 1,
      weightClass: 'Lightweight',
      poundForPound: 1
    },
    physicalStats: {
      height: "5'7\"",
      weight: '155 lbs',
      reach: "69\"",
      stance: 'Orthodox'
    },
    birthInfo: {
      date: '1997-01-21',
      place: 'Halle, Germany',
      age: 28
    },
    nationality: ['Georgian', 'Spanish'],
    fightingOutOf: 'Madrid, Spain',
    nextFight: {
      opponent: 'TBD',
      date: '2025',
      event: 'UFC TBD',
      location: 'TBD'
    },
    recentFights: [
      {
        id: 'ufc-317',
        date: '2025-06-28',
        event: 'UFC 317',
        opponent: 'Charles Oliveira',
        result: 'Win',
        method: 'KO (Punch)',
        round: 1,
        time: '2:27',
        weightClass: 'Lightweight',
        performanceBonus: true
      },
      {
        id: 'ufc-308',
        date: '2024-10-26',
        event: 'UFC 308',
        opponent: 'Max Holloway',
        result: 'Win',
        method: 'KO (Punch)',
        round: 3,
        time: '1:34',
        weightClass: 'Featherweight',
        performanceBonus: true
      },
      {
        id: 'ufc-298',
        date: '2024-02-17',
        event: 'UFC 298',
        opponent: 'Alexander Volkanovski',
        result: 'Win',
        method: 'KO (Punch)',
        round: 2,
        time: '3:32',
        weightClass: 'Featherweight',
        performanceBonus: true
      }
    ]
  }

  /**
   * Obtiene las estadísticas actuales de Ilia Topuria
   */
  async getFighterStats(fighterId: string = 'ilia-topuria'): Promise<FighterStats> {
    try {
      // Intentar múltiples fuentes de datos
      const stats = await this.fetchFromMultipleSources(fighterId)
      return stats || this.fallbackData
    } catch (error) {
      console.warn('Error fetching fighter stats, using fallback data:', error)
      return this.fallbackData
    }
  }

  /**
   * Busca datos de múltiples fuentes
   */
  private async fetchFromMultipleSources(fighterId: string): Promise<FighterStats | null> {
    const sources = [
      () => this.fetchFromESPN(fighterId),
      () => this.fetchFromUFCStats(fighterId),
      () => this.fetchFromSherdog(fighterId)
    ]

    for (const source of sources) {
      try {
        const data = await source()
        if (data) {
          return data
        }
      } catch (error) {
        console.warn('Source failed:', error)
        continue
      }
    }

    return null
  }

  /**
   * Fetch desde ESPN API
   */
  private async fetchFromESPN(fighterId: string): Promise<FighterStats | null> {
    try {
      const response = await fetch(
        `https://site.api.espn.com/apis/site/v2/sports/mma/ufc/athletes/${fighterId}`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; TopuriaWebsite/1.0)'
          }
        }
      )

      if (!response.ok) {
        throw new Error(`ESPN API error: ${response.status}`)
      }

      const data = await response.json()
      return this.parseESPNData(data)
    } catch (error) {
      console.warn('ESPN API failed:', error)
      return null
    }
  }

  /**
   * Fetch desde UFC Stats
   */
  private async fetchFromUFCStats(fighterId: string): Promise<FighterStats | null> {
    try {
      // UFC Stats no tiene API pública, usaríamos web scraping
      // Por ahora, usamos datos estáticos actualizados
      return this.fallbackData
    } catch (error) {
      console.warn('UFC Stats failed:', error)
      return null
    }
  }

  /**
   * Fetch desde Sherdog
   */
  private async fetchFromSherdog(fighterId: string): Promise<FighterStats | null> {
    try {
      // Sherdog tampoco tiene API pública
      // Usaríamos web scraping o datos estáticos
      return this.fallbackData
    } catch (error) {
      console.warn('Sherdog failed:', error)
      return null
    }
  }

  /**
   * Parse data from ESPN
   */
  private parseESPNData(data: any): FighterStats {
    try {
      const athlete = data.athlete || data
      
      return {
        id: athlete.id?.toString() || 'ilia-topuria',
        name: athlete.displayName || 'Ilia Topuria',
        nickname: athlete.nickname || 'El Matador',
        record: {
          wins: parseInt(athlete.record?.wins) || 16,
          losses: parseInt(athlete.record?.losses) || 0,
          draws: parseInt(athlete.record?.draws) || 0
        },
        finishes: {
          koTko: parseInt(athlete.statistics?.knockouts) || 7,
          submissions: parseInt(athlete.statistics?.submissions) || 8,
          decisions: parseInt(athlete.statistics?.decisions) || 1
        },
        titles: athlete.titles || ['UFC Lightweight Champion'],
        ranking: {
          position: parseInt(athlete.ranking?.position) || 1,
          weightClass: athlete.weightClass || 'Lightweight',
          poundForPound: parseInt(athlete.p4pRanking) || 1
        },
        physicalStats: {
          height: athlete.height || "5'7\"",
          weight: athlete.weight || '155 lbs',
          reach: athlete.reach || "69\"",
          stance: athlete.stance || 'Orthodox'
        },
        birthInfo: {
          date: athlete.birthDate || '1997-01-21',
          place: athlete.birthPlace || 'Halle, Germany',
          age: this.calculateAge(athlete.birthDate || '1997-01-21')
        },
        nationality: athlete.nationality || ['Georgian', 'Spanish'],
        fightingOutOf: athlete.fightingOutOf || 'Madrid, Spain',
        recentFights: this.fallbackData.recentFights
      }
    } catch (error) {
      console.warn('Error parsing ESPN data:', error)
      return this.fallbackData
    }
  }

  /**
   * Calcula la edad desde fecha de nacimiento
   */
  private calculateAge(birthDate: string): number {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }

  /**
   * Obtiene próximos eventos de UFC
   */
  async getUpcomingEvents(): Promise<UFCEvent[]> {
    try {
      // Simulación de datos de próximos eventos
      return [
        {
          id: 'ufc-318',
          name: 'UFC 318',
          date: '2025-08-15',
          location: 'Las Vegas, Nevada',
          mainCard: [],
          prelimCard: []
        }
      ]
    } catch (error) {
      console.warn('Error fetching upcoming events:', error)
      return []
    }
  }

  /**
   * Busca próxima pelea de un luchador
   */
  async getNextFight(fighterId: string): Promise<Fight | null> {
    try {
      const events = await this.getUpcomingEvents()
      
      for (const event of events) {
        const allFights = [...event.mainCard, ...event.prelimCard]
        const fight = allFights.find(fight => 
          fight.opponent.toLowerCase().includes('topuria') ||
          fight.id.includes(fighterId)
        )
        
        if (fight) {
          return fight
        }
      }
      
      return null
    } catch (error) {
      console.warn('Error fetching next fight:', error)
      return null
    }
  }

  /**
   * Actualiza datos en tiempo real
   */
  async refreshData(fighterId: string): Promise<FighterStats> {
    try {
      const freshData = await this.getFighterStats(fighterId)
      
      // Aquí podrías agregar lógica para cachear los datos
      localStorage.setItem(`fighter_${fighterId}`, JSON.stringify({
        data: freshData,
        timestamp: Date.now()
      }))
      
      return freshData
    } catch (error) {
      console.warn('Error refreshing data:', error)
      return this.fallbackData
    }
  }

  /**
   * Verifica si los datos están actualizados
   */
  isDataFresh(timestamp: number, maxAge: number = 3600000): boolean {
    // Por defecto, datos son frescos por 1 hora
    return Date.now() - timestamp < maxAge
  }
}

export const ufcService = new UFCService()
export default ufcService