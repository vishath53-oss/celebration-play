import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { GameLevel } from '../../types/gameTypes';

interface LevelCompleteProps {
  level: GameLevel;
  score: number;
  hasNextLevel: boolean;
  onExploreSection: (sectionId: string) => void;
  onContinueNextLevel: () => void;
  onOpenFinalSurprise?: () => void;
}

export const LevelComplete: React.FC<LevelCompleteProps> = ({
  level,
  score,
  hasNextLevel,
  onExploreSection,
  onContinueNextLevel,
  onOpenFinalSurprise,
}) => {
  // Fire celebratory confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#c084fc', '#fde047', '#6ee7b7', '#fbcfe8', '#a855f7'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 70,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#f472b6', '#fbbf24', '#a855f7'],
        });
      }, 200);
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 70,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#38bdf8', '#f472b6', '#c084fc'],
        });
      }, 400);
    } catch {
      // Ignore
    }
  }, []);

  const isFinalLevel = level.id === 8;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/60 backdrop-blur-sm animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 text-center border-2 border-purple-200 shadow-2xl relative overflow-hidden"
      >
        {/* Decorative Top Pill */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold tracking-wider uppercase mb-3">
          <Sparkles size={13} className="text-pink-500" />
          <span>{level.title}</span>
        </div>

        {/* Big Celebration Trophy / Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-pink-100 via-amber-100 to-purple-100 flex items-center justify-center text-4xl shadow-md border-2 border-amber-200 mb-3 animate-bounce">
          {level.icon}
        </div>

        {/* Completion Title & Subtitle */}
        <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-bold text-purple-950">
          {level.completionTitle}
        </h2>
        <p className="text-sm text-purple-700/90 mt-1 font-medium leading-relaxed">
          {level.completionSubtitle}
        </p>

        {/* Score & Unlocked Badge Card */}
        <div className="my-5 p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 border border-purple-200/80 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-purple-900 font-semibold text-sm">
            <Trophy size={16} className="text-amber-500" />
            <span>Mission Score:</span>
            <span className="font-bold text-pink-600 text-base">{score} pts</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-xs">
            <CheckCircle2 size={13} className="text-emerald-500" />
            <span>Unlocked: {level.unlockedSectionTitle}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          {/* If final level, show Open Final Gift button prominently */}
          {isFinalLevel ? (
            <button
              type="button"
              onClick={onOpenFinalSurprise}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white font-['Fredoka'] text-lg font-bold shadow-lg shadow-pink-500/25 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>OPEN YOUR FINAL GIFT 🎁</span>
            </button>
          ) : (
            hasNextLevel && (
              <button
                type="button"
                onClick={onContinueNextLevel}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-['Fredoka'] text-base font-bold shadow-md shadow-purple-500/20 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>CONTINUE TO NEXT LEVEL</span>
                <ArrowRight size={18} />
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onExploreSection(level.unlockedSectionId)}
            className="w-full py-3 px-4 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Eye size={16} className="text-purple-600" />
            <span>Explore {level.worldName} Section 🔓</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
