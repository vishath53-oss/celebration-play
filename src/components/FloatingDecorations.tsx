import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

export const FloatingDecorations: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [scrollSparkles, setScrollSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Gentle scroll sparkle trigger (spawns subtle sparkles near margins on scroll)
  useEffect(() => {
    if (shouldReduceMotion) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      // Spawn 2-3 delicate sparkles near edges
      const isLeft = Math.random() > 0.5;
      const x = isLeft ? Math.random() * 8 + 2 : Math.random() * 8 + 90;
      const y = Math.random() * 80 + 10;
      const newSparkle = { id: Date.now() + Math.random(), x, y };

      setScrollSparkles((prev) => [...prev.slice(-4), newSparkle]);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollSparkles([]);
      }, 1400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [shouldReduceMotion]);

  // Floating friendship memory words that gently drift along the side margins
  const floatingWishes = [
    { text: 'Partners in Every Chaos ⚡', side: 'left', top: '18%', delay: 1, duration: 18 },
    { text: 'Memories That Never Fade 📸', side: 'right', top: '34%', delay: 4, duration: 20 },
    { text: 'Through Every High & Low 🤝', side: 'left', top: '56%', delay: 8, duration: 22 },
    { text: 'A Bond Beyond Words 💫', side: 'right', top: '74%', delay: 12, duration: 19 },
    { text: 'Laughs That Echo Forever 😂', side: 'left', top: '88%', delay: 15, duration: 21 },
  ];

  // Upward drifting birthday balloons (blush pink, lavender, peach, pastel gold)
  const balloons = [
    { id: 1, color: '#fbcfe8', stroke: '#f472b6', left: '3%', bottom: '-15%', duration: 24, delay: 0, scale: 0.9, swayDelay: 0 },
    { id: 2, color: '#e9d5ff', stroke: '#c084fc', right: '4%', bottom: '-20%', duration: 26, delay: 5, scale: 1.05, swayDelay: 1.2 },
    { id: 3, color: '#fed7aa', stroke: '#fb923c', left: '5%', bottom: '-25%', duration: 28, delay: 11, scale: 0.85, swayDelay: 2 },
    { id: 4, color: '#fef08a', stroke: '#eab308', right: '5%', bottom: '-30%', duration: 25, delay: 16, scale: 0.95, swayDelay: 0.7 },
  ];

  // Twinkling soft stars
  const stars = [
    { top: '6%', left: '8%', size: 16, color: 'text-amber-300', delay: 0 },
    { top: '14%', right: '7%', size: 18, color: 'text-pink-300', delay: 1.2 },
    { top: '28%', left: '4%', size: 14, color: 'text-purple-300', delay: 0.6 },
    { top: '42%', right: '5%', size: 16, color: 'text-yellow-300', delay: 1.8 },
    { top: '62%', left: '6%', size: 15, color: 'text-rose-300', delay: 2.2 },
    { top: '78%', right: '6%', size: 18, color: 'text-purple-300', delay: 0.9 },
    { top: '92%', left: '8%', size: 14, color: 'text-amber-300', delay: 1.5 },
  ];

  // Drifting friendship hearts
  const hearts = [
    { bottom: '15%', left: '7%', size: 16, color: 'text-pink-300/60', duration: 16, delay: 1 },
    { bottom: '35%', right: '6%', size: 18, color: 'text-purple-300/50', duration: 18, delay: 4 },
    { bottom: '55%', left: '5%', size: 14, color: 'text-rose-300/55', duration: 15, delay: 7 },
    { bottom: '75%', right: '7%', size: 16, color: 'text-pink-400/50', duration: 19, delay: 10 },
  ];

  // Occasional falling confetti pieces along edges
  const confettiPieces = [
    { left: '4%', delay: 0, color: 'bg-pink-300', duration: 9 },
    { left: '8%', delay: 3, color: 'bg-purple-300', duration: 11 },
    { right: '5%', delay: 1.5, color: 'bg-amber-300', duration: 10 },
    { right: '9%', delay: 5, color: 'bg-peach-300 bg-orange-200', duration: 12 },
    { left: '6%', delay: 7, color: 'bg-yellow-200', duration: 10.5 },
    { right: '7%', delay: 8.5, color: 'bg-pink-200', duration: 11.5 },
  ];

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. AMBIENT SOFT PARTY GLOWS (Warm Pastel Base) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-200/35 blur-3xl" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl" />
      <div className="absolute top-2/4 -left-28 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="absolute top-3/4 -right-28 w-96 h-96 rounded-full bg-pink-100/45 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-purple-100/35 blur-3xl" />

      {/* 2. SUBTLE EDGE ACCENTS (Birthday Cake, Glowing Candles & Ribbon Gift Boxes) */}
      {/* Top Left: Mini Birthday Cake with Glowing Candle */}
      <div className="absolute top-4 left-3 sm:top-7 sm:left-6 opacity-85 hidden sm:block">
        <svg width="68" height="74" viewBox="0 0 68 74" fill="none">
          {/* Candle Glow */}
          <circle cx="34" cy="12" r="10" fill="#fde047" fillOpacity="0.25" className="animate-pulse" />
          {/* Candle Flame with Gentle Flicker */}
          <path
            d="M34 5C35.5 8 37 11 35.5 13C34 15 32 14.5 32.5 12C33 10 32.5 8 34 5Z"
            fill="#f59e0b"
            className="animate-candle"
          />
          <circle cx="34" cy="11" r="2.5" fill="#fef08a" />
          {/* Candle Stick */}
          <rect x="32" y="14" width="4" height="14" rx="2" fill="#f472b6" />
          <path d="M32 17L36 19M32 22L36 24" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
          {/* Cake Top Frosting */}
          <ellipse cx="34" cy="32" rx="24" ry="7" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="1.5" />
          {/* Dripping Frosting */}
          <path
            d="M10 32C12 37 16 38 18 34C20 38 24 39 26 35C28 40 32 40 34 36C36 40 40 40 42 35C44 39 48 38 50 34C52 38 56 37 58 32V48C58 52 47 55 34 55C21 55 10 52 10 48V32Z"
            fill="#fbcfe8"
            stroke="#f472b6"
            strokeWidth="1.2"
          />
          {/* Cake Base */}
          <path
            d="M10 44C10 48 21 52 34 52C47 52 58 48 58 44V56C58 60 47 63 34 63C21 63 10 60 10 56V44Z"
            fill="#fed7aa"
            stroke="#fb923c"
            strokeWidth="1.2"
          />
          {/* Plate */}
          <ellipse cx="34" cy="58" rx="30" ry="6" fill="#f3e8ff" stroke="#d8b4fe" strokeWidth="1.5" />
          {/* Tiny Sprinkles */}
          <circle cx="24" cy="33" r="1.2" fill="#c084fc" />
          <circle cx="33" cy="34" r="1.2" fill="#f43f5e" />
          <circle cx="43" cy="33" r="1.2" fill="#eab308" />
        </svg>
      </div>

      {/* Top Right: Ribbon Gift Box with Bow */}
      <div className="absolute top-5 right-4 sm:top-8 sm:right-7 opacity-85 hidden sm:block">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          {/* Gift Box Base */}
          <rect x="12" y="24" width="36" height="30" rx="4" fill="#f3e8ff" stroke="#c084fc" strokeWidth="1.5" />
          {/* Gift Box Lid */}
          <rect x="9" y="19" width="42" height="8" rx="2.5" fill="#e9d5ff" stroke="#a855f7" strokeWidth="1.5" />
          {/* Gold Ribbons */}
          <rect x="27" y="19" width="6" height="35" fill="#fde047" stroke="#eab308" strokeWidth="1" />
          {/* Ribbon Bow */}
          <path
            d="M30 19C24 13 18 15 22 19C25 21 28 20 30 19Z"
            fill="#fef08a"
            stroke="#eab308"
            strokeWidth="1.2"
          />
          <path
            d="M30 19C36 13 42 15 38 19C35 21 32 20 30 19Z"
            fill="#fef08a"
            stroke="#eab308"
            strokeWidth="1.2"
          />
          <circle cx="30" cy="19" r="2.5" fill="#f59e0b" />
          {/* Sparkle near bow */}
          <path d="M48 14L49.5 18L53.5 19.5L49.5 21L48 25L46.5 21L42.5 19.5L46.5 18L48 14Z" fill="#fbcfe8" />
        </svg>
      </div>

      {/* Mid Left Edge: Cute Pastel Gift Box Accent */}
      <div className="absolute top-1/2 left-3 opacity-75 hidden lg:block -translate-y-1/2">
        <svg width="48" height="52" viewBox="0 0 48 52" fill="none">
          <rect x="8" y="20" width="32" height="26" rx="3" fill="#ffedd5" stroke="#fb923c" strokeWidth="1.2" />
          <rect x="6" y="15" width="36" height="7" rx="2" fill="#fed7aa" stroke="#f97316" strokeWidth="1.2" />
          <rect x="21" y="15" width="5" height="31" fill="#fbcfe8" stroke="#f472b6" strokeWidth="0.8" />
          <circle cx="23.5" cy="15" r="2.5" fill="#ec4899" />
          <circle cx="36" cy="10" r="2" fill="#fde047" />
        </svg>
      </div>

      {/* Mid Right Edge: Mini Birthday Party Hat Accent */}
      <div className="absolute top-1/2 right-3 opacity-75 hidden lg:block -translate-y-1/2">
        <svg width="46" height="54" viewBox="0 0 46 54" fill="none">
          {/* Party Hat Cone */}
          <polygon points="23,8 7,46 39,46" fill="#fce7f3" stroke="#f472b6" strokeWidth="1.5" />
          {/* Pattern Stripes */}
          <path d="M12 36C18 34 28 34 34 36" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 26C20 24 26 24 30 26" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
          {/* Pom-pom on top */}
          <circle cx="23" cy="8" r="4.5" fill="#fde047" stroke="#eab308" strokeWidth="1" />
          {/* Ruffle base */}
          <ellipse cx="23" cy="46" rx="16" ry="3.5" fill="#e9d5ff" stroke="#a855f7" strokeWidth="1" />
        </svg>
      </div>

      {/* Bottom Left: Celebration Candle & Garland Doodle */}
      <div className="absolute bottom-6 left-3 sm:bottom-10 sm:left-6 opacity-80 hidden sm:block">
        <svg width="90" height="70" viewBox="0 0 90 70" fill="none">
          {/* Garland Swag */}
          <path d="M5 25Q45 50 85 25" stroke="#e9d5ff" strokeWidth="2" strokeDasharray="3 4" />
          {/* Hanging Pennants */}
          <polygon points="20,33 26,45 32,33" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" />
          <polygon points="38,37 44,49 50,37" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
          <polygon points="56,33 62,45 68,33" fill="#fed7aa" stroke="#fb923c" strokeWidth="1" />
          {/* Heart at the center */}
          <circle cx="44" cy="20" r="3" fill="#f472b6" />
        </svg>
      </div>

      {/* Bottom Right: Little Friendship Bouquet & Sparkles */}
      <div className="absolute bottom-6 right-3 sm:bottom-10 sm:right-6 opacity-80 hidden sm:block">
        <svg width="75" height="75" viewBox="0 0 75 75" fill="none">
          {/* Flower 1 */}
          <circle cx="28" cy="28" r="6" fill="#fce7f3" stroke="#f472b6" strokeWidth="1.2" />
          <circle cx="28" cy="28" r="2.5" fill="#fde047" />
          {/* Flower 2 */}
          <circle cx="44" cy="24" r="6" fill="#f3e8ff" stroke="#c084fc" strokeWidth="1.2" />
          <circle cx="44" cy="24" r="2.5" fill="#fde047" />
          {/* Flower 3 */}
          <circle cx="36" cy="38" r="5.5" fill="#ffedd5" stroke="#fb923c" strokeWidth="1.2" />
          <circle cx="36" cy="38" r="2.2" fill="#f472b6" />
          {/* Ribbon Tie */}
          <path d="M30 48Q36 44 42 48" stroke="#f472b6" strokeWidth="2" />
          <path d="M36 46V62" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* 3. FLOATING BIRTHDAY BALLOONS (Slowly rising upward & gently swaying) */}
      {!shouldReduceMotion &&
        balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            className="absolute hidden sm:block"
            style={{
              left: balloon.left,
              right: balloon.right,
              bottom: balloon.bottom,
              transform: `scale(${balloon.scale})`,
            }}
            animate={{
              y: ['0vh', '-130vh'],
              x: [0, 14, -14, 8, 0],
            }}
            transition={{
              duration: balloon.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: balloon.delay,
            }}
          >
            <div
              className="animate-balloon"
              style={{ animationDelay: `${balloon.swayDelay}s` }}
            >
              <svg width="56" height="88" viewBox="0 0 56 88" fill="none">
                {/* Balloon Body */}
                <ellipse
                  cx="28"
                  cy="34"
                  rx="24"
                  ry="29"
                  fill={balloon.color}
                  stroke={balloon.stroke}
                  strokeWidth="1.5"
                />
                {/* Balloon Highlight */}
                <path
                  d="M20 16C15 20 13 28 14 34"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeOpacity="0.75"
                />
                {/* Knot */}
                <polygon
                  points="26,63 30,63 28,66"
                  fill={balloon.stroke}
                />
                {/* Curled Balloon String */}
                <path
                  d="M28 66C24 72 32 76 26 82C22 86 28 88 28 88"
                  stroke={balloon.stroke}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="2 2"
                />
              </svg>
            </div>
          </motion.div>
        ))}

      {/* 4. OCCASIONAL FLOATING BIRTHDAY & BESTIE WISHES */}
      {!shouldReduceMotion &&
        floatingWishes.map((wish, idx) => (
          <motion.div
            key={`wish-${idx}`}
            className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-pink-200/70 shadow-[0_4px_16px_rgba(244,114,182,0.18)] text-purple-950 font-['Fredoka'] text-[11px] font-bold"
            style={{
              top: wish.top,
              left: wish.side === 'left' ? '2.5%' : undefined,
              right: wish.side === 'right' ? '2.5%' : undefined,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.65, 0.95, 0.65],
              scale: [0.97, 1.03, 0.97],
            }}
            transition={{
              duration: wish.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: wish.delay,
            }}
          >
            <span>{wish.text}</span>
          </motion.div>
        ))}

      {/* 5. TWINKLING PASTEL STARS */}
      {stars.map((star, idx) => (
        <div
          key={`star-${idx}`}
          className={`absolute ${star.color} animate-twinkle hidden sm:block`}
          style={{
            top: star.top,
            left: star.left,
            right: star.right,
            animationDelay: `${star.delay}s`,
          }}
        >
          {idx % 2 === 0 ? (
            <Sparkles size={star.size} strokeWidth={1.5} />
          ) : (
            <Star size={star.size} fill="currentColor" strokeWidth={1.2} />
          )}
        </div>
      ))}

      {/* 6. GENTLE UPWARD DRIFTING HEARTS */}
      {!shouldReduceMotion &&
        hearts.map((heart, idx) => (
          <motion.div
            key={`heart-${idx}`}
            className={`absolute ${heart.color} hidden sm:block`}
            style={{
              bottom: heart.bottom,
              left: heart.left,
              right: heart.right,
            }}
            animate={{
              y: [0, -45, -90, -45, 0],
              x: [0, 10, -10, 5, 0],
              scale: [0.85, 1.15, 0.9, 1.08, 0.85],
              opacity: [0.35, 0.8, 0.5, 0.75, 0.35],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: heart.delay,
            }}
          >
            <Heart size={heart.size} fill="currentColor" strokeWidth={1} />
          </motion.div>
        ))}

      {/* 7. OCCASIONAL GENTLE CONFETTI FLUTTER (Edges only, not continuous shower) */}
      {!shouldReduceMotion &&
        confettiPieces.map((confetti, idx) => (
          <div
            key={`confetti-${idx}`}
            className={`absolute top-0 w-2 h-3.5 rounded-sm opacity-0 hidden md:block ${confetti.color}`}
            style={{
              left: confetti.left,
              right: confetti.right,
              animation: `confettiFlutter ${confetti.duration}s ease-in-out infinite`,
              animationDelay: `${confetti.delay}s`,
            }}
          />
        ))}

      {/* 8. GENTLE SCROLL SPARKLES (Delicate bursts on scrolling between sections) */}
      {scrollSparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute text-pink-400"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          initial={{ scale: 0, opacity: 0, rotate: -20 }}
          animate={{ scale: [0, 1.3, 0], opacity: [0, 0.9, 0], rotate: 45 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <Sparkles size={18} />
        </motion.div>
      ))}
    </div>
  );
};

