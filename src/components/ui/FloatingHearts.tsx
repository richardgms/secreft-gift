'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ComponentProps } from '@/types';

interface FloatingHeartsProps extends ComponentProps {
  count?: number;
  duration?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'accent' | 'gold' | 'white';
  trigger?: boolean;
}

interface Heart {
  id: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({
  count = 6,
  duration = 3,
  size = 'md',
  color = 'accent',
  trigger = false,
  className,
  children
}) => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  const colorClasses = {
    accent: 'text-accent',
    gold: 'text-gold',
    white: 'text-white',
  };

  const generateHearts = () => {
    const newHearts: Heart[] = [];
    for (let i = 0; i < count; i++) {
      // Use deterministic pseudo-random values to avoid hydration mismatch
      const seed = i + 1;
      newHearts.push({
        id: `heart-${i}`,
        x: (seed * 23) % 100,
        y: (seed * 37) % 100,
        delay: (seed * 0.3) % 2,
        duration: duration + ((seed * 0.5) % 2),
        size: 0.8 + ((seed * 0.1) % 0.4),
      });
    }
    setHearts(newHearts);
    setIsVisible(true);

    // Hide hearts after animation
    setTimeout(() => {
      setIsVisible(false);
    }, (duration + 2) * 1000);
  };

  useEffect(() => {
    if (trigger) {
      generateHearts();
    }
  }, [trigger, count, duration]);

  return (
    <div className={cn('relative', className)}>
      {children}
      
      {isVisible && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className={cn(
                'absolute animate-float opacity-0',
                sizeClasses[size],
                colorClasses[color]
              )}
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                animationDelay: `${heart.delay}s`,
                animationDuration: `${heart.duration}s`,
                animationFillMode: 'forwards',
                transform: `scale(${heart.size})`,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full drop-shadow-sm"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloatingHearts; 