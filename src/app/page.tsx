'use client'

import { useState, useEffect, useRef } from 'react'

const activities = [
  { emoji: '⚽', name: 'Football', color: '#22c55e' },
  { emoji: '🏏', name: 'Cricket', color: '#f59e0b' },
  { emoji: '🏋️', name: 'Gym', color: '#ef4444' },
  { emoji: '🥾', name: 'Hiking', color: '#84cc16' },
  { emoji: '🎲', name: 'Board games', color: '#8b5cf6' },
  { emoji: '☕', name: 'Coffee', color: '#a16207' },
  { emoji: '🏊', name: 'Swimming', color: '#06b6d4' },
  { emoji: '🎾', name: 'Tennis', color: '#facc15' },
  { emoji: '🏀', name: 'Basketball', color: '#f97316' },
  { emoji: '🧘', name: 'Yoga', color: '#ec4899' },
]

const mockSquads = [
  { activity: '⚽', name: 'Sunday Morning Football', location: 'Versova Beach, Mumbai', time: 'Sun 7:00 AM', members: 6, max: 10, city: 'mumbai' },
  { activity: '🏋️', name: 'Morning Gym Crew', location: 'Andheri West, Mumbai', time: 'Daily 6:30 AM', members: 3, max: 5, city: 'mumbai' },
  { activity: '🥾', name: 'Coastal Hike Gang', location: 'Joondalup, Perth', time: 'Sat 8:00 AM', members: 4, max: 8, city: 'perth' },
  { activity: '🎲', name: 'Board Game Night', location: 'Scarborough, Perth', time: 'Fri 7:00 PM', members: 5, max: 6, city: 'perth' },
  { activity: '🏏', name: 'Cricket on Weekends', location: 'Juhu, Mumbai', time: 'Sat 6:00 AM', members: 8, max: 11, city: 'mumbai' },
  { activity: '☕', name: 'New to Perth Hangout', location: 'Perth CBD', time: 'Sun 10:00 AM', members: 7, max: 12, city: 'perth' },
]

const whatsappProblems = [
  { problem: 'Post in 5 different groups hoping someone replies', squad: 'One tap — see who\'s available right now' },
  { problem: 'Group goes dead after 2 weeks', squad: 'Activity-based — new people every time' },
  { problem: 'Don\'t know anyone when new to a city', squad: 'Find your people on day one' },
  { problem: 'Hard to coordinate time & location', squad: 'Built-in scheduling & maps' },
]

export default function Home() {
  const [city, setCity] = useState<'mumbai' | 'perth'>('mumbai')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [activeActivity, setActiveActivity] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveActivity(prev => (prev + 1) % activities.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
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
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: '#08080a', color: '#fff', overflowX: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #ff4d00; color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #ff4d00; border-radius: 3px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }
        .delay-4 { animation-delay: 0.4s; opacity: 0; }

        .glow-orange { box-shadow: 0 0 40px rgba(255, 77, 0, 0.3); }
        .glow-orange-sm { box-shadow: 0 0 20px rgba(255, 77, 0, 0.2); }

        .btn-primary {
          background: #ff4d00;
          color: #fff;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          transition: all 0.2s;
        }
        .btn-primary:hover {
          background: #e64400;
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(255, 77, 0, 0.4);
        }

        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.3s;
        }
        .card:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,77,0,0.3);
          transform: translateY(-2px);
        }

        .city-btn {
          cursor: pointer;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          transition: all 0.2s;
        }

        .marquee-track {
          animation: marquee 20s linear infinite;
          display: flex;
          gap: 16px;
          width: max-content;
        }

        .noise {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          opacity: 0.03;
          pointer-events: none;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        .gradient-mesh {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .phone-mockup {
          background: #111;
          border-radius: 40px;
          border: 2px solid rgba(255,255,255,0.1);
          overflow: hidden;
          position: relative;
        }

        .phone-mockup::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 120px; height: 30px;
          background: #111;
          border-radius: 0 0 20px 20px;
          z-index: 10;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 42px !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      <div className="noise" />

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 50 ? 'rgba(8,8,10,0.9)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
        borderBottom: scrollY > 50 ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s',
        padding: '16px 24px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, background: '#ff4d00', borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18,
            }}>S</div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>Squad</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Mumbai · Perth · Coming everywhere</span>
            <a href="#waitlist" style={{
              background: '#ff4d00', color: '#fff', padding: '9px 20px',
              borderRadius: 12, fontSize: 13, fontWeight: 700, textDecoration: 'none',
              transition: 'all 0.2s',
            }}>Get early access</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', position: 'relative', textAlign: 'center' }}>
        {/* Gradient orbs */}
        <div className="gradient-mesh" style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(255,77,0,0.15) 0%, transparent 70%)', top: '10%', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="gradient-mesh" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', bottom: '20%', right: '10%' }} />

        <div className="fade-up delay-1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.3)', borderRadius: 100, padding: '8px 16px', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>
          <span style={{ width: 7, height: 7, background: '#22c55e', borderRadius: '50%', animation: 'pulse-dot 2s ease infinite', display: 'inline-block' }} />
          Launching in Mumbai & Perth — join the waitlist
        </div>

        <h1 className="fade-up delay-2 hero-title" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 80, lineHeight: 1.05, letterSpacing: -3, marginBottom: 24, maxWidth: 900 }}>
          Stop texting dead<br />
          WhatsApp groups.<br />
          <span style={{ color: '#ff4d00' }}>Find your squad.</span>
        </h1>

        <p className="fade-up delay-3" style={{ fontSize: 20, color: 'rgba(255,255,255,0.5)', maxWidth: 560, lineHeight: 1.6, marginBottom: 40 }}>
          New to a city or just want people to do things with? Squad connects you with real people around you — football, gym, hiking, coffee, anything.
        </p>

        {/* Animated activity pill */}
        <div className="fade-up delay-3" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
          <div style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 100, padding: '10px 20px', fontSize: 15, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 10, minWidth: 220, justifyContent: 'center',
            transition: 'all 0.3s',
          }}>
            <span style={{ fontSize: 22 }}>{activities[activeActivity].emoji}</span>
            <span>Find {activities[activeActivity].name} partners</span>
          </div>
        </div>

        <div className="fade-up delay-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#waitlist" className="btn-primary" style={{ padding: '16px 32px', borderRadius: 16, fontSize: 16 }}>
            Join the waitlist →
          </a>
          <a href="#how" style={{
            padding: '16px 32px', borderRadius: 16, fontSize: 16, fontWeight: 600,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff', textDecoration: 'none', transition: 'all 0.2s',
          }}>
            See how it works
          </a>
        </div>

        {/* Floating cards */}
        <div className="hide-mobile" style={{ position: 'absolute', left: '5%', top: '40%', animation: 'float 4s ease-in-out infinite' }}>
          <div className="card" style={{ borderRadius: 16, padding: '14px 18px', fontSize: 13, maxWidth: 200 }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>⚽</div>
            <div style={{ fontWeight: 700, marginBottom: 2 }}>Sunday Football</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Versova Beach · 7 AM · 4/10 joined</div>
          </div>
        </div>

        <div className="hide-mobile" style={{ position: 'absolute', right: '5%', top: '35%', animation: 'float 4s ease-in-out infinite 1s' }}>
          <div className="card" style={{ borderRadius: 16, padding: '14px 18px', fontSize: 13, maxWidth: 200 }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>🥾</div>
            <div style={{ fontWeight: 700, marginBottom: 2 }}>Coastal Hike</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Joondalup, Perth · Sat · 3/8 joined</div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 0', background: 'rgba(255,77,0,0.05)' }}>
        <div className="marquee-track">
          {[...activities, ...activities].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', padding: '0 8px', color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 500 }}>
              <span style={{ fontSize: 18 }}>{a.emoji}</span> {a.name}
              <span style={{ color: 'rgba(255,77,0,0.5)', marginLeft: 8 }}>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section id="how" style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#ff4d00', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>How it works</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 48, letterSpacing: -2, marginBottom: 16 }}>Three taps to your squad</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>No setup. No awkward DMs. Just show up.</p>
        </div>

        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { step: '01', emoji: '🎯', title: 'Pick your vibe', desc: 'Choose what you want to do — football, gym, hiking, board games, coffee. Anything.' },
            { step: '02', emoji: '📍', title: 'See who\'s nearby', desc: 'Real people in your area, same activity, same time. Filter by distance, time, group size.' },
            { step: '03', emoji: '🤝', title: 'Show up & play', desc: 'Join a squad or create one. Built-in maps, chat, and reminders. Just show up.' },
          ].map((item) => (
            <div key={item.step} className="card" style={{ borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 12, fontWeight: 700, color: 'rgba(255,77,0,0.4)', letterSpacing: 2 }}>{item.step}</div>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{item.emoji}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, marginBottom: 10 }}>{item.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* City selector + mock squads */}
      <section style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '100px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ff4d00', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>Live squads</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 48, letterSpacing: -2, marginBottom: 24 }}>What's happening near you</h2>
            {/* City toggle */}
            <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 4, gap: 4 }}>
              {(['mumbai', 'perth'] as const).map(c => (
                <button
                  key={c}
                  className="city-btn"
                  onClick={() => setCity(c)}
                  style={{
                    padding: '10px 24px', borderRadius: 12, fontSize: 14,
                    background: city === c ? '#ff4d00' : 'transparent',
                    color: city === c ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {c === 'mumbai' ? '🇮🇳 Mumbai' : '🇦🇺 Perth'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {filteredSquads.map((squad, i) => (
              <div key={i} className="card" style={{ borderRadius: 18, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ fontSize: 32, width: 56, height: 56, background: 'rgba(255,255,255,0.05)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {squad.activity}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{squad.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginBottom: 8 }}>{squad.location} · {squad.time}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
                      <div style={{ width: `${(squad.members / squad.max) * 100}%`, height: '100%', background: '#ff4d00', borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>{squad.members}/{squad.max} joined</span>
                  </div>
                </div>
                <div style={{ background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.2)', borderRadius: 10, padding: '8px 14px', fontSize: 13, fontWeight: 600, color: '#ff4d00', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                  Join →
                </div>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: 24, color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>
            * These are preview squads. Join the waitlist to access real squads when we launch.
          </p>
        </div>
      </section>

      {/* vs WhatsApp */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#ff4d00', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>Why Squad</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 48, letterSpacing: -2 }}>Built different from WhatsApp groups</h2>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {whatsappProblems.map((item, i) => (
            <div key={i} className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>😩</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.5 }}>{item.problem}</span>
              </div>
              <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>✅</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.5, fontWeight: 500 }}>{item.squad}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-mesh" style={{ width: 800, height: 800, background: 'radial-gradient(circle, rgba(255,77,0,0.12) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />

        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 52, letterSpacing: -2, marginBottom: 16 }}>
            Be first in<br />your city
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18, marginBottom: 40, lineHeight: 1.6 }}>
            Join the waitlist. Free during beta. We'll let you know the moment Squad launches near you.
          </p>

          {submitted ? (
            <div className="card glow-orange" style={{ borderRadius: 20, padding: 32, borderColor: 'rgba(255,77,0,0.3)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 24, marginBottom: 8 }}>You're on the list!</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>We'll hit you up the moment Squad launches in your city. Tell a friend 👇</div>
              <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'center' }}>
                <a href={`https://wa.me/?text=Bro%20check%20this%20out%20%E2%80%94%20find%20people%20for%20football%2C%20gym%2C%20anything%20in%20your%20city.%20Joining%20early%3A%20squads.app`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ background: '#25d366', color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                  Share on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 14, padding: '16px 20px', color: '#fff', fontSize: 16,
                    fontFamily: 'DM Sans, sans-serif', outline: 'none', width: '100%',
                  }}
                />
                <div style={{ display: 'flex', gap: 10 }}>
                  {(['mumbai', 'perth'] as const).map(c => (
                    <button
                      key={c}
                      type="button"
                      className="city-btn"
                      onClick={() => setCity(c)}
                      style={{
                        flex: 1, padding: '12px', borderRadius: 12, fontSize: 14,
                        background: city === c ? 'rgba(255,77,0,0.15)' : 'rgba(255,255,255,0.04)',
                        border: city === c ? '1px solid rgba(255,77,0,0.4)' : '1px solid rgba(255,255,255,0.08)',
                        color: city === c ? '#ff4d00' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {c === 'mumbai' ? '🇮🇳 Mumbai' : '🇦🇺 Perth'}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                  style={{ padding: '16px', borderRadius: 14, fontSize: 16, width: '100%' }}
                >
                  {submitting ? 'Joining...' : 'Join waitlist — it\'s free →'}
                </button>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>No spam. No credit card. Just early access.</p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, background: '#ff4d00', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14 }}>S</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>Squad</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>© 2026 Squad · Built with ❤️ in Mumbai · Launching in Perth</p>
      </footer>
    </main>
  )
}