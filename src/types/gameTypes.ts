export interface GameLevel {
  id: number;
  slug: string;
  title: string;
  worldName: string;
  theme: 'welcome' | 'mosaic' | 'funzone' | 'quotes' | 'cinematic' | 'videos' | 'letter' | 'finale';
  icon: string;
  tagline: string;
  objectiveText: string;
  collectibleType: 'star' | 'memory' | 'gift' | 'word' | 'film' | 'video' | 'heart' | 'goldStar';
  collectibleName: string;
  collectibleIcon: string;
  requiredCollectibles: number;
  completionTitle: string;
  completionSubtitle: string;
  unlockedSectionId: string;
  unlockedSectionTitle: string;
  skyGradient: [string, string];
  groundColor: string;
  platformColor: string;
  accentColor: string;
}

export interface PlayerProgress {
  unlockedLevel: number; // Highest level unlocked (1-8)
  completedLevels: number[]; // Array of completed level IDs
  levelScores: Record<number, number>; // Level ID -> high score
  totalStars: number;
  finalSurpriseUnlocked: boolean;
}

export type GameView =
  | 'password'
  | 'intro'
  | 'level-map'
  | 'playing'
  | 'section-view'
  | 'final-surprise';
