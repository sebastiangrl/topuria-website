// src/components/layout/footer.tsx
'use client'

import { motion } from 'framer-motion'
import { Instagram, Twitter, Youtube, ExternalLink, Heart, Crown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { SOCIAL_LINKS, SITE_CONFIG, NAV_ITEMS } from '@/lib/constants'
import Logo from '@/components/common/logo'
import type { Variants } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Instagram',
      href: SOCIAL_LINKS.instagram,
      icon: Instagram,
      color: 'hover:text-pink-500'
    },
    {
      name: 'Twitter',
      href: SOCIAL_LINKS.twitter,
      icon: Twitter,
      color: 'hover:text-blue-400'
    },
    {
      name: 'YouTube',
      href: SOCIAL_LINKS.youtube,
      icon: Youtube,
      color: 'hover:text-red-500'
    },
    {
      name: 'UFC Profile',
      href: SOCIAL_LINKS.ufc,
      icon: ExternalLink,
      color: 'hover:text-spanish-red'
    }
  ]

  const footerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  const socialVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  }

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
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="relative bg-gradient-to-br from-background via-background to-muted border-t border-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--spanish-red)_1px,_transparent_1px)] bg-[length:24px_24px]" />
      </div>

      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="mb-6">
                <Logo size="lg" />
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                UFC Featherweight Champion from Georgia and Spain. Undefeated record with devastating knockout power. 
                <span className="text-spanish-red font-semibold"> El Matador</span> continues his dominant reign.
              </p>

              {/* Champion Stats */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Crown className="h-4 w-4 text-spanish-gold mr-1" />
                    <span className="text-2xl font-bold text-foreground">15</span>
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Wins</span>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Losses</span>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-spanish-red">10</div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Finishes</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.name}
                    variants={socialVariants}
                    whileHover="hover"
                    custom={index}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className={cn(
                        'rounded-full bg-muted/50 hover:bg-muted transition-all duration-300',
                        social.color
                      )}
                    >
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow on ${social.name}`}
                      >
                        <social.icon className="h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Quick Links
              </h3>
              <nav className="space-y-3">
                {NAV_ITEMS.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => scrollToSection(item.id)}
                      className="h-auto p-0 justify-start text-muted-foreground hover:text-spanish-red transition-colors"
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                ))}
              </nav>
            </motion.div>

            {/* Contact & Legal */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Contact
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Management Inquiries</p>
                <p>Press & Media</p>
                <p>Sponsorship Opportunities</p>
                
                <div className="pt-4">
                  <Button
                    onClick={() => scrollToSection('contact')}
                    className="bg-spanish-red hover:bg-dark-red text-white text-sm px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
                  >
                    Get in Touch
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          <Separator className="my-8" />

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© {currentYear} Ilia Topuria. All rights reserved.</span>
              <Separator orientation="vertical" className="h-4" />
              <Link 
                href="/privacy" 
                className="hover:text-spanish-red transition-colors"
              >
                Privacy Policy
              </Link>
              <Separator orientation="vertical" className="h-4" />
              <Link 
                href="/terms" 
                className="hover:text-spanish-red transition-colors"
              >
                Terms of Service
              </Link>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="h-4 w-4 text-spanish-red fill-current" />
              </motion.div>
              <span>by</span>
              <Button
                variant="ghost"
                onClick={scrollToTop}
                className="text-spanish-red hover:text-dark-red p-0 h-auto font-medium"
              >
                Team Topuria
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="absolute bottom-8 right-8"
      >
        <Button
          onClick={scrollToTop}
          size="icon"
          className="rounded-full bg-spanish-red hover:bg-dark-red text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ↑
          </motion.div>
        </Button>
      </motion.div>
    </footer>
  )
}