import React, { useState } from 'react';
import { Mail, Heart, Sparkles, Unlock, Lock } from 'lucide-react';
import { SAVITHA_ALONE_PHOTOS, SAVITHA_GROUP_PHOTOS, type MediaItem } from '../../data/media';

interface Section5QuotesSurprisesProps {
  onPhotoClick: (item: MediaItem) => void;
}

export const Section5QuotesSurprises: React.FC<Section5QuotesSurprisesProps> = ({ onPhotoClick }) => {
  // Revealed states for quote cards
  const [openedEnvelopes, setOpenedEnvelopes] = useState<Record<number, boolean>>({});

  const toggleEnvelope = (index: number) => {
    setOpenedEnvelopes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const surprises = [
    {
      id: 0,
      photo: SAVITHA_ALONE_PHOTOS[1] || SAVITHA_ALONE_PHOTOS[0],
      tag: 'A Thought For Savitha',
      envelopeTitle: 'Tap to Open Envelope #1 💌',
      quote: '"Some people arrive and make such a beautiful impact on your life, you can barely remember what life was like without them."',
      sender: 'From your biggest cheerleaders 💜',
    },
    {
      id: 1,
      photo: SAVITHA_GROUP_PHOTOS[2] || SAVITHA_GROUP_PHOTOS[0],
      tag: 'On Friendship',
      envelopeTitle: 'Tap to Open Envelope #2 💌',
      quote: '"True friends are never apart; maybe in distance, but never in heart."',
      sender: 'Always by your side ✨',
    },
    {
      id: 2,
      photo: SAVITHA_GROUP_PHOTOS[8] || SAVITHA_GROUP_PHOTOS[1],
      tag: 'Joy & Laughter',
      envelopeTitle: 'Tap to Open Envelope #3 💌',
      quote: '"A good friend knows all your best stories. A best friend has lived them with you."',
      sender: 'To many more chapters together 🥂',
    },
    {
      id: 3,
      photo: SAVITHA_ALONE_PHOTOS[2] || SAVITHA_ALONE_PHOTOS[0],
      tag: 'Birthday Blessing',
      envelopeTitle: 'Tap to Open Envelope #4 💌',
      quote: '"May your year ahead be as radiant, joyful, and deeply loved as the smile you bring to all of us."',
      sender: 'Happy Birthday, thangaveluuuuuuu! 🌸',
    },
  ];

  return (
    <section id="quotes-surprises" className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Mail size={13} className="text-pink-500" />
          <span>Section 5 • Words From The Heart</span>
        </div>
        <h2 className="font-['Fredoka'] text-3xl sm:text-4xl font-bold text-purple-950">
          Quotes & Little Surprises 💌
        </h2>
        <p className="text-sm sm:text-base text-purple-700/85 max-w-xl mt-1 font-medium">
          Tap each envelope card to unlock a secret friendship quote paired with a special photo.
        </p>
      </div>

      {/* Responsive Grid of Surprise Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {surprises.map((item) => {
          const isOpened = openedEnvelopes[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleEnvelope(item.id)}
              className="cursor-pointer group select-none rounded-3xl bg-white border border-purple-200 shadow-[0_8px_25px_-5px_rgba(168,85,247,0.12)] hover:shadow-[0_16px_36px_-8px_rgba(168,85,247,0.2)] transition-all overflow-hidden"
            >
              {!isOpened ? (
                /* Sealed Envelope State */
                <div className="p-7 aspect-[16/10] flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#faf4fd] via-[#fdf2f7] to-[#f4f7fb] relative">
                  <div className="w-14 h-14 rounded-full bg-white shadow-md border border-purple-100 flex items-center justify-center text-pink-500 mb-3 group-hover:scale-110 transition-transform">
                    <Heart size={26} fill="currentColor" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-500 mb-1">
                    {item.tag}
                  </span>
                  <h3 className="font-['Fredoka'] font-bold text-purple-900 text-lg sm:text-xl">
                    {item.envelopeTitle}
                  </h3>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/70 text-purple-700 text-xs font-medium">
                    <Lock size={12} />
                    <span>Tap to reveal secret message</span>
                  </div>
                </div>
              ) : (
                /* Unfolded Message & Photo State */
                <div className="p-5 bg-white flex flex-col justify-between animate-fadeIn">
                  <div className="flex gap-4 items-start">
                    {/* Paired Photo Thumbnail */}
                    <div
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-purple-50 shrink-0 border border-purple-100 shadow-sm hover:scale-105 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPhotoClick(item.photo);
                      }}
                      title="Click to view full photo"
                    >
                      <img
                        src={item.photo.url}
                        alt="Surprise moment"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Quote Content */}
                    <div className="flex-1 text-left">
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-600 uppercase tracking-wide mb-1">
                        <Sparkles size={11} />
                        <span>{item.tag}</span>
                      </div>
                      <p className="font-['Caveat'] text-lg sm:text-xl text-purple-900 font-semibold leading-snug">
                        {item.quote}
                      </p>
                      <p className="text-xs font-semibold text-purple-600 mt-2">
                        {item.sender}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between text-[11px] text-purple-500">
                    <span className="inline-flex items-center gap-1">
                      <Unlock size={11} className="text-emerald-500" />
                      <span>Message Unlocked</span>
                    </span>
                    <span className="italic">Tap to fold card</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
