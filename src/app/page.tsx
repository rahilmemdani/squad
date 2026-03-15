'use client'

import { useState, useEffect } from 'react'

const activities = [
  { emoji: '⚽', name: 'Football' },
  { emoji: '🏏', name: 'Cricket' },
  { emoji: '🏋️', name: 'Gym' },
  { emoji: '🥾', name: 'Hiking' },
  { emoji: '🎲', name: 'Board games' },
  { emoji: '☕', name: 'Coffee' },
  { emoji: '🏊', name: 'Swimming' },
  { emoji: '🎾', name: 'Tennis' },
  { emoji: '🏀', name: 'Basketball' },
  { emoji: '🧘', name: 'Yoga' },
]

type City = 'mumbai' | 'hyderabad' | 'alabama' | 'south_carolina'

const cities = [
  { id: 'mumbai', label: '🇮🇳 Mumbai' },
  { id: 'hyderabad', label: '🇮🇳 Hyderabad' },
  { id: 'alabama', label: '🇺🇸 Alabama' },
  { id: 'south_carolina', label: '🇺🇸 South Carolina' },
] as const

const mockSquads = [
  { id: 1, activity: '⚽', name: 'Sunday Morning Football', location: 'Versova Beach', time: 'Sun 7:00 AM', members: 6, max: 10, city: 'mumbai', femaleOnly: false, verifiedOnly: true },
  { id: 2, activity: '🏋️', name: 'Morning Gym Crew', location: 'Andheri West', time: 'Daily 6:30 AM', members: 3, max: 5, city: 'mumbai', femaleOnly: true, verifiedOnly: false },
  { id: 3, activity: '🏏', name: 'Cricket on Weekends', location: 'Juhu', time: 'Sat 6:00 AM', members: 8, max: 11, city: 'mumbai', femaleOnly: false, verifiedOnly: false },
  { id: 4, activity: '☕', name: 'Tech Bro Meetup', location: 'Banjara Hills', time: 'Sat 5:00 PM', members: 4, max: 8, city: 'hyderabad', femaleOnly: false, verifiedOnly: true },
  { id: 5, activity: '🏸', name: 'Badminton Doubles', location: 'Jubilee Hills', time: 'Sun 6:00 AM', members: 2, max: 4, city: 'hyderabad', femaleOnly: true, verifiedOnly: true },
  { id: 6, activity: '🥾', name: 'Oak Mountain Hike', location: 'Birmingham', time: 'Sat 8:00 AM', members: 4, max: 8, city: 'alabama', femaleOnly: false, verifiedOnly: false },
  { id: 7, activity: '🏈', name: 'Flag Football', location: 'Tuscaloosa', time: 'Sun 4:00 PM', members: 10, max: 14, city: 'alabama', femaleOnly: false, verifiedOnly: true },
  { id: 8, activity: '🏄', name: 'Morning Surf', location: 'Folly Beach', time: 'Sat 6:30 AM', members: 3, max: 6, city: 'south_carolina', femaleOnly: false, verifiedOnly: false },
  { id: 9, activity: '🎲', name: 'Board Game Night', location: 'Charleston', time: 'Fri 7:00 PM', members: 5, max: 6, city: 'south_carolina', femaleOnly: true, verifiedOnly: false },
]

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [city, setCity] = useState<City>('mumbai')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')
  const [interest, setInterest] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [activeActivity, setActiveActivity] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [selectedSquad, setSelectedSquad] = useState<typeof mockSquads[0] | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  // Safety Filters
  const [showFemaleOnly, setShowFemaleOnly] = useState(false)
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)

  const [submissions, setSubmissions] = useState<any[]>([])

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const res = await fetch('/api/submissions')
        const data = await res.json()
        if (data.submissions) setSubmissions(data.submissions)
      } catch (err) {
        console.error('Failed to fetch submissions', err)
      }
    }
    fetchSubmissions()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveActivity(prev => (prev + 1) % activities.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    try {
      await fetch('https://formspree.io/f/mjgaonyz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, city, interest, neighborhood, phone, feedback }),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
    setSubmitting(false)
  }

  const filteredSquads = mockSquads.filter(s => {
    const cityMatch = s.city === city;
    const femaleMatch = !showFemaleOnly || s.femaleOnly;
    const verifiedMatch = !showVerifiedOnly || s.verifiedOnly;
    return cityMatch && femaleMatch && verifiedMatch;
  })

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <main style={{
      minHeight: '100vh',
      position: 'relative',
      overflowX: 'hidden',
      transition: 'background-color 0.5s ease, color 0.5s ease'
    }} className={theme}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@600;700;800&display=swap" rel="stylesheet" />

      <style>{`
        :root {
            --bg: #ffffff;
            --text: #0a0a0a;
            --glass-bg: rgba(0, 0, 0, 0.03);
            --glass-border: rgba(0, 0, 0, 0.08);
            --card-hover: rgba(0, 0, 0, 0.05);
            --accent: #ff4d00;
            --nav-bg: rgba(255, 255, 255, 0.8);
            --input-bg: rgba(0, 0, 0, 0.03);
            --badge-female: #f472b6;
            --badge-verified: #3b82f6;
            --badge-venue: #10b981;
        }

        .dark {
            --bg: #08080a;
            --text: #ffffff;
            --glass-bg: rgba(255, 255, 255, 0.02);
            --glass-border: rgba(255, 255, 255, 0.08);
            --card-hover: rgba(255, 255, 255, 0.04);
            --accent: #ff4d00;
            --nav-bg: rgba(3, 3, 3, 0.8);
            --input-bg: rgba(255, 255, 255, 0.03);
            --filter-active-text: #ffffff;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: var(--accent); color: #fff; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; border: 2px solid var(--bg); }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent); }

        html, body {
            background: var(--bg);
            color: var(--text);
            font-family: 'DM Sans', sans-serif;
            overflow-x: hidden;
            scroll-behavior: smooth;
            width: 100%;
            transition: background-color 0.4s ease, color 0.4s ease;
        }

        @keyframes slideUpFade {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
        @keyframes scaleIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
        }

        .animate-up {
            animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }

        .glass-nav {
            background: var(--nav-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--glass-border);
            transition: background-color 0.4s ease, border-color 0.4s ease;
        }

        .glass-card {
            background: var(--glass-bg);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid var(--glass-border);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-card:hover {
            background: var(--card-hover);
            border-color: rgba(255, 77, 0, 0.3);
            transform: translateY(-4px);
        }

        .btn-primary {
            background: linear-gradient(135deg, #ff5714 0%, #e03c00 100%);
            color: #fff;
            border: none;
            cursor: pointer;
            font-family: inherit;
            font-weight: 700;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 77, 0, 0.3);
        }
        .btn-primary:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 77, 0, 0.5);
        }

        .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(10px);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            animation: fadeIn 0.3s ease;
        }
        .modal-content {
            background: var(--bg);
            border: 1px solid var(--glass-border);
            border-radius: 28px;
            width: 100%;
            max-width: 440px;
            padding: 32px;
            position: relative;
            animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .theme-toggle {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            background: var(--glass-bg);
            color: var(--text);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: 0.3s;
        }
        .theme-toggle:hover { background: var(--card-hover); }

        .safety-badge {
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            padding: 4px 8px;
            border-radius: 6px;
            letter-spacing: 0.5px;
        }
        .female-only { background: var(--badge-female); color: #fff; }
        .verified-only { background: var(--badge-verified); color: #fff; }
        .verified-venue { background: var(--badge-venue); color: #fff; }

        .filter-chip {
            padding: 8px 16px;
            border-radius: 100px;
            border: 1px solid var(--glass-border);
            background: var(--glass-bg);
            color: var(--text);
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s;
        }
        .filter-chip.active {
            background: var(--accent);
            color: var(--filter-active-text);
            border-color: var(--accent);
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
        }

        .pulse-dot {
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            display: inline-block;
            margin-right: 8px;
            animation: pulse 2s infinite;
        }

        @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        .ticker-container {
            width: 100%;
            overflow: hidden;
            background: var(--glass-bg);
            border-top: 1px solid var(--glass-border);
            border-bottom: 1px solid var(--glass-border);
            padding: 12px 0;
            white-space: nowrap;
        }

        .ticker-content {
            display: inline-block;
            animation: ticker 30s linear infinite;
        }

        .ticker-item {
            display: inline-block;
            padding: 0 40px;
            color: var(--text);
            opacity: 0.7;
            font-size: 14px;
            font-weight: 500;
        }

        @media (max-width: 768px) {
            .h1-title { font-size: 38px !important; letter-spacing: -1.5px !important; }
            .h2-title { font-size: 32px !important; letter-spacing: -1px !important; }
            .grid-3 { display: flex !important; flex-direction: column !important; gap: 8px !important; width: 100% !important; }
            .grid-2 { display: flex !important; flex-direction: column !important; gap: 12px !important; width: 100% !important; }
            .hero-pad { padding-top: 100px !important; padding-bottom: 40px !important; }
            .compact-step-card { padding: 16px 20px !important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, transition: 'all 0.3s' }} className={scrollY > 20 ? 'glass-nav' : ''}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, background: 'var(--accent)', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="syne-font" style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>S</span>
            </div>
            <span className="syne-font" style={{ fontWeight: 800, fontSize: 20, letterSpacing: -0.5, color: 'var(--text)' }}>Squad</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <a href="#waitlist" className="btn-primary" style={{ padding: '7px 16px', borderRadius: 100, fontSize: 12, textDecoration: 'none' }}>Join Beta</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-pad" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 40px', textAlign: 'center' }}>
        <h1 className="animate-up delay-1 h1-title syne-font" style={{ fontWeight: 800, fontSize: 80, lineHeight: 1.05, letterSpacing: -2.5, marginBottom: 20, maxWidth: 900, color: 'var(--text)' }}>
          Stop texting dead<br />WhatsApp groups.<br />
          <span style={{ color: 'var(--accent)' }}>Find your squad.</span>
        </h1>
        <p className="animate-up delay-2" style={{ fontSize: 18, color: 'var(--text)', opacity: 0.6, maxWidth: 600, lineHeight: 1.6, marginBottom: 32 }}>
          New to a city or just want people to do things with? Squad connects you with real people around you instantly. No awkward DMs, just show up.
        </p>
        <div className="animate-up delay-3">
          <a href="#waitlist" className="btn-primary" style={{ padding: '14px 32px', borderRadius: 100, fontSize: 16, textDecoration: 'none' }}>Get early access →</a>
        </div>

        {/* Positioning Line */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          <div style={{
            padding: '8px 24px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 100,
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: 14,
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 500,
            textAlign: 'center'
          }}>
            Not a dating app. Not a networking app. Just real people doing real things together.
          </div>
        </div>
      </section>

      {/* Live Momentum Bar */}
      <section style={{ maxWidth: 800, margin: '0 auto 40px', padding: '0 20px' }}>
        <div className="glass-card" style={{ padding: '24px', borderRadius: 24, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <span className="pulse-dot"></span>
            <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>
              🔥 847 people have already joined the waitlist
            </span>
          </div>
          <div style={{ background: 'var(--glass-bg)', height: 8, borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ width: '84.7%', height: '100%', background: 'linear-gradient(90deg, #ff4d00, #ff8c00)', borderRadius: 10 }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: 'var(--text)', opacity: 0.5 }}>
            <span>847 / 1000 to launch in Mumbai</span>
            <span>Almost there!</span>
          </div>
        </div>
      </section>

      {/* Recent Joiners Ticker */}
      <div className="ticker-container">
        <div className="ticker-content">
          {[1, 2].map((loop) => (
            <div key={loop} style={{ display: 'inline-block' }}>
              {submissions.length > 0 ? (
                submissions.map((sub, idx) => {
                  const firstName = sub.name.split(' ')[0]
                  const emoji = activities.find(a => a.name.toLowerCase() === sub.interest.toLowerCase())?.emoji || '⚽'

                  return (
                    <span key={`${loop}-${sub.id || idx}`} className="ticker-item">
                      {firstName} from {sub.neighborhood} joined {emoji}
                    </span>
                  )
                })
              ) : (
                <>
                  <span className="ticker-item">Arjun from Andheri joined ⚽</span>
                  <span className="ticker-item">Priya from Bandra joined 🧘</span>
                  <span className="ticker-item">Dev from Powai joined 🏋️</span>
                  <span className="ticker-item">Zara from Alabama joined 🥾</span>
                  <span className="ticker-item">Karan from Juhu joined 🏏</span>
                  <span className="ticker-item">Rohan from Colaba joined ☕</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <section style={{ maxWidth: 1100, margin: '40px auto 60px', padding: '0 20px' }}>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { stat: '4 in 5', label: 'people feel lonely when they move to a new city' },
            { stat: '3 weeks', label: 'Average WhatsApp group dies in 3 weeks' },
            { stat: '< 10 mins', label: 'Squad users find their first squad in under 10 minutes' },
          ].map((item, i) => (
            <div key={i} className="glass-card" style={{ padding: '24px', borderRadius: 20, textAlign: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#ff4d00', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>{item.stat}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', opacity: 0.6, lineHeight: 1.4 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety First Pillar */}
      <section style={{ padding: '60px 20px', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#10b981', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Safety First</div>
          <h2 className="syne-font h2-title" style={{ fontWeight: 800, fontSize: 44, letterSpacing: -1.5, marginBottom: 12, color: 'var(--text)' }}>
            We verify the humans,<br />so you can focus on the hobby.
          </h2>
          <p style={{ color: 'var(--text)', opacity: 0.5, fontSize: 18, marginBottom: 48 }}>Trust is the foundation of every great squad.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '🆔', title: 'ID Verified Hosts', desc: 'Every host undergoes a strict identity check before creating their first squad.' },
              { icon: '👩‍🦰', title: 'Female-Only Spaces', desc: 'Secure, verified spaces for women to connect and play without hesitation.' },
              { icon: '🛡️', title: 'Zero-Tolerance', desc: 'Strict guidelines and instant moderation for flaking, creeping, or bad vibes.' },
            ].map((item, i) => (
              <div key={i} className="glass-card" style={{
                padding: '24px 32px',
                borderRadius: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                textAlign: 'left'
              }}>
                <div style={{ fontSize: 40, width: 80, height: 80, background: 'rgba(255,255,255,0.03)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="syne-font" style={{ fontSize: 20, fontWeight: 800, marginBottom: 6, color: 'var(--text)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text)', opacity: 0.5, fontSize: 15, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three taps section */}
      <section id="how" style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Three taps to your squad</div>
          <h2 className="syne-font h2-title" style={{ fontWeight: 800, fontSize: 40, letterSpacing: -1.2, marginBottom: 16, color: 'var(--text)' }}>No scrolling needed</h2>
        </div>

        <div className="grid-3">
          {[
            { step: '01', emoji: '🎯', title: 'Pick your vibe', desc: 'Football, coffee, or hiking.' },
            { step: '02', emoji: '📍', title: 'See who\'s near', desc: 'Real people, real places.' },
            { step: '03', emoji: '🤝', title: 'Just show up', desc: 'Join and show up. No friction.' },
          ].map((item) => (
            <div key={item.step} className="glass-card compact-step-card" style={{ borderRadius: 20, padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ fontSize: 32 }}>{item.emoji}</div>
                <div style={{ textAlign: 'left' }}>
                  <h3 className="syne-font" style={{ fontWeight: 700, fontSize: 19, marginBottom: 2, color: 'var(--text)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text)', opacity: 0.5, fontSize: 14, lineHeight: 1.3 }}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Anti-Ghosting Section */}
      <section style={{ maxWidth: 1000, margin: '40px auto 100px', padding: '0 20px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 77, 0, 0.05) 0%, rgba(255, 77, 0, 0.02) 100%)',
          border: '1px solid rgba(255, 77, 0, 0.2)',
          borderRadius: 32,
          padding: '60px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Accent Background */}
          <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '140%', height: '200%', background: 'radial-gradient(circle, rgba(255,77,0,0.05) 0%, transparent 60%)', zIndex: 0 }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>The Anti-Ghosting Feature</div>
            <h2 className="syne-font" style={{ fontWeight: 800, fontSize: 44, letterSpacing: -1.5, marginBottom: 24, color: 'var(--text)' }}>No more "Maybe".</h2>
            <p style={{ color: 'var(--text)', opacity: 0.7, fontSize: 19, maxWidth: 650, margin: '0 auto 40px', lineHeight: 1.7 }}>
              The biggest problem with WhatsApp groups is that people flake. When you join a Squad, you're in. We handle the reminders and the roster so you just show up.
            </p>

            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { label: 'Verified Rosters', icon: '📝' },
                { label: 'Auto-Reminders', icon: '🔔' },
                { label: 'Flake Protection', icon: '🚫' },
              ].map((pill, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg)', border: '1px solid var(--glass-border)', padding: '12px 20px', borderRadius: 100, fontSize: 15, fontWeight: 600 }}>
                  <span>{pill.icon}</span>
                  <span>{pill.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live squads section with filters */}
      <section style={{
        background: theme === 'dark' ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
        borderTop: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border)',
        padding: '60px 20px'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, marginBottom: 32 }}>
            <h2 className="syne-font h2-title text-center" style={{ fontWeight: 800, fontSize: 36, letterSpacing: -1, color: 'var(--text)' }}>Happening near you</h2>

            <div style={{ display: 'flex', gap: 6, background: 'var(--glass-bg)', padding: 5, borderRadius: 100, flexWrap: 'wrap', justifyContent: 'center' }}>
              {cities.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCity(c.id as City)}
                  style={{
                    padding: '8px 16px', borderRadius: 100, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    background: city === c.id ? 'var(--accent)' : 'transparent',
                    color: city === c.id ? '#fff' : 'var(--text)', opacity: city === c.id ? 1 : 0.5, transition: '0.2s'
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button className={`filter-chip ${showFemaleOnly ? 'active' : ''}`} onClick={() => setShowFemaleOnly(!showFemaleOnly)}>
                  👩‍🦰 Female Only
                </button>
                <div style={{ fontSize: 10, color: 'var(--text)', opacity: 0.4, marginTop: 4 }}>Spaces for women</div>
              </div>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button className={`filter-chip ${showVerifiedOnly ? 'active' : ''}`} onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}>
                  ✅ Verified Only
                </button>
                <div style={{ fontSize: 10, color: 'var(--text)', opacity: 0.4, marginTop: 4 }}>ID verified hosts only</div>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
              style={{ padding: '12px 28px', borderRadius: 100, fontSize: 14 }}
            >
              + Create a Squad
            </button>
          </div>

          <div className="grid-2">
            {filteredSquads.map((squad) => (
              <div key={squad.id} className="glass-card" style={{ borderRadius: 18, padding: 16, display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
                <div style={{ fontSize: 24, width: 48, height: 48, background: 'var(--glass-bg)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {squad.activity}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{squad.name}</div>
                  </div>
                  <div style={{ color: 'var(--text)', opacity: 0.5, fontSize: 12 }}>{squad.time} · {squad.location}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                    {squad.femaleOnly && <span className="safety-badge female-only">Female Only</span>}
                    {squad.verifiedOnly && <span className="safety-badge verified-only">Verified</span>}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSquad(squad)}
                  style={{ background: 'var(--accent)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                >
                  Join
                </button>
              </div>
            ))}
            {filteredSquads.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text)', opacity: 0.5 }}>
                No squads match these filters in {city}. Try hosting one!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal - Join Squad */}
      {selectedSquad && (
        <div className="modal-overlay" onClick={() => setSelectedSquad(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>{selectedSquad.activity}</div>
              <h2 className="syne-font" style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, color: 'var(--text)' }}>{selectedSquad.name}</h2>
              <p style={{ color: 'var(--text)', opacity: 0.5, fontSize: 14, marginBottom: 24 }}>{selectedSquad.location}</p>

              <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
                {selectedSquad.femaleOnly && <div style={{ background: '#fdf2f8', color: '#be185d', padding: '10px', borderRadius: 12, fontSize: 13, fontWeight: 600 }}>This is a Female-Only squad 👩‍🦰</div>}
                {selectedSquad.verifiedOnly && <div style={{ background: '#eff6ff', color: '#1d4ed8', padding: '10px', borderRadius: 12, fontSize: 13, fontWeight: 600 }}>Verified Profiles Only ✅</div>}
              </div>

              <div style={{ display: 'grid', gap: 12, width: '100%' }}>
                <a href="#waitlist" onClick={() => setSelectedSquad(null)} className="btn-primary" style={{ display: 'block', padding: '16px', borderRadius: 14, textDecoration: 'none', fontSize: 15 }}>
                  Apply to join waitlist
                </a>
                <button
                  onClick={() => setSelectedSquad(null)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text)', opacity: 0.5, marginTop: 8, cursor: 'pointer', fontSize: 13 }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Host a Squad */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✨</div>
              <h2 className="syne-font" style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, color: 'var(--text)' }}>Host a Squad</h2>
              <p style={{ color: 'var(--text)', opacity: 0.5, fontSize: 14, marginBottom: 24 }}>Set your preferences for the squad.</p>

              <div style={{ display: 'grid', gap: 12, marginBottom: 24, textAlign: 'left' }}>
                <input placeholder="Activity (e.g. Hiking)" style={{ padding: '14px', borderRadius: 12, background: 'var(--input-bg)', border: '1px solid var(--glass-border)', color: 'var(--text)', width: '100%' }} />

                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text)', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ width: 18, height: 18, accentColor: 'var(--badge-female)' }} /> Female Only
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text)', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ width: 18, height: 18, accentColor: 'var(--badge-verified)' }} /> Verified Only
                  </label>
                </div>
              </div>

              <a href="#waitlist" onClick={() => setShowAddModal(false)} className="btn-primary" style={{ display: 'block', padding: '16px', borderRadius: 14, textDecoration: 'none', fontSize: 15 }}>
                Reserve your spot to host
              </a>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text)', opacity: 0.5, marginTop: 12, cursor: 'pointer', fontSize: 13 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Made for venues too */}
      <section style={{ padding: '100px 20px', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center' }} className="grid-2">
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Partner with Squad</div>
            <h2 className="syne-font h2-title" style={{ fontWeight: 800, fontSize: 44, letterSpacing: -1.5, marginBottom: 20, color: 'var(--text)' }}>Own a venue?<br />Run your own squad.</h2>
            <p style={{ color: 'var(--text)', opacity: 0.6, fontSize: 18, lineHeight: 1.6, marginBottom: 32 }}>
              Create recurring squads, fill your slots every week, build a loyal community, all from your Squad venue profile.
            </p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
              {["Fill empty slots", "Build regulars", "No per-booking fees"].map(pill => (
                <div key={pill} style={{ padding: '8px 16px', borderRadius: 100, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
                  {pill}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="#waitlist" className="btn-primary" style={{ padding: '16px 36px', borderRadius: 100, fontSize: 16, textDecoration: 'none', display: 'inline-block', width: 'fit-content' }}>
                List your venue free →
              </a>
              <p style={{ fontSize: 13, color: 'var(--text)', opacity: 0.4 }}>Free to list. Promoted spots from ₹3,000/month</p>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Mock Venue Card */}
            <div className="glass-card" style={{ borderRadius: 32, padding: '32px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#fff', fontWeight: 800 }}>
                  K
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <h3 className="syne-font" style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>Koramangala FC</h3>
                    <span className="safety-badge verified-venue">Verified Venue</span>
                  </div>
                  <div style={{ color: 'var(--text)', opacity: 0.5, fontSize: 14 }}>Bengaluru, India</div>
                </div>
              </div>

              <div style={{ background: 'var(--glass-bg)', borderRadius: 24, padding: '24px', marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--text)', marginBottom: 4 }}>Sunday 5-a-side ⚽</div>
                    <div style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 700 }}>RECURRING EVERY WEEK</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>8/10</div>
                    <div style={{ fontSize: 12, color: 'var(--text)', opacity: 0.5 }}>slots filled</div>
                  </div>
                </div>
                <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ width: '80%', height: '100%', background: 'var(--accent)' }}></div>
                </div>
              </div>

              <button disabled style={{ width: '100%', padding: '14px', borderRadius: 16, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text)', fontWeight: 700, opacity: 0.6, cursor: 'not-allowed' }}>
                Join Sunday Squad
              </button>
            </div>

            {/* Background Accent */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120%', height: '120%', background: 'radial-gradient(circle, rgba(255,77,0,0.1) 0%, transparent 70%)', zIndex: 0 }}></div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 20px', background: theme === 'dark' ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Early Adopters</div>
            <h2 className="syne-font h2-title" style={{ fontWeight: 800, fontSize: 36, letterSpacing: -1, color: 'var(--text)' }}>What our beta testers say</h2>
          </div>

          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { text: "Finally found people to play Sunday football with. No more texting 6 groups.", user: "Arjun M., Mumbai ⚽" },
              { text: "Moved to Alabama 3 months ago and knew nobody. Squad changed that in a week.", user: "Priya S., Alabama 🥾" },
              { text: "Created a board game night squad and now we meet every Friday. It just works.", user: "Dev K., Bangalore 🎲" }
            ].map((t, i) => (
              <div key={i} className="glass-card" style={{ padding: '32px', borderRadius: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text)', marginBottom: 24, fontWeight: 500, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--accent)' }}>{t.user}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Note */}
      {/* <section style={{ maxWidth: 740, margin: '80px auto 40px', padding: '0 20px' }}>
        <div className="glass-card" style={{
          padding: '40px',
          borderRadius: 24,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderLeft: '4px solid #ff4d00',
          textAlign: 'left'
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#ff4d00', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>A note from the founder</div>
          <p style={{ fontSize: 18, color: 'var(--text)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 24, opacity: 0.9 }}>
            "I moved cities and spent months not knowing anyone. I'd text groups, nobody would reply. I'd show up to places alone hoping to meet people. It never worked.<br /><br />
            Squad is what I wished existed. I'm building it for everyone who's ever felt that way."
          </p>
          <div style={{ fontWeight: 700, color: '#ff4d00', fontSize: 16 }}>— Rahil, Mumbai 🇮🇳</div>
        </div>
      </section> */}

      {/* Waitlist Section */}
      <section id="waitlist" style={{ padding: '80px 20px', position: 'relative' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🚀</div>
          <h2 className="syne-font h2-title" style={{ fontWeight: 800, fontSize: 48, letterSpacing: -1.5, marginBottom: 16, color: 'var(--text)' }}>The Waitlist</h2>
          <p style={{ color: 'var(--text)', opacity: 0.5, fontSize: 18, marginBottom: 40, lineHeight: 1.6 }}>
            Step 1 is simple: we're collecting emails. We launch officially when we hit 1,000 members in your city.<br />
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Tell us what gaps in your social life you want Squad to fill below.</span>
          </p>

          {submitted ? (
            <div className="glass-card" style={{ padding: '40px', borderRadius: 32 }}>
              <h3 className="syne-font" style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: 'var(--text)' }}>You're on the list!</h3>
              <p style={{ color: 'var(--text)', opacity: 0.5 }}>We'll notify you as soon as squads are ready in {city}.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16, textAlign: 'left' }}>
              <div style={{ display: 'grid', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 1 }}>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Arjun Sharma"
                  required
                  style={{ padding: '16px 20px', borderRadius: 16, background: 'var(--input-bg)', border: '1px solid var(--glass-border)', color: 'var(--text)', fontSize: 16 }}
                />
              </div>

              <div style={{ display: 'grid', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 1 }}>Your Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  required
                  style={{ padding: '16px 20px', borderRadius: 16, background: 'var(--input-bg)', border: '1px solid var(--glass-border)', color: 'var(--text)', fontSize: 16 }}
                />
              </div>

              <div style={{ display: 'grid', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 1 }}>Primary Interest</label>
                <select
                  value={interest}
                  onChange={e => setInterest(e.target.value)}
                  style={{ padding: '16px 20px', borderRadius: 16, background: 'var(--input-bg)', border: '1px solid var(--glass-border)', color: 'var(--text)', fontSize: 16, appearance: 'none' }}
                >
                  <option value="" disabled style={{ background: theme === 'dark' ? '#000' : '#fff' }}>Pick an activity</option>
                  {activities.map(a => <option key={a.name} value={a.name} style={{ background: theme === 'dark' ? '#000' : '#fff' }}>{a.emoji} {a.name}</option>)}
                  <option value="Other" style={{ background: theme === 'dark' ? '#000' : '#fff' }}>Other...</option>
                </select>
              </div>

              <div style={{ display: 'grid', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 1 }}>Which area do you live in?</label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={e => setNeighborhood(e.target.value)}
                  placeholder="e.g. Bandra, South Perth"
                  style={{ padding: '16px 20px', borderRadius: 16, background: 'var(--input-bg)', border: '1px solid var(--glass-border)', color: 'var(--text)', fontSize: 16 }}
                />
              </div>

              <div style={{ display: 'grid', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 1 }}>Phone Number</label>
                  <span style={{ fontSize: 10, opacity: 0.5, fontWeight: 700, color: 'var(--text)' }}>OPTIONAL</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  style={{ padding: '16px 20px', borderRadius: 16, background: 'var(--input-bg)', border: '1px solid var(--glass-border)', color: 'var(--text)', fontSize: 16 }}
                />
              </div>

              <div style={{ display: 'grid', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 1 }}>Your input: What's missing in your social life? (or add-ons you'd love)</label>
                <textarea
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  placeholder="e.g. Too many dead groups, need a way to filter by skill level..."
                  rows={3}
                  style={{ padding: '16px 20px', borderRadius: 16, background: 'var(--input-bg)', border: '1px solid var(--glass-border)', color: 'var(--text)', fontSize: 16, resize: 'none', fontFamily: 'inherit', lineHeight: 1.5 }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '20px', borderRadius: 18, fontSize: 16, marginTop: 8 }}>
                {submitting ? 'Registering...' : 'Join Waitlist'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
        <p style={{ color: 'var(--text)', opacity: 0.3, fontSize: 14 }}>© 2026 Squad · Reconnecting the real world.</p>
      </footer>
    </main>
  )
}