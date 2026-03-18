# CLAUDE.md — todie.io

## Project
Personal portfolio for Christian Todie (chris@todie.io).
Interactive terminal-style SPA — React 18 + Vite 5. No CSS framework.
Live: https://todie.github.io/todie.io/

## File map
src/App.jsx                        root component: tabs, terminal, overlays
src/theme.js                       C (colours), MAGENTA, mono
src/data/filesystem.js             FS, FS_DIRS, SSH_HOSTS
src/data/commands.js               STATIC_CMDS
src/data/content.js                SKILLS, PROJECTS, CONTACT, BASE_PROCS, DAEMONS, TABS
src/hooks/useTerminal.js           command resolver, history, ghost completion
src/components/TopView.jsx         live top(1) process table
src/components/SshKillScreen.jsx   IDS overlay with glitch + countdown

## Conventions
- Inline styles only — no Tailwind, no className
- Colours via C.* and MAGENTA from src/theme.js
- Font via mono from src/theme.js
- Responsive sizing: clamp() only — never hardcoded px for font/padding
- Terminal line types: in | out | err | sys | perm

## Terminal line types
in   — neon    — user input (prefixed with ct:~$)
out  — green   — successful command output
err  — red     — errors / command not found
sys  — muted   — system/MOTD messages
perm — magenta — security event (permission denied, logged + forwarded)

## Terminal commands
help whoami neofetch whois uptime ls [path] cat <path> top ssh <host> clear

## SSH routing (SSH_HOSTS in filesystem.js)
todie.io / localhost   → self-connect message
45.142.212.100         → SshKillScreen (IDS killscreen)
monitoring.internal    → connects (shell prompt)
10.0.1.50              → connects (backup node)
all others             → denied / refused / timeout + perm alert

## SshKillScreen phases
0  mount    normal connection output
1  700ms    light glitch (12% corruption)
2  1500ms   heavy glitch (72%) + IDS box appears
3  2600ms   log/ban lines + 12s countdown + input re-enabled

## Ghost completion
- cat/ls paths: matched against ALL_PATHS (FS keys + FS_DIRS keys with /)
- history-first, then static command names
- Tab or ArrowRight (at end of input) accepts
- Ctrl+R reverse-i-search; arrows navigate history
- Mobile: swipe up/down on terminal body

## Build & deploy
npm run dev           local dev — http://localhost:5173
npm run build         production build → docs/
GITHUB_PAGES=true     sets Vite base to /todie.io/ for Pages asset paths

GitHub Actions deploy on push to master via .github/workflows/deploy.yml
Enable: repo Settings → Pages → Source: Deploy from branch → master → /docs
URL: https://todie.github.io/todie.io/

## Quick start for Claude Code
cd todie.io && claude

Useful prompts:
  "Implement App.jsx from the architecture in CLAUDE.md"
  "Add /etc/nginx/nginx.conf to FS in filesystem.js"
  "Add a ping <host> command to useTerminal.js"
  "Extract sections into src/components/sections/"
