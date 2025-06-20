'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useGSAP } from '@/hooks/useGSAP';

// Botão com efeito de ondulação
interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const { animateHoverScale } = useGSAP();

  useEffect(() => {
    if (buttonRef.current && !disabled) {
      animateHoverScale(buttonRef.current, 1.05);
    }
  }, [animateHoverScale, disabled]);

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Math.random() * 1000000,
      x: x - 10,
      y: y - 10,
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple após animação
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) onClick();
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-accent to-gold text-white',
    secondary: 'bg-glass backdrop-blur-md border border-white/20 text-white',
    accent: 'bg-accent text-white',
    gold: 'bg-gold text-primary',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        'relative overflow-hidden rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50',
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={createRipple}
      disabled={disabled}
    >
      {children}
      
      {/* Ripples */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </button>
  );
};

// Indicador de loading com animação
interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({
  size = 'md',
  color = 'currentColor',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn('rounded-full', sizeClasses[size])}
          style={{ backgroundColor: color }}
          animate={{
            y: [-8, 0, -8],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  );
};

// Tooltip animado
interface AnimatedTooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  children,
  content,
  position = 'top',
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-800',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-800',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-800',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-800',
  };

  return (
    <div 
      className={cn('relative inline-block', className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          'absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg whitespace-nowrap pointer-events-none',
          positionClasses[position]
        )}
      >
        {content}
        <div 
          className={cn('absolute w-0 h-0 border-4', arrowClasses[position])} 
        />
      </motion.div>
    </div>
  );
};

// Badge com animação de pulso
interface PulseBadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
}

export const PulseBadge: React.FC<PulseBadgeProps> = ({
  children,
  variant = 'info',
  size = 'md',
  pulse = true,
  className,
}) => {
  const variantClasses = {
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30',
    info: 'bg-accent/20 text-accent border-accent/30',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <motion.span
      className={cn(
        'inline-flex items-center rounded-full border backdrop-blur-sm font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      animate={pulse ? { scale: [1, 1.05, 1] } : {}}
      transition={pulse ? { duration: 2, repeat: Infinity } : {}}
    >
      {children}
    </motion.span>
  );
};

// Card com efeito flip
interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  trigger?: 'hover' | 'click';
}

export const FlipCard: React.FC<FlipCardProps> = ({
  frontContent,
  backContent,
  className,
  trigger = 'hover',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleInteraction = () => {
    if (trigger === 'click') {
      setIsFlipped(!isFlipped);
    }
  };

  const handleHover = (hover: boolean) => {
    if (trigger === 'hover') {
      setIsFlipped(hover);
    }
  };

  return (
    <div 
      className={cn('relative w-full h-full perspective-1000', className)}
      onClick={handleInteraction}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-600 transform-style-preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          {frontContent}
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          {backContent}
        </div>
      </motion.div>
    </div>
  );
};

// Contador animado
interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  start = 0,
  duration = 2,
  className,
  prefix = '',
  suffix = '',
}) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const { animateTypewriter } = useGSAP();

  useEffect(() => {
    if (!counterRef.current) return;

    let current = start;
    const increment = (end - start) / (duration * 60); // 60 FPS
    
    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        current = end;
        clearInterval(timer);
      }
      if (counterRef.current) {
        counterRef.current.textContent = `${prefix}${Math.floor(current)}${suffix}`;
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [start, end, duration, prefix, suffix]);

  return (
    <span
      ref={counterRef}
      className={className}
    >
      {prefix}{start}{suffix}
    </span>
  );
}; 