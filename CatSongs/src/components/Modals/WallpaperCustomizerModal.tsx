import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Sparkles, Check, Sliders, RefreshCw, Eye } from 'lucide-react';
import { VisualSettings } from '../../types';
import { WALLPAPER_PRESETS } from '../../data/defaultCategories';

interface WallpaperCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  visualSettings: VisualSettings;
  onUpdateVisualSettings: (settings: Partial<VisualSettings>) => void;
  onResetToDefault: () => void;
}

export const WallpaperCustomizerModal: React.FC<WallpaperCustomizerModalProps> = ({
  isOpen,
  onClose,
  visualSettings,
  onUpdateVisualSettings,
  onResetToDefault
}) => {
  const [customUrl, setCustomUrl] = useState('');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP)');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Image is larger than 8MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onUpdateVisualSettings({
          wallpaperUrl: result,
          wallpaperName: file.name.replace(/\.[^/.]+$/, '') || 'Custom Upload'
        });
        setUploadError('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    onUpdateVisualSettings({
      wallpaperUrl: customUrl.trim(),
      wallpaperName: 'Custom Web Wallpaper'
    });
    setCustomUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0b0a] border border-orange-500/20 p-6 md:p-8 shadow-2xl text-neutral-100 ring-1 ring-white/10">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-orange-400">Environment View</span>
              <h2 className="text-xl font-serif-vintage italic text-white">Backdrop & Visual Ambience</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {uploadError && (
          <div className="mt-4 p-3 rounded-xl bg-red-900/30 border border-red-500/30 text-red-200 text-xs font-mono">
            {uploadError}
          </div>
        )}

        {/* 1. Upload Custom Image Section */}
        <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-dashed border-orange-500/30 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Upload Custom Background</p>
              <p className="text-xs text-neutral-400 font-mono">Supports PNG, JPG, WebP photos (up to 8MB)</p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-1 px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-400 text-black text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              Choose Image File
            </button>
          </div>

          {/* Or Paste Direct Image URL */}
          <form onSubmit={handleCustomUrlSubmit} className="mt-3 pt-3 border-t border-white/10 flex gap-2">
            <input
              type="url"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Or paste direct image URL (https://...)"
              className="flex-1 px-3 py-2 rounded-full bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs font-mono uppercase tracking-wider text-neutral-200 transition-colors"
            >
              Apply
            </button>
          </form>
        </div>

        {/* 2. Curated Indian Aesthetic Presets */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
              Curated Nostalgic Presets
            </span>
            <span className="text-[11px] text-orange-400 font-mono">
              Active: {visualSettings.wallpaperName}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {WALLPAPER_PRESETS.map((preset) => {
              const isSelected = visualSettings.wallpaperUrl === preset.url;
              return (
                <div
                  key={preset.id}
                  onClick={() => {
                    onUpdateVisualSettings({
                      wallpaperUrl: preset.url,
                      wallpaperName: preset.name
                    });
                  }}
                  className={`relative group rounded-xl overflow-hidden cursor-pointer border-2 transition-all aspect-video ${
                    isSelected ? 'border-orange-500 ring-2 ring-orange-500/30 scale-[1.02]' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2 flex flex-col justify-end">
                    <p className="text-[11px] font-bold text-white truncate">{preset.name}</p>
                    <p className="text-[9px] text-orange-300 font-mono">{preset.category}</p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-orange-500 text-black flex items-center justify-center shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Aesthetic Cabin Feature Toggles */}
        <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-2">
            Truck Cabin Overlays & Visual Elements
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Garlands Toggle */}
            <label className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
              <div>
                <p className="text-xs font-semibold text-white">Marigold Garlands</p>
                <p className="text-[10px] text-neutral-400">Hanging Genda Phool on glass</p>
              </div>
              <input
                type="checkbox"
                checked={visualSettings.showGarlands}
                onChange={(e) => onUpdateVisualSettings({ showGarlands: e.target.checked })}
                className="w-4 h-4 rounded accent-orange-500"
              />
            </label>

            {/* Dashboard & Steering Wheel Toggle */}
            <label className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
              <div>
                <p className="text-xs font-semibold text-white">Truck Dashboard & Driver</p>
                <p className="text-[10px] text-neutral-400">Tata steering wheel & chai glass</p>
              </div>
              <input
                type="checkbox"
                checked={visualSettings.showDashboard}
                onChange={(e) => onUpdateVisualSettings({ showDashboard: e.target.checked })}
                className="w-4 h-4 rounded accent-orange-500"
              />
            </label>

            {/* Windshield Wipers Active Toggle */}
            <label className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
              <div>
                <p className="text-xs font-semibold text-white">Windshield Wipers</p>
                <p className="text-[10px] text-neutral-400">Animated sweeping wiper blades</p>
              </div>
              <input
                type="checkbox"
                checked={visualSettings.wipersActive}
                onChange={(e) => onUpdateVisualSettings({ wipersActive: e.target.checked })}
                className="w-4 h-4 rounded accent-orange-500"
              />
            </label>

            {/* Film Grain Texture */}
            <label className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
              <div>
                <p className="text-xs font-semibold text-white">90s Film Texture Overlay</p>
                <p className="text-[10px] text-neutral-400">Vintage analog grain filter</p>
              </div>
              <input
                type="checkbox"
                checked={visualSettings.showFilmGrain}
                onChange={(e) => onUpdateVisualSettings({ showFilmGrain: e.target.checked })}
                className="w-4 h-4 rounded accent-orange-500"
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 mt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onResetToDefault}
            className="text-xs text-neutral-400 hover:text-orange-400 flex items-center gap-1.5 transition-colors font-mono"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset to Himalayan Truck
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-orange-500 hover:bg-orange-400 text-black text-xs font-bold font-mono uppercase tracking-wider shadow-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
