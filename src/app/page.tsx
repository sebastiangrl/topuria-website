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
        <section id="gallery" className="py-20 bg-background relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-20 w-32 h-32 bg-spanish-gold rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-spanish-red rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-spanish-gold/10 border border-spanish-gold/30 rounded-full text-spanish-gold font-semibold text-sm mb-4">
                📸 Visual Journey
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">
                Moments of
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-spanish-red to-spanish-gold">
                  Greatness
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                From training sessions to championship victories, witness the visual story 
                of El Matador's rise through exclusive imagery and behind-the-scenes moments.
              </p>
            </div>

            {/* Gallery Grid Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Training in Madrid',
                'Championship Victory',
                'Family Moments',
                'Press Conferences',
                'Behind the Scenes',
                'Victory Celebrations'
              ].map((category, index) => (
                <div 
                  key={category}
                  className="group relative aspect-square bg-muted/50 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{category}</h3>
                    <p className="text-white/80 text-sm">Coming Soon</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center">
                      <span className="text-white/60 text-2xl">📷</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-spanish-gold hover:bg-spanish-gold/80 text-black rounded-full font-semibold transition-all duration-300 hover:scale-105">
                View Full Gallery
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section - Get in Touch */}
        <section id="contact" className="py-20 bg-gradient-to-br from-muted/50 via-background to-muted/50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_var(--spanish-red)_0%,_transparent_50%),_radial-gradient(circle_at_75%_75%,_var(--spanish-gold)_0%,_transparent_50%)]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-spanish-red/10 border border-spanish-red/30 rounded-full text-spanish-red font-semibold text-sm mb-4">
                📞 Get in Touch
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">
                Contact
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-spanish-red to-spanish-gold">
                  Team Topuria
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                For business inquiries, media requests, sponsorship opportunities, 
                or partnership collaborations with the champion.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: 'Business Inquiries',
                  description: 'Sponsorship & Partnership Opportunities',
                  icon: '💼',
                  contact: 'business@topuria.com'
                },
                {
                  title: 'Media & Press',
                  description: 'Interview Requests & Media Coverage',
                  icon: '📺',
                  contact: 'media@topuria.com'
                },
                {
                  title: 'Fan Mail',
                  description: 'Messages from Supporters Worldwide',
                  icon: '❤️',
                  contact: 'fans@topuria.com'
                }
              ].map((contact, index) => (
                <div 
                  key={contact.title}
                  className="text-center p-6 bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl hover:border-spanish-red/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">{contact.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {contact.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {contact.description}
                  </p>
                  <div className="text-spanish-red font-medium">
                    {contact.contact}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="inline-flex items-center px-8 py-4 bg-spanish-red hover:bg-dark-red text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <span className="mr-2">📧</span>
                Send Message
              </button>
              
              <div className="mt-6 flex items-center justify-center space-x-6 text-muted-foreground">
                <span className="text-sm">Follow El Matador:</span>
                <div className="flex space-x-4">
                  {[
                    { name: 'Instagram', icon: '📸', url: 'https://instagram.com/topuriailia' },
                    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/Topuriailia' },
                    { name: 'YouTube', icon: '📺', url: 'https://youtube.com/@IliaTopuria' }
                  ].map(social => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-spanish-red hover:text-white transition-all duration-300"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
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