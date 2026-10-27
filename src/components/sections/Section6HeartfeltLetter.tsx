import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { SAVITHA_ALONE_PHOTOS, type MediaItem } from '../../data/media';

interface Section6HeartfeltLetterProps {
  onPhotoClick: (item: MediaItem) => void;
}

export const Section6HeartfeltLetter: React.FC<Section6HeartfeltLetterProps> = ({ onPhotoClick }) => {
  const letterPhoto = SAVITHA_ALONE_PHOTOS[2] || SAVITHA_ALONE_PHOTOS[0];

  return (
    <section id="heartfelt-letter" className="w-full max-w-5xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Heart size={13} className="text-pink-500 fill-pink-500" />
          <span>Section 6 • From The Heart</span>
        </div>
        <h2 className="font-['Fredoka'] text-3xl sm:text-4xl font-bold text-purple-950">
          A Letter For You, Savitha ❤️
        </h2>
        <p className="text-sm sm:text-base text-purple-700/85 max-w-lg mt-1 font-medium">
          A few honest words to remind you how much you mean to everyone around you.
        </p>
      </div>

      {/* Responsive Letter Container */}
      <div className="relative max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#ffffff] via-[#fdf9fc] to-[#fbf5fd] border border-purple-200/80 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.18)] p-6 sm:p-10 overflow-hidden">
        {/* Soft Background Accent Swirls */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Polaroid Photo Beside the Letter */}
          <div
            className="w-48 sm:w-56 shrink-0 p-3 pb-6 bg-white rounded-2xl shadow-xl border border-purple-100 transform -rotate-2 hover:rotate-0 transition-transform cursor-pointer"
            onClick={() => onPhotoClick(letterPhoto)}
            title="Click to view photo"
          >
            {/* Cute Tape Top Graphic */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-purple-200/80 rounded-sm transform rotate-1 border border-purple-300/60" />
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-purple-50">
              <img
                src={letterPhoto.url}
                alt="Savitha portrait"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-['Caveat'] text-center text-sm sm:text-base text-purple-900 font-semibold mt-2">
              Our dearest Savitha ✨
            </p>
          </div>

          {/* Letter Body */}
          <div className="flex-1 text-left space-y-4 text-purple-950 font-['Inter'] leading-relaxed text-sm sm:text-base">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <h3 className="font-['Fredoka'] text-xl sm:text-2xl font-bold text-purple-900 flex items-center gap-2">
                <span>Dear Savitha, my thangaveluuuuuuu 🫶🏻</span>
              </h3>
              <div className="flex items-center gap-1 text-pink-500">
                <Sparkles size={18} />
              </div>
            </div>

            <p className="font-semibold text-pink-600 text-base sm:text-lg">
              Happy Birthday, my dear! 🎂
            </p>

            <p>
              I wish you a life filled with good health, happiness, peace, and success. No matter what happens in life, I hope you always find a reason to smile and the strength to overcome every difficult situation. You deserve so many beautiful things, and I truly hope life brings you all the happiness your heart wishes for. 🥹
            </p>

            <p>
              Always take care of yourself, eat well, stay healthy, get enough rest, and never forget to put your own happiness first. Don't stress too much about things you cannot control. Take life one day at a time, trust yourself, and keep chasing your dreams. ✨
            </p>

            <p>
              I'm really happy to have you as my friend, and I hope our friendship continues to grow with more laughter, silly moments, unforgettable memories, and countless reasons to smile. No matter how much life changes, I hope you always stay true to yourself and keep that beautiful smile on your face.
            </p>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-pink-50/80 border border-pink-200/80 text-purple-900 font-bold text-sm sm:text-base shadow-sm">
              Stay happy, stay healthy, keep shining, and never forget how special you are, thangaveluuuuuuu! 🫂
            </div>

            <p className="text-purple-800 font-medium">
              Once again, Happy Birthday, Savitha! May this year be one of the happiest and most beautiful chapters of your life. 🎉
            </p>

            {/* Handwritten Sign-off */}
            <div className="pt-4 border-t border-purple-100/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="font-['Caveat'] text-2xl sm:text-3xl font-bold text-purple-800">
                  Always cheering for you,
                </p>
                <p className="font-['Caveat'] text-xl sm:text-2xl text-pink-600 font-semibold">
                  Forever Your Best Friend 💜
                </p>
              </div>

              {/* Heart Stamp */}
              <div className="w-12 h-12 rounded-full bg-pink-100/80 border border-pink-300 flex items-center justify-center text-pink-600 shadow-inner">
                <Heart size={22} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
