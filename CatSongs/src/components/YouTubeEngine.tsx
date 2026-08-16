import React, { useEffect, useRef } from 'react';
import { Song, RepeatMode } from '../types';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubeEngineProps {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  onTimeUpdate: (current: number, duration: number) => void;
  onTrackEnded: () => void;
  onPlayStateChange: (playing: boolean) => void;
  seekTarget: number | null;
  onSeekHandled: () => void;
  repeatMode: RepeatMode;
}

export const YouTubeEngine: React.FC<YouTubeEngineProps> = ({
  currentSong,
  isPlaying,
  volume,
  isMuted,
  onTimeUpdate,
  onTrackEnded,
  onPlayStateChange,
  seekTarget,
  onSeekHandled,
  repeatMode
}) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isApiLoaded = useRef<boolean>(false);
  const timeIntervalRef = useRef<number | null>(null);

  // Load YouTube IFrame API once
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      isApiLoaded.current = true;
      initPlayer();
      return;
    }

    if (!document.getElementById('yt-iframe-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      isApiLoaded.current = true;
      initPlayer();
    };

    return () => {
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }
    };
  }, []);

  const initPlayer = () => {
    if (!containerRef.current || playerRef.current || !window.YT || !window.YT.Player) return;

    try {
      // Clear previous iframe/div if any
      containerRef.current.innerHTML = '<div id="yt-player-mount"></div>';
      const mountNode = document.getElementById('yt-player-mount');
      if (!mountNode) return;

      playerRef.current = new window.YT.Player(mountNode, {
        height: '100',
        width: '100',
        videoId: currentSong ? currentSong.youtubeId : 'B_kPjKqf8z0',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          iv_load_policy: 3
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(isMuted ? 0 : volume);
            if (isMuted) {
              event.target.mute();
            } else {
              event.target.unMute();
            }
            if (isPlaying) {
              event.target.playVideo();
            }
          },
          onStateChange: (event: any) => {
            // 1: PLAYING, 2: PAUSED, 0: ENDED, 3: BUFFERING
            if (event.data === 1) {
              onPlayStateChange(true);
            } else if (event.data === 2) {
              onPlayStateChange(false);
            } else if (event.data === 0) {
              if (repeatMode === 'one' && playerRef.current) {
                playerRef.current.seekTo(0);
                playerRef.current.playVideo();
              } else {
                onTrackEnded();
              }
            }
          },
          onError: (err: any) => {
            console.warn('YouTube playback error, advancing:', err);
            // On embed restrictions, advance or handle gracefully
            setTimeout(() => {
              onTrackEnded();
            }, 1000);
          }
        }
      });
    } catch (e) {
      console.warn('Error creating YouTube player:', e);
    }
  };

  // Synchronize track changes
  useEffect(() => {
    if (!playerRef.current || !currentSong) return;

    try {
      if (typeof playerRef.current.loadVideoById === 'function') {
        if (isPlaying) {
          playerRef.current.loadVideoById(currentSong.youtubeId);
        } else {
          playerRef.current.cueVideoById(currentSong.youtubeId);
        }
      }
    } catch (e) {
      console.warn('Error updating video ID:', e);
    }
  }, [currentSong?.id, currentSong?.youtubeId]);

  // Synchronize Play / Pause
  useEffect(() => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        if (typeof playerRef.current.playVideo === 'function') {
          playerRef.current.playVideo();
        }
      } else {
        if (typeof playerRef.current.pauseVideo === 'function') {
          playerRef.current.pauseVideo();
        }
      }
    } catch (e) {
      console.warn('Error changing play state:', e);
    }
  }, [isPlaying]);

  // Synchronize Volume and Mute
  useEffect(() => {
    if (!playerRef.current) return;
    try {
      if (typeof playerRef.current.setVolume === 'function') {
        playerRef.current.setVolume(isMuted ? 0 : volume);
      }
      if (isMuted) {
        if (typeof playerRef.current.mute === 'function') playerRef.current.mute();
      } else {
        if (typeof playerRef.current.unMute === 'function') playerRef.current.unMute();
      }
    } catch (e) {
      console.warn('Error adjusting volume:', e);
    }
  }, [volume, isMuted]);

  // Handle Seek requests
  useEffect(() => {
    if (seekTarget !== null && playerRef.current) {
      try {
        if (typeof playerRef.current.seekTo === 'function') {
          playerRef.current.seekTo(seekTarget, true);
        }
      } catch (e) {
        console.warn('Error seeking:', e);
      }
      onSeekHandled();
    }
  }, [seekTarget]);

  // Poll time updates every 500ms
  useEffect(() => {
    if (timeIntervalRef.current) {
      clearInterval(timeIntervalRef.current);
    }

    timeIntervalRef.current = window.setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        try {
          const current = playerRef.current.getCurrentTime() || 0;
          const dur = playerRef.current.getDuration() || (currentSong?.duration || 240);
          onTimeUpdate(current, dur);
        } catch {
          // ignore
        }
      }
    }, 500);

    return () => {
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }
    };
  }, [currentSong]);

  return (
    <div 
      ref={containerRef}
      className="fixed -left-[9999px] -top-[9999px] w-10 h-10 opacity-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};
