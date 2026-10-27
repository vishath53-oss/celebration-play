import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Heart, Camera, ArrowDown } from 'lucide-react';
import { SAVITHA_ALONE_PHOTOS, type MediaItem } from '../../data/media';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';

interface Section2WelcomeProps {
  onPhotoClick: (item: MediaItem) => void;
}

export const Section2Welcome: React.FC<Section2WelcomeProps> = ({ onPhotoClick }) => {
  const shouldReduceMotion = useReducedMotion();
  const mainPhoto = SAVITHA_ALONE_PHOTOS[0];
  const floatingPhoto1 = SAVITHA_ALONE_PHOTOS[1];
  const floatingPhoto2 = SAVITHA_ALONE_PHOTOS[2];

  return (
    <section id="welcome" className="w-full max-w-5xl mx-auto px-4 pt-4 pb-12 text-center relative">
      {/* Hero Content */}
      <div className="flex flex-col items-center">
        {/* Main Photo & Floating Polaroids Collage */}
        <div className="relative my-4 sm:my-6 flex items-center justify-center">
          {/* Floating Left Polaroid (Savitha Photo 2) */}
          {floatingPhoto1 && (
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: -4, zIndex: 30 }}
              initial={shouldReduceMotion ? {} : { rotate: -9, x: -20, opacity: 0 }}
              animate={shouldReduceMotion ? {} : { rotate: -8, x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => onPhotoClick(floatingPhoto1)}
              className="hidden sm:block absolute -left-28 md:-left-36 top-4 w-32 md:w-40 p-2 pb-5 bg-white rounded-2xl shadow-[0_12px_30px_rgba(168,85,247,0.18)] border border-pink-200/80 cursor-pointer transform -rotate-8 z-10 transition-shadow hover:shadow-2xl"
              title="Click to enlarge"
            >
              {/* Cute Washi Tape Graphic */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-pink-200/80 rounded-sm transform -rotate-3 border border-pink-300/60" />
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-purple-50">
                <img
                  src={floatingPhoto1.url}
                  alt={floatingPhoto1.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-['Caveat'] text-xs md:text-sm text-purple-900 font-semibold mt-1.5 truncate">
                {floatingPhoto1.title}
              </p>
            </motion.div>
          )}

          {/* Center Main Highlight Portrait (Savitha Photo 1) */}
          <motion.div
            className="relative cursor-pointer group z-20"
            onClick={() => onPhotoClick(mainPhoto)}
            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
            transition={{ duration: 0.3 }}
            title="Click to view full photo"
          >
            {/* Animated Glow Halo */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-yellow-300 blur-xl opacity-60 group-hover:opacity-90 transition-opacity animate-pulse" />

            {/* Glowing Ring Frame */}
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden p-2 bg-gradient-to-tr from-purple-500 via-pink-400 to-yellow-200 shadow-2xl">
              <img
                src={mainPhoto.url}
                alt="Savitha - Birthday Star"
                className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Birthday Star Badge */}
            <div className="absolute -bottom-2 right-2 px-3.5 py-1 rounded-full bg-white/95 border border-pink-200 text-pink-600 text-xs font-bold shadow-lg flex items-center gap-1.5">
              <Heart size={13} fill="currentColor" />
              <span>Birthday Star</span>
            </div>
          </motion.div>

          {/* Floating Right Polaroid (Savitha Photo 3) */}
          {floatingPhoto2 && (
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 4, zIndex: 30 }}
              initial={shouldReduceMotion ? {} : { rotate: 9, x: 20, opacity: 0 }}
              animate={shouldReduceMotion ? {} : { rotate: 8, x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={() => onPhotoClick(floatingPhoto2)}
              className="hidden sm:block absolute -right-28 md:-right-36 top-4 w-32 md:w-40 p-2 pb-5 bg-white rounded-2xl shadow-[0_12px_30px_rgba(168,85,247,0.18)] border border-purple-200/80 cursor-pointer transform rotate-8 z-10 transition-shadow hover:shadow-2xl"
              title="Click to enlarge"
            >
              {/* Cute Washi Tape Graphic */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-purple-200/80 rounded-sm transform rotate-3 border border-purple-300/60" />
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-purple-50">
                <img
                  src={floatingPhoto2.url}
                  alt={floatingPhoto2.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-['Caveat'] text-xs md:text-sm text-purple-900 font-semibold mt-1.5 truncate">
                {floatingPhoto2.title}
              </p>
            </motion.div>
          )}
        </div>

        {/* Mobile Mini Thumbnails for photo 2 & 3 */}
        <div className="flex sm:hidden items-center justify-center gap-3 mt-3 mb-2">
          {SAVITHA_ALONE_PHOTOS.slice(1).map((photo) => (
            <button
              type="button"
              key={photo.id}
              onClick={() => onPhotoClick(photo)}
              className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md p-0.5 bg-pink-100"
            >
              <img src={photo.url} alt={photo.title} className="w-full h-full object-cover rounded-lg" />
            </button>
          ))}
        </div>

        {/* Headings */}
        <div className="mt-4 space-y-2 max-w-2xl">
          <h1 className="font-['Fredoka'] text-3xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-950 via-pink-600 to-purple-800">
            Happy Birthday, Savitha!
          </h1>
          <p className="font-['Caveat'] text-2xl sm:text-3xl text-purple-700 font-semibold">
            {BIRTHDAY_CONFIG.recipient.nickname} 💜
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

        {/* Scroll Prompt */}
        <div className="mt-8 flex flex-col items-center gap-1.5 text-purple-600">
          <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
            <Camera size={13} className="text-pink-500" />
            <span>Explore Your Surprise Scrapbook Below</span>
          </span>
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown size={18} className="text-purple-400" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
