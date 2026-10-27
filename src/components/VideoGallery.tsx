import React from 'react';
import { Film } from 'lucide-react';
import { SAVITHA_VIDEOS } from '../data/media';
import { VideoCard } from './VideoCard';

export const VideoGallery: React.FC = () => {
  return (
    <section id="video-moments" className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
          <Film size={13} className="text-amber-600" />
          <span>Moments In Motion</span>
        </div>
        <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-bold text-purple-950 flex items-center justify-center gap-2">
          <span>Video Memories & Laughs 🎬</span>
        </h2>
        <p className="text-sm text-purple-700/85 max-w-xl mt-1 font-medium">
          Hit play to relive candid moments, smiles, and celebrations captured on video.
        </p>
      </div>

      {/* Responsive Grid of 8 Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
        {SAVITHA_VIDEOS.map((video) => (
          <VideoCard key={video.id} item={video} />
        ))}
      </div>
    </section>
  );
};
