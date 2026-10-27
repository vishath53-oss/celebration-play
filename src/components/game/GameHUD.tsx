import React from 'react';
import { Pause, Play, RotateCcw, Map, Volume2, VolumeX } from 'lucide-react';
import type { GameLevel } from '../../types/gameTypes';
import { GameAudio } from '../../utils/gameAudio';

interface GameHUDProps {
  level: GameLevel;
  score: number;
  collectedCount: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onRestartLevel: () => void;
  onExitToMap: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  level,
  score,
  collectedCount,
  isPaused,
  onTogglePause,
  onRestartLevel,
  onExitToMap,
}) => {
  const [muted, setMuted] = React.useState(GameAudio.getIsMuted());

  const handleToggleMute = () => {
    const next = GameAudio.toggleMute();
    setMuted(next);
  };

  const isCompleteReady = collectedCount >= level.requiredCollectibles;

  return (
    <div className="w-full max-w-4xl mb-3 flex items-center justify-between gap-1 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-purple-200/80 shadow-md">
      {/* Left: Level Tag & Map Exit */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <button
          type="button"
          onClick={onExitToMap}
          className="p-2 sm:p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 active:bg-purple-200 text-purple-700 border border-purple-200 transition-colors touch-manipulation"
          title="Exit to Level Map"
          aria-label="Exit to Level Map"
        >
          <Map size={16} />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-sm sm:text-base">{level.icon}</span>
            <span className="font-['Fredoka'] font-bold text-xs sm:text-sm text-purple-950 truncate max-w-[80px] sm:max-w-none">
              {level.worldName}
            </span>
          </div>
          <p className="text-[10px] text-purple-600/80 hidden md:block">
            {level.objectiveText}
          </p>
        </div>
      </div>

      {/* Center: Objective Counter */}
      <div className="flex items-center gap-1.5 sm:gap-3 bg-purple-50/90 px-2 sm:px-3 py-1 rounded-xl border border-purple-100 text-xs">
        <div className="flex items-center gap-1">
          <span className="text-xs sm:text-sm">{level.collectibleIcon}</span>
          <span
            className={`font-['Fredoka'] font-bold text-[11px] sm:text-sm ${
              isCompleteReady ? 'text-emerald-600' : 'text-purple-900'
            }`}
          >
            {collectedCount}/{level.requiredCollectibles}
          </span>
        </div>

        <div className="h-3.5 w-px bg-purple-200" />

        <div className="text-[11px] sm:text-xs font-semibold text-purple-800">
          <span className="hidden sm:inline">Score: </span>
          <span className="font-bold text-pink-600">{score}</span>
        </div>
      </div>

      {/* Right: Controls (Restart, Pause, Mute) */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <button
          type="button"
          onClick={handleToggleMute}
          className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 active:bg-purple-200 text-purple-700 border border-purple-200 transition-colors touch-manipulation"
          title={muted ? 'Unmute Sound' : 'Mute Sound'}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        <button
          type="button"
          onClick={onRestartLevel}
          className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 active:bg-purple-200 text-purple-700 border border-purple-200 transition-colors touch-manipulation"
          title="Restart Level"
          aria-label="Restart Level"
        >
          <RotateCcw size={15} />
        </button>

        <button
          type="button"
          onClick={onTogglePause}
          className={`p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1 transition-all touch-manipulation ${
            isPaused
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-purple-100 hover:bg-purple-200 text-purple-900 border-purple-200'
          }`}
          aria-label={isPaused ? 'Resume' : 'Pause'}
        >
          {isPaused ? <Play size={14} /> : <Pause size={14} />}
          <span className="hidden sm:inline">{isPaused ? 'Resume' : 'Pause'}</span>
        </button>
      </div>
    </div>
  );
};
