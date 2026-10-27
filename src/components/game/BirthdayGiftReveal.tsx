import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, ZoomIn, RotateCcw, Map } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SPECIAL_SURPRISE_PHOTO, type MediaItem } from '../../data/media';

interface BirthdayGiftRevealProps {
  onPhotoClick: (item: MediaItem) => void;
  onReplayAdventure: () => void;
  onRevisitMemories: () => void;
}

export const BirthdayGiftReveal: React.FC<BirthdayGiftRevealProps> = ({
  onPhotoClick,
  onReplayAdventure,
  onRevisitMemories,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    setIsOpen(true);
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#c084fc', '#fde047', '#6ee7b7', '#fbcfe8', '#a855f7'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 70,
          origin: { x: 0.15, y: 0.65 },
          colors: ['#f472b6', '#fbbf24', '#a855f7'],
        });
      }, 250);
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 70,
          origin: { x: 0.85, y: 0.65 },
          colors: ['#38bdf8', '#f472b6', '#c084fc'],
        });
      }, 450);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10 flex flex-col items-center text-center animate-fadeIn">
      {/* Decorative Header Badge */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold uppercase tracking-widest shadow-xs mb-3">
        <Sparkles size={13} className="text-pink-500" />
        <span>THE GRAND FINALE SURPRISE 🎁</span>
      </div>

      <h2 className="font-['Fredoka'] text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-950 via-pink-600 to-purple-800 tracking-tight leading-tight">
        One Last Little Surprise, Savitha! 💝
      </h2>

      <p className="text-sm sm:text-base text-purple-700/85 max-w-lg mt-2 font-medium leading-relaxed">
        You've completed the adventure. There's one more little thing waiting for you.
      </p>

      {/* GIFT BOX INTERACTION */}
      <div className="my-8 flex flex-col items-center">
        {!isOpen ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center"
          >
            {/* 3D Animated Gift Box */}
            <div className="relative w-44 h-44 cursor-pointer" onClick={handleOpenGift}>
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full flex items-center justify-center"
              >
                <div className="relative w-36 h-36 rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-400 to-purple-500 shadow-2xl border-4 border-white/80 flex items-center justify-center">
                  {/* Gift Ribbons */}
                  <div className="absolute inset-x-0 h-8 bg-amber-300 shadow-inner" />
                  <div className="absolute inset-y-0 w-8 bg-amber-300 shadow-inner" />
                  {/* Big Gold Bow */}
                  <div className="absolute -top-4 w-14 h-10 rounded-full bg-amber-400 border-2 border-white shadow-md flex items-center justify-center text-lg">
                    🎀
                  </div>
                  {/* Gentle Sparkle icons */}
                  <Sparkles size={24} className="text-white relative z-10 animate-spin" />
                </div>
              </motion.div>
            </div>

            <button
              type="button"
              onClick={handleOpenGift}
              className="mt-6 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white font-['Fredoka'] text-lg font-bold shadow-xl shadow-pink-500/30 transition-all transform hover:-translate-y-0.5 active:scale-98 flex items-center gap-2"
            >
              <Gift size={20} />
              <span>OPEN MY GIFT</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center"
          >
            {/* POLAROID FRAME WITH REAL IMAGE */}
            <div className="relative p-3.5 sm:p-5 pb-8 sm:pb-10 rounded-2xl bg-white shadow-2xl border border-purple-200/80 transform rotate-1 hover:rotate-0 transition-transform duration-300 max-w-sm sm:max-w-md">
              {/* Tape Accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-100/90 border border-amber-200/70 shadow-xs rotate-[-2deg]" />

              {/* Photo click to enlarge */}
              <button
                type="button"
                onClick={() => onPhotoClick(SPECIAL_SURPRISE_PHOTO)}
                className="group relative block w-full aspect-[4/5] rounded-xl overflow-hidden bg-purple-50 shadow-inner cursor-zoom-in"
                title="Click to view larger"
              >
                <img
                  src={SPECIAL_SURPRISE_PHOTO.url}
                  alt={SPECIAL_SURPRISE_PHOTO.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm text-purple-900 text-xs font-bold shadow-md flex items-center gap-1.5">
                    <ZoomIn size={14} />
                    <span>View Fullscreen</span>
                  </div>
                </div>
              </button>

              {/* Handwritten Style Caption */}
              <p className="font-['Caveat'] text-2xl sm:text-3xl text-purple-900 font-bold mt-4 leading-snug">
                One little picture, a million memories. 💗
              </p>
            </div>

            {/* FINAL EMOTIONAL BIRTHDAY MESSAGE */}
            <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-purple-200 shadow-xl max-w-xl text-center">
              <h3 className="font-['Fredoka'] text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-950 via-pink-600 to-purple-800">
                HAPPY BIRTHDAY, SAVITHA! 🎂💗
              </h3>

              <p className="text-base sm:text-lg text-purple-900 font-medium leading-relaxed mt-4">
                Another year older, another year more wonderful. I hope your life is filled with happiness, good health, beautiful memories, and countless reasons to smile.
              </p>

              <p className="font-['Caveat'] text-2xl sm:text-3xl text-pink-600 font-bold mt-3">
                Stay happy, stay healthy, and keep shining, thangaveluuuuuuu! 🫶🏻
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onReplayAdventure}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-['Fredoka'] text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} />
                  <span>REPLAY THE ADVENTURE 🎮</span>
                </button>

                <button
                  type="button"
                  onClick={onRevisitMemories}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Map size={16} className="text-purple-600" />
                  <span>REVISIT MEMORIES 📸</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
