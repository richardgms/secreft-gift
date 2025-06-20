'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LoadingDots } from './MicroInteractions';

// Intersection Observer Hook
export const useIntersectionObserver = (
  threshold: number = 0.1,
  rootMargin: string = '50px'
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      { threshold, rootMargin }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, hasIntersected]);

  return { targetRef, isIntersecting, hasIntersected };
};

// Lazy Image Component
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
  onLoad?: () => void;
  quality?: number;
  priority?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  placeholder,
  blurDataURL,
  onLoad,
  quality = 75,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { targetRef, hasIntersected } = useIntersectionObserver(0.1, '100px');

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
  };

  const shouldLoad = priority || hasIntersected;

  return (
    <div
      ref={targetRef}
      className={cn('relative overflow-hidden bg-gray-900/50', className)}
    >
      {/* Placeholder/Blur */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          {blurDataURL ? (
            <img
              src={blurDataURL}
              alt=""
              className="w-full h-full object-cover opacity-50 blur-sm scale-110"
            />
          ) : placeholder ? (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover opacity-30"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <LoadingDots size="md" color="white" />
            </div>
          )}
        </div>
      )}

      {/* Main Image */}
      {shouldLoad && !isError && (
        <motion.img
          src={src}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 1.05
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}

      {/* Error State */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="text-center text-white/60">
            <div className="text-4xl mb-2">📷</div>
            <p className="text-sm">Erro ao carregar imagem</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Lazy Section Component
interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  className,
  fallback,
  threshold = 0.1,
  rootMargin = '100px',
}) => {
  const { targetRef, hasIntersected } = useIntersectionObserver(threshold, rootMargin);

  return (
    <div ref={targetRef} className={className}>
      {hasIntersected ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      ) : (
        fallback || (
          <div className="flex items-center justify-center py-20">
            <LoadingDots size="lg" color="white" />
          </div>
        )
      )}
    </div>
  );
};

// Progressive Image Loading
interface ProgressiveImageProps {
  src: string;
  lowQualitySrc?: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  lowQualitySrc,
  alt,
  className,
  sizes,
}) => {
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);
  const [isLowQualityLoaded, setIsLowQualityLoaded] = useState(false);
  const { targetRef, hasIntersected } = useIntersectionObserver();

  // Create low quality version if not provided
  const lowQuality = lowQualitySrc || src.replace(/\.(jpg|jpeg|png|webp)$/i, '_low.$1');

  return (
    <div ref={targetRef} className={cn('relative overflow-hidden', className)}>
      {/* Low Quality Image */}
      {hasIntersected && (
        <img
          src={lowQuality}
          alt=""
          className={cn(
            'absolute inset-0 w-full h-full object-cover blur-sm scale-110 transition-opacity duration-300',
            isHighQualityLoaded ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={() => setIsLowQualityLoaded(true)}
        />
      )}

      {/* High Quality Image */}
      {hasIntersected && (
        <motion.img
          src={src}
          alt={alt}
          sizes={sizes}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            isHighQualityLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setIsHighQualityLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHighQualityLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Loading State */}
      {!isLowQualityLoaded && hasIntersected && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <LoadingDots size="md" color="white" />
        </div>
      )}
    </div>
  );
};

// Performance Monitor
export const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<{
    loadTime: number;
    domContentLoaded: number;
    firstPaint: number;
    firstContentfulPaint: number;
  } | null>(null);

  useEffect(() => {
    const getPerformanceMetrics = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.navigation;
        const timing = performance.timing;

        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;

        // Get paint metrics
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0;
        const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;

        setMetrics({
          loadTime: Math.round(loadTime),
          domContentLoaded: Math.round(domContentLoaded),
          firstPaint: Math.round(firstPaint),
          firstContentfulPaint: Math.round(firstContentfulPaint),
        });
      }
    };

    // Wait for load event
    if (document.readyState === 'complete') {
      getPerformanceMetrics();
    } else {
      window.addEventListener('load', getPerformanceMetrics);
    }

    return () => window.removeEventListener('load', getPerformanceMetrics);
  }, []);

  if (!metrics || process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed top-4 left-4 z-50 bg-black/80 backdrop-blur-sm text-white text-xs p-3 rounded-lg">
      <h4 className="font-semibold mb-2">Performance</h4>
      <div className="space-y-1">
        <div>Load: {metrics.loadTime}ms</div>
        <div>DOM: {metrics.domContentLoaded}ms</div>
        <div>FP: {metrics.firstPaint}ms</div>
        <div>FCP: {metrics.firstContentfulPaint}ms</div>
      </div>
    </div>
  );
};

// Bundle Size Monitor (Development only)
export const BundleSizeMonitor: React.FC = () => {
  const [bundleSize, setBundleSize] = useState<number | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    // Estimate bundle size based on document size
    const estimateSize = () => {
      const docSize = new Blob([document.documentElement.outerHTML]).size;
      setBundleSize(Math.round(docSize / 1024)); // KB
    };

    estimateSize();
  }, []);

  if (process.env.NODE_ENV === 'production' || !bundleSize) return null;

  return (
    <div className="fixed top-20 left-4 z-50 bg-black/80 backdrop-blur-sm text-white text-xs p-3 rounded-lg">
      <h4 className="font-semibold mb-1">Bundle Size</h4>
      <div className={bundleSize > 500 ? 'text-yellow-400' : 'text-green-400'}>
        ~{bundleSize}KB
      </div>
    </div>
  );
};

// Memory Usage Monitor
export const MemoryMonitor: React.FC = () => {
  const [memoryInfo, setMemoryInfo] = useState<{
    used: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;

    const updateMemoryInfo = () => {
      // @ts-ignore - performance.memory is a Chrome-specific API
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        if (memory && memory.usedJSHeapSize && memory.totalJSHeapSize) {
          setMemoryInfo({
            used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
            total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
          });
        }
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV === 'production' || !memoryInfo) return null;

  const usage = Math.round((memoryInfo.used / memoryInfo.total) * 100);

  return (
    <div className="fixed top-36 left-4 z-50 bg-black/80 backdrop-blur-sm text-white text-xs p-3 rounded-lg">
      <h4 className="font-semibold mb-1">Memory</h4>
      <div className={usage > 80 ? 'text-red-400' : usage > 60 ? 'text-yellow-400' : 'text-green-400'}>
        {memoryInfo.used}MB / {memoryInfo.total}MB ({usage}%)
      </div>
    </div>
  );
}; 