'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { GlassCardProps } from '@/types';
import { useGSAP } from '@/hooks/useGSAP';

interface ExtendedGlassCardProps extends GlassCardProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  glow?: boolean;
  shimmer?: boolean;
  tilt?: boolean;
  parallax?: boolean;
  onClick?: () => void;
  onHover?: () => void;
}

const GlassCard: React.FC<ExtendedGlassCardProps> = ({
  children,
  className,
  blur = 'md',
  opacity = 0.1,
  shadow = true,
  variant = 'primary',
  size = 'md',
  hover = false,
  glow = false,
  shimmer = false,
  tilt = false,
  parallax = false,
  onClick,
  onHover,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { animateHoverScale, animateHoverGlow, animateFloating } = useGSAP();

  useEffect(() => {
    if (!cardRef.current) return;

    // Efeitos de hover avançados
    if (hover) {
      animateHoverScale(cardRef.current, 1.03);
    }

    if (glow) {
      animateHoverGlow(cardRef.current);
    }

    if (parallax) {
      animateFloating(cardRef.current, { duration: 3 });
    }

    // Efeito de tilt 3D
    if (tilt) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!cardRef.current) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      };

      const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      };

      cardRef.current.addEventListener('mousemove', handleMouseMove);
      cardRef.current.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        if (cardRef.current) {
          cardRef.current.removeEventListener('mousemove', handleMouseMove);
          cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }
  }, [hover, glow, parallax, tilt, animateHoverScale, animateHoverGlow, animateFloating]);

  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  const sizeClasses = {
    sm: 'p-3 rounded-lg text-sm',
    md: 'p-6 rounded-xl',
    lg: 'p-8 rounded-2xl text-lg',
    xl: 'p-12 rounded-3xl text-xl',
  };

  const variantClasses = {
    primary: 'border-white/20 bg-white/10',
    secondary: 'border-glass-dark/30 bg-glass-dark/20',
    accent: 'border-accent/30 bg-accent/10',
    gold: 'border-gold/30 bg-gold/10',
  };

  const baseClasses = cn(
    // Base styling
    'border transition-all duration-300 ease-out relative overflow-hidden',
    // Glass effect
    blurClasses[blur],
    // Size
    sizeClasses[size],
    // Variant
    variantClasses[variant],
    // Shadow
    shadow && 'shadow-glass',
    // Hover effect
    hover && 'hover:shadow-xl hover:bg-white/15 cursor-pointer',
    // Glow effect
    glow && 'hover:shadow-neon',
    // Shimmer effect
    shimmer && 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000',
    // Tilt effect
    tilt && 'transform-gpu transition-transform duration-200 ease-out',
    // Custom classes
    className
  );

  const handleClick = () => {
    if (onClick) onClick();
  };

  const handleMouseEnter = () => {
    if (onHover) onHover();
  };

  return (
    <div
      ref={cardRef}
      className={baseClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
      }}
      {...props}
    >
      {/* Shimmer overlay */}
      {shimmer && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
      )}
      
      {/* Conteúdo */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard; 