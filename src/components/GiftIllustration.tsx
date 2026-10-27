import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GiftIllustrationProps {
  isUnlocked?: boolean;
  className?: string;
  size?: number;
}

export const GiftIllustration: React.FC<GiftIllustrationProps> = ({
  isUnlocked = false,
  className = '',
  size = 76,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Cute birthday surprise gift box"
    >
      {/* Background Soft Glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl bg-gradient-to-tr from-pink-300/40 via-purple-300/40 to-yellow-200/50"
        animate={
          isUnlocked
            ? { scale: [1, 1.4, 1.2], opacity: [0.6, 1, 0.8] }
            : shouldReduceMotion
            ? { opacity: 0.5 }
            : { scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.7, 0.4] }
        }
        transition={
          isUnlocked
            ? { duration: 1.2, repeat: Infinity, repeatType: 'reverse' }
            : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      {/* Floating Sparkles around Gift */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute -top-1 -right-1 text-yellow-400"
            animate={{
              y: [-2, 3, -2],
              scale: [0.8, 1.1, 0.8],
              rotate: [0, 15, 0],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          </motion.div>

          <motion.div
            className="absolute bottom-1 -left-1 text-pink-400"
            animate={{
              y: [2, -3, 2],
              scale: [1, 0.8, 1],
              rotate: [0, -20, 0],
            }}
            transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          </motion.div>

          <motion.div
            className="absolute top-2 -left-2 text-emerald-400"
            animate={{
              scale: [0.7, 1, 0.7],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </motion.div>
        </>
      )}

      {/* Main Gift Container */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={
          shouldReduceMotion
            ? {}
            : isUnlocked
            ? {
                y: [0, -6, 0],
                rotate: [0, -2, 2, 0],
              }
            : {
                y: [0, -5, 0],
              }
        }
        transition={
          isUnlocked
            ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_8px_16px_rgba(168,85,247,0.25)]"
        >
          {/* Defs for gradients and shadow */}
          <defs>
            {/* Box Body Gradient */}
            <linearGradient id="boxGrad" x1="15" y1="42" x2="85" y2="92" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e9d5ff" />
              <stop offset="0.5" stopColor="#d8b4fe" />
              <stop offset="1" stopColor="#c084fc" />
            </linearGradient>

            {/* Lid Gradient */}
            <linearGradient id="lidGrad" x1="10" y1="30" x2="90" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f3e8ff" />
              <stop offset="1" stopColor="#d8b4fe" />
            </linearGradient>

            {/* Ribbon Gradient */}
            <linearGradient id="ribbonGrad" x1="42" y1="15" x2="58" y2="92" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f472b6" />
              <stop offset="0.5" stopColor="#ec4899" />
              <stop offset="1" stopColor="#db2777" />
            </linearGradient>

            {/* Bow Yellow Highlight */}
            <linearGradient id="bowGrad" x1="28" y1="12" x2="72" y2="35" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fef08a" />
              <stop offset="0.4" stopColor="#fde047" />
              <stop offset="1" stopColor="#eab308" />
            </linearGradient>
          </defs>

          {/* GIFT BOX BODY */}
          <g id="gift-body">
            {/* Box Base */}
            <rect
              x="20"
              y="45"
              width="60"
              height="44"
              rx="9"
              fill="url(#boxGrad)"
              stroke="#a855f7"
              strokeWidth="2.5"
            />
            {/* Inner bottom shadow */}
            <path
              d="M23 78C23 83 27 86.5 32 86.5H68C73 86.5 77 83 77 78V80C77 85 73 88.5 68 88.5H32C27 88.5 23 85 23 80V78Z"
              fill="#9333ea"
              fillOpacity="0.25"
            />
            {/* Vertical Ribbon on Body */}
            <rect
              x="43.5"
              y="45"
              width="13"
              height="44"
              fill="url(#ribbonGrad)"
              stroke="#be185d"
              strokeWidth="1.5"
            />
            {/* Ribbon shine highlight */}
            <rect x="45.5" y="47" width="3" height="40" rx="1.5" fill="#fbcfe8" fillOpacity="0.75" />
          </g>

          {/* GIFT LID & BOW (Animated upwards when unlocked) */}
          <motion.g
            id="gift-lid"
            animate={
              isUnlocked
                ? {
                    y: -12,
                    rotate: -7,
                    originX: '50px',
                    originY: '40px',
                  }
                : { y: 0, rotate: 0 }
            }
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 18,
            }}
          >
            {/* Sparkle rays coming out if unlocked */}
            {isUnlocked && (
              <g className="text-yellow-300">
                <circle cx="50" cy="42" r="3" fill="#facc15" />
                <path d="M50 32V25" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M40 35L33 29" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M60 35L67 29" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            )}

            {/* Lid Shape */}
            <rect
              x="15"
              y="34"
              width="70"
              height="15"
              rx="7"
              fill="url(#lidGrad)"
              stroke="#a855f7"
              strokeWidth="2.5"
            />
            {/* Lid Horizontal Ribbon */}
            <rect
              x="43.5"
              y="34"
              width="13"
              height="15"
              fill="url(#ribbonGrad)"
              stroke="#be185d"
              strokeWidth="1.5"
            />

            {/* BOW LOOPS (Butter Yellow with Pink Highlights) */}
            {/* Left Bow Loop */}
            <path
              d="M48 34C48 34 32 30 30 22C28 14 42 16 48 28Z"
              fill="url(#bowGrad)"
              stroke="#ca8a04"
              strokeWidth="2"
            />
            {/* Right Bow Loop */}
            <path
              d="M52 34C52 34 68 30 70 22C72 14 58 16 52 28Z"
              fill="url(#bowGrad)"
              stroke="#ca8a04"
              strokeWidth="2"
            />
            {/* Bow Knot Center */}
            <circle
              cx="50"
              cy="31"
              r="6"
              fill="#fef08a"
              stroke="#ca8a04"
              strokeWidth="2"
            />
            {/* Knot Highlight */}
            <circle cx="48.5" cy="29.5" r="2" fill="#ffffff" />

            {/* Ribbon Tail ends */}
            <path
              d="M45 34L37 42L44 43L47 34"
              fill="#f472b6"
              stroke="#be185d"
              strokeWidth="1.5"
            />
            <path
              d="M55 34L63 42L56 43L53 34"
              fill="#f472b6"
              stroke="#be185d"
              strokeWidth="1.5"
            />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
};
