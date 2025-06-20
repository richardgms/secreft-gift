'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  fadeInUp, 
  fadeInScale, 
  slideInFromLeft, 
  slideInFromRight,
  parallaxScroll, 
  fadeInOnScroll, 
  scaleOnScroll,
  typewriterEffect,
  hoverScale,
  hoverGlow,
  floatingAnimation,
  particlesAnimation,
  AnimationConfig,
  ScrollAnimationConfig 
} from '@/lib/animations';

// Registrar plugins GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAP = () => {
  const animationsRef = useRef<(gsap.core.Timeline | gsap.core.Tween)[]>([]);

  // Limpar animações ao desmontar componente
  useEffect(() => {
    return () => {
      animationsRef.current.forEach(animation => {
        if (animation) animation.kill();
      });
      animationsRef.current = [];
    };
  }, []);

  // Função para adicionar animação ao controle
  const addAnimation = useCallback((animation: gsap.core.Timeline | gsap.core.Tween | undefined) => {
    if (animation) {
      animationsRef.current.push(animation);
    }
    return animation;
  }, []);

  // Animações de entrada
  const animateFadeInUp = useCallback((element: string | Element, config?: AnimationConfig) => {
    return addAnimation(fadeInUp(element, config));
  }, [addAnimation]);

  const animateFadeInScale = useCallback((element: string | Element, config?: AnimationConfig) => {
    return addAnimation(fadeInScale(element, config));
  }, [addAnimation]);

  const animateSlideInFromLeft = useCallback((element: string | Element, config?: AnimationConfig) => {
    return addAnimation(slideInFromLeft(element, config));
  }, [addAnimation]);

  const animateSlideInFromRight = useCallback((element: string | Element, config?: AnimationConfig) => {
    return addAnimation(slideInFromRight(element, config));
  }, [addAnimation]);

  // Animações com scroll
  const animateParallax = useCallback((element: string | Element, config?: ScrollAnimationConfig) => {
    return addAnimation(parallaxScroll(element, config));
  }, [addAnimation]);

  const animateFadeInOnScroll = useCallback((element: string | Element, config?: ScrollAnimationConfig) => {
    return addAnimation(fadeInOnScroll(element, config));
  }, [addAnimation]);

  const animateScaleOnScroll = useCallback((element: string | Element, config?: ScrollAnimationConfig) => {
    return addAnimation(scaleOnScroll(element, config));
  }, [addAnimation]);

  // Animações de texto
  const animateTypewriter = useCallback((element: string | Element, text: string, config?: AnimationConfig) => {
    return addAnimation(typewriterEffect(element, text, config));
  }, [addAnimation]);

  // Animações interativas
  const animateHoverScale = useCallback((element: string | Element, scale?: number) => {
    return hoverScale(element, scale);
  }, []);

  const animateHoverGlow = useCallback((element: string | Element) => {
    return hoverGlow(element);
  }, []);

  // Animações contínuas
  const animateFloating = useCallback((element: string | Element, config?: AnimationConfig) => {
    return addAnimation(floatingAnimation(element, config));
  }, [addAnimation]);

  const animateParticles = useCallback((container: string | Element, particleCount?: number) => {
    return addAnimation(particlesAnimation(container, particleCount));
  }, [addAnimation]);

  // Função para criar timeline customizada
  const createTimeline = useCallback((config?: gsap.TimelineVars) => {
    const tl = gsap.timeline(config);
    addAnimation(tl);
    return tl;
  }, [addAnimation]);

  // Função para animar múltiplos elementos com stagger
  const animateStagger = useCallback((elements: string, config: AnimationConfig & { 
    animation: 'fadeInUp' | 'fadeInScale' | 'slideInFromLeft' | 'slideInFromRight' 
  }) => {
    const { animation, ...animConfig } = config;
    
    switch (animation) {
      case 'fadeInUp':
        return animateFadeInUp(elements, { ...animConfig, stagger: 0.1 });
      case 'fadeInScale':
        return animateFadeInScale(elements, { ...animConfig, stagger: 0.1 });
      case 'slideInFromLeft':
        return animateSlideInFromLeft(elements, { ...animConfig, stagger: 0.1 });
      case 'slideInFromRight':
        return animateSlideInFromRight(elements, { ...animConfig, stagger: 0.1 });
      default:
        return animateFadeInUp(elements, { ...animConfig, stagger: 0.1 });
    }
  }, [animateFadeInUp, animateFadeInScale, animateSlideInFromLeft, animateSlideInFromRight]);

  // Função para refresh do ScrollTrigger
  const refreshScrollTrigger = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  // Função para pausar/resumir todas as animações
  const pauseAllAnimations = useCallback(() => {
    animationsRef.current.forEach(animation => {
      if (animation) animation.pause();
    });
  }, []);

  const resumeAllAnimations = useCallback(() => {
    animationsRef.current.forEach(animation => {
      if (animation) animation.resume();
    });
  }, []);

  return {
    // Animações básicas
    animateFadeInUp,
    animateFadeInScale,
    animateSlideInFromLeft,
    animateSlideInFromRight,
    
    // Animações com scroll
    animateParallax,
    animateFadeInOnScroll,
    animateScaleOnScroll,
    
    // Animações de texto
    animateTypewriter,
    
    // Animações interativas
    animateHoverScale,
    animateHoverGlow,
    
    // Animações contínuas
    animateFloating,
    animateParticles,
    
    // Utilitários
    createTimeline,
    animateStagger,
    refreshScrollTrigger,
    pauseAllAnimations,
    resumeAllAnimations,
    
    // Referência das animações (para controle manual)
    animations: animationsRef.current,
  };
}; 