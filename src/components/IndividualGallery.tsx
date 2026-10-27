import React from 'react';
import { Camera, Sparkles } from 'lucide-react';
import { SAVITHA_ALONE_PHOTOS, type MediaItem } from '../data/media';
import { MediaCard } from './MediaCard';

interface IndividualGalleryProps {
  onPhotoClick: (item: MediaItem) => void;
}

export const IndividualGallery: React.FC<IndividualGalleryProps> = ({ onPhotoClick }) => {
  return (
    <section id="savitha-spotlight" className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Camera size={13} className="text-pink-500" />
          <span>Individual Portraits</span>
        </div>
        <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-bold text-purple-950">
          Savitha's Spotlight ✨
        </h2>
        <p className="text-sm text-purple-700/85 max-w-lg mt-1 font-medium">
          A collection of lovely moments captured just for the birthday star. Click any photo to view in high resolution.
        </p>
      </div>

      {/* 3 Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {SAVITHA_ALONE_PHOTOS.map((photo) => (
          <div key={photo.id} className="flex flex-col">
            <MediaCard
              item={photo}
              onClick={onPhotoClick}
              aspectRatio="portrait"
            />
            <div className="mt-2.5 text-center">
              <h3 className="font-['Fredoka'] text-sm sm:text-base font-semibold text-purple-900">
                {photo.title}
              </h3>
              <p className="text-xs text-purple-600/80 font-medium flex items-center justify-center gap-1 mt-0.5">
                <Sparkles size={11} className="text-pink-500" />
                <span>{photo.caption}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
