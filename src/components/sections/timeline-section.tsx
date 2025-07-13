// src/components/sections/timeline-section.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin, Trophy } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Variants } from 'framer-motion'
import { FightModal } from './fight-modal'
import { FighterCard } from './fighter-card'
import { FightSlider } from './fight-slider'

interface Pelea {
  id: string
  fecha: string
  evento: string
  oponente: string
  resultado: 'Victoria' | 'Derrota' | 'Empate'
  metodo: string
  asalto: number
  tiempo: string
  ubicacion: string
  significado: 'debut' | 'titulo' | 'defensa' | 'eliminatoria' | 'regular'
  bono?: 'potn' | 'fotn' | 'sub-night' | 'ko-night'
  descripcion: string
  detalles: string[]
  imagenOponente: string
  videoUrl?: string
  stats: {
    golpesConectados: number
    golpesTotales: number
    takedowns: number
    intentosTakedown: number
    tiempoControl: string
  }
  oponenteStats: {
    nombre: string
    record: string
    altura: string
    alcance: string
    edad: number
    nacionalidad: string
    golpesConectados: number
    golpesTotales: number
    takedowns: number
    intentosTakedown: number
    tiempoControl: string
  }
}

const peleasProfesionales: Pelea[] = [
  {
    id: 'ufc-317-2025',
    fecha: '2025-06-28',
    evento: 'UFC 317',
    oponente: 'Charles Oliveira',
    resultado: 'Victoria',
    metodo: 'KO (Puñetazo)',
    asalto: 1,
    tiempo: '2:27',
    ubicacion: 'Las Vegas, Nevada',
    significado: 'titulo',
    bono: 'potn',
    descripcion: 'Conquistó el Campeonato de Peso Ligero UFC con un devastador nocaut en el primer asalto',
    detalles: [
      'Primer español en ganar dos cinturones UFC',
      'Nocaut más rápido contra Charles Oliveira',
      'Actuación dominante desde el primer intercambio',
      'Se convirtió en campeón de dos divisiones'
    ],
    imagenOponente: '/images/combates/charles-oliveira.png',
    stats: {
      golpesConectados: 15,
      golpesTotales: 18,
      takedowns: 0,
      intentosTakedown: 0,
      tiempoControl: '0:00'
    },
    oponenteStats: {
      nombre: 'Charles Oliveira',
      record: '34-11-0',
      altura: '1.78m',
      alcance: '74"',
      edad: 35,
      nacionalidad: 'Brasil',
      golpesConectados: 8,
      golpesTotales: 22,
      takedowns: 0,
      intentosTakedown: 3,
      tiempoControl: '0:00'
    }
  },
  {
    id: 'ufc-308-2024',
    fecha: '2024-10-26',
    evento: 'UFC 308',
    oponente: 'Max Holloway',
    resultado: 'Victoria',
    metodo: 'KO (Puñetazo)',
    asalto: 3,
    tiempo: '1:34',
    ubicacion: 'Abu Dhabi, UAE',
    significado: 'defensa',
    bono: 'potn',
    descripcion: 'Primera defensa del título peso pluma, noqueó al legendario Max Holloway',
    detalles: [
      'Primer nocaut en la carrera de Holloway',
      'Defensa exitosa del cinturón peso pluma',
      'Actuación dominante por tres asaltos',
      'Silencia a todos los críticos'
    ],
    imagenOponente: '/images/combates/max-holloway.png',
    stats: {
      golpesConectados: 67,
      golpesTotales: 89,
      takedowns: 1,
      intentosTakedown: 2,
      tiempoControl: '1:45'
    },
    oponenteStats: {
      nombre: 'Max Holloway',
      record: '26-8-0',
      altura: '1.80m',
      alcance: '69"',
      edad: 32,
      nacionalidad: 'Estados Unidos',
      golpesConectados: 45,
      golpesTotales: 78,
      takedowns: 0,
      intentosTakedown: 1,
      tiempoControl: '0:32'
    }
  },
  {
    id: 'ufc-298-2024',
    fecha: '2024-02-17',
    evento: 'UFC 298',
    oponente: 'Alexander Volkanovski',
    resultado: 'Victoria',
    metodo: 'KO (Puñetazo)',
    asalto: 2,
    tiempo: '3:32',
    ubicacion: 'Anaheim, California',
    significado: 'titulo',
    bono: 'potn',
    descripcion: 'Ganó el Campeonato Peso Pluma UFC, terminando el histórico reinado de Volkanovski',
    detalles: [
      'Primer campeón español de UFC',
      'Terminó reinado de 4 años de Volkanovski',
      'Cumplió promesa de noquear al australiano',
      'Momento histórico para España'
    ],
    imagenOponente: '/images/combates/alexander-volkanovski.png',
    stats: {
      golpesConectados: 42,
      golpesTotales: 58,
      takedowns: 0,
      intentosTakedown: 1,
      tiempoControl: '0:15'
    },
    oponenteStats: {
      nombre: 'Alexander Volkanovski',
      record: '26-4-0',
      altura: '1.68m',
      alcance: '71"',
      edad: 35,
      nacionalidad: 'Australia',
      golpesConectados: 28,
      golpesTotales: 47,
      takedowns: 0,
      intentosTakedown: 2,
      tiempoControl: '0:00'
    }
  },
  {
    id: 'ufc-abc-2023',
    fecha: '2023-06-24',
    evento: 'UFC on ABC 5',
    oponente: 'Josh Emmett',
    resultado: 'Victoria',
    metodo: 'Decisión (Unánime)',
    asalto: 5,
    tiempo: '5:00',
    ubicacion: 'Jacksonville, Florida',
    significado: 'eliminatoria',
    bono: 'fotn',
    descripcion: 'Se ganó oportunidad al título con actuación dominante contra contendiente top',
    detalles: [
      'Cinco asaltos de dominación',
      'Se ganó oportunidad al título',
      'Actuación técnica impecable',
      'Primer main event en ABC'
    ],
    imagenOponente: '/images/combates/josh-emmett.png',
    stats: {
      golpesConectados: 156,
      golpesTotales: 203,
      takedowns: 3,
      intentosTakedown: 5,
      tiempoControl: '4:32'
    },
    oponenteStats: {
      nombre: 'Josh Emmett',
      record: '18-4-0',
      altura: '1.65m',
      alcance: '66"',
      edad: 39,
      nacionalidad: 'Estados Unidos',
      golpesConectados: 98,
      golpesTotales: 145,
      takedowns: 0,
      intentosTakedown: 2,
      tiempoControl: '1:15'
    }
  },
  {
    id: 'ufc-282-2022',
    fecha: '2022-12-10',
    evento: 'UFC 282',
    oponente: 'Bryce Mitchell',
    resultado: 'Victoria',
    metodo: 'Sumisión (Triángulo de Brazo)',
    asalto: 2,
    tiempo: '3:10',
    ubicacion: 'Las Vegas, Nevada',
    significado: 'regular',
    bono: 'potn',
    descripcion: 'Dominó al invicto prospecto con grappling superior',
    detalles: [
      'Primera derrota de Mitchell',
      'Dominación en el suelo',
      'Sumisión técnica perfecta',
      'Mostró habilidades completas'
    ],
    imagenOponente: '/images/combates/bryce-mitchell.png',
    stats: {
      golpesConectados: 34,
      golpesTotales: 45,
      takedowns: 2,
      intentosTakedown: 3,
      tiempoControl: '5:22'
    },
    oponenteStats: {
      nombre: 'Bryce Mitchell',
      record: '15-2-0',
      altura: '1.75m',
      alcance: '71"',
      edad: 29,
      nacionalidad: 'Estados Unidos',
      golpesConectados: 18,
      golpesTotales: 32,
      takedowns: 1,
      intentosTakedown: 4,
      tiempoControl: '2:08'
    }
  },
  {
    id: 'ufc-280-2022',
    fecha: '2022-10-22',
    evento: 'UFC 280',
    oponente: 'Damon Jackson',
    resultado: 'Victoria',
    metodo: 'Sumisión (Mata Leão)',
    asalto: 2,
    tiempo: '2:52',
    ubicacion: 'Abu Dhabi, UAE',
    significado: 'regular',
    descripcion: 'Dominó con su grappling superior en Abu Dhabi',
    detalles: [
      'Sumisión limpia en el segundo asalto',
      'Control total en el suelo',
      'Actuación técnica sólida',
      'Continúa racha invicta'
    ],
    imagenOponente: '/images/combates/damon-jackson.png',
    stats: {
      golpesConectados: 28,
      golpesTotales: 35,
      takedowns: 3,
      intentosTakedown: 4,
      tiempoControl: '4:15'
    },
    oponenteStats: {
      nombre: 'Damon Jackson',
      record: '21-5-1',
      altura: '1.78m',
      alcance: '73"',
      edad: 34,
      nacionalidad: 'Estados Unidos',
      golpesConectados: 15,
      golpesTotales: 28,
      takedowns: 0,
      intentosTakedown: 2,
      tiempoControl: '0:45'
    }
  },
  {
    id: 'ufc-on-espn-2022',
    fecha: '2022-06-25',
    evento: 'UFC on ESPN 38',
    oponente: 'Josh Culibao',
    resultado: 'Victoria',
    metodo: 'Decisión (Unánime)',
    asalto: 3,
    tiempo: '5:00',
    ubicacion: 'Londres, Inglaterra',
    significado: 'regular',
    descripcion: 'Victoria por decisión unánime en Londres',
    detalles: [
      'Tres asaltos sólidos',
      'Demostró versatilidad técnica',
      'Victoria en territorio europeo',
      'Preparación para peleas más grandes'
    ],
    imagenOponente: '/images/combates/josh-culibao.png',
    stats: {
      golpesConectados: 89,
      golpesTotales: 124,
      takedowns: 2,
      intentosTakedown: 4,
      tiempoControl: '2:30'
    },
    oponenteStats: {
      nombre: 'Josh Culibao',
      record: '11-3-1',
      altura: '1.78m',
      alcance: '72"',
      edad: 29,
      nacionalidad: 'Australia',
      golpesConectados: 67,
      golpesTotales: 98,
      takedowns: 1,
      intentosTakedown: 3,
      tiempoControl: '1:20'
    }
  },
  {
    id: 'ufc-267-2021',
    fecha: '2021-10-30',
    evento: 'UFC 267',
    oponente: 'Jai Herbert',
    resultado: 'Victoria',
    metodo: 'KO (Puñetazo)',
    asalto: 2,
    tiempo: '1:07',
    ubicacion: 'Abu Dhabi, UAE',
    significado: 'regular',
    bono: 'potn',
    descripcion: 'Nocaut devastador en el segundo asalto',
    detalles: [
      'KO brutal en Abu Dhabi',
      'Demostró poder de nocaut',
      'Actuación impresionante',
      'Anunció su llegada al top'
    ],
    imagenOponente: '/images/combates/jai-herbert.png',
    stats: {
      golpesConectados: 23,
      golpesTotales: 31,
      takedowns: 0,
      intentosTakedown: 0,
      tiempoControl: '0:00'
    },
    oponenteStats: {
      nombre: 'Jai Herbert',
      record: '11-3-0',
      altura: '1.75m',
      alcance: '70"',
      edad: 29,
      nacionalidad: 'Inglaterra',
      golpesConectados: 12,
      golpesTotales: 26,
      takedowns: 0,
      intentosTakedown: 1,
      tiempoControl: '0:00'
    }
  },
  {
    id: 'ufc-264-2021',
    fecha: '2021-07-10',
    evento: 'UFC 264',
    oponente: 'Ryan Hall',
    resultado: 'Victoria',
    metodo: 'Decisión (Unánime)',
    asalto: 3,
    tiempo: '5:00',
    ubicacion: 'Las Vegas, Nevada',
    significado: 'regular',
    descripcion: 'Victoria técnica contra especialista en jiu-jitsu',
    detalles: [
      'Neutralizó peligroso jiu-jitsu',
      'Tres asaltos dominantes',
      'Mostró mejora defensiva',
      'Victoria inteligente'
    ],
    imagenOponente: '/images/combates/ryan-hall.png',
    stats: {
      golpesConectados: 72,
      golpesTotales: 95,
      takedowns: 1,
      intentosTakedown: 2,
      tiempoControl: '3:45'
    },
    oponenteStats: {
      nombre: 'Ryan Hall',
      record: '8-3-0',
      altura: '1.80m',
      alcance: '72"',
      edad: 37,
      nacionalidad: 'Estados Unidos',
      golpesConectados: 34,
      golpesTotales: 58,
      takedowns: 2,
      intentosTakedown: 8,
      tiempoControl: '1:15'
    }
  },
  {
    id: 'ufc-on-abc-2021',
    fecha: '2021-04-10',
    evento: 'UFC on ABC 2',
    oponente: 'Damon Jackson',
    resultado: 'Victoria',
    metodo: 'Sumisión (Triángulo)',
    asalto: 1,
    tiempo: '4:05',
    ubicacion: 'Las Vegas, Nevada',
    significado: 'debut',
    bono: 'sub-night',
    descripcion: 'Debut espectacular en UFC con sumisión en el primer asalto',
    detalles: [
      'Debut soñado en UFC',
      'Sumisión en primer asalto',
      'Anunció su llegada en grande',
      'Primer español en someter en debut'
    ],
    imagenOponente: '/images/combates/damon-jackson.png',
    stats: {
      golpesConectados: 12,
      golpesTotales: 18,
      takedowns: 1,
      intentosTakedown: 1,
      tiempoControl: '3:20'
    },
    oponenteStats: {
      nombre: 'Damon Jackson',
      record: '20-4-1',
      altura: '1.78m',
      alcance: '73"',
      edad: 32,
      nacionalidad: 'Estados Unidos',
      golpesConectados: 8,
      golpesTotales: 15,
      takedowns: 0,
      intentosTakedown: 2,
      tiempoControl: '0:45'
    }
  }
]

export default function TimelineSection() {
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
                imagen="/images/topuria-fight.png"
                resultado={peleaSeleccionada.resultado === 'Victoria' ? 'GANADOR' : 'PERDEDOR'}
                isWinner={peleaSeleccionada.resultado === 'Victoria'}
                onClick={() => setModalAbierto(true)}
                stats={peleaSeleccionada.stats}
                fighterData={{
                  record: '17-0-0',
                  altura: '1.70m',
                  alcance: '68"',
                  edad: 27,
                  nacionalidad: 'España/Georgia'
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
        fighterImage="/images/topuria-fight.png"
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