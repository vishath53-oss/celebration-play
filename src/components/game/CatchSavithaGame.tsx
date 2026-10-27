import React, { useState } from 'react';
import type { GameLevel, PlayerProgress, GameView } from '../../types/gameTypes';
import { GAME_LEVELS } from '../../data/gameLevels';
import { GameIntro } from './GameIntro';
import { LevelMap } from './LevelMap';
import { GameCanvas } from './GameCanvas';
import { GameHUD } from './GameHUD';
import { LevelComplete } from './LevelComplete';
import { BirthdayGiftReveal } from './BirthdayGiftReveal';
import { CelebrationDashboard } from '../CelebrationDashboard';
import { PhotoLightbox } from '../PhotoLightbox';
import { ALL_MEDIA, type MediaItem } from '../../data/media';

interface CatchSavithaGameProps {
  onLockGate: () => void;
}

const STORAGE_KEY = 'catch_savitha_progress_v1';

const DEFAULT_PROGRESS: PlayerProgress = {
  unlockedLevel: 1,
  completedLevels: [],
  levelScores: {},
  totalStars: 0,
  finalSurpriseUnlocked: false,
};

export const CatchSavithaGame: React.FC<CatchSavithaGameProps> = ({ onLockGate }) => {
  // Always start with fresh new game progress from Level 1
  const [progress, setProgress] = useState<PlayerProgress>(DEFAULT_PROGRESS);

  // Navigation View: Start directly playing from the first level
  const [currentView, setCurrentView] = useState<GameView>('playing');
  const [activeLevel, setActiveLevel] = useState<GameLevel>(GAME_LEVELS[0]);

  // In-Game Simulation State
  const [currentScore, setCurrentScore] = useState(0);
  const [collectedCount, setCollectedCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLevelCompleted, setIsLevelCompleted] = useState(false);

  // Section Explorer State
  const [activeSectionId, setActiveSectionId] = useState<string>('welcome');

  // Photo Lightbox
  const [lightboxPhoto, setLightboxPhoto] = useState<MediaItem | null>(null);

  // Save progress changes to localStorage
  const saveProgress = (newProgress: PlayerProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch {
      // Ignore
    }
  };

  const handleStartGame = () => {
    handleSelectLevel(GAME_LEVELS[0]);
  };

  const handleSelectLevel = (level: GameLevel) => {
    setActiveLevel(level);
    setCurrentScore(0);
    setCollectedCount(0);
    setIsPaused(false);
    setIsLevelCompleted(false);
    setCurrentView('playing');
  };

  const handleCollectItem = (count: number) => {
    setCollectedCount(count);
  };

  const handleCatchSavitha = (finalScore: number) => {
    setCurrentScore(finalScore);
    setIsLevelCompleted(true);

    // Update Progress
    const newCompleted = Array.from(new Set([...progress.completedLevels, activeLevel.id]));
    const nextUnlocked = Math.max(
      progress.unlockedLevel,
      Math.min(GAME_LEVELS.length, activeLevel.id + 1)
    );
    const newScores = {
      ...progress.levelScores,
      [activeLevel.id]: Math.max(finalScore, progress.levelScores[activeLevel.id] || 0),
    };
    const newTotal = Object.values(newScores).reduce((a, b) => a + b, 0);

    const updatedProgress: PlayerProgress = {
      unlockedLevel: nextUnlocked,
      completedLevels: newCompleted,
      levelScores: newScores,
      totalStars: newTotal,
      finalSurpriseUnlocked: newCompleted.includes(8),
    };

    saveProgress(updatedProgress);
  };

  const handleContinueNextLevel = () => {
    setIsLevelCompleted(false);
    if (activeLevel.id < GAME_LEVELS.length) {
      const nextLvl = GAME_LEVELS.find((l) => l.id === activeLevel.id + 1);
      if (nextLvl) {
        handleSelectLevel(nextLvl);
        return;
      }
    }
    setCurrentView('level-map');
  };

  const handleExploreSection = (sectionId: string) => {
    setIsLevelCompleted(false);
    setActiveSectionId(sectionId);
    setCurrentView('section-view');
  };

  const handleOpenFinalSurprise = () => {
    setIsLevelCompleted(false);
    setCurrentView('final-surprise');
  };

  const handleResetProgress = () => {
    saveProgress(DEFAULT_PROGRESS);
    handleSelectLevel(GAME_LEVELS[0]);
  };

  const handlePhotoClick = (item: MediaItem) => {
    setLightboxPhoto(item);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. GAME INTRO VIEW */}
      {currentView === 'intro' && (
        <GameIntro onStartGame={handleStartGame} />
      )}

      {/* 2. LEVEL MAP VIEW */}
      {currentView === 'level-map' && (
        <LevelMap
          progress={progress}
          onSelectLevel={handleSelectLevel}
          onExploreSection={handleExploreSection}
          onResetProgress={handleResetProgress}
          onShowIntro={() => setCurrentView('intro')}
          onOpenFinalSurprise={handleOpenFinalSurprise}
        />
      )}

      {/* 3. ACTIVE PLAYING CANVAS VIEW */}
      {currentView === 'playing' && (
        <div className="w-full max-w-4xl mx-auto px-2 py-4 flex flex-col items-center animate-fadeIn">
          <GameHUD
            level={activeLevel}
            score={currentScore}
            collectedCount={collectedCount}
            isPaused={isPaused}
            onTogglePause={() => setIsPaused((prev) => !prev)}
            onRestartLevel={() => handleSelectLevel(activeLevel)}
            onExitToMap={() => setCurrentView('level-map')}
          />

          <GameCanvas
            level={activeLevel}
            isPaused={isPaused}
            onCollectItem={handleCollectItem}
            onCatchSavitha={handleCatchSavitha}
            onScoreUpdate={(s) => setCurrentScore(s)}
          />

          {/* Level Complete Celebration Modal */}
          {isLevelCompleted && (
            <LevelComplete
              level={activeLevel}
              score={currentScore}
              hasNextLevel={activeLevel.id < GAME_LEVELS.length}
              onExploreSection={handleExploreSection}
              onContinueNextLevel={handleContinueNextLevel}
              onOpenFinalSurprise={handleOpenFinalSurprise}
            />
          )}
        </div>
      )}

      {/* 4. UNLOCKED SECTION EXPLORER (CelebrationDashboard with locked/unlocked state) */}
      {currentView === 'section-view' && (
        <CelebrationDashboard
          onLockGate={onLockGate}
          completedLevels={progress.completedLevels}
          onReturnToMap={() => setCurrentView('level-map')}
          onPlayLevel={(lvlId) => {
            const lvl = GAME_LEVELS.find((l) => l.id === lvlId);
            if (lvl) handleSelectLevel(lvl);
          }}
          initialScrollSection={activeSectionId}
          onOpenPhotoLightbox={handlePhotoClick}
        />
      )}

      {/* 5. FINAL SURPRISE & EMOTIONAL MESSAGE */}
      {currentView === 'final-surprise' && (
        <BirthdayGiftReveal
          onPhotoClick={handlePhotoClick}
          onReplayAdventure={() => setCurrentView('intro')}
          onRevisitMemories={() => setCurrentView('section-view')}
        />
      )}

      {/* GLOBAL FULLSCREEN PHOTO LIGHTBOX */}
      {lightboxPhoto && (
        <PhotoLightbox
          item={lightboxPhoto}
          items={ALL_MEDIA.filter((m) => m.type === 'image')}
          onClose={() => setLightboxPhoto(null)}
          onSelect={(item) => setLightboxPhoto(item)}
        />
      )}
    </div>
  );
};
