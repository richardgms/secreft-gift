'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { 
  MapPinIcon,
  CalendarIcon,
  PhotoIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { cn, formatDate, formatDateShort } from '@/lib/utils';
import { GlassCard, FloatingHearts } from '@/components/ui';
import { TimelineEvent } from '@/types';

interface TimelineProps {
  events: TimelineEvent[];
  title?: string;
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ events, title, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [showHearts, setShowHearts] = useState(false);

  const { scrollXProgress } = useScroll({
    container: containerRef
  });

  const typeColors = {
    meeting: 'from-accent/80 to-accent',
    milestone: 'from-gold/80 to-gold',
    travel: 'from-blue-500/80 to-blue-500',
    special: 'from-purple-500/80 to-purple-500',
  };

  const typeIcons = {
    meeting: HeartSolid,
    milestone: HeartIcon,
    travel: MapPinIcon,
    special: CalendarIcon,
  };

  const handleEventClick = (eventId: string) => {
    setActiveEvent(eventId);
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 100);
  };

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className={cn('w-full', className)}>
      <FloatingHearts trigger={showHearts} count={20} size="lg" color="gold">
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
              A linha do tempo do nosso amor ⏰💕
            </p>
          </motion.div>
        )}

        {/* Timeline Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                             <motion.div
                 className="h-full bg-gradient-accent"
                 style={{
                   scaleX: scrollXProgress,
                   transformOrigin: "left"
                 }}
                 initial={{ scaleX: 0 }}
               />
            </div>
            <p className="text-center text-white/60 text-sm mt-2">
              Deslize para navegar pela nossa história
            </p>
          </div>

          {/* Timeline Scroll Container */}
          <div
            ref={containerRef}
            className="overflow-x-auto overflow-y-hidden pb-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-8 p-4" style={{ width: `${sortedEvents.length * 400}px` }}>
              {sortedEvents.map((event, index) => {
                const IconComponent = typeIcons[event.type];
                const isActive = activeEvent === event.id;
                
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative flex-shrink-0"
                    style={{ width: '350px' }}
                  >
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 top-20 w-0.5 h-full bg-white/20 transform -translate-x-1/2" />
                    
                    {/* Event Card */}
                    <motion.div
                      onClick={() => handleEventClick(event.id)}
                      className="relative cursor-pointer"
                      whileHover={{ 
                        scale: 1.05,
                        y: -10
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <GlassCard 
                        className={cn(
                          'relative overflow-hidden transition-all duration-300',
                          isActive && 'ring-2 ring-accent shadow-neon'
                        )}
                        hover
                      >
                        {/* Event Icon */}
                        <div className="relative -mt-6 mb-4 flex justify-center">
                          <motion.div
                            className={cn(
                              'w-16 h-16 rounded-full flex items-center justify-center border-4 border-white/20',
                              `bg-gradient-to-br ${typeColors[event.type]}`
                            )}
                            animate={isActive ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 360, 0]
                            } : {}}
                            transition={{ duration: 1 }}
                          >
                            <span className="text-2xl" role="img" aria-label={event.type}>
                              {event.icon}
                            </span>
                          </motion.div>
                        </div>

                        {/* Event Content */}
                        <div className="p-6 pt-0">
                          {/* Date */}
                          <div className="text-center mb-4">
                            <p className="text-accent font-semibold text-lg">
                              {formatDateShort(event.date)}
                            </p>
                            <p className="text-white/60 text-sm">
                              {formatDate(event.date)}
                            </p>
                          </div>

                          {/* Title */}
                          <h3 className="font-display text-xl font-semibold text-white mb-3 text-center">
                            {event.title}
                          </h3>

                          {/* Description */}
                          <p className="text-white/80 text-sm leading-relaxed text-center mb-4">
                            {event.description}
                          </p>

                          {/* Location */}
                          {event.location && (
                            <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-4">
                              <MapPinIcon className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          )}

                          {/* Photos indicator */}
                          {event.photos && event.photos.length > 0 && (
                            <div className="flex items-center justify-center gap-2 text-gold text-sm">
                              <PhotoIcon className="w-4 h-4" />
                              <span>{event.photos.length} foto{event.photos.length > 1 ? 's' : ''}</span>
                            </div>
                          )}

                          {/* Decorative Elements */}
                          <div className="absolute top-4 right-4 text-white/20">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          
                          {/* Active glow */}
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 bg-accent/10 rounded-xl"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </div>
                      </GlassCard>
                    </motion.div>

                    {/* Floating decorations */}
                    <motion.div
                      className="absolute -top-4 -right-2 text-gold text-xl opacity-0"
                      animate={{
                        opacity: [0, 1, 0],
                        y: [-10, 0, -10],
                        rotate: [0, 10, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      ✨
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Future placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sortedEvents.length * 0.1 }}
                viewport={{ once: true }}
                className="relative flex-shrink-0"
                style={{ width: '350px' }}
              >
                <GlassCard className="relative overflow-hidden border-dashed border-white/30">
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🔮</span>
                    </div>
                    <h3 className="font-romantic text-xl text-white/70 mb-2">
                      Nosso Futuro
                    </h3>
                    <p className="text-white/50 text-sm">
                      Muitas memórias especiais ainda estão por vir...
                    </p>
                    <div className="mt-4">
                      <HeartSolid className="w-6 h-6 text-accent/50 mx-auto" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>

          {/* Scroll Hint */}
          <motion.div
            className="flex justify-center mt-6"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span>←</span>
              <span>Deslize para ver mais</span>
              <span>→</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <GlassCard className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-accent mb-1">
                  {sortedEvents.length}
                </p>
                <p className="text-white/60 text-sm">Momentos Especiais</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gold mb-1">
                  {sortedEvents.filter(e => e.type === 'milestone').length}
                </p>
                <p className="text-white/60 text-sm">Marcos Importantes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400 mb-1">
                  {sortedEvents.filter(e => e.type === 'travel').length}
                </p>
                <p className="text-white/60 text-sm">Viagens Juntos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400 mb-1">
                  ∞
                </p>
                <p className="text-white/60 text-sm">Amor Infinito</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </FloatingHearts>
    </div>
  );
};

export default Timeline; 