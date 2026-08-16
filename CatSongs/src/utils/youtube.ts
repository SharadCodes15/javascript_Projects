import { Song } from '../types';

export function extractYouTubeId(urlOrId: string): string | null {
  if (!urlOrId) return null;
  const trimmed = urlOrId.trim();

  // If already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Handle standard URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = trimmed.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }

  // Handle Shorts
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch && shortsMatch[1]) {
    return shortsMatch[1];
  }

  return null;
}

export function extractPlaylistId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function parseDurationInput(timeStr: string): number {
  if (!timeStr) return 240;
  if (/^\d+$/.test(timeStr)) return parseInt(timeStr, 10);
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 2) {
    return (parts[0] * 60) + parts[1];
  }
  if (parts.length === 3) {
    return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
  }
  return 240;
}

// Preset popular tracks for instant playlist import simulation if YouTube playlist API is restricted
export const KNOWN_NOSTALGIC_PLAYLISTS: Record<string, Partial<Song>[]> = {
  '90s_bollywood': [
    { title: 'Ram Jaane Title Track', artist: 'Udit Narayan, Sonu Nigam', youtubeId: 'B_kPjKqf8z0', duration: 427 },
    { title: 'Chaiyya Chaiyya', artist: 'Sukhwinder Singh, Sapna Awasthi', youtubeId: 'YOYN9qNXmAw', duration: 395 },
    { title: 'O O Jaane Jaana', artist: 'Kamaal Khan, Salman Khan', youtubeId: 'x_elT6zkqN0', duration: 346 },
    { title: 'Tip Tip Barsa Paani', artist: 'Alka Yagnik, Udit Narayan', youtubeId: 'lZ_2H1QGj2U', duration: 350 },
    { title: 'Pehla Nasha', artist: 'Udit Narayan, Sadhana Sargam', youtubeId: '6vYVq8s0J_U', duration: 290 },
    { title: 'Sandese Aate Hai', artist: 'Sonu Nigam, Roop Kumar Rathod', youtubeId: 'g7Q4yQy0K_M', duration: 440 }
  ],
  'highway_drive': [
    { title: 'Yun Hi Chala Chal', artist: 'Udit Narayan, Hariharan, Kailash Kher', youtubeId: 'mC17u_gY9bM', duration: 450 },
    { title: 'Dil Chahta Hai', artist: 'Shankar Mahadevan', youtubeId: '5t_7b4wM-4E', duration: 310 },
    { title: 'Safarnama', artist: 'Lucky Ali, A.R. Rahman', youtubeId: '6BAmE9c8k10', duration: 251 },
    { title: 'Ilahi', artist: 'Arijit Singh', youtubeId: 'fdubeMFwuGs', duration: 228 },
    { title: 'Patakha Guddi', artist: 'Nooran Sisters, A.R. Rahman', youtubeId: '5f-wW_8XjF8', duration: 284 }
  ],
  'retro_pop': [
    { title: 'Tanha Dil', artist: 'Shaan', youtubeId: 'xOtx4Jp_Z3g', duration: 315 },
    { title: 'Purani Jeans Aur Guitar', artist: 'Ali Haider', youtubeId: 'Jg72Y2rP7v8', duration: 275 },
    { title: 'Dooba Dooba Rehta Hoon', artist: 'Silk Route (Mohit Chauhan)', youtubeId: 'v8TzZ3E4rA0', duration: 260 },
    { title: 'Sayonee', artist: 'Junoon', youtubeId: '6C3Z3Gk3Z9Y', duration: 320 },
    { title: 'Gori Teri Aankhen Kahe', artist: 'Lucky Ali, Kavita Krishnamurthy', youtubeId: 'Oq5P9sL6tQw', duration: 310 }
  ]
};
