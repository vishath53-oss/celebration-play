import React, { useRef, useEffect, useState } from 'react';
import type { GameLevel } from '../../types/gameTypes';
import { GameAudio } from '../../utils/gameAudio';

interface GameCanvasProps {
  level: GameLevel;
  isPaused: boolean;
  onCollectItem: (count: number, total: number) => void;
  onCatchSavitha: (score: number) => void;
  onScoreUpdate: (score: number) => void;
}

interface Platform {
  x: number;
  y: number;
  w: number;
  h: number;
  moving?: boolean;
  minX?: number;
  maxX?: number;
  speed?: number;
  dir?: number;
  isSpring?: boolean;
}

interface Collectible {
  id: number;
  x: number;
  y: number;
  collected: boolean;
  floatOffset: number;
  label?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  level,
  isPaused,
  onCollectItem,
  onCatchSavitha,
  onScoreUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Touch active visual states for mobile
  const [touchLeft, setTouchLeft] = useState(false);
  const [touchRight, setTouchRight] = useState(false);
  const [touchJump, setTouchJump] = useState(false);

  // References to keep input state synchronized with zero lag
  const keysRef = useRef<{ left: boolean; right: boolean; jump: boolean }>({
    left: false,
    right: false,
    jump: false,
  });

  // Keep callback references stable
  const callbacksRef = useRef({ onCollectItem, onCatchSavitha, onScoreUpdate });
  useEffect(() => {
    callbacksRef.current = { onCollectItem, onCatchSavitha, onScoreUpdate };
  }, [onCollectItem, onCatchSavitha, onScoreUpdate]);

  // Instant action handlers with pointer support for flawless multi-touch
  const startInput = (action: 'left' | 'right' | 'jump', e?: React.PointerEvent | React.TouchEvent) => {
    if (e && 'cancelable' in e && e.cancelable) {
      e.preventDefault();
    }
    if (action === 'left') {
      keysRef.current.left = true;
      setTouchLeft(true);
    } else if (action === 'right') {
      keysRef.current.right = true;
      setTouchRight(true);
    } else if (action === 'jump') {
      keysRef.current.jump = true;
      setTouchJump(true);
    }
  };

  const stopInput = (action: 'left' | 'right' | 'jump', e?: React.PointerEvent | React.TouchEvent) => {
    if (e && 'cancelable' in e && e.cancelable) {
      e.preventDefault();
    }
    if (action === 'left') {
      keysRef.current.left = false;
      setTouchLeft(false);
    } else if (action === 'right') {
      keysRef.current.right = false;
      setTouchRight(false);
    } else if (action === 'jump') {
      keysRef.current.jump = false;
      setTouchJump(false);
    }
  };

  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relativeX = x / rect.width;
    const relativeY = y / rect.height;

    // If upper area or far right: JUMP!
    if (relativeY < 0.45 || relativeX > 0.72) {
      startInput('jump', e);
    } else if (relativeX < 0.4) {
      startInput('left', e);
    } else {
      startInput('right', e);
    }
  };

  const handleCanvasPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    stopInput('left', e);
    stopInput('right', e);
    stopInput('jump', e);
  };

  // Keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        keysRef.current.left = true;
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        keysRef.current.right = true;
      }
      if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        keysRef.current.jump = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        keysRef.current.left = false;
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        keysRef.current.right = false;
      }
      if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) {
        keysRef.current.jump = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Main Game Loop & Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let score = 0;
    let collectedCount = 0;
    let hasCaught = false;

    // World Dimensions
    const WORLD_WIDTH = 2500;
    const WORLD_HEIGHT = 480;

    // Camera
    let cameraX = 0;

    // Player State
    const player = {
      x: 80,
      y: 340,
      w: 36,
      h: 46,
      vx: 0,
      vy: 0,
      isGrounded: false,
      facingRight: true,
      runAnimTimer: 0,
    };

    // Playful Cat Target State (A girl goes to catch the cat)
    const cat = {
      x: 550,
      y: 318,
      w: 42,
      h: 32,
      vx: 0,
      facingRight: true,
      speechText: "Meow! Catch me! 🐾",
      speechTimer: 180,
      runAnimTimer: 0,
      targetGoalX: 2320,
    };

    // Words for Quote Garden (Level 4)
    const quoteWords = ['Laughter', 'Warmth', 'Kindness', 'Sunshine', 'Forever'];

    // Generate Level Platforms
    const platforms: Platform[] = [
      // Starting solid ground
      { x: 0, y: 400, w: 420, h: 80 },
      // Mid platforms
      { x: 480, y: 350, w: 180, h: 28 },
      { x: 720, y: 290, w: 200, h: 28 },
      { x: 980, y: 340, w: 170, h: 28 },
      { x: 1210, y: 280, w: 220, h: 28 },
      { x: 1490, y: 330, w: 190, h: 28 },
      { x: 1740, y: 260, w: 210, h: 28 },
      { x: 2010, y: 320, w: 180, h: 28 },
      // Final Goal Stage Platform
      { x: 2220, y: 370, w: 280, h: 110 },
      // Ground connectors / safety nets with gaps
      { x: 400, y: 440, w: 700, h: 40 },
      { x: 1150, y: 440, w: 600, h: 40 },
      { x: 1800, y: 440, w: 500, h: 40 },
    ];

    // Level-specific tweaks
    if (level.theme === 'funzone') {
      // Add moving platforms and bounce pad
      platforms.push({
        x: 880,
        y: 220,
        w: 120,
        h: 24,
        moving: true,
        minX: 840,
        maxX: 1040,
        speed: 60,
        dir: 1,
      });
      platforms.push({
        x: 1400,
        y: 210,
        w: 100,
        h: 24,
        moving: true,
        minX: 1350,
        maxX: 1520,
        speed: 70,
        dir: -1,
      });
      // Bounce spring
      platforms.push({
        x: 650,
        y: 420,
        w: 48,
        h: 20,
        isSpring: true,
      });
    }

    // Generate Collectibles
    const collectibleLocations = [
      { x: 260, y: 330 },
      { x: 570, y: 280 },
      { x: 820, y: 220 },
      { x: 1060, y: 270 },
      { x: 1320, y: 210 },
      { x: 1580, y: 260 },
      { x: 1840, y: 190 },
      { x: 2100, y: 250 },
    ];

    const countToSpawn = Math.min(level.requiredCollectibles, collectibleLocations.length);
    const collectibles: Collectible[] = [];
    for (let i = 0; i < countToSpawn; i++) {
      collectibles.push({
        id: i,
        x: collectibleLocations[i].x,
        y: collectibleLocations[i].y,
        collected: false,
        floatOffset: Math.random() * Math.PI * 2,
        label: level.theme === 'quotes' ? quoteWords[i % quoteWords.length] : undefined,
      });
    }

    // Particles list
    const particles: Particle[] = [];

    const spawnParticles = (x: number, y: number, color: string, count = 12) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 140 + 40;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 40,
          color,
          size: Math.random() * 4 + 3,
          alpha: 1,
          life: 0.6 + Math.random() * 0.4,
        });
      }
    };

    // Parallax background clouds / decorations
    const bgElements = [
      { x: 100, y: 80, speed: 0.2, type: 'cloud', size: 60 },
      { x: 450, y: 60, speed: 0.2, type: 'cloud', size: 80 },
      { x: 850, y: 90, speed: 0.2, type: 'cloud', size: 70 },
      { x: 1300, y: 70, speed: 0.2, type: 'cloud', size: 90 },
      { x: 1750, y: 85, speed: 0.2, type: 'cloud', size: 75 },
      { x: 2200, y: 65, speed: 0.2, type: 'cloud', size: 85 },
      // Balloons / stars
      { x: 300, y: 160, speed: 0.4, type: 'balloon', color: '#f472b6' },
      { x: 700, y: 140, speed: 0.4, type: 'balloon', color: '#c084fc' },
      { x: 1100, y: 150, speed: 0.4, type: 'balloon', color: '#fbbf24' },
      { x: 1600, y: 130, speed: 0.4, type: 'balloon', color: '#6ee7b7' },
      { x: 2050, y: 145, speed: 0.4, type: 'balloon', color: '#f472b6' },
    ];

    // Game Loop
    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05); // Cap delta time
      lastTime = currentTime;

      if (!isPaused && !hasCaught) {
        // --- 1. PLAYER INPUT & PHYSICS ---
        const MOVE_SPEED = 240;
        const JUMP_FORCE = -540;
        const GRAVITY = 1350;

        // Horizontal movement
        if (keysRef.current.left) {
          player.vx = -MOVE_SPEED;
          player.facingRight = false;
          player.runAnimTimer += dt * 12;
        } else if (keysRef.current.right) {
          player.vx = MOVE_SPEED;
          player.facingRight = true;
          player.runAnimTimer += dt * 12;
        } else {
          player.vx = 0;
          player.runAnimTimer = 0;
        }

        // Jump
        if (keysRef.current.jump && player.isGrounded) {
          player.vy = JUMP_FORCE;
          player.isGrounded = false;
          GameAudio.playJump();
          spawnParticles(player.x + player.w / 2, player.y + player.h, '#e2e8f0', 5);
        }

        // Apply Gravity
        player.vy += GRAVITY * dt;
        if (player.vy > 750) player.vy = 750;

        // Tentative next position
        const nextX = player.x + player.vx * dt;
        const nextY = player.y + player.vy * dt;

        // Bounds limit
        player.x = Math.max(0, Math.min(WORLD_WIDTH - player.w, nextX));

        // Update Moving Platforms
        platforms.forEach((p) => {
          if (p.moving && p.minX !== undefined && p.maxX !== undefined && p.speed) {
            p.x += (p.speed * (p.dir || 1)) * dt;
            if (p.x > p.maxX) {
              p.x = p.maxX;
              p.dir = -1;
            } else if (p.x < p.minX) {
              p.x = p.minX;
              p.dir = 1;
            }
          }
        });

        // Platform Collisions (AABB)
        let grounded = false;
        platforms.forEach((p) => {
          // Check if player lands on platform top
          const prevBottom = player.y + player.h;
          const nextBottom = nextY + player.h;
          const isAbove = prevBottom <= p.y + 12;
          const withinX = player.x + player.w > p.x && player.x < p.x + p.w;

          if (isAbove && nextBottom >= p.y && withinX && player.vy >= 0) {
            player.y = p.y - player.h;
            player.vy = 0;
            grounded = true;

            // Spring bounce pad interaction
            if (p.isSpring) {
              player.vy = JUMP_FORCE * 1.35;
              grounded = false;
              GameAudio.playBounce();
              spawnParticles(p.x + p.w / 2, p.y, '#f59e0b', 16);
            }
          }
        });

        if (!grounded) {
          player.y = nextY;
          player.isGrounded = false;
        } else {
          player.isGrounded = true;
        }

        // Pit respawn
        if (player.y > WORLD_HEIGHT + 60) {
          player.x = Math.max(80, player.x - 300);
          player.y = 200;
          player.vy = 0;
          GameAudio.playBounce();
          spawnParticles(player.x, player.y, '#f43f5e', 12);
        }

        // --- 2. CAT AI & MOVEMENT ---
        const distToPlayer = cat.x - player.x;
        const catBaseSpeed = 160 + level.id * 10;

        if (distToPlayer > 0 && distToPlayer < 280) {
          // Player is getting close! Cat dashes away playfully!
          cat.vx = catBaseSpeed;
          cat.facingRight = true;
          cat.runAnimTimer += dt * 12;
        } else if (distToPlayer <= 0) {
          // Player hopped past cat; cat trots toward goal
          cat.vx = catBaseSpeed * 1.2;
          cat.facingRight = true;
          cat.runAnimTimer += dt * 14;
        } else {
          // Far away: slow down or pause to groom / wave paw
          cat.vx = Math.max(0, cat.vx - 300 * dt);
          cat.runAnimTimer = 0;
        }

        // Clamp Cat at goal platform
        cat.x += cat.vx * dt;
        if (cat.x > cat.targetGoalX) {
          cat.x = cat.targetGoalX;
          cat.facingRight = false; // Turn back to face player!
        }

        // Calculate ground/platform under cat so it stands cleanly on top
        let catGroundY = 400; // default base ground
        platforms.forEach((p) => {
          if (cat.x + cat.w > p.x && cat.x < p.x + p.w && p.y >= 180 && p.y <= 460) {
            if (p.y < catGroundY) {
              catGroundY = p.y;
            }
          }
        });
        cat.y = catGroundY - cat.h;

        // Cat Meow Speech bubble updates
        cat.speechTimer -= 1;
        if (cat.speechTimer <= 0) {
          cat.speechTimer = 180 + Math.random() * 120;
          const quotes = [
            'Meow! Catch me! 🐾',
            'Purr... too slow! 🐱',
            'Mrow! Up here! ✨',
            'Catch me if you can! 🐾',
            'Purrrr! 💖',
            'Nyaa! 🐾',
          ];
          cat.speechText = quotes[Math.floor(Math.random() * quotes.length)];
        }

        // --- 3. COLLECTIBLE CHECK ---
        collectibles.forEach((c) => {
          if (!c.collected) {
            const dx = (player.x + player.w / 2) - c.x;
            const dy = (player.y + player.h / 2) - c.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 32) {
              c.collected = true;
              collectedCount += 1;
              score += 100;
              GameAudio.playCollect();
              spawnParticles(c.x, c.y, level.accentColor, 15);
              callbacksRef.current.onCollectItem(collectedCount, level.requiredCollectibles);
              callbacksRef.current.onScoreUpdate(score);
            }
          }
        });

        // --- 4. CATCH DETECTION (Girl catches the Cat!) ---
        const catchDist = Math.abs((player.x + player.w / 2) - (cat.x + cat.w / 2));
        const yDist = Math.abs(player.y - cat.y);

        if (catchDist < 50 && yDist < 60) {
          if (collectedCount >= level.requiredCollectibles) {
            // SUCCESSFUL CATCH!
            hasCaught = true;
            score += 500;
            callbacksRef.current.onScoreUpdate(score);
            GameAudio.playCatch();
            spawnParticles(cat.x + 20, cat.y + 16, '#f97316', 35);
            spawnParticles(player.x + 18, player.y + 18, '#ec4899', 30);
            setTimeout(() => {
              GameAudio.playLevelComplete();
              callbacksRef.current.onCatchSavitha(score);
            }, 600);
          } else {
            // Need more collectibles first!
            cat.speechText = `Collect all ${level.requiredCollectibles} ${level.collectibleName} first! 🐾`;
            cat.speechTimer = 120;
          }
        }

        // Camera follow (lerp)
        const targetCamX = player.x - 180;
        cameraX += (targetCamX - cameraX) * 0.1;
        cameraX = Math.max(0, Math.min(WORLD_WIDTH - 800, cameraX));
      }

      // --- 5. RENDER CANVAS SCENE ---
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, WORLD_HEIGHT);
      skyGrad.addColorStop(0, level.skyGradient[0]);
      skyGrad.addColorStop(1, level.skyGradient[1]);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      // Apply camera translation
      ctx.translate(-cameraX, 0);

      // Distant Parallax Clouds & Balloons
      bgElements.forEach((el) => {
        const drawX = el.x - cameraX * el.speed;
        if (el.type === 'cloud') {
          const s = el.size || 60;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
          ctx.beginPath();
          ctx.arc(drawX + cameraX, el.y, s * 0.35, 0, Math.PI * 2);
          ctx.arc(drawX + cameraX + s * 0.3, el.y - s * 0.1, s * 0.4, 0, Math.PI * 2);
          ctx.arc(drawX + cameraX + s * 0.6, el.y, s * 0.3, 0, Math.PI * 2);
          ctx.fill();
        } else if (el.type === 'balloon' && el.color) {
          ctx.fillStyle = el.color;
          ctx.beginPath();
          ctx.ellipse(drawX + cameraX, el.y, 14, 18, 0, 0, Math.PI * 2);
          ctx.fill();
          // String
          ctx.strokeStyle = 'rgba(200, 180, 210, 0.6)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(drawX + cameraX, el.y + 18);
          ctx.lineTo(drawX + cameraX - 2, el.y + 36);
          ctx.stroke();
        }
      });

      // Draw Finish Arch / Celebration Goal
      ctx.save();
      const goalX = 2320;
      // Decorative Arches
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(goalX + 24, 340, 60, Math.PI, 0);
      ctx.stroke();
      // Goal Banner
      ctx.fillStyle = '#fbcfe8';
      ctx.fillRect(goalX - 30, 270, 108, 28);
      ctx.fillStyle = '#831843';
      ctx.font = 'bold 12px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('FINISH LINE 🏁', goalX + 24, 288);
      ctx.restore();

      // Draw Platforms
      platforms.forEach((p) => {
        // Platform Body
        ctx.fillStyle = p.isSpring ? '#fbbf24' : level.groundColor;
        ctx.beginPath();
        ctx.roundRect(p.x, p.y, p.w, p.h, [8, 8, 4, 4]);
        ctx.fill();

        // Platform Top Frosting / Grass Rim
        ctx.fillStyle = p.isSpring ? '#f59e0b' : level.platformColor;
        ctx.beginPath();
        ctx.roundRect(p.x, p.y, p.w, 8, [8, 8, 0, 0]);
        ctx.fill();

        // Spring coil styling
        if (p.isSpring) {
          ctx.fillStyle = '#b45309';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('BOING ⚡', p.x + p.w / 2, p.y + 14);
        }
      });

      // Draw Collectibles
      collectibles.forEach((c) => {
        if (!c.collected) {
          const bobY = c.y + Math.sin(currentTime * 0.005 + c.floatOffset) * 6;
          ctx.save();
          ctx.translate(c.x, bobY);

          // Glow ring
          ctx.fillStyle = 'rgba(253, 224, 71, 0.35)';
          ctx.beginPath();
          ctx.arc(0, 0, 16, 0, Math.PI * 2);
          ctx.fill();

          // Icon representation
          ctx.font = '20px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(level.collectibleIcon, 0, 0);

          // Word badge for Quote Garden
          if (c.label) {
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = 'rgba(0,0,0,0.15)';
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.roundRect(-28, -26, 56, 16, 8);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#065f46';
            ctx.font = 'bold 9px sans-serif';
            ctx.fillText(c.label, 0, -18);
          }
          ctx.restore();
        }
      });

      // Draw Cat Character (Cute playful ginger kitty)
      ctx.save();
      ctx.translate(cat.x, cat.y);
      if (!cat.facingRight) {
        ctx.scale(-1, 1);
        ctx.translate(-cat.w, 0);
      }

      const catRunCycle = Math.sin(cat.runAnimTimer);
      const catTailSway = Math.sin(cat.runAnimTimer * 1.2) * 0.3;

      // 1. Cat Tail (curved and waving playfully)
      ctx.save();
      ctx.translate(6, 16);
      ctx.rotate(-0.5 + catTailSway);
      ctx.strokeStyle = '#f97316'; // ginger cat tail
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-14, -8, -10, -22, 2, -26);
      ctx.stroke();
      // White tip of tail
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(-4, -20);
      ctx.bezierCurveTo(-2, -24, 0, -26, 2, -26);
      ctx.stroke();
      ctx.restore();

      // 2. Cat 4 Paws (animated running trot)
      const fPawSwing = catRunCycle * 6;
      const bPawSwing = Math.sin(cat.runAnimTimer + Math.PI) * 6;

      // Back paws (behind body)
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.ellipse(12 - bPawSwing, 28, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      // Front paw (behind body)
      ctx.beginPath();
      ctx.ellipse(32 - fPawSwing, 28, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // 3. Cat Body (plump warm orange/ginger oval)
      ctx.fillStyle = '#fb923c';
      ctx.beginPath();
      ctx.ellipse(22, 18, 16, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Creamy tummy
      ctx.fillStyle = '#fef3c7';
      ctx.beginPath();
      ctx.ellipse(23, 21, 11, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tabby stripes on back
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(16, 8);
      ctx.lineTo(18, 14);
      ctx.moveTo(22, 7);
      ctx.lineTo(24, 13);
      ctx.moveTo(28, 9);
      ctx.lineTo(29, 14);
      ctx.stroke();

      // Front paws (front layer)
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.ellipse(14 + bPawSwing, 29, 4.5, 3.5, 0, 0, Math.PI * 2);
      ctx.ellipse(34 + fPawSwing, 29, 4.5, 3.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // White paw tips
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(15 + bPawSwing, 30, 2.5, 2, 0, 0, Math.PI * 2);
      ctx.ellipse(35 + fPawSwing, 30, 2.5, 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // 4. Cat Head
      ctx.fillStyle = '#fb923c';
      ctx.beginPath();
      ctx.arc(32, 10, 10, 0, Math.PI * 2);
      ctx.fill();

      // Cat Ears (perky triangles with pink inner ears)
      // Left ear
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(25, 4);
      ctx.lineTo(27, -6);
      ctx.lineTo(33, 1);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#f472b6'; // pink inside
      ctx.beginPath();
      ctx.moveTo(26, 3);
      ctx.lineTo(27.5, -4);
      ctx.lineTo(31.5, 1);
      ctx.closePath();
      ctx.fill();

      // Right ear
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(33, 2);
      ctx.lineTo(37, -6);
      ctx.lineTo(41, 5);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#f472b6';
      ctx.beginPath();
      ctx.moveTo(34, 2);
      ctx.lineTo(37, -4);
      ctx.lineTo(39.5, 4);
      ctx.closePath();
      ctx.fill();

      // Cat Face
      // Eyes (emerald green with slit pupil and sparkle shine)
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(36, 9, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#064e3b';
      ctx.beginPath();
      ctx.arc(36.5, 9, 1.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(35.5, 8, 0.8, 0, Math.PI * 2); // eye sparkle
      ctx.fill();

      // Pink tiny nose
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(39, 11);
      ctx.lineTo(41, 11);
      ctx.lineTo(40, 12.5);
      ctx.closePath();
      ctx.fill();

      // Whiskers!
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(38, 12);
      ctx.lineTo(45, 11);
      ctx.moveTo(38, 13);
      ctx.lineTo(45, 14);
      ctx.stroke();

      // Cute cat collar with golden bell
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(27, 16, 6, 0, Math.PI * 0.8);
      ctx.stroke();
      // Golden bell
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(28, 20, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Cat Speech Bubble
      if (cat.speechText) {
        ctx.save();
        const bubbleX = cat.x + 22;
        const bubbleY = cat.y - 24;
        ctx.font = 'bold 11px Fredoka, sans-serif';
        const textWidth = ctx.measureText(cat.speechText).width;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.shadowColor = 'rgba(0,0,0,0.12)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.roundRect(bubbleX - textWidth / 2 - 8, bubbleY - 14, textWidth + 16, 22, 10);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Pointer triangle
        ctx.beginPath();
        ctx.moveTo(bubbleX - 4, bubbleY + 8);
        ctx.lineTo(bubbleX + 4, bubbleY + 8);
        ctx.lineTo(bubbleX, bubbleY + 14);
        ctx.fill();

        ctx.fillStyle = '#831843';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cat.speechText, bubbleX, bubbleY - 3);
        ctx.restore();
      }

      // Draw Player Character (Cute cartoon girl runner chasing the cat)
      ctx.save();
      ctx.translate(player.x, player.y);
      if (!player.facingRight) {
        ctx.scale(-1, 1);
        ctx.translate(-player.w, 0);
      }

      const pLegSwing = Math.sin(player.runAnimTimer) * 8;
      const pBounce = Math.abs(Math.sin(player.runAnimTimer)) * 2;

      // 1. Ponytail behind head (swings dynamically)
      ctx.save();
      ctx.translate(8, 10);
      ctx.rotate(-0.2 - (player.vx !== 0 ? Math.sin(player.runAnimTimer) * 0.25 : 0));
      ctx.fillStyle = '#271c19'; // dark brown hair
      ctx.beginPath();
      ctx.ellipse(-6, 2, 7, 11, -0.4, 0, Math.PI * 2);
      ctx.fill();
      // Cute Pink Hair Bow
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.arc(-4, -3, 3, 0, Math.PI * 2);
      ctx.arc(-4, 3, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Legs & Shoes
      // Left leg
      ctx.strokeStyle = '#fed7aa'; // skin
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(13, 32);
      ctx.lineTo(13 - pLegSwing, 44);
      ctx.stroke();
      // Left shoe (cute pink sneaker)
      ctx.fillStyle = '#f472b6';
      ctx.beginPath();
      ctx.roundRect(11 - pLegSwing, 42, 8, 4.5, 2);
      ctx.fill();
      // White sneaker sole
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(11 - pLegSwing, 45, 8, 1.5);

      // Right leg
      ctx.strokeStyle = '#fed7aa';
      ctx.beginPath();
      ctx.moveTo(23, 32);
      ctx.lineTo(23 + pLegSwing, 44);
      ctx.stroke();
      // Right shoe
      ctx.fillStyle = '#f472b6';
      ctx.beginPath();
      ctx.roundRect(21 + pLegSwing, 42, 8, 4.5, 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(21 + pLegSwing, 45, 8, 1.5);

      // 3. Cute Outfit: Flared Skirt & Top
      // Flared skirt
      ctx.fillStyle = '#db2777';
      ctx.beginPath();
      ctx.moveTo(9, 24);
      ctx.lineTo(27, 24);
      ctx.lineTo(31, 33 + pBounce);
      ctx.lineTo(5, 33 + pBounce);
      ctx.closePath();
      ctx.fill();

      // Cute Top (Pastel Purple with yellow heart)
      ctx.fillStyle = '#c084fc';
      ctx.beginPath();
      ctx.roundRect(9, 14, 18, 12, 4);
      ctx.fill();
      // Yellow heart motif on top
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(17, 18, 1.8, 0, Math.PI * 2);
      ctx.arc(19, 18, 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Cute Arms swinging
      const armSwing = Math.sin(player.runAnimTimer) * 6;
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(11, 16);
      ctx.lineTo(8 - armSwing, 24);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(25, 16);
      ctx.lineTo(28 + armSwing, 24);
      ctx.stroke();
      // Little hands
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(8 - armSwing, 24, 2, 0, Math.PI * 2);
      ctx.arc(28 + armSwing, 24, 2, 0, Math.PI * 2);
      ctx.fill();

      // 4. Head & Face
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(18, 9, 8.5, 0, Math.PI * 2);
      ctx.fill();

      // Cute Bangs & Hair front
      ctx.fillStyle = '#271c19';
      ctx.beginPath();
      ctx.arc(18, 7, 9, Math.PI * 0.8, Math.PI * 2.2);
      ctx.fill();
      // Bangs fringe
      ctx.beginPath();
      ctx.moveTo(10, 6);
      ctx.quadraticCurveTo(18, 9, 26, 5);
      ctx.lineTo(26, 2);
      ctx.lineTo(10, 2);
      ctx.closePath();
      ctx.fill();

      // Eye (Big cute anime eye with sparkle)
      ctx.fillStyle = '#1e1b4b';
      ctx.beginPath();
      ctx.arc(22, 9, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(21.5, 8.2, 0.7, 0, Math.PI * 2); // sparkle
      ctx.fill();

      // Rosy cheek blush
      ctx.fillStyle = 'rgba(251, 113, 133, 0.6)';
      ctx.beginPath();
      ctx.arc(22, 11.5, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Happy Smile
      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(22, 12, 2.5, 0, Math.PI * 0.7);
      ctx.stroke();

      // Cute hair clip (star)
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(14, 4, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.alpha -= dt / p.life;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      ctx.restore(); // Restore camera translation

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [level, isPaused]);

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Platformer Canvas Container */}
      <div className="relative w-full max-w-4xl aspect-[16/9] sm:aspect-[2/1] rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-200 bg-white touch-none">
        <canvas
          ref={canvasRef}
          width={800}
          height={480}
          onPointerDown={handleCanvasPointerDown}
          onPointerUp={handleCanvasPointerUp}
          onPointerCancel={handleCanvasPointerUp}
          className="w-full h-full object-cover block cursor-pointer"
        />
        {/* Subtle touch hint overlay for mobile players on the canvas */}
        <div className="absolute bottom-2 inset-x-0 flex justify-between px-3 text-[10px] text-purple-900/40 pointer-events-none sm:hidden font-bold">
          <span>◀ Tap Left to Run</span>
          <span>Tap Anywhere to Jump 🚀</span>
          <span>Tap Right to Run ▶</span>
        </div>
      </div>

      {/* DUAL-PURPOSE TOUCH CONTROLS (Optimized for Mobile & Touchscreens) */}
      <div className="w-full max-w-4xl mt-3 px-1 sm:px-2 flex items-center justify-between gap-3">
        {/* Left & Right D-Pad */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onPointerDown={(e) => startInput('left', e)}
            onPointerUp={(e) => stopInput('left', e)}
            onPointerCancel={(e) => stopInput('left', e)}
            onPointerLeave={(e) => stopInput('left', e)}
            className={`w-14 h-14 sm:w-16 sm:h-14 rounded-2xl flex items-center justify-center font-bold text-2xl border-2 shadow-lg transition-transform active:scale-90 touch-none select-none ${
              touchLeft
                ? 'bg-purple-600 text-white border-purple-700 ring-4 ring-purple-300'
                : 'bg-white/95 text-purple-900 border-purple-300 hover:bg-purple-50'
            }`}
            aria-label="Move Left"
          >
            ◀
          </button>
          <button
            type="button"
            onPointerDown={(e) => startInput('right', e)}
            onPointerUp={(e) => stopInput('right', e)}
            onPointerCancel={(e) => stopInput('right', e)}
            onPointerLeave={(e) => stopInput('right', e)}
            className={`w-14 h-14 sm:w-16 sm:h-14 rounded-2xl flex items-center justify-center font-bold text-2xl border-2 shadow-lg transition-transform active:scale-90 touch-none select-none ${
              touchRight
                ? 'bg-purple-600 text-white border-purple-700 ring-4 ring-purple-300'
                : 'bg-white/95 text-purple-900 border-purple-300 hover:bg-purple-50'
            }`}
            aria-label="Move Right"
          >
            ▶
          </button>
        </div>

        {/* Big Jump Button */}
        <button
          type="button"
          onPointerDown={(e) => startInput('jump', e)}
          onPointerUp={(e) => stopInput('jump', e)}
          onPointerCancel={(e) => stopInput('jump', e)}
          onPointerLeave={(e) => stopInput('jump', e)}
          className={`flex-1 sm:flex-initial sm:px-10 h-14 rounded-2xl flex items-center justify-center font-bold text-base sm:text-lg border-2 shadow-lg transition-transform active:scale-95 touch-none select-none ${
            touchJump
              ? 'bg-pink-600 text-white border-pink-700 ring-4 ring-pink-300'
              : 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white border-pink-300 hover:brightness-105'
          }`}
          aria-label="Jump"
        >
          <span>JUMP 🚀</span>
        </button>
      </div>

      {/* Desktop Keyboard Controls Cheatsheet */}
      <div className="hidden sm:flex items-center justify-center gap-4 mt-2 text-xs text-purple-700/80 font-medium">
        <span>Controls: <strong>A / D / Arrow Keys</strong> to Run</span>
        <span>•</span>
        <span><strong>Space / W / Up Arrow</strong> to Jump</span>
        <span>•</span>
        <span>Collect all items then touch the cat to complete!</span>
      </div>
    </div>
  );
};
