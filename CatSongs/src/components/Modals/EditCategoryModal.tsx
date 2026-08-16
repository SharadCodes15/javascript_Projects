import React, { useState, useEffect } from 'react';
import { X, Sparkles, Image as ImageIcon, Trash2, Save } from 'lucide-react';
import { Category } from '../../types';
import { WALLPAPER_PRESETS } from '../../data/defaultCategories';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  onUpdateCategory: (updated: Category) => void;
  onDeleteCategory: (id: string) => void;
}

const PRESET_COLORS = [
  '#f97316', '#0ea5e9', '#ec4899', '#10b981', '#8b5cf6', '#eab308', '#ef4444', '#14b8a6'
];

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  category,
  onUpdateCategory,
  onDeleteCategory
}) => {
  const [name, setName] = useState('');
  const [hindiName, setHindiName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [wallpaperUrl, setWallpaperUrl] = useState('');
  const [themeColor, setThemeColor] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setHindiName(category.hindiName || '');
      setTagline(category.tagline);
      setDescription(category.description);
      setCoverUrl(category.coverUrl);
      setWallpaperUrl(category.wallpaperUrl);
      setThemeColor(category.themeColor);
      setTagsInput(category.tags.join(', '));
      setConfirmDelete(false);
    }
  }, [category]);

  if (!isOpen || !category) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    onUpdateCategory({
      ...category,
      name: name.trim(),
      hindiName: hindiName.trim() || undefined,
      tagline: tagline.trim() || category.tagline,
      description: description.trim() || category.description,
      coverUrl: coverUrl.trim() || category.coverUrl,
      wallpaperUrl: wallpaperUrl.trim() || category.wallpaperUrl,
      themeColor: themeColor || category.themeColor,
      tags: tags.length > 0 ? tags : category.tags
    });

    onClose();
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    onDeleteCategory(category.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0b0a] border border-orange-500/20 p-6 md:p-8 shadow-2xl text-neutral-100 ring-1 ring-white/10">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-orange-400">Settings</span>
            <h2 className="text-xl font-serif-vintage italic text-white">Edit Space</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                Space Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                Hindi / Subtitle
              </label>
              <input
                type="text"
                value={hindiName}
                onChange={(e) => setHindiName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500 font-hindi"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
              Short Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500 resize-none"
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
                  className={`w-7 h-7 rounded-full transition-transform ${themeColor === c ? 'scale-110 ring-2 ring-orange-400 ring-offset-2 ring-offset-[#0c0b0a]' : 'opacity-80'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Cover URL */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
              Cover Image URL
            </label>
            <input
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
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
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={handleDelete}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                confirmDelete 
                  ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse' 
                  : 'bg-red-950/40 text-red-400 hover:bg-red-900/60 hover:text-red-300'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              {confirmDelete ? 'Confirm Delete' : 'Delete Space'}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-orange-500 hover:bg-orange-400 text-black text-xs font-bold font-mono uppercase tracking-wider shadow-lg flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" /> Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
