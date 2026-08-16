import React, { useState } from 'react';
import { 
  Plus, 
  Play, 
  Pause, 
  Disc3, 
  Music, 
  ListPlus, 
  Edit3, 
  Trash2, 
  Search, 
  Sparkles, 
  Radio, 
  FileJson, 
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  Flame,
  Truck
} from 'lucide-react';
import { Category, Song } from '../types';
import { formatTime } from '../utils/youtube';

interface CategoryGridProps {
  categories: Category[];
  activeCategoryId?: string;
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayCategory: (category: Category) => void;
  onPlaySong: (category: Category, song: Song) => void;
  onOpenAddCategory: () => void;
  onOpenAddSong: (categoryId?: string) => void;
  onOpenEditCategory: (category: Category) => void;
  onDeleteCategory: (id: string) => void;
  onOpenExportImport: () => void;
  onEnterCabinView: (category?: Category) => void;
  onTriggerHorn: () => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  activeCategoryId,
  currentSong,
  isPlaying,
  onPlayCategory,
  onPlaySong,
  onOpenAddCategory,
  onOpenAddSong,
  onOpenEditCategory,
  onDeleteCategory,
  onOpenExportImport,
  onEnterCabinView,
  onTriggerHorn
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Extract all unique tags
  const allTags = ['All', ...Array.from(new Set(categories.flatMap(c => c.tags)))];

  // Filter categories
  const filteredCategories = categories.filter(cat => {
    const matchesSearch = 
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cat.hindiName && cat.hindiName.includes(searchQuery)) ||
      cat.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.songs.some(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.artist.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = selectedTag === 'All' || cat.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const totalSongs = categories.reduce((sum, cat) => sum + cat.songs.length, 0);

  return (
    <div className="relative z-10 min-h-screen pt-16 pb-40 px-4 md:px-12 max-w-7xl mx-auto text-[#fdf2f2]">
      
      {/* 1. Sleek Interface Header: Title & Quote */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end pt-6 pb-6 gap-4 border-b border-white/10">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange-500 font-mono-sleek text-xs tracking-[0.3em] uppercase">Vintage Digital Archive</span>
            <span className="text-white/20">•</span>
            <span className="text-[11px] text-white/40 font-mono uppercase tracking-wider">CatSongs v4.2</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif-vintage italic tracking-tight text-glow-orange text-[#fdf2f2]">
            Cat<span className="text-orange-400">Songs</span>
          </h1>
        </div>

        <div className="md:text-right max-w-sm">
          <p className="text-xs sm:text-sm text-orange-200/70 italic leading-relaxed font-serif-vintage">
            "The scent of old paper, rain on the windshield, and the warm hum of a tube amp on the highway..."
          </p>
          <div className="mt-2 flex items-center md:justify-end gap-3 text-[11px] font-mono-sleek text-neutral-400">
            <span>{categories.length} Spaces</span>
            <span>•</span>
            <span>{totalSongs} Tracks</span>
            <span>•</span>
            <button 
              onClick={onTriggerHorn}
              className="text-orange-400 hover:text-orange-300 font-semibold underline underline-offset-4 decoration-orange-500/50"
            >
              Honk [H]
            </button>
          </div>
        </div>
      </header>

      {/* 2. Controls & Filter Bar */}
      <div className="mt-6 mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Action Buttons: New Category, Export, Add Songs */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={onOpenAddCategory}
              className="px-4 py-2 bg-orange-600/20 border border-orange-500/40 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-orange-500/40 text-orange-200 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" /> New Category
            </button>

            <button
              onClick={() => onOpenAddSong()}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-white/10 text-neutral-200 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <ListPlus className="w-3.5 h-3.5 text-orange-400" /> Add Tracks
            </button>

            <button
              onClick={onOpenExportImport}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-white/10 text-neutral-200 transition-all flex items-center gap-1.5"
            >
              <FileJson className="w-3.5 h-3.5 text-orange-400" /> Backup / Sync
            </button>
          </div>

          {/* Search & Live Session Badge */}
          <div className="flex items-center gap-3 flex-1 max-w-md ml-auto">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-orange-400/70 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection, artist, track..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/60 backdrop-blur-md transition-colors"
              />
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[10px] text-orange-500/90 uppercase tracking-widest font-bold font-mono whitespace-nowrap px-3 py-2 rounded-full bg-orange-950/30 border border-orange-500/20">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>Live Session</span>
            </div>
          </div>
        </div>

        {/* Tag Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-500/20'
                  : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-neutral-200 hover:bg-white/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Category Grid in Sleek Interface Card Aesthetics */}
      {filteredCategories.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white/5 backdrop-blur-md border border-dashed border-white/15 my-12">
          <Music className="w-10 h-10 text-orange-400/50 mx-auto mb-3" />
          <h3 className="text-lg font-serif-vintage italic text-white mb-1">No Collections Found</h3>
          <p className="text-xs text-neutral-400 mb-4 font-mono">No mixtapes match your search criteria.</p>
          <button
            onClick={onOpenAddCategory}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-black text-xs uppercase font-bold tracking-wider rounded-full shadow-lg"
          >
            Create New Space
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const isCategoryActive = activeCategoryId === category.id;

            return (
              <div
                key={category.id}
                className={`group relative bg-white/5 backdrop-blur-md border rounded-2xl p-6 flex flex-col justify-between hover:bg-white/10 hover:border-orange-500/40 transition-all duration-300 ${
                  isCategoryActive
                    ? 'border-orange-500/60 ring-1 ring-orange-500/30 bg-white/[0.08] shadow-xl shadow-orange-950/30'
                    : 'border-white/10'
                }`}
              >
                {/* Top: Title & Controls */}
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-serif-vintage italic text-white truncate group-hover:text-orange-300 transition-colors">
                          {category.name}
                        </h3>
                        {category.hindiName && (
                          <span className="text-xs font-hindi text-orange-400/80 px-2 py-0.5 rounded bg-orange-950/40 border border-orange-500/20">
                            {category.hindiName}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                        {category.songs.length} Tracks • {category.tagline}
                      </p>
                    </div>

                    {/* Action icons on hover */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); onOpenEditCategory(category); }}
                        className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-orange-300 transition-colors"
                        title="Edit Space"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          if (confirm(`Delete space "${category.name}"?`)) onDeleteCategory(category.id); 
                        }}
                        className="p-1.5 rounded hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                        title="Delete Space"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Artwork Preview Strip */}
                  <div className="relative aspect-[16/8] w-full rounded-xl overflow-hidden mt-4 mb-3 bg-neutral-950 border border-white/10">
                    <img
                      src={category.coverUrl}
                      alt={category.name}
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Play Button Overlay */}
                    <button
                      onClick={() => onPlayCategory(category)}
                      className="absolute bottom-2.5 right-2.5 w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-400 text-black flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                      title="Play Collection"
                    >
                      {isCategoryActive && isPlaying ? (
                        <Pause className="w-4 h-4 fill-black" />
                      ) : (
                        <Play className="w-4 h-4 fill-black ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={() => onEnterCabinView(category)}
                      className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/75 hover:bg-black text-[10px] text-orange-200 uppercase font-mono tracking-wider flex items-center gap-1 border border-white/15"
                      title="Enter Scenic Highway Cabin"
                    >
                      <Radio className="w-3 h-3 text-orange-400" />
                      <span>Cabin POV</span>
                    </button>
                  </div>

                  {/* Track Snippets */}
                  <div className="space-y-1 my-3">
                    {category.songs.slice(0, 2).map((song, idx) => {
                      const isThisSong = currentSong?.id === song.id;
                      return (
                        <div
                          key={song.id}
                          onClick={() => onPlaySong(category, song)}
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                            isThisSong
                              ? 'bg-orange-500/20 text-orange-300 font-medium'
                              : 'bg-black/20 hover:bg-white/10 text-neutral-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <span className="text-[10px] font-mono text-neutral-500">{idx + 1}.</span>
                            <span className="truncate">{song.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                            {formatTime(song.duration)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {category.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-orange-950/40 border border-orange-500/20 rounded text-[9px] uppercase font-mono text-orange-300/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action: Open Collection */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                  <button
                    onClick={() => onPlayCategory(category)}
                    className="flex-1 py-2 bg-white/10 rounded-lg text-xs uppercase font-bold tracking-widest hover:bg-orange-500 hover:text-black transition-all flex items-center justify-center gap-2"
                  >
                    <Disc3 className={`w-3.5 h-3.5 ${isCategoryActive && isPlaying ? 'animate-spin' : ''}`} />
                    <span>Open Collection</span>
                  </button>

                  <button
                    onClick={() => onOpenAddSong(category.id)}
                    className="p-2 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg text-neutral-300 hover:text-orange-400 transition-colors"
                    title="Add Song to Space"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Create New Space Dashed Card from Sleek Interface design */}
          <div
            onClick={onOpenAddCategory}
            className="bg-white/5 backdrop-blur-md border border-dashed border-white/20 rounded-2xl p-6 min-h-[280px] flex flex-col items-center justify-center group hover:border-orange-500/50 hover:bg-orange-500/5 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-2xl group-hover:bg-orange-500 group-hover:text-black transition-all group-hover:border-orange-500">
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="mt-4 text-[11px] uppercase font-mono font-bold tracking-widest text-white/40 group-hover:text-orange-300 transition-colors">
              Create New Space
            </span>
            <span className="text-[10px] text-neutral-500 mt-1 font-mono">Add bespoke road collection</span>
          </div>
        </div>
      )}
    </div>
  );
};
