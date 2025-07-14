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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <footer className="relative bg-topuria-black text-topuria-white">
      {/* Gradient background similar to the image */}
      <div className="absolute inset-0 bg-gradient-to-t from-topuria-black via-topuria-black/95 to-topuria-black/90" />
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_0.5px,_transparent_0.5px)] bg-[length:20px_20px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative"
      >
        <div className="container mx-auto px-6 lg:px-8 py-20">
          <div className="text-center space-y-12">
            
            {/* Main TOPURIA Text with Image Mask */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative inline-block">
                <h1 
                  className="text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-black leading-none tracking-tighter"
                  style={{
                    backgroundImage: 'url(/images/gallery/gallery6.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 40%',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 30px rgba(255, 255, 255, 0.1)',
                    WebkitTextStroke: '1px rgba(128, 128, 128, 0.3)'
                  }}
                >
                  TOPURIA
                </h1>
                
                {/* Glow effect behind text */}
                <div 
                  className="absolute inset-0 text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-black leading-none tracking-tighter -z-10"
                  style={{
                    color: 'rgba(255, 255, 255, 0.05)',
                    filter: 'blur(20px)'
                  }}
                >
                  TOPURIA
                </div>
              </div>
              
              <motion.p 
                variants={itemVariants}
                className="text-topuria-gold/90 text-xl md:text-2xl font-medium italic mt-4"
              >
                &ldquo;El Matador&rdquo; • Bicampeón UFC
              </motion.p>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <div className="flex justify-center items-center gap-6">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-transparent border border-topuria-white/20 hover:border-topuria-red/60 transition-all duration-300 flex items-center justify-center group"
                      aria-label={`Seguir a Ilia Topuria en ${social.name}`}
                    >
                      <social.icon className="w-4 h-4 text-topuria-white/60 group-hover:text-topuria-red transition-colors duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              
              {/* Decorative Line */}
              <div className="relative">
                <div className="w-20 h-px bg-topuria-white/20 mx-auto" />
              </div>

              {/* Copyright and Info */}
              <div className="text-center text-topuria-white/50 text-sm space-y-2">
                <p>
                  © {currentYear} Ilia Topuria. Todos los derechos reservados.
                </p>
                <p className="text-xs text-topuria-white/30">
                  Desarrollado por <span className="text-topuria-gold/60 font-medium">DEVAIJS</span>
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Decorative corner elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle bottom glow effect with Topuria colors */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-topuria-red/20 via-topuria-gold/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-20 bg-gradient-to-t from-topuria-red/30 via-topuria-gold/20 to-transparent blur-xl" />
        
        {/* Corner accent lines - minimal */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="absolute bottom-0 left-0 w-20 h-px bg-topuria-red/40 origin-left"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.7, duration: 1.5 }}
          className="absolute bottom-0 right-0 w-20 h-px bg-topuria-gold/40 origin-right"
        />
      </div>
    </footer>
  )
}