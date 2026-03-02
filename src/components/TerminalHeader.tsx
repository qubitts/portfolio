"use client";

import React, { useState } from "react";

interface TerminalHeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function TerminalHeader({
  soundEnabled,
  onToggleSound,
}: TerminalHeaderProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-navy-700/80 backdrop-blur-sm border-b border-slate-dark/30 shrink-0">
      {/* Window dots */}
      <div className="flex gap-2">
        <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f57]" />
        <div className="w-3.5 h-3.5 rounded-full bg-[#febc2e]" />
        <button
          onClick={handleFullscreen}
          className="w-3.5 h-3.5 rounded-full bg-[#28c840] hover:bg-[#1aab29] transition-colors hover:shadow-[0_0_6px_#28c840]"
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        />
      </div>

      {/* Title */}
      <div className="text-slate text-sm select-none">
        piyush@portfolio <span className="text-slate-dark">~</span>
      </div>

      {/* Sound toggle */}
      <button
        onClick={onToggleSound}
        className="text-slate hover:text-mint transition-colors text-sm"
        title={soundEnabled ? "Mute sounds" : "Enable sounds"}
      >
        {soundEnabled ? "🔊" : "🔇"}
      </button>
    </div>
  );
}
