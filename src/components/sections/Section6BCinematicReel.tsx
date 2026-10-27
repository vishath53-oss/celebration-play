import React, { useState, useEffect, useRef } from 'react';
import { Film, Sparkles, ChevronLeft, ChevronRight, Maximize2, Play, Pause } from 'lucide-react';
import { CINEMATIC_REEL_PHOTOS, type MediaItem } from '../../data/media';

interface Section6BCinematicReelProps {
  onPhotoClick: (item: MediaItem, list?: MediaItem[]) => void;
}

export const Section6BCinematicReel: React.FC<Section6BCinematicReelProps> = ({ onPhotoClick }) => {
  const [selectedFilmIndex, setSelectedFilmIndex] = useState(0);
  const [isAutoPlayingFilm, setIsAutoPlayingFilm] = useState(false);
  const filmReelRef = useRef<HTMLDivElement>(null);

  const activePhoto = CINEMATIC_REEL_PHOTOS[selectedFilmIndex] || CINEMATIC_REEL_PHOTOS[0];

  // Auto-play slideshow every 3.2 seconds
  useEffect(() => {
    if (!isAutoPlayingFilm) return;
    const timer = setInterval(() => {
      setSelectedFilmIndex((prev) => (prev + 1) % CINEMATIC_REEL_PHOTOS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isAutoPlayingFilm]);

  // Smooth scroll filmstrip to center selected frame
  useEffect(() => {
    if (filmReelRef.current) {
      const el = filmReelRef.current.children[selectedFilmIndex] as HTMLElement;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedFilmIndex]);

  return (
    <section id="cinematic-reel" className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-100 via-pink-100 to-purple-100 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-sm">
          <Film size={13} className="text-pink-600" />
          <span>After The Letter • The Cinematic Memory Reel</span>
        </div>

        <h2 className="font-['Fredoka'] text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-950 tracking-tight flex items-center justify-center gap-2">
          <span>Cinematic Reel 🎞️</span>
        </h2>
        <p className="text-sm sm:text-base text-purple-800/85 max-w-2xl mt-2 font-medium">
          The next {CINEMATIC_REEL_PHOTOS.length} precious memories in authentic 35mm film reel projector. Sit back and watch our memories unfold!
        </p>
      </div>

      {/* Main 35mm Cinema Projector Component */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Cinema Projector Box */}
        <div className="relative rounded-3xl bg-gradient-to-b from-purple-950 via-[#18112c] to-purple-950 p-4 sm:p-7 shadow-2xl border border-purple-800/80 text-white">
          {/* Top Bar Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-800/60 text-xs text-purple-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-[11px] tracking-widest uppercase font-semibold">
                SAVITHA MEMORIES FILM CO. • REEL #{selectedFilmIndex + 1}
              </span>
            </div>

            {/* Auto-Play Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoPlayingFilm((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-800/80 hover:bg-purple-700 text-pink-200 text-xs font-semibold transition-all shadow-sm border border-purple-600/60"
            >
              {isAutoPlayingFilm ? <Pause size={12} /> : <Play size={12} />}
              <span>{isAutoPlayingFilm ? 'Pause Slideshow' : '▶ Auto Play Reel'}</span>
            </button>
          </div>

          {/* Main Cinema Projector Frame (Full uncropped photo!) */}
          <div
            className="relative h-80 sm:h-[450px] w-full rounded-2xl overflow-hidden bg-black/70 flex items-center justify-center cursor-pointer group border border-purple-500/30 shadow-inner"
            onClick={() => onPhotoClick(activePhoto, CINEMATIC_REEL_PHOTOS)}
            title="Click to view full photo in lightbox"
          >
            {/* Ambient Blurred Backdrop */}
            <img
              src={activePhoto.url}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110"
            />

            {/* Uncropped 100% Full Photo */}
            <img
              src={activePhoto.url}
              alt={activePhoto.title}
              className="relative z-10 max-w-full max-h-full object-contain p-2 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />

            <span className="absolute bottom-3 right-3 z-20 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5 shadow-md group-hover:bg-pink-600 transition-colors">
              <Maximize2 size={12} />
              <span>Full Cinema View</span>
            </span>
          </div>

          {/* Cinema Info & Next/Prev Controls */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div>
              <h3 className="font-['Fredoka'] text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>{activePhoto.title}</span>
                <Sparkles size={16} className="text-yellow-300" />
              </h3>
              <p className="font-['Caveat'] text-base sm:text-lg text-pink-300 mt-0.5">
                "{activePhoto.caption}"
              </p>
            </div>

            {/* Next / Prev Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() =>
                  setSelectedFilmIndex(
                    (prev) => (prev - 1 + CINEMATIC_REEL_PHOTOS.length) % CINEMATIC_REEL_PHOTOS.length
                  )
                }
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-purple-700/60"
                aria-label="Previous reel frame"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="font-mono text-xs sm:text-sm text-purple-300 font-semibold px-2">
                {selectedFilmIndex + 1} / {CINEMATIC_REEL_PHOTOS.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setSelectedFilmIndex((prev) => (prev + 1) % CINEMATIC_REEL_PHOTOS.length)
                }
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-purple-700/60"
                aria-label="Next reel frame"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Authentic 35mm Filmstrip Track with Sprocket Perforations */}
        <div className="w-full rounded-2xl bg-[#130f1e] border border-purple-900/80 p-3 sm:p-4 shadow-xl">
          {/* Top Sprocket Perforations */}
          <div className="flex justify-between items-center px-2 py-1 mb-2 border-b border-purple-900/50 opacity-70 overflow-hidden">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="w-3 h-2 rounded-[2px] bg-white/30 shrink-0 mx-1" />
            ))}
          </div>

          {/* Horizontal Film Frames (All 25 Photos) */}
          <div
            ref={filmReelRef}
            className="flex items-center gap-3 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-purple-700 scroll-smooth"
          >
            {CINEMATIC_REEL_PHOTOS.map((photo, idx) => {
              const isSelected = idx === selectedFilmIndex;
              return (
                <div
                  key={photo.id}
                  onClick={() => setSelectedFilmIndex(idx)}
                  className={`shrink-0 w-28 sm:w-36 rounded-xl overflow-hidden cursor-pointer transition-all ${
                    isSelected
                      ? 'ring-3 ring-pink-500 scale-105 shadow-lg opacity-100'
                      : 'opacity-60 hover:opacity-100 hover:scale-100'
                  }`}
                >
                  <div className="relative aspect-square bg-black/80 flex items-center justify-center overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1 left-1 font-mono text-[9px] bg-black/75 text-white px-1.5 py-0.5 rounded">
                      EXP-{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Sprocket Perforations */}
          <div className="flex justify-between items-center px-2 py-1 mt-2 border-t border-purple-900/50 opacity-70 overflow-hidden">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="w-3 h-2 rounded-[2px] bg-white/30 shrink-0 mx-1" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
