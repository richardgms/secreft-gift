'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import Hero from '@/components/sections/Hero';
import Gallery from '@/components/sections/Gallery';
import FloatingMemories from '@/components/sections/FloatingMemories';
import MusicPlayer from '@/components/sections/MusicPlayer';
import Letters from '@/components/sections/Letters';
import Timeline from '@/components/sections/Timeline';
import { 
  GlassCard, 
  FloatingHearts, 
  ParallaxSection, 
  SectionIndicator,
  ClientOnly,
  GlowCard
} from '@/components/ui';
import ClickSpark from '@/components/ui/ClickSpark';
import { MusicPlayerRef } from '@/components/sections/MusicPlayer';

import { calculateTimeTogether } from '@/lib/utils';
import { galleryPhotos, mainPlaylist, relationshipStartDate, loveLetters, timelineEvents, carouselSlides } from '@/lib/data';

// Componente LoveCard - contador em tempo real remodelado
const LoveCard = ({ onClick }: { onClick?: () => void }) => {
  const [timeData, setTimeData] = useState({
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const startDate = new Date('2024-12-22T02:20:00');
    
    const updateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      const totalSeconds = Math.floor(diff / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);
      
      // Cálculo mais preciso dos meses
      const months = Math.floor(totalDays / 30.44); // Média de dias por mês
      const remainingDaysAfterMonths = totalDays - Math.floor(months * 30.44);
      const weeks = Math.floor(remainingDaysAfterMonths / 7);
      const days = remainingDaysAfterMonths % 7;
      
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;
      
      setTimeData({
        months,
        weeks,
        days,
        hours,
        minutes,
        seconds
      });
    };

    updateTime(); // Atualizar imediatamente
    const interval = setInterval(updateTime, 1000); // Atualizar a cada segundo

    return () => clearInterval(interval);
  }, []);

  const pluralize = (value: number, singular: string, plural: string) => {
    return value === 1 ? singular : plural;
  };

  return (
    <GlowCard 
      glowColor="gold" 
      customSize={true} 
      className="love-card cursor-pointer"
      onClick={onClick}
    >
      <div 
        role="button"
        aria-label="Tempo que estamos juntos"
        className="flex flex-col justify-between h-full"
      >
        <span className="intro">Juntos há</span>

        <div className="counter">
          <div className="big">
            {timeData.months} <small>{pluralize(timeData.months, 'MÊS', 'MESES')}</small>
          </div>
          <div className="mid">
            {timeData.weeks} {pluralize(timeData.weeks, 'SEMANA', 'SEMANAS')}
          </div>
          <div className="mid">
            {timeData.days} {pluralize(timeData.days, 'DIA', 'DIAS')}
          </div>
          <div className="time">
            {String(timeData.hours).padStart(2, '0')}h&nbsp;{String(timeData.minutes).padStart(2, '0')}m&nbsp;{String(timeData.seconds).padStart(2, '0')}s
          </div>
        </div>

        <span className="tagline">
          e a cada segundo que passa eu acabo te amando mais
        </span>
      </div>
    </GlowCard>
  );
};

export default function Home() {
  const [showHearts, setShowHearts] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const musicPlayerRef = useRef<MusicPlayerRef>(null);
  const firstInteractionRef = useRef(false);

  const triggerHearts = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 100);
  };

  const handleInteraction = () => {
    if (!firstInteractionRef.current) {
      firstInteractionRef.current = true;
      musicPlayerRef.current?.handleFirstInteraction();
    }
  };

  /*
   * Garantir que o primeiro clique/toque em QUALQUER lugar da página
   * desbloqueie o áudio.  Usamos `{ once: true }` para remover o
   * listener automaticamente após a primeira interação.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  useEffect(() => {
    // Detectar seção atual baseada no scroll
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      
      const sections = ['hero', 'home', 'gallery', 'floating-memories', 'letters', 'timeline'];
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY + windowHeight / 2;

      sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setCurrentSection(index);
          }
        }
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial position

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <ClientOnly>
      <ClickSpark
        sparkColor='#ffd700'
        sparkSize={12}
        sparkRadius={20}
        sparkCount={6}
        duration={500}
        easing="ease-out"
      >
        <main className="relative min-h-screen pb-0" id="main-content">

          {/* Hero Section - Tela inicial */}
          <div id="hero" className="w-full">
            <Hero />
          </div>

          {/* Home Section - Para Mayanne */}
          <ParallaxSection 
            id="home" 
            data-section="home" 
            className="h-screen flex items-center justify-center"
            speed={0.3}
            direction="up"
          >
            <FloatingHearts trigger={showHearts} count={8}>
              <div 
                className="text-center mx-auto" 
                role="main"
                aria-label="Seção principal do Museu Flutuante"
                style={{
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 'clamp(24px, 3vw, 36px)',
                  padding: 'clamp(64px, 8vh, 128px) clamp(16px, 4vw, 48px) clamp(32px, 4vh, 64px)',
                  maxWidth: 'min(90vw, 1200px)',
                  minHeight: '100vh',
                  justifyContent: 'center'
                }}>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  style={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 'clamp(16px, 2vw, 24px)',
                    marginBottom: 'clamp(8px, 1vw, 16px)'
                  }}
                >
                  <p className="text-white/80 font-light" style={{
                    fontFamily: '"Poiret One", sans-serif',
                    fontSize: 'clamp(23px, 3.9vw, 31px)',
                    fontWeight: 400,
                    lineHeight: 1.6
                  }}>
                    Para a branquela mais especial do mundo
                  </p>
                  <p
                    className="text-accent"
                    style={{
                      fontFamily: '"Dancing Script", cursive',
                      fontSize: 'clamp(32px, 5vw, 48px)',
                      fontWeight: 600,
                      letterSpacing: '0.01em',
                      color: '#fde68a'
                    }}
                  >
                    Mayanne 🐋
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  style={{
                    margin: 'clamp(8px, 1vw, 16px) 0'
                  }}
                >
                    <div className="inline-block">
                      <LoveCard onClick={triggerHearts} />
                    </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.4 }}
                  style={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 'clamp(16px, 2vw, 24px)',
                    paddingTop: 'clamp(8px, 1vw, 16px)'
                  }}
                >
                  <p className="text-white/70 max-w-3xl mx-auto leading-relaxed font-light" style={{
                    fontFamily: '"Poiret One", sans-serif',
                    fontSize: 'clamp(21px, 3.25vw, 26px)',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    letterSpacing: '0.005em'
                  }}>
                    Este é nosso museu pessoal, onde cada memória é uma obra de arte, 
                    cada momento é uma exposição especial, e cada dia juntos é uma nova 
                    peça adicionada à nossa coleção de amor.
                  </p>
                  
                </motion.div>
              </div>
            </FloatingHearts>
          </ParallaxSection>

          {/* Gallery Section */}
          <ParallaxSection 
            id="gallery" 
            data-section="gallery" 
            className="h-screen flex items-center justify-center px-6 py-12 pb-24"
            speed={0.2}
            direction="down"
          >
            <div className="max-w-7xl mx-auto w-full">
              <Gallery 
                photos={galleryPhotos} 
                title="Nossa Galeria de Momentos Especiais"
                carouselSlides={carouselSlides}
              />
            </div>
          </ParallaxSection>

          {/* Floating Memories Section */}
          <ParallaxSection 
            id="floating-memories" 
            data-section="floating-memories" 
            className="h-screen w-full pt-16"
            speed={0.15}
            direction="up"
          >
            <FloatingMemories />
          </ParallaxSection>

          {/* Letters Section */}
          <ParallaxSection 
            id="letters" 
            data-section="letters" 
            /*
             * Reduzimos padding-top e padding-bottom para diminuir o
             * espaço vazio entre Cartinhas e o rodapé.
             */
            className="flex items-start justify-center px-6 pt-16 md:pt-12 pb-4 md:pb-6"
            speed={0.4}
            direction="left"
          >
            <div className="max-w-[1400px] mx-auto w-full">
              <Letters 
                letters={loveLetters} 
                title="Cartinhas do Coração"
              />
            </div>
          </ParallaxSection>

          {/* Espaçamento reduzido no mobile entre Letters e Footer */}
          <div className="block md:hidden h-16"></div>

          {/* Footer */}
          <footer className="py-8 px-6 text-center mb-24 pb-24">
            <GlassCard 
              className="max-w-3xl mx-auto hover-lift px-8 py-8" 
              variant="gold" 
              size="lg"
              shimmer
            >
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <p
                    className="font-romantic text-3xl md:text-4xl"
                    style={{ color: '#8ed4ff' }}
                  >
                    Feito com muito amor pelo seu Rich
                  </p>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-2xl flex-shrink-0"
                  >
                    🤍
                  </motion.div>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed font-body use-inter text-center" style={{fontSize: 'clamp(18px, 2.4vw, 22px)'}}>
                Esse museu foi feito exclusivamente para a minha branquela, minha May 🌷
              </p>
            </GlassCard>
          </footer>

          {/* Music Player */}
          <MusicPlayer ref={musicPlayerRef} playlist={mainPlaylist} />

          {/* Section Indicator */}
          <SectionIndicator totalSections={5} currentSection={currentSection} />

        </main>
      </ClickSpark>
    </ClientOnly>
  );
}
