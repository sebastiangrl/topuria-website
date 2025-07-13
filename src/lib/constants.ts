// src/lib/constants.ts
// Site configuration
export const SITE_CONFIG = {
  name: 'Ilia Topuria',
  description: 'Official website of Ilia Topuria, UFC Featherweight Champion',
  url: 'https://iliatopuria.com',
  ogImage: 'https://iliatopuria.com/images/og-image.jpg',
  author: 'Ilia Topuria',
  keywords: [
    'Ilia Topuria',
    'UFC',
    'Featherweight Champion',
    'MMA',
    'Mixed Martial Arts',
    'Georgian Fighter',
    'Spanish Fighter',
    'El Matador'
  ],
} as const

// Fighter information
export const FIGHTER_INFO = {
  name: 'Ilia Topuria',
  nickname: 'El Matador',
  birthDate: '1997-01-21',
  birthPlace: 'Halle, Germany',
  nationality: ['Georgian', 'Spanish'],
  fightingOutOf: 'Madrid, Spain',
  height: "5'7\"",
  weight: '155 lbs', // Actualizado para peso ligero
  reach: "69\"",
  stance: 'Orthodox',
  division: 'Lightweight', // Actualizado
  rank: '#1 UFC Lightweight Champion', // Actualizado
  p4pRanking: '#1 P4P', // Actualizado
} as const

// Social media links
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/topuriailia/',
  twitter: 'https://twitter.com/Topuriailia',
  youtube: 'https://www.youtube.com/@IliaTopuria',
  tiktok: 'https://www.tiktok.com/@ilia_topuria',
  ufc: 'https://www.ufc.com/athlete/ilia-topuria',
} as const

// Navigation menu items
export const NAV_ITEMS = [
  {
    label: 'Home',
    href: '#home',
    id: 'home'
  },
  {
    label: 'Stats',
    href: '#stats',
    id: 'stats'
  },
  {
    label: 'Career',
    href: '#career',
    id: 'career'
  },
  {
    label: 'Gallery',
    href: '#gallery',
    id: 'gallery'
  }
] as const

// UFC Career highlights
export const CAREER_HIGHLIGHTS = [
  {
    title: 'UFC Lightweight Champion',
    date: '2025-06-28',
    description: 'Defeated Charles Oliveira at UFC 317',
    location: 'Las Vegas, Nevada',
    result: 'KO (Punches)',
    round: 1,
    time: '2:27'
  },
  {
    title: 'UFC Featherweight Champion Defense',
    date: '2024-10-26',
    description: 'Knocked out Max Holloway at UFC 308',
    location: 'Abu Dhabi, UAE',
    result: 'KO (Punch)',
    round: 3,
    time: '1:34'
  },
  {
    title: 'UFC Featherweight Champion',
    date: '2024-02-17',
    description: 'Defeated Alexander Volkanovski at UFC 298',
    location: 'Anaheim, California',
    result: 'KO (Punches)',
    round: 2,
    time: '3:32'
  },
  {
    title: 'Performance of the Night',
    date: '2023-10-21',
    description: 'Knocked out Josh Emmett at UFC on ESPN 50',
    location: 'Jacksonville, Florida',
    result: 'KO (Punch)',
    round: 1,
    time: '3:05'
  },
  {
    title: 'UFC Debut Victory',
    date: '2020-10-24',
    description: 'Submitted Damon Jackson at UFC on ESPN 17',
    location: 'Abu Dhabi, UAE',
    result: 'Submission (Rear Naked Choke)',
    round: 1,
    time: '2:47'
  },
] as const

// Fighting statistics
export const FIGHT_STATS = {
  record: {
    wins: 16, // Actualizado
    losses: 0,
    draws: 0,
    nc: 0
  },
  finishRate: {
    ko: 7,
    submissions: 8, // Actualizado
    decisions: 1 // Actualizado
  },
  ufcStats: {
    fights: 8, // Actualizado
    wins: 8, // Actualizado
    losses: 0,
    finishes: 7, // Actualizado
    bonuses: 5 // Actualizado
  },
  titles: [
    'UFC Lightweight Champion (Current)',
    'Former UFC Featherweight Champion'
  ]
} as const

// Colors theme
export const THEME_COLORS = {
  spanish: {
    red: '#C60B1E',
    gold: '#FFC400',
  },
  neutral: {
    black: '#000000',
    white: '#FFFFFF',
    darkGray: '#333333',
    lightGray: '#E5E5E5',
  },
  accent: {
    darkRed: '#8B0000',
    lightGold: '#FFD700',
    softWhite: '#F8F9FA',
    softBlack: '#1A1A1A',
  }
} as const

// Animation durations
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const

// Breakpoints for responsive design
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// API endpoints
export const API_ENDPOINTS = {
  ufc: 'https://api.ufc.com/api/v3',
  espn: 'https://site.api.espn.com/apis/site/v2/sports/mma/ufc',
  sherdog: 'https://www.sherdog.com/fighter',
} as const

// Image dimensions for optimization
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  card: { width: 300, height: 200 },
  hero: { width: 1200, height: 800 },
  gallery: { width: 800, height: 600 },
  og: { width: 1200, height: 630 },
} as const

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  cls: 0.1,
  fid: 100,
  lcp: 2500,
  fcp: 1800,
  ttfb: 600,
} as const

// Error messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  notFound: 'The requested resource was not found.',
  serverError: 'Server error. Please try again later.',
  unauthorized: 'You are not authorized to access this resource.',
  validation: 'Please check your input and try again.',
  generic: 'Something went wrong. Please try again.',
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  contactForm: 'Your message has been sent successfully!',
  newsletter: 'You have been subscribed to the newsletter!',
  copy: 'Copied to clipboard!',
  download: 'Download completed successfully!',
} as const

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'topuria-theme',
  preferences: 'topuria-preferences',
  viewedIntro: 'topuria-viewed-intro',
} as const