// src/components/layout/header.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/constants'
import { useMounted } from '@/hooks/use-mounted'
import Logo from '@/components/common/logo'

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mounted = useMounted()
  const { theme, setTheme } = useTheme()

  // Handle hydration
  useEffect(() => {
    // No need to call mounted, just use its value
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled(scrolled)
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

  const headerVariants: Variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  const navItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  }

  const mobileMenuVariants: Variants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const mobileNavItemVariants: Variants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  }

  return (
    <motion.header
      variants={headerVariants}
      initial="visible"
      animate="visible"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-lg'
          : 'bg-transparent',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 z-10"
          >
            <Logo />
          </motion.div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex items-center space-x-1">
              {NAV_ITEMS.map((item, index) => (
                <NavigationMenuItem key={item.id}>
                  <motion.div
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        'relative px-4 py-2 text-sm font-medium transition-all duration-300',
                        'hover:text-spanish-red hover:bg-spanish-red/5',
                        activeSection === item.id
                          ? 'text-spanish-red'
                          : 'text-foreground/70'
                      )}
                    >
                      {item.label}
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-x-0 bottom-0 h-0.5 bg-spanish-red rounded-full"
                          initial={false}
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 30
                          }}
                        />
                      )}
                    </Button>
                  </motion.div>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              {mounted ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="relative overflow-hidden"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      rotate: theme === 'dark' ? 180 : 0,
                      scale: theme === 'dark' ? 0 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Sun className="h-4 w-4" />
                  </motion.div>
                  <motion.div
                    initial={false}
                    animate={{
                      rotate: theme === 'dark' ? 0 : -180,
                      scale: theme === 'dark' ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Moon className="h-4 w-4" />
                  </motion.div>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  disabled
                  className="relative overflow-hidden"
                >
                  <div className="h-4 w-4 rounded-full bg-muted animate-pulse" />
                </Button>
              )}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden sm:block"
            >
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-spanish-red hover:bg-dark-red text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Contact
              </Button>
            </motion.div>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isMobileMenuOpen ? 'close' : 'menu'}
                      initial={{ rotate: 0, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMobileMenuOpen ? (
                        <X className="h-5 w-5" />
                      ) : (
                        <Menu className="h-5 w-5" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </SheetTrigger>

              {/* Mobile Menu Content */}
              <SheetContent 
                side="right" 
                className="w-full sm:w-80 bg-background/95 backdrop-blur-md border-l border-border"
              >
                <motion.div
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="flex flex-col h-full pt-16"
                >
                  {/* Mobile Navigation */}
                  <nav className="flex-1">
                    <div className="space-y-2">
                      {NAV_ITEMS.map((item, index) => (
                        <motion.div
                          key={item.id}
                          variants={mobileNavItemVariants}
                          custom={index}
                        >
                          <Button
                            variant="ghost"
                            onClick={() => scrollToSection(item.id)}
                            className={cn(
                              'w-full justify-start text-lg py-3 px-4 rounded-lg',
                              'hover:bg-spanish-red/10 hover:text-spanish-red',
                              activeSection === item.id
                                ? 'bg-spanish-red/10 text-spanish-red border-l-2 border-spanish-red'
                                : 'text-foreground/70'
                            )}
                          >
                            {item.label}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile CTA */}
                  <motion.div
                    variants={mobileNavItemVariants}
                    className="pt-6 border-t border-border"
                  >
                    <Button
                      onClick={() => scrollToSection('contact')}
                      className="w-full bg-spanish-red hover:bg-dark-red text-white py-3 rounded-lg font-medium"
                    >
                      Get in Touch
                    </Button>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-spanish-red origin-left"
        style={{
          scaleX: isScrolled ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.header>
  )
}