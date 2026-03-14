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
  { activity: '⚽', name: 'Sunday Morning Football', location: 'Versova Beach, Mumbai', time: 'Sun 7:00 AM', members: 6, max: 10, city: 'mumbai' },
  { activity: '🏋️', name: 'Morning Gym Crew', location: 'Andheri West, Mumbai', time: 'Daily 6:30 AM', members: 3, max: 5, city: 'mumbai' },
  { activity: '🏏', name: 'Cricket on Weekends', location: 'Juhu, Mumbai', time: 'Sat 6:00 AM', members: 8, max: 11, city: 'mumbai' },
  { activity: '☕', name: 'Tech Bro Meetup', location: 'Banjara Hills, Hyderabad', time: 'Sat 5:00 PM', members: 4, max: 8, city: 'hyderabad' },
  { activity: '🏸', name: 'Badminton Doubles', location: 'Jubilee Hills, Hyderabad', time: 'Sun 6:00 AM', members: 2, max: 4, city: 'hyderabad' },
  { activity: '🥾', name: 'Oak Mountain Hike', location: 'Birmingham, Alabama', time: 'Sat 8:00 AM', members: 4, max: 8, city: 'alabama' },
  { activity: '🏈', name: 'Flag Football', location: 'Tuscaloosa, Alabama', time: 'Sun 4:00 PM', members: 10, max: 14, city: 'alabama' },
  { activity: '🏄', name: 'Morning Surf', location: 'Folly Beach, South Carolina', time: 'Sat 6:30 AM', members: 3, max: 6, city: 'south_carolina' },
  { activity: '🎲', name: 'Board Game Night', location: 'Charleston, South Carolina', time: 'Fri 7:00 PM', members: 5, max: 6, city: 'south_carolina' },
]

const whatsappProblems = [
  { problem: 'Post in 5 different groups hoping someone replies', squad: 'One tap — see who\'s available right now' },
  { problem: 'Group goes dead after 2 weeks', squad: 'Activity-based — new people every time' },
  { problem: 'Don\'t know anyone when new to a city', squad: 'Find your people on day one' },
  { problem: 'Hard to coordinate time & location', squad: 'Built-in scheduling & maps' },
]

export default function Home() {
  const [city, setCity] = useState<City>('mumbai')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [activeActivity, setActiveActivity] = useState(0)
  const [scrollY, setScrollY] = useState(0)

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    try {
      await fetch('https://formspree.io/f/mjgaonyz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, city }),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
    setSubmitting(false)
  }

  const filteredSquads = mockSquads.filter(s => s.city === city)

  return (
    <main style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@600;700;800&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #ff4d00; color: #fff; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; border: 2px solid #050505; }
        ::-webkit-scrollbar-thumb:hover { background: #ff4d00; }

        html, body {
            background: #030303;
            color: #ffffff;
            font-family: 'DM Sans', sans-serif;
            overflow-x: hidden;
            scroll-behavior: smooth;
        }

        @keyframes slideUpFade {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientPulse {
            0%, 100% { opacity: 0.5; transform: scale(1) translate(0, 0); }
            50% { opacity: 0.8; transform: scale(1.1) translate(2%, 2%); }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-up {
            animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }

        .glass-nav {
            background: rgba(3, 3, 3, 0.7);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.06);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-card:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 77, 0, 0.3);
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 77, 0, 0.1);
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
            background: linear-gradient(135deg, #ff6b33 0%, #f04600 100%);
        }
        .btn-primary:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #fff;
            cursor: pointer;
            font-family: inherit;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
        }

        .gradient-text {
            background: linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .gradient-orange {
            background: linear-gradient(135deg, #ff6b00 0%, #ff3b00 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .noise {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            opacity: 0.035;
            pointer-events: none;
            z-index: 50;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .ambient-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(120px);
            pointer-events: none;
            z-index: -1;
            animation: gradientPulse 8s infinite alternate ease-in-out;
        }

        .marquee-container {
            overflow: hidden;
            display: flex;
            background: linear-gradient(90deg, transparent, rgba(255,77,0,0.05), transparent);
            border-top: 1px solid rgba(255,255,255,0.03);
            border-bottom: 1px solid rgba(255,255,255,0.03);
            white-space: nowrap;
            padding: 24px 0;
        }
        .marquee-track {
            display: flex;
            animation: marquee 25s linear infinite;
            gap: 32px;
            padding-right: 32px;
        }

        .syne-font { font-family: 'Syne', sans-serif; }

        @media (max-width: 768px) {
            .h1-title { font-size: 42px !important; letter-spacing: -1.5px !important; }
            .h2-title { font-size: 36px !important; letter-spacing: -1px !important; }
            .grid-3 { grid-template-columns: 1fr !important; }
            .grid-2 { grid-template-columns: 1fr !important; }
            .hide-mobile { display: none !important; }
            .hero-pad { padding-top: 120px !important; padding-bottom: 60px !important; }
            .stat-box { width: 100% !important; }
            .city-btn-group { flex-direction: column !important; }
        }
      `}</style>

      <div className="noise" />

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, transition: 'all 0.3s' }} className={scrollY > 20 ? 'glass-nav' : ''}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, background: 'linear-gradient(135deg, #ff4d00, #e63900)',
              borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255,77,0,0.3)',
            }}>
              <span className="syne-font" style={{ fontWeight: 800, fontSize: 20, color: '#fff' }}>S</span>
            </div>
            <span className="syne-font" style={{ fontWeight: 800, fontSize: 24, letterSpacing: -0.5 }}>Squad</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span className="hide-mobile" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
              Mumbai · Hyderabad · USA
            </span>
            <a href="#waitlist" className="btn-primary" style={{
              padding: '10px 24px', borderRadius: 100, fontSize: 14, textDecoration: 'none',
            }}>
              Get early access
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-pad" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '160px 24px 100px', position: 'relative', textAlign: 'center' }}>
        
        {/* Background Ambience */}
        <div className="ambient-orb" style={{ width: 600, height: 600, background: 'rgba(255,77,0,0.12)', top: '10%', left: '40%', transform: 'translateX(-50%)' }} />
        <div className="ambient-orb" style={{ width: 500, height: 500, background: 'rgba(139,92,246,0.08)', bottom: '10%', right: '10%' }} />

        <div className="animate-up delay-1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '8px 20px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.8)', marginBottom: 40, backdropFilter: 'blur(10px)' }}>
          <span style={{ position: 'relative', display: 'flex', height: 8, width: 8 }}>
            <span style={{ animation: 'gradientPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', background: '#22c55e', opacity: 0.75 }}></span>
            <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: 8, width: 8, background: '#22c55e' }}></span>
          </span>
          Launching in India & USA — Beta list open
        </div>

        <h1 className="animate-up delay-2 h1-title syne-font gradient-text" style={{ fontWeight: 800, fontSize: 84, lineHeight: 1.05, letterSpacing: -2.5, marginBottom: 24, maxWidth: 900 }}>
          Stop texting dead<br />
          WhatsApp groups.<br />
          <span className="gradient-orange">Find your squad.</span>
        </h1>

        <p className="animate-up delay-3" style={{ fontSize: 20, color: 'rgba(255,255,255,0.5)', maxWidth: 640, lineHeight: 1.6, marginBottom: 48, fontWeight: 400 }}>
          New to a city or just want people to do things with? Squad connects you with real people around you instantly. No awkward DMs, just show up.
        </p>

        {/* Dynamic Activity Pill */}
        <div className="animate-up delay-3" style={{ marginBottom: 56, position: 'relative' }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 100, padding: '12px 28px', fontSize: 16, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 12, minWidth: 260, justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)'
          }}>
            <span style={{ fontSize: 24, transition: 'all 0.3s', transform: 'scale(1.1)' }}>
              {activities[activeActivity].emoji}
            </span>
            <span style={{ color: '#fff', transition: 'all 0.3s' }}>
              Find <span style={{ fontWeight: 700, color: '#ff4d00' }}>{activities[activeActivity].name}</span> partners
            </span>
          </div>
        </div>

        <div className="animate-up delay-4 stat-box" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#waitlist" className="btn-primary" style={{ padding: '18px 36px', borderRadius: 100, fontSize: 16, textDecoration: 'none' }}>
            Join the waitlist →
          </a>
          <a href="#how" className="btn-secondary" style={{
            padding: '18px 36px', borderRadius: 100, fontSize: 16, textDecoration: 'none',
          }}>
            See how it works
          </a>
        </div>

        {/* Floating elements for visual flair */}
        <div className="hide-mobile" style={{ position: 'absolute', left: '8%', top: '35%', animation: 'float 5s ease-in-out infinite' }}>
          <div className="glass-card" style={{ borderRadius: 20, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 12 }}>⚽</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>Sunday Football</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 4 }}>4/10 joined · Versova</div>
            </div>
          </div>
        </div>

        <div className="hide-mobile" style={{ position: 'absolute', right: '8%', top: '45%', animation: 'float 6s ease-in-out infinite 1s' }}>
          <div className="glass-card" style={{ borderRadius: 20, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 12 }}>☕</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>Tech Bro Meetup</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 4 }}>6/8 joined · Jubilee Hills</div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-container">
        <div className="marquee-track">
          {[...activities, ...activities, ...activities].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.6)', fontSize: 16, fontWeight: 500, letterSpacing: 0.5 }}>
              <span style={{ fontSize: 22 }}>{a.emoji}</span> {a.name}
              <span style={{ color: 'rgba(255,77,0,0.3)', marginLeft: 12, fontSize: 20 }}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section id="how" style={{ maxWidth: 1200, margin: '0 auto', padding: '140px 24px', position: 'relative' }}>
        <div className="ambient-orb" style={{ width: 400, height: 400, background: 'rgba(139,92,246,0.06)', top: '20%', left: '0' }} />
        
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ display: 'inline-block', fontSize: 13, fontWeight: 700, color: '#ff4d00', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, background: 'rgba(255,77,0,0.1)', padding: '6px 16px', borderRadius: 100 }}>How it works</div>
          <h2 className="syne-font h2-title" style={{ fontWeight: 800, fontSize: 52, letterSpacing: -1.5, marginBottom: 20, color: '#fff' }}>Three taps to your squad</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18, maxWidth: 500, margin: '0 auto' }}>No awkward introductions. Just find what you love and show up.</p>
        </div>

        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { step: '01', emoji: '🎯', title: 'Pick your vibe', desc: 'Choose what you want to do — football, gym, hiking, board games, coffee. Anything you can think of.' },
            { step: '02', emoji: '📍', title: 'See who\'s nearby', desc: 'Find real people in your area looking for the exact same activity at the same time. Filter by distance and group size.' },
            { step: '03', emoji: '🤝', title: 'Show up & play', desc: 'Join a squad instantly. Get built-in maps, minimal group chat, and automated reminders. That\'s it.' },
          ].map((item) => (
            <div key={item.step} className="glass-card" style={{ borderRadius: 24, padding: 40, position: 'relative', zIndex: 1 }}>
              <div className="syne-font" style={{ position: 'absolute', top: 32, right: 32, fontSize: 16, fontWeight: 800, color: 'rgba(255,255,255,0.1)' }}>{item.step}</div>
              <div style={{ fontSize: 48, marginBottom: 24, background: 'rgba(255,255,255,0.03)', display: 'inline-flex', padding: 16, borderRadius: 20 }}>{item.emoji}</div>
              <h3 className="syne-font" style={{ fontWeight: 700, fontSize: 24, marginBottom: 16, color: '#fff' }}>{item.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Squads UI */}
      <section style={{ padding: '120px 24px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(3,3,3,0) 0%, rgba(20,20,22,0.4) 50%, rgba(3,3,3,0) 100%)', zIndex: -1 }} />
        
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 className="syne-font h2-title" style={{ fontWeight: 800, fontSize: 48, letterSpacing: -1.5, marginBottom: 32 }}>What's happening near you</h2>
            
            <div className="city-btn-group" style={{ display: 'inline-flex', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: 6, gap: 4, backdropFilter: 'blur(10px)' }}>
              {cities.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCity(c.id as City)}
                  style={{
                    padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600,
                    background: city === c.id ? 'linear-gradient(135deg, #ff4d00, #e63900)' : 'transparent',
                    color: city === c.id ? '#fff' : 'rgba(255,255,255,0.6)',
                    border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                    boxShadow: city === c.id ? '0 4px 15px rgba(255,77,0,0.3)' : 'none'
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {filteredSquads.map((squad, i) => (
              <div key={i} className="glass-card" style={{ borderRadius: 24, padding: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ fontSize: 36, width: 72, height: 72, background: 'rgba(255,255,255,0.04)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(255,255,255,0.05)' }}>
                  {squad.activity}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{squad.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 16 }}>{squad.time} · {squad.location}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${(squad.members / squad.max) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #ff4d00, #ff8c00)', borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>{squad.members}/{squad.max} joined</span>
                  </div>
                </div>
                <button className="btn-secondary" style={{ padding: '10px 20px', borderRadius: 12, fontSize: 14, background: 'rgba(255,77,0,0.1)', color: '#ff4d00', border: '1px solid rgba(255,77,0,0.2)' }}>
                  Join
                </button>
              </div>
            ))}
            {filteredSquads.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>
                No active squads here right now. Be the first to start one!
              </div>
            )}
          </div>

          <p style={{ textAlign: 'center', marginTop: 40, color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
            * Preview data. Join the waitlist to access live squads when we launch.
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '120px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <h2 className="syne-font h2-title" style={{ fontWeight: 800, fontSize: 48, letterSpacing: -1.5 }}>Why Squad is different</h2>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {whatsappProblems.map((item, i) => (
            <div key={i} className="grid-2 glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderRadius: 24, padding: 0, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ background: 'rgba(239,68,68,0.03)', padding: '32px', display: 'flex', alignItems: 'center', gap: 20, borderRight: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: 24, flexShrink: 0, opacity: 0.8 }}>👎</span>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.6 }}>{item.problem}</span>
              </div>
              <div style={{ background: 'rgba(34,197,94,0.06)', padding: '32px', display: 'flex', alignItems: 'center', gap: 20 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>🔥</span>
                <span style={{ color: '#fff', fontSize: 16, lineHeight: 1.6, fontWeight: 600 }}>{item.squad}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" style={{ padding: '140px 24px', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="ambient-orb" style={{ width: 800, height: 800, background: 'radial-gradient(circle, rgba(255,77,0,0.15) 0%, transparent 60%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'spinSlow 20s linear infinite' }} />

        <div className="glass-card" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, padding: '64px 40px', borderRadius: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 56, marginBottom: 24 }}>🚀</div>
          <h2 className="syne-font h2-title" style={{ fontWeight: 800, fontSize: 48, letterSpacing: -1.5, marginBottom: 20, color: '#fff' }}>
            Be first in<br />your city
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, marginBottom: 48, lineHeight: 1.6, maxWidth: 460, margin: '0 auto 48px' }}>
            Join the waitlist. Free during beta. We'll let you know the exact moment Squad goes live near you.
          </p>

          {submitted ? (
            <div className="animate-up" style={{ borderRadius: 24, padding: '32px 24px', background: 'rgba(255,77,0,0.08)', border: '1px solid rgba(255,77,0,0.3)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <div className="syne-font" style={{ fontWeight: 800, fontSize: 28, marginBottom: 12, color: '#fff' }}>You're on the list!</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 32 }}>We'll hit you up the moment Squad launches.</div>
              <a href="https://wa.me/?text=Bro%20check%20this%20out%20%E2%80%94%20find%20people%20for%20football%2C%20gym%2C%20anything%20in%20your%20city.%20Joining%20early%3A%20squads.app"
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25d366', color: '#fff', padding: '16px 32px', borderRadius: 100, fontSize: 16, fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(37,211,102,0.3)' }}>
                Share with a friend
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>Select your city</label>
                <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {cities.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCity(c.id as City)}
                      style={{
                        padding: '14px', borderRadius: 16, fontSize: 14, fontWeight: 600,
                        background: city === c.id ? 'rgba(255,77,0,0.1)' : 'rgba(255,255,255,0.03)',
                        border: city === c.id ? '1px solid #ff4d00' : '1px solid rgba(255,255,255,0.1)',
                        color: city === c.id ? '#ff4d00' : 'rgba(255,255,255,0.6)',
                        cursor: 'pointer', transition: 'all 0.2s',
                        textAlign: 'center'
                      }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 32 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>Your email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  style={{
                    background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 16, padding: '18px 24px', color: '#fff', fontSize: 16,
                    fontFamily: 'DM Sans, sans-serif', outline: 'none', width: '100%',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff4d00'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
              </div>
              <button
                type="submit"
                className="btn-primary"
                disabled={submitting}
                style={{ padding: '20px', borderRadius: 16, fontSize: 18, width: '100%' }}
              >
                {submitting ? 'Locking it in...' : 'Join the waitlist →'}
              </button>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, textAlign: 'center', marginTop: 20 }}>
                No spam. No credit card. Just early access.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '40px 24px', textAlign: 'center', background: '#020202' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #ff4d00, #e63900)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(255,77,0,0.2)' }}>
            <span className="syne-font" style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>S</span>
          </div>
          <span className="syne-font" style={{ fontWeight: 800, fontSize: 20 }}>Squad</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>© 2026 Squad. Find your people.</p>
      </footer>
    </main>
  )
}