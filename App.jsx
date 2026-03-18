import { useState, useEffect, useRef, useCallback } from 'react'
import { C, MAGENTA, mono } from './theme'
import { SKILLS, PROJECTS, CONTACT, DAEMONS, TABS } from './data/content'
import { useTerminal } from './hooks/useTerminal'
import TopView from './components/TopView'
import SshKillScreen from './components/SshKillScreen'

// ── Shared helpers ─────────────────────────────────────────────────────────
const Tag = ({ label, color = C.neon }) => (
  <span style={{ color, fontSize:'0.68rem', border:`1px solid ${color}40`, padding:'0.15rem 0.5rem', borderRadius:'3px', background:`${color}0a`, whiteSpace:'nowrap' }}>{label}</span>
)

// ── Sections ───────────────────────────────────────────────────────────────
function About() {
  return (
    <div>
      <span style={{ color:C.neon, fontSize:'0.7rem', letterSpacing:3 }}>// 01. ABOUT</span>
      <h2 style={{ fontSize:'clamp(1.1rem,3vw,1.4rem)', margin:'0.25rem 0 2rem' }}>About me</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'2rem' }}>
        <div>
          {[
            'Infrastructure and Cloud Engineer with a deep passion for Linux systems, cloud architecture, and DevOps automation.',
            'I specialize in designing and operating resilient, scalable infrastructure across cloud and on-prem environments — making complex systems reliable, observable, and maintainable.',
            "When I'm not breaking and fixing servers, I contribute to open-source infrastructure tooling and explore kernel internals.",
          ].map((p, i) => <p key={i} style={{ color:C.muted, lineHeight:1.9, fontSize:'0.88rem', margin:'0 0 1rem' }}>{p}</p>)}
        </div>
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:'8px', padding:'1.5rem' }}>
          <div style={{ color:C.neon, fontSize:'0.72rem', marginBottom:'1.25rem' }}>$ cat about.json</div>
          <div style={{ color:C.muted, fontSize:'0.72rem', marginBottom:'0.5rem' }}>{'{'}</div>
          {[['name','"Christian Todie"'],['role','"Infrastructure & Cloud Eng."'],['location','"Remote / On-site"'],['experience','"5+ years"'],['focus','["Cloud","Linux","DevOps"]'],['available','true']].map(([k,v]) => (
            <div key={k} style={{ fontSize:'0.76rem', marginBottom:'0.4rem', paddingLeft:'1rem' }}>
              <span style={{ color:C.purple }}>"{k}"</span><span style={{ color:C.muted }}>: </span><span style={{ color:C.green }}>{v}</span>
            </div>
          ))}
          <div style={{ color:C.muted, fontSize:'0.72rem' }}>{'}'}</div>
        </div>
      </div>
    </div>
  )
}

function Skills() {
  return (
    <div>
      <span style={{ color:C.neon, fontSize:'0.7rem', letterSpacing:3 }}>// 02. SKILLS</span>
      <h2 style={{ fontSize:'clamp(1.1rem,3vw,1.4rem)', margin:'0.25rem 0 2rem' }}>Tech stack</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:'1.4rem' }}>
        {SKILLS.map(s => (
          <div key={s.name}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.5rem', fontSize:'0.8rem' }}>
              <span style={{ color:C.text }}>{s.name}</span>
              <span style={{ color:C.neon }}>{s.pct}%</span>
            </div>
            <div style={{ background:C.border, borderRadius:'2px', height:'3px' }}>
              <div style={{ height:'100%', borderRadius:'2px', background:`linear-gradient(90deg,${C.neon},${C.purple})`, width:`${s.pct}%`, boxShadow:`0 0 10px ${C.neon}60` }} />
            </div>
            <div style={{ display:'flex', gap:'0.4rem', marginTop:'0.5rem', flexWrap:'wrap' }}>
              {s.items.map(it => <span key={it} style={{ color:C.muted, fontSize:'0.68rem', background:C.surface2, border:`1px solid ${C.border}`, padding:'0.1rem 0.45rem', borderRadius:'3px' }}>{it}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Projects() {
  return (
    <div>
      <span style={{ color:C.neon, fontSize:'0.7rem', letterSpacing:3 }}>// 03. PROJECTS</span>
      <h2 style={{ fontSize:'clamp(1.1rem,3vw,1.4rem)', margin:'0.25rem 0 2rem' }}>Featured work</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
        {PROJECTS.map(p => (
          <div key={p.name}
            style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:'8px', padding:'clamp(1rem,3vw,1.5rem)', transition:'border-color 0.2s,box-shadow 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=C.neon; e.currentTarget.style.boxShadow=`0 0 20px ${C.neon}15` }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.75rem', flexWrap:'wrap', gap:'0.5rem' }}>
              <div style={{ minWidth:0 }}>
                <span style={{ color:C.purple, fontSize:'0.72rem' }}>~/projects/ </span>
                <span style={{ color:C.neon, fontWeight:700, fontSize:'clamp(0.78rem,2vw,0.9rem)', wordBreak:'break-all' }}>{p.name}</span>
              </div>
              <span style={{ fontSize:'0.62rem', padding:'0.2rem 0.65rem', borderRadius:'999px', background:p.status==='prod'?'#28c84018':'#febc2e18', color:p.status==='prod'?'#28c840':'#febc2e', border:`1px solid ${p.status==='prod'?'#28c84050':'#febc2e50'}`, letterSpacing:1, textTransform:'uppercase', flexShrink:0 }}>
                ● {p.status==='prod'?'production':'active'}
              </span>
            </div>
            <p style={{ color:C.muted, fontSize:'0.83rem', lineHeight:1.75, margin:'0 0 1rem' }}>{p.desc}</p>
            <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap', marginBottom:'0.85rem' }}>
              {p.tags.map(t => <Tag key={t} label={t} />)}
            </div>
            <div style={{ display:'flex', gap:'1.25rem', flexWrap:'wrap' }}>
              {p.metrics.map(m => <span key={m} style={{ color:C.muted, fontSize:'0.7rem' }}>✓ {m}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Contact() {
  return (
    <div>
      <span style={{ color:C.neon, fontSize:'0.7rem', letterSpacing:3 }}>// 04. CONTACT</span>
      <h2 style={{ fontSize:'clamp(1.1rem,3vw,1.4rem)', margin:'0.25rem 0 2rem' }}>Get in touch</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'2rem' }}>
        <div>
          <p style={{ color:C.muted, fontSize:'0.88rem', lineHeight:1.9, margin:'0 0 2rem' }}>
            Open to new opportunities, collaborations, and interesting infrastructure challenges. Let's connect.
          </p>
          {CONTACT.map(c => (
            <div key={c.label} style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.25rem' }}>
              <span style={{ color:C.neon, fontSize:'1rem', width:'20px', flexShrink:0 }}>{c.icon}</span>
              <div style={{ minWidth:0 }}>
                <div style={{ color:C.muted, fontSize:'0.62rem', letterSpacing:2, textTransform:'uppercase', marginBottom:'0.1rem' }}>{c.label}</div>
                <a href={c.href} target="_blank" rel="noopener noreferrer"
                  style={{ color:C.neon, fontSize:'0.8rem', wordBreak:'break-all', textDecoration:'none', borderBottom:`1px solid ${C.neon}40` }}
                  onMouseEnter={e => e.currentTarget.style.borderColor=C.neon}
                  onMouseLeave={e => e.currentTarget.style.borderColor=`${C.neon}40`}>
                  {c.val}
                </a>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:'8px', padding:'1.5rem' }}>
          <div style={{ color:C.neon, fontSize:'0.72rem', marginBottom:'1rem' }}>$ ssh chris@todie.io</div>
          <div style={{ fontSize:'0.78rem', lineHeight:2.1 }}>
            <div style={{ color:C.green }}>Welcome to todie.io (Ubuntu 24.04)</div>
            <div style={{ color:C.muted }}>Last login: {new Date().toDateString()}</div>
            <div style={{ color:C.muted }}>──────────────────────────────</div>
            <div style={{ color:C.text }}>Status:   <span style={{ color:C.neon }}>● Available</span></div>
            <div style={{ color:C.text }}>Response: <span style={{ color:C.green }}>&lt; 24 hours</span></div>
            <div style={{ color:C.text }}>Open to:  <span style={{ color:C.purple }}>FTE · Contract · Consulting</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CV({ onRickroll }) {
  return (
    <div>
      <span style={{ color:C.neon, fontSize:'0.7rem', letterSpacing:3 }}>// 05. CV</span>
      <h2 style={{ fontSize:'clamp(1.1rem,3vw,1.4rem)', margin:'0.25rem 0 2rem' }}>Curriculum Vitae</h2>
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:'8px', padding:'clamp(1.5rem,5vw,3rem) clamp(1rem,4vw,2rem)', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem' }}>
        <div style={{ width:60, height:60, background:`${C.neon}15`, border:`2px solid ${C.neon}40`, borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem' }}>📄</div>
        <div>
          <div style={{ color:C.text, fontWeight:700, fontSize:'0.95rem', marginBottom:'0.25rem' }}>Christian_Todie_CV.pdf</div>
          <div style={{ color:C.muted, fontSize:'0.78rem' }}>Infrastructure & Cloud Engineer — Updated March 2026</div>
        </div>
        <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap', justifyContent:'center' }}>
          {['Infrastructure','Cloud','Linux','DevOps','Kubernetes'].map(t => <Tag key={t} label={t} />)}
        </div>
        <div style={{ display:'flex', gap:'1rem', marginTop:'0.5rem', flexWrap:'wrap', justifyContent:'center' }}>
          <button onClick={onRickroll} style={{ background:C.neon, color:C.bg, border:'none', padding:'0.7rem 1.75rem', fontFamily:mono, fontSize:'0.8rem', cursor:'pointer', borderRadius:'4px', fontWeight:700 }}>
            $ wget cv.pdf
          </button>
          <button style={{ background:'none', color:C.muted, border:`1px solid ${C.border}`, padding:'0.7rem 1.5rem', fontFamily:mono, fontSize:'0.8rem', cursor:'pointer', borderRadius:'4px' }}>
            preview →
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Rickroll modal ─────────────────────────────────────────────────────────
function Rickroll({ onClose }) {
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:999, background:'rgba(0,0,0,0.85)', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(6px)', padding:'1rem' }}>
      <div onClick={e => e.stopPropagation()} style={{ background:C.surface, border:`1px solid ${C.neon}`, borderRadius:'10px', overflow:'hidden', width:'min(640px,95vw)', boxShadow:`0 0 60px ${C.neon}30` }}>
        <div style={{ background:C.surface2, padding:'0.6rem 1rem', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:`1px solid ${C.border}`, gap:'0.5rem' }}>
          <div style={{ display:'flex', gap:'0.4rem' }}>
            {['#ff5f57','#febc2e','#28c840'].map((col,i) => <div key={i} style={{ width:10, height:10, borderRadius:'50%', background:col }} />)}
          </div>
          <span style={{ color:C.muted, fontSize:'0.62rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>wget cv.pdf — 100% [====================] ✓</span>
          <button onClick={onClose} style={{ background:'none', border:'none', color:C.muted, cursor:'pointer', fontFamily:mono, fontSize:'0.85rem', flexShrink:0 }}>✕</button>
        </div>
        <div style={{ background:'#000' }}>
          <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" allow="autoplay; encrypted-media" allowFullScreen style={{ width:'100%', aspectRatio:'16/9', border:'none', display:'block' }} />
        </div>
        <div style={{ padding:'0.75rem 1rem', fontSize:'0.72rem', color:C.muted, borderTop:`1px solid ${C.border}` }}>
          <span style={{ color:C.err }}>ERROR:</span> cv.pdf not found. Did you mean <span style={{ color:C.neon }}>never_gonna_give_you_up.mp4</span>?
        </div>
      </div>
    </div>
  )
}

// ── Root ───────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [booting,   setBooting]   = useState(false)
  const [bootLines, setBootLines] = useState([])
  const [bootDone,  setBootDone]  = useState(false)
  const [rickroll,  setRickroll]  = useState(false)
  const [sshKill,   setSshKill]   = useState(null)
  const [topMode,   setTopMode]   = useState(false)
  const [input,     setInput]     = useState('')

  const termBodyRef = useRef(null)
  const inputRef    = useRef(null)
  const canvasRef   = useRef(null)
  const touchStartY = useRef(null)

  const { lines, setLines, hist, hIdx, ghost, setGhost, ctrlR, setCtrlR, runCmd, applyHistory, getGhost } =
    useTerminal({ onTop: () => setTopMode(true), onSshKill: t => setSshKill(t) })

  // ── MOTD ──────────────────────────────────────────────────────────────────
  const MOTD = [
    { t:'sys', v:'Ubuntu 24.04.1 LTS (GNU/Linux 6.8.0-36-cloud x86_64)' },
    { t:'sys', v:'' },
    { t:'sys', v:' * Documentation:  https://help.ubuntu.com' },
    { t:'sys', v:`Last login: ${new Date().toDateString()} from 203.0.113.42` },
    { t:'sys', v:'' },
    { t:'out', v:'╔══════════════════════════════════════════════════════╗' },
    { t:'out', v:'║               Welcome to todie.io                   ║' },
    { t:'out', v:'╠══════════════════════════════════════════════════════╣' },
    { t:'out', v:'║  User   :  Christian Todie                           ║' },
    { t:'out', v:'║  Role   :  Infrastructure & Cloud Engineer           ║' },
    { t:'out', v:'║  Stack  :  AWS · GCP · Azure · K8s · Terraform       ║' },
    { t:'out', v:'║  OS     :  Ubuntu 24.04 LTS x86_64                   ║' },
    { t:'out', v:'║  Kernel :  6.8.0-36-cloud                            ║' },
    { t:'out', v:`║  Date   :  ${new Date().toDateString().padEnd(42)}║` },
    { t:'out', v:'║  Status :  ● Available for new opportunities         ║' },
    { t:'out', v:'╠══════════════════════════════════════════════════════╣' },
    { t:'out', v:'║  Type "help" for available commands                  ║' },
    { t:'out', v:'╚══════════════════════════════════════════════════════╝' },
    { t:'sys', v:'' },
  ]

  useEffect(() => { setLines(MOTD) }, [])

  // ── Matrix rain ───────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const ctx   = canvas.getContext('2d')
    const cols  = Math.floor(canvas.width / 18)
    const drops = Array.from({ length:cols }, () => Math.random() * -50)
    const chars = '01アイウエカキクケサシスセタチツテナニヌ$#@%&'
    let raf, last = 0
    const draw = ts => {
      if (ts - last > 60) {
        ctx.fillStyle = 'rgba(13,17,23,0.06)'; ctx.fillRect(0,0,canvas.width,canvas.height)
        drops.forEach((y,i) => {
          ctx.font = '13px monospace'
          ctx.fillStyle = i%4===0 ? `${C.neon}50` : `${C.neon}20`
          ctx.fillText(chars[Math.floor(Math.random()*chars.length)], i*18, y*18)
          if (y*18 > canvas.height && Math.random() > 0.975) drops[i] = 0
          drops[i] += 0.5
        })
        last = ts
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  useEffect(() => {
    if (termBodyRef.current) termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight
  }, [lines, topMode])

  // ── Input handlers ────────────────────────────────────────────────────────
  const onTouchStart = e => { touchStartY.current = e.touches[0].clientY }
  const onTouchEnd   = e => {
    if (touchStartY.current === null) return
    const dy = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(dy) > 45) {
      const r = applyHistory(dy > 0 ? Math.min(hIdx+1, hist.length-1) : Math.max(hIdx-1,-1))
      setInput(r.val); setGhost(r.ghost)
    }
    touchStartY.current = null
  }

  const onKey = e => {
    if (sshKill) return
    if (topMode) { if (e.key==='q'||e.key==='Q') setTopMode(false); return }
    if (ctrlR.active) {
      e.preventDefault()
      if (e.key==='Enter') { setInput(ctrlR.match); setGhost(getGhost(ctrlR.match,hist)); setCtrlR({active:false,query:'',match:''}) }
      else if (e.key==='Escape'||(e.ctrlKey&&e.key==='r')) setCtrlR({active:false,query:'',match:''})
      else if (e.key==='Backspace') { const q=ctrlR.query.slice(0,-1); setCtrlR({active:true,query:q,match:hist.find(h=>h.includes(q))||''}) }
      else if (e.key.length===1) { const q=ctrlR.query+e.key; setCtrlR({active:true,query:q,match:hist.find(h=>h.includes(q))||''}) }
      return
    }
    if (e.key==='Tab'||(e.key==='ArrowRight'&&ghost&&input.length>0)) { e.preventDefault(); if(ghost){setInput(input+ghost);setGhost('')} return }
    if (e.ctrlKey&&e.key==='r') { e.preventDefault(); setCtrlR({active:true,query:'',match:''}); return }
    if (e.key==='Enter') { runCmd(input); setInput(''); setGhost('') }
    else if (e.key==='ArrowUp')   { e.preventDefault(); const r=applyHistory(Math.min(hIdx+1,hist.length-1)); setInput(r.val); setGhost(r.ghost) }
    else if (e.key==='ArrowDown') { e.preventDefault(); const r=applyHistory(Math.max(hIdx-1,-1));             setInput(r.val); setGhost(r.ghost) }
  }

  // ── Tab switching ─────────────────────────────────────────────────────────
  const switchTab = id => {
    if (id===activeTab) return
    if (id==='home') { setActiveTab('home'); setBooting(false); setBootDone(false); return }
    setActiveTab(id); setBooting(true); setBootDone(false); setBootLines([])
    const seq = DAEMONS[id] || []
    seq.forEach((line,i) => {
      setTimeout(() => {
        setBootLines(prev => [...prev, line])
        if (i===seq.length-1) setTimeout(() => { setBooting(false); setBootDone(true) }, 320)
      }, i*180)
    })
  }

  // ── Terminal line renderer ────────────────────────────────────────────────
  const termLine = (l, i) => (
    <div key={i} style={{ marginBottom:'0.15rem', lineHeight:1.65, whiteSpace:'pre-wrap', wordBreak:'break-all', fontSize:'clamp(0.65rem,2vw,0.8rem)' }}>
      {l.t==='in'   && <><span style={{ color:C.neon }}>ct:~$ </span><span style={{ color:C.text }}>{l.v}</span></>}
      {l.t==='out'  && <span style={{ color:C.green }}>{l.v}</span>}
      {l.t==='err'  && <span style={{ color:C.err }}>{l.v}</span>}
      {l.t==='sys'  && <span style={{ color:C.muted }}>{l.v}</span>}
      {l.t==='perm' && (
        <span style={{ color:MAGENTA, display:'block', border:`1px solid ${MAGENTA}50`, padding:'0.2rem 0.5rem', borderRadius:'3px', background:`${MAGENTA}08`, marginTop:'0.15rem' }}>{l.v}</span>
      )}
    </div>
  )

  const isOk   = l => l.startsWith('[  OK  ]')
  const isWarn = l => l.startsWith('WARNING')

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ background:C.bg, color:C.text, fontFamily:mono, minHeight:'100vh', display:'flex', flexDirection:'column' }}>

      {/* ── NAV ── */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, background:'rgba(13,17,23,0.96)', backdropFilter:'blur(16px)', borderBottom:`1px solid ${C.border}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.75rem 1rem', borderBottom:`1px solid ${C.border}20` }}>
          {['#ff5f57','#febc2e','#28c840'].map((col,i) => <div key={i} style={{ width:11, height:11, borderRadius:'50%', background:col, flexShrink:0 }} />)}
          <span style={{ color:C.muted, fontSize:'0.62rem', marginLeft:'0.5rem', letterSpacing:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>chris@todie.io — bash</span>
          <span style={{ marginLeft:'auto', color:C.neon, fontSize:'0.6rem', letterSpacing:1, flexShrink:0 }}>● LIVE</span>
        </div>
        <div style={{ display:'flex', overflowX:'auto', scrollbarWidth:'none', marginTop:'0.35rem' }} className="no-scrollbar">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => switchTab(tab.id)} style={{ background:activeTab===tab.id?C.surface:'none', border:'none', borderBottom:activeTab===tab.id?`2px solid ${C.neon}`:'2px solid transparent', borderRight:`1px solid ${C.border}`, color:activeTab===tab.id?C.neon:C.muted, fontFamily:mono, fontSize:'0.72rem', padding:'0.5rem 1rem', cursor:'pointer', whiteSpace:'nowrap', flexShrink:0, transition:'color 0.15s,background 0.15s' }}>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── MAIN ── */}
      <main style={{ flex:1, paddingTop:'76px', display:'flex', flexDirection:'column' }}>

        {/* HOME — TERMINAL */}
        <div style={{ display:activeTab==='home'?'flex':'none', flex:1, position:'relative', minHeight:'calc(100vh - 76px)' }}>
          <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.45, pointerEvents:'none' }} />
          <div style={{ position:'relative', zIndex:2, width:'100%', padding:'clamp(1rem,4vw,2.5rem)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:'10px', overflow:'hidden', boxShadow:`0 0 60px ${C.neon}15`, width:'100%', maxWidth:'860px' }}>
              <div ref={termBodyRef} onClick={() => inputRef.current?.focus()}
                onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
                style={{ padding:'clamp(0.75rem,3vw,1.25rem)', minHeight:'clamp(280px,55vh,480px)', maxHeight:'72vh', overflowY:'auto', cursor:'text' }}>
                {!topMode && lines.map(termLine)}
                {topMode && (
                  <div>
                    {termLine({ t:'in', v:'top' }, 'top-cmd')}
                    <TopView />
                  </div>
                )}
                {!topMode && (
                  ctrlR.active ? (
                    <div style={{ display:'flex', alignItems:'center', marginTop:'0.2rem', fontSize:'clamp(0.65rem,2vw,0.8rem)', flexWrap:'wrap', gap:'0.1rem' }}>
                      <span style={{ color:C.purple, flexShrink:0 }}>(reverse-i-search)`</span>
                      <span style={{ color:C.text }}>{ctrlR.query}</span>
                      <span style={{ color:C.purple }}>':</span>
                      <span style={{ color:C.neon, marginLeft:'0.3rem' }}>{ctrlR.match}</span>
                      <span style={{ color:C.neon, animation:'blink 1s step-end infinite' }}>█</span>
                    </div>
                  ) : (
                    <div style={{ display:'flex', alignItems:'center', marginTop:'0.2rem' }}>
                      <span style={{ color:C.neon, fontSize:'clamp(0.65rem,2vw,0.8rem)', marginRight:'0.4rem', flexShrink:0 }}>ct:~$</span>
                      <div style={{ position:'relative', flex:1, display:'flex', alignItems:'center', minWidth:0 }}>
                        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', pointerEvents:'none', fontFamily:mono, fontSize:'clamp(0.65rem,2vw,0.8rem)', whiteSpace:'pre', overflow:'hidden' }}>
                          <span style={{ color:'transparent' }}>{input}</span>
                          <span style={{ color:'#3a4557' }}>{ghost}</span>
                        </div>
                        <input ref={inputRef} value={input}
                          onChange={e => { const v=e.target.value; setInput(v); setGhost(getGhost(v,hist)) }}
                          onKeyDown={onKey} autoFocus spellCheck={false}
                          style={{ background:'none', border:'none', outline:'none', color:C.text, fontFamily:mono, fontSize:'clamp(0.65rem,2vw,0.8rem)', flex:1, caretColor:C.neon, minWidth:0, position:'relative', zIndex:1, width:'100%' }} />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION BOOT + CONTENT */}
        {activeTab!=='home' && (booting||bootDone) && (
          <div style={{ padding:'clamp(1rem,4vw,3rem)', maxWidth:'860px', margin:'0 auto', width:'100%' }}>
            <div style={{ marginBottom:bootDone?'2.5rem':0 }}>
              {bootLines.map((l,i) => (
                <div key={i} style={{ fontSize:'clamp(0.68rem,2vw,0.8rem)', lineHeight:1.9, color:isOk(l)?C.green:isWarn(l)?'#febc2e':C.muted }}>
                  {isOk(l)   ? <><span style={{ color:C.neon }}>[  OK  ]</span>{l.slice(7)}</> :
                   isWarn(l) ? <><span style={{ color:'#febc2e' }}>WARNING:</span>{l.slice(7)}</> :
                                <><span style={{ color:C.purple, marginRight:'0.5rem' }}>[ ···· ]</span>{l}</>}
                </div>
              ))}
              {booting && <div style={{ fontSize:'0.72rem', color:C.muted, marginTop:'0.5rem' }}><span style={{ animation:'blink 0.8s step-end infinite', color:C.neon }}>█</span></div>}
            </div>
            {bootDone && (
              <div style={{ animation:'fadeIn 0.4s ease' }}>
                {activeTab==='about'    && <About />}
                {activeTab==='skills'   && <Skills />}
                {activeTab==='projects' && <Projects />}
                {activeTab==='contact'  && <Contact />}
                {activeTab==='cv'       && <CV onRickroll={() => setRickroll(true)} />}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:'1.5rem clamp(1rem,4vw,3rem)', textAlign:'center', color:C.muted, fontSize:'0.68rem' }}>
        <div>chris@todie.io:~$ <span style={{ color:C.neon }}>echo "Built with ♥ and too much coffee"</span></div>
        <div style={{ marginTop:'0.4rem', opacity:0.4 }}>© 2026 Christian Todie</div>
      </footer>

      {/* ── OVERLAYS ── */}
      {rickroll && <Rickroll onClose={() => setRickroll(false)} />}
      {sshKill  && <SshKillScreen target={sshKill} onDone={() => setSshKill(null)} />}
    </div>
  )
}
