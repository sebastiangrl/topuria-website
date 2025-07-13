// src/components/sections/fights/fighter-card.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { FighterStats } from '@/data/fights-data'

interface FighterData {
  record: string
  altura: string
  alcance: string
  edad: number
  nacionalidad: string
}

interface FighterCardProps {
  nombre: string
  imagen: string
  resultado: 'GANADOR' | 'PERDEDOR'
  isWinner: boolean
  onClick: () => void
  stats: FighterStats
  fighterData: FighterData
}

export function FighterCard({
  nombre,
  imagen,
  resultado,
  isWinner,
  onClick,
  stats,
  fighterData
}: FighterCardProps) {
  const precision = stats.golpesTotales > 0 ? Math.round((stats.golpesConectados / stats.golpesTotales) * 100) : 0

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="cursor-pointer group space-y-4"
      layoutId={`fighter-${nombre.replace(' ', '-')}`}
    >
      {/* Fighter Image */}
      <motion.div 
        className="relative h-[400px] lg:h-[500px]"
        layoutId={`fighter-image-${nombre.replace(' ', '-')}`}
      >
        <Image
          src={imagen}
          alt={`${nombre} en combate`}
          fill
          className="object-contain object-center transition-all duration-500 group-hover:drop-shadow-2xl"
          priority
        />
        
        {/* Hover overlay sin blur */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-topuria-black/40 flex items-center justify-center"
        >
          <div className="bg-topuria-red border-2 border-topuria-white px-6 py-3 text-topuria-white font-bold uppercase tracking-wide">
            Ver Stats
          </div>
        </motion.div>
      </motion.div>

      {/* Result Label */}
      <div className="text-center">
        <div className={cn(
          'inline-block px-6 py-3 font-black text-lg uppercase tracking-wider border-2',
          isWinner
            ? 'bg-topuria-red text-topuria-white border-topuria-red'
            : 'bg-gray-800 text-gray-300 border-gray-600'
        )}>
          {resultado}
        </div>
      </div>

      {/* Fighter Info - Compacta en una línea */}
      <div className="bg-gray-800 border border-gray-600 p-3">
        <h3 className="text-lg font-bold text-topuria-white text-center mb-2">
          {nombre}
        </h3>
        
        {/* Todo en una línea */}
        <div className="flex items-center justify-between text-xs text-gray-300">
          <div className="flex flex-col items-center">
            <span className="text-topuria-gold font-bold">{fighterData.record}</span>
            <span className="text-gray-500">RÉCORD</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-bold">{fighterData.altura}</span>
            <span className="text-gray-500">ALTURA</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-bold">{precision}%</span>
            <span className="text-gray-500">PRECISIÓN</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-bold">{stats.takedowns}</span>
            <span className="text-gray-500">TD</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}