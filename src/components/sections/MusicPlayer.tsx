'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl, Howler } from 'howler';
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsRightLeftIcon,
  ArrowPathIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { cn, formatTime, shuffleArray } from '@/lib/utils';
import { GlassCard } from '@/components/ui';
import { Track, Playlist, PlayerState } from '@/types';

interface MusicPlayerProps {
  playlist: Playlist;
  className?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ playlist, className }) => {
  // Configure Howler globally
  React.useEffect(() => {
    // Set global Howler settings
    Howler.html5PoolSize = 5; // Limit HTML5 audio pool
    Howler.autoUnlock = true; // Auto-unlock audio on user interaction
    
    return () => {
      // Cleanup all sounds on unmount
      Howler.unload();
    };
  }, []);

  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTrack: playlist.tracks[0] || null,
    currentPlaylist: playlist,
    currentTime: 0,
    volume: 0.7,
    isShuffling: false,
    isRepeating: false,
  });
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledTracks, setShuffledTracks] = useState<Track[]>(playlist.tracks);
  const [originalTracks] = useState<Track[]>(playlist.tracks);
  
  const howlRef = useRef<Howl | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio
  useEffect(() => {
    // Enable global audio unlock for iOS/Safari
    const enableAudio = async () => {
      try {
        const audioContext = Howler.ctx;
        if (audioContext && audioContext.state === 'suspended') {
          await audioContext.resume();
        }
      } catch (error) {
        console.warn('Could not resume audio context:', error);
      }
    };

    // Add click listener to unlock audio
    const unlockAudio = () => {
      enableAudio();
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };

    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);

    if (playerState.currentTrack) {
      loadTrack(playerState.currentTrack);
    }
    
    return () => {
      // Cleanup
      if (howlRef.current) {
        howlRef.current.stop();
        howlRef.current.unload();
        howlRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // Remove event listeners
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  const loadTrack = (track: Track) => {
    console.log('Loading track:', track.title, track.src);
    setIsLoading(true);
    
    // Reset loading after 5 seconds as fallback
    const loadingTimeout = setTimeout(() => {
      console.warn('Loading timeout for track:', track.title);
      setIsLoading(false);
    }, 5000);
    
    // Cleanup previous track
    if (howlRef.current) {
      howlRef.current.stop();
      howlRef.current.unload();
      howlRef.current = null;
    }

    // Clear any existing intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    try {
    howlRef.current = new Howl({
      src: [track.src],
      html5: true,
        preload: 'metadata', // Preload metadata to check if file exists
        pool: 3, // Increase pool size
      volume: playerState.volume,
      onload: () => {
          console.log('Track loaded successfully:', track.title);
          clearTimeout(loadingTimeout);
        setIsLoading(false);
      },
        onloaderror: (id, error) => {
          console.error('Error loading track:', track.title, track.src, error);
          clearTimeout(loadingTimeout);
        setIsLoading(false);
      },
      onend: () => {
        handleNextTrack();
      },
      onplay: () => {
          console.log('Track started playing:', track.title);
        setPlayerState(prev => ({ ...prev, isPlaying: true }));
        startTimeUpdate();
      },
      onpause: () => {
        setPlayerState(prev => ({ ...prev, isPlaying: false }));
        stopTimeUpdate();
      },
        onstop: () => {
          setPlayerState(prev => ({ ...prev, isPlaying: false }));
          stopTimeUpdate();
        },
        onplayerror: (id, error) => {
          console.error('Playback error:', track.title, error);
          setPlayerState(prev => ({ ...prev, isPlaying: false }));
        },
      });
      
      // Force load immediately 
      setTimeout(() => {
        if (howlRef.current && howlRef.current.state() === 'unloaded') {
          console.log('Forcing load for:', track.title);
          howlRef.current.load();
        }
      }, 100);
      
    } catch (error) {
      console.error('Failed to create Howl instance:', error);
      clearTimeout(loadingTimeout);
      setIsLoading(false);
    }
  };

  const startTimeUpdate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      if (howlRef.current && howlRef.current.playing()) {
        const currentTime = howlRef.current.seek() as number;
        setPlayerState(prev => ({ ...prev, currentTime }));
      }
    }, 1000);
  };

  const stopTimeUpdate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handlePlayPause = async () => {
    console.log('Play/Pause clicked', {
      hasHowl: !!howlRef.current,
      isPlaying: playerState.isPlaying,
      isLoading: isLoading,
      currentTrack: playerState.currentTrack?.title
    });
    
    if (!howlRef.current) {
      console.warn('No Howl instance available');
      return;
    }

    if (isLoading) {
      console.warn('Track still loading, cannot play yet');
      return;
    }

    try {
    if (playerState.isPlaying) {
        console.log('Pausing track');
      howlRef.current.pause();
    } else {
        console.log('Playing track');
        // Handle user interaction requirement for audio
        const audioContext = Howler.ctx;
        if (audioContext && audioContext.state === 'suspended') {
          console.log('Resuming audio context');
          await audioContext.resume();
        }
        
        const playPromise = howlRef.current.play();
        console.log('Play promise:', playPromise);
      }
    } catch (error) {
      console.error('Playback error:', error);
    }
  };

  const handleNextTrack = () => {
    const tracks = playerState.isShuffling ? shuffledTracks : originalTracks;
    let nextIndex = currentIndex + 1;
    
    if (nextIndex >= tracks.length) {
      if (playerState.isRepeating) {
        nextIndex = 0;
      } else {
        setPlayerState(prev => ({ ...prev, isPlaying: false }));
        return;
      }
    }
    
    setCurrentIndex(nextIndex);
    const nextTrack = tracks[nextIndex];
    setPlayerState(prev => ({ ...prev, currentTrack: nextTrack }));
    loadTrack(nextTrack);
    
    if (playerState.isPlaying) {
      setTimeout(async () => {
        try {
          if (howlRef.current) {
            const audioContext = Howler.ctx;
            if (audioContext && audioContext.state === 'suspended') {
              await audioContext.resume();
            }
            howlRef.current.play();
          }
        } catch (error) {
          console.error('Auto-play error:', error);
        }
      }, 200);
    }
  };

  const handlePrevTrack = () => {
    const tracks = playerState.isShuffling ? shuffledTracks : originalTracks;
    let prevIndex = currentIndex - 1;
    
    if (prevIndex < 0) {
      prevIndex = tracks.length - 1;
    }
    
    setCurrentIndex(prevIndex);
    const prevTrack = tracks[prevIndex];
    setPlayerState(prev => ({ ...prev, currentTrack: prevTrack }));
    loadTrack(prevTrack);
    
    if (playerState.isPlaying) {
      setTimeout(async () => {
        try {
          if (howlRef.current) {
            const audioContext = Howler.ctx;
            if (audioContext && audioContext.state === 'suspended') {
              await audioContext.resume();
            }
            howlRef.current.play();
          }
        } catch (error) {
          console.error('Auto-play error:', error);
        }
      }, 200);
    }
  };

  const handleSeek = (value: number) => {
    if (!howlRef.current) return;
    
    const duration = howlRef.current.duration();
    const seekTime = (value / 100) * duration;
    howlRef.current.seek(seekTime);
    setPlayerState(prev => ({ ...prev, currentTime: seekTime }));
  };

  const handleVolumeChange = (value: number) => {
    const volume = value / 100;
    setPlayerState(prev => ({ ...prev, volume }));
    
    if (howlRef.current) {
      howlRef.current.volume(volume);
    }
    
    Howler.volume(volume);
  };

  const handleShuffle = () => {
    const newShuffling = !playerState.isShuffling;
    setPlayerState(prev => ({ ...prev, isShuffling: newShuffling }));
    
    if (newShuffling) {
      const shuffled = shuffleArray([...originalTracks]);
      setShuffledTracks(shuffled);
      // Find current track in shuffled array
      const currentTrackIndex = shuffled.findIndex(t => t.id === playerState.currentTrack?.id);
      setCurrentIndex(currentTrackIndex);
    } else {
      // Return to original order
      const originalIndex = originalTracks.findIndex(t => t.id === playerState.currentTrack?.id);
      setCurrentIndex(originalIndex);
    }
  };

  const handleRepeat = () => {
    setPlayerState(prev => ({ ...prev, isRepeating: !prev.isRepeating }));
  };

  const handleTrackSelect = (track: Track, index: number) => {
    setCurrentIndex(index);
    setPlayerState(prev => ({ ...prev, currentTrack: track }));
    loadTrack(track);
    
    if (playerState.isPlaying) {
      setTimeout(async () => {
        try {
          if (howlRef.current) {
            const audioContext = Howler.ctx;
            if (audioContext && audioContext.state === 'suspended') {
              await audioContext.resume();
            }
            howlRef.current.play();
          }
        } catch (error) {
          console.error('Auto-play error:', error);
        }
      }, 200);
    }
  };

  const toggleMute = () => {
    if (playerState.volume > 0) {
      handleVolumeChange(0);
    } else {
      handleVolumeChange(70);
    }
  };

  const debugAudio = () => {
    console.log('Debug Audio:', {
      howlState: howlRef.current ? {
        state: howlRef.current.state(),
        duration: howlRef.current.duration(),
        volume: howlRef.current.volume(),
        playing: howlRef.current.playing(),
      } : 'No howl instance',
      howlerState: {
        ctx: Howler.ctx?.state,
        volume: Howler.volume(),
        html5PoolSize: Howler.html5PoolSize,
      },
      playerState: {
        isPlaying: playerState.isPlaying,
        currentTime: playerState.currentTime,
        volume: playerState.volume,
      }
    });
  };

  const currentDuration = howlRef.current ? howlRef.current.duration() : 0;
  const progressPercentage = currentDuration > 0 ? (playerState.currentTime / currentDuration) * 100 : 0;

  return (
    <div className={cn('fixed bottom-0 left-0 right-0 z-40', className)}>
      {/* Minimized Player */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="relative"
      >
        <GlassCard className="rounded-none border-x-0 border-b-0 backdrop-blur-xl">
          <div className="px-4 py-3">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
              <div
                className="h-full bg-gradient-accent transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              {/* Track Info */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {playerState.currentTrack && (
                  <>
                    <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
                      <MusicalNoteIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-white truncate">
                        {playerState.currentTrack.title}
                      </h4>
                      <p className="text-sm text-white/60 truncate">
                        {playerState.currentTrack.artist}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handlePrevTrack}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <BackwardIcon className="w-5 h-5 text-white" />
                </motion.button>

                <motion.button
                  onClick={handlePlayPause}
                  disabled={isLoading}
                  className="p-3 rounded-full bg-accent hover:bg-accent/80 transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : playerState.isPlaying ? (
                    <PauseIcon className="w-6 h-6 text-white" />
                  ) : (
                    <PlayIcon className="w-6 h-6 text-white ml-0.5" />
                  )}
                </motion.button>

                <motion.button
                  onClick={handleNextTrack}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ForwardIcon className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Volume & Expand */}
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {playerState.volume === 0 ? (
                    <SpeakerXMarkIcon className="w-5 h-5 text-white" />
                  ) : (
                    <SpeakerWaveIcon className="w-5 h-5 text-white" />
                  )}
                </motion.button>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={playerState.volume * 100}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />

                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isExpanded ? (
                    <ChevronDownIcon className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronUpIcon className="w-5 h-5 text-white" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Expanded Player */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <GlassCard className="rounded-none border-x-0 border-t-0 border-b-0">
                <div className="p-6">
                  {/* Expanded Track Info */}
                  {playerState.currentTrack && (
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-20 h-20 rounded-xl bg-gradient-accent flex items-center justify-center">
                        <MusicalNoteIcon className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {playerState.currentTrack.title}
                        </h3>
                        <p className="text-white/70 mb-2">
                          {playerState.currentTrack.artist} • {playerState.currentTrack.album}
                        </p>
                        {playerState.currentTrack.description && (
                          <p className="text-sm text-white/60 italic">
                            {playerState.currentTrack.description}
                          </p>
                        )}
                      </div>
                      <HeartSolid className="w-6 h-6 text-accent" />
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progressPercentage}
                      onChange={(e) => handleSeek(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-white/60 mt-2">
                      <span>{formatTime(playerState.currentTime)}</span>
                      <span>{formatTime(currentDuration)}</span>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <motion.button
                      onClick={handleShuffle}
                      className={cn(
                        'p-2 rounded-full transition-colors',
                        playerState.isShuffling ? 'bg-accent text-white' : 'hover:bg-white/10 text-white'
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowsRightLeftIcon className="w-5 h-5" />
                    </motion.button>

                {/* Debug Audio Button (development only) */}
                {process.env.NODE_ENV === 'development' && (
                  <motion.button
                    onClick={debugAudio}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-yellow-400"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Debug Audio"
                  >
                    <span className="text-xs">🔧</span>
                  </motion.button>
                )}

                    <motion.button
                      onClick={handlePrevTrack}
                      className="p-3 rounded-full hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <BackwardIcon className="w-6 h-6 text-white" />
                    </motion.button>

                    <motion.button
                      onClick={handlePlayPause}
                      disabled={isLoading}
                      className="p-4 rounded-full bg-accent hover:bg-accent/80 transition-colors disabled:opacity-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isLoading ? (
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : playerState.isPlaying ? (
                        <PauseIcon className="w-8 h-8 text-white" />
                      ) : (
                        <PlayIcon className="w-8 h-8 text-white ml-1" />
                      )}
                    </motion.button>

                    <motion.button
                      onClick={handleNextTrack}
                      className="p-3 rounded-full hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ForwardIcon className="w-6 h-6 text-white" />
                    </motion.button>

                    <motion.button
                      onClick={handleRepeat}
                      className={cn(
                        'p-2 rounded-full transition-colors',
                        playerState.isRepeating ? 'bg-accent text-white' : 'hover:bg-white/10 text-white'
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowPathIcon className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Playlist */}
                  <div className="max-h-48 overflow-y-auto">
                    <h4 className="text-sm font-medium text-white/80 mb-3">
                      {playlist.name}
                    </h4>
                    <div className="space-y-2">
                      {(playerState.isShuffling ? shuffledTracks : originalTracks).map((track, index) => (
                        <motion.button
                          key={track.id}
                          onClick={() => handleTrackSelect(track, index)}
                          className={cn(
                            'w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-left',
                            playerState.currentTrack?.id === track.id
                              ? 'bg-accent/20 text-accent'
                              : 'hover:bg-white/5 text-white'
                          )}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
                            {playerState.currentTrack?.id === track.id && playerState.isPlaying ? (
                              <div className="flex gap-0.5">
                                <div className="w-0.5 h-3 bg-accent animate-pulse" />
                                <div className="w-0.5 h-3 bg-accent animate-pulse delay-100" />
                                <div className="w-0.5 h-3 bg-accent animate-pulse delay-200" />
                              </div>
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{track.title}</p>
                            <p className="text-xs opacity-60 truncate">{track.artist}</p>
                          </div>
                          <span className="text-xs opacity-60 flex-shrink-0">
                            {formatTime(track.duration)}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MusicPlayer; 