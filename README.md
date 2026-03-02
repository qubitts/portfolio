# Piyush Mittal — Terminal Portfolio

A terminal-themed portfolio website built with Next.js. Type commands or click buttons to explore.

## Features

- **Terminal UI** — Full-screen terminal with navy blue theme and JetBrains Mono font
- **Interactive Commands** — `help`, `about`, `experience`, `skills`, `education`, `certifications`, `achievements`, `contact`, `socials`, `resume`, `portfolio`
- **Typewriter Sound Effects** — Mechanical keyboard clicks on every keystroke (toggleable)
- **Dino Game** — Type any unknown command or `game` to play a Chrome-style dino runner
- **Name Easter Egg** — Type `piyush` or `piyush mittal` to view the full portfolio
- **Tab Autocomplete** — Start typing a command and press Tab to autocomplete
- **Command History** — Use arrow keys to navigate previous commands
- **Boot Animation** — ASCII art name with animated startup sequence
- **Fullscreen Mode** — Click the green dot to toggle fullscreen
- **Mobile Friendly** — Clickable command chips for touch navigation

## Tech Stack

- **Framework** — Next.js 14 (App Router, TypeScript)
- **Styling** — Tailwind CSS
- **Animations** — Framer Motion
- **Font** — JetBrains Mono
- **Deployment** — Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, SEO
│   ├── page.tsx            # Main page
│   └── globals.css         # Theme, animations, scrollbar
├── components/
│   ├── Terminal.tsx         # Core terminal (input, history, sound)
│   ├── TerminalHeader.tsx   # Window chrome (dots, title, sound toggle)
│   ├── BootSequence.tsx     # Startup animation
│   ├── CommandOutput.tsx    # Renders command results
│   ├── CommandChips.tsx     # Clickable command buttons
│   └── DinoGame.tsx         # Dino runner game (canvas)
├── lib/
│   ├── commands.tsx         # Command definitions and output
│   └── asciiArt.ts          # ASCII art name banner
└── data/
    └── resume.ts            # All personal/resume data
```
