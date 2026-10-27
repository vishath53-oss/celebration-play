import React, { useState } from 'react';
import { Users, ChevronDown, Check } from 'lucide-react';
import { SAVITHA_GROUP_PHOTOS, type MediaItem } from '../data/media';
import { MediaCard } from './MediaCard';

interface GroupGalleryProps {
  onPhotoClick: (item: MediaItem) => void;
}

const INITIAL_COUNT = 12;
const INCREMENT_COUNT = 12;

export const GroupGallery: React.FC<GroupGalleryProps> = ({ onPhotoClick }) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visiblePhotos = SAVITHA_GROUP_PHOTOS.slice(0, visibleCount);
  const hasMore = visibleCount < SAVITHA_GROUP_PHOTOS.length;
  const remainingCount = SAVITHA_GROUP_PHOTOS.length - visibleCount;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + INCREMENT_COUNT, SAVITHA_GROUP_PHOTOS.length));
  };

  const handleShowAll = () => {
    setVisibleCount(SAVITHA_GROUP_PHOTOS.length);
  };

  return (
    <section id="friendship-memories" className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Users size={13} className="text-purple-600" />
          <span>Friendship Memories</span>
        </div>
        <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-bold text-purple-950">
          Unforgettable Moments With The Gang 💖
        </h2>
        <p className="text-sm text-purple-700/85 max-w-xl mt-1 font-medium">
          Every photo tells a chapter of our bond, trips, celebrations, and countless laughs together.
        </p>
        <span className="text-xs text-purple-500 font-semibold mt-2">
          Showing {visiblePhotos.length} of {SAVITHA_GROUP_PHOTOS.length} photos
        </span>
      </div>

      {/* Grid of Group Photos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
        {visiblePhotos.map((photo) => (
          <MediaCard
            key={photo.id}
            item={photo}
            onClick={onPhotoClick}
            aspectRatio="square"
          />
        ))}
      </div>

      {/* Load More Controls */}
      {hasMore ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleShowMore}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-purple-50 text-purple-900 border border-purple-200/90 shadow-sm hover:shadow text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <ChevronDown size={16} className="text-purple-600" />
            <span>Show More Memories (+{Math.min(INCREMENT_COUNT, remainingCount)})</span>
          </button>

          <button
            type="button"
            onClick={handleShowAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-md hover:shadow-lg text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <span>Show All 46 Photos</span>
          </button>
        </div>
      ) : (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
            <Check size={14} />
            <span>All 46 memories loaded! Enjoy browsing 💜</span>
          </div>
        </div>
      )}
    </section>
  );
};
