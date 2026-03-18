import { useState, useEffect } from 'react'
import { C, MAGENTA } from '../theme'

const GC = '!@#$%^&*░▒▓█▄▀╔╗╚╝║═±§¶'
const corrupt = (s, r) =>
  s.split('').map(c => c !== ' ' && Math.random() < r ? GC[Math.floor(Math.random() * GC.length)] : c).join('')

export default function SshKillScreen({ target, onDone }) {
  const [phase,     setPhase]     = useState(0)
  const [countdown, setCountdown] = useState(null)
  const base1 = `ssh: Connecting to ${target} port 22...`
  const base2 = `Authenticating with public key "id_ed25519"...`
  const base3 = `PTY allocation request failed on channel 0`
  const [g1, setG1] = useState(base1)
  const [g2, setG2] = useState(base2)
  const [g3, setG3] = useState(base3)

  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 700), setTimeout(() => setPhase(2), 1500), setTimeout(() => setPhase(3), 2600)]
    return () => t.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (phase < 1 || phase >= 3) return
    const rate = phase === 1 ? 0.12 : 0.72, ms = phase === 1 ? 110 : 55
    const id = setInterval(() => { setG1(corrupt(base1, rate)); setG2(corrupt(base2, rate)); setG3(corrupt(base3, rate)) }, ms)
    return () => clearInterval(id)
  }, [phase])

  useEffect(() => {
    if (phase < 3) return
    setCountdown(12)
    const tick = setInterval(() => setCountdown(c => { if (c <= 1) { clearInterval(tick); onDone(); return 0 } return c - 1 }), 1000)
    return () => clearInterval(tick)
  }, [phase])

  useEffect(() => {
    if (phase < 3) return
    const h = () => onDone()
    window.addEventListener('keydown', h); window.addEventListener('touchstart', h)
    return () => { window.removeEventListener('keydown', h); window.removeEventListener('touchstart', h) }
  }, [phase, onDone])

  const host = target.includes('@') ? target.split('@')[1] : target
  const user = target.includes('@') ? target.split('@')[0] : 'chris'
  const ts   = new Date().toISOString().replace('T',' ').slice(0,19)
  const fs   = 'clamp(0.62rem, 1.8vw, 0.78rem)'

  return (
    <div style={{ position:'fixed', inset:0, zIndex:600, background:'rgba(5,5,8,0.98)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace', padding:'1.5rem', cursor: phase >= 3 ? 'pointer' : 'default' }} onClick={() => phase >= 3 && onDone()}>
      <div style={{ width:'100%', maxWidth:'700px' }}>
        <div style={{ fontSize:fs, lineHeight:1.9, marginBottom:'0.75rem' }}>
          <div><span style={{ color:C.neon }}>ct:~$ </span><span style={{ color:C.text }}>ssh {target}</span></div>
          <div style={{ color: phase < 2 ? C.muted : MAGENTA }}>{g1}</div>
          <div style={{ color: phase < 2 ? C.muted : MAGENTA }}>{g2}</div>
          {phase >= 1 && <div style={{ color: phase < 2 ? C.err : MAGENTA }}>{g3}</div>}
        </div>
        {phase >= 2 && (
          <div style={{ color:MAGENTA, fontSize:fs, lineHeight:1.85, animation:'glitchIn 0.15s ease', marginBottom:'0.75rem' }}>
            <div>{'╔══════════════════════════════════════════════════════╗'}</div>
            <div>{'║  ⚠  INTRUSION DETECTION SYSTEM TRIGGERED  ⚠         ║'}</div>
            <div>{'╠══════════════════════════════════════════════════════╣'}</div>
            <div>{`║  Target  : ${host.slice(0,42).padEnd(42)}║`}</div>
            <div>{`║  User    : ${(user + ' → remote').slice(0,42).padEnd(42)}║`}</div>
            <div>{`║  Status  : ACCESS DENIED                             ║`}</div>
            <div>{`║  Time    : ${ts.padEnd(42)}║`}</div>
            <div>{'╚══════════════════════════════════════════════════════╝'}</div>
          </div>
        )}
        {phase >= 3 && (
          <div style={{ fontSize:fs, lineHeight:2.1, animation:'fadeIn 0.3s ease' }}>
            <div style={{ color:MAGENTA }}>[!] EVENT LOGGED   →  /var/log/auth.log</div>
            <div style={{ color:MAGENTA }}>[!] ALERT SENT     →  sysadmin@todie.io</div>
            <div style={{ color:C.err   }}>[!] FAIL2BAN       →  BAN {host} FOR 86400s</div>
            <div style={{ color:C.err   }}>[!] IDS RULE ADDED →  DROP src={host}</div>
            <div style={{ color:C.muted, marginTop:'0.75rem', animation:'blink 1s step-end infinite' }}>
              — press any key — {countdown !== null && <span style={{ color:C.err }}>auto-close in {countdown}s</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}