'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartIcon, 
  PhotoIcon, 
  EnvelopeIcon, 
  ClockIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui';
import { NavigationSection } from '@/types';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const navigationSections: NavigationSection[] = [
  {
    id: 'home',
    title: 'Início',
    icon: 'home',
    href: '#home',
    isActive: false,
  },
  {
    id: 'gallery',
    title: 'Galeria',
    icon: 'photo',
    href: '#gallery',
    isActive: false,
  },
  {
    id: 'letters',
    title: 'Cartinhas',
    icon: 'envelope',
    href: '#letters',
    isActive: false,
  },
  {
    id: 'timeline',
    title: 'Timeline',
    icon: 'clock',
    href: '#timeline',
    isActive: false,
  },
];

const iconMap = {
  home: HomeIcon,
  photo: PhotoIcon,
  envelope: EnvelopeIcon,
  clock: ClockIcon,
  heart: HeartIcon,
};

const Navigation: React.FC<NavigationProps> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      {/* Navigation Desktop */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300',
          'hidden lg:block'
        )}
      >
        <GlassCard
          className={cn(
            'px-6 py-3 transition-all duration-300',
            scrolled ? 'shadow-2xl' : 'shadow-glass'
          )}
          blur="lg"
          opacity={scrolled ? 0.15 : 0.1}
        >
          <div className="flex items-center gap-8">
            {navigationSections.map((section) => {
              const IconComponent = iconMap[section.icon as keyof typeof iconMap];
              const isActive = activeSection === section.id;
              
              return (
                <motion.button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={cn(
                    'flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300',
                    'hover:bg-white/10 hover:scale-105',
                    isActive && 'bg-accent/20 text-accent'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-xs font-medium">{section.title}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-1 h-1 bg-accent rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </GlassCard>
      </motion.nav>

      {/* Navigation Mobile */}
      <div className="lg:hidden">
        {/* Menu Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cn(
            'fixed top-4 right-4 z-50 p-3 rounded-full',
            'bg-accent/20 backdrop-blur-md border border-white/20',
            'hover:bg-accent/30 transition-all duration-300'
          )}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                exit={{ rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 180 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <Bars3Icon className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />
              
              {/* Menu */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-64 z-40"
              >
                <GlassCard className="h-full rounded-none rounded-l-2xl p-6 pt-20">
                  <div className="space-y-4">
                    {navigationSections.map((section, index) => {
                      const IconComponent = iconMap[section.icon as keyof typeof iconMap];
                      const isActive = activeSection === section.id;
                      
                      return (
                        <motion.button
                          key={section.id}
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleSectionClick(section.id)}
                          className={cn(
                            'w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-300',
                            'hover:bg-white/10 text-left',
                            isActive && 'bg-accent/20 text-accent'
                          )}
                        >
                          <IconComponent className="w-6 h-6" />
                          <span className="font-medium">{section.title}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </GlassCard>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navigation; 