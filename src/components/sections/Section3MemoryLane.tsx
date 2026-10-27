import React, { useState, useMemo } from 'react';
import { Camera, Search, X, Heart, Dices } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOSAIC_WALL_PHOTOS, type MediaItem } from '../../data/media';

interface Section3MemoryLaneProps {
  onPhotoClick: (item: MediaItem, list?: MediaItem[]) => void;
}

export const Section3MemoryLane: React.FC<Section3MemoryLaneProps> = ({ onPhotoClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Loved / Hearted photos state
  const [lovedIds, setLovedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('celebration_loved_photos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Filtered photos by search query
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return MOSAIC_WALL_PHOTOS;
    const q = searchQuery.toLowerCase();
    return MOSAIC_WALL_PHOTOS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.caption.toLowerCase().includes(q) ||
        p.filename.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Persist loved state & trigger confetti
  const toggleHeart = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const wasLoved = !!lovedIds[photoId];
    const newLoved = { ...lovedIds, [photoId]: !wasLoved };
    setLovedIds(newLoved);

    try {
      localStorage.setItem('celebration_loved_photos', JSON.stringify(newLoved));
    } catch { }

    if (!wasLoved) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 22,
        spread: 45,
        startVelocity: 18,
        origin: { x, y },
        colors: ['#ec4899', '#a855f7', '#f59e0b', '#3b82f6'],
      });
    }
  };

  // Surprise Random Memory Roll
  const handleSurpriseMemory = () => {
    if (MOSAIC_WALL_PHOTOS.length === 0) return;
    const randomIndex = Math.floor(Math.random() * MOSAIC_WALL_PHOTOS.length);
    const chosen = MOSAIC_WALL_PHOTOS[randomIndex];

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#a855f7', '#ec4899', '#fbbf24', '#38bdf8'],
    });

    onPhotoClick(chosen, MOSAIC_WALL_PHOTOS);
  };

  return (
    <section id="memory-lane" className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-sm">
          <Camera size={13} className="text-purple-600" />
          <span>Section 3 • Memory Mosaic Wall</span>
        </div>

        <h2 className="font-['Fredoka'] text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-950 tracking-tight">
          Our Memory Lane 🧩
        </h2>
        <p className="text-sm sm:text-base text-purple-800/85 max-w-2xl mt-2 font-medium">
          A living mosaic wall of our first {MOSAIC_WALL_PHOTOS.length} unforgettable moments! Tap any photo for full HD resolution.
        </p>

        {/* Action Bar: Roll Surprise Memory & Search */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleSurpriseMemory}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-105"
            title="Picks a surprise memory at random with confetti!"
          >
            <Dices size={16} className="text-yellow-200" />
            <span>Roll Surprise Memory 🎲</span>
          </button>

          {/* Quick Search */}
          <div className="relative flex items-center">
            <Search size={14} className="absolute left-3 text-purple-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search moments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-7 py-1.5 text-xs sm:text-sm rounded-xl bg-white/90 border border-purple-200 text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 w-40 sm:w-52 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 text-purple-400 hover:text-purple-700"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        <span className="text-xs text-purple-600/90 font-medium mt-3">
          Displaying {filteredPhotos.length} of {MOSAIC_WALL_PHOTOS.length} mosaic memories
        </span>
      </div>

      {/* DYNAMIC MOSAIC STORY WALL (26 Photos) */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 pt-2">
        {filteredPhotos.map((photo, index) => {
          const isLoved = !!lovedIds[photo.id];

          return (
            <div
              key={photo.id}
              className="break-inside-avoid rounded-3xl bg-white border border-purple-200/90 p-3 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1"
              onClick={() => onPhotoClick(photo, MOSAIC_WALL_PHOTOS)}
            >
              {/* Photo Container with Ambient Soft Glow */}
              <div className="relative rounded-2xl overflow-hidden bg-purple-950/10 flex items-center justify-center">
                <img
                  src={photo.url}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110"
                />
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="relative z-10 w-full max-h-[380px] object-contain p-1 drop-shadow transition-transform duration-300 group-hover:scale-105"
                />

                {/* Index badge */}
                <span className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded-full bg-white/90 text-purple-900 text-[10px] font-bold shadow-sm">
                  #{index + 1}
                </span>

                {/* Full View Tag */}
                <span className="absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded-lg bg-black/60 text-white text-[10px] font-semibold backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity">
                  🔍 Full View
                </span>
              </div>

              {/* Card Meta */}
              <div className="mt-2.5 px-1 flex items-center justify-between text-left">
                <div className="min-w-0 flex-1 mr-2">
                  <p className="font-['Fredoka'] text-xs sm:text-sm font-semibold text-purple-950 truncate">
                    {photo.title}
                  </p>
                  <p className="text-[11px] text-purple-600 truncate mt-0.5">
                    {photo.caption}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => toggleHeart(photo.id, e)}
                  className={`p-1.5 rounded-full transition-colors shrink-0 ${isLoved ? 'text-rose-500 bg-rose-50' : 'text-purple-400 hover:text-rose-500'
                    }`}
                  title="Heart memory"
                >
                  <Heart size={15} fill={isLoved ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
