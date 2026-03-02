"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import TerminalHeader from "./TerminalHeader";
import BootSequence from "./BootSequence";
import CommandOutput from "./CommandOutput";
import CommandChips from "./CommandChips";
import DinoGame from "./DinoGame";
import { commandMap, commandNames } from "@/lib/commands";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

// Realistic mechanical keyboard click using noise burst
function createKeystrokeSound(audioCtx: AudioContext) {
  const bufferSize = audioCtx.sampleRate * 0.04; // 40ms
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    const t = i / audioCtx.sampleRate;
    const envelope = Math.exp(-t * 120) * 0.6;
    const noise = (Math.random() * 2 - 1) * envelope;
    const thud = Math.sin(2 * Math.PI * 150 * t) * envelope * 0.4;
    const click =
      Math.sin(2 * Math.PI * 3500 * t) * Math.exp(-t * 300) * 0.3;
    data[i] = noise + thud + click;
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;

  const filter = audioCtx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2000 + Math.random() * 500;
  filter.Q.value = 0.8;

  const gain = audioCtx.createGain();
  gain.gain.value = 0.45;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  source.start(audioCtx.currentTime);
}

export default function Terminal() {
  const [booted, setBooted] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [suggestion, setSuggestion] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const scrollToPortfolioRef = useRef<HTMLDivElement>(null);
  const skipAutoScroll = useRef(false);

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const playSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioCtx();
      createKeystrokeSound(ctx);
    } catch {
      // Audio not available
    }
  }, [soundEnabled, getAudioCtx]);

  // Auto-scroll to bottom (unless portfolio command was just run)
  useEffect(() => {
    if (skipAutoScroll.current) {
      if (scrollToPortfolioRef.current) {
        scrollToPortfolioRef.current.scrollIntoView({ behavior: "smooth" });
      }
      skipAutoScroll.current = false;
      return;
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, booted]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Tab autocomplete
  useEffect(() => {
    if (input.trim()) {
      const match = commandNames.find(
        (c) => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase()
      );
      setSuggestion(match || "");
    } else {
      setSuggestion("");
    }
  }, [input]);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();

      if (!trimmed) return;

      playSound();

      if (trimmed === "clear") {
        setHistory([]);
        return;
      }

      if (trimmed === "game") {
        setHistory((prev) => [
          ...prev,
          {
            command: trimmed,
            output: <DinoGame command="game" />,
          },
        ]);
        return;
      }

      // "piyush" or "piyush mittal" triggers full portfolio
      const nameAliases = ["piyush", "piyush mittal", "piyushmittal"];
      if (nameAliases.includes(trimmed) || trimmed === "portfolio") {
        const portfolioCommands = [
          "about",
          "experience",
          "skills",
          "education",
          "certifications",
          "achievements",
          "contact",
          "socials",
        ];
        const entries: HistoryEntry[] = portfolioCommands.map((c) => ({
          command: c,
          output: commandMap[c].output(),
        }));
        entries[0].command = "about";
        skipAutoScroll.current = true;
        setHistory((prev) => [
          ...prev,
          { command: "portfolio", output: null },
          ...entries,
        ]);
        return;
      }

      const def = commandMap[trimmed];
      if (def) {
        setHistory((prev) => [
          ...prev,
          { command: trimmed, output: def.output() },
        ]);
      } else {
        // Unknown command — show dino game!
        setHistory((prev) => [
          ...prev,
          {
            command: trimmed,
            output: <DinoGame command={trimmed} />,
          },
        ]);
      }
    },
    [playSound]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    executeCommand(trimmed);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) {
        setInput(suggestion);
        playSound();
      }
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    playSound();
  };

  const handleChipCommand = (cmd: string) => {
    executeCommand(cmd);
    focusInput();
  };

  const handleBootComplete = useCallback(() => {
    setBooted(true);
    setTimeout(() => {
      executeCommand("help");
    }, 200);
  }, [executeCommand]);

  const portfolioMarkerIndex = history.findIndex(
    (h) => h.command === "portfolio" && h.output === null
  );

  return (
    <div className="h-screen w-screen flex flex-col bg-navy-800">
      <TerminalHeader
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 cursor-text"
        onClick={focusInput}
      >
        {!booted && (
          <BootSequence
            onComplete={handleBootComplete}
            playSound={playSound}
          />
        )}

        {booted &&
          history.map((entry, i) => {
            if (entry.command === "portfolio" && entry.output === null) {
              return (
                <div
                  key={i}
                  ref={scrollToPortfolioRef}
                  className="flex items-center gap-2"
                >
                  <span className="text-gold text-glow-gold shrink-0">
                    ❯
                  </span>
                  <span className="text-slate-light">portfolio</span>
                </div>
              );
            }

            if (entry.command === "clear") return null;

            return (
              <CommandOutput
                key={i}
                command={entry.command}
                output={entry.output}
                index={
                  i > portfolioMarkerIndex && portfolioMarkerIndex !== -1
                    ? i - portfolioMarkerIndex
                    : i
                }
              />
            );
          })}

        {/* Input line — single blinking block cursor, no native caret */}
        {booted && (
          <form onSubmit={handleSubmit} className="flex items-center gap-0">
            <span className="text-gold text-glow-gold shrink-0 mr-2">❯</span>
            <div className="relative flex items-center flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-slate-light outline-none"
                style={{ caretColor: "transparent" }}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
              {/* Single block cursor positioned after typed text */}
              <span
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-5 bg-mint/80 cursor-blink pointer-events-none"
                style={{ left: `${input.length * 0.6}em` }}
              />
              {/* Autocomplete suggestion */}
              {suggestion && input && (
                <span className="absolute left-0 top-0 text-slate-dark pointer-events-none leading-normal">
                  {suggestion}
                </span>
              )}
            </div>
          </form>
        )}

        <div className="h-8" />
      </div>

      {booted && <CommandChips onCommand={handleChipCommand} />}
    </div>
  );
}
