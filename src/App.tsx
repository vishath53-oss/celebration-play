import { useState, useEffect } from 'react';
import { FloatingDecorations } from './components/FloatingDecorations';
import { PasswordGate } from './components/PasswordGate';
import { CatchSavithaGame } from './components/game/CatchSavithaGame';

export function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [gameSessionId, setGameSessionId] = useState(0);

  // Scroll to top when unlocked
  useEffect(() => {
    if (isUnlocked) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isUnlocked]);

  const handleUnlock = () => {
    // Whenever user types password, clear any old progress and start a fresh game session
    try {
      localStorage.removeItem('catch_savitha_progress_v1');
    } catch {
      // ignore
    }
    setGameSessionId((prev) => prev + 1);
    setIsUnlocked(true);
  };

  const handleLock = () => {
    setIsUnlocked(false);
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-x-hidden p-3 sm:p-6 bg-gradient-to-br from-[#fdf2f8] via-[#fef7ee] to-[#f5f3ff]">
      {/* Best Friend Birthday Party Animated Background & Accents */}
      <FloatingDecorations />

      {/* Screen Routing: Password Gate vs. Catch Savitha Adventure Game */}
      {!isUnlocked ? (
        <PasswordGate
          isUnlocked={isUnlocked}
          onUnlock={handleUnlock}
        />
      ) : (
        <CatchSavithaGame key={gameSessionId} onLockGate={handleLock} />
      )}
    </main>
  );
}

export default App;
