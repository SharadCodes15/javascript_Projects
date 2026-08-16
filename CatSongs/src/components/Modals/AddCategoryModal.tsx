import React, { useState } from 'react';
import { X, Plus, Sparkles, Image as ImageIcon, Tag, Music } from 'lucide-react';
import { Category, Song } from '../../types';
import { WALLPAPER_PRESETS } from '../../data/defaultCategories';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (category: Omit<Category, 'id' | 'createdAt'>) => void;
}

const PRESET_COLORS = [
  '#f97316', // orange
  '#0ea5e9', // sky blue
  '#ec4899', // pink
  '#10b981', // emerald
  '#8b5cf6', // purple
  '#eab308', // amber
  '#ef4444', // red
  '#14b8a6'  // teal
];

const PRESET_COVERS = [
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80'
];

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onAddCategory
}) => {
  const [name, setName] = useState('');
  const [hindiName, setHindiName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState(PRESET_COVERS[0]);
  const [wallpaperUrl, setWallpaperUrl] = useState(WALLPAPER_PRESETS[0].url);
  const [themeColor, setThemeColor] = useState(PRESET_COLORS[0]);
  const [tagsInput, setTagsInput] = useState('Nostalgia, Road Trip');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a category name');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    onAddCategory({
      name: name.trim(),
      hindiName: hindiName.trim() || undefined,
      tagline: tagline.trim() || 'Custom Road Trip Mixtape',
      description: description.trim() || 'Curated nostalgic tracks for the journey.',
      coverUrl: coverUrl.trim() || PRESET_COVERS[0],
      wallpaperUrl: wallpaperUrl.trim() || WALLPAPER_PRESETS[0].url,
      themeColor,
      tags: tags.length > 0 ? tags : ['Nostalgia'],
      songs: []
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0b0a] border border-orange-500/20 p-6 md:p-8 shadow-2xl text-neutral-100 ring-1 ring-white/10">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono-sleek uppercase tracking-[0.25em] text-orange-400">New Mixtape</span>
              <h2 className="text-xl font-serif-vintage italic text-white">Create New Space</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-900/30 border border-red-500/30 text-red-200 text-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Name & Hindi Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                placeholder="e.g. Midnight Highway Ghazals"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                Hindi / Nostalgic Subtitle
              </label>
              <input
                type="text"
                value={hindiName}
                onChange={(e) => setHindiName(e.target.value)}
                placeholder="e.g. रात का सुहाना सफर"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors font-hindi"
              />
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
              Short Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Adrak chai at midnight & soothing melodies"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
              Description / Vibe
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What makes this playlist special?"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
            />
          </div>

          {/* Theme Color Picker */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
              Theme Accent Color
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setThemeColor(c)}
                  className={`w-7 h-7 rounded-full transition-transform ${themeColor === c ? 'scale-110 ring-2 ring-orange-400 ring-offset-2 ring-offset-[#0c0b0a]' : 'opacity-80 hover:opacity-100'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Preset Cover Selection */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
              Cover Art
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
              {PRESET_COVERS.map((url, i) => (
                <div
                  key={i}
                  onClick={() => setCoverUrl(url)}
                  className={`aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${coverUrl === url ? 'border-orange-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={url} alt="preset" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <input
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="Or enter custom image URL"
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Highway, 90s, Romance, Lo-fi"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors font-mono"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-orange-500 hover:bg-orange-400 text-black text-xs font-bold font-mono uppercase tracking-wider shadow-lg transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Save Space
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
