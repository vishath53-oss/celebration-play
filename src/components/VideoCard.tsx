import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Video, AlertCircle, Film, Smartphone } from 'lucide-react';
import type { MediaItem } from '../data/media';

interface VideoCardProps {
  item: MediaItem;
  forcedAspect?: 'landscape' | 'portrait';
}

export const VideoCard: React.FC<VideoCardProps> = ({ item, forcedAspect }) => {
  const [hasError, setHasError] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isPortrait = (forcedAspect || item.orientation) === 'portrait';

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      transition={{ duration: 0.25 }}
      className={`flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-white/95 border ${
        isPortrait ? 'border-pink-200/90 shadow-[0_8px_25px_-6px_rgba(244,114,182,0.2)]' : 'border-purple-200/90 shadow-[0_8px_25px_-6px_rgba(168,85,247,0.15)]'
      } hover:shadow-[0_16px_36px_-8px_rgba(168,85,247,0.25)] transition-all h-full`}
    >
      {/* Video Container with Dynamic Aspect Ratio */}
      <div
        className={`relative w-full bg-gradient-to-br from-purple-950 via-slate-950 to-purple-900 flex items-center justify-center overflow-hidden ${
          isPortrait ? 'aspect-[9/16] sm:aspect-[9/15]' : 'aspect-video'
        }`}
      >
        {hasError ? (
          <div className="p-4 text-center text-purple-200 flex flex-col items-center">
            <AlertCircle size={28} className="text-pink-400 mb-1" />
            <p className="text-xs font-semibold">Video format not supported or unavailable</p>
          </div>
        ) : (
          <video
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-cover sm:object-contain"
            onError={() => setHasError(true)}
          >
            <source src={item.url} type="video/mp4" />
            <p className="p-4 text-xs text-white">
              Your browser does not support the HTML5 video tag.
            </p>
          </video>
        )}

        {/* Video Badge */}
        <div
          className={`absolute top-2.5 left-2.5 pointer-events-none px-2.5 py-0.5 rounded-full backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm ${
            isPortrait ? 'bg-pink-600/80 border border-pink-400/40' : 'bg-purple-900/70 border border-purple-400/30'
          }`}
        >
          {isPortrait ? (
            <>
              <Smartphone size={11} className="text-pink-200" />
              <span>Shorts Reel</span>
            </>
          ) : (
            <>
              <Film size={11} className="text-purple-200" />
              <span>Cinema Clip</span>
            </>
          )}
        </div>
      </div>

      {/* Video Card Meta */}
      <div className="p-3.5 sm:p-4 text-left flex flex-col justify-between flex-1 bg-white">
        <div>
          <h4 className="font-['Fredoka'] font-semibold text-purple-950 text-sm sm:text-base flex items-center gap-1.5 truncate">
            <Video size={15} className={isPortrait ? 'text-pink-500 shrink-0' : 'text-purple-500 shrink-0'} />
            <span className="truncate">{item.title}</span>
          </h4>
          <p className="text-xs text-purple-600/85 font-medium mt-1 line-clamp-2">
            {item.caption}
          </p>
        </div>
        <div className="mt-3 pt-2 border-t border-purple-50 flex items-center justify-between text-[11px] font-semibold text-purple-500">
          <span>{isPortrait ? '📱 Phone Reel' : '🎬 Widescreen'}</span>
          <span className="text-pink-500">Tap to Play ▶</span>
        </div>
      </div>
    </motion.div>
  );
};

