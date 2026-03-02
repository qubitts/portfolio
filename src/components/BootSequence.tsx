"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nameAscii, welcomeLines } from "@/lib/asciiArt";

interface BootSequenceProps {
  onComplete: () => void;
  playSound: () => void;
}

export default function BootSequence({
  onComplete,
  playSound,
}: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showAscii, setShowAscii] = useState(false);

  useEffect(() => {
    // Show ASCII art first
    const asciiTimer = setTimeout(() => {
      setShowAscii(true);
      playSound();
    }, 300);

    // Then show welcome lines one by one
    const lineTimers = welcomeLines.map((_, i) =>
      setTimeout(() => {
        setVisibleLines(i + 1);
        if (welcomeLines[i]) playSound();
      }, 800 + i * 400)
    );

    // Complete boot
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 800 + welcomeLines.length * 400 + 300);

    return () => {
      clearTimeout(asciiTimer);
      lineTimers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [onComplete, playSound]);

  return (
    <div className="space-y-1">
      <AnimatePresence>
        {showAscii && (
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-mint text-glow text-[10px] sm:text-xs leading-tight select-none"
          >
            {nameAscii}
          </motion.pre>
        )}
      </AnimatePresence>

      <div className="space-y-0.5 mt-2">
        {welcomeLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={
              line.includes("ready")
                ? "text-mint text-sm"
                : line.includes("Welcome")
                  ? "text-gold text-sm font-semibold"
                  : line.includes("help")
                    ? "text-slate-light text-sm"
                    : "text-slate text-sm"
            }
          >
            {line.includes("Booting") || line.includes("Loading") || line.includes("Initializing") ? (
              <>
                <span className="text-mint mr-2">✓</span>
                {line}
              </>
            ) : (
              line
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
