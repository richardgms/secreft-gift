'use client';

// Simple cache implementation
class SimpleCache {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }>;
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  set(key: string, data: any, ttl: number = 300000): void { // 5 minutes default
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  // Get cache stats
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Create global cache instances
export const imageCache = new SimpleCache(50);
export const dataCache = new SimpleCache(100);
export const apiCache = new SimpleCache(30);

// Cache utilities
export const cacheImage = (url: string, imageData: any) => {
  imageCache.set(url, imageData, 600000); // 10 minutes
};

export const getCachedImage = (url: string) => {
  return imageCache.get(url);
};

export const cacheApiResponse = (endpoint: string, data: any, ttl?: number) => {
  apiCache.set(endpoint, data, ttl);
};

export const getCachedApiResponse = (endpoint: string) => {
  return apiCache.get(endpoint);
};

// Local Storage utilities with compression
export const setLocalStorage = (key: string, data: any, compress: boolean = false) => {
  try {
    const serialized = JSON.stringify(data);
    const finalData = compress ? btoa(serialized) : serialized;
    localStorage.setItem(key, finalData);
  } catch (error) {
    console.warn('Failed to set localStorage:', error);
  }
};

export const getLocalStorage = (key: string, decompress: boolean = false) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    const data = decompress ? atob(item) : item;
    return JSON.parse(data);
  } catch (error) {
    console.warn('Failed to get localStorage:', error);
    return null;
  }
};

// Session Storage utilities
export const setSessionStorage = (key: string, data: any) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to set sessionStorage:', error);
  }
};

export const getSessionStorage = (key: string) => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn('Failed to get sessionStorage:', error);
    return null;
  }
};

// Image optimization utilities
export const optimizeImageUrl = (url: string, width?: number, height?: number, quality?: number) => {
  if (!url) return url;
  
  // For Next.js Image Optimization API (if using)
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  if (quality) params.append('q', quality.toString());
  
  const paramString = params.toString();
  return paramString ? `${url}?${paramString}` : url;
};

// Preload utilities
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (urls: string[]): Promise<void> => {
  const promises = urls.map(url => preloadImage(url));
  await Promise.allSettled(promises);
};

// Resource hints utilities
export const addResourceHint = (href: string, rel: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch', as?: string) => {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  if (as) link.as = as;
  
  document.head.appendChild(link);
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

// Throttle utility for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Performance timing utilities
export const measurePerformance = (name: string, fn: () => any) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

export const measureAsyncPerformance = async (name: string, fn: () => Promise<any>) => {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
}; 