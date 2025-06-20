'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartIcon, 
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

  const handleOpenLetter = (letter: Letter) => {
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
      }
    }, 50);
  };

  const handleCloseLetter = () => {
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
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 text-gradient">
              {title}
            </h2>
            <p className="text-white/70 text-lg">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {letters.map((letter, index) => {
            const IconComponent = letterTypeIcons[letter.type];
            
            return (
              <motion.div
                key={letter.id}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Envelope */}
                <motion.div
                  onClick={() => handleOpenLetter(letter)}
                  className="relative cursor-pointer"
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    rotateX: 5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ perspective: '1000px' }}
                >
                  {/* Envelope Body */}
                  <div className={cn(
                    'relative w-full h-48 rounded-lg overflow-hidden',
                    'bg-gradient-to-br shadow-lg group-hover:shadow-xl transition-all duration-300',
                    `bg-gradient-to-br ${envelopeColors[letter.type]}`
                  )}>
                    {/* Envelope Pattern */}
                    <div className="absolute inset-0 bg-white/5 background-pattern opacity-30" />
                    
                    {/* Envelope Flap */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-24 bg-white/10 border-b border-white/20"
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
                    
                    {/* Letter Type Icon */}
                    <div className="absolute top-4 right-4">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        letterTypeColors[letter.type]
                      )}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>
                    
                    {/* Seal */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                      <motion.div
                        className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <HeartSolid className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                    
                    {/* Letter Preview */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <h3 className="font-romantic text-lg text-white mb-1 font-semibold">
                        {letter.title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {formatDate(letter.date)}
                      </p>
                    </div>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 text-gold opacity-0 group-hover:opacity-100"
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={handleCloseLetter}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
              
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
                <GlassCard className="relative overflow-hidden">
                  {/* Letter Header */}
                  <div className={cn(
                    'p-6 border-b border-white/10',
                    `bg-gradient-to-r ${envelopeColors[openLetter.type]}/20`
                  )}>
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
                      
                      <button
                        onClick={handleCloseLetter}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                      >
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Letter Content */}
                  <div className="p-8">
                    <div className="relative">
                      {/* Paper Texture */}
                      <div className="absolute inset-0 bg-white/5 rounded-lg" />
                      
                      {/* Letter Text */}
                      <div className="relative font-body text-white/90 leading-relaxed text-lg p-6">
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
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 text-gold/30 text-2xl">❀</div>
                  <div className="absolute top-8 right-8 text-accent/30 text-xl">♡</div>
                  <div className="absolute bottom-4 left-8 text-purple-300/30 text-lg">✿</div>
                  <div className="absolute bottom-8 right-4 text-green-300/30 text-xl">❋</div>
                </GlassCard>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingHearts>
    </div>
  );
};

export default Letters; 