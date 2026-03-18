import { useState, useCallback } from 'react'
import { FS, FS_DIRS, SSH_HOSTS } from '../data/filesystem'
import { STATIC_CMDS } from '../data/commands'

const ALL_CMDS  = [...Object.keys(STATIC_CMDS), 'cat', 'top', 'ssh', 'ls']
const ALL_PATHS = [...Object.keys(FS), ...Object.keys(FS_DIRS).map(d => d + '/')]

export function useTerminal({ onTop, onSshKill }) {
  const [lines, setLines] = useState([])
  const [hist,  setHist]  = useState([])
  const [hIdx,  setHIdx]  = useState(-1)
  const [ghost, setGhost] = useState('')
  const [ctrlR, setCtrlR] = useState({ active: false, query: '', match: '' })

  const getGhost = useCallback((val, h) => {
    if (!val) return ''
    const pool = h || hist
    const pm = val.match(/^(cat|ls)\s+(\S*)$/i)
    if (pm) {
      const partial = pm[2]
      if (!partial) return ''
      const hit = ALL_PATHS.find(p => p.startsWith(partial) && p !== partial)
      return hit ? hit.slice(partial.length) : ''
    }
    const hm = pool.find(c => c.toLowerCase().startsWith(val.toLowerCase()) && c.toLowerCase() !== val.toLowerCase())
    if (hm) return hm.slice(val.length)
    const cm = ALL_CMDS.find(c => c.startsWith(val.toLowerCase()) && c !== val.toLowerCase())
    return cm ? cm.slice(val.length) : ''
  }, [hist])

  const resolveCmd = useCallback((raw) => {
    const trimmed = raw.trim()
    const lower   = trimmed.toLowerCase()

    if (lower === 'top') { onTop(); return [] }

    if (lower === 'ssh' || lower.startsWith('ssh ')) {
      const target = trimmed.slice(3).trim() || 'unknown'
      const host   = target.includes('@') ? target.split('@')[1] : target
      const route  = SSH_HOSTS[host]
      if (!route) return [
        { t:'sys',  v:`ssh: connect to host ${host} port 22: Connection timed out` },
        { t:'perm', v:`⚠  SECURITY EVENT: outbound SSH attempt to unknown host ${host} has been logged and forwarded to sysadmin@todie.io` },
      ]
      if (route.type === 'killscreen') { onSshKill(target); return [{ t:'sys', v:`ssh: connect to host ${host} port 22: connecting...` }] }
      if (route.type === 'self') return [{ t:'out', v:`chris@${host}: you are already logged in.\nssh: session already open on pts/0` }]
      return [{ t: route.type === 'connect' ? 'out' : 'err', v:`ssh: connect to host ${host} port 22:\n${route.msg}` }]
    }

    if (lower.startsWith('cat ')) {
      const path = trimmed.slice(4).trim()
      const content = FS[path]
      if (content) {
        if (content.includes('Permission denied') || content.includes('Operation not permitted')) return [
          { t:'err',  v:content },
          { t:'perm', v:`⚠  SECURITY EVENT: access attempt on ${path} has been logged and forwarded to sysadmin@todie.io` },
        ]
        return [{ t:'out', v:content }]
      }
      const norm = path.replace(/\/+$/, '')
      if (FS_DIRS[norm]) return [{ t:'err', v:`cat: ${path}: Is a directory` }]
      return [{ t:'err', v:`cat: ${path}: No such file or directory` }]
    }

    if (lower.startsWith('ls')) {
      const path = trimmed.slice(2).trim().replace(/\/+$/, '')
      if (!path) return [{ t:'out', v:STATIC_CMDS['ls'] }]
      const entries = FS_DIRS[path]
      if (entries) return [{ t:'out', v:entries.map(e => e.endsWith('/') ? `drwxr-xr-x  ${e}` : `-rw-r--r--  ${e}`).join('\n') }]
      if (FS[path]) return [{ t:'err', v:`ls: cannot access '${path}': Not a directory` }]
      return [{ t:'err', v:`ls: cannot access '${path}': No such file or directory` }]
    }

    const out = STATIC_CMDS[lower]
    if (out) return [{ t:'out', v:out }]
    return [{ t:'err', v:`bash: ${trimmed}: command not found. Try 'help'` }]
  }, [onTop, onSshKill])

  const runCmd = useCallback((cmd) => {
    const newHist = [cmd, ...hist]
    setHist(newHist); setHIdx(-1); setGhost('')
    if (cmd.trim().toLowerCase() === 'clear') { setLines([]); return }
    const results = resolveCmd(cmd)
    setLines(prev => [...prev, { t:'in', v:cmd }, ...results])
  }, [hist, resolveCmd])

  const applyHistory = useCallback((i) => {
    setHIdx(i)
    const val = i === -1 ? '' : hist[i] || ''
    return { val, ghost: getGhost(val, hist) }
  }, [hist, getGhost])

  return { lines, setLines, hist, hIdx, ghost, setGhost, ctrlR, setCtrlR, runCmd, applyHistory, getGhost }
}