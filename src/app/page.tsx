// src/app/page.tsx
import { Suspense } from 'react'
import { Metadata } from 'next'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import ScrollProgress from '@/components/interactive/scroll-progress'
import HeroSection from '@/components/sections/hero-section'
import AboutSection from '@/components/sections/about-section'
import StatsSection from '@/components/sections/stats-section'
import TimelineSection from '@/components/sections/timeline-section'
import GallerySection from '@/components/sections/gallery-section'

export const metadata: Metadata = {
  title: 'Ilia Topuria - UFC Lightweight Champion',
  description: 'Official website of Ilia Topuria, undefeated UFC Lightweight Champion from Georgia and Spain. El Matador\'s journey to the top.',
}

export default function HomePage() {
  return (
    <div className="relative">
      {/* Scroll Progress Indicator */}
      <ScrollProgress position="top" height={3} />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main id="main-content" className="relative">
        
        {/* Hero Section */}
        <Suspense fallback={
          <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-spanish-red/20 rounded-full animate-pulse" />
              <div className="text-lg text-muted-foreground">Loading El Matador...</div>
            </div>
          </section>
        }>
          <HeroSection />
        </Suspense>

        {/* About Section - Interactive Timeline */}
        <Suspense fallback={
          <section className="py-20 bg-muted/50 animate-pulse">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="h-8 bg-muted rounded mb-4 mx-auto w-64"></div>
                <div className="h-6 bg-muted rounded mb-8 mx-auto w-96"></div>
                <div className="h-4 bg-muted rounded mx-auto w-full"></div>
              </div>
            </div>
          </section>
        }>
          <AboutSection />
        </Suspense>

        {/* Stats Section - Performance Dashboard */}
        <Suspense fallback={
          <section className="py-20 bg-background animate-pulse">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="h-8 bg-muted rounded mb-4 mx-auto w-72"></div>
                <div className="h-6 bg-muted rounded mb-8 mx-auto w-80"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-32 bg-muted rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        }>
          <StatsSection />
        </Suspense>

        {/* Timeline Section - Professional Career */}
        <Suspense fallback={
          <section className="py-20 bg-muted/30 animate-pulse">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="h-8 bg-muted rounded mb-4 mx-auto w-80"></div>
                <div className="h-6 bg-muted rounded mb-8 mx-auto w-96"></div>
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-24 bg-muted rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        }>
          <TimelineSection />
        </Suspense>

        {/* Gallery Section - Visual Showcase */}
        <Suspense fallback={
          <section className="py-20 bg-white animate-pulse">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="h-8 bg-gray-200 mb-8 mx-auto w-64"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="h-64 bg-gray-200"></div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        }>
          <GallerySection />
        </Suspense>

      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}