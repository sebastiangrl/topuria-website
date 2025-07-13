// src/components/sections/gallery-section.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface GalleryImage {
  id: string
  src: string
  title: string
  category: 'training' | 'fights' | 'personal' | 'events' | 'championship'
  aspectRatio: 'square' | 'portrait' | 'landscape'
  featured?: boolean
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/gallery/topuria-training-1.jpg',
    title: 'Entrenamiento Intensivo',
    category: 'training',
    aspectRatio: 'portrait'
  },
  {
    id: '2',
    src: '/images/gallery/topuria-championship.jpg',
    title: 'Momento Histórico - Primer Campeón Español',
    category: 'championship',
    aspectRatio: 'landscape',
    featured: true
  },
  {
    id: '3',
    src: '/images/gallery/topuria-octagon-1.jpg',
    title: 'En el Octágono',
    category: 'fights',
    aspectRatio: 'square'
  },
  {
    id: '4',
    src: '/images/gallery/topuria-personal-1.jpg',
    title: 'Momentos Familiares',
    category: 'personal',
    aspectRatio: 'portrait'
  },
  {
    id: '5',
    src: '/images/gallery/topuria-victory-1.jpg',
    title: 'Celebración de Victoria',
    category: 'fights',
    aspectRatio: 'landscape'
  },
  {
    id: '6',
    src: '/images/gallery/topuria-training-2.jpg',
    title: 'Preparación Mental',
    category: 'training',
    aspectRatio: 'square'
  },
  {
    id: '7',
    src: '/images/gallery/topuria-press-1.jpg',
    title: 'Conferencia de Prensa',
    category: 'events',
    aspectRatio: 'landscape'
  },
  {
    id: '8',
    src: '/images/gallery/topuria-spain-flag.jpg',
    title: 'Orgullo Español',
    category: 'championship',
    aspectRatio: 'portrait',
    featured: true
  },
  {
    id: '9',
    src: '/images/gallery/topuria-training-3.jpg',
    title: 'Técnica Perfecta',
    category: 'training',
    aspectRatio: 'square'
  },
  {
    id: '10',
    src: '/images/gallery/topuria-belt.jpg',
    title: 'El Cinturón',
    category: 'championship',
    aspectRatio: 'portrait'
  },
  {
    id: '11',
    src: '/images/gallery/topuria-gym.jpg',
    title: 'En el Gimnasio',
    category: 'training',
    aspectRatio: 'landscape'
  },
  {
    id: '12',
    src: '/images/gallery/topuria-fans.jpg',
    title: 'Con los Fans',
    category: 'events',
    aspectRatio: 'square'
  }
]

const categories = [
  { key: 'all', label: 'TODO', count: galleryImages.length },
  { key: 'championship', label: 'CAMPEONATO', count: galleryImages.filter(img => img.category === 'championship').length },
  { key: 'fights', label: 'COMBATES', count: galleryImages.filter(img => img.category === 'fights').length },
  { key: 'training', label: 'ENTRENAMIENTO', count: galleryImages.filter(img => img.category === 'training').length },
  { key: 'personal', label: 'PERSONAL', count: galleryImages.filter(img => img.category === 'personal').length },
  { key: 'events', label: 'EVENTOS', count: galleryImages.filter(img => img.category === 'events').length },
]

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image)
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id))
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === filteredImages.length - 1 ? 0 : prev + 1
    )
    setSelectedImage(filteredImages[currentImageIndex === filteredImages.length - 1 ? 0 : currentImageIndex + 1])
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? filteredImages.length - 1 : prev - 1
    )
    setSelectedImage(filteredImages[currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1])
  }

  const getGridItemClass = (image: GalleryImage, index: number) => {
    if (image.featured) {
      return 'col-span-1 row-span-2 md:col-span-2 md:row-span-2'
    }
    
    if (image.aspectRatio === 'landscape') {
      return 'col-span-1 md:col-span-2'
    }
    
    if (image.aspectRatio === 'portrait') {
      return 'col-span-1 md:row-span-2'
    }
    
    return 'col-span-1 row-span-1'
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
      className="py-20 bg-white relative overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 lg:px-8 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-black text-topuria-black mb-8">
            GALERÍA
          </h2>
          <div className="w-24 h-1 bg-topuria-red mx-auto"></div>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={cn(
                  'px-6 py-3 font-bold uppercase tracking-wide text-sm border-2 transition-all duration-300',
                  selectedCategory === category.key
                    ? 'bg-topuria-black text-white border-topuria-black'
                    : 'bg-white text-topuria-black border-gray-300 hover:border-topuria-black'
                )}
              >
                {category.label}
                <span className="ml-2 text-xs opacity-60">({category.count})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
          style={{ gridAutoRows: '200px' }}
        >
          <AnimatePresence mode="wait">
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${selectedCategory}-${image.id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className={cn(
                  'relative group cursor-pointer overflow-hidden bg-gray-100',
                  getGridItemClass(image, index)
                )}
                onClick={() => openLightbox(image)}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/gallery/placeholder.jpg';
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300" />
                
                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-sm mb-1">
                    {image.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-topuria-red"></div>
                </div>

                {/* Featured Badge */}
                {image.featured && (
                  <div className="absolute top-4 left-4 bg-topuria-red text-white px-2 py-1 text-xs font-bold uppercase">
                    DESTACADO
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Gallery Stats */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-gray-100 px-8 py-4">
            <div className="text-center">
              <div className="text-2xl font-black text-topuria-black">
                {filteredImages.length}
              </div>
              <div className="text-xs text-gray-600 uppercase tracking-wide">
                Imágenes
              </div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-black text-topuria-black">
                {categories.length - 1}
              </div>
              <div className="text-xs text-gray-600 uppercase tracking-wide">
                Categorías
              </div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-black text-topuria-red">
                {galleryImages.filter(img => img.featured).length}
              </div>
              <div className="text-xs text-gray-600 uppercase tracking-wide">
                Destacadas
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image */}
              <div className="relative w-full h-full">
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
              </div>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm p-4">
                <h3 className="text-white font-bold text-lg mb-1">
                  {selectedImage.title}
                </h3>
                <div className="text-white/70 text-sm">
                  {currentImageIndex + 1} de {filteredImages.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}