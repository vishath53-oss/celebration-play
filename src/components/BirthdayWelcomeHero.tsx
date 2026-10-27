import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Calendar, Lock, Heart, Camera, Users, Video } from 'lucide-react';
import { SAVITHA_ALONE_PHOTOS } from '../data/media';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';

interface BirthdayWelcomeHeroProps {
  onLockGate: () => void;
  onPhotoClick: (index: number) => void;
}

export const BirthdayWelcomeHero: React.FC<BirthdayWelcomeHeroProps> = ({
  onLockGate,
  onPhotoClick,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const spotlightPhoto = SAVITHA_ALONE_PHOTOS[0];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 pt-6 pb-10 text-center relative">
      {/* Top Controls Bar */}
      <div className="w-full flex items-center justify-between pb-6 border-b border-purple-200/50">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-purple-800 text-xs font-semibold">
          <Sparkles size={13} className="text-pink-500" />
          <span>Section 1 & 2 Unlocked</span>
        </div>

        <button
          type="button"
          onClick={onLockGate}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 hover:bg-white text-purple-700 hover:text-purple-900 border border-purple-200/80 shadow-sm text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <Lock size={13} />
          <span>Lock Surprise Gate</span>
        </button>
      </div>

      {/* Hero Presentation */}
      <div className="pt-8 sm:pt-12 flex flex-col items-center">
        {/* Glowing Photo Frame for Savitha */}
        <motion.div
          className="relative cursor-pointer group"
          onClick={() => onPhotoClick(0)}
          whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated Glow Halos */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-yellow-300 blur-lg opacity-60 group-hover:opacity-90 transition-opacity animate-pulse" />

          {/* Photo Frame Container */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-purple-500 via-pink-400 to-yellow-200 shadow-xl">
            <img
              src={spotlightPhoto.url}
              alt="Savitha"
              className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Birthday Crown / Star Badge */}
          <div className="absolute -bottom-1 -right-1 px-3 py-1 rounded-full bg-white/95 border border-pink-200 text-pink-600 text-xs font-bold shadow-md flex items-center gap-1">
            <Heart size={12} fill="currentColor" />
            <span>Birthday Star</span>
          </div>
        </motion.div>

        {/* Headings */}
        <div className="mt-6 space-y-2 max-w-2xl">
          <h1 className="font-['Fredoka'] text-3xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-950 via-pink-600 to-purple-800">
            Happy Birthday, Savitha! 🎉
          </h1>
          <p className="font-['Caveat'] text-2xl sm:text-3xl text-purple-700 font-semibold">
            To our dearest {BIRTHDAY_CONFIG.recipient.nickname} 💜
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-purple-200/80 text-purple-900 text-xs sm:text-sm font-semibold shadow-sm mt-1">
            <Calendar size={14} className="text-purple-500" />
            <span>{BIRTHDAY_CONFIG.recipient.birthdayDate}</span>
          </div>
          <p className="text-purple-800/85 text-sm sm:text-base max-w-xl mx-auto pt-2 leading-relaxed">
            Welcome to your secret birthday universe! Every photo, smile, and video inside
            was hand-picked to celebrate our journey and the wonderful person you are.
          </p>
        </div>

        {/* Quick Navigation Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#savitha-spotlight"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 hover:bg-white text-purple-900 border border-purple-200/80 shadow-sm hover:shadow text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            <Camera size={15} className="text-pink-500" />
            <span>Savitha's Spotlight (3)</span>
          </a>

          <a
            href="#friendship-memories"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 hover:bg-white text-purple-900 border border-purple-200/80 shadow-sm hover:shadow text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            <Users size={15} className="text-purple-500" />
            <span>Friendship Memories (46)</span>
          </a>

          <a
            href="#video-moments"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 hover:bg-white text-purple-900 border border-purple-200/80 shadow-sm hover:shadow text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            <Video size={15} className="text-amber-500" />
            <span>Video Moments (8)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
