import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Lock, Eye, EyeOff, Sparkles, CheckCircle2, AlertCircle, RefreshCw, KeyRound } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BIRTHDAY_CONFIG, validatePassword } from '../config/birthdayConfig';
import { GiftIllustration } from './GiftIllustration';

export interface PasswordGateProps {
  onUnlock?: () => void;
  isUnlocked?: boolean;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({
  onUnlock,
  isUnlocked: externalIsUnlocked,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUnlockedInternal, setIsUnlockedInternal] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const isUnlocked = Boolean(externalIsUnlocked || isUnlockedInternal);

  // Focus input automatically on mount for seamless experience
  useEffect(() => {
    if (!isUnlocked) {
      inputRef.current?.focus();
    }
  }, [isUnlocked]);

  const triggerCelebrationConfetti = () => {
    try {
      // Primary center burst
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#c084fc', '#fde047', '#6ee7b7', '#fbcfe8', '#a855f7'],
        disableForReducedMotion: shouldReduceMotion ?? false,
      });

      // Left angle sparkle burst
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.65 },
          colors: ['#f472b6', '#fde047', '#c084fc'],
          disableForReducedMotion: shouldReduceMotion ?? false,
        });
      }, 180);

      // Right angle sparkle burst
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.65 },
          colors: ['#6ee7b7', '#f472b6', '#a855f7'],
          disableForReducedMotion: shouldReduceMotion ?? false,
        });
      }, 350);
    } catch {
      // Fallback if canvas-confetti is not available
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Empty password check
    if (!password.trim()) {
      setErrorMessage(BIRTHDAY_CONFIG.copy.emptyError);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      inputRef.current?.focus();
      return;
    }

    // 2. Validate password
    const isValid = validatePassword(password);

    if (isValid) {
      setErrorMessage(null);
      setIsUnlockedInternal(true);
      triggerCelebrationConfetti();

      // Smooth transition to adventure
      setTimeout(() => {
        onUnlock?.();
      }, 700);
    } else {
      // 3. Incorrect password check
      setErrorMessage(BIRTHDAY_CONFIG.copy.incorrectError);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      inputRef.current?.select();
    }
  };

  const handleResetForTesting = () => {
    setIsUnlockedInternal(false);
    setPassword('');
    setErrorMessage(null);
    setShowHint(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-8 sm:py-12 z-10">
      {/* Centered Main Birthday Card */}
      <motion.div
        className="w-full max-w-[440px] rounded-3xl bg-white/92 backdrop-blur-xl border border-purple-200/70 p-6 sm:p-9 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.18),0_10px_25px_-10px_rgba(236,72,153,0.12)] text-center relative overflow-hidden transition-all duration-300"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Subtle Decorative Card Accent Glow */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-pink-200/40 via-purple-200/30 to-transparent blur-2xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-tr from-yellow-100/50 via-purple-100/30 to-transparent blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* TOP HEADER ILLUSTRATION */}
        <div className="relative mb-3 flex flex-col items-center">
          <GiftIllustration isUnlocked={isUnlocked} size={84} />

          {/* Decorative Tag / Badge */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100/80 border border-purple-200/70 text-purple-800 text-[11px] font-semibold tracking-[0.16em] uppercase">
            <Sparkles size={12} className="text-pink-500" />
            <span>{BIRTHDAY_CONFIG.copy.badgeText}</span>
          </div>
        </div>

        {/* MAIN HEADINGS */}
        <div className="space-y-2 mb-6">
          <h1 className="font-['Fredoka'] text-3xl sm:text-[34px] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-pink-600 to-purple-800 leading-snug">
            {BIRTHDAY_CONFIG.copy.heading}
          </h1>
          <p className="text-purple-950 font-medium text-base sm:text-[17px] leading-relaxed">
            {BIRTHDAY_CONFIG.copy.subheading}
          </p>
          <p className="text-purple-700/85 text-xs sm:text-[13px] leading-relaxed max-w-[360px] mx-auto pt-0.5">
            {BIRTHDAY_CONFIG.copy.supportingText}
          </p>
        </div>

        {/* UNLOCKED SUCCESS STATE (Section 1 Completed -> Adventure Transition) */}
        {isUnlocked ? (
          <motion.div
            key="unlocked-state"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-5 py-2"
          >
            {/* Success Box */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-pink-50 via-purple-50 to-amber-50 border border-purple-200/90 shadow-inner flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm animate-bounce">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-950 via-pink-600 to-purple-800 leading-tight">
                YOU'RE IN, SAVITHA! 💗
              </h2>
              <p
                role="status"
                aria-live="polite"
                className="text-purple-900 font-semibold text-sm sm:text-base leading-snug"
              >
                Someone has prepared a little adventure just for you.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-purple-100 text-purple-700 text-xs font-semibold mt-1 shadow-xs">
                <Sparkles size={13} className="text-pink-500" />
                <span>Secret Pass Granted</span>
              </div>
            </div>

            {/* START YOUR ADVENTURE BUTTON */}
            <div className="pt-2 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={onUnlock}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white font-['Fredoka'] text-lg font-bold shadow-xl shadow-pink-500/25 transition-all transform hover:-translate-y-0.5 active:scale-98 flex items-center justify-center gap-2"
              >
                <span>START YOUR ADVENTURE 🎮</span>
              </button>

              <button
                type="button"
                onClick={handleResetForTesting}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-purple-600 hover:text-purple-900 transition-colors"
              >
                <RefreshCw size={12} />
                <span>Lock Gate Again</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* LOCKED STATE — PASSWORD FORM */
          <motion.form
            key="password-form"
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
          >
            {/* Password Prompt Instruction */}
            <p className="text-xs sm:text-[13px] text-purple-900/90 font-medium">
              {BIRTHDAY_CONFIG.copy.passwordInstruction}
            </p>

            {/* Input with Shake Animation for invalid attempt */}
            <motion.div
              animate={
                isShaking && !shouldReduceMotion
                  ? { x: [-8, 8, -6, 6, -3, 3, 0] }
                  : { x: 0 }
              }
              transition={{ duration: 0.4 }}
              className="relative text-left"
            >
              <label htmlFor="birthday-secret-password" className="sr-only">
                Secret Birthday Password
              </label>

              <div className="relative flex items-center">
                {/* Left Lock Icon */}
                <div
                  className="absolute left-3.5 text-purple-400 pointer-events-none flex items-center"
                  aria-hidden="true"
                >
                  <Lock size={18} />
                </div>

                {/* Password Input */}
                <input
                  id="birthday-secret-password"
                  ref={inputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder={BIRTHDAY_CONFIG.copy.placeholder}
                  className={`w-full pl-10 pr-11 py-3 sm:py-3.5 text-sm sm:text-base rounded-2xl bg-white/95 border text-purple-950 placeholder:text-purple-300 transition-all duration-200 outline-none ${errorMessage
                    ? 'border-pink-400 ring-2 ring-pink-200/70 bg-pink-50/20'
                    : 'border-purple-200/90 hover:border-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200/50 shadow-sm'
                    }`}
                  aria-invalid={errorMessage ? 'true' : 'false'}
                  aria-describedby={errorMessage ? 'password-error-message' : undefined}
                  autoComplete="off"
                />

                {/* Right Show/Hide Password Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 p-1.5 rounded-xl text-purple-400 hover:text-purple-700 hover:bg-purple-100/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Animated Inline Error Message */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    id="password-error-message"
                    role="alert"
                    aria-live="polite"
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    className="flex items-center gap-1.5 mt-2 text-xs sm:text-[13px] text-pink-600 font-medium px-1"
                  >
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit / Unlock Button */}
            <motion.button
              type="submit"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="w-full group relative overflow-hidden py-3.5 sm:py-4 px-6 rounded-2xl font-semibold text-white text-sm sm:text-base tracking-wide bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-500 hover:via-pink-400 hover:to-purple-500 shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-300"
            >
              {/* Subtle Light Shimmer effect */}
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              <span className="relative inline-flex items-center justify-center gap-2">
                <span>{BIRTHDAY_CONFIG.copy.buttonText}</span>
                <Sparkles size={16} className="text-yellow-200 transition-transform group-hover:rotate-12" />
              </span>
            </motion.button>

            {/* Helper Hint Toggle (Polite & Disclosed for Testing) */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-[11px] text-purple-500/70 hover:text-purple-700 underline decoration-purple-300/60 underline-offset-2 transition-colors focus:outline-none focus:ring-1 focus:ring-purple-400 rounded px-1"
              >
                {showHint ? 'Hide secret hint' : 'Need a secret hint?'}
              </button>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1.5 p-2 rounded-xl bg-purple-50/80 border border-purple-100 text-[11px] text-purple-700 flex items-center justify-center gap-1.5"
                  >
                    <KeyRound size={12} className="text-purple-500 shrink-0" />
                    <span>{BIRTHDAY_CONFIG.auth.hint}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        )}

        {/* CARD FOOTER MESSAGE */}
        <div className="mt-6 pt-4 border-t border-purple-100/70">
          <p className="font-['Caveat'] text-lg sm:text-xl text-purple-600/90 font-medium">
            {BIRTHDAY_CONFIG.copy.cardFooter}
          </p>
        </div>
      </motion.div>

      {/* OUTSIDE CARD — NEAR BOTTOM OF VIEWPORT */}
      <motion.div
        className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-purple-600/75 font-medium tracking-wide flex items-center justify-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <span>{BIRTHDAY_CONFIG.copy.viewportFooter}</span>
      </motion.div>
    </div>
  );
};
