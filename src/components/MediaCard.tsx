import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Maximize2, ImageOff, Sparkles } from 'lucide-react';
import type { MediaItem } from '../data/media';

interface MediaCardProps {
  item: MediaItem;
  onClick: (item: MediaItem) => void;
  aspectRatio?: 'square' | 'portrait' | 'auto';
  fitMode?: 'cover' | 'contain' | 'smart';
}

export const MediaCard: React.FC<MediaCardProps> = ({
  item,
  onClick,
  aspectRatio = 'square',
  fitMode = 'smart',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : 'aspect-auto min-h-[220px]';

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      onClick={() => !hasError && onClick(item)}
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-purple-950/5 border border-purple-100/90 shadow-[0_8px_20px_-6px_rgba(168,85,247,0.12)] hover:shadow-[0_16px_32px_-8px_rgba(168,85,247,0.22)] transition-all cursor-pointer ${aspectClass}`}
    >
      {/* Fallback Display if Image Fails to Load */}
      {hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-purple-50/70 text-purple-400 text-center">
          <ImageOff size={32} className="mb-2 text-pink-300" />
          <p className="text-xs font-semibold text-purple-800">{item.title}</p>
          <span className="text-[11px] text-purple-500/70 mt-1">Photo unavailable</span>
        </div>
      ) : (
        <>
          {/* Skeleton placeholder while loading */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-pink-100/40 to-purple-100/50 animate-pulse" />
          )}

          {/* Ambient blurred backdrop for smart fit */}
          {fitMode === 'smart' && (
            <img
              src={item.url}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-lg scale-110 opacity-30"
            />
          )}

          {/* Actual Media Image */}
          <img
            src={item.url}
            alt={item.title}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
              fitMode === 'contain' || fitMode === 'smart'
                ? 'relative z-10 object-contain p-1'
                : 'object-cover object-top'
            } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Hover Overlay with Caption and Enlarge Button */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 via-purple-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 text-white">
            <div className="flex items-center justify-between gap-2">
              <div className="truncate">
                <p className="font-['Fredoka'] text-sm sm:text-base font-semibold truncate">
                  {item.title}
                </p>
                <p className="text-[11px] sm:text-xs text-purple-200/90 truncate flex items-center gap-1">
                  <Sparkles size={11} className="text-yellow-300 shrink-0" />
                  <span>{item.caption}</span>
                </p>
              </div>

              <span className="p-1.5 rounded-full bg-white/25 backdrop-blur-sm text-white shrink-0 hover:bg-white/40 transition-colors">
                <Maximize2 size={15} />
              </span>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};
