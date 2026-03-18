# todie.io

Interactive terminal-style portfolio site for Christian Todie.

**Live:** [todie.github.io/todie.io](https://todie.github.io/todie.io/)

## About

A single-page application that emulates a Linux terminal. Visitors can run commands like `whoami`, `ls`, `cat`, `ssh`, `neofetch`, and `top` to explore my background, projects, and contact info.

Features:
- Ghost completion with tab/arrow-right accept
- Reverse-i-search (`Ctrl+R`) and command history
- `top` — live process table with simulated CPU/memory stats
- `ssh` — interactive SSH simulation with an IDS killscreen easter egg
- Mobile support with swipe gestures for history navigation
- Fully responsive via `clamp()` sizing — no breakpoints

## Tech Stack

- **React 18** + **Vite 5**
- Inline styles only — no CSS framework
- Deployed to GitHub Pages via GitHub Actions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build & Deploy

```bash
npm run build
```

Production output goes to `docs/`. Deployment is automatic on push to `master` via GitHub Actions.

## Terminal Commands

| Command | Description |
|---------|-------------|
| `help` | List available commands |
| `whoami` | About me |
| `neofetch` | System info splash |
| `whois` | Contact details |
| `uptime` | How long I've been doing this |
| `ls [path]` | List directory contents |
| `cat <path>` | Read a file |
| `top` | Live process table |
| `ssh <host>` | Connect to a remote host |
| `clear` | Clear the terminal |

## License

MIT
