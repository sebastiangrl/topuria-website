// src/components/sections/fights-section.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import type { Variants } from 'framer-motion'
import { FightModal } from './fights/fight-modal'
import { FighterCard } from './fights/fighter-card'
import { FightSlider } from './fights/fight-slider'
import { peleasProfesionales, topuriaData } from '@/data/fights-data'
import type { Pelea } from '@/data/fights-data'

export default function FightsSection() {
  const [peleaSeleccionada, setPeleaSeleccionada] = useState<Pelea>(peleasProfesionales[0])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [modalOponente, setModalOponente] = useState(false)
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

  const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString)
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section
      ref={sectionRef}
      id="career"
      className="py-20 bg-topuria-black relative overflow-hidden"
    >
      {/* Background Title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[20vw] md:text-[15vw] lg:text-[12vw] font-black text-gray-700/30 select-none">
          COMBATES
        </h1>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 lg:px-8 relative z-10"
      >
        {/* Header - Solo línea roja */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="w-24 h-1 bg-topuria-red mx-auto"></div>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-16">
          
          {/* Título Llamativo - Una sola línea */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-topuria-red">
              HISTORIAL DE COMBATES
            </h2>
            <div className="w-32 h-1 bg-topuria-red mx-auto mt-6"></div>
          </motion.div>

          {/* VS Layout */}
          <motion.div variants={itemVariants} className="relative">
            
            {/* Fight Selection Slider - JUSTO encima del VS */}
            <div className="mb-4">
              <FightSlider 
                peleas={peleasProfesionales}
                peleaSeleccionada={peleaSeleccionada}
                onSelectPelea={setPeleaSeleccionada}
              />
            </div>

            <motion.div
              key={peleaSeleccionada.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-3 gap-8 items-center min-h-[600px]"
            >
              
              {/* Topuria - Ganador/Perdedor */}
              <FighterCard
                nombre="Ilia Topuria"
                imagen="/images/combates/topuria-fight.png"
                resultado={peleaSeleccionada.resultado === 'Victoria' ? 'GANADOR' : 'PERDEDOR'}
                isWinner={peleaSeleccionada.resultado === 'Victoria'}
                onClick={() => setModalAbierto(true)}
                stats={peleaSeleccionada.stats}
                fighterData={{
                  record: topuriaData.record,
                  altura: topuriaData.altura,
                  alcance: topuriaData.alcance,
                  edad: topuriaData.edad,
                  nacionalidad: topuriaData.nacionalidad
                }}
              />

              {/* VS Center */}
              <div className="text-center space-y-6">
                <div className="text-8xl font-black text-topuria-red">
                  VS
                </div>
                
                <div className="space-y-4">
                  <div className="bg-topuria-red text-topuria-white px-6 py-3 font-bold text-lg uppercase tracking-wide">
                    {peleaSeleccionada.evento}
                  </div>
                  
                  <div className="space-y-2 text-topuria-white">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatearFecha(peleaSeleccionada.fecha)}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{peleaSeleccionada.ubicacion}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="bg-gray-800 p-3 text-topuria-white">
                      <div className="font-bold">{peleaSeleccionada.metodo}</div>
                      <div className="text-xs text-gray-400">MÉTODO</div>
                    </div>
                    <div className="bg-gray-800 p-3 text-topuria-white">
                      <div className="font-bold">R{peleaSeleccionada.asalto}</div>
                      <div className="text-xs text-gray-400">ASALTO</div>
                    </div>
                    <div className="bg-gray-800 p-3 text-topuria-white">
                      <div className="font-bold">{peleaSeleccionada.tiempo}</div>
                      <div className="text-xs text-gray-400">TIEMPO</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Oponente - Ganador/Perdedor */}
              <FighterCard
                nombre={peleaSeleccionada.oponente}
                imagen={peleaSeleccionada.imagenOponente}
                resultado={peleaSeleccionada.resultado === 'Victoria' ? 'PERDEDOR' : 'GANADOR'}
                isWinner={peleaSeleccionada.resultado !== 'Victoria'}
                onClick={() => setModalOponente(true)}
                stats={peleaSeleccionada.oponenteStats}
                fighterData={{
                  record: peleaSeleccionada.oponenteStats.record,
                  altura: peleaSeleccionada.oponenteStats.altura,
                  alcance: peleaSeleccionada.oponenteStats.alcance,
                  edad: peleaSeleccionada.oponenteStats.edad,
                  nacionalidad: peleaSeleccionada.oponenteStats.nacionalidad
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modals con transición de imagen */}
      <FightModal 
        pelea={peleaSeleccionada} 
        isOpen={modalAbierto} 
        onClose={() => setModalAbierto(false)} 
        isTopuria={true}
        fighterImage="/images/combates/topuria-fight.png"
      />
      
      <FightModal 
        pelea={peleaSeleccionada} 
        isOpen={modalOponente} 
        onClose={() => setModalOponente(false)} 
        isTopuria={false}
        fighterImage={peleaSeleccionada.imagenOponente}
      />
      
      {/* Estilos para el scrollbar */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}