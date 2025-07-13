//src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

// Optimized font loading
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

// SEO Metadata
export const metadata: Metadata = {
  title: {
    default: 'Ilia Topuria - UFC Featherweight Champion',
    template: '%s | Ilia Topuria'
  },
  description: 'Official website of Ilia Topuria, UFC Featherweight Champion. Georgian-Spanish mixed martial artist known for his exceptional striking and knockout power.',
  keywords: [
    'Ilia Topuria',
    'UFC',
    'Featherweight Champion',
    'MMA',
    'Mixed Martial Arts',
    'Georgian Fighter',
    'Spanish Fighter',
    'El Matador',
    'UFC Champion',
    'Fighting',
    'Combat Sports'
  ],
  authors: [{ name: 'Ilia Topuria Team' }],
  creator: 'Ilia Topuria',
  publisher: 'Ilia Topuria Official',
  category: 'Sports',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://iliatopuria.com',
    siteName: 'Ilia Topuria Official',
    title: 'Ilia Topuria - UFC Featherweight Champion',
    description: 'Official website of Ilia Topuria, UFC Featherweight Champion from Georgia and Spain.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ilia Topuria UFC Champion',
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Ilia Topuria - UFC Featherweight Champion',
    description: 'Official website of UFC Featherweight Champion Ilia Topuria',
    images: ['/images/twitter-image.jpg'],
    creator: '@Topuriailia',
  },

  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },

  // App metadata
  applicationName: 'Ilia Topuria Official',
  referrer: 'origin-when-cross-origin',
  
  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // Manifest
  manifest: '/manifest.json',

  // Additional meta tags
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#C60B1E',
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ilia Topuria',
  alternateName: 'El Matador',
  description: 'UFC Featherweight Champion, Georgian-Spanish Mixed Martial Artist',
  url: 'https://iliatopuria.com',
  image: 'https://iliatopuria.com/images/ilia-topuria-profile.jpg',
  sameAs: [
    'https://www.instagram.com/topuriailia/',
    'https://twitter.com/Topuriailia',
    'https://www.ufc.com/athlete/ilia-topuria',
  ],
  jobTitle: 'Professional Mixed Martial Artist',
  memberOf: {
    '@type': 'SportsOrganization',
    name: 'Ultimate Fighting Championship (UFC)',
  },
  nationality: ['Georgian', 'Spanish'],
  birthPlace: {
    '@type': 'Place',
    name: 'Halle, Germany',
  },
  award: [
    'UFC Featherweight Champion',
    'Performance of the Night',
    'Fight of the Night',
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://cdn.espn.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Additional meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#C60B1E" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        {/* Main application */}
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>
        
        {/* Toast notifications */}
        <Toaster 
          position="bottom-right"
          theme="light"
          richColors
          closeButton
        />
        
        {/* Analytics and tracking scripts */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}