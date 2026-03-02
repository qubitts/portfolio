"use client";

import React from "react";

const chipCommands = [
  "about",
  "experience",
  "skills",
  "education",
  "certifications",
  "achievements",
  "contact",
  "resume",
  "portfolio",
];

interface CommandChipsProps {
  onCommand: (cmd: string) => void;
}

export default function CommandChips({ onCommand }: CommandChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 sm:px-6 py-3 bg-navy-700/50 backdrop-blur-sm border-t border-slate-dark/30 shrink-0">
      {chipCommands.map((cmd) => (
        <button
          key={cmd}
          onClick={() => onCommand(cmd)}
          className="px-3 py-1 text-xs text-mint border border-mint/20 rounded-full
                     bg-mint/5 hover:bg-mint/15 hover:border-mint/40
                     transition-all duration-200 select-none"
        >
          {cmd}
        </button>
      ))}
    </div>
  );
}
