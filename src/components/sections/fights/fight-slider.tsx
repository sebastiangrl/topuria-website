// src/components/sections/fights/fight-slider.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import type { Pelea } from '@/data/fights-data'

interface FightSliderProps {
  peleas: Pelea[]
  peleaSeleccionada: Pelea
  onSelectPelea: (pelea: Pelea) => void
}

export function FightSlider({ peleas, peleaSeleccionada, onSelectPelea }: FightSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerPage >= peleas.length ? 0 : prev + itemsPerPage
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, peleas.length - itemsPerPage) : Math.max(0, prev - itemsPerPage)
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index * itemsPerPage)
  }

  const visiblePeleas = peleas.slice(currentIndex, currentIndex + itemsPerPage)
  const totalSlides = Math.ceil(peleas.length / itemsPerPage)
  const currentSlide = Math.floor(currentIndex / itemsPerPage)

  return (
    <div className="bg-gray-800/50 border border-gray-600 p-2 max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-topuria-white">
          HISTORIAL UFC
        </h3>
        
        {/* Navigation Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={prevSlide}
            className="w-5 h-5 flex items-center justify-center bg-gray-700 hover:bg-topuria-red transition-colors text-white"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          
          <button
            onClick={nextSlide}
            className="w-5 h-5 flex items-center justify-center bg-gray-700 hover:bg-topuria-red transition-colors text-white"
            disabled={currentIndex + itemsPerPage >= peleas.length}
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Fight Cards - Layout horizontal con más espacio */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        {visiblePeleas.map((pelea) => (
          <motion.button
            key={pelea.id}
            onClick={() => onSelectPelea(pelea)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'p-1.5 border transition-all duration-300 relative min-w-0 w-full flex items-center gap-1.5',
              peleaSeleccionada.id === pelea.id
                ? 'bg-topuria-red border-topuria-red text-topuria-white'
                : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-topuria-red hover:text-topuria-white'
            )}
          >
            {/* Opponent Face - A la izquierda y MÁS GRANDE */}
            <div className="flex-shrink-0 w-10 h-10 border border-white bg-gray-900 overflow-hidden relative">
              <Image
                src={`/images/faces/face-${pelea.oponente.toLowerCase().replace(' ', '-')}.webp`}
                alt={`${pelea.oponente} face`}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            
            {/* Información a la derecha */}
            <div className="flex-1 min-w-0 text-left">
              <div className="text-xs font-bold mb-0.5 truncate">
                {pelea.evento.replace('UFC ', '').replace('UFC on ', '')}
              </div>
              <div className="text-xs mb-0.5 truncate">
                vs {pelea.oponente.split(' ').pop()}
              </div>
              <div className="text-xs text-topuria-gold font-bold">
                {pelea.resultado === 'Victoria' ? 'W' : 'L'}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-1.5 h-1.5 transition-colors',
              currentSlide === index 
                ? 'bg-topuria-red' 
                : 'bg-gray-600 hover:bg-gray-400'
            )}
          />
        ))}
      </div>
    </div>
  )
}