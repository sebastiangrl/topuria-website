// src/data/fights-data.ts

export interface FighterStats {
  golpesConectados: number
  golpesTotales: number
  takedowns: number
  intentosTakedown: number
  tiempoControl: string
}

export interface OpponentStats extends FighterStats {
  nombre: string
  record: string
  altura: string
  alcance: string
  edad: number
  nacionalidad: string
}

export interface Pelea {
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
  stats: FighterStats
  oponenteStats: OpponentStats
}

export const peleasProfesionales: Pelea[] = [
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

// Datos adicionales de Ilia Topuria
export const topuriaData = {
  record: '17-0-0',
  altura: '1.70m',
  alcance: '68"',
  edad: 27,
  nacionalidad: 'España/Georgia',
  peso: '66 kg',
  division: 'Peso Pluma',
  titulos: [
    'Campeón Peso Pluma UFC',
    'Ex-Campeón Peso Ligero Cage Warriors'
  ],
  logros: [
    'Primer campeón español de UFC',
    'Invicto en su carrera profesional',
    '5 bonos de actuación en UFC',
    'Primer español en noquear a Volkanovski'
  ]
}

// Función helper para obtener estadísticas totales
export function getCareerStats() {
  const totalVictorias = peleasProfesionales.filter(p => p.resultado === 'Victoria').length
  const totalFinalizaciones = peleasProfesionales.filter(p => 
    p.metodo.includes('KO') || p.metodo.includes('Sumisión')
  ).length
  const totalBonos = peleasProfesionales.filter(p => p.bono).length
  
  return {
    victorias: totalVictorias,
    derrotas: peleasProfesionales.filter(p => p.resultado === 'Derrota').length,
    empates: peleasProfesionales.filter(p => p.resultado === 'Empate').length,
    finalizaciones: totalFinalizaciones,
    porcentajeFinalizacion: Math.round((totalFinalizaciones / totalVictorias) * 100),
    bonos: totalBonos
  }
}

// Función para obtener peleas por significado
export function getPeleasBySignificado(significado: string) {
  return peleasProfesionales.filter(p => p.significado === significado)
}

// Función para obtener la última pelea
export function getUltimaPelea() {
  return peleasProfesionales[0] // Asumiendo que están ordenadas por fecha descendente
}