import React from 'react';
import { X, Play, Pause, Trash2, Plus, Music, Disc3, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';
import { Category, Song } from '../../types';
import { formatTime } from '../../utils/youtube';

interface PlaylistQueueDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentCategory: Category | null;
  categories: Category[];
  onSelectCategory: (category: Category) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onRemoveSong: (categoryId: string, songId: string) => void;
  onMoveSong: (categoryId: string, fromIndex: number, toIndex: number) => void;
  onOpenAddSong: (categoryId: string) => void;
}

export const PlaylistQueueDrawer: React.FC<PlaylistQueueDrawerProps> = ({
  isOpen,
  onClose,
  currentCategory,
  categories,
  onSelectCategory,
  currentSong,
  isPlaying,
  onPlaySong,
  onRemoveSong,
  onMoveSong,
  onOpenAddSong
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-md h-full bg-[#0c0b0a]/95 border-l border-orange-500/20 p-6 shadow-2xl flex flex-col text-neutral-100 ring-1 ring-white/10 animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Disc3 className="w-4 h-4 animate-spin" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-orange-400">Queue Station</span>
              <h2 className="text-base font-serif-vintage italic text-white">Deck Tracklist</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Switcher Pills */}
        <div className="py-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-white/5">
          {categories.map((cat) => {
            const isSelected = currentCategory?.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-orange-500 text-black font-bold shadow-md'
                    : 'bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-400'}`}>
                  {cat.songs.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Song List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2">
          {(!currentCategory || currentCategory.songs.length === 0) ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-orange-500/20 rounded-2xl bg-white/5">
              <Music className="w-8 h-8 text-neutral-500 mb-2 animate-bounce" />
              <p className="text-sm font-serif-vintage italic text-neutral-200">Empty Mixtape</p>
              <p className="text-xs text-neutral-400 font-mono mt-1 mb-4">No tracks added to this space yet.</p>
              {currentCategory && (
                <button
                  onClick={() => onOpenAddSong(currentCategory.id)}
                  className="px-4 py-2 rounded-full bg-orange-500 text-black text-xs font-bold font-mono uppercase tracking-wider shadow-md hover:bg-orange-400 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Songs Now
                </button>
              )}
            </div>
          ) : (
            currentCategory.songs.map((song, idx) => {
              const isCurrent = currentSong?.id === song.id;
              return (
                <div
                  key={song.id}
                  className={`group flex items-center justify-between p-2.5 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-orange-500/15 border-orange-500/40 text-white shadow-md'
                      : 'bg-white/5 border-white/5 hover:border-white/20 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  {/* Left: Play button + Thumbnail + Details */}
                  <div 
                    onClick={() => onPlaySong(song)}
                    className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                  >
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-neutral-800 border border-white/10">
                      <img
                        src={song.thumbnail || `https://img.youtube.com/vi/${song.youtubeId}/hqdefault.jpg`}
                        alt={song.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        {isCurrent && isPlaying ? (
                          <Pause className="w-4 h-4 text-orange-400 fill-orange-400" />
                        ) : (
                          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                        )}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-medium truncate ${isCurrent ? 'text-orange-300 font-bold' : 'text-neutral-100'}`}>
                        {song.title}
                      </p>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5 font-mono">
                        {song.artist}
                      </p>
                      {song.note && (
                        <p className="text-[10px] text-orange-400/80 truncate italic">
                          "{song.note}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Duration + Reorder & Delete */}
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span className="text-[10px] font-mono text-neutral-400 pr-1">
                      {formatTime(song.duration)}
                    </span>

                    {/* Move Up/Down Controls */}
                    <div className="flex flex-col gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
                      {idx > 0 && (
                        <button
                          onClick={() => onMoveSong(currentCategory.id, idx, idx - 1)}
                          className="p-1 hover:text-orange-400 text-neutral-400"
                          title="Move up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                      )}
                      {idx < currentCategory.songs.length - 1 && (
                        <button
                          onClick={() => onMoveSong(currentCategory.id, idx, idx + 1)}
                          className="p-1 hover:text-orange-400 text-neutral-400"
                          title="Move down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Delete Song button */}
                    <button
                      onClick={() => onRemoveSong(currentCategory.id, song.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/20 text-neutral-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove track"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {currentCategory && (
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => onOpenAddSong(currentCategory.id)}
              className="w-full py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-black text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" /> Add Tracks to Space
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
