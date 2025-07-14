// src/components/sections/fights/fight-slider.tsx
'use client'

import { useState, useEffect } from 'react'
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
  const [isHovered, setIsHovered] = useState(false)
  const itemsPerPage = 3

  // Autoslide effect
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev + itemsPerPage >= peleas.length ? 0 : prev + itemsPerPage
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [peleas.length, itemsPerPage, isHovered])

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
    <div 
      className="bg-gray-800/50 border border-gray-600 p-3 lg:p-2 max-w-md lg:max-w-sm mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-3 lg:mb-2">
        <h3 className="text-sm lg:text-xs font-bold text-topuria-white">
          HISTORIAL UFC
        </h3>
        
        {/* Navigation Controls - Más grandes */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-7 h-7 lg:w-6 lg:h-6 flex items-center justify-center bg-gray-700 hover:bg-topuria-red transition-colors text-white rounded-sm"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 lg:w-3 lg:h-3" />
          </button>
          
          <button
            onClick={nextSlide}
            className="w-7 h-7 lg:w-6 lg:h-6 flex items-center justify-center bg-gray-700 hover:bg-topuria-red transition-colors text-white rounded-sm"
            disabled={currentIndex + itemsPerPage >= peleas.length}
          >
            <ChevronRight className="w-4 h-4 lg:w-3 lg:h-3" />
          </button>
        </div>
      </div>

      {/* Fight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3 lg:mb-2">
        {visiblePeleas.map((pelea) => (
          <motion.button
            key={pelea.id}
            onClick={() => onSelectPelea(pelea)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'p-2 lg:p-1.5 border transition-all duration-300 relative min-w-0 w-full flex items-center gap-2 lg:gap-1.5',
              peleaSeleccionada.id === pelea.id
                ? 'bg-topuria-red border-topuria-red text-topuria-white'
                : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-topuria-red hover:text-topuria-white'
            )}
          >
            {/* Opponent Face */}
            <div className="flex-shrink-0 w-12 h-12 lg:w-10 lg:h-10 border border-white bg-gray-900 overflow-hidden relative">
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
            
            {/* Información */}
            <div className="flex-1 min-w-0 text-left">
              <div className="text-sm lg:text-xs font-bold mb-1 lg:mb-0.5 truncate">
                {pelea.evento.replace('UFC ', '').replace('UFC on ', '')}
              </div>
              <div className="text-sm lg:text-xs mb-1 lg:mb-0.5 truncate">
                vs {pelea.oponente.split(' ').pop()}
              </div>
              <div className="text-sm lg:text-xs text-topuria-gold font-bold">
                {pelea.resultado === 'Victoria' ? 'W' : 'L'}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1.5 lg:gap-1">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-2 h-2 lg:w-1.5 lg:h-1.5 transition-colors rounded-full',
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