import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, ChevronLeft, ChevronRight, Film, Smartphone, Clapperboard, CheckCircle2 } from 'lucide-react';
import { SAVITHA_VIDEOS, type MediaItem } from '../../data/media';

interface Section7VideoMovieProps {
  onPhotoClick?: (item: MediaItem) => void;
}

export const Section7VideoMovie: React.FC<Section7VideoMovieProps> = () => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const selectedVideo = SAVITHA_VIDEOS[selectedVideoIndex];
  const isPortrait = selectedVideo.orientation === 'portrait';

  const handlePrevVideo = () => {
    setSelectedVideoIndex((prev) => (prev === 0 ? SAVITHA_VIDEOS.length - 1 : prev - 1));
  };

  const handleNextVideo = () => {
    setSelectedVideoIndex((prev) => (prev === SAVITHA_VIDEOS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="videos" className="w-full max-w-5xl mx-auto px-4 py-12">
      {/* 1. BIRTHDAY MOVIE HEADER */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Clapperboard size={13} className="text-pink-600" />
          <span>Section 7 • Birthday Premiere 🍿</span>
        </div>

        <h2 className="font-['Fredoka'] text-3xl sm:text-4xl font-bold text-purple-950 flex items-center justify-center gap-2">
          <span>Our Little World of Memories 🎬</span>
        </h2>

        <p className="text-sm sm:text-base text-purple-700/85 max-w-xl mt-2 font-medium leading-relaxed">
          A collection of our funniest moments, silly memories, and unforgettable times together 💗
        </p>

        {/* Delicate decorative dots */}
        <div className="flex items-center gap-1.5 mt-3 text-pink-300">
          <span>✦</span>
          <span className="text-purple-300">★</span>
          <span className="text-pink-400">♥</span>
          <span className="text-purple-300">★</span>
          <span>✦</span>
        </div>
      </div>

      {/* 2. ONE FEATURED VIDEO PLAYER CONTAINER */}
      <div className="mb-10">
        {/* Cinema Screen Frame */}
        <div className="relative mx-auto rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-purple-100/90 via-pink-50/80 to-purple-50/90 border-2 border-purple-200/90 shadow-[0_20px_50px_-15px_rgba(168,85,247,0.22)] backdrop-blur-sm">
          {/* Subtle Filmstrip Perforations at Top */}
          <div className="flex items-center justify-between px-3 pb-2 sm:pb-3 border-b border-purple-200/70 text-xs font-medium text-purple-700">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping" />
              <span className="font-['Fredoka'] font-bold text-purple-900 tracking-wide">
                NOW SCREENING
              </span>
              <span className="px-2 py-0.5 rounded-full bg-purple-200/70 text-purple-800 text-[10px] font-bold">
                {isPortrait ? '📱 Phone Reel' : '🎬 Cinema 16:9'}
              </span>
              {selectedVideoIndex < 5 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-300 text-amber-950 text-[10px] font-extrabold shadow-sm">
                  ⭐ Featured Video
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-purple-600">
              <Film size={13} className="text-purple-500" />
              <span>Clip {selectedVideoIndex + 1} of {SAVITHA_VIDEOS.length}</span>
            </div>
          </div>

          {/* Video Player Frame with Dynamic Aspect Ratio */}
          <div className="mt-3 flex justify-center">
            <div
              className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 shadow-inner flex items-center justify-center transition-all duration-300 ${
                isPortrait
                  ? 'max-w-[320px] sm:max-w-[360px] aspect-[9/16]'
                  : 'max-w-4xl aspect-video'
              }`}
            >
              <video
                key={selectedVideo.id}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-contain bg-black"
              >
                <source src={selectedVideo.url} type="video/mp4" />
                <p className="p-4 text-xs text-white text-center">
                  Your browser does not support HTML5 video playback.
                </p>
              </video>
            </div>
          </div>

          {/* Under-Player Caption & Navigation Controls */}
          <div className="mt-4 pt-3 border-t border-purple-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
            {/* Title & Caption */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <h3 className="font-['Fredoka'] text-lg sm:text-xl font-bold text-purple-950 flex items-center justify-center sm:justify-start gap-2">
                {isPortrait ? (
                  <Smartphone size={18} className="text-pink-500 shrink-0" />
                ) : (
                  <Film size={18} className="text-purple-600 shrink-0" />
                )}
                <span className="truncate">{selectedVideo.title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-purple-700/90 font-medium mt-0.5">
                {selectedVideo.caption}
              </p>
            </div>

            {/* Quick Prev / Next Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handlePrevVideo}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white hover:bg-purple-100/80 text-purple-800 border border-purple-200 text-xs font-bold transition-all shadow-sm flex items-center gap-1 active:scale-95"
                title="Previous Memory Video"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <span className="px-2.5 py-1 text-xs font-mono font-bold text-purple-800 bg-purple-100 rounded-lg">
                {selectedVideoIndex + 1} / {SAVITHA_VIDEOS.length}
              </span>

              <button
                type="button"
                onClick={handleNextVideo}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white border border-purple-600 text-xs font-bold transition-all shadow-sm flex items-center gap-1 active:scale-95"
                title="Next Memory Video"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HORIZONTAL MEMORY FILMSTRIP */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-pink-500 text-white flex items-center justify-center shadow-sm">
              <Film size={15} />
            </div>
            <div>
              <h4 className="font-['Fredoka'] text-base sm:text-lg font-bold text-purple-950">
                Memory Filmstrip
              </h4>
              <p className="text-[11px] text-purple-600 font-medium">
                Tap any thumbnail to play in the featured player above
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-pink-700 bg-pink-100/80 px-2.5 py-1 rounded-full border border-pink-200">
            {SAVITHA_VIDEOS.length} Original Videos
          </span>
        </div>

        {/* Horizontal Scrolling Thumbnails */}
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-thin scrollbar-thumb-pink-300">
          {SAVITHA_VIDEOS.map((video, idx) => {
            const isSelected = selectedVideoIndex === idx;
            const isVidPortrait = video.orientation === 'portrait';

            return (
              <motion.button
                key={video.id}
                type="button"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.15 }}
                onClick={() => setSelectedVideoIndex(idx)}
                className={`w-44 sm:w-52 shrink-0 rounded-2xl p-2.5 text-left transition-all flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-gradient-to-b from-pink-50 to-purple-50 border-pink-500 shadow-[0_8px_25px_-5px_rgba(236,72,153,0.35)] ring-2 ring-pink-400 scale-[1.02]'
                    : 'bg-white/95 border-purple-200/90 shadow-sm hover:border-pink-300 hover:shadow-md'
                }`}
              >
                {/* Thumbnail Preview Box */}
                <div className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center border border-purple-100">
                  {/* Native video preview frame */}
                  <video
                    src={video.url}
                    preload="metadata"
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play icon / Active indicator */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-transform ${
                      isSelected ? 'scale-110' : 'group-hover:scale-110'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
                        isSelected
                          ? 'bg-pink-500 text-white'
                          : 'bg-white/80 backdrop-blur-sm text-purple-900'
                      }`}
                    >
                      <Play size={16} className="fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Orientation & Special Tag */}
                  <div className="absolute top-1.5 left-1.5 flex items-center gap-1 z-10">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[9px] font-bold shadow-sm backdrop-blur-md ${
                        isVidPortrait
                          ? 'bg-pink-600/90 text-white'
                          : 'bg-purple-900/90 text-purple-100'
                      }`}
                    >
                      {isVidPortrait ? 'Reel' : 'Cinema'}
                    </span>
                    {idx < 5 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-amber-400 text-amber-950 text-[9px] font-extrabold shadow-sm">
                        ⭐ Special
                      </span>
                    )}
                  </div>

                  {/* Selected Marker */}
                  {isSelected && (
                    <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-emerald-500 text-white text-[9px] font-bold shadow-sm flex items-center gap-0.5">
                      <CheckCircle2 size={10} />
                      <span>Playing</span>
                    </span>
                  )}
                </div>

                {/* Thumbnail Metadata */}
                <div className="mt-2.5 px-1">
                  <p className="font-['Fredoka'] text-xs sm:text-sm font-semibold text-purple-950 truncate">
                    {video.title}
                  </p>
                  <p className="text-[10px] text-purple-600/80 truncate mt-0.5">
                    {video.caption}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Section Footer Note */}
      <div className="mt-8 p-3 rounded-2xl bg-gradient-to-r from-pink-50/90 via-purple-50/90 to-pink-50/90 border border-pink-200/70 text-center text-xs text-purple-700 font-medium flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-pink-500 shrink-0" />
        <span>Every video plays with full HTML5 controls & crystal-clear original sound.</span>
      </div>
    </section>
  );
};
