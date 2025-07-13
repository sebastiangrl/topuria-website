// src/components/sections/fights/fight-modal.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, MapPin, Target, Clock, Award, User, Ruler, Scale, Flag, Trophy, Zap } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Pelea } from '@/data/fights-data'
import { topuriaData } from '@/data/fights-data'

interface FightModalProps {
  pelea: Pelea
  isOpen: boolean
  onClose: () => void
  isTopuria: boolean
  fighterImage: string
}

export function FightModal({ pelea, isOpen, onClose, isTopuria, fighterImage }: FightModalProps) {
  const currentStats = isTopuria ? pelea.stats : pelea.oponenteStats
  const currentName = isTopuria ? 'Ilia Topuria' : pelea.oponente
  const currentRecord = isTopuria ? topuriaData.record : pelea.oponenteStats.record
  const currentNationality = isTopuria ? topuriaData.nacionalidad : pelea.oponenteStats.nacionalidad
  const currentAge = isTopuria ? topuriaData.edad : pelea.oponenteStats.edad
  const currentHeight = isTopuria ? topuriaData.altura : pelea.oponenteStats.altura
  const currentReach = isTopuria ? topuriaData.alcance : pelea.oponenteStats.alcance
  const currentFaceImage = isTopuria ? '/images/faces/face-ilia-topuria.webp' : `/images/faces/face-${pelea.oponente.toLowerCase().replace(' ', '-')}.webp`

  const precision = currentStats.golpesTotales > 0 ? 
    Math.round((currentStats.golpesConectados / currentStats.golpesTotales) * 100) : 0
  
  const takedownAccuracy = currentStats.intentosTakedown > 0 ? 
    Math.round((currentStats.takedowns / currentStats.intentosTakedown) * 100) : 0

  const getBonoText = (bono?: string) => {
    switch (bono) {
      case 'potn': return 'Performance of the Night'
      case 'fotn': return 'Fight of the Night'
      case 'sub-night': return 'Submission of the Night'
      case 'ko-night': return 'KO of the Night'
      default: return ''
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-topuria-black border-2 border-gray-600 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header con información básica */}
            <div className="bg-white text-topuria-black p-4 relative">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center hover:bg-black/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                {/* Imagen y nombre */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 relative border border-gray-300 overflow-hidden">
                    <Image
                      src={currentFaceImage}
                      alt={currentName}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">
                      {currentName}
                    </h3>
                    <p className="text-sm opacity-70">
                      {pelea.evento}
                    </p>
                  </div>
                </div>

                {/* Información física */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <User className="w-4 h-4 text-topuria-red" />
                    <div>
                      <div className="text-sm font-bold">{currentAge}</div>
                      <div className="text-xs opacity-70">AÑOS</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Ruler className="w-4 h-4 text-topuria-red" />
                    <div>
                      <div className="text-sm font-bold">{currentHeight}</div>
                      <div className="text-xs opacity-70">ALTURA</div>
                    </div>
                  </div>
                </div>

                {/* Récord y alcance */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Trophy className="w-4 h-4 text-topuria-red" />
                    <div>
                      <div className="text-sm font-bold">{currentRecord}</div>
                      <div className="text-xs opacity-70">RÉCORD</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Zap className="w-4 h-4 text-topuria-red" />
                    <div>
                      <div className="text-sm font-bold">{currentReach}</div>
                      <div className="text-xs opacity-70">ALCANCE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bono y nacionalidad en segunda fila */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-topuria-red" />
                  <span className="text-sm font-medium">{currentNationality}</span>
                </div>
                
                {pelea.bono && (
                  <div className="inline-block bg-topuria-gold text-topuria-black px-3 py-1 font-bold uppercase text-xs">
                    <Award className="w-3 h-3 inline mr-1" />
                    {getBonoText(pelea.bono)}
                  </div>
                )}
              </div>
            </div>

            {/* Content compacto */}
            <div className="p-4 space-y-4">
              
              <div className="grid md:grid-cols-2 gap-4">
                
                {/* Imagen y resultado */}
                <div>
                  <motion.div 
                    className="relative h-[250px] w-full"
                    layoutId={`fighter-image-${currentName.replace(' ', '-')}`}
                  >
                    <Image
                      src={fighterImage}
                      alt={currentName}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                  
                  <div className="mt-3 bg-gray-800 p-3 text-center">
                    <div className={cn(
                      'text-xl font-black mb-1',
                      isTopuria && pelea.resultado === 'Victoria' ? 'text-topuria-red' :
                      !isTopuria && pelea.resultado === 'Derrota' ? 'text-topuria-red' :
                      'text-gray-400'
                    )}>
                      {isTopuria ? pelea.resultado : (pelea.resultado === 'Victoria' ? 'Derrota' : 'Victoria')}
                    </div>
                    <div className="text-xs text-gray-400">RESULTADO</div>
                  </div>
                </div>

                {/* Información de la pelea y estadísticas */}
                <div className="space-y-4">
                  
                  {/* Detalles de la pelea */}
                  <div className="bg-gray-800 p-3">
                    <h4 className="text-sm font-bold text-topuria-white mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-topuria-red" />
                      DETALLES DE LA PELEA
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-topuria-red" />
                        <div>
                          <div className="text-xs text-gray-400">FECHA</div>
                          <div className="text-sm text-topuria-white font-bold">
                            {new Date(pelea.fecha).toLocaleDateString('es-ES')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-topuria-red" />
                        <div>
                          <div className="text-xs text-gray-400">UBICACIÓN</div>
                          <div className="text-sm text-topuria-white font-bold">
                            {pelea.ubicacion}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-topuria-red" />
                        <div>
                          <div className="text-xs text-gray-400">TIEMPO</div>
                          <div className="text-sm text-topuria-white font-bold">
                            R{pelea.asalto} {pelea.tiempo}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-topuria-red" />
                        <div>
                          <div className="text-xs text-gray-400">MÉTODO</div>
                          <div className="text-sm text-topuria-white font-bold">
                            {pelea.metodo}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Estadísticas compactas */}
                  <div className="bg-gray-800 p-3">
                    <h4 className="text-sm font-bold text-topuria-white mb-3 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-topuria-red" />
                      ESTADÍSTICAS
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">GOLPES SIGNIFICATIVOS</span>
                        <div className="text-right">
                          <div className="text-sm font-bold text-topuria-white">
                            {currentStats.golpesConectados}/{currentStats.golpesTotales}
                          </div>
                          <div className="text-xs text-topuria-gold">{precision}%</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">TAKEDOWNS</span>
                        <div className="text-right">
                          <div className="text-sm font-bold text-topuria-white">
                            {currentStats.takedowns}/{currentStats.intentosTakedown}
                          </div>
                          <div className="text-xs text-topuria-gold">{takedownAccuracy}%</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">CONTROL EN SUELO</span>
                        <div className="text-right">
                          <div className="text-sm font-bold text-topuria-white">
                            {currentStats.tiempoControl}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumen y detalles compactos (solo para Topuria) */}
              {isTopuria && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-3">
                    <h4 className="text-sm font-bold text-topuria-white mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-topuria-red" />
                      RESUMEN
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {pelea.descripcion}
                    </p>
                  </div>

                  <div className="bg-gray-800 p-3">
                    <h4 className="text-sm font-bold text-topuria-white mb-2 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-topuria-red" />
                      DESTACADOS
                    </h4>
                    <div className="space-y-1">
                      {pelea.detalles.slice(0, 3).map((detalle, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs text-gray-300">
                          <div className="w-1 h-1 bg-topuria-red mt-2 flex-shrink-0" />
                          <span>{detalle}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}