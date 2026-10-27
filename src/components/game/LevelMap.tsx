import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, Play, Eye, RotateCcw, Sparkles, MapPin, Trophy } from 'lucide-react';
import { GAME_LEVELS } from '../../data/gameLevels';
import type { GameLevel, PlayerProgress } from '../../types/gameTypes';

interface LevelMapProps {
  progress: PlayerProgress;
  onSelectLevel: (level: GameLevel) => void;
  onExploreSection: (sectionId: string) => void;
  onResetProgress: () => void;
  onShowIntro?: () => void;
  onOpenFinalSurprise?: () => void;
}

export const LevelMap: React.FC<LevelMapProps> = ({
  progress,
  onSelectLevel,
  onExploreSection,
  onResetProgress,
  onShowIntro,
  onOpenFinalSurprise,
}) => {
  const [lockedToast, setLockedToast] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleLevelClick = (level: GameLevel) => {
    const isUnlocked = level.id <= progress.unlockedLevel;
    if (!isUnlocked) {
      setLockedToast(`Finish your current adventure to unlock ${level.worldName}! 💗`);
      setTimeout(() => setLockedToast(null), 3000);
      return;
    }
    onSelectLevel(level);
  };

  const completedCount = progress.completedLevels.length;
  const isAllCompleted = completedCount >= GAME_LEVELS.length;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center animate-fadeIn">
      {/* Toast Notification for Locked Levels */}
      {lockedToast && (
        <div className="fixed top-6 z-50 px-5 py-3 rounded-2xl bg-purple-950/90 text-white text-xs sm:text-sm font-semibold shadow-2xl border border-pink-400 backdrop-blur-md animate-bounce">
          {lockedToast}
        </div>
      )}

      {/* MAP HEADER */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
          <MapPin size={13} className="text-pink-500" />
          <span>WORLD ADVENTURE MAP 🗺️</span>
        </div>

        <h2 className="font-['Fredoka'] text-3xl sm:text-4xl font-extrabold text-purple-950">
          The Road to Catching the Cat 🐱💨
        </h2>

        <p className="text-sm text-purple-700/85 max-w-md mx-auto mt-1 font-medium">
          Chase the playful kitty across 8 unique worlds to unlock Savitha's birthday memories and final surprise!
        </p>

        {/* Progress Tracker Pill */}
        <div className="mt-4 inline-flex items-center gap-4 px-4 py-2 rounded-2xl bg-white/90 border border-purple-200 shadow-sm text-xs font-bold text-purple-900">
          <div className="flex items-center gap-1.5">
            <Trophy size={14} className="text-amber-500" />
            <span>Worlds: {completedCount}/{GAME_LEVELS.length}</span>
          </div>
          <div className="w-px h-3.5 bg-purple-200" />
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-pink-500" />
            <span>Total Score: {progress.totalStars}</span>
          </div>
        </div>
      </div>

      {/* WINDING LEVEL MAP PATH */}
      <div className="w-full relative flex flex-col items-center gap-6 my-2">
        {/* Background Connecting Trail (Dotted Winding SVG) */}
        <div className="absolute inset-0 pointer-events-none flex justify-center">
          <div className="w-1.5 h-full bg-gradient-to-b from-pink-300 via-purple-300 to-amber-300 rounded-full opacity-60" />
        </div>

        {GAME_LEVELS.map((level, idx) => {
          const isCompleted = progress.completedLevels.includes(level.id);
          const isUnlocked = level.id <= progress.unlockedLevel;
          const isCurrent = level.id === progress.unlockedLevel && !isCompleted;
          const highScore = progress.levelScores[level.id] || 0;

          // Alternate card alignment for winding look
          const isRight = idx % 2 === 1;

          return (
            <div
              key={level.id}
              className={`relative z-10 w-full max-w-lg flex items-center ${
                isRight ? 'sm:justify-end' : 'sm:justify-start'
              }`}
            >
              <motion.div
                whileHover={isUnlocked ? { scale: 1.02 } : {}}
                onClick={() => handleLevelClick(level)}
                className={`w-full sm:w-[380px] p-4 sm:p-5 rounded-3xl border-2 transition-all relative overflow-hidden cursor-pointer touch-manipulation ${
                  isCurrent
                    ? 'bg-gradient-to-br from-pink-50 via-white to-purple-50 border-pink-400 shadow-[0_10px_30px_-8px_rgba(236,72,153,0.3)] ring-4 ring-pink-200/60'
                    : isCompleted
                    ? 'bg-white/95 border-purple-200 shadow-md hover:border-purple-300'
                    : 'bg-white/50 border-gray-200/80 opacity-60 backdrop-blur-xs'
                }`}
              >
                {/* Level Node Status Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    Level {level.id}
                  </span>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 size={12} />
                      <span>Cleared</span>
                    </span>
                  ) : isCurrent ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200 animate-pulse">
                      <span>▶ Next Mission</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      <Lock size={11} />
                      <span>Locked</span>
                    </span>
                  )}
                </div>

                {/* Level Title & Icon */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs shrink-0 ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-pink-100 to-purple-100 border border-purple-200'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {level.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-['Fredoka'] text-base sm:text-lg font-bold text-purple-950 truncate">
                      {level.worldName}
                    </h3>
                    <p className="text-xs text-purple-700/80 line-clamp-1">
                      {level.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-3.5 pt-3 border-t border-purple-100 flex items-center justify-between gap-2">
                  {highScore > 0 ? (
                    <span className="text-[11px] font-semibold text-purple-600">
                      High Score: <strong className="text-pink-600">{highScore}</strong>
                    </span>
                  ) : (
                    <span className="text-[11px] text-purple-500/70 font-medium">
                      Goal: {level.requiredCollectibles} {level.collectibleName}
                    </span>
                  )}

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {/* If completed, option to view unlocked section directly */}
                    {isCompleted && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onExploreSection(level.unlockedSectionId);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 active:bg-purple-200 text-purple-700 border border-purple-200 text-xs font-semibold flex items-center gap-1 transition-colors touch-manipulation"
                        title="View Unlocked Section"
                      >
                        <Eye size={12} />
                        <span className="hidden sm:inline">Section</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleLevelClick(level)}
                      disabled={!isUnlocked}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all ${
                        isCurrent
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 active:scale-95'
                          : isCompleted
                          ? 'bg-purple-100 hover:bg-purple-200 text-purple-900'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <RotateCcw size={12} />
                          <span>Replay</span>
                        </>
                      ) : isCurrent ? (
                        <>
                          <Play size={12} className="fill-current" />
                          <span>Play Now</span>
                        </>
                      ) : (
                        <>
                          <Lock size={12} />
                          <span>Locked</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* FINAL SURPRISE SHORTCUT (If completed or final unlocked) */}
      {isAllCompleted && (
        <div className="w-full max-w-lg mt-6 p-5 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 text-white text-center shadow-xl">
          <h3 className="font-['Fredoka'] text-xl font-bold">
            🎉 All 8 Worlds Completed!
          </h3>
          <p className="text-xs text-pink-100 mt-1">
            The playful kitty has been caught! Your final birthday surprise awaits.
          </p>
          <button
            type="button"
            onClick={onOpenFinalSurprise}
            className="mt-3 px-5 py-2.5 rounded-2xl bg-white text-purple-950 font-['Fredoka'] text-sm font-bold shadow-md hover:bg-pink-50 transition-all active:scale-98"
          >
            OPEN YOUR FINAL GIFT 🎁
          </button>
        </div>
      )}

      {/* MAP BOTTOM CONTROLS */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {completedCount > 0 && (
          <button
            type="button"
            onClick={() => onExploreSection('welcome')}
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center gap-2"
          >
            <Eye size={15} className="text-pink-500" />
            <span>Explore All Unlocked Memories 🌸</span>
          </button>
        )}

        {onShowIntro && (
          <button
            type="button"
            onClick={onShowIntro}
            className="px-3.5 py-2.5 rounded-2xl text-xs text-purple-700 hover:text-purple-900 hover:bg-purple-50 border border-purple-200/70 transition-colors font-semibold"
          >
            Story & Intro 📖
          </button>
        )}

        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="px-3.5 py-2.5 rounded-2xl text-xs text-purple-600 hover:text-purple-900 hover:bg-purple-50 border border-purple-200/60 transition-colors"
        >
          Reset Progress
        </button>
      </div>

      {/* RESET CONFIRMATION MODAL */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center border border-purple-200 shadow-xl">
            <h4 className="font-['Fredoka'] text-xl font-bold text-purple-950 mb-2">
              Reset Game Progress?
            </h4>
            <p className="text-xs text-purple-700/80 mb-5">
              This will restart the adventure from Level 1. Your memories will still be safe.
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowResetConfirm(false);
                  onResetProgress();
                }}
                className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
