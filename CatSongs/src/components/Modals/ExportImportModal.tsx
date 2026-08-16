import React, { useState } from 'react';
import { X, Download, Upload, RefreshCw, Copy, Check, FileJson } from 'lucide-react';
import { Category } from '../../types';

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onImportData: (importedCategories: Category[]) => void;
  onResetToDefaults: () => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
  isOpen,
  onClose,
  categories,
  onImportData,
  onResetToDefaults
}) => {
  const [jsonInput, setJsonInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const currentJsonString = React.useMemo(() => {
    try {
      const cleanCategories = categories.map(c => ({
        id: String(c.id),
        name: String(c.name),
        hindiName: c.hindiName ? String(c.hindiName) : undefined,
        tagline: String(c.tagline || ''),
        description: String(c.description || ''),
        coverUrl: String(c.coverUrl || ''),
        wallpaperUrl: String(c.wallpaperUrl || ''),
        themeColor: String(c.themeColor || '#f97316'),
        tags: Array.isArray(c.tags) ? c.tags.map(String) : [],
        songs: Array.isArray(c.songs) ? c.songs.map(s => ({
          id: String(s.id),
          title: String(s.title),
          artist: String(s.artist),
          youtubeUrl: String(s.youtubeUrl),
          youtubeId: String(s.youtubeId),
          duration: Number(s.duration) || 240,
          thumbnail: s.thumbnail ? String(s.thumbnail) : undefined,
          note: s.note ? String(s.note) : undefined,
          addedAt: Number(s.addedAt) || Date.now(),
          categoryId: String(s.categoryId)
        })) : [],
        createdAt: Number(c.createdAt) || Date.now()
      }));
      return JSON.stringify(cleanCategories, null, 2);
    } catch {
      return '[]';
    }
  }, [categories]);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(currentJsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([currentJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `catsongs_mixtapes_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('JSON must be an array of category objects');
      }

      // Basic validation
      const validCategories: Category[] = parsed.map((item: any, idx: number) => ({
        id: item.id || `cat_imported_${Date.now()}_${idx}`,
        name: item.name || `Imported Mixtape ${idx + 1}`,
        hindiName: item.hindiName,
        tagline: item.tagline || 'Custom Playlist',
        description: item.description || '',
        coverUrl: item.coverUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
        wallpaperUrl: item.wallpaperUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2070&q=85',
        themeColor: item.themeColor || '#f97316',
        tags: Array.isArray(item.tags) ? item.tags : ['Imported'],
        songs: Array.isArray(item.songs) ? item.songs : [],
        createdAt: item.createdAt || Date.now()
      }));

      onImportData(validCategories);
      setSuccess(`Successfully imported ${validCategories.length} categories!`);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON format. Please verify your data.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0b0a] border border-orange-500/20 p-6 md:p-8 shadow-2xl text-neutral-100 ring-1 ring-white/10">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-orange-400">Data Sync</span>
              <h2 className="text-xl font-serif-vintage italic text-white">Backup & Sync JSON</h2>
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

        {success && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-200 text-xs font-mono">
            {success}
          </div>
        )}

        {/* 1. Export Section */}
        <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Export Current Archive</h3>
              <p className="text-xs text-neutral-400 font-mono">Save all {categories.length} spaces & tracks as JSON</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyJson}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-neutral-200 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy JSON'}
              </button>
              <button
                type="button"
                onClick={handleDownloadFile}
                className="px-4 py-1.5 rounded-full bg-orange-500 hover:bg-orange-400 text-black text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5" /> Download .json
              </button>
            </div>
          </div>
        </div>

        {/* 2. Import Section */}
        <form onSubmit={handleImportSubmit} className="mt-4 space-y-3">
          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
            Paste JSON to Import Spaces & Playlists
          </label>
          <textarea
            rows={5}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={`[\n  {\n    "name": "My Custom Space",\n    "songs": [...]\n  }\n]`}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-neutral-200 font-mono focus:outline-none focus:border-orange-500 resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!jsonInput.trim()}
              className="px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-black text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 shadow"
            >
              <Upload className="w-3.5 h-3.5" /> Import & Replace
            </button>
          </div>
        </form>

        {/* 3. Reset to Original Presets */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset all categories to original nostalgic defaults?')) {
                onResetToDefaults();
                onClose();
              }
            }}
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 font-mono"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Restore Default Highway Categories
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
