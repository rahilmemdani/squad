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
  { id: 1, activity: '⚽', name: 'Sunday Morning Football', location: 'Versova Beach', time: 'Sun 7:00 AM', members: 6, max: 10, city: 'mumbai' },
  { id: 2, activity: '🏋️', name: 'Morning Gym Crew', location: 'Andheri West', time: 'Daily 6:30 AM', members: 3, max: 5, city: 'mumbai' },
  { id: 3, activity: '🏏', name: 'Cricket on Weekends', location: 'Juhu', time: 'Sat 6:00 AM', members: 8, max: 11, city: 'mumbai' },
  { id: 4, activity: '☕', name: 'Tech Bro Meetup', location: 'Banjara Hills', time: 'Sat 5:00 PM', members: 4, max: 8, city: 'hyderabad' },
  { id: 5, activity: '🏸', name: 'Badminton Doubles', location: 'Jubilee Hills', time: 'Sun 6:00 AM', members: 2, max: 4, city: 'hyderabad' },
  { id: 6, activity: '🥾', name: 'Oak Mountain Hike', location: 'Birmingham', time: 'Sat 8:00 AM', members: 4, max: 8, city: 'alabama' },
  { id: 7, activity: '🏈', name: 'Flag Football', location: 'Tuscaloosa', time: 'Sun 4:00 PM', members: 10, max: 14, city: 'alabama' },
  { id: 8, activity: '🏄', name: 'Morning Surf', location: 'Folly Beach', time: 'Sat 6:30 AM', members: 3, max: 6, city: 'south_carolina' },
  { id: 9, activity: '🎲', name: 'Board Game Night', location: 'Charleston', time: 'Fri 7:00 PM', members: 5, max: 6, city: 'south_carolina' },
]

export default function Home() {
  const [city, setCity] = useState<City>('mumbai')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [activeActivity, setActiveActivity] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [selectedSquad, setSelectedSquad] = useState<typeof mockSquads[0] | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

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
    <main style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
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
            width: 100%;
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
        @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }

        .animate-up {
            animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }

        .glass-nav {
            background: rgba(3, 3, 3, 0.8);
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
            background: #0a0a0a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 28px;
            width: 100%;
            max-width: 440px;
            padding: 32px;
            position: relative;
            animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 768px) {
            .h1-title { font-size: 42px !important; letter-spacing: -1.5px !important; }
            .grid-3 { display: flex !important; flex-direction: column !important; gap: 12px !important; width: 100% !important; }
            .grid-2 { display: flex !important; flex-direction: column !important; gap: 12px !important; width: 100% !important; }
            .hero-pad { padding-top: 120px !important; padding-bottom: 40px !important; }
            .marquee-container { display: none !important; }
            .compact-card { padding: 24px !important; }
            .compact-step-icon { fontSize: 32px !important; marginBottom: 12px !important; }
        }

        .marquee-track {
            display: flex;
            animation: marquee 25s linear infinite;
            gap: 40px;
            padding-right: 40px;
        }
      `}</style>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, transition: 'all 0.3s' }} className={scrollY > 20 ? 'glass-nav' : ''}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, background: '#ff4d00', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="syne-font" style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>S</span>
            </div>
            <span className="syne-font" style={{ fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>Squad</span>
          </div>
          <a href="#waitlist" className="btn-primary" style={{ padding: '7px 16px', borderRadius: 100, fontSize: 12, textDecoration: 'none' }}>Join Beta</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-pad" style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '140px 20px 60px', textAlign: 'center' }}>
        <h1 className="animate-up delay-1 h1-title syne-font" style={{ fontWeight: 800, fontSize: 72, lineHeight: 1.05, letterSpacing: -2, marginBottom: 20, maxWidth: 900 }}>
          Stop texting dead<br />WhatsApp groups.<br />
          <span style={{ color: '#ff4d00' }}>Find your squad.</span>
        </h1>
        <p className="animate-up delay-2" style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 640, lineHeight: 1.6, marginBottom: 32 }}>
          New to a city or just want people to do things with? Squad connects you with real people around you instantly. No awkward DMs, just show up.
        </p>
        <div className="animate-up delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#waitlist" className="btn-primary" style={{ padding: '14px 32px', borderRadius: 100, fontSize: 15, textDecoration: 'none' }}>Claim early access →</a>
        </div>
      </section>

      {/* Three taps section - Extremely compact for vertical phone view */}
      <section id="how" style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#ff4d00', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Three taps to your squad</div>
          <h2 className="syne-font h2-title" style={{ fontWeight: 800, fontSize: 40, letterSpacing: -1.2, marginBottom: 16 }}>Three taps to your squad</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>Just three quick steps to get moving.</p>
        </div>

        <div className="grid-3">
          {[
            { step: '01', emoji: '🎯', title: 'Pick your vibe', desc: 'Football, coffee, or hiking. We have it all.' },
            { step: '02', emoji: '📍', title: 'See who\'s near', desc: 'Real people, real places, real time.' },
            { step: '03', emoji: '🤝', title: 'Just show up', desc: 'Join the squad and show up. No friction.' },
          ].map((item) => (
            <div key={item.step} className="glass-card compact-card" style={{ borderRadius: 24, padding: 28, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="compact-step-icon" style={{ fontSize: 32 }}>{item.emoji}</div>
                <div style={{ textAlign: 'left' }}>
                  <h3 className="syne-font" style={{ fontWeight: 700, fontSize: 19, marginBottom: 4 }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.4 }}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live squads section */}
      <section style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '80px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, marginBottom: 40 }}>
            <h2 className="syne-font h2-title text-center" style={{ fontWeight: 800, fontSize: 36, letterSpacing: -1 }}>Happening near you</h2>

            <div style={{ display: 'flex', gap: 6, background: 'rgba(255,255,255,0.05)', padding: 5, borderRadius: 100, flexWrap: 'wrap', justifyContent: 'center' }}>
              {cities.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCity(c.id as City)}
                  style={{
                    padding: '8px 16px', borderRadius: 100, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    background: city === c.id ? '#ff4d00' : 'transparent',
                    color: city === c.id ? '#fff' : 'rgba(255,255,255,0.4)', transition: '0.2s'
                  }}
                >
                  {c.label}
                </button>
              ))}
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
              <div key={squad.id} className="glass-card" style={{ borderRadius: 20, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ fontSize: 24, width: 52, height: 52, background: 'rgba(255,255,255,0.05)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {squad.activity}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{squad.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{squad.time} · {squad.location}</div>
                </div>
                <button
                  onClick={() => setSelectedSquad(squad)}
                  style={{ background: '#ff4d00', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal - Join Squad with added "Create" option */}
      {selectedSquad && (
        <div className="modal-overlay" onClick={() => setSelectedSquad(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>{selectedSquad.activity}</div>
              <h2 className="syne-font" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{selectedSquad.name}</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, marginBottom: 24 }}>{selectedSquad.location}</p>

              <div style={{ display: 'grid', gap: 12, width: '100%' }}>
                <a href="#waitlist" onClick={() => setSelectedSquad(null)} className="btn-primary" style={{ display: 'block', padding: '16px', borderRadius: 16, textDecoration: 'none', fontSize: 15 }}>
                  Join waitlist to enter squad
                </a>

                <button
                  onClick={() => { setSelectedSquad(null); setShowAddModal(true); }}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '16px', borderRadius: 16, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
                >
                  Or host your own squad +
                </button>

                <button
                  onClick={() => setSelectedSquad(null)}
                  style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', marginTop: 8, cursor: 'pointer', fontSize: 13 }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Create Squad */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>✨</div>
              <h2 className="syne-font" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Host a Squad</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 24 }}>Want to lead an activity in {city}?</p>

              <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
                <input placeholder="Activity (e.g. Hiking)" style={{ padding: '14px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '100%' }} />
                <input placeholder="Preferred Area" style={{ padding: '14px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '100%' }} />
              </div>

              <a href="#waitlist" onClick={() => setShowAddModal(false)} className="btn-primary" style={{ display: 'block', padding: '16px', borderRadius: 14, textDecoration: 'none', fontSize: 15 }}>
                Join waitlist to host
              </a>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', marginTop: 12, cursor: 'pointer', fontSize: 13 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Waitlist */}
      <section id="waitlist" style={{ padding: '80px 20px', position: 'relative' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🚀</div>
          <h2 className="syne-font h2-title" style={{ fontWeight: 800, fontSize: 44, letterSpacing: -1.2, marginBottom: 16 }}>Early Access</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, marginBottom: 32, lineHeight: 1.5 }}>Join the waitlist. We launch officially in your city once we hit 1,000 members.</p>

          {submitted ? (
            <div className="glass-card" style={{ padding: '32px', borderRadius: 24 }}>
              <h3 className="syne-font" style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Registered!</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>Stay tuned for updates.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                style={{ padding: '16px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 15 }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '18px', borderRadius: 16, fontSize: 16 }}>
                {submitting ? 'Registering...' : 'Join Waitlist'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>© 2026 Squad · Reconnecting humans.</p>
      </footer>
    </main>
  )
}