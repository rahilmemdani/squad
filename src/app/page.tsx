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
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(8px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            animation: fadeIn 0.3s ease;
        }
        .modal-content {
            background: #0a0a0a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 32px;
            width: 100%;
            max-width: 480px;
            padding: 40px;
            position: relative;
            animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 768px) {
            .h1-title { font-size: 44px !important; letter-spacing: -1.5px !important; }
            .grid-3 { display: flex !important; flex-direction: column !important; gap: 16px !important; }
            .grid-2 { display: flex !important; flex-direction: column !important; gap: 16px !important; }
            .hero-pad { padding-top: 140px !important; }
            .marquee-container { display: none !important; }
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
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, background: '#ff4d00', borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="syne-font" style={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>S</span>
            </div>
            <span className="syne-font" style={{ fontWeight: 800, fontSize: 22, letterSpacing: -0.5 }}>Squad</span>
          </div>
          <a href="#waitlist" className="btn-primary" style={{ padding: '8px 20px', borderRadius: 100, fontSize: 13, textDecoration: 'none' }}>Join Beta</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-pad" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '160px 24px 80px', textAlign: 'center' }}>
        <h1 className="animate-up delay-1 h1-title syne-font" style={{ fontWeight: 800, fontSize: 80, lineHeight: 1.05, letterSpacing: -2.5, marginBottom: 24, maxWidth: 900 }}>
          Stop texting dead<br />WhatsApp groups.<br />
          <span style={{ color: '#ff4d00' }}>Find your squad.</span>
        </h1>
        <p className="animate-up delay-2" style={{ fontSize: 19, color: 'rgba(255,255,255,0.5)', maxWidth: 640, lineHeight: 1.6, marginBottom: 40 }}>
          New to a city or just want people to do things with? Squad connects you with real people around you instantly. No awkward DMs, just show up.
        </p>
        <div className="animate-up delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#waitlist" className="btn-primary" style={{ padding: '16px 36px', borderRadius: 100, fontSize: 16, textDecoration: 'none' }}>Claim early access →</a>
        </div>
      </section>

      {/* Three taps section - Fixed for mobile vertical flow */}
      <section id="how" style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#ff4d00', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>The Experience</div>
          <h2 className="syne-font h2-title" style={{ fontWeight: 800, fontSize: 48, letterSpacing: -1.5, marginBottom: 20 }}>Three taps to your squad</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>No setup. No awkward DMs. Just show up.</p>
        </div>

        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { step: '01', emoji: '🎯', title: 'Pick your vibe', desc: 'Board games, football, hiking, or just coffee. We have everything.' },
            { step: '02', emoji: '📍', title: 'See who\'s nearby', desc: 'Real people, real locations, real time. No infinite scrolling.' },
            { step: '03', emoji: '🤝', title: 'Show up & play', desc: 'Join the squad, chat for a minute, and just show up. Simple.' },
          ].map((item) => (
            <div key={item.step} className="glass-card" style={{ borderRadius: 28, padding: 32 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,77,0,0.5)', marginBottom: 24 }}>STEP {item.step}</div>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{item.emoji}</div>
              <h3 className="syne-font" style={{ fontWeight: 700, fontSize: 22, marginBottom: 12 }}>{item.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live squads section */}
      <section style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '100px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, marginBottom: 48 }}>
            <h2 className="syne-font h2-title text-center" style={{ fontWeight: 800, fontSize: 44, letterSpacing: -1.5 }}>Happening near you</h2>
            
            <div style={{ display: 'flex', gap: 8, background: 'rgba(255,255,255,0.05)', padding: 6, borderRadius: 100 }}>
              {cities.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCity(c.id as City)}
                  style={{
                    padding: '10px 20px', borderRadius: 100, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
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
                style={{ padding: '14px 32px', borderRadius: 100, fontSize: 15 }}
            >
              + Create a Squad
            </button>
          </div>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {filteredSquads.map((squad) => (
              <div key={squad.id} className="glass-card" style={{ borderRadius: 24, padding: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ fontSize: 32, width: 64, height: 64, background: 'rgba(255,255,255,0.05)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {squad.activity}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{squad.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{squad.time} · {squad.location}</div>
                </div>
                <button 
                    onClick={() => setSelectedSquad(squad)}
                    style={{ background: '#ff4d00', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}
                >
                    Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal - Join Squad */}
      {selectedSquad && (
        <div className="modal-overlay" onClick={() => setSelectedSquad(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>{selectedSquad.activity}</div>
              <h2 className="syne-font" style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>{selectedSquad.name}</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 32 }}>Location: {selectedSquad.location}</p>
              
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: 24, textAlign: 'left', marginBottom: 32 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#ff4d00', marginBottom: 8, textTransform: 'uppercase' }}>Squad Info</p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, lineHeight: 1.5 }}>
                  This squad has {selectedSquad.members} people already. We launch in {selectedSquad.city} officially in a few weeks.
                </p>
              </div>

              <a href="#waitlist" onClick={() => setSelectedSquad(null)} className="btn-primary" style={{ display: 'block', padding: '18px', borderRadius: 16, textDecoration: 'none', fontSize: 16 }}>
                Join the waitlist to access
              </a>
              <button 
                onClick={() => setSelectedSquad(null)} 
                style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', marginTop: 20, cursor: 'pointer', fontSize: 14 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Create Squad */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>✨</div>
              <h2 className="syne-font" style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Host a Squad</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 32 }}>Want to host an activity in {city}?</p>
              
              <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
                <input placeholder="Activity Name (e.g. Hiking)" style={{ padding: '16px', borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '100%' }} />
                <input placeholder="Location" style={{ padding: '16px', borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '100%' }} />
              </div>

              <a href="#waitlist" onClick={() => setShowAddModal(false)} className="btn-primary" style={{ display: 'block', padding: '18px', borderRadius: 16, textDecoration: 'none', fontSize: 16 }}>
                Lock in early access to host
              </a>
              <button 
                onClick={() => setShowAddModal(false)} 
                style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', marginTop: 20, cursor: 'pointer', fontSize: 14 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Waitlist */}
      <section id="waitlist" style={{ padding: '120px 24px', position: 'relative' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 56, marginBottom: 24 }}>🚀</div>
          <h2 className="syne-font h2-title" style={{ fontWeight: 800, fontSize: 48, letterSpacing: -1.5, marginBottom: 16 }}>The Waitlist</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18, marginBottom: 40, lineHeight: 1.6 }}>Step 1 is simple: we're collecting emails. We launch officially when we hit 1,000 members in your city.</p>

          {submitted ? (
            <div className="glass-card" style={{ padding: '40px', borderRadius: 32 }}>
              <h3 className="syne-font" style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>You're in!</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>We'll notify you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Your email address" 
                required 
                style={{ padding: '18px 24px', borderRadius: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 16 }} 
              />
              <button type="submit" className="btn-primary" style={{ padding: '20px', borderRadius: 20, fontSize: 16 }}>
                {submitting ? 'Applying...' : 'Join Waitlist'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>© 2026 Squad · Reconnecting the real world.</p>
      </footer>
    </main>
  )
}