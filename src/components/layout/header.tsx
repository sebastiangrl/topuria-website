// src/components/layout/header.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/constants'

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.id)
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-topuria-white/95 backdrop-blur-sm border-b border-topuria-black/10 shadow-sm'
          : 'bg-transparent',
        className
      )}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          
          {/* Navigation Container - Centered around logo */}
          <div className="hidden lg:flex items-center space-x-8">
            
            {/* Left Navigation - First 2 items */}
            <nav className="flex items-center space-x-1">
              {NAV_ITEMS.slice(0, 2).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      'relative px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300',
                      'hover:text-topuria-red',
                      activeSection === item.id
                        ? 'text-topuria-red'
                        : isScrolled 
                          ? 'text-topuria-black' 
                          : 'text-topuria-white'
                    )}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-topuria-red"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* Logo - Centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <button 
                onClick={() => scrollToSection('home')}
                className="group hover-press"
              >
                {/* Logo Image - Larger */}
                <div className="relative w-20 h-20 transition-all duration-300 group-hover:scale-105">
                  <Image
                    src="/logo-topuria.png"
                    alt="Ilia Topuria Logo"
                    fill
                    className={cn(
                      "object-contain transition-all duration-300",
                      // Invertir colores cuando no está scrolled
                      !isScrolled && "filter invert brightness-0 contrast-100"
                    )}
                    priority
                  />
                </div>
              </button>
            </motion.div>

            {/* Right Navigation - Last 2 items */}
            <nav className="flex items-center space-x-1">
              {NAV_ITEMS.slice(2, 4).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (index + 2) * 0.1 }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      'relative px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300',
                      'hover:text-topuria-red',
                      activeSection === item.id
                        ? 'text-topuria-red'
                        : isScrolled 
                          ? 'text-topuria-black' 
                          : 'text-topuria-white'
                    )}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-topuria-red"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Mobile - Logo and Menu */}
          <div className="lg:hidden flex items-center justify-between w-full">
            {/* Logo for mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <button 
                onClick={() => scrollToSection('home')}
                className="group hover-press"
              >
                <div className="relative w-16 h-16 transition-all duration-300 group-hover:scale-105">
                  <Image
                    src="/logo-topuria.png"
                    alt="Ilia Topuria Logo"
                    fill
                    className={cn(
                      "object-contain transition-all duration-300",
                      !isScrolled && "filter invert brightness-0 contrast-100"
                    )}
                    priority
                  />
                </div>
              </button>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "w-10 h-10 border-2 flex items-center justify-center transition-all duration-300 hover-press",
                isScrolled 
                  ? "border-topuria-black/20 hover:border-topuria-black text-topuria-black" 
                  : "border-topuria-white/30 hover:border-topuria-white text-topuria-white"
              )}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? 'close' : 'menu'}
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-topuria-black/10 bg-topuria-white/95 backdrop-blur-sm"
            >
              <nav className="py-6 space-y-2">
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        'w-full text-left px-6 py-4 text-base font-bold uppercase tracking-wider transition-all duration-300',
                        'hover:bg-topuria-red/10 hover:text-topuria-red',
                        activeSection === item.id
                          ? 'text-topuria-red bg-topuria-red/5 border-l-4 border-topuria-red'
                          : 'text-topuria-black'
                      )}
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress indicator - solo cuando está scrolled */}
      {isScrolled && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute bottom-0 left-0 h-0.5 bg-topuria-red origin-left w-full"
        />
      )}
    </motion.header>
  )
}