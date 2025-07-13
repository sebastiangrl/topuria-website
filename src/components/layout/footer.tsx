// src/components/layout/footer.tsx
'use client'

import { motion } from 'framer-motion'
import { Instagram, Youtube} from 'lucide-react'
import Link from 'next/link'
import type { Variants } from 'framer-motion'

// Custom X (Twitter) Icon Component
const XIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 512 512" 
    className={className}
    fill="currentColor"
  >
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
  </svg>
)

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 448 512"
    className={className}
    fill="currentColor"
  >
    <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/>
  </svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/iliatopuria/',
      icon: Instagram
    },
    {
      name: 'X',
      href: 'https://x.com/topuriailia',
      icon: XIcon
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@iliatopuriaufc',
      icon: Youtube
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@iliatopuria',
      icon: TikTokIcon
    }
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <footer className="relative bg-topuria-black text-topuria-white py-16">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center space-y-12">
            
            {/* Main Title */}
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-topuria-white mb-4">
                ILIA TOPURIA
              </h2>
              <p className="text-topuria-gold/80 text-lg md:text-xl font-medium italic">
                &ldquo;El Matador&rdquo;
              </p>
            </motion.div>

            {/* Key Stats */}
            <motion.div variants={itemVariants}>
              <div className="flex justify-center items-center gap-12 md:gap-16">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-topuria-white mb-2">
                    17-0-0
                  </div>
                  <div className="text-sm uppercase tracking-widest text-topuria-white/60">
                    Invicto
                  </div>
                </div>
                
                <div className="w-px h-16 bg-topuria-white/20" />
                
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-topuria-gold mb-2">
                    #1
                  </div>
                  <div className="text-sm uppercase tracking-widest text-topuria-white/60">
                    P4P Mundial
                  </div>
                </div>
                
                <div className="w-px h-16 bg-topuria-white/20" />
                
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-topuria-red mb-2">
                    2
                  </div>
                  <div className="text-sm uppercase tracking-widest text-topuria-white/60">
                    Cinturones
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <div className="flex justify-center items-center gap-6">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -4,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-topuria-white/10 hover:bg-topuria-red transition-all duration-300 flex items-center justify-center group"
                    >
                      <social.icon className="w-5 h-5 text-topuria-white group-hover:text-topuria-white" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Separator */}
            <motion.div variants={itemVariants}>
              <div className="w-24 h-px bg-topuria-white/20 mx-auto" />
            </motion.div>

            {/* Bottom Text */}
            <motion.div variants={itemVariants}>
              <div className="text-center text-topuria-white/60 text-sm">
                <p className="mb-2">
                  © {currentYear} Ilia Topuria. Todos los derechos reservados.
                </p>
                <p>
                  Bicampeón UFC • Invicto • El Matador
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Corner accent lines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1.5 }}
          className="absolute bottom-0 left-0 w-32 h-px bg-topuria-red origin-left"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="absolute bottom-0 right-0 w-32 h-px bg-topuria-gold origin-right"
        />
      </div>
    </footer>
  )
}