import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Repeat1, 
  Shuffle, 
  Volume2, 
  Volume1, 
  VolumeX, 
  Maximize2, 
  ListMusic, 
  MessageSquare,
  Sparkles,
  Heart,
  Music
} from 'lucide-react';
import { Song, RepeatMode } from '../types';
import { formatTime } from '../utils/youtube';

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  volume: number;
  isMuted: boolean;
  onVolumeChange: (val: number) => void;
  onToggleMute: () => void;
  repeatMode: RepeatMode;
  onToggleRepeat: () => void;
  isShuffled: boolean;
  onToggleShuffle: () => void;
  onOpenQueue: () => void;
  onToggleFullscreenMode?: () => void;
  isCompact?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
  currentTime,
  duration,
  onSeek,
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
  repeatMode,
  onToggleRepeat,
  isShuffled,
  onToggleShuffle,
  onOpenQueue,
  onToggleFullscreenMode,
  isCompact = false
}) => {
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);
  const [showNoteTooltip, setShowNoteTooltip] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!isSeeking) {
      setSeekValue(currentTime);
    }
  }, [currentTime, isSeeking]);

  if (!currentSong) {
    return (
      <div className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 md:p-5 flex items-center justify-between shadow-2xl ring-1 ring-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center border border-orange-500/30 text-orange-400">
              <Music className="w-6 h-6 animate-pulse" />
            </div>
            <div className="text-left">
              <p className="text-sm font-serif-vintage italic text-white">No Cassette Loaded</p>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Select any space or song to start playback</p>
            </div>
          </div>
          <button
            onClick={onOpenQueue}
            className="px-4 py-1.5 bg-orange-600/20 border border-orange-500/40 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-orange-500/40 text-orange-200 transition-all font-mono"
          >
            Browse Queue
          </button>
        </div>
      </div>
    );
  }

  const effectiveDuration = duration > 0 ? duration : (currentSong.duration || 240);
  const progressPercent = effectiveDuration > 0 ? (seekValue / effectiveDuration) * 100 : 0;

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSeekValue(val);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
    onSeek(seekValue);
  };

  return (
    <div className="fixed bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 z-40 w-[96%] max-w-3xl transition-all duration-300 pointer-events-auto">
      
      {/* Sleek Interface Player Container */}
      <div className="relative overflow-hidden bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl p-4 md:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] ring-1 ring-white/10 text-neutral-100">
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 relative z-10">
          
          {/* Left: Vintage Square Artwork / Diamond Accent */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <div className="relative group shrink-0">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-500/20 rounded-2xl overflow-hidden border border-orange-500/40 flex items-center justify-center shadow-lg">
                <img
                  src={currentSong.thumbnail || `https://img.youtube.com/vi/${currentSong.youtubeId}/hqdefault.jpg`}
                  alt={currentSong.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-500 ${isPlaying ? 'scale-105' : 'opacity-90'}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>
            </div>

            {/* Mobile Title & Artist */}
            <div className="md:hidden flex-1 min-w-0">
              <h4 className="text-sm font-serif-vintage italic text-white truncate">{currentSong.title}</h4>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono truncate">{currentSong.artist}</p>
            </div>
          </div>

          {/* Middle: Title, Timestamps & Gradient Progress Slider */}
          <div className="flex-1 min-w-0 w-full">
            <div className="hidden md:flex justify-between items-end mb-1.5">
              <div className="truncate pr-2">
                <h4 className="text-base lg:text-lg font-serif-vintage italic text-white truncate" title={currentSong.title}>
                  {currentSong.title} <span className="text-orange-400/80 font-normal">— {currentSong.artist}</span>
                </h4>
              </div>
              <span className="text-[11px] font-mono-sleek text-white/50 shrink-0">
                {formatTime(seekValue)} / {formatTime(effectiveDuration)}
              </span>
            </div>

            {/* Gradient Seekbar */}
            <div className="relative flex items-center group my-1">
              <input
                type="range"
                min={0}
                max={effectiveDuration}
                step={1}
                value={seekValue}
                onMouseDown={() => setIsSeeking(true)}
                onTouchStart={() => setIsSeeking(true)}
                onChange={handleSeekChange}
                onMouseUp={handleSeekEnd}
                onTouchEnd={handleSeekEnd}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-500 focus:outline-none relative z-10 hover:h-2 transition-all"
                style={{
                  background: `linear-gradient(to right, #ea580c 0%, #f97316 ${progressPercent}%, rgba(255,255,255,0.12) ${progressPercent}%)`
                }}
              />
            </div>

            {/* Mobile timestamp indicator */}
            <div className="flex md:hidden justify-between items-center text-[10px] font-mono text-white/40 mt-0.5">
              <span>{formatTime(seekValue)}</span>
              <span>{formatTime(effectiveDuration)}</span>
            </div>
          </div>

          {/* Right: Playback Controls + Action Icons */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto shrink-0">
            
            {/* Secondary Controls: Repeat & Shuffle */}
            <div className="flex items-center gap-1">
              <button
                onClick={onToggleRepeat}
                className={`p-1.5 rounded-full transition-colors ${repeatMode !== 'off' ? 'text-orange-400 bg-orange-500/20' : 'text-white/40 hover:text-white'}`}
                title={`Repeat: ${repeatMode}`}
              >
                {repeatMode === 'one' ? <Repeat1 className="w-3.5 h-3.5" /> : <Repeat className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={onToggleShuffle}
                className={`p-1.5 rounded-full transition-colors ${isShuffled ? 'text-orange-400 bg-orange-500/20' : 'text-white/40 hover:text-white'}`}
                title={isShuffled ? 'Shuffle On' : 'Shuffle Off'}
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Main Prev / Big Play / Next */}
            <div className="flex items-center gap-3">
              <button
                onClick={onPrev}
                className="text-white/50 hover:text-white active:scale-95 transition-all p-1"
                title="Previous Track"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={onPlayPause}
                className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-orange-500 text-black flex items-center justify-center text-xl shadow-lg shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all group"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-black text-black" />
                ) : (
                  <Play className="w-5 h-5 fill-black text-black ml-0.5" />
                )}
              </button>

              <button
                onClick={onNext}
                className="text-white/50 hover:text-white active:scale-95 transition-all p-1"
                title="Next Track"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-white/10 mx-1" />

            {/* Side Tools: Note tooltip, Likes, Queue, Volume */}
            <div className="flex items-center gap-1.5">
              {currentSong.note && (
                <div className="relative">
                  <button
                    onClick={() => setShowNoteTooltip(!showNoteTooltip)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-orange-300 transition-colors"
                    title="Road Memories & Lyrics"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                  {showNoteTooltip && (
                    <div className="absolute bottom-full right-0 mb-2 w-60 p-3 rounded-2xl bg-[#0c0b0a]/95 border border-orange-500/30 text-xs text-orange-200 shadow-2xl z-50 animate-in fade-in font-serif-vintage italic">
                      <p className="font-mono text-[10px] uppercase text-orange-400 not-italic tracking-wider mb-1">Archive Note:</p>
                      "{currentSong.note}"
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => setLiked(!liked)}
                className={`p-1.5 rounded-lg bg-white/5 hover:bg-white/15 transition-colors ${liked ? 'text-red-400' : 'text-white/40 hover:text-white'}`}
                title="Favorite"
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={onOpenQueue}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition-colors"
                title="Open Queue"
              >
                <ListMusic className="w-3.5 h-3.5" />
              </button>

              {onToggleFullscreenMode && (
                <button
                  onClick={onToggleFullscreenMode}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition-colors"
                  title="Scenic Cabin POV"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Volume */}
              <div className="hidden lg:flex items-center gap-1.5 pl-1">
                <button
                  onClick={onToggleMute}
                  className="text-white/40 hover:text-white transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5 text-red-400" />
                  ) : volume < 50 ? (
                    <Volume1 className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                  className="w-14 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-500 focus:outline-none"
                  title={`Volume: ${isMuted ? 0 : volume}%`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sleek Interface Sub-Footer Metadata Line */}
      <div className="mt-2 hidden sm:flex justify-between items-center px-4 font-mono-sleek">
        <span className="text-[9px] text-white/25 uppercase tracking-[0.35em]">
          Authenticated: cat_archive_v4.2
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-orange-500/50 italic font-serif-vintage">
            'Kahin deep jaley kahin dil...'
          </span>
          <span className="text-[9px] text-white/20">|</span>
          <span className="text-[9px] text-white/30 tracking-wider">
            Audio Stream • High Fidelity
          </span>
        </div>
      </div>
    </div>
  );
};
