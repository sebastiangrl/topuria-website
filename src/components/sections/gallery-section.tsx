// src/components/sections/gallery-section.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import type { Variants } from 'framer-motion'

interface GalleryImage {
  id: string
  src: string
  title: string
  description?: string
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/gallery/gallery1.webp',
    title: 'Momento Histórico',
    description: 'Primer Campeón Español UFC'
  },
  {
    id: '2',
    src: '/images/gallery/gallery2.webp',
    title: 'Entrenamiento',
    description: 'Preparación para la gloria'
  },
  {
    id: '3',
    src: '/images/gallery/gallery3.webp',
    title: 'En el Octágono',
    description: 'Donde nacen las leyendas'
  },
  {
    id: '4',
    src: '/images/gallery/gallery4.webp',
    title: 'Victoria',
    description: 'Celebración del triunfo'
  },
  {
    id: '5',
    src: '/images/gallery/gallery5.webp',
    title: 'El Cinturón',
    description: 'Símbolo de grandeza'
  },
  {
    id: '6',
    src: '/images/gallery/gallery6.webp',
    title: 'Orgullo Español',
    description: 'Representando a España'
  },
  {
    id: '7',
    src: '/images/gallery/gallery7.webp',
    title: 'Dedicación',
    description: 'Cada día cuenta'
  },
  {
    id: '8',
    src: '/images/gallery/gallery8.webp',
    title: 'Conferencia',
    description: 'Frente a los medios'
  },
  {
    id: '9',
    src: '/images/gallery/gallery9.webp',
    title: 'En el Gimnasio',
    description: 'Forjando la disciplina'
  }
]

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(nextIndex)
    setSelectedImage(galleryImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setSelectedImage(galleryImages[prevIndex])
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-20 bg-topuria-white relative overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 lg:px-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "80px" } : { width: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-topuria-red mx-auto mb-8"
          />
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-topuria-black mb-4">
            GALERÍA
          </h2>
          <p className="text-xl text-topuria-black/60 max-w-2xl mx-auto">
            Momentos que definieron la historia de El Matador
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-square cursor-pointer overflow-hidden bg-topuria-black/5"
              onClick={() => openLightbox(image, index)}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/gallery/placeholder.jpg';
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-topuria-black/80 via-topuria-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-topuria-white font-bold text-lg mb-2">
                    {image.title}
                  </h3>
                  {image.description && (
                    <p className="text-topuria-white/80 text-sm">
                      {image.description}
                    </p>
                  )}
                  <div className="w-12 h-0.5 bg-topuria-red mt-3" />
                </motion.div>
              </div>

              {/* Number Indicator */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-topuria-black/60 backdrop-blur-sm flex items-center justify-center">
                <span className="text-topuria-white text-sm font-bold">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-topuria-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-topuria-white/10 backdrop-blur-sm hover:bg-topuria-white/20 flex items-center justify-center transition-colors duration-300"
            >
              <X className="w-6 h-6 text-topuria-white" />
            </motion.button>

            {/* Navigation */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-topuria-white/10 backdrop-blur-sm hover:bg-topuria-white/20 flex items-center justify-center transition-colors duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-topuria-white" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-topuria-white/10 backdrop-blur-sm hover:bg-topuria-white/20 flex items-center justify-center transition-colors duration-300"
            >
              <ChevronRight className="w-6 h-6 text-topuria-white" />
            </motion.button>

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/gallery/placeholder.jpg';
                }}
              />
            </motion.div>

            {/* Image Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-6 left-6 right-6 bg-topuria-black/60 backdrop-blur-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-topuria-white font-bold text-xl mb-2">
                    {selectedImage.title}
                  </h3>
                  {selectedImage.description && (
                    <p className="text-topuria-white/80">
                      {selectedImage.description}
                    </p>
                  )}
                </div>
                <div className="text-topuria-white/60 text-sm">
                  {currentIndex + 1} / {galleryImages.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}