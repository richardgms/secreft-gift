// Tipos para o Sistema de Música
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  src: string;
  cover: string;
  duration: number;
  description?: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  isActive: boolean;
}

// Tipos para a Galeria
export interface Photo {
  id: string;
  src: string;
  alt: string;
  caption: string;
  date: string;
  location?: string;
  tags?: string[];
}

export interface GallerySection {
  id: string;
  title: string;
  photos: Photo[];
}

// Tipos para as Cartinhas
export interface Letter {
  id: string;
  type: 'love' | 'memory' | 'future' | 'special';
  title: string;
  content: string;
  date: string;
  envelope: {
    color: string;
    seal: string;
  };
  availableAt?: string; // Data e hora quando a carta estará disponível (formato ISO)
}

// Tipos para a Timeline
export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'meeting' | 'milestone' | 'travel' | 'special';
  icon: string;
  photos?: string[];
  location?: string;
}

// Tipos para o Player de Música
export interface PlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  currentPlaylist: Playlist | null;
  currentTime: number;
  volume: number;
  isShuffling: boolean;
  isRepeating: boolean;
}

// Tipos para Navegação
export interface NavigationSection {
  id: string;
  title: string;
  icon: string;
  href: string;
  isActive: boolean;
}

// Tipos para Configurações
export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  autoplay: boolean;
  showParticles: boolean;
  reducedMotion: boolean;
}

// Tipos para Animações
export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
}

// Tipos para Props de Componentes
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface GlassCardProps extends ComponentProps {
  blur?: 'sm' | 'md' | 'lg';
  opacity?: number;
  shadow?: boolean;
} 