/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Category, Song, VisualSettings, AmbientSoundType, RepeatMode } from './types';
import { INITIAL_CATEGORIES, WALLPAPER_PRESETS } from './data/defaultCategories';
import { Navbar } from './components/Navbar';
import { MusicPlayer } from './components/MusicPlayer';
import { ImmersiveCabinView } from './components/ImmersiveCabinView';
import { CategoryGrid } from './components/CategoryGrid';
import { YouTubeEngine } from './components/YouTubeEngine';
import { AddCategoryModal } from './components/Modals/AddCategoryModal';
import { EditCategoryModal } from './components/Modals/EditCategoryModal';
import { AddSongModal } from './components/Modals/AddSongModal';
import { WallpaperCustomizerModal } from './components/Modals/WallpaperCustomizerModal';
import { PlaylistQueueDrawer } from './components/Modals/PlaylistQueueDrawer';
import { ExportImportModal } from './components/Modals/ExportImportModal';
import { playTruckHorn, playCassetteClick, ambientAudio } from './utils/audioSynthesizer';

const STORAGE_CATEGORIES_KEY = 'catsongs_categories_v2';
const STORAGE_VISUAL_KEY = 'catsongs_visual_v2';

const DEFAULT_VISUAL_SETTINGS: VisualSettings = {
  wallpaperUrl: WALLPAPER_PRESETS[0].url,
  wallpaperName: WALLPAPER_PRESETS[0].name,
  showGarlands: true,
  showDashboard: true,
  showWipers: true,
  wipersActive: false,
  showFilmGrain: true,
  showCabinOverlays: true,
  blurBackground: false
};

export default function App() {
  // 1. Core State: Categories & Persistence
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CATEGORIES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const valid = parsed.filter(c => c && typeof c === 'object' && typeof c.id === 'string' && typeof c.name === 'string');
          if (valid.length > 0) return valid;
        }
      }
    } catch (e) {
      console.warn('Error reading stored categories:', e);
    }
    return INITIAL_CATEGORIES;
  });

  // 2. Visual Aesthetic Settings
  const [visualSettings, setVisualSettings] = useState<VisualSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_VISUAL_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...DEFAULT_VISUAL_SETTINGS, ...parsed };
        }
      }
    } catch (e) {
      console.warn('Error reading stored visual settings:', e);
    }
    return DEFAULT_VISUAL_SETTINGS;
  });

  // 3. Navigation View State: 'home' (Category Grid) vs 'cabin' (Scenic Himalayan Truck View)
  const [currentView, setCurrentView] = useState<'home' | 'cabin'>('home');

  // 4. Music Playback State
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id || '');
  const [currentSong, setCurrentSong] = useState<Song | null>(categories[0]?.songs[0] || null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(categories[0]?.songs[0]?.duration || 427);
  const [seekTarget, setSeekTarget] = useState<number | null>(null);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('all');
  const [isShuffled, setIsShuffled] = useState<boolean>(false);

  // 5. Ambient Sound State
  const [ambientSound, setAmbientSound] = useState<AmbientSoundType>('off');
  const [isHornActive, setIsHornActive] = useState<boolean>(false);

  // 6. Modal Open States
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddSongOpen, setIsAddSongOpen] = useState(false);
  const [addSongTargetCategoryId, setAddSongTargetCategoryId] = useState<string>('');
  const [isWallpaperModalOpen, setIsWallpaperModalOpen] = useState(false);
  const [isQueueDrawerOpen, setIsQueueDrawerOpen] = useState(false);
  const [isExportImportOpen, setIsExportImportOpen] = useState(false);

  // Safe save categories to localStorage
  useEffect(() => {
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
      localStorage.setItem(STORAGE_CATEGORIES_KEY, JSON.stringify(cleanCategories));
    } catch (e) {
      console.warn('Failed to save categories to localStorage:', e);
    }
  }, [categories]);

  // Safe save visual settings to localStorage
  useEffect(() => {
    try {
      const cleanSettings = {
        wallpaperUrl: String(visualSettings.wallpaperUrl || DEFAULT_VISUAL_SETTINGS.wallpaperUrl),
        wallpaperName: String(visualSettings.wallpaperName || DEFAULT_VISUAL_SETTINGS.wallpaperName),
        showGarlands: Boolean(visualSettings.showGarlands),
        showDashboard: Boolean(visualSettings.showDashboard),
        showWipers: Boolean(visualSettings.showWipers),
        wipersActive: Boolean(visualSettings.wipersActive),
        showFilmGrain: Boolean(visualSettings.showFilmGrain),
        showCabinOverlays: Boolean(visualSettings.showCabinOverlays),
        blurBackground: Boolean(visualSettings.blurBackground)
      };
      localStorage.setItem(STORAGE_VISUAL_KEY, JSON.stringify(cleanSettings));
    } catch (e) {
      console.warn('Failed to save visual settings to localStorage:', e);
    }
  }, [visualSettings]);

  // Active Category derived
  const activeCategory = useMemo(() => {
    return categories.find(c => c.id === activeCategoryId) || categories[0] || null;
  }, [categories, activeCategoryId]);

  // Handle Horn Trigger with audio + visual shake
  const triggerHorn = useCallback(() => {
    playTruckHorn();
    setIsHornActive(true);
    setTimeout(() => setIsHornActive(false), 1200);
  }, []);

  // Keyboard shortcut listener ('H' for horn, Space for Play/Pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        triggerHorn();
      } else if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerHorn]);

  // Ambient sound management
  const handleAmbientChange = (type: AmbientSoundType) => {
    setAmbientSound(type);
    if (type === 'off') {
      ambientAudio.stop();
    } else {
      ambientAudio.start(type, 0.25);
    }
  };

  // Playback Control Handlers
  const handlePlayPause = () => {
    playCassetteClick();
    setIsPlaying(prev => !prev);
  };

  const handleSeek = (time: number) => {
    setSeekTarget(time);
    setCurrentTime(time);
  };

  const handleNextTrack = useCallback(() => {
    if (!activeCategory || activeCategory.songs.length === 0) return;
    playCassetteClick();

    const songList = activeCategory.songs;
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * songList.length);
      setCurrentSong(songList[randomIndex]);
      setCurrentTime(0);
      setIsPlaying(true);
      return;
    }

    const currentIndex = songList.findIndex(s => s.id === currentSong?.id);
    if (currentIndex >= 0 && currentIndex < songList.length - 1) {
      setCurrentSong(songList[currentIndex + 1]);
      setCurrentTime(0);
      setIsPlaying(true);
    } else if (repeatMode === 'all') {
      // Loop back to start
      setCurrentSong(songList[0]);
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [activeCategory, currentSong, isShuffled, repeatMode]);

  const handlePrevTrack = useCallback(() => {
    if (!activeCategory || activeCategory.songs.length === 0) return;
    playCassetteClick();

    const songList = activeCategory.songs;
    const currentIndex = songList.findIndex(s => s.id === currentSong?.id);
    if (currentIndex > 0) {
      setCurrentSong(songList[currentIndex - 1]);
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      // Go to last song
      setCurrentSong(songList[songList.length - 1]);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  }, [activeCategory, currentSong]);

  const handleTrackEnded = () => {
    if (repeatMode === 'one') {
      handleSeek(0);
      setIsPlaying(true);
    } else {
      handleNextTrack();
    }
  };

  // Play Category from Grid or Carousel
  const handlePlayCategory = (category: Category) => {
    if (!category || typeof category !== 'object' || typeof category.id !== 'string') return;
    setActiveCategoryId(category.id);
    if (Array.isArray(category.songs) && category.songs.length > 0) {
      setCurrentSong(category.songs[0]);
      setCurrentTime(0);
      setIsPlaying(true);
      playCassetteClick();
    }
  };

  // Play a specific Song inside a category
  const handlePlaySong = (category: Category, song: Song) => {
    if (category && typeof category.id === 'string') {
      setActiveCategoryId(category.id);
    }
    if (song && typeof song === 'object' && typeof song.id === 'string') {
      setCurrentSong(song);
      setCurrentTime(0);
      setIsPlaying(true);
      playCassetteClick();
    }
  };

  // Enter Cabin view for a given category
  const handleEnterCabinView = (category?: Category) => {
    if (category && typeof category === 'object' && typeof category.id === 'string') {
      setActiveCategoryId(category.id);
      if (category.wallpaperUrl) {
        setVisualSettings(prev => ({
          ...prev,
          wallpaperUrl: String(category.wallpaperUrl),
          wallpaperName: String(category.name || 'Cabin View')
        }));
      }
      if (!currentSong && Array.isArray(category.songs) && category.songs.length > 0) {
        setCurrentSong(category.songs[0]);
        setIsPlaying(true);
      }
    }
    setCurrentView('cabin');
  };

  // CRUD Operations on Categories
  const handleAddCategory = (newCat: Omit<Category, 'id' | 'createdAt'>) => {
    if (!newCat || typeof newCat !== 'object') return;
    const created: Category = {
      name: String(newCat.name || 'New Space'),
      hindiName: newCat.hindiName ? String(newCat.hindiName) : undefined,
      tagline: String(newCat.tagline || 'Custom Playlist'),
      description: String(newCat.description || ''),
      coverUrl: String(newCat.coverUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'),
      wallpaperUrl: String(newCat.wallpaperUrl || WALLPAPER_PRESETS[0].url),
      themeColor: String(newCat.themeColor || '#f97316'),
      tags: Array.isArray(newCat.tags) ? newCat.tags.map(String) : ['Nostalgia'],
      songs: Array.isArray(newCat.songs) ? newCat.songs : [],
      id: `cat_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      createdAt: Date.now()
    };
    setCategories(prev => [created, ...prev]);
    setActiveCategoryId(created.id);
  };

  const handleUpdateCategory = (updated: Category) => {
    if (!updated || typeof updated.id !== 'string') return;
    const sanitized: Category = {
      id: String(updated.id),
      name: String(updated.name || 'Untitled Space'),
      hindiName: updated.hindiName ? String(updated.hindiName) : undefined,
      tagline: String(updated.tagline || ''),
      description: String(updated.description || ''),
      coverUrl: String(updated.coverUrl || ''),
      wallpaperUrl: String(updated.wallpaperUrl || ''),
      themeColor: String(updated.themeColor || '#f97316'),
      tags: Array.isArray(updated.tags) ? updated.tags.map(String) : [],
      songs: Array.isArray(updated.songs) ? updated.songs : [],
      createdAt: typeof updated.createdAt === 'number' ? updated.createdAt : Date.now()
    };
    setCategories(prev => prev.map(c => c.id === sanitized.id ? sanitized : c));
  };

  const handleDeleteCategory = (id: string) => {
    if (typeof id !== 'string') return;
    setCategories(prev => {
      const remaining = prev.filter(c => c.id !== id);
      if (activeCategoryId === id && remaining.length > 0) {
        setActiveCategoryId(remaining[0].id);
        setCurrentSong(remaining[0].songs[0] || null);
      }
      return remaining;
    });
  };

  // CRUD Operations on Songs
  const handleAddSong = (categoryId: string, songData: Omit<Song, 'id' | 'addedAt' | 'categoryId'>) => {
    if (typeof categoryId !== 'string' || !songData) return;
    const newSong: Song = {
      title: String(songData.title || 'Untitled Track'),
      artist: String(songData.artist || 'Classic Roadways'),
      youtubeUrl: String(songData.youtubeUrl || ''),
      youtubeId: String(songData.youtubeId || ''),
      duration: typeof songData.duration === 'number' ? songData.duration : 240,
      thumbnail: songData.thumbnail ? String(songData.thumbnail) : undefined,
      note: songData.note ? String(songData.note) : undefined,
      id: `song_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      addedAt: Date.now(),
      categoryId
    };

    setCategories(prev => prev.map(c => {
      if (c.id === categoryId) {
        return {
          ...c,
          songs: [...c.songs, newSong]
        };
      }
      return c;
    }));

    if (activeCategoryId === categoryId && !currentSong) {
      setCurrentSong(newSong);
    }
  };

  const handleAddMultipleSongs = (categoryId: string, songsData: Omit<Song, 'id' | 'addedAt' | 'categoryId'>[]) => {
    if (typeof categoryId !== 'string' || !Array.isArray(songsData)) return;
    const newSongs: Song[] = songsData.map((s, idx) => ({
      title: String(s.title || 'Untitled Track'),
      artist: String(s.artist || 'Classic Roadways'),
      youtubeUrl: String(s.youtubeUrl || ''),
      youtubeId: String(s.youtubeId || ''),
      duration: typeof s.duration === 'number' ? s.duration : 240,
      thumbnail: s.thumbnail ? String(s.thumbnail) : undefined,
      note: s.note ? String(s.note) : undefined,
      id: `song_${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 4)}`,
      addedAt: Date.now() + idx,
      categoryId
    }));

    setCategories(prev => prev.map(c => {
      if (c.id === categoryId) {
        return {
          ...c,
          songs: [...c.songs, ...newSongs]
        };
      }
      return c;
    }));

    if (activeCategoryId === categoryId && !currentSong && newSongs.length > 0) {
      setCurrentSong(newSongs[0]);
    }
  };

  const handleRemoveSong = (categoryId: string, songId: string) => {
    if (typeof categoryId !== 'string' || typeof songId !== 'string') return;
    setCategories(prev => prev.map(c => {
      if (c.id === categoryId) {
        const remaining = c.songs.filter(s => s.id !== songId);
        return { ...c, songs: remaining };
      }
      return c;
    }));

    if (currentSong?.id === songId) {
      handleNextTrack();
    }
  };

  const handleMoveSong = (categoryId: string, fromIndex: number, toIndex: number) => {
    if (typeof categoryId !== 'string' || typeof fromIndex !== 'number' || typeof toIndex !== 'number') return;
    setCategories(prev => prev.map(c => {
      if (c.id === categoryId) {
        const list = [...c.songs];
        const [moved] = list.splice(fromIndex, 1);
        if (moved) list.splice(toIndex, 0, moved);
        return { ...c, songs: list };
      }
      return c;
    }));
  };

  const handleResetToDefaults = () => {
    setCategories(INITIAL_CATEGORIES);
    setVisualSettings(DEFAULT_VISUAL_SETTINGS);
    setActiveCategoryId(INITIAL_CATEGORIES[0].id);
    setCurrentSong(INITIAL_CATEGORIES[0].songs[0]);
    localStorage.removeItem(STORAGE_CATEGORIES_KEY);
    localStorage.removeItem(STORAGE_VISUAL_KEY);
  };

  return (
    <div className="relative min-h-screen bg-[#0c0b0a] text-[#fdf2f2] overflow-x-hidden font-sans selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* Background Radial Gradient Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-80"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% -15%, #4a2a1b 0%, #1a100c 35%, #0c0b0a 75%)'
        }}
      />

      {/* Dot Matrix Pattern Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* 1. Global Navigation Bar */}
      <Navbar
        currentView={currentView}
        onToggleView={() => setCurrentView(prev => prev === 'home' ? 'cabin' : 'home')}
        activeCategoryName={activeCategory?.name}
        onTriggerHorn={triggerHorn}
        ambientSound={ambientSound}
        onChangeAmbient={handleAmbientChange}
        onOpenWallpaperModal={() => setIsWallpaperModalOpen(true)}
        onOpenQueue={() => setIsQueueDrawerOpen(true)}
        isPlaying={isPlaying}
        activeSongTitle={currentSong?.title}
      />

      {/* 2. Main View Switcher */}
      <main className="relative w-full">
        {currentView === 'home' ? (
          <CategoryGrid
            categories={categories}
            activeCategoryId={activeCategoryId}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayCategory={handlePlayCategory}
            onPlaySong={handlePlaySong}
            onOpenAddCategory={() => setIsAddCategoryOpen(true)}
            onOpenAddSong={(catId) => {
              const targetId = typeof catId === 'string' && catId ? catId : (activeCategoryId || categories[0]?.id || '');
              setAddSongTargetCategoryId(targetId);
              setIsAddSongOpen(true);
            }}
            onOpenEditCategory={(cat) => {
              if (cat && typeof cat === 'object' && 'id' in cat) {
                setEditingCategory(cat);
                setIsEditCategoryOpen(true);
              }
            }}
            onDeleteCategory={(id) => {
              if (typeof id === 'string') handleDeleteCategory(id);
            }}
            onOpenExportImport={() => setIsExportImportOpen(true)}
            onEnterCabinView={handleEnterCabinView}
            onTriggerHorn={triggerHorn}
          />
        ) : (
          <ImmersiveCabinView
            visualSettings={visualSettings}
            onTriggerHorn={triggerHorn}
            isHornPlaying={isHornActive}
            activeCategory={activeCategory || undefined}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onToggleWipers={() => setVisualSettings(prev => ({ ...prev, wipersActive: !prev.wipersActive }))}
            onOpenCategories={() => setCurrentView('home')}
          />
        )}
      </main>

      {/* 3. Floating Frosted Glass Music Player (Bottom Persistent) */}
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onPrev={handlePrevTrack}
        onNext={handleNextTrack}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        volume={volume}
        isMuted={isMuted}
        onVolumeChange={(val) => { setVolume(val); if (isMuted) setIsMuted(false); }}
        onToggleMute={() => setIsMuted(prev => !prev)}
        repeatMode={repeatMode}
        onToggleRepeat={() => setRepeatMode(prev => prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off')}
        isShuffled={isShuffled}
        onToggleShuffle={() => setIsShuffled(prev => !prev)}
        onOpenQueue={() => setIsQueueDrawerOpen(true)}
        onToggleFullscreenMode={() => setCurrentView(prev => prev === 'home' ? 'cabin' : 'home')}
      />

      {/* 4. Background YouTube Engine (Persistent Audio Across View Switches) */}
      <YouTubeEngine
        currentSong={currentSong}
        isPlaying={isPlaying}
        volume={volume}
        isMuted={isMuted}
        onTimeUpdate={(curr, dur) => {
          setCurrentTime(curr);
          if (dur > 0) setDuration(dur);
        }}
        onTrackEnded={handleTrackEnded}
        onPlayStateChange={(playing) => setIsPlaying(playing)}
        seekTarget={seekTarget}
        onSeekHandled={() => setSeekTarget(null)}
        repeatMode={repeatMode}
      />

      {/* 5. Modals & Drawers */}
      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onAddCategory={handleAddCategory}
      />

      <EditCategoryModal
        isOpen={isEditCategoryOpen}
        onClose={() => { setIsEditCategoryOpen(false); setEditingCategory(null); }}
        category={editingCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      <AddSongModal
        isOpen={isAddSongOpen}
        onClose={() => setIsAddSongOpen(false)}
        categories={categories}
        defaultCategoryId={addSongTargetCategoryId}
        onAddSong={handleAddSong}
        onAddMultipleSongs={handleAddMultipleSongs}
      />

      <WallpaperCustomizerModal
        isOpen={isWallpaperModalOpen}
        onClose={() => setIsWallpaperModalOpen(false)}
        visualSettings={visualSettings}
        onUpdateVisualSettings={(settings) => setVisualSettings(prev => ({ ...prev, ...settings }))}
        onResetToDefault={() => setVisualSettings(DEFAULT_VISUAL_SETTINGS)}
      />

      <PlaylistQueueDrawer
        isOpen={isQueueDrawerOpen}
        onClose={() => setIsQueueDrawerOpen(false)}
        currentCategory={activeCategory}
        categories={categories}
        onSelectCategory={(cat) => setActiveCategoryId(cat.id)}
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlaySong={(song) => {
          setCurrentSong(song);
          setCurrentTime(0);
          setIsPlaying(true);
        }}
        onRemoveSong={handleRemoveSong}
        onMoveSong={handleMoveSong}
        onOpenAddSong={(catId) => {
          setAddSongTargetCategoryId(catId);
          setIsAddSongOpen(true);
        }}
      />

      <ExportImportModal
        isOpen={isExportImportOpen}
        onClose={() => setIsExportImportOpen(false)}
        categories={categories}
        onImportData={(imported) => {
          setCategories(imported);
          if (imported.length > 0) {
            setActiveCategoryId(imported[0].id);
            setCurrentSong(imported[0].songs[0] || null);
          }
        }}
        onResetToDefaults={handleResetToDefaults}
      />
    </div>
  );
}
