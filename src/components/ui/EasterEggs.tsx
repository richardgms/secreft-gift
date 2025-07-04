'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Konami Code Easter Egg
export const KonamiCode: React.FC<{ onActivate: () => void }> = ({ onActivate }) => {
  const [sequence, setSequence] = useState<string[]>([]);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setSequence(prev => {
        const newSequence = [...prev, event.code];
        if (newSequence.length > konamiCode.length) {
          newSequence.shift();
        }
        
        if (newSequence.length === konamiCode.length && 
            newSequence.every((key, index) => key === konamiCode[index])) {
          onActivate();
          return [];
        }
        
        return newSequence;
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [onActivate, konamiCode]);

  return null;
};

// Floating Hearts que aparecem ao clicar
interface SecretHeartsProps {
  trigger: boolean;
  onComplete: () => void;
}

export const SecretHearts: React.FC<SecretHeartsProps> = ({ trigger, onComplete }) => {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (trigger) {
      const newHearts = Array.from({ length: 20 }, (_, i) => ({
        id: i,
                  x: (i * 123) % (typeof window !== 'undefined' ? window.innerWidth : 1200),
          y: (i * 456) % (typeof window !== 'undefined' ? window.innerHeight : 800),
      }));
      
      setHearts(newHearts);
      
      setTimeout(() => {
        setHearts([]);
        onComplete();
      }, 3000);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="fixed z-50 pointer-events-none text-4xl"
          initial={{ x: heart.x, y: heart.y, scale: 0, opacity: 0 }}
          animate={{ 
            y: heart.y - 200, 
            scale: [0, 1.2, 1], 
            opacity: [0, 1, 0],
            rotate: [0, 360]
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          💕
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

// Cursor personalizado com coração
export const HeartCursor: React.FC<{ active: boolean }> = ({ active }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (!active || typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, [active]);

  if (!active) return null;

  return (
    <motion.div
      className="fixed z-50 pointer-events-none text-2xl"
      style={{ left: position.x - 12, top: position.y - 12 }}
      animate={{ scale: isClicking ? 1.5 : 1 }}
      transition={{ duration: 0.1 }}
    >
      💖
    </motion.div>
  );
};

// Mensagem secreta que aparece
interface SecretMessageProps {
  show: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export const SecretMessage: React.FC<SecretMessageProps> = ({ show, onClose, title, message }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gradient-to-r from-accent to-gold p-8 rounded-2xl max-w-md mx-4 text-center text-white shadow-neon"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-2xl mb-4">✨ {title} ✨</h3>
            <p className="text-white/90 mb-6 leading-relaxed">{message}</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-300"
            >
              Fechar 💕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Click counter easter egg
export const ClickCounter: React.FC = () => {
  const [clicks, setClicks] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = () => {
      setClicks(prev => prev + 1);
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, []);

  useEffect(() => {
    if (clicks === 100) {
      setShowMessage(true);
    }
  }, [clicks]);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed bottom-4 right-4 z-40 text-xs text-white/30 pointer-events-none"
      >
        {clicks > 50 && `Clicks: ${clicks}/100 💕`}
      </div>

      <SecretMessage
        show={showMessage}
        onClose={() => setShowMessage(false)}
        title="Parabéns!"
        message="Você clicou 100 vezes! Isso mostra o quanto você está explorando nosso museu especial. Eu te amo muito! 🐧"
      />
    </>
  );
};

// Time-based easter egg
export const TimeBasedSurprise: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasShown) return;

    const timer = setTimeout(() => {
      setShowMessage(true);
      setHasShown(true);
    }, 60000); // 1 minuto

    return () => clearTimeout(timer);
  }, [hasShown]);

  return (
    <SecretMessage
      show={showMessage}
      onClose={() => setShowMessage(false)}
      title="Obrigado por ficar!"
      message="Você já está explorando nosso museu há um tempinho... Isso significa muito para nós! Cada momento que você passa aqui é especial. 🥰"
    />
  );
};

// Date-based messages
export const DateBasedMessages: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const month = now.getMonth();
    const day = now.getDate();

    // Mensagens baseadas no horário
    if (hour >= 5 && hour < 12) {
      setTitle('Bom dia!');
      setMessage('Que bom começar o dia visitando nosso museu especial! ☀️');
    } else if (hour >= 12 && hour < 18) {
      setTitle('Boa tarde!');
      setMessage('Uma tarde perfeita para relembrar nossos momentos especiais! 🌅');
    } else if (hour >= 18 && hour < 22) {
      setTitle('Boa noite!');
      setMessage('As noites são sempre mais especiais quando pensamos um no outro! 🌙');
    } else {
      setTitle('Boa madrugada!');
      setMessage('Mesmo na madrugada, nosso amor brilha como as estrelas! ✨');
    }

    // Mensagens especiais em datas
    if (month === 1 && day === 14) { // Valentine's Day
      setTitle('Feliz Dia dos Namorados!');
      setMessage('Em um dia tão especial como hoje, nosso amor brilha ainda mais forte! 💕');
    }

    // Mostrar após 3 segundos
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SecretMessage
      show={showMessage}
      onClose={() => setShowMessage(false)}
      title={title}
      message={message}
    />
  );
};

// Scroll-based surprise
export const ScrollSurprise: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (hasTriggered) return;

    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      
      const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage > 80) {
        setShowMessage(true);
        setHasTriggered(true);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [hasTriggered]);

  return (
    <SecretMessage
      show={showMessage}
      onClose={() => setShowMessage(false)}
      title="Explorador!"
      message="Você chegou quase no final do nosso museu! Obrigado por explorar cada cantinho com tanto carinho. 🗺️✨"
    />
  );
}; 