'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useGSAP } from '@/hooks/useGSAP';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  trigger?: string;
  backgroundImage?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  id?: string;
  'data-section'?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className,
  speed = 0.5,
  direction = 'up',
  trigger,
  backgroundImage,
  overlay = true,
  overlayOpacity = 0.4,
  id,
  'data-section': dataSection,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { animateParallax, animateFadeInOnScroll } = useGSAP();

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Animação parallax para o background
    if (backgroundRef.current) {
      const parallaxY = direction === 'up' ? -50 * speed : 50 * speed;
      const parallaxX = direction === 'left' ? -50 * speed : direction === 'right' ? 50 * speed : 0;

      animateParallax(backgroundRef.current, {
        trigger: trigger || sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      });
    }

    // Animação de fade in para o conteúdo
    animateFadeInOnScroll(contentRef.current, {
      trigger: trigger || sectionRef.current,
      start: 'top 80%',
      duration: 1.2,
    });
  }, [animateParallax, animateFadeInOnScroll, speed, direction, trigger]);

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${-50 * speed}px)`;
      case 'down':
        return `translateY(${50 * speed}px)`;
      case 'left':
        return `translateX(${-50 * speed}px)`;
      case 'right':
        return `translateX(${50 * speed}px)`;
      default:
        return 'none';
    }
  };

  return (
    <div
      ref={sectionRef}
      id={id}
      data-section={dataSection}
      className={cn('relative overflow-hidden', className)}
    >
      {/* Background com parallax */}
      {backgroundImage && (
        <div
          ref={backgroundRef}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: getTransform(),
          }}
        >
          {overlay && (
            <div
              className="absolute inset-0 bg-gradient-to-b from-primary/60 via-secondary/40 to-primary/80"
              style={{ opacity: overlayOpacity }}
            />
          )}
        </div>
      )}

      {/* Conteúdo */}
      <div
        ref={contentRef}
        className="relative z-10"
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection; 