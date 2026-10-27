import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  HelpCircle,
  Sparkles,
  Smile,
  CheckCircle,
  Heart,
  Camera,
  ZoomIn,
  PartyPopper,
  Film,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  SAVITHA_FUN_ZONE_PHOTOS,
  SAVITHA_MYSTERY_PHOTOS,
  GUESS_MOMENT_PHOTO,
  type MediaItem,
} from '../../data/media';

interface Section4FunZoneProps {
  onPhotoClick: (item: MediaItem) => void;
}

// Fun stickers for the photobooth cards
const FUN_STICKERS = [
  { tag: '🤪 Trouble Squad', bg: 'bg-amber-100 text-amber-900 border-amber-300' },
  { tag: '😂 Classroom Chaos', bg: 'bg-sky-100 text-sky-900 border-sky-300' },
  { tag: '👑 Queen Glow', bg: 'bg-pink-100 text-pink-900 border-pink-300' },
  { tag: '☀️ Sunny Moments', bg: 'bg-yellow-100 text-yellow-900 border-yellow-300' },
  { tag: '💖 Gang Forever', bg: 'bg-rose-100 text-rose-900 border-rose-300' },
  { tag: '🌙 Night Shenanigans', bg: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
  { tag: '🥇 Front Benchers', bg: 'bg-purple-100 text-purple-900 border-purple-300' },
  { tag: '✨ Golden Moments', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
];

type LayoutMode = 'strips' | 'reel' | 'scrapbook';

export const Section4FunZone: React.FC<Section4FunZoneProps> = ({ onPhotoClick }) => {
  // Layout view mode: 'strips' (authentic photobooth strips), 'reel' (horizontal film ribbon), 'scrapbook' (staggered polaroid collage)
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('strips');

  // Mystery cards reveal state
  const [revealedCards, setRevealedCards] = useState<Record<number, boolean>>({});

  // Heart reactions on individual polaroids
  const [reactions, setReactions] = useState<Record<string, number>>({});

  // Guess the moment mini game state
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Horizontal reel scroll ref
  const reelRef = useRef<HTMLDivElement>(null);
  const mysteryReelRef = useRef<HTMLDivElement>(null);

  const toggleCardReveal = (index: number) => {
    setRevealedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleAllMysteryCards = () => {
    const allRevealed =
      Object.keys(revealedCards).length === SAVITHA_MYSTERY_PHOTOS.length &&
      Object.values(revealedCards).every(Boolean);

    if (allRevealed) {
      setRevealedCards({});
    } else {
      const newState: Record<number, boolean> = {};
      SAVITHA_MYSTERY_PHOTOS.forEach((_, idx) => {
        newState[idx] = true;
      });
      setRevealedCards(newState);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleHeartClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReactions((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

    confetti({
      particleCount: 28,
      spread: 60,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ['#ec4899', '#f43f5e', '#a855f7', '#fbbf24'],
    });
  };

  const scrollReel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const offset = direction === 'left' ? -380 : 380;
      ref.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // 1. MYSTERY FLIP CARDS
  const mysteryCards = [
    {
      id: 0,
      photo: SAVITHA_MYSTERY_PHOTOS[0],
      teaser: 'Mystery Memory #1',
      hint: 'Tap to unmask this candid moment 👀',
      punchline: 'Spontaneous plans are always the most memorable! ✨',
    },
    {
      id: 1,
      photo: SAVITHA_MYSTERY_PHOTOS[1],
      teaser: 'Mystery Memory #2',
      hint: 'Tap to unmask this friendship moment 🌸',
      punchline: 'Candid smiles that radiate 100% warmth & sweetness 💖',
    },
    {
      id: 2,
      photo: SAVITHA_MYSTERY_PHOTOS[2],
      teaser: 'Mystery Memory #3',
      hint: 'Tap to unmask this squad memory 👭',
      punchline: 'Side by side or miles apart, best friends at heart! 🌟',
    },
    {
      id: 3,
      photo: SAVITHA_MYSTERY_PHOTOS[3],
      teaser: 'Mystery Memory #4',
      hint: 'Tap to unmask festive vibes 🔮',
      punchline: 'Traditional celebration glow with the best gang 🎉',
    },
    {
      id: 4,
      photo: SAVITHA_MYSTERY_PHOTOS[4],
      teaser: 'Mystery Memory #5',
      hint: 'Tap to unmask top-secret chat 📱',
      punchline: 'Caught in 4K! The legendary WhatsApp group banter 🤣',
    },
    {
      id: 5,
      photo: SAVITHA_MYSTERY_PHOTOS[5],
      teaser: 'Mystery Memory #6',
      hint: 'Tap to unmask unfiltered laughs 😂',
      punchline: 'When someone told a joke and nobody could breathe! 💫',
    },
    {
      id: 6,
      photo: SAVITHA_MYSTERY_PHOTOS[6],
      teaser: 'Mystery Memory #7',
      hint: 'Tap to unmask this forever moment 💜',
      punchline: 'Pure golden memories that grow sweeter every year 🥳',
    },
  ];

  // 3. GUESS THE MOMENT GAME (Single Photo - Correct Answer: First grp photo)
  const guessQuiz = {
    photo: GUESS_MOMENT_PHOTO,
    question: 'Guess what moment is captured in this iconic photo! 🎯',
    options: [
      'Among one pic',
      'First grp photo 📸',
      'Wasted moment 😂',
    ],
    correctIndex: 1, // 'First grp photo' is the correct answer
    successNote: 'Spot on! Our legendary first group photo together in class! 🎉💖',
    retryNote: 'Almost! This historic memory is actually our very first group photo! ✨',
  };

  const handleQuizSelect = (idx: number) => {
    setSelectedAnswer(idx);
    if (idx === guessQuiz.correctIndex) {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#a855f7', '#fbbf24', '#38bdf8'],
      });
    }
  };

  // Split the 8 photos into 2 authentic 4-frame Photobooth Strips
  const strip1Photos = SAVITHA_FUN_ZONE_PHOTOS.slice(0, 4);
  const strip2Photos = SAVITHA_FUN_ZONE_PHOTOS.slice(4, 8);

  return (
    <section id="fun-zone" className="w-full max-w-6xl mx-auto px-4 py-14">
      {/* SECTION HEADER with Fun Carnival Personality */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-amber-500/15 border border-pink-300 text-pink-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <Smile size={14} className="text-pink-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Section 4 • Retro Photobooth & Party Zone</span>
        </div>

        <h2 className="font-['Fredoka'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-purple-950 flex items-center justify-center gap-3">
          <span>The Fun Zone 😂</span>
          <PartyPopper size={32} className="text-pink-500 animate-bounce" />
        </h2>
        <p className="text-sm sm:text-base text-purple-800/85 max-w-xl mt-2 font-medium">
          Step right into the birthday carnival! Experience authentic photobooth filmstrips, unmask secret mystery cards, and play squad trivia.
        </p>

        {/* Dynamic Alignment / Layout Switcher */}
        <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-purple-100/80 border border-purple-200 shadow-sm gap-1">
          <button
            type="button"
            onClick={() => setLayoutMode('strips')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              layoutMode === 'strips'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-purple-800 hover:bg-white/60'
            }`}
          >
            <Film size={14} />
            <span>Dual Photostrips 🎞️</span>
          </button>

          <button
            type="button"
            onClick={() => setLayoutMode('reel')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              layoutMode === 'reel'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-purple-800 hover:bg-white/60'
            }`}
          >
            <ChevronRight size={14} />
            <span>Film Reel Track 🎡</span>
          </button>

          <button
            type="button"
            onClick={() => setLayoutMode('scrapbook')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              layoutMode === 'scrapbook'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-purple-800 hover:bg-white/60'
            }`}
          >
            <LayoutGrid size={14} />
            <span>Scrapbook Collage 📸</span>
          </button>
        </div>
      </div>

      {/* 1. PHOTOBOOTH STRIP SECTION */}
      <div className="mb-16">
        {/* Photobooth Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-2 pb-3 border-b border-purple-200/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-md">
              <Camera size={20} />
            </div>
            <div className="text-left">
              <h3 className="font-['Fredoka'] text-lg sm:text-xl font-bold text-purple-950 flex items-center gap-2">
                <span>The Iconic Photobooth Strip</span>
                <span className="px-2 py-0.5 rounded-md bg-pink-100 text-pink-700 text-[11px] font-extrabold uppercase">
                  Arcade Edition
                </span>
              </h3>
              <p className="text-xs text-purple-600 font-medium">
                {layoutMode === 'strips'
                  ? 'Two authentic vertical film strips printed straight from the booth 🎞️'
                  : layoutMode === 'reel'
                  ? 'Swipe through the continuous rolling film reel 🎡'
                  : 'Staggered candid polaroid scrapbook collage with washi tape 🎨'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {layoutMode === 'reel' && (
              <div className="flex items-center gap-1 mr-2">
                <button
                  type="button"
                  onClick={() => scrollReel(reelRef, 'left')}
                  className="w-8 h-8 rounded-full bg-white border border-purple-200 text-purple-800 flex items-center justify-center hover:bg-purple-50 shadow-sm transition-all"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollReel(reelRef, 'right')}
                  className="w-8 h-8 rounded-full bg-white border border-purple-200 text-purple-800 flex items-center justify-center hover:bg-purple-50 shadow-sm transition-all"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-purple-900 text-xs font-bold border border-pink-200 shadow-sm">
              {SAVITHA_FUN_ZONE_PHOTOS.length} Full HD Snaps
            </span>
          </div>
        </div>

        {/* ALIGNMENT VARIANT A: AUTHENTIC DUAL PHOTOBOOTH STRIPS (Default) */}
        {layoutMode === 'strips' && (
          <div className="relative py-4 px-2 sm:px-6 rounded-3xl bg-gradient-to-b from-purple-100/60 via-pink-50/50 to-purple-100/40 border border-purple-200/80 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
              {/* STRIP 1: "The Trouble & Laughter Strip" */}
              <div className="relative flex flex-col items-center">
                {/* Washi Tape Accent at Top */}
                <div className="absolute -top-3 z-30 w-32 h-7 bg-amber-200/90 border border-amber-300 shadow-sm transform -rotate-2 rounded-sm backdrop-blur-sm flex items-center justify-center text-[10px] font-bold text-amber-900 tracking-wider uppercase">
                  ★ PHOTO STRIP #01 ★
                </div>

                {/* The Vertical Physical Strip */}
                <div className="w-full bg-[#fdfbf7] border-4 border-white shadow-[0_15px_35px_rgba(0,0,0,0.12)] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 relative overflow-hidden">
                  {/* Sprocket Holes Decoration (Left & Right Film Margins) */}
                  <div className="absolute left-1.5 top-6 bottom-6 flex flex-col justify-between py-2 pointer-events-none opacity-30">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-1.5 h-2.5 rounded-sm bg-purple-900 mb-1" />
                    ))}
                  </div>
                  <div className="absolute right-1.5 top-6 bottom-6 flex flex-col justify-between py-2 pointer-events-none opacity-30">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-1.5 h-2.5 rounded-sm bg-purple-900 mb-1" />
                    ))}
                  </div>

                  {/* Strip Header Watermark */}
                  <div className="text-center pt-2 pb-1 border-b border-neutral-200/70">
                    <span className="font-['Caveat'] text-lg font-bold text-purple-900 tracking-wide">
                      Savitha's Squad Chronicles ✨
                    </span>
                    <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
                      2026.10 • CANDID SQUAD EDITION
                    </p>
                  </div>

                  {/* 4 Photos Stacked Vertically in Strip 1 */}
                  {strip1Photos.map((photo, index) => {
                    const sticker = FUN_STICKERS[index] || FUN_STICKERS[0];
                    const reactionCount = reactions[photo.id] || 0;

                    return (
                      <motion.div
                        key={photo.id}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => onPhotoClick(photo)}
                        className="group relative bg-white rounded-xl p-2.5 border border-neutral-200/90 shadow-sm hover:shadow-md cursor-pointer transition-all"
                      >
                        {/* Frame Number Tag */}
                        <div className="absolute top-3.5 left-3.5 z-20 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-mono font-bold backdrop-blur-sm">
                          0{index + 1}
                        </div>

                        {/* Uncropped Photo Container */}
                        <div className="relative w-full h-56 sm:h-64 rounded-lg overflow-hidden bg-neutral-900/10 flex items-center justify-center">
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
                            className="relative z-10 max-w-full max-h-full object-contain p-1 drop-shadow transition-transform duration-300 group-hover:scale-105"
                          />
                          <span
                            className={`absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-full text-[10px] font-bold border shadow-sm ${sticker.bg}`}
                          >
                            {sticker.tag}
                          </span>
                          <span className="absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-medium backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            <ZoomIn size={10} /> Full View
                          </span>
                        </div>

                        {/* Caption & Heart Reaction */}
                        <div className="mt-2 flex items-center justify-between px-1">
                          <div className="min-w-0 flex-1 mr-2 text-left">
                            <h4 className="font-['Fredoka'] text-xs sm:text-sm font-semibold text-purple-950 truncate">
                              {photo.title}
                            </h4>
                            <p className="text-[11px] text-neutral-600 truncate">
                              {photo.caption}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => handleHeartClick(photo.id, e)}
                            className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 text-xs font-bold transition-transform active:scale-90"
                            title="React with love!"
                          >
                            <Heart
                              size={12}
                              className={reactionCount > 0 ? 'fill-pink-500 text-pink-500' : 'text-pink-500'}
                            />
                            <span>{reactionCount > 0 ? reactionCount : 'Love'}</span>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Strip Bottom Vintage Stamp */}
                  <div className="pt-2 text-center border-t border-dashed border-neutral-300">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                      ✦ CELEBRATION ARCHIVE • MEMORY FILM 01 ✦
                    </span>
                  </div>
                </div>
              </div>

              {/* STRIP 2: "The Golden Vibes Strip" */}
              <div className="relative flex flex-col items-center">
                {/* Washi Tape Accent at Top */}
                <div className="absolute -top-3 z-30 w-32 h-7 bg-pink-200/90 border border-pink-300 shadow-sm transform rotate-2 rounded-sm backdrop-blur-sm flex items-center justify-center text-[10px] font-bold text-pink-900 tracking-wider uppercase">
                  ★ PHOTO STRIP #02 ★
                </div>

                {/* The Vertical Physical Strip */}
                <div className="w-full bg-[#fdfbf7] border-4 border-white shadow-[0_15px_35px_rgba(0,0,0,0.12)] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 relative overflow-hidden">
                  {/* Sprocket Holes Decoration */}
                  <div className="absolute left-1.5 top-6 bottom-6 flex flex-col justify-between py-2 pointer-events-none opacity-30">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-1.5 h-2.5 rounded-sm bg-purple-900 mb-1" />
                    ))}
                  </div>
                  <div className="absolute right-1.5 top-6 bottom-6 flex flex-col justify-between py-2 pointer-events-none opacity-30">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-1.5 h-2.5 rounded-sm bg-purple-900 mb-1" />
                    ))}
                  </div>

                  {/* Strip Header Watermark */}
                  <div className="text-center pt-2 pb-1 border-b border-neutral-200/70">
                    <span className="font-['Caveat'] text-lg font-bold text-purple-900 tracking-wide">
                      Infinite Laughs & Chaos 💖
                    </span>
                    <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
                      2026.10 • GOLDEN MEMORIES
                    </p>
                  </div>

                  {/* 4 Photos Stacked Vertically in Strip 2 */}
                  {strip2Photos.map((photo, index) => {
                    const sticker = FUN_STICKERS[index + 4] || FUN_STICKERS[0];
                    const reactionCount = reactions[photo.id] || 0;

                    return (
                      <motion.div
                        key={photo.id}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => onPhotoClick(photo)}
                        className="group relative bg-white rounded-xl p-2.5 border border-neutral-200/90 shadow-sm hover:shadow-md cursor-pointer transition-all"
                      >
                        {/* Frame Number Tag */}
                        <div className="absolute top-3.5 left-3.5 z-20 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-mono font-bold backdrop-blur-sm">
                          0{index + 5}
                        </div>

                        {/* Uncropped Photo Container */}
                        <div className="relative w-full h-56 sm:h-64 rounded-lg overflow-hidden bg-neutral-900/10 flex items-center justify-center">
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
                            className="relative z-10 max-w-full max-h-full object-contain p-1 drop-shadow transition-transform duration-300 group-hover:scale-105"
                          />
                          <span
                            className={`absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-full text-[10px] font-bold border shadow-sm ${sticker.bg}`}
                          >
                            {sticker.tag}
                          </span>
                          <span className="absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-medium backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            <ZoomIn size={10} /> Full View
                          </span>
                        </div>

                        {/* Caption & Heart Reaction */}
                        <div className="mt-2 flex items-center justify-between px-1">
                          <div className="min-w-0 flex-1 mr-2 text-left">
                            <h4 className="font-['Fredoka'] text-xs sm:text-sm font-semibold text-purple-950 truncate">
                              {photo.title}
                            </h4>
                            <p className="text-[11px] text-neutral-600 truncate">
                              {photo.caption}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => handleHeartClick(photo.id, e)}
                            className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 text-xs font-bold transition-transform active:scale-90"
                            title="React with love!"
                          >
                            <Heart
                              size={12}
                              className={reactionCount > 0 ? 'fill-pink-500 text-pink-500' : 'text-pink-500'}
                            />
                            <span>{reactionCount > 0 ? reactionCount : 'Love'}</span>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Strip Bottom Vintage Stamp */}
                  <div className="pt-2 text-center border-t border-dashed border-neutral-300">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                      ✦ CELEBRATION ARCHIVE • MEMORY FILM 02 ✦
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ALIGNMENT VARIANT B: CONTINUOUS FILM REEL TRACK */}
        {layoutMode === 'reel' && (
          <div className="relative py-6 px-4 rounded-3xl bg-neutral-950 text-white shadow-2xl border-2 border-purple-500/30 overflow-hidden">
            {/* Film Edge Sprocket Perforations Top & Bottom */}
            <div className="flex justify-between items-center px-4 pb-4 border-b border-neutral-800">
              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="w-5 h-3 rounded-sm bg-neutral-700/80 shrink-0" />
                ))}
              </div>
              <span className="text-xs font-mono text-purple-300 shrink-0 uppercase tracking-widest ml-4">
                35MM REEL • SAVITHA ROLLS
              </span>
            </div>

            {/* Scrolling Film Strip */}
            <div
              ref={reelRef}
              className="flex gap-6 overflow-x-auto py-6 px-2 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-neutral-900"
            >
              {SAVITHA_FUN_ZONE_PHOTOS.map((photo, index) => {
                const reactionCount = reactions[photo.id] || 0;
                const sticker = FUN_STICKERS[index] || FUN_STICKERS[0];

                return (
                  <div
                    key={photo.id}
                    onClick={() => onPhotoClick(photo)}
                    className="shrink-0 w-72 sm:w-80 snap-center bg-neutral-900 rounded-2xl p-4 border border-neutral-800 hover:border-pink-500/60 shadow-xl cursor-pointer group transition-all"
                  >
                    <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-2">
                      <span>FRAME #{index + 1}</span>
                      <span className="text-[10px] text-pink-400 font-bold">{sticker.tag}</span>
                    </div>

                    <div className="relative w-full h-64 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                      <img
                        src={photo.url}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110"
                      />
                      <img
                        src={photo.url}
                        alt={photo.title}
                        loading="lazy"
                        className="relative z-10 max-w-full max-h-full object-contain p-1 drop-shadow transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-medium flex items-center gap-1">
                        <ZoomIn size={10} /> Full View
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="min-w-0 flex-1 mr-2 text-left">
                        <p className="font-['Fredoka'] text-sm font-semibold text-white truncate">
                          {photo.title}
                        </p>
                        <p className="text-xs text-neutral-400 truncate">
                          {photo.caption}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleHeartClick(photo.id, e)}
                        className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/40 text-xs font-bold"
                      >
                        <Heart size={12} className={reactionCount > 0 ? 'fill-pink-400' : ''} />
                        <span>{reactionCount > 0 ? reactionCount : 'Love'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Sprockets */}
            <div className="flex gap-4 overflow-hidden px-4 pt-4 border-t border-neutral-800">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="w-5 h-3 rounded-sm bg-neutral-700/80 shrink-0" />
              ))}
            </div>
          </div>
        )}

        {/* ALIGNMENT VARIANT C: STAGGERED ASYMMETRIC SCRAPBOOK */}
        {layoutMode === 'scrapbook' && (
          <div className="py-8 px-4 rounded-3xl bg-[#fffdfa] border-2 border-dashed border-amber-300 shadow-lg relative overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SAVITHA_FUN_ZONE_PHOTOS.map((photo, index) => {
                const reactionCount = reactions[photo.id] || 0;
                const sticker = FUN_STICKERS[index] || FUN_STICKERS[0];
                const tilt = index % 3 === 0 ? '-rotate-2' : index % 2 === 0 ? 'rotate-2' : '-rotate-1';

                return (
                  <motion.div
                    key={photo.id}
                    whileHover={{ scale: 1.04, rotate: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => onPhotoClick(photo)}
                    className={`bg-white rounded-2xl p-3 border border-amber-200 shadow-md hover:shadow-xl cursor-pointer transition-all transform ${tilt}`}
                  >
                    {/* Washi Clip */}
                    <div className="w-16 h-4 bg-amber-300/80 mx-auto -mt-4 mb-2 rounded shadow-sm border border-amber-400/60" />

                    <div className="relative w-full h-56 rounded-xl overflow-hidden bg-neutral-100 flex items-center justify-center">
                      <img
                        src={photo.url}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110"
                      />
                      <img
                        src={photo.url}
                        alt={photo.title}
                        loading="lazy"
                        className="relative z-10 max-w-full max-h-full object-contain p-1 drop-shadow"
                      />
                      <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold border shadow-sm ${sticker.bg}`}>
                        {sticker.tag}
                      </span>
                    </div>

                    <div className="mt-2.5 px-1 text-left">
                      <h4 className="font-['Caveat'] text-lg font-bold text-purple-950 truncate">
                        {photo.title}
                      </h4>
                      <p className="text-[11px] text-neutral-600 truncate">
                        {photo.caption}
                      </p>
                      <div className="mt-2 flex items-center justify-between pt-1 border-t border-neutral-100">
                        <span className="text-[10px] font-mono text-neutral-400">
                          #{index + 1} POLAROID
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleHeartClick(photo.id, e)}
                          className="flex items-center gap-1 text-pink-600 text-xs font-bold hover:scale-110 transition-transform"
                        >
                          <Heart size={12} className={reactionCount > 0 ? 'fill-pink-500' : ''} />
                          <span>{reactionCount > 0 ? reactionCount : 'Love'}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. MYSTERY MOMENT CARDS (Deck / Vault Alignment) */}
      <div className="mb-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 px-2 pb-3 border-b border-purple-200/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Sparkles size={20} />
            </div>
            <div className="text-left">
              <h3 className="font-['Fredoka'] text-lg sm:text-xl font-bold text-purple-950">
                Mystery Moment Cards 🔮
              </h3>
              <p className="text-xs text-purple-600 font-medium">
                Tap each card to flip and unmask secret squad banter & moments!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollReel(mysteryReelRef, 'left')}
              className="w-8 h-8 rounded-full bg-white border border-purple-200 text-purple-800 flex items-center justify-center hover:bg-purple-50 shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollReel(mysteryReelRef, 'right')}
              className="w-8 h-8 rounded-full bg-white border border-purple-200 text-purple-800 flex items-center justify-center hover:bg-purple-50 shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
            <button
              type="button"
              onClick={toggleAllMysteryCards}
              className="px-3.5 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ml-2"
            >
              <span>
                {Object.values(revealedCards).filter(Boolean).length === mysteryCards.length
                  ? '🔒 Hide All'
                  : '🔓 Unmask All'}
              </span>
            </button>
          </div>
        </div>

        {/* Horizontal Swipeable Mystery Deck with Custom Badges */}
        <div
          ref={mysteryReelRef}
          className="flex gap-5 overflow-x-auto pb-4 pt-2 px-1 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-purple-300"
        >
          {mysteryCards.map((card) => {
            const isRevealed = revealedCards[card.id];
            const isPortrait = card.photo.orientation === 'portrait';

            return (
              <motion.div
                key={card.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => toggleCardReveal(card.id)}
                className="shrink-0 w-72 sm:w-80 snap-center cursor-pointer select-none rounded-3xl overflow-hidden border-2 border-purple-200/90 shadow-md hover:shadow-xl transition-all bg-white flex flex-col justify-between"
              >
                {!isRevealed ? (
                  <div className="p-7 min-h-[320px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-100 via-pink-100/70 to-amber-50">
                    <div className="w-16 h-16 rounded-2xl bg-white/95 flex items-center justify-center text-purple-600 shadow-md mb-3 border border-purple-100 animate-pulse">
                      <HelpCircle size={32} />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-purple-200/80 text-purple-800 text-xs font-bold uppercase tracking-wider mb-2">
                      Mystery Card #{card.id + 1}
                    </span>
                    <p className="font-['Fredoka'] font-bold text-purple-950 text-base">
                      {card.teaser}
                    </p>
                    <span className="text-xs text-purple-600 mt-2 font-semibold underline decoration-dotted">
                      {card.hint}
                    </span>
                  </div>
                ) : (
                  <div className="p-3 bg-white rounded-3xl flex flex-col items-center justify-between min-h-[320px] flex-1">
                    <div
                      className={`relative w-full rounded-2xl overflow-hidden bg-purple-950/10 flex items-center justify-center group ${
                        isPortrait ? 'h-72' : 'h-52'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onPhotoClick(card.photo);
                      }}
                      title="Click to view full photo"
                    >
                      <img
                        src={card.photo.url}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110"
                      />
                      <img
                        src={card.photo.url}
                        alt="Mystery revealed"
                        loading="lazy"
                        className="relative z-10 max-w-full max-h-full object-contain p-1 drop-shadow transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-sm">
                        Unlocked 🔓
                      </span>
                      <span className="absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded-lg bg-black/60 text-white text-[10px] font-semibold backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity">
                        🔍 Full View
                      </span>
                    </div>

                    <div className="w-full pt-3 pb-1 px-1 text-center">
                      <p className="text-xs sm:text-sm text-purple-950 font-bold leading-snug">
                        {card.punchline}
                      </p>
                      <span className="text-[10px] text-purple-500 font-medium block mt-1">
                        Tap again to re-hide 🔒
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. GUESS THE MOMENT MINI GAME (Single Dedicated Pic) */}
      <div className="max-w-2xl mx-auto rounded-3xl bg-white/95 border border-purple-200 p-6 sm:p-8 shadow-xl text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold mb-3">
          <Sparkles size={12} className="text-amber-600" />
          <span>Interactive Trivia Game</span>
        </div>

        <h3 className="font-['Fredoka'] text-xl sm:text-2xl font-bold text-purple-950 mb-4">
          Guess the Moment! 🎯
        </h3>

        {/* Question Photo - Full Uncropped */}
        <div
          className="relative h-64 sm:h-72 w-full max-w-md mx-auto rounded-2xl overflow-hidden bg-purple-950/10 mb-4 shadow-md flex items-center justify-center cursor-pointer group border border-purple-100"
          onClick={() => onPhotoClick(guessQuiz.photo)}
          title="Click to view full photo"
        >
          <img
            src={guessQuiz.photo.url}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110"
          />
          <img
            src={guessQuiz.photo.url}
            alt={guessQuiz.photo.title}
            className="relative z-10 max-w-full max-h-full object-contain drop-shadow transition-transform group-hover:scale-105"
          />
          <span className="absolute bottom-2.5 right-2.5 z-20 px-2.5 py-1 rounded-full bg-white/90 text-purple-900 text-xs font-semibold shadow-sm flex items-center gap-1">
            🔍 Click for Full View
          </span>
        </div>

        <p className="font-semibold text-purple-900 text-sm sm:text-base mb-4">
          {guessQuiz.question}
        </p>

        {/* Options */}
        <div className="space-y-2.5 max-w-md mx-auto">
          {guessQuiz.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === guessQuiz.correctIndex;

            let btnStyle = 'bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-200';
            if (selectedAnswer !== null) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-100 text-emerald-900 border-emerald-300 ring-2 ring-emerald-400 font-bold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-pink-100 text-pink-900 border-pink-300 opacity-85';
              } else {
                btnStyle = 'bg-neutral-50 text-neutral-400 border-neutral-200 opacity-60';
              }
            }

            return (
              <button
                type="button"
                key={idx}
                disabled={selectedAnswer !== null}
                onClick={() => handleQuizSelect(idx)}
                className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{option}</span>
                {selectedAnswer !== null && isCorrect && (
                  <CheckCircle size={18} className="text-emerald-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Answer Feedback & Reset */}
        {selectedAnswer !== null && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 pt-4 border-t border-purple-100"
          >
            <p className="text-xs sm:text-sm font-semibold text-purple-900 mb-3">
              {selectedAnswer === guessQuiz.correctIndex ? `🎉 ${guessQuiz.successNote}` : `💡 ${guessQuiz.retryNote}`}
            </p>
            <button
              type="button"
              onClick={() => setSelectedAnswer(null)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-md transition-colors"
            >
              Play Again 🔄
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
