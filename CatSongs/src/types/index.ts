export interface Song {
  id: string;
  title: string;
  artist: string;
  youtubeUrl: string;
  youtubeId: string;
  duration: number; // in seconds
  durationFormatted?: string;
  thumbnail: string;
  addedAt: number;
  categoryId: string;
  note?: string;
}

export interface Category {
  id: string;
  name: string;
  hindiName?: string;
  tagline: string;
  description: string;
  coverUrl: string;
  wallpaperUrl: string;
  themeColor: string;
  iconName?: string;
  tags: string[];
  isDefault?: boolean;
  songs: Song[];
  createdAt: number;
}

export type RepeatMode = 'off' | 'all' | 'one';

export type AmbientSoundType = 'off' | 'rain' | 'engine' | 'chai' | 'night';

export interface VisualSettings {
  wallpaperUrl: string;
  wallpaperName: string;
  showGarlands: boolean;
  showDashboard: boolean;
  showWipers: boolean;
  wipersActive: boolean;
  showFilmGrain: boolean;
  showCabinOverlays: boolean;
  blurBackground: boolean;
}

export interface Quote {
  id: string;
  hindi: string;
  english: string;
  authorOrVibe: string;
}
