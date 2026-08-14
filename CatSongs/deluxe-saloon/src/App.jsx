import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react";
import { PLAYLIST_CATEGORIES, QUOTES } from "./data";

export default function App() {
  // Get the genre names from our data file
  const genres = Object.keys(PLAYLIST_CATEGORIES);
  
  // New state to track which category is currently selected
  const [activeGenre, setActiveGenre] = useState(genres[0]);
  
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [quoteIndex, setQuoteIndex] = useState(0);
  
  const playerRef = useRef(null);
  
  // Get the current playlist array based on the active genre
  const currentPlaylist = PLAYLIST_CATEGORIES[activeGenre];
  const currentTrack = currentPlaylist[currentTrackIndex];

  const formatTime = (secs) => {
    const min = Math.floor(secs / 60);
    const sec = Math.floor(secs % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    setDuration(formatTime(event.target.getDuration() || 0));
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % currentPlaylist.length);
    setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + currentPlaylist.length) % currentPlaylist.length);
    setQuoteIndex((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
    setIsPlaying(true);
  };

  // Function to handle switching genres
  const handleGenreChange = (genre) => {
    setActiveGenre(genre);
    setCurrentTrackIndex(0); // Reset to first song of the new genre
    setIsPlaying(true); // Auto-play when switching genres
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && isPlaying) {
        const current = playerRef.current.getCurrentTime() || 0;
        const total = playerRef.current.getDuration() || 1;
        setProgress((current / total) * 100);
        setCurrentTime(formatTime(current));
        setDuration(formatTime(total));
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 bg-zinc-950 text-white overflow-hidden select-none">
      {/* Background Image (Updated to a warm sunset vibe for a Katta) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 filter blur-[2px]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558281050-0cb218778643?w=1600&auto=format&fit=crop&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

      {/* Hidden YouTube Engine */}
      <div className="hidden">
        <YouTube
          videoId={currentTrack.videoId}
          opts={{ height: "0", width: "0", playerVars: { autoplay: 1, controls: 0 } }}
          onReady={onPlayerReady}
          onEnd={handleNext}
        />
      </div>

      {/* New Marathi Header */}
      <header className="relative z-10 text-center mt-6">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-wider drop-shadow-2xl font-['Rozha_One',serif] text-orange-500">
          नादखुळा
        </h1>
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-300 font-semibold mt-2">
          मराठी संगीत कट्टा
        </p>
      </header>

      <div className="relative z-10 w-full max-w-lg space-y-5">
        
        {/* Genre Selector Pills */}
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreChange(genre)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeGenre === genre 
                  ? "bg-orange-500 text-black shadow-lg shadow-orange-500/30" 
                  : "bg-black/50 text-zinc-400 hover:bg-black/80 hover:text-white border border-white/5"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Music Player UI */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={currentTrack.thumbnail}
              alt="Album cover"
              className="w-16 h-16 rounded-2xl object-cover border border-white/10 shadow-lg"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-zinc-100">
                {currentTrack.title}
              </p>
              <p className="text-xs text-zinc-400 truncate mt-1">{currentTrack.subtitle}</p>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center space-x-1">
              <button onClick={handlePrev} className="p-2 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition">
                <SkipBack className="w-5 h-5 fill-current" />
              </button>
              <button onClick={togglePlay} className="bg-orange-500 hover:bg-orange-400 text-black p-3.5 rounded-full transition shadow-lg shadow-orange-500/20">
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>
              <button onClick={handleNext} className="p-2 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition">
                <SkipForward className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>

          {/* Progress Bar & Timestamps */}
          <div className="space-y-1.5 mt-2">
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-orange-500 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>{currentTime}</span>
              <span>{duration}</span>
            </div>
          </div>
        </div>

        {/* Marathi Quote Box */}
        <div className="bg-black/50 backdrop-blur-md border border-orange-500/20 p-5 rounded-2xl text-center space-y-2 shadow-inner">
          <p className="text-[15px] font-medium font-serif text-orange-200">
            "{QUOTES[quoteIndex].text}"
          </p>
          <p className="text-[10px] text-orange-400/70 font-sans tracking-widest uppercase">
            — {QUOTES[quoteIndex].author}
          </p>
        </div>
      </div>

      <footer className="relative z-10 text-center pb-4 text-[10px] text-zinc-600 tracking-widest uppercase">
        Developed for • Marathi Katta
      </footer>
    </main>
  );
}