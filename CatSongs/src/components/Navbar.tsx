import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Image as ImageIcon, 
  Maximize2, 
  Minimize2, 
  Grid, 
  Radio, 
  CloudRain, 
  Flame, 
  Moon, 
  Truck,
  Disc3
} from 'lucide-react';
import { AmbientSoundType } from '../types';

interface NavbarProps {
  currentView: 'home' | 'cabin';
  onToggleView: () => void;
  activeCategoryName?: string;
  onTriggerHorn: () => void;
  ambientSound: AmbientSoundType;
  onChangeAmbient: (type: AmbientSoundType) => void;
  onOpenWallpaperModal: () => void;
  onOpenQueue: () => void;
  isPlaying: boolean;
  activeSongTitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onToggleView,
  activeCategoryName,
  onTriggerHorn,
  ambientSound,
  onChangeAmbient,
  onOpenWallpaperModal,
  onOpenQueue,
  isPlaying,
  activeSongTitle
}) => {
  const [timeString, setTimeString] = useState<string>('');
  const [listenerCount, setListenerCount] = useState<number>(17);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [ambientMenuOpen, setAmbientMenuOpen] = useState<boolean>(false);

  // Update clock every second matching format: "Sun, Aug 16 • 09:58 PM"
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      const formatted = now.toLocaleDateString('en-US', options).replace(',', ' •');
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fluctuate live listeners slightly for authentic live radio vibe
  useEffect(() => {
    const listenerInterval = setInterval(() => {
      setListenerCount(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next < 12 ? 14 : next > 34 ? 28 : next;
      });
    }, 12000);
    return () => clearInterval(listenerInterval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 md:px-8 py-3 flex items-center justify-between pointer-events-auto bg-[#0c0b0a]/70 backdrop-blur-xl border-b border-white/5">
      {/* Left: Vintage Clock & Active Space badge */}
      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-sleek text-white/70 shadow-sm">
          <Clock className="w-3 h-3 text-orange-400" />
          <span className="tracking-tight whitespace-nowrap text-[11px]">{timeString || 'Sun, Aug 16 • 09:58 PM'}</span>
        </div>

        {activeCategoryName && (
          <button
            onClick={onOpenQueue}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-medium hover:bg-orange-500/20 transition-all font-mono shadow-sm"
            title="Click to view playlist queue"
          >
            <Disc3 className={`w-3 h-3 ${isPlaying ? 'animate-spin text-orange-400' : ''}`} />
            <span className="truncate max-w-[140px] md:max-w-[200px] text-[11px]">{activeCategoryName}</span>
          </button>
        )}
      </div>

      {/* Center: Live Session status */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span className="text-[11px] font-mono font-medium text-white/80 tracking-wider uppercase whitespace-nowrap">
            {listenerCount} Listening Live
          </span>
        </div>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-1.5 md:gap-2">
        {/* Interactive Indian Truck Horn Button */}
        <button
          onClick={onTriggerHorn}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600/30 hover:bg-orange-500/40 text-orange-200 text-xs font-bold transition-all shadow-sm active:scale-95 border border-orange-500/40 group font-mono"
          title="Press 'H' or Click for Indian Truck Melodic Air Horn"
        >
          <Truck className="w-3.5 h-3.5 group-hover:animate-bounce text-orange-400" />
          <span className="hidden lg:inline whitespace-nowrap font-hindi">HORN OK PLEASE</span>
          <span className="lg:hidden text-[10px] font-bold">HONK</span>
          <kbd className="hidden sm:inline-block text-[9px] px-1 py-0.2 rounded bg-black/40 text-orange-300 border border-orange-500/30 font-mono">H</kbd>
        </button>

        {/* Ambient Sounds Menu */}
        <div className="relative">
          <button
            onClick={() => setAmbientMenuOpen(!ambientMenuOpen)}
            className={`p-1.5 md:px-3 md:py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
              ambientSound !== 'off'
                ? 'bg-orange-500/20 border border-orange-400/40 text-orange-300'
                : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
            }`}
            title="Roadside Ambience Sounds (Rain, Engine, Chai Tapri)"
          >
            {ambientSound === 'rain' && <CloudRain className="w-3.5 h-3.5 text-blue-400 animate-pulse" />}
            {ambientSound === 'engine' && <Truck className="w-3.5 h-3.5 text-orange-400" />}
            {ambientSound === 'chai' && <Flame className="w-3.5 h-3.5 text-orange-400" />}
            {ambientSound === 'night' && <Moon className="w-3.5 h-3.5 text-indigo-400" />}
            {ambientSound === 'off' && <Volume2 className="w-3.5 h-3.5 text-neutral-400" />}
            <span className="hidden md:inline capitalize text-[11px]">{ambientSound === 'off' ? 'Ambience' : ambientSound}</span>
          </button>

          {ambientMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 py-2 rounded-2xl bg-[#0c0b0a]/95 backdrop-blur-2xl border border-orange-500/20 shadow-2xl z-50 text-xs flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1 text-[10px] font-mono text-orange-400/70 uppercase tracking-widest">
                Highway Ambience
              </div>
              <button
                onClick={() => { onChangeAmbient('off'); setAmbientMenuOpen(false); }}
                className={`px-3 py-1.5 text-left flex items-center gap-2 hover:bg-white/10 transition-colors ${ambientSound === 'off' ? 'text-orange-400 font-bold' : 'text-neutral-300'}`}
              >
                <VolumeX className="w-3.5 h-3.5" /> Off
              </button>
              <button
                onClick={() => { onChangeAmbient('rain'); setAmbientMenuOpen(false); }}
                className={`px-3 py-1.5 text-left flex items-center gap-2 hover:bg-white/10 transition-colors ${ambientSound === 'rain' ? 'text-blue-400 font-bold' : 'text-neutral-300'}`}
              >
                <CloudRain className="w-3.5 h-3.5" /> Monsoon Rain on Windshield
              </button>
              <button
                onClick={() => { onChangeAmbient('engine'); setAmbientMenuOpen(false); }}
                className={`px-3 py-1.5 text-left flex items-center gap-2 hover:bg-white/10 transition-colors ${ambientSound === 'engine' ? 'text-orange-400 font-bold' : 'text-neutral-300'}`}
              >
                <Truck className="w-3.5 h-3.5" /> Highway Diesel Engine Hum
              </button>
              <button
                onClick={() => { onChangeAmbient('chai'); setAmbientMenuOpen(false); }}
                className={`px-3 py-1.5 text-left flex items-center gap-2 hover:bg-white/10 transition-colors ${ambientSound === 'chai' ? 'text-orange-400 font-bold' : 'text-neutral-300'}`}
              >
                <Flame className="w-3.5 h-3.5" /> Dhaba Chai Kettle & Murmur
              </button>
              <button
                onClick={() => { onChangeAmbient('night'); setAmbientMenuOpen(false); }}
                className={`px-3 py-1.5 text-left flex items-center gap-2 hover:bg-white/10 transition-colors ${ambientSound === 'night' ? 'text-indigo-400 font-bold' : 'text-neutral-300'}`}
              >
                <Moon className="w-3.5 h-3.5" /> Mountain Crickets & Night Breeze
              </button>
            </div>
          )}
        </div>

        {/* Wallpaper Customizer */}
        <button
          onClick={onOpenWallpaperModal}
          className="p-1.5 md:px-3 md:py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs font-mono transition-all flex items-center gap-1.5 shadow-sm"
          title="Customize Wallpaper & Cabin Aesthetic"
        >
          <ImageIcon className="w-3.5 h-3.5 text-orange-400" />
          <span className="hidden md:inline text-[11px]">Wallpaper</span>
        </button>

        {/* View Toggle: "Mixtapes / Categories" vs "Immersive Cabin View" */}
        <button
          onClick={onToggleView}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 hover:bg-orange-400 text-black text-xs font-bold font-mono uppercase tracking-wider shadow-md transition-all active:scale-95"
          title={currentView === 'home' ? 'Switch to Scenic Himalayan Cabin View' : 'Switch to Category Grid'}
        >
          {currentView === 'home' ? (
            <>
              <Radio className="w-3.5 h-3.5 text-black" />
              <span className="whitespace-nowrap text-[11px]">Cabin View</span>
            </>
          ) : (
            <>
              <Grid className="w-3.5 h-3.5 text-black" />
              <span className="whitespace-nowrap text-[11px]">Grid View</span>
            </>
          )}
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all shadow-sm hidden sm:flex"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </header>
  );
};
