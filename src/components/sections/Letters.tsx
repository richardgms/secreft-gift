'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon,
  CalendarIcon,
  SparklesIcon,
  ClockIcon,
  StarIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { cn, formatDate } from '@/lib/utils';
import { GlassCard, FloatingHearts } from '@/components/ui';
import { Letter } from '@/types';
import { Howler } from 'howler';

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

  // Refs de áudio para cartinhas com áudio
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Guardar volume anterior do player para restaurar depois
  const previousPlayerVolumeRef = useRef<number | null>(null);

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

  // Tocar ou parar áudio quando openLetter mudar
  useEffect(() => {
    // Se já existe áudio tocando, parar
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    // Se há carta aberta, toca áudio correspondente e ajusta volume do player
    if (openLetter) {
      // Reduzir volume do player (Howler) para 24% (20% a menos que antes), preservando valor anterior
      previousPlayerVolumeRef.current = Howler.volume();
      Howler.volume(0.24);

      // Garantir que a música de fundo volte a tocar caso esteja pausada
      // Percorre todos os Howl carregados e ativa play se não estiver tocando
      // (útil quando o usuário pausou manualmente)
      // @ts-ignore A propriedade _howls é interna, mas usamos aqui conscientemente
      (Howler as any)._howls?.forEach((h: any) => {
        try {
          if (!h.playing()) {
            h.play();
          }
        } catch (_) {/* ignore errors */}
      });

      // Tentar carregar áudio da pasta audios-cartinhas usando o id da carta
      // Se for as cartas 2, 3 ou 4, usar extensão .wav; caso contrário, .m4a
      const extension = (openLetter.id === '2' || openLetter.id === '3' || openLetter.id === '4') ? '.wav' : '.m4a';
      const audioSrc = `/images/audios-cartinhas/cartinha${openLetter.id}${extension}`;
      const audio = new Audio(audioSrc);
      audioRef.current = audio;
      // Reproduzir (ignorar possíveis restrições de autoplay em dev)
      audio.play().catch(() => {/* autoplay restrictions ignored */});
    }

    // Limpeza quando componente desmontar ou carta fechar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }

      // Restaurar volume original do player se alterado
      if (previousPlayerVolumeRef.current !== null) {
        Howler.volume(previousPlayerVolumeRef.current);
        previousPlayerVolumeRef.current = null;
      }
    };
  }, [openLetter]);

  const letterTypeIcons = {
    love: HeartSolid,
    memory: StarIcon,
    future: SparklesIcon,
    special: ClockIcon,
  };

  const letterTypeColors = {
    love: 'bg-rose-300/20 border-rose-300/40 text-rose-300',
    memory: 'bg-amber-200/20 border-amber-200/40 text-amber-200',
    future: 'bg-blue-200/20 border-blue-200/40 text-blue-200',
    special: 'bg-emerald-200/20 border-emerald-200/40 text-emerald-200',
  };

  const envelopeColors = {
    love: 'from-rose-300/80 to-rose-400',
    memory: 'from-amber-200/80 to-amber-300',
    future: 'from-blue-200/80 to-blue-300',
    special: 'from-emerald-200/80 to-emerald-300',
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
    // Velocidade dinâmica: carta 2 10% mais lenta
    const baseDelay = 65;
    let typingDelay = baseDelay;
    if (letter.id === '2') {
      typingDelay = Math.round(baseDelay * 1.1); // 10% mais lento
    } else if (letter.id === '3') {
      typingDelay = Math.round(baseDelay * 0.95); // 5% mais rápido
    } else if (letter.id === '4') {
      typingDelay = Math.round(baseDelay * 1.05); // 5% mais lento
    }

    const interval = setInterval(() => {
      if (currentIndex < content.length) {
        setTypewriterText(content.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
        setTypewriterInterval(null);
      }
    }, typingDelay);

    setTypewriterInterval(interval);
  };

  const handleCloseLetter = () => {
    // Limpar animação se estiver rodando
    if (typewriterInterval) {
      clearInterval(typewriterInterval);
      setTypewriterInterval(null);
    }

    // Parar áudio se estiver tocando
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
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
            <h2 className="font-bold mb-4 bg-gradient-to-r from-[#bae6fd] via-[#8ED4FF] to-[#38bdf8] bg-clip-text text-transparent use-inter" style={{fontFamily: '"Inter", sans-serif', fontSize: 'clamp(2.25rem, 5vw, 4.5rem)'}}>
              {title}
            </h2>
            <p className="text-white/70 text-lg md:text-xl">
              Mensagens escritas com o coração 💌
            </p>
          </motion.div>
        )}

        {/* Letters Grid - Mobile: Uma embaixo da outra | Desktop: Como número 4 de dado */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-full max-w-[400px] md:max-w-[900px] mx-auto pt-8 pb-16 md:pb-20 
                     flex flex-col items-center gap-20 p-4
                     md:grid md:grid-cols-2 md:grid-rows-3 md:gap-x-8 md:gap-y-20 md:p-16 md:min-h-[600px] lg:min-h-[700px]"
        >
          {letters.slice(0, 4).map((letter, index) => {
            const IconComponent = letterTypeIcons[letter.type];
            const available = isLetterAvailable(letter);
            const timeRemaining = getTimeUntilAvailable(letter);
            
            // Posições específicas para cada carta
            // Mobile: sem posições (usa flex)
            // Desktop: como número 4 de dado (4 cantos no grid)
            const positions = [
              'md:justify-self-start md:self-start',  // Desktop: Canto superior esquerdo
              'md:justify-self-end md:self-start',    // Desktop: Canto superior direito
              'md:justify-self-start md:self-end',    // Desktop: Canto inferior esquerdo
              'md:justify-self-end md:self-end'       // Desktop: Canto inferior direito
            ];
            
            return (
              <motion.div
                key={letter.id}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative group w-full max-w-[280px] md:max-w-[200px] lg:max-w-[250px] ${positions[index] || ''}`}
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
                    'relative w-full h-44 md:h-40 lg:h-44 rounded-lg overflow-hidden',
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
                      className="absolute top-0 left-0 right-0 h-14 md:h-16 lg:h-18 bg-white/10 border-b border-white/20"
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
                      <h3 className="font-romantic text-xl md:text-xl lg:text-2xl text-white font-semibold px-4 md:px-6 lg:px-8" style={{textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.6)'}}>
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
                    {letter.envelope.seal}
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
                            <HeartIcon className="w-4 h-4" />
                            Escrita com muito amor
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
                        <p className="font-romantic text-xl text-white">
                          Com todo meu amor,
                        </p>
                        <p className="font-romantic text-2xl text-gold mt-2">
                          Richard 🐧
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