import React, { useState, useEffect } from 'react';
import { VisualSettings, Quote, Category, Song } from '../types';
import { NOSTALGIC_QUOTES } from '../data/defaultCategories';
import { Wind, Truck, Sparkles, Volume2, Radio, Music2, Activity } from 'lucide-react';
import { RetroAnalogVUMeter } from './RetroAnalogVUMeter';

interface ImmersiveCabinViewProps {
  visualSettings: VisualSettings;
  onTriggerHorn: () => void;
  isHornPlaying: boolean;
  activeCategory?: Category;
  currentSong?: Song | null;
  isPlaying: boolean;
  onToggleWipers: () => void;
  onOpenCategories: () => void;
}

export const ImmersiveCabinView: React.FC<ImmersiveCabinViewProps> = ({
  visualSettings,
  onTriggerHorn,
  isHornPlaying,
  activeCategory,
  currentSong,
  isPlaying,
  onToggleWipers,
  onOpenCategories
}) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [quoteFade, setQuoteFade] = useState(true);
  const [showVUMeter, setShowVUMeter] = useState(true);

  // Rotate quotes every 7 seconds with smooth fade
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteFade(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % NOSTALGIC_QUOTES.length);
        setQuoteFade(true);
      }, 400);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const quote = NOSTALGIC_QUOTES[currentQuoteIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-neutral-950">
      {/* 1. Base Scenic Highway Wallpaper (Custom or Default Himalayan Road) */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
          isHornPlaying ? 'scale-[1.01] transition-transform duration-75' : 'scale-100'
        } ${visualSettings.blurBackground ? 'blur-sm' : ''}`}
        style={{
          backgroundImage: `url(${visualSettings.wallpaperUrl})`,
          backgroundPosition: 'center 42%'
        }}
      >
        {/* Subtle Vignette & Road Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* 2. Optional Grain Overlay for 90s Film Camera Texture */}
      {visualSettings.showFilmGrain && (
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      )}

      {/* 3. Windshield Glass Glare & Rain Streaks Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent" />
      </div>

      {/* 4. Active Windshield Wipers Animation */}
      {visualSettings.wipersActive && (
        <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
          {/* Left Wiper Blade */}
          <div className="absolute bottom-24 left-[28%] w-1.5 h-[58vh] bg-neutral-900 origin-bottom rounded-full shadow-2xl animate-[wiperLeft_2.2s_easeInOut_infinite]">
            <div className="w-4 h-full bg-neutral-800/80 -translate-x-1 blur-[1px]" />
          </div>
          {/* Right Wiper Blade */}
          <div className="absolute bottom-24 left-[54%] w-1.5 h-[58vh] bg-neutral-900 origin-bottom rounded-full shadow-2xl animate-[wiperRight_2.2s_easeInOut_infinite]">
            <div className="w-4 h-full bg-neutral-800/80 -translate-x-1 blur-[1px]" />
          </div>
        </div>
      )}

      {/* 5. Authentic Truck Windshield Header & Frame Overlays */}
      {visualSettings.showCabinOverlays && (
        <>
          {/* Top Windshield Banner: Traditional Indian Truck Typography */}
          <div className="absolute top-0 inset-x-0 h-16 md:h-20 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-transparent z-20 flex items-start justify-between px-8 pt-10 md:pt-11 pointer-events-none text-amber-500/90 font-cinzel font-black tracking-widest text-sm md:text-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            <span className="font-hindi tracking-wider text-amber-400">जय श्री राम</span>
            <span className="text-amber-500/70 tracking-widest hidden md:inline">GOODS CARRIER</span>
            <span className="font-hindi text-amber-400">शुभ यात्रा</span>
          </div>

          {/* Marigold ("Genda Phool") Garland Decoration across Windshield */}
          {visualSettings.showGarlands && (
            <div className="absolute top-8 md:top-10 inset-x-0 z-20 pointer-events-none flex justify-around items-start overflow-hidden px-4">
              {/* Garland String 1 */}
              <div className="w-full flex justify-between items-center relative">
                {/* SVG Marigold Garland Chain */}
                <svg className="w-full h-16 md:h-24 filter drop-shadow-[0_6px_8px_rgba(0,0,0,0.6)]" viewBox="0 0 1200 80" fill="none">
                  {/* Garland Drapes */}
                  <path d="M 0 10 Q 150 65 300 10 Q 450 65 600 10 Q 750 65 900 10 Q 1050 65 1200 10" stroke="#f97316" strokeWidth="12" strokeLinecap="round" strokeDasharray="4 8" />
                  <path d="M 0 12 Q 150 67 300 12 Q 450 67 600 12 Q 750 67 900 12 Q 1050 67 1200 12" stroke="#eab308" strokeWidth="8" strokeLinecap="round" strokeDasharray="3 6" />
                </svg>

                {/* Hanging Marigold Tassels */}
                <div className="absolute left-[24%] top-6 md:top-8 flex flex-col items-center animate-[sway_3s_ease-in-out_infinite]">
                  <div className="w-0.5 h-6 bg-amber-700" />
                  <div className="w-4 h-4 rounded-full bg-amber-500 shadow-md" />
                  <div className="w-4 h-4 rounded-full bg-orange-600 shadow-md -mt-1" />
                  <div className="w-3 h-5 bg-amber-400 rounded-b-full -mt-0.5" />
                </div>

                <div className="absolute left-[72%] top-6 md:top-8 flex flex-col items-center animate-[sway_3.5s_ease-in-out_infinite_reverse]">
                  <div className="w-0.5 h-6 bg-amber-700" />
                  <div className="w-4 h-4 rounded-full bg-orange-500 shadow-md" />
                  <div className="w-4 h-4 rounded-full bg-amber-400 shadow-md -mt-1" />
                  <div className="w-3 h-5 bg-orange-600 rounded-b-full -mt-0.5" />
                </div>
              </div>
            </div>
          )}

          {/* Center Hanging Protective Wooden Amulet / Placard ("ॐ नमो शिवाय" / "बुरी नज़र वाले") */}
          <div 
            onClick={onTriggerHorn}
            className="absolute top-12 md:top-14 left-1/2 -translate-x-1/2 z-25 flex flex-col items-center cursor-pointer group pointer-events-auto"
            title="Click Amulet to Honk Horn!"
          >
            {/* Hanging Black Thread */}
            <div className="w-0.5 h-8 md:h-12 bg-neutral-900 shadow" />

            {/* Vintage Yellow Cardboard Sign */}
            <div className={`px-3 py-2.5 rounded bg-amber-200/90 border-2 border-amber-900/60 shadow-2xl text-center backdrop-blur-xs transform transition-transform group-hover:scale-105 group-active:rotate-2 ${isHornPlaying ? 'animate-bounce' : 'animate-[sway_4s_ease-in-out_infinite]'}`}>
              <div className="text-[11px] md:text-xs font-hindi font-bold text-amber-950 leading-tight">
                ॐ नमो शिवाय
              </div>
              <div className="text-[9px] md:text-[10px] font-hindi text-amber-900 font-semibold border-t border-amber-900/40 mt-0.5 pt-0.5">
                सत्संग सोंगी
              </div>
              <div className="text-[8px] md:text-[9px] font-hindi text-red-900 font-bold">
                जय माता दी
              </div>
            </div>

            {/* Hanging Small Brass Bell / Tassel */}
            <div className="w-3 h-4 bg-amber-500 rounded-b-full border border-amber-700 shadow -mt-0.5 animate-pulse" />
          </div>

          {/* 6. Lower Truck Cabin & Dashboard Elements */}
          {visualSettings.showDashboard && (
            <div className="absolute bottom-0 inset-x-0 h-44 md:h-64 pointer-events-none z-10 flex justify-between items-end">
              {/* Left Dashboard Shelf (Chai glass, matchbox, small idol, sticker) */}
              <div className="relative w-[34%] max-w-sm h-full bg-gradient-to-t from-neutral-950 via-neutral-900/90 to-neutral-900/40 rounded-tr-3xl border-t-2 border-r-2 border-neutral-800/80 shadow-2xl p-4 flex flex-col justify-between">
                {/* Dashboard Sticker */}
                <div className="flex items-center gap-2">
                  <div className="px-2 py-0.5 rounded bg-red-900/80 border border-red-500/40 text-[9px] font-hindi font-bold text-amber-200 shadow">
                    ॥ श्री गणेशाय नमः ॥
                  </div>
                </div>

                {/* Dashboard Trinkets Row */}
                <div className="flex items-end gap-3 pb-4">
                  {/* Steel / Glass Chai Glass */}
                  <div className="w-7 h-10 rounded-b-md bg-gradient-to-b from-amber-700/60 to-amber-950/90 border border-white/20 shadow-lg flex items-center justify-center relative">
                    <div className="w-5 h-6 rounded-b bg-amber-600/80 mt-2" />
                    <div className="absolute -top-3 w-1.5 h-3 bg-white/20 rounded-full blur-[1px] animate-pulse" />
                  </div>

                  {/* Ship Brand Matchbox */}
                  <div className="w-9 h-6 bg-amber-800 rounded border border-amber-500/40 text-[7px] text-amber-100 font-bold flex items-center justify-center shadow">
                    SHIP
                  </div>

                  {/* Brass Idol / Dashboard Figurine */}
                  <div className="w-8 h-10 bg-amber-500/80 rounded-t-lg border border-amber-300 shadow-lg flex items-center justify-center text-[10px]">
                    🪔
                  </div>
                </div>
              </div>

              {/* Center Dashboard Recess / Radio & Analog VU Meter Console */}
              <div className="flex-1 min-h-[140px] md:min-h-[180px] bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent border-t border-neutral-800/60 flex items-end justify-center pb-24 md:pb-28 px-2 pointer-events-auto">
                {showVUMeter && (
                  <div className="w-full max-w-sm transform hover:scale-[1.02] transition-transform">
                    <RetroAnalogVUMeter
                      isPlaying={isPlaying}
                      songTitle={currentSong?.title}
                      artist={currentSong?.artist}
                    />
                  </div>
                )}
              </div>

              {/* Right Side: Indian Truck Driver Holding Large Steering Wheel */}
              <div className="relative w-[38%] max-w-md h-full flex justify-end items-end pr-2 md:pr-8">
                {/* Truck Steering Wheel + Hands (Clickable to Honk!) */}
                <div 
                  onClick={onTriggerHorn}
                  className="relative cursor-pointer pointer-events-auto group z-20 transform hover:scale-[1.02] active:scale-95 transition-transform"
                  title="Click Steering Wheel to Honk Truck Horn!"
                >
                  {/* Big Steering Wheel Rim */}
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-8 md:border-[10px] border-neutral-900 shadow-[0_10px_30px_rgba(0,0,0,0.9)] bg-neutral-950/40 flex items-center justify-center relative -mb-16 -mr-6 md:-mb-20 md:-mr-10">
                    {/* Steering Hub Center */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-neutral-900 border-4 border-amber-500/60 flex items-center justify-center shadow-inner">
                      <span className="text-[10px] md:text-xs font-bold text-amber-400 font-hindi">TATA</span>
                    </div>

                    {/* Spokes */}
                    <div className="absolute w-full h-3 bg-neutral-900" />
                    <div className="absolute h-full w-3 bg-neutral-900" />
                  </div>

                  {/* Driver Arm Silhouette / Clothes */}
                  <div className="absolute -bottom-6 -right-12 w-48 h-56 bg-gradient-to-t from-sky-950 via-sky-900/90 to-transparent rounded-tl-full pointer-events-none opacity-90 shadow-2xl" />
                </div>
              </div>
            </div>
          )}

          {/* Floating VU Meter fallback if dashboard overlay is disabled */}
          {!visualSettings.showDashboard && showVUMeter && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-sm pointer-events-auto">
              <RetroAnalogVUMeter
                isPlaying={isPlaying}
                songTitle={currentSong?.title}
                artist={currentSong?.artist}
              />
            </div>
          )}
        </>
      )}

      {/* 7. Rotating Nostalgic Memories / Quotes Banner (Center-Top Floating) */}
      <div className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-2xl text-center pointer-events-none">
        <div className={`transition-all duration-500 transform ${quoteFade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
          <div className="inline-block px-5 py-2.5 rounded-full bg-[#0c0b0a]/80 backdrop-blur-xl border border-orange-500/20 shadow-2xl text-neutral-100">
            <p className="text-xs md:text-sm font-hindi font-medium text-orange-300 drop-shadow">
              "{quote.hindi}"
            </p>
            <p className="text-[11px] md:text-xs font-serif-vintage italic text-neutral-200 mt-0.5 tracking-wide">
              {quote.english}
            </p>
            <div className="mt-1 flex items-center justify-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-orange-400/80">
              <span className="w-1 h-1 rounded-full bg-orange-400" />
              <span>{quote.authorOrVibe}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Quick Ambient Toggles On Road Screen (Wiper Toggle, Cabin Toggle, VU Meter Toggle) */}
      <div className="absolute right-4 top-20 md:top-24 z-30 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={() => setShowVUMeter(!showVUMeter)}
          className={`p-2.5 rounded-full backdrop-blur-md border shadow-lg transition-all ${
            showVUMeter 
              ? 'bg-orange-500 border-orange-400 text-black' 
              : 'bg-[#0c0b0a]/70 border-white/15 text-neutral-300 hover:text-white hover:bg-[#0c0b0a]/90'
          }`}
          title={showVUMeter ? 'Hide Analog VU Meter' : 'Show Analog VU Meter'}
        >
          <Activity className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleWipers}
          className={`p-2.5 rounded-full backdrop-blur-md border shadow-lg transition-all ${
            visualSettings.wipersActive 
              ? 'bg-orange-500 border-orange-400 text-black' 
              : 'bg-[#0c0b0a]/70 border-white/15 text-neutral-300 hover:text-white hover:bg-[#0c0b0a]/90'
          }`}
          title={visualSettings.wipersActive ? 'Turn Off Windshield Wipers' : 'Turn On Windshield Wipers'}
        >
          <Wind className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenCategories}
          className="p-2.5 rounded-full bg-[#0c0b0a]/70 hover:bg-[#0c0b0a]/90 backdrop-blur-md border border-white/15 text-neutral-300 hover:text-white shadow-lg transition-all"
          title="Browse All Categories & Songs"
        >
          <Music2 className="w-4 h-4 text-orange-400" />
        </button>
      </div>
    </div>
  );
};
