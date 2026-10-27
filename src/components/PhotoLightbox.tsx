import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { MediaItem } from '../data/media';

interface PhotoLightboxProps {
  item: MediaItem | null;
  items: MediaItem[];
  onClose: () => void;
  onSelect: (item: MediaItem) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  item,
  items,
  onClose,
  onSelect,
}) => {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < items.length - 1;

  const handlePrev = React.useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      onSelect(items[currentIndex - 1]);
    }
  }, [currentIndex, items, onSelect]);

  const handleNext = React.useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex >= 0 && currentIndex < items.length - 1) {
      onSelect(items[currentIndex + 1]);
    }
  }, [currentIndex, items, onSelect]);

  // Touch swipe support for mobile
  const touchStartX = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && hasNext) {
        handleNext();
      } else if (diff < 0 && hasPrev) {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, handlePrev, handleNext]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-purple-950/80 backdrop-blur-md touch-manipulation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 text-white backdrop-blur-md border border-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300 touch-manipulation"
        >
          <X size={22} />
        </button>

        {/* Previous Button */}
        {hasPrev && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-6 z-50 p-3 sm:p-3.5 rounded-full bg-white/20 hover:bg-white/40 active:bg-white/50 text-white backdrop-blur-md border border-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300 touch-manipulation"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Next Button */}
        {hasNext && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-2 sm:right-6 z-50 p-3 sm:p-3.5 rounded-full bg-white/20 hover:bg-white/40 active:bg-white/50 text-white backdrop-blur-md border border-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300 touch-manipulation"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Lightbox Content Card */}
        <motion.div
          className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-white/95 shadow-2xl p-2 sm:p-4 border border-purple-200/60"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Image */}
          <div className="relative max-h-[72vh] flex items-center justify-center overflow-hidden rounded-2xl bg-purple-50">
            <img
              src={item.url}
              alt={item.title}
              className="max-h-[72vh] max-w-full object-contain rounded-2xl"
            />
          </div>

          {/* Caption & Counter */}
          <div className="w-full pt-3 px-2 flex items-center justify-between gap-4 text-purple-950">
            <div className="text-left">
              <h3 className="font-['Fredoka'] font-semibold text-base sm:text-lg text-purple-900">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-purple-600/90 font-medium">
                {item.caption}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                {currentIndex + 1} / {items.length}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
