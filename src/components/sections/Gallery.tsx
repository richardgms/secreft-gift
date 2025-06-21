'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  HeartIcon, 
  XMarkIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { cn, formatDate } from '@/lib/utils';
import { GlassCard, FloatingHearts, Carousel } from '@/components/ui';
import { Photo } from '@/types';



interface GalleryProps {
  photos: Photo[];
  title?: string;
  className?: string;
  carouselSlides?: Array<{
    title: string;
    button: string;
    src: string;
    description?: string;
  }>;
}

const Gallery: React.FC<GalleryProps> = ({ photos, title, className, carouselSlides }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());
  const [showHearts, setShowHearts] = useState(false);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleLikePhoto = (photoId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newLikedPhotos = new Set(likedPhotos);
    
    if (likedPhotos.has(photoId)) {
      newLikedPhotos.delete(photoId);
    } else {
      newLikedPhotos.add(photoId);
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 100);
    }
    
    setLikedPhotos(newLikedPhotos);
  };

  const nextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  const prevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    setSelectedPhoto(photos[prevIndex]);
  };

  return (
    <div className={cn('w-full', className)}>
      <FloatingHearts trigger={showHearts} count={12} size="lg">
        {/* Title */}
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-bold mb-3 text-gradient use-inter" style={{fontFamily: '"Inter", sans-serif', fontSize: 'clamp(1.875rem, 4vw, 3rem)'}}>
              {title}
            </h2>
            <p className="text-white/70 text-base">
              Cada foto conta um pedaço da nossa história ✨
            </p>
          </motion.div>
        )}

        {/* 3D Carousel Section */}
        {carouselSlides && carouselSlides.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Carousel 
              slides={carouselSlides} 
              onSlideClick={(slideIndex) => {
                const photo = photos[slideIndex];
                if (photo) {
                  handlePhotoClick(photo);
                }
              }}
            />
          </motion.div>
        )}

        {/* Photo Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
              
              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <GlassCard className="overflow-hidden">
                  <div className="relative">
                    {/* Close Button */}
                    <button
                      onClick={handleCloseModal}
                      className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>

                    {/* Navigation Buttons */}
                    <button
                      onClick={prevPhoto}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300"
                    >
                      <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300"
                    >
                      <ChevronRightIcon className="w-6 h-6" />
                    </button>

                    {/* Photo */}
                    <div className="relative aspect-[4/3] max-h-[70vh]">
                      <Image
                        src={selectedPhoto.src}
                        alt={selectedPhoto.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 80vw"
                      />
                    </div>

                    {/* Photo Details */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-display font-semibold text-white mb-2">
                            {formatDate(selectedPhoto.date)}
                          </h3>
                          <p className="text-white/80 leading-relaxed">
                            {selectedPhoto.caption}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleLikePhoto(selectedPhoto.id, e)}
                          className={cn(
                            'p-3 rounded-full transition-all duration-300',
                            likedPhotos.has(selectedPhoto.id)
                              ? 'bg-accent text-white'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          )}
                        >
                          {likedPhotos.has(selectedPhoto.id) ? (
                            <HeartSolid className="w-6 h-6" />
                          ) : (
                            <HeartIcon className="w-6 h-6" />
                          )}
                        </button>
                      </div>
                      
                      {selectedPhoto.location && (
                        <p className="text-white/60 text-sm">
                          📍 {selectedPhoto.location}
                        </p>
                      )}
                      
                      {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {selectedPhoto.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs rounded-full bg-accent/20 text-accent border border-accent/30"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingHearts>
    </div>
  );
};

export default Gallery; 