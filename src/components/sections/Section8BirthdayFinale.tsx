import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Heart, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SPECIAL_SURPRISE_PHOTO, type MediaItem } from '../../data/media';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';

interface Section8BirthdayFinaleProps {
  onPhotoClick: (item: MediaItem) => void;
}

export const Section8BirthdayFinale: React.FC<Section8BirthdayFinaleProps> = ({ onPhotoClick }) => {
  const shouldReduceMotion = useReducedMotion();

  // Candles state: 3 candles (true = lit, false = blown out)
  const [candles, setCandles] = useState<boolean[]>([true, true, true]);
  const [allBlown, setAllBlown] = useState<boolean>(false);
  const remainingCandles = candles.filter(Boolean).length;

  const blowCandle = (index: number) => {
    if (!candles[index]) return; // already blown

    const nextCandles = [...candles];
    nextCandles[index] = false;
    setCandles(nextCandles);

    // If all candles are now blown
    if (nextCandles.every((c) => !c)) {
      setAllBlown(true);
      triggerGrandFinaleConfetti();
    }
  };

  const relightCandles = () => {
    setCandles([true, true, true]);
    setAllBlown(false);
  };

  const triggerGrandFinaleConfetti = () => {
    try {
      const count = 120;
      confetti({
        particleCount: count,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#c084fc', '#fde047', '#6ee7b7', '#fbcfe8', '#a855f7'],
        disableForReducedMotion: shouldReduceMotion ?? false,
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 70,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#f472b6', '#fde047', '#c084fc'],
          disableForReducedMotion: shouldReduceMotion ?? false,
        });
      }, 200);

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 70,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#6ee7b7', '#f472b6', '#a855f7'],
          disableForReducedMotion: shouldReduceMotion ?? false,
        });
      }, 400);
    } catch {
      // ignore
    }
  };

  return (
    <section id="birthday-finale" className="w-full max-w-5xl mx-auto px-4 py-16 text-center">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100/90 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles size={13} className="text-yellow-500" />
          <span>Section 8 • Birthday Finale</span>
        </div>
        <h2 className="font-['Fredoka'] text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-950 via-pink-600 to-purple-800">
          Make a Birthday Wish, Savitha! 🎂
        </h2>
        <p className="text-sm sm:text-base text-purple-700/85 max-w-lg mt-2 font-medium">
          {allBlown
            ? 'All candles blown! May every wish you whispered come true ✨'
            : 'Tap each flickering candle flame to make a wish and blow it out!'}
        </p>
      </div>

      {/* INTERACTIVE BIRTHDAY CAKE */}
      <div className="relative my-8 flex flex-col items-center justify-center">
        {/* Cake Glow */}
        <div className="absolute inset-0 max-w-md mx-auto rounded-full bg-gradient-to-tr from-pink-200/50 via-yellow-100/40 to-purple-200/40 blur-2xl pointer-events-none" />

        {/* Cake Illustration with Candles */}
        <div className="relative z-10 w-72 sm:w-84 flex flex-col items-center">
          {/* 3 CANDLES */}
          <div className="flex items-end justify-center gap-6 sm:gap-12 mb-[-8px] z-20">
            {candles.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => blowCandle(idx)}
                className="flex flex-col items-center cursor-pointer group select-none p-3 -m-1.5 touch-manipulation min-w-[52px] min-h-[64px]"
                title={isLit ? 'Tap to blow out candle!' : 'Candle blown!'}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    blowCandle(idx);
                  }
                }}
              >
                {/* Flame or Smoke */}
                <div className="h-9 flex items-center justify-center pointer-events-none">
                  {isLit ? (
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? {}
                          : {
                              scale: [1, 1.15, 0.95, 1],
                              rotate: [-2, 3, -3, 2, 0],
                            }
                      }
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: idx * 0.2,
                      }}
                      className="w-5 h-8 rounded-full bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-100 shadow-[0_0_14px_rgba(250,204,21,0.9)] flex items-center justify-center"
                    >
                      <div className="w-1.5 h-3 bg-white rounded-full opacity-80" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: [0.8, 0], y: -16, x: idx % 2 === 0 ? 4 : -4 }}
                      transition={{ duration: 1.2 }}
                      className="text-xs text-purple-400 font-bold"
                    >
                      💨
                    </motion.div>
                  )}
                </div>

                {/* Candle Stick */}
                <div
                  className={`w-4 h-12 rounded-t-sm shadow-sm transition-colors ${
                    idx === 0
                      ? 'bg-gradient-to-b from-pink-300 to-pink-400'
                      : idx === 1
                      ? 'bg-gradient-to-b from-purple-300 to-purple-400'
                      : 'bg-gradient-to-b from-yellow-200 to-yellow-300'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* CAKE TIERS SVG */}
          <svg
            width="280"
            height="180"
            viewBox="0 0 280 180"
            fill="none"
            className="drop-shadow-xl"
          >
            {/* Top Tier */}
            <rect x="50" y="20" width="180" height="60" rx="16" fill="#fdf2f8" stroke="#f472b6" strokeWidth="2.5" />
            <path d="M50 42C70 50 90 42 110 50C130 42 150 50 170 42C190 50 210 42 230 46V30C230 25 225 20 220 20H60C55 20 50 25 50 30V42Z" fill="#fbcfe8" />
            {/* Sugar Pearls on Top Tier */}
            <circle cx="75" cy="62" r="3" fill="#ec4899" />
            <circle cx="105" cy="62" r="3" fill="#eab308" />
            <circle cx="140" cy="62" r="3" fill="#a855f7" />
            <circle cx="175" cy="62" r="3" fill="#ec4899" />
            <circle cx="205" cy="62" r="3" fill="#10b981" />

            {/* Bottom Tier */}
            <rect x="20" y="75" width="240" height="85" rx="20" fill="#f5effa" stroke="#a855f7" strokeWidth="2.5" />
            <path d="M20 105C45 115 70 105 95 115C120 105 145 115 170 105C195 115 220 105 245 115C255 115 260 110 260 105V90C260 82 254 75 245 75H35C27 75 20 82 20 90V105Z" fill="#e9d5ff" />
            {/* Cute bottom cream rosettes */}
            <circle cx="50" cy="138" r="4" fill="#f472b6" />
            <circle cx="90" cy="138" r="4" fill="#ca8a04" />
            <circle cx="140" cy="138" r="4" fill="#9333ea" />
            <circle cx="190" cy="138" r="4" fill="#f472b6" />
            <circle cx="230" cy="138" r="4" fill="#059669" />

            {/* Plate */}
            <ellipse cx="140" cy="168" rx="136" ry="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          </svg>
        </div>

      </div>

      {/* REVEAL ON CANDLE BLOWOUT:
          - While !allBlown: Interactive banner guiding Savitha to blow out the candles
          - Once allBlown: Grand reveal with WhatsApp Image 2026-10-22 at 9.39.45 PM.jpeg, heartfelt birthday wish, and relight option
      */}
      <AnimatePresence mode="wait">
        {!allBlown ? (
          <motion.div
            key="candles-hint"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-6 max-w-md mx-auto rounded-3xl bg-white/85 backdrop-blur-md border border-purple-200/90 p-5 shadow-lg text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-100 to-purple-100 text-pink-600 mb-3 shadow-inner">
              <Sparkles size={22} className="animate-pulse text-amber-500" />
            </div>
            <h4 className="font-['Fredoka'] text-lg sm:text-xl font-bold text-purple-950">
              Blow Out the Candles to Unlock Your Surprise! 🕯️✨
            </h4>
            <p className="text-xs sm:text-sm text-purple-700/90 mt-1.5 font-medium leading-relaxed">
              Tap each candle flame or button below ({remainingCandles} remaining). A special birthday picture and personal wish are waiting for you! 🎁
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              {candles.map((lit, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => blowCandle(i)}
                  className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all active:scale-95 touch-manipulation ${
                    lit
                      ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 shadow-xs cursor-pointer'
                      : 'bg-gray-100 text-gray-400 line-through cursor-default'
                  }`}
                >
                  Candle {i + 1} {lit ? '🔥 (Tap to blow)' : '💨 (Blown)'}
                </button>
              ))}
            </div>

            {/* Quick button to blow all candles at once on mobile/touch */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => {
                  setCandles([false, false, false]);
                  setAllBlown(true);
                  triggerGrandFinaleConfetti();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all touch-manipulation inline-flex items-center justify-center gap-2"
              >
                <span>Blow Out All Candles 💨✨</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="surprise-revealed"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.65, type: 'spring', bounce: 0.3 }}
            className="mt-8 max-w-2xl mx-auto rounded-3xl bg-gradient-to-b from-white/98 via-pink-50/50 to-purple-50/70 border-2 border-pink-200/90 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Top decorative badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white text-xs sm:text-sm font-bold shadow-md mb-6 tracking-wide uppercase">
              <PartyPopper size={16} />
              <span>Surprise Unlocked! Birthday Wish for Savitha</span>
              <Heart size={14} className="fill-white text-white" />
            </div>

            {/* Special Photo in Polaroid Frame (WhatsApp Image 2026-10-22 at 9.39.45 PM.jpeg) */}
            <div className="flex flex-col items-center justify-center mb-6">
              <motion.div
                whileHover={{ scale: 1.03, rotate: 0 }}
                initial={{ rotate: -1.5 }}
                className="bg-white p-3.5 sm:p-4 pb-5 rounded-2xl shadow-xl border border-pink-200/80 cursor-pointer max-w-xs transition-shadow hover:shadow-2xl"
                onClick={() => onPhotoClick(SPECIAL_SURPRISE_PHOTO)}
                title="Click to enlarge Savitha's special photo"
              >
                <div className="w-56 h-64 sm:w-64 sm:h-72 rounded-xl overflow-hidden bg-purple-50 relative group">
                  <img
                    src={SPECIAL_SURPRISE_PHOTO.url}
                    alt="Savitha special birthday surprise photo"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold backdrop-blur-[1px]">
                    🔍 Click to enlarge
                  </div>
                </div>
                <p className="font-['Caveat'] text-xl sm:text-2xl text-purple-900 font-bold text-center mt-3">
                  One little picture, a million memories. 💗
                </p>
              </motion.div>
            </div>

            {/* Birthday Wish Text */}
            <div className="space-y-2">
              <h3 className="font-['Fredoka'] text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-700 to-purple-950">
                Happy Birthday, Savitha! 🎂🎉
              </h3>
              <p className="font-['Caveat'] text-2xl sm:text-3xl text-pink-600 font-bold">
                {BIRTHDAY_CONFIG.recipient.nickname}
              </p>

              <p className="text-purple-900/90 text-sm sm:text-base mt-4 leading-relaxed max-w-lg mx-auto font-medium">
                Wishing you endless smiles, laughter, and all the love in the universe. Thank you for bringing so much light into our lives. Keep shining always, thangaveluuuuuuu! 🫶🏻✨
              </p>
            </div>

            {/* Relight Candles Action */}
            <div className="mt-8 pt-6 border-t border-purple-100/90 flex justify-center">
              <button
                type="button"
                onClick={relightCandles}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 shadow-md text-xs sm:text-sm font-semibold transition-all hover:shadow-lg active:scale-95"
              >
                <RotateCcw size={15} />
                <span>Relight Candles 🕯️</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
