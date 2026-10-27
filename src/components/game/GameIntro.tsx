import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, HelpCircle, X, Sparkles } from 'lucide-react';

interface GameIntroProps {
  onStartGame: () => void;
}

export const GameIntro: React.FC<GameIntroProps> = ({ onStartGame }) => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center text-center animate-fadeIn">
      {/* Decorative Top Tag */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs font-bold uppercase tracking-widest shadow-xs mb-3">
        <Sparkles size={13} className="text-pink-500" />
        <span>SPECIAL BIRTHDAY ADVENTURE 🎮</span>
      </div>

      {/* Main Title & Subtitle */}
      <h1 className="font-['Fredoka'] text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-950 via-pink-600 to-purple-800 tracking-tight leading-tight">
        CATCH THE CAT! 🐱💨💗
      </h1>

      <p className="font-['Fredoka'] text-lg sm:text-2xl text-purple-900 font-semibold mt-2">
        A girl goes to catch the playful birthday cat! 💗
      </p>

      <p className="text-sm sm:text-base text-purple-700/85 max-w-xl mt-2 font-medium leading-relaxed">
        Eight worlds, one mischievous kitty, and a whole lot of fun. Can you catch the cat to unlock Savitha's birthday surprises?
      </p>

      {/* ANIMATED PREVIEW SCENE (Cute Girl chasing Playful Cat) */}
      <div className="w-full max-w-2xl my-6 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-purple-100/80 via-pink-50/70 to-purple-100/80 border-2 border-purple-200/90 shadow-xl relative overflow-hidden">
        {/* Floating Clouds & Stars */}
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-4 left-6 text-2xl opacity-80"
        >
          ☁️
        </motion.div>
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-6 right-8 text-3xl opacity-80"
        >
          ☁️
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-10 left-1/3 text-xl text-amber-400"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute top-14 right-1/3 text-xl text-pink-400"
        >
          💖
        </motion.div>

        {/* Characters Running Scene: Girl chasing Cat */}
        <div className="relative h-44 flex items-end justify-between px-6 sm:px-12 pb-4">
          {/* Girl Player Character chasing */}
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            <div className="relative flex flex-col items-center">
              {/* Hair Bow */}
              <div className="w-4 h-2 rounded-full bg-pink-500 mx-auto -mb-1 shadow-xs" />
              {/* Girl Avatar */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-100 via-purple-50 to-pink-100 border-2 border-pink-400 flex items-center justify-center text-3xl shadow-md">
                👧
              </div>
            </div>
            <span className="mt-1 px-2.5 py-0.5 rounded-full bg-pink-200 text-pink-900 text-[10px] font-bold">
              Girl 🎀
            </span>
          </motion.div>

          {/* Floating gifts & stars in between */}
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.2 }}
              className="text-2xl"
            >
              ⭐
            </motion.span>
            <motion.span
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 0.5 }}
              className="text-2xl"
            >
              🎁
            </motion.span>
            <motion.span
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
              className="text-2xl"
            >
              ⭐
            </motion.span>
          </div>

          {/* Cat running away */}
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            {/* Speech bubble */}
            <div className="mb-1 px-2.5 py-1 rounded-xl bg-white border border-amber-200 shadow-sm text-amber-900 text-[11px] font-bold font-['Fredoka']">
              Meow! Can't catch me! 🐾
            </div>
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-100 via-orange-50 to-yellow-100 border-2 border-amber-400 flex items-center justify-center text-3xl shadow-md overflow-hidden">
              🐱
            </div>
            <span className="mt-1 px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-950 text-[10px] font-bold">
              Playful Cat 🐾
            </span>
          </motion.div>
        </div>

        {/* Grass / Birthday Stage Platform */}
        <div className="w-full h-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 shadow-sm" />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        <button
          type="button"
          onClick={onStartGame}
          className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white font-['Fredoka'] text-lg font-bold shadow-xl shadow-pink-500/25 transition-all transform hover:-translate-y-0.5 active:scale-98 flex items-center justify-center gap-2"
        >
          <Play size={20} className="fill-current" />
          <span>START GAME</span>
        </button>

        <button
          type="button"
          onClick={() => setShowHowToPlay(true)}
          className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-white hover:bg-purple-50 text-purple-900 border-2 border-purple-200/90 font-['Fredoka'] text-base font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <HelpCircle size={18} className="text-purple-600" />
          <span>HOW TO PLAY</span>
        </button>
      </div>

      {/* HOW TO PLAY MODAL */}
      <AnimatePresence>
        {showHowToPlay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 text-left border-2 border-purple-200 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setShowHowToPlay(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-purple-500 hover:bg-purple-100 transition-colors"
                aria-label="Close instructions"
              >
                <X size={18} />
              </button>

              <h3 className="font-['Fredoka'] text-2xl font-bold text-purple-950 flex items-center gap-2 mb-4">
                <span>🎮 How to Play</span>
              </h3>

              <div className="space-y-3.5 text-sm text-purple-900">
                <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-200 flex items-center justify-center font-bold shrink-0">
                    ⌨️
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-purple-700">
                      Keyboard Controls (Desktop)
                    </h4>
                    <p className="text-xs text-purple-900 mt-0.5">
                      <strong>A / D or Arrow Keys:</strong> Move Left & Right<br />
                      <strong>Space / W / Up Arrow:</strong> Jump<br />
                      <strong>Escape:</strong> Pause Game
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-pink-50 border border-pink-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-pink-200 flex items-center justify-center font-bold shrink-0">
                    📱
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-pink-700">
                      Mobile & Tablet
                    </h4>
                    <p className="text-xs text-pink-900 mt-0.5">
                      Use the on-screen ◀ ▶ buttons to move, and tap <strong>JUMP</strong> to leap onto platforms!
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-200 flex items-center justify-center font-bold shrink-0">
                    🎯
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-amber-800">
                      Objective
                    </h4>
                    <p className="text-xs text-amber-950 mt-0.5">
                      In each level, gather the required tokens (stars, photos, words) and catch up to Savitha. Completing a level unlocks its secret birthday section!
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowHowToPlay(false)}
                className="w-full mt-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-['Fredoka'] font-bold text-sm transition-all"
              >
                GOT IT! LET'S PLAY 🚀
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
