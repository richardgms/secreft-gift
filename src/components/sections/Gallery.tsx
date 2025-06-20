'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import { 
  HeartIcon, 
  XMarkIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { cn, formatDate } from '@/lib/utils';
import { GlassCard, FloatingHearts } from '@/components/ui';
import { Photo } from '@/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface GalleryProps {
  photos: Photo[];
  title?: string;
  className?: string;
}

const Gallery: React.FC<GalleryProps> = ({ photos, title, className }) => {
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
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-3 text-gradient">
              {title}
            </h2>
            <p className="text-white/70 text-base">
              Cada foto conta um pedaço da nossa história ✨
            </p>
          </motion.div>
        )}

        {/* Gallery Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2.5,
              },
            }}
            className="gallery-swiper"
          >
                            {photos.map((photo) => (
              <SwiperSlide key={photo.id}>
                <GlassCard
                  className="relative group cursor-pointer overflow-hidden"
                  hover
                  onClick={() => handlePhotoClick(photo)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Photo Actions */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        onClick={(e) => handleLikePhoto(photo.id, e)}
                        className={cn(
                          'p-2 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300',
                          likedPhotos.has(photo.id) 
                            ? 'bg-accent/80 text-white' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {likedPhotos.has(photo.id) ? (
                          <HeartSolid className="w-5 h-5" />
                        ) : (
                          <HeartIcon className="w-5 h-5" />
                        )}
                      </motion.button>
                      
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePhotoClick(photo);
                        }}
                        className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MagnifyingGlassIcon className="w-5 h-5" />
                      </motion.button>
                    </div>
                    
                    {/* Photo Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-medium text-white mb-1">
                        {formatDate(photo.date)}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2">
                        {photo.caption}
                      </p>
                      {photo.location && (
                        <p className="text-white/60 text-xs mt-1">
                          📍 {photo.location}
                        </p>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </motion.div>

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