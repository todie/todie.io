import { useState, useEffect } from 'react'
import { BASE_PROCS } from '../data/content'
import { C, MAGENTA } from '../theme'

export default function TopView() {
  const [procs, setProcs] = useState(BASE_PROCS.map(p => ({ ...p })))
  const [tick,  setTick]  = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setProcs(prev => prev.map(p => {
        if (p.pid === 31337) return { ...p, cpu: +(80 + Math.random() * 15).toFixed(1) }
        if (p.cpu > 0) return { ...p, cpu: Math.max(0, +(p.cpu + (Math.random() - 0.5) * 0.4).toFixed(1)) }
        return p
      }))
      setTick(t => t + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const sorted = [...procs].sort((a, b) => b.cpu - a.cpu)
  const malwareCpu = procs.find(p => p.pid === 31337)?.cpu ?? 87
  const fs = 'clamp(0.55rem, 1.6vw, 0.72rem)'
  const now = new Date()

  return (
    <div style={{ fontFamily:'monospace', fontSize:fs, lineHeight:1.7, userSelect:'none' }}>
      <div style={{ color:C.neon }}>top - {now.toTimeString().slice(0,8)} up 847 days  load avg: {(malwareCpu/100*0.4).toFixed(2)}</div>
      <div>%Cpu: <span style={{ color:C.err }}>{malwareCpu.toFixed(1)}</span> us  MiB Mem: 32768 total</div>
      <div style={{ color:C.muted, marginTop:'0.4rem' }}>{'  PID USER        PR  NI  VIRT   RES  S %CPU %MEM  TIME+    COMMAND'}</div>
      <div style={{ color:C.border }}>{'  ─── ─────────── ── ── ────── ───── ─ ──── ──── ──────── ─────────────────'}</div>
      {sorted.map(p => {
        const bad = p.pid === 31337
        return (
          <div key={p.pid} style={{ color:bad ? C.err : p.cpu > 0.5 ? C.text : C.muted, whiteSpace:'pre', overflow:'hidden' }}>
            {String(p.pid).padStart(5)} {p.user.slice(0,10).padEnd(11)} {String(p.pr).padStart(3)} {String(p.ni).padStart(3)} {p.virt.padStart(6)} {p.res.padStart(5)} {p.s} {p.cpu.toFixed(1).padStart(5)} {p.mem.toFixed(1).padStart(4)} {p.time.padStart(9)}  {p.cmd}{bad ? ' ⚠' : ''}
          </div>
        )
      })}
      <div style={{ color:MAGENTA, marginTop:'0.6rem', fontSize:'0.7rem' }}>
        {tick % 2 === 0 ? '⚠  PID 31337: python3 /tmp/.x11-unix/.update — anomalous CPU' : '   q to quit top'}
      </div>
    </div>
  )
}