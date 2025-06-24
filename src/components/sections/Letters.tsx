'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon,
  CalendarIcon,
  SparklesIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { cn, formatDate } from '@/lib/utils';
import { GlassCard, FloatingHearts } from '@/components/ui';
import { Letter } from '@/types';

interface LettersProps {
  letters: Letter[];
  title?: string;
  className?: string;
}



const Letters: React.FC<LettersProps> = ({ letters, title, className }) => {
  const [openLetter, setOpenLetter] = useState<Letter | null>(null);
  const [showHearts, setShowHearts] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typewriterInterval, setTypewriterInterval] = useState<NodeJS.Timeout | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  // Verificar se estamos no cliente para evitar erro de hidratação
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Timer para atualizar o tempo atual
  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient]);

  // Cleanup do intervalo quando componente for desmontado
  useEffect(() => {
    return () => {
      if (typewriterInterval) {
        clearInterval(typewriterInterval);
      }
      // Restaurar scroll se o componente for desmontado com carta aberta
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [typewriterInterval]);

  // Fechar carta com tecla ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openLetter) {
        handleCloseLetter();
      }
    };

    if (openLetter) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [openLetter]);

  const letterTypeIcons = {
    love: HeartSolid,
    memory: StarIcon,
    future: SparklesIcon,
    special: ClockIcon,
  };

  const letterTypeColors = {
    love: 'bg-accent/20 border-accent/40 text-accent',
    memory: 'bg-gold/20 border-gold/40 text-gold',
    future: 'bg-purple-500/20 border-purple-400/40 text-purple-300',
    special: 'bg-green-500/20 border-green-400/40 text-green-300',
  };

  const envelopeColors = {
    love: 'from-accent/80 to-accent',
    memory: 'from-gold/80 to-gold',
    future: 'from-purple-500/80 to-purple-500',
    special: 'from-green-500/80 to-green-500',
  };

  // Verificar se uma carta está disponível
  const isLetterAvailable = (letter: Letter): boolean => {
    if (!letter.availableAt) return true;
    if (!isClient) return false; // No servidor, assumir que não está disponível
    return currentTime >= new Date(letter.availableAt);
  };

  // Formatar data e hora de disponibilidade
  const formatAvailabilityTime = (letter: Letter): string => {
    if (!letter.availableAt) return '';
    const date = new Date(letter.availableAt);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}\ndia ${day}/${month}/${year}`;
  };

  // Calcular tempo restante até disponibilidade
  const getTimeUntilAvailable = (letter: Letter): string => {
    if (!letter.availableAt || !isClient) return '';
    const available = new Date(letter.availableAt);
    const diff = available.getTime() - currentTime.getTime();
    
    if (diff <= 0) return '';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const handleOpenLetter = (letter: Letter) => {
    // Verificar se a carta está disponível
    if (!isLetterAvailable(letter)) {
      return; // Não permitir abertura se não disponível
    }

    // Limpar animação anterior se existir
    if (typewriterInterval) {
      clearInterval(typewriterInterval);
      setTypewriterInterval(null);
    }

    // Bloquear scroll da página
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    setOpenLetter(letter);
    setIsTyping(true);
    setTypewriterText('');
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 100);

    // Typewriter effect
    let currentIndex = 0;
    const content = letter.content;
    const interval = setInterval(() => {
      if (currentIndex < content.length) {
        setTypewriterText(content.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
        setTypewriterInterval(null);
      }
    }, 50);

    setTypewriterInterval(interval);
  };

  const handleCloseLetter = () => {
    // Limpar animação se estiver rodando
    if (typewriterInterval) {
      clearInterval(typewriterInterval);
      setTypewriterInterval(null);
    }

    // Restaurar scroll da página
    document.body.style.overflow = 'unset';
    document.documentElement.style.overflow = 'unset';

    setOpenLetter(null);
    setTypewriterText('');
    setIsTyping(false);
  };

  return (
    <div className={cn('w-full', className)}>
        <FloatingHearts trigger={showHearts} count={15} size="lg" color="accent">
        {/* Title */}
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-bold mb-4 text-gradient use-inter" style={{fontFamily: '"Inter", sans-serif', fontSize: 'clamp(2.25rem, 5vw, 4.5rem)'}}>
              {title}
            </h2>
            <p className="text-white/70 text-lg md:text-xl">
              Mensagens escritas com o coração 💌
            </p>
          </motion.div>
        )}

        {/* Letters Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14 xl:gap-16 max-w-[1200px] mx-auto pt-8"
        >
          {letters.map((letter, index) => {
            const IconComponent = letterTypeIcons[letter.type];
            const available = isLetterAvailable(letter);
            const timeRemaining = getTimeUntilAvailable(letter);
            
            return (
              <motion.div
                key={letter.id}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Timer/Availability Info */}
                {letter.availableAt && (
                  <motion.div
                    className="absolute -top-8 left-0 right-0 z-10 text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className={cn(
                      "inline-block px-3 py-1 rounded-full text-xs font-medium",
                      "bg-black/40 backdrop-blur-sm border text-white",
                      available ? "border-green-400/50 text-green-300" : "border-orange-400/50 text-orange-300"
                    )}>
                      {available ? (
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          Disponível agora!
                        </span>
                      ) : (
                        <div className="whitespace-pre-line leading-tight">
                          <div className="font-mono text-orange-200">
                            disponível às 21:12:24
                          </div>
                          <div className="text-orange-300/80">
                            {formatAvailabilityTime(letter).split('\n')[1]}
                          </div>
                                                     {isClient && timeRemaining && (
                             <div className="text-orange-200 font-mono mt-1">
                               {timeRemaining}
                             </div>
                           )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Envelope */}
                <motion.div
                  onClick={() => handleOpenLetter(letter)}
                  className={cn(
                    "relative",
                    available ? "cursor-pointer" : "cursor-not-allowed"
                  )}
                  whileHover={available ? { 
                    scale: 1.05, 
                    rotateY: 5,
                    rotateX: 5,
                  } : {}}
                  whileTap={available ? { scale: 0.95 } : {}}
                  style={{ perspective: '1000px' }}
                >
                  {/* Envelope Body */}
                  <div className={cn(
                    'relative w-full h-44 md:h-48 lg:h-52 rounded-lg overflow-hidden',
                    'bg-gradient-to-br shadow-lg transition-all duration-300',
                    available ? 'group-hover:shadow-xl' : 'opacity-60 grayscale',
                    `bg-gradient-to-br ${envelopeColors[letter.type]}`
                  )}>
                    {/* Lock Overlay for unavailable letters */}
                    {!available && (
                      <div className="absolute inset-0 bg-black/50 z-10" />
                    )}

                    {/* Envelope Pattern */}
                    <div className="absolute inset-0 bg-white/5 background-pattern opacity-30" />
                    
                    {/* Envelope Flap */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-18 md:h-20 lg:h-24 bg-white/10 border-b border-white/20"
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      }}
                      animate={{
                        rotateX: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    

                    

                    
                    {/* Letter Preview */}
                    <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6 lg:p-8 text-center">
                      <h3 className="font-romantic text-xl md:text-2xl lg:text-3xl text-white font-semibold px-6 md:px-8 lg:px-10" style={{textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.6)'}}>
                        {letter.title}
                      </h3>
                    </div>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-8 h-8 md:w-10 md:h-10 text-gold text-2xl md:text-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center"
                    animate={{
                      y: [-10, 0, -10],
                      rotate: [0, 10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ✨
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Letter Modal */}
        <AnimatePresence>
          {openLetter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              onClick={handleCloseLetter}
            >
              
              {/* Letter Content */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  duration: 0.6 
                }}
                className="relative max-w-2xl max-h-[90vh] w-full overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                style={{ perspective: '1000px' }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-transparent backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-0"
                     style={{
                       background: 'rgba(255, 255, 255, 0.03)',
                       backdropFilter: 'blur(25px)',
                       WebkitBackdropFilter: 'blur(25px)',
                       border: '1px solid rgba(255, 255, 255, 0.05)',
                     }}>
                  {/* Letter Header */}
                  <div className={cn(
                    'p-6 border-b border-white/5'
                  )}
                       style={{
                         background: 'rgba(255, 255, 255, 0.02)',
                       }}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          'w-12 h-12 rounded-full flex items-center justify-center',
                          letterTypeColors[openLetter.type]
                        )}>
                          {React.createElement(letterTypeIcons[openLetter.type], { 
                            className: "w-6 h-6" 
                          })}
                        </div>
                        <div>
                          <h3 className="font-romantic text-2xl text-white font-semibold mb-1">
                            {openLetter.title}
                          </h3>
                          <p className="text-white/60 text-sm flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            {formatDate(openLetter.date)}
                          </p>
                        </div>
                      </div>
                      
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseLetter();
                        }}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 text-white hover:text-white border border-white/20 hover:border-white/40 group shadow-lg hover:shadow-xl"
                        title="Fechar carta (ESC)"
                        style={{ minWidth: '48px', minHeight: '48px' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <XMarkIcon className="w-7 h-7 group-hover:rotate-90 transition-transform duration-200" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Letter Content */}
                  <div className="p-8">
                    <div className="relative">
                      
                      {/* Letter Text */}
                      <div className="relative text-white/95 leading-relaxed p-6" style={{fontFamily: '"Poiret One", sans-serif', fontSize: '1.3rem'}}>
                        <motion.div
                          className="whitespace-pre-line"
                          style={{
                            fontFamily: "'Dancing Script', cursive",
                            fontSize: '1.1rem',
                            lineHeight: '1.8'
                          }}
                        >
                          {typewriterText}
                          {isTyping && (
                            <motion.span
                              className="inline-block w-0.5 h-6 bg-accent ml-1"
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ 
                                duration: 1, 
                                repeat: Infinity,
                                ease: "easeInOut" 
                              }}
                            />
                          )}
                        </motion.div>
                      </div>
                      
                      {/* Signature */}
                      <div className="text-right mt-8">
                        <p className="font-romantic text-xl text-accent">
                          Com todo meu amor,
                        </p>
                        <p className="font-romantic text-2xl text-gold mt-2">
                          Richard 💕
                        </p>
                        <p className="text-white/40 text-xs mt-4 font-light">
                          Clique fora da carta ou pressione ESC para fechar
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 text-gold/30 text-2xl">❀</div>
                  <div className="absolute top-8 right-8 text-accent/30 text-xl">♡</div>
                  <div className="absolute bottom-4 left-8 text-purple-300/30 text-lg">✿</div>
                  <div className="absolute bottom-8 right-4 text-green-300/30 text-xl">❋</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingHearts>
    </div>
  );
};

export default Letters; 