"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

const CANVAS_W = 600;
const CANVAS_H = 150;
const GROUND_Y = 120;
const GRAVITY = 0.6;
const JUMP_FORCE = -11;
const GAME_SPEED_INIT = 4;
const GAME_SPEED_INCR = 0.001;

// Dino shape
const DINO_W = 20;
const DINO_H = 22;
const DINO_X = 50;

// Cactus shape
const CACTUS_W = 12;
const CACTUS_MIN_H = 20;
const CACTUS_MAX_H = 35;
const CACTUS_MIN_GAP = 120;
const CACTUS_MAX_GAP = 250;

interface Cactus {
  x: number;
  h: number;
}

export default function DinoGame({ command }: { command: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const gameRef = useRef({
    dinoY: GROUND_Y - DINO_H,
    velY: 0,
    isJumping: false,
    cacti: [] as Cactus[],
    speed: GAME_SPEED_INIT,
    score: 0,
    frame: 0,
    legFrame: 0,
    running: false,
  });

  const startGame = useCallback(() => {
    const g = gameRef.current;
    g.dinoY = GROUND_Y - DINO_H;
    g.velY = 0;
    g.isJumping = false;
    g.cacti = [{ x: CANVAS_W + 50, h: 25 }];
    g.speed = GAME_SPEED_INIT;
    g.score = 0;
    g.frame = 0;
    g.running = true;
    setScore(0);
    setGameState("playing");
  }, []);

  const jump = useCallback(() => {
    const g = gameRef.current;
    if (gameState === "idle" || gameState === "over") {
      startGame();
      return;
    }
    if (!g.isJumping) {
      g.velY = JUMP_FORCE;
      g.isJumping = true;
    }
  }, [gameState, startGame]);

  // Draw dino
  const drawDino = useCallback(
    (ctx: CanvasRenderingContext2D, y: number, legFrame: number) => {
      ctx.fillStyle = "#64ffda";
      // Body
      ctx.fillRect(DINO_X + 2, y, 16, 14);
      // Head
      ctx.fillRect(DINO_X + 10, y - 8, 10, 10);
      // Eye
      ctx.fillStyle = "#0a192f";
      ctx.fillRect(DINO_X + 16, y - 5, 2, 2);
      ctx.fillStyle = "#64ffda";
      // Tail
      ctx.fillRect(DINO_X, y + 2, 4, 6);
      // Legs (animated)
      if (legFrame % 2 === 0) {
        ctx.fillRect(DINO_X + 4, y + 14, 4, 8);
        ctx.fillRect(DINO_X + 12, y + 14, 4, 6);
      } else {
        ctx.fillRect(DINO_X + 4, y + 14, 4, 6);
        ctx.fillRect(DINO_X + 12, y + 14, 4, 8);
      }
      // Arm
      ctx.fillRect(DINO_X + 14, y + 6, 6, 3);
    },
    []
  );

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const g = gameRef.current;

    const loop = () => {
      if (!g.running) return;
      g.frame++;

      // Update dino
      g.velY += GRAVITY;
      g.dinoY += g.velY;
      if (g.dinoY >= GROUND_Y - DINO_H) {
        g.dinoY = GROUND_Y - DINO_H;
        g.velY = 0;
        g.isJumping = false;
      }

      // Update leg animation
      if (g.frame % 6 === 0) g.legFrame++;

      // Update speed
      g.speed += GAME_SPEED_INCR;

      // Update cacti
      for (const c of g.cacti) {
        c.x -= g.speed;
      }

      // Remove off-screen cacti
      g.cacti = g.cacti.filter((c) => c.x > -CACTUS_W);

      // Spawn new cactus
      const lastCactus = g.cacti[g.cacti.length - 1];
      if (!lastCactus || lastCactus.x < CANVAS_W - CACTUS_MIN_GAP - Math.random() * (CACTUS_MAX_GAP - CACTUS_MIN_GAP)) {
        g.cacti.push({
          x: CANVAS_W + Math.random() * 60,
          h: CACTUS_MIN_H + Math.random() * (CACTUS_MAX_H - CACTUS_MIN_H),
        });
      }

      // Score
      g.score++;
      if (g.frame % 6 === 0) setScore(Math.floor(g.score / 6));

      // Collision detection
      for (const c of g.cacti) {
        if (
          DINO_X + DINO_W - 4 > c.x + 2 &&
          DINO_X + 4 < c.x + CACTUS_W - 2 &&
          g.dinoY + DINO_H > GROUND_Y - c.h
        ) {
          g.running = false;
          setGameState("over");
          return;
        }
      }

      // Clear
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Ground
      ctx.strokeStyle = "#495670";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(CANVAS_W, GROUND_Y);
      ctx.stroke();

      // Ground dots
      ctx.fillStyle = "#495670";
      for (let i = 0; i < CANVAS_W; i += 20) {
        const offset = (g.frame * g.speed) % 20;
        ctx.fillRect(i - offset, GROUND_Y + 4, 2, 1);
      }

      // Dino
      drawDino(ctx, g.dinoY, g.legFrame);

      // Cacti
      ctx.fillStyle = "#ff6b6b";
      for (const c of g.cacti) {
        // Main body
        ctx.fillRect(c.x + 2, GROUND_Y - c.h, CACTUS_W - 4, c.h);
        // Arms
        if (c.h > 25) {
          ctx.fillRect(c.x - 2, GROUND_Y - c.h + 8, 6, 4);
          ctx.fillRect(c.x + CACTUS_W - 4, GROUND_Y - c.h + 14, 6, 4);
        }
      }

      // Score
      ctx.fillStyle = "#8892b0";
      ctx.font = "12px monospace";
      ctx.fillText(`Score: ${Math.floor(g.score / 6)}`, CANVAS_W - 100, 20);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, drawDino]);

  // Draw idle / game over state
  useEffect(() => {
    if (gameState === "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Ground
    ctx.strokeStyle = "#495670";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(CANVAS_W, GROUND_Y);
    ctx.stroke();

    // Dino
    drawDino(ctx, GROUND_Y - DINO_H, 0);

    ctx.fillStyle = "#ccd6f6";
    ctx.font = "14px monospace";

    if (gameState === "idle") {
      ctx.fillText("Press SPACE or click to play!", CANVAS_W / 2 - 120, 60);
    } else {
      ctx.fillStyle = "#ff6b6b";
      ctx.font = "bold 18px monospace";
      ctx.fillText("GAME OVER", CANVAS_W / 2 - 55, 50);
      ctx.fillStyle = "#8892b0";
      ctx.font = "12px monospace";
      ctx.fillText(`Score: ${score}`, CANVAS_W / 2 - 30, 70);
      ctx.fillStyle = "#ccd6f6";
      ctx.font = "12px monospace";
      ctx.fillText("Press SPACE or click to restart", CANVAS_W / 2 - 110, 95);
    }
  }, [gameState, score, drawDino]);

  // Keyboard handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [jump]);

  return (
    <div className="space-y-2">
      <div className="text-coral text-sm">
        Command not found: <span className="text-slate-light">{command}</span>
        <span className="text-slate"> — but here&apos;s a game instead!</span>
      </div>
      <div
        className="border border-slate-dark/40 rounded-lg p-2 inline-block bg-navy-900/50 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          jump();
        }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="block max-w-full"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <div className="text-slate text-xs">
        Press <span className="text-mint">SPACE</span> to jump |
        Type <span className="text-mint">&quot;help&quot;</span> to see commands
      </div>
    </div>
  );
}
