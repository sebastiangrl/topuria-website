// src/app/page.tsx
import { Suspense } from 'react'
import { Metadata } from 'next'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import ScrollProgress from '@/components/interactive/scroll-progress'

// Lazy loading de las secciones para mejor performance
// import HeroSection from '@/components/sections/hero-section'
// import AboutSection from '@/components/sections/about-section'
// import StatsSection from '@/components/sections/stats-section'
// import TimelineSection from '@/components/sections/timeline-section'
// import GallerySection from '@/components/sections/gallery-section'
// import ContactSection from '@/components/sections/contact-section'

export const metadata: Metadata = {
  title: 'Ilia Topuria - UFC Featherweight Champion',
  description: 'Official website of Ilia Topuria, undefeated UFC Featherweight Champion from Georgia and Spain. El Matador\'s journey to the top.',
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
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Champion Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-spanish-red/10 border border-spanish-red/20 rounded-full text-spanish-red font-semibold text-sm">
                🏆 UFC FEATHERWEIGHT CHAMPION
              </div>
              
              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-tight">
                ILIA
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-spanish-red to-spanish-gold">
                  TOPURIA
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Undefeated. Unstoppable. <span className="text-spanish-red font-semibold">El Matador</span> from Georgia and Spain.
              </p>
              
              {/* Stats Row */}
              <div className="flex items-center justify-center space-x-8 md:space-x-12 py-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-spanish-red">15</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">Losses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-spanish-gold">10</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">Finishes</div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                About El Matador
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Born in Germany, raised with Georgian heart and Spanish spirit. 
                Ilia Topuria has conquered the UFC featherweight division with his devastating knockout power 
                and technical prowess. An undefeated champion who brings honor to both Georgia and Spain.
              </p>
            </div>
          </div>
        </section>

        {/* Career Section */}
        <section id="career" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                Championship Journey
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From his UFC debut to becoming champion, every fight tells the story of dedication, 
                skill, and the relentless pursuit of excellence that defines El Matador.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                Fight Statistics
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Numbers that showcase the dominance and finishing ability of one of the most 
                feared fighters in the featherweight division.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                Gallery
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Moments that define a champion. From training to triumph, 
                witness the journey of El Matador through exclusive imagery.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                For business inquiries, media requests, or partnership opportunities.
              </p>
              
              <div className="inline-flex items-center px-6 py-3 bg-spanish-red hover:bg-dark-red text-white rounded-full font-medium transition-colors cursor-pointer">
                Contact Team Topuria
              </div>
            </div>
          </div>
        </section>

      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}