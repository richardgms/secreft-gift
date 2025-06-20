'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Gallery from '@/components/sections/Gallery';
import MusicPlayer from '@/components/sections/MusicPlayer';
import Letters from '@/components/sections/Letters';
import Timeline from '@/components/sections/Timeline';
import { 
  GlassCard, 
  FloatingHearts, 
  ParallaxSection, 
  AnimatedTooltip,
  PulseBadge,
  AnimatedCounter,
  ClickSpark
} from '@/components/ui';

import { calculateTimeTogether } from '@/lib/utils';
import { galleryPhotos, mainPlaylist, relationshipStartDate, loveLetters, timelineEvents } from '@/lib/data';

export default function Home() {
  const [showHearts, setShowHearts] = useState(false);

  const triggerHearts = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 100);
  };



  useEffect(() => {
    // Inicialização do componente
    const timer = setTimeout(() => {
      // Componente carregado
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ClickSpark
      sparkColor='#ffd700'
      sparkSize={12}
      sparkRadius={20}
      sparkCount={6}
      duration={500}
      easing="ease-out"
    >
      <main className="relative min-h-screen" id="main-content">

        {/* Home Section */}
      <ParallaxSection 
        id="home" 
        data-section="home" 
        className="min-h-screen flex items-center justify-center px-4 py-20"
        speed={0.3}
        direction="up"
      >
        <FloatingHearts trigger={showHearts} count={8}>
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold mb-6">
                <span className="text-gradient">Museu</span>
                <br />
                <span className="font-romantic text-5xl md:text-7xl lg:text-8xl text-gold">
                  Flutuante
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-8"
            >
              <p className="text-xl md:text-2xl text-white/80 mb-4">
                Para a pessoa mais especial do mundo
              </p>
              <p className="font-romantic text-3xl md:text-4xl text-accent">
                Mayanne 💕
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <AnimatedTooltip 
                content="Clique para uma surpresa! 💕"
                position="top"
              >
                <GlassCard 
                  className="inline-block mb-8" 
                  hover 
                  glow
                  shimmer
                  tilt
                  onClick={triggerHearts}
                >
                <div className="text-center">
                  <p className="text-sm text-white/60 mb-2">Juntos há</p>
                    <div className="font-display text-2xl md:text-3xl text-gold">
                      <AnimatedCounter 
                        end={parseInt(calculateTimeTogether(relationshipStartDate).split(' ')[0])}
                        suffix={` ${calculateTimeTogether(relationshipStartDate).split(' ').slice(1).join(' ')}`}
                      />
                    </div>
                  <p className="text-sm text-white/60 mt-2">
                    e cada dia é mais especial ✨
                  </p>
                </div>
              </GlassCard>
              </AnimatedTooltip>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="space-y-4"
            >
              <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                Este é nosso museu pessoal, onde cada memória é uma obra de arte, 
                cada momento é uma exposição especial, e cada dia juntos é uma nova 
                peça adicionada à nossa coleção de amor.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
                <PulseBadge variant="info" className="animate-bounce-subtle">
                  Explore rolando a página! 🎉
                </PulseBadge>
              </div>
            </motion.div>
          </div>
        </FloatingHearts>
      </ParallaxSection>

      {/* Gallery Section */}
      <ParallaxSection 
        id="gallery" 
        data-section="gallery" 
        className="min-h-screen flex items-center justify-center px-4 py-20"
        speed={0.2}
        direction="down"
      >
        <div className="max-w-7xl mx-auto w-full">
          <Gallery 
            photos={galleryPhotos} 
            title="Nossa Galeria de Momentos Especiais"
          />
        </div>
      </ParallaxSection>

      {/* Letters Section */}
      <ParallaxSection 
        id="letters" 
        data-section="letters" 
        className="min-h-screen flex items-center justify-center px-4 py-20"
        speed={0.4}
        direction="left"
      >
        <div className="max-w-7xl mx-auto w-full">
          <Letters 
            letters={loveLetters} 
            title="Cartinhas do Coração"
          />
        </div>
      </ParallaxSection>

      {/* Timeline Section */}
      <ParallaxSection 
        id="timeline" 
        data-section="timeline" 
        className="min-h-screen flex items-center justify-center px-4 py-20"
        speed={0.3}
        direction="right"
      >
        <div className="max-w-7xl mx-auto w-full">
          <Timeline 
            events={timelineEvents} 
            title="Nossa História de Amor"
          />
        </div>
      </ParallaxSection>

      {/* Footer */}
      <footer className="py-12 px-4 text-center mb-24">
        <GlassCard 
          className="max-w-2xl mx-auto hover-lift" 
          variant="gold" 
          size="lg"
          shimmer
        >
          <div className="flex items-center justify-center mb-4">
            <p className="font-romantic text-2xl text-accent mr-2">
            Feito com muito amor por Richard
          </p>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              💕
            </motion.div>
          </div>
          <p className="text-white/60 text-sm">
            Este museu é dedicado exclusivamente à você, Mayanne.
            <br />
            Cada pixel foi pensado com carinho.
          </p>
        </GlassCard>
      </footer>

      {/* Music Player */}
      <MusicPlayer playlist={mainPlaylist} />

      </main>
    </ClickSpark>
  );
}
