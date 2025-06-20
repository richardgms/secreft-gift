'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Registrar plugins GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Tipos para animações
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  toggleActions?: string;
}

// Animações de entrada
export const fadeInUp = (element: string | Element, config: AnimationConfig = {}) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: config.duration || 1,
      delay: config.delay || 0,
      ease: config.ease || 'power2.out',
      stagger: config.stagger || 0,
    }
  );
};

export const fadeInScale = (element: string | Element, config: AnimationConfig = {}) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.8,
      rotation: -5,
    },
    {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: config.duration || 0.8,
      delay: config.delay || 0,
      ease: config.ease || 'back.out(1.7)',
      stagger: config.stagger || 0,
    }
  );
};

export const slideInFromLeft = (element: string | Element, config: AnimationConfig = {}) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: -100,
    },
    {
      opacity: 1,
      x: 0,
      duration: config.duration || 1,
      delay: config.delay || 0,
      ease: config.ease || 'power3.out',
      stagger: config.stagger || 0,
    }
  );
};

export const slideInFromRight = (element: string | Element, config: AnimationConfig = {}) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: 100,
    },
    {
      opacity: 1,
      x: 0,
      duration: config.duration || 1,
      delay: config.delay || 0,
      ease: config.ease || 'power3.out',
      stagger: config.stagger || 0,
    }
  );
};

// Animações com scroll
export const parallaxScroll = (element: string | Element, config: ScrollAnimationConfig = {}) => {
  return gsap.to(element, {
    y: config.scrub === true ? '50%' : -50,
    ease: 'none',
    scrollTrigger: {
      trigger: config.trigger || element,
      start: config.start || 'top bottom',
      end: config.end || 'bottom top',
      scrub: config.scrub !== undefined ? config.scrub : true,
      toggleActions: config.toggleActions || 'play none none reverse',
    },
  });
};

export const fadeInOnScroll = (element: string | Element, config: ScrollAnimationConfig = {}) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: config.duration || 1,
      ease: config.ease || 'power2.out',
      stagger: config.stagger || 0,
      scrollTrigger: {
        trigger: config.trigger || element,
        start: config.start || 'top 80%',
        end: config.end || 'bottom 20%',
        toggleActions: config.toggleActions || 'play none none reverse',
      },
    }
  );
};

export const scaleOnScroll = (element: string | Element, config: ScrollAnimationConfig = {}) => {
  return gsap.fromTo(
    element,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: config.duration || 1.2,
      ease: config.ease || 'back.out(1.7)',
      scrollTrigger: {
        trigger: config.trigger || element,
        start: config.start || 'top 85%',
        toggleActions: config.toggleActions || 'play none none reverse',
      },
    }
  );
};

// Animações de texto
export const typewriterEffect = (element: string | Element, text: string, config: AnimationConfig = {}) => {
  return gsap.to(element, {
    text: text,
    duration: config.duration || text.length * 0.05,
    delay: config.delay || 0,
    ease: config.ease || 'none',
  });
};

export const splitTextReveal = (element: string | Element, config: AnimationConfig = {}) => {
  const chars = gsap.utils.toArray(`${element} .char`);
  return gsap.fromTo(
    chars,
    {
      opacity: 0,
      y: 50,
      rotation: 10,
    },
    {
      opacity: 1,
      y: 0,
      rotation: 0,
      duration: config.duration || 0.6,
      delay: config.delay || 0,
      ease: config.ease || 'back.out(1.7)',
      stagger: config.stagger || 0.05,
    }
  );
};

// Animações de hover
export const hoverScale = (element: string | Element, scale: number = 1.05) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const tl = gsap.timeline({ paused: true });
  tl.to(el, {
    scale: scale,
    duration: 0.3,
    ease: 'power2.out',
  });

  el.addEventListener('mouseenter', () => tl.play());
  el.addEventListener('mouseleave', () => tl.reverse());

  return tl;
};

export const hoverGlow = (element: string | Element) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const tl = gsap.timeline({ paused: true });
  tl.to(el, {
    boxShadow: '0 0 30px rgba(233, 69, 96, 0.5)',
    duration: 0.3,
    ease: 'power2.out',
  });

  el.addEventListener('mouseenter', () => tl.play());
  el.addEventListener('mouseleave', () => tl.reverse());

  return tl;
};

// Animações de loading
export const pulseAnimation = (element: string | Element, config: AnimationConfig = {}) => {
  return gsap.to(element, {
    scale: 1.1,
    opacity: 0.8,
    duration: config.duration || 1,
    ease: config.ease || 'power2.inOut',
    repeat: -1,
    yoyo: true,
  });
};

export const floatingAnimation = (element: string | Element, config: AnimationConfig = {}) => {
  return gsap.to(element, {
    y: -10,
    duration: config.duration || 2,
    ease: config.ease || 'power2.inOut',
    repeat: -1,
    yoyo: true,
  });
};

// Animação de partículas
export const particlesAnimation = (container: string | Element, particleCount: number = 20) => {
  const containerEl = typeof container === 'string' ? document.querySelector(container) : container;
  if (!containerEl) return;

  const particles: HTMLElement[] = [];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle absolute w-1 h-1 bg-gold rounded-full opacity-30';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    containerEl.appendChild(particle);
    particles.push(particle);
  }

  const tl = gsap.timeline({ repeat: -1 });
  
  particles.forEach((particle, index) => {
    tl.to(particle, {
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 3 + 2,
      ease: 'none',
    }, index * 0.1);
  });

  return tl;
};

// Cleanup function
export const killAllAnimations = () => {
  gsap.killTweensOf('*');
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// Refresh ScrollTrigger (útil para componentes dinâmicos)
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
}; 