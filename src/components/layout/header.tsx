// src/components/layout/header.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/constants'
import { useMounted } from '@/hooks/use-mounted'

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mounted = useMounted()
  const { theme, setTheme } = useTheme()

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
          ? 'bg-background border-b-2 border-border'
          : 'bg-transparent',
        className
      )}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <button 
              onClick={() => scrollToSection('home')}
              className="group flex items-center space-x-3 hover-press"
            >
              {/* Logo mark */}
              <div className="relative">
                <div className="w-12 h-12 bg-topuria-black border-2 border-topuria-black flex items-center justify-center group-hover:bg-topuria-white transition-colors duration-200">
                  <span className="text-topuria-white group-hover:text-topuria-black font-black text-lg transition-colors duration-200">
                    IT
                  </span>
                </div>
                {/* Champion indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-topuria-red"></div>
              </div>
              
              {/* Logo text */}
              <div className="hidden sm:block">
                <div className="text-display text-xl text-foreground leading-none">
                  ILIA
                </div>
                <div className="text-xs font-bold tracking-[0.2em] text-topuria-red uppercase">
                  TOPURIA
                </div>
              </div>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    'relative px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200',
                    'hover:text-topuria-red',
                    activeSection === item.id
                      ? 'text-topuria-red'
                      : 'text-foreground'
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

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            
            {/* Theme Toggle */}
            {mounted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-10 h-10 border-2 border-gray-300 hover:border-topuria-black flex items-center justify-center transition-all duration-200 hover-press"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </button>
              </motion.div>
            )}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden sm:block"
            >
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-red px-6 py-3 text-sm font-bold uppercase tracking-wider hover-press shadow-solid-sm hover:shadow-solid"
              >
                Contact
              </button>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 border-2 border-gray-300 hover:border-topuria-black flex items-center justify-center transition-all duration-200 hover-press"
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
              className="lg:hidden overflow-hidden border-t-2 border-border bg-background"
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
                        'w-full text-left px-6 py-4 text-base font-bold uppercase tracking-wider transition-all duration-200',
                        'hover:bg-gray-100 hover:text-topuria-red accent-line',
                        activeSection === item.id
                          ? 'text-topuria-red bg-gray-50'
                          : 'text-foreground'
                      )}
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
                
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: NAV_ITEMS.length * 0.1 }}
                  className="px-6 pt-4"
                >
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full btn-red py-4 text-base font-bold uppercase tracking-wider shadow-solid-sm"
                  >
                    Contact
                  </button>
                </motion.div>
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
          className="absolute bottom-0 left-0 h-1 bg-topuria-red origin-left w-full"
        />
      )}
    </motion.header>
  )
}