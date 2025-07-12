import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Configuración de imágenes para optimización
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.espn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dmxg5wxfqgb4u.cloudfront.net', // UFC images
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features para mejor performance
  experimental: {
    // Optimiza imports de librerías grandes
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'three',
      '@react-three/fiber',
      '@react-three/drei'
    ],
    // Mejora la performance de CSS
    optimizeCss: true,
    // Turbopack para desarrollo más rápido
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Configuración de Webpack para optimizaciones adicionales
  webpack: (config, { dev, isServer }) => {
    // Optimizar para Three.js y animaciones
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    })

    // Optimizar SVGs
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    // Optimizaciones para producción
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all'
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        // Separar Three.js en su propio chunk
        three: {
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          name: 'three',
          chunks: 'all',
          priority: 30,
        },
        // Separar Framer Motion
        framerMotion: {
          test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          name: 'framer-motion',
          chunks: 'all',
          priority: 25,
        },
        // Vendor chunk para otras librerías
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
      }
    }

    return config
  },

  // Headers para seguridad y performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, stale-while-revalidate=60',
          },
        ],
      },
    ]
  },

  // Configuración de compresión
  compress: true,

  // Configuración de TypeScript
  typescript: {
    // Ignorar errores de tipos en build (solo para desarrollo rápido)
    // ignoreBuildErrors: false,
  },

  // Configuración de ESLint
  eslint: {
    // Directorios a ignorar durante el build
    ignoreDuringBuilds: false,
  },

  // Configuración de output para deployment
  output: 'standalone',

  // Variables de entorno públicas
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || '',
  },

  // Redirects para SEO
  async redirects() {
    return [
      // Ejemplo: redirect de rutas antiguas
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ]
  },

  // Rewrites para API proxy si necesitas
  async rewrites() {
    return [
      // Ejemplo: proxy a API externa
      // {
      //   source: '/api/ufc/:path*',
      //   destination: 'https://external-ufc-api.com/:path*',
      // },
    ]
  },
}

export default nextConfig