import React, { useState, useEffect } from 'react';
import { Lock, ArrowUp, Map, Play } from 'lucide-react';
import { Section2Welcome } from './sections/Section2Welcome';
import { Section3MemoryLane } from './sections/Section3MemoryLane';
import { Section4FunZone } from './sections/Section4FunZone';
import { Section5QuotesSurprises } from './sections/Section5QuotesSurprises';
import { Section6HeartfeltLetter } from './sections/Section6HeartfeltLetter';
import { Section6BCinematicReel } from './sections/Section6BCinematicReel';
import { Section7VideoMovie } from './sections/Section7VideoMovie';
import { Section8BirthdayFinale } from './sections/Section8BirthdayFinale';
import { PhotoLightbox } from './PhotoLightbox';
import { ALL_MEDIA, type MediaItem } from '../data/media';

interface CelebrationDashboardProps {
  onLockGate: () => void;
  completedLevels?: number[];
  onReturnToMap?: () => void;
  onPlayLevel?: (levelId: number) => void;
  initialScrollSection?: string;
  onOpenPhotoLightbox?: (item: MediaItem) => void;
}

export const CelebrationDashboard: React.FC<CelebrationDashboardProps> = ({
  onLockGate,
  completedLevels = [1, 2, 3, 4, 5, 6, 7, 8], // Default to all if not specified
  onReturnToMap,
  onPlayLevel,
  initialScrollSection,
  onOpenPhotoLightbox,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MediaItem | null>(null);
  const [activePhotoList, setActivePhotoList] = useState<MediaItem[]>([]);

  // Smooth scroll to initial section if specified
  useEffect(() => {
    if (initialScrollSection) {
      setTimeout(() => {
        const el = document.getElementById(initialScrollSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [initialScrollSection]);

  // Open photo in lightbox with navigation context
  const handlePhotoClick = (item: MediaItem, customList?: MediaItem[]) => {
    if (onOpenPhotoLightbox) {
      onOpenPhotoLightbox(item);
      return;
    }
    setActivePhotoList(customList || ALL_MEDIA.filter((m) => m.type === 'image'));
    setSelectedPhoto(item);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Welcome', href: '#welcome', id: 'welcome', icon: '🎉', reqLevel: 1 },
    { label: 'Mosaic Wall', href: '#memory-lane', id: 'memory-lane', icon: '🧩', reqLevel: 2 },
    { label: 'Fun Zone', href: '#fun-zone', id: 'fun-zone', icon: '😂', reqLevel: 3 },
    { label: 'Quotes', href: '#quotes-surprises', id: 'quotes-surprises', icon: '💌', reqLevel: 4 },
    { label: 'Reel', href: '#cinematic-reel', id: 'cinematic-reel', icon: '🎞️', reqLevel: 5 },
    { label: 'Videos', href: '#videos', id: 'videos', icon: '🎬', reqLevel: 6 },
    { label: 'Letter', href: '#heartfelt-letter', id: 'heartfelt-letter', icon: '❤️', reqLevel: 7 },
    { label: 'Cake Finale', href: '#birthday-finale', id: 'birthday-finale', icon: '🎂', reqLevel: 8 },
  ];

  // Helper to render locked section placeholder
  const renderLockedSection = (title: string, reqLevel: number, sectionId: string) => (
    <section id={sectionId} className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="p-8 sm:p-12 rounded-3xl bg-white/70 border-2 border-dashed border-purple-200/90 backdrop-blur-sm text-center flex flex-col items-center shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 mb-3 shadow-inner">
          <Lock size={28} />
        </div>
        <h3 className="font-['Fredoka'] text-2xl font-bold text-purple-950">
          {title} is Locked 🔒
        </h3>
        <p className="text-sm text-purple-700/85 mt-1.5 max-w-md font-medium">
          Chase Savitha in <strong>Level {reqLevel}</strong> of the adventure to unlock this memory! 💗
        </p>
        {onPlayLevel && (
          <button
            type="button"
            onClick={() => onPlayLevel(reqLevel)}
            className="mt-5 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-['Fredoka'] text-sm font-bold shadow-md transition-all flex items-center gap-2 active:scale-95"
          >
            <Play size={14} className="fill-current" />
            <span>Play Level {reqLevel} Now 🎮</span>
          </button>
        )}
      </div>
    </section>
  );

  return (
    <div className="w-full flex flex-col items-center z-10 animate-fadeIn">
      {/* STICKY TOP NAVIGATION BAR */}
      <header className="sticky top-2 z-40 w-full max-w-5xl px-3 my-2">
        <div className="w-full rounded-2xl bg-white/92 backdrop-blur-md border border-purple-200/80 shadow-[0_8px_20px_-6px_rgba(168,85,247,0.15)] py-2 px-3 sm:px-4 flex items-center justify-between gap-2 overflow-x-auto">
          {/* Back to Game Map button */}
          {onReturnToMap && (
            <button
              type="button"
              onClick={onReturnToMap}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
            >
              <Map size={13} />
              <span>Game Map</span>
            </button>
          )}

          {/* Section Jump Links */}
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
            {navLinks.map((link) => {
              const isUnlocked = completedLevels.includes(link.reqLevel);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`shrink-0 px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                    isUnlocked
                      ? 'text-purple-800 hover:text-purple-950 hover:bg-purple-100/70'
                      : 'text-purple-400 hover:bg-purple-50/50'
                  }`}
                >
                  <span>{link.icon}</span>
                  <span className="hidden md:inline">{link.label}</span>
                  {!isUnlocked && <Lock size={10} className="text-purple-400" />}
                </a>
              );
            })}
          </nav>

          {/* Lock Gate Button */}
          <button
            type="button"
            onClick={onLockGate}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-900 border border-purple-200/80 text-xs font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
            title="Return to Section 1 Password Gate"
          >
            <Lock size={12} />
            <span className="hidden sm:inline">Lock Gate</span>
          </button>
        </div>
      </header>

      {/* SECTION 2 — BIRTHDAY WELCOME (Unlocked by Level 1) */}
      {completedLevels.includes(1) ? (
        <Section2Welcome onPhotoClick={(item) => handlePhotoClick(item)} />
      ) : (
        renderLockedSection('Section 2 • Birthday Welcome', 1, 'welcome')
      )}

      {/* SECTION 3 — OUR MEMORY LANE (Unlocked by Level 2) */}
      {completedLevels.includes(2) ? (
        <Section3MemoryLane onPhotoClick={handlePhotoClick} />
      ) : (
        renderLockedSection('Section 3 • Mosaic Wall', 2, 'memory-lane')
      )}

      {/* SECTION 4 — FUN ZONE (Unlocked by Level 3) */}
      {completedLevels.includes(3) ? (
        <Section4FunZone onPhotoClick={(item) => handlePhotoClick(item)} />
      ) : (
        renderLockedSection('Section 4 • Fun Zone', 3, 'fun-zone')
      )}

      {/* SECTION 5 — QUOTES & LITTLE SURPRISES (Unlocked by Level 4) */}
      {completedLevels.includes(4) ? (
        <Section5QuotesSurprises onPhotoClick={(item) => handlePhotoClick(item)} />
      ) : (
        renderLockedSection('Section 5 • Quotes & Little Surprises', 4, 'quotes-surprises')
      )}

      {/* SECTION 6B — CINEMATIC REEL (Unlocked by Level 5) */}
      {completedLevels.includes(5) ? (
        <Section6BCinematicReel onPhotoClick={handlePhotoClick} />
      ) : (
        renderLockedSection('Section 6B • Cinematic Reel', 5, 'cinematic-reel')
      )}

      {/* SECTION 7 — MUSIC & BIRTHDAY MOVIE (Unlocked by Level 6) */}
      {completedLevels.includes(6) ? (
        <Section7VideoMovie onPhotoClick={(item) => handlePhotoClick(item)} />
      ) : (
        renderLockedSection('Section 7 • Birthday Premiere Videos', 6, 'videos')
      )}

      {/* SECTION 6 — HEARTFELT LETTER (Unlocked by Level 7) */}
      {completedLevels.includes(7) ? (
        <Section6HeartfeltLetter onPhotoClick={(item) => handlePhotoClick(item)} />
      ) : (
        renderLockedSection('Section 6 • Heartfelt Letter', 7, 'heartfelt-letter')
      )}

      {/* SECTION 8 — BIRTHDAY FINALE (Unlocked by Level 8) */}
      {completedLevels.includes(8) ? (
        <Section8BirthdayFinale onPhotoClick={(item) => handlePhotoClick(item)} />
      ) : (
        renderLockedSection('Section 8 • Birthday Finale & Cake', 8, 'birthday-finale')
      )}

      {/* FOOTER */}
      <footer className="w-full max-w-5xl mx-auto mt-16 mb-10 pt-8 border-t border-purple-200/70 text-center flex flex-col items-center gap-3 px-4">
        <p className="font-['Caveat'] text-2xl sm:text-3xl font-semibold text-purple-800">
          Made with a little mischief and a lot of heart for Savitha. 💜
        </p>
        <p className="text-xs text-purple-600/80 font-medium">
          Your little birthday universe awaits ✨
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {onReturnToMap && (
            <button
              type="button"
              onClick={onReturnToMap}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
            >
              <Map size={13} />
              <span>Return to Game Map</span>
            </button>
          )}

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-purple-50 text-purple-800 border border-purple-200 text-xs font-semibold shadow-sm transition-all"
          >
            <ArrowUp size={13} />
            <span>Back to Top</span>
          </button>

          <button
            type="button"
            onClick={onLockGate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-200 text-xs font-semibold shadow-sm transition-all"
          >
            <Lock size={13} />
            <span>Lock Surprise Gate</span>
          </button>
        </div>
      </footer>

      {/* FULLSCREEN PHOTO LIGHTBOX VIEWER */}
      {selectedPhoto && (
        <PhotoLightbox
          item={selectedPhoto}
          items={activePhotoList}
          onClose={() => setSelectedPhoto(null)}
          onSelect={(item) => setSelectedPhoto(item)}
        />
      )}
    </div>
  );
};
