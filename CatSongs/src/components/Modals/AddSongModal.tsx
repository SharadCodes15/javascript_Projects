import React, { useState } from 'react';
import { X, Plus, Music, ListPlus, Youtube, Sparkles, Check, Link, FileText } from 'lucide-react';
import { Category, Song } from '../../types';
import { extractYouTubeId, extractPlaylistId, getYouTubeThumbnail, parseDurationInput, KNOWN_NOSTALGIC_PLAYLISTS } from '../../utils/youtube';

interface AddSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  defaultCategoryId?: string;
  onAddSong: (categoryId: string, song: Omit<Song, 'id' | 'addedAt' | 'categoryId'>) => void;
  onAddMultipleSongs: (categoryId: string, songs: Omit<Song, 'id' | 'addedAt' | 'categoryId'>[]) => void;
}

export const AddSongModal: React.FC<AddSongModalProps> = ({
  isOpen,
  onClose,
  categories,
  defaultCategoryId,
  onAddSong,
  onAddMultipleSongs
}) => {
  const [tab, setTab] = useState<'single' | 'playlist'>('single');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    typeof defaultCategoryId === 'string' && defaultCategoryId ? defaultCategoryId : (categories[0]?.id || '')
  );

  // Single Song Form State
  const [ytUrl, setYtUrl] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [durationStr, setDurationStr] = useState('3:45');
  const [note, setNote] = useState('');
  const [customThumbnail, setCustomThumbnail] = useState('');
  const [error, setError] = useState('');

  // Playlist Form State
  const [playlistInput, setPlaylistInput] = useState('');
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [batchPreset, setBatchPreset] = useState<string>('');

  React.useEffect(() => {
    if (typeof defaultCategoryId === 'string' && defaultCategoryId) {
      setSelectedCategoryId(defaultCategoryId);
    } else if (categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [defaultCategoryId, categories, isOpen]);

  if (!isOpen) return null;

  // Auto detect YouTube video info on URL paste
  const handleUrlChange = (url: string) => {
    setYtUrl(url);
    setError('');
    const id = extractYouTubeId(url);
    if (id) {
      setCustomThumbnail(getYouTubeThumbnail(id));
      if (!title) {
        // Provide friendly default if user hasn't typed
        setTitle(`Track (${id})`);
      }
    }
  };

  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategoryId) {
      setError('Please select a category');
      return;
    }
    const ytId = extractYouTubeId(ytUrl);
    if (!ytId) {
      setError('Please enter a valid YouTube video URL or ID');
      return;
    }
    if (!title.trim()) {
      setError('Please enter a song title');
      return;
    }

    onAddSong(selectedCategoryId, {
      title: title.trim(),
      artist: artist.trim() || 'Indian Roadways Classics',
      youtubeUrl: ytUrl.trim(),
      youtubeId: ytId,
      duration: parseDurationInput(durationStr),
      thumbnail: customThumbnail || getYouTubeThumbnail(ytId),
      note: note.trim() || undefined
    });

    onClose();
  };

  const handlePlaylistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategoryId) {
      setError('Please select a category');
      return;
    }

    const songsToAdd: Omit<Song, 'id' | 'addedAt' | 'categoryId'>[] = [];

    // Check if preset selected
    if (batchPreset && KNOWN_NOSTALGIC_PLAYLISTS[batchPreset]) {
      const presetSongs = KNOWN_NOSTALGIC_PLAYLISTS[batchPreset];
      presetSongs.forEach(s => {
        if (s.youtubeId && s.title) {
          songsToAdd.push({
            title: s.title,
            artist: s.artist || 'Classic Road Trip',
            youtubeUrl: `https://www.youtube.com/watch?v=${s.youtubeId}`,
            youtubeId: s.youtubeId,
            duration: s.duration || 240,
            thumbnail: getYouTubeThumbnail(s.youtubeId),
            note: 'Imported Nostalgic Pack'
          });
        }
      });
    } else if (playlistInput.trim()) {
      // Try parsing JSON format
      try {
        const parsed = JSON.parse(playlistInput);
        if (Array.isArray(parsed)) {
          parsed.forEach((item: any) => {
            const ytId = item.youtubeId || extractYouTubeId(item.youtubeUrl || item.url || '');
            if (ytId && (item.title || item.name)) {
              songsToAdd.push({
                title: item.title || item.name,
                artist: item.artist || item.singer || 'Indian Highway Classics',
                youtubeUrl: item.youtubeUrl || `https://www.youtube.com/watch?v=${ytId}`,
                youtubeId: ytId,
                duration: item.duration || 240,
                thumbnail: item.thumbnail || getYouTubeThumbnail(ytId),
                note: item.note
              });
            }
          });
        }
      } catch {
        // If not JSON, parse lines of YouTube URLs
        const lines = playlistInput.split('\n');
        lines.forEach((line, index) => {
          const trimmed = line.trim();
          if (trimmed) {
            const ytId = extractYouTubeId(trimmed);
            if (ytId) {
              songsToAdd.push({
                title: `Roadway Track ${index + 1}`,
                artist: 'Various Artists',
                youtubeUrl: trimmed.startsWith('http') ? trimmed : `https://www.youtube.com/watch?v=${ytId}`,
                youtubeId: ytId,
                duration: 240,
                thumbnail: getYouTubeThumbnail(ytId)
              });
            }
          }
        });
      }
    }

    if (songsToAdd.length === 0) {
      setError('No valid songs found. Enter YouTube URLs, JSON array, or choose a curated pack.');
      return;
    }

    onAddMultipleSongs(selectedCategoryId, songsToAdd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0b0a] border border-orange-500/20 p-6 md:p-8 shadow-2xl text-neutral-100 ring-1 ring-white/10">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-orange-400">Audio Intake</span>
            <h2 className="text-xl font-serif-vintage italic text-white">Add Tracks to Space</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Individual vs Playlist Import */}
        <div className="flex rounded-full bg-white/5 p-1 mt-4 border border-white/10">
          <button
            type="button"
            onClick={() => { setTab('single'); setError(''); }}
            className={`flex-1 py-2 rounded-full text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
              tab === 'single'
                ? 'bg-orange-500 text-black font-bold shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Music className="w-3.5 h-3.5" /> Individual Track
          </button>
          <button
            type="button"
            onClick={() => { setTab('playlist'); setError(''); }}
            className={`flex-1 py-2 rounded-full text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
              tab === 'playlist'
                ? 'bg-orange-500 text-black font-bold shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ListPlus className="w-3.5 h-3.5" /> Playlist / Batch
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-900/30 border border-red-500/30 text-red-200 text-xs font-mono">
            {error}
          </div>
        )}

        {/* Target Category Selector */}
        <div className="mt-4">
          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
            Target Space *
          </label>
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-[#141210] text-white">
                {cat.name} {cat.hindiName ? `(${cat.hindiName})` : ''} — {cat.songs.length} tracks
              </option>
            ))}
          </select>
        </div>

        {/* TAB 1: INDIVIDUAL SONG FORM */}
        {tab === 'single' && (
          <form onSubmit={handleSingleSubmit} className="space-y-3.5 mt-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                YouTube URL or Video ID *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={ytUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=B_kPjKqf8z0"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500"
                  required
                />
                <Youtube className="w-4 h-4 text-red-500 absolute left-3 top-3" />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 font-mono">Supports standard YouTube URLs, Shorts, or 11-char IDs</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Track Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Chaiyya Chaiyya"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Artist / Singer / Channel
                </label>
                <input
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="e.g. Sukhwinder Singh • Dil Se"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Duration (mm:ss)
                </label>
                <input
                  type="text"
                  value={durationStr}
                  onChange={(e) => setDurationStr(e.target.value)}
                  placeholder="4:15"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Archive Note / Memory
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Highway memory note"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Thumbnail Preview */}
            {customThumbnail && (
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                <img
                  src={customThumbnail}
                  alt="preview"
                  className="w-16 h-10 object-cover rounded-lg"
                />
                <div className="text-xs">
                  <p className="font-semibold text-white truncate">{title || 'YouTube Thumbnail'}</p>
                  <p className="text-[11px] text-orange-400 font-mono">✓ Video recognized</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
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
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" /> Save Track
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: PLAYLIST / BATCH IMPORT */}
        {tab === 'playlist' && (
          <form onSubmit={handlePlaylistSubmit} className="space-y-4 mt-4">
            {/* Quick Preset Packs */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                Quick Nostalgic Curated Packs
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setBatchPreset(batchPreset === '90s_bollywood' ? '' : '90s_bollywood')}
                  className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                    batchPreset === '90s_bollywood'
                      ? 'bg-orange-500/20 border-orange-400 text-orange-300'
                      : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  <p className="font-bold">90s Bollywood</p>
                  <p className="text-[10px] text-neutral-400 font-mono">6 Tracks</p>
                </button>

                <button
                  type="button"
                  onClick={() => setBatchPreset(batchPreset === 'highway_drive' ? '' : 'highway_drive')}
                  className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                    batchPreset === 'highway_drive'
                      ? 'bg-orange-500/20 border-orange-400 text-orange-300'
                      : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  <p className="font-bold">Highway Wander</p>
                  <p className="text-[10px] text-neutral-400 font-mono">5 Tracks</p>
                </button>

                <button
                  type="button"
                  onClick={() => setBatchPreset(batchPreset === 'retro_pop' ? '' : 'retro_pop')}
                  className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                    batchPreset === 'retro_pop'
                      ? 'bg-orange-500/20 border-orange-400 text-orange-300'
                      : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  <p className="font-bold">Indie Pop Era</p>
                  <p className="text-[10px] text-neutral-400 font-mono">5 Tracks</p>
                </button>
              </div>
            </div>

            {/* Custom URLs or JSON Input */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                Paste YouTube URLs or JSON Array
              </label>
              <textarea
                rows={4}
                value={playlistInput}
                onChange={(e) => { setPlaylistInput(e.target.value); setBatchPreset(''); }}
                placeholder={`https://www.youtube.com/watch?v=B_kPjKqf8z0\nhttps://www.youtube.com/watch?v=YOYN9qNXmAw\nhttps://www.youtube.com/watch?v=x_elT6zkqN0`}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-orange-500 resize-none"
              />
              <p className="text-[11px] text-neutral-400 mt-1 font-mono">
                Paste YouTube URLs or full JSON array with <code className="text-orange-300">[{'{"title": "...", "youtubeUrl": "..."}'}]</code>
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
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
                <Sparkles className="w-3.5 h-3.5" /> Import Tracks
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
