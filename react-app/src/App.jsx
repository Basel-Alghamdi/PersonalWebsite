import React, { useMemo, useState } from 'react'
import Header from './components/Header'
import MobileNav from './components/MobileNav'
import RoleRotator from './components/RoleRotator'
import Experience from './components/Experience'
import Volunteering from './components/Volunteering'
import { ThemeProvider } from './context/ThemeContext'
import useScrollSpy from './hooks/useScrollSpy'
import useMouseParallax from './hooks/useMouseParallax'

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const sectionIds = useMemo(() => ['home', 'about', 'Experience', 'Volunteering'], [])
  useScrollSpy(sectionIds)
  useMouseParallax('#profile-image')

  return (
    <ThemeProvider>
      <Header onOpenMobile={() => setMobileOpen(true)} />
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Decorative background elements */}
      <div className="spray-effect-1"></div>
      <div className="spray-effect-2"></div>
      <div className="spray-effect-3"></div>
      <div className="spray-effect-4"></div>
      <div className="spray-effect-5"></div>

      <div className="circular-element">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="25" fill="none" stroke="url(#purpleGradient)" strokeWidth="2" opacity="0.6"/>
          <circle cx="30" cy="30" r="15" fill="url(#purpleGradient)" opacity="0.8"/>
          <defs>
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7B2FF7" />
              <stop offset="100%" stopColor="#A677FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="circular-element-2">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="none" stroke="url(#purpleGradient2)" strokeWidth="1.5" opacity="0.5"/>
          <circle cx="20" cy="20" r="10" fill="url(#purpleGradient2)" opacity="0.7"/>
          <defs>
            <linearGradient id="purpleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A677FF" />
              <stop offset="100%" stopColor="#7B2FF7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating dots */}
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>

      {/* Home Section */}
      <section id="home" className="section home-section" style={{minHeight: '70vh', paddingTop: 'var(--header-height)'}}>
        <div className="container home-content" style={{display:'flex', gap:'3rem', alignItems:'center'}}>
          <div className="home-left" style={{flex: 1}}>
            <h1>Hi, I’m Basel</h1>
            <h2>
              <RoleRotator roles={["Software Engineer.", "Associate Product Manager."]} />
            </h2>
          </div>
          <div className="home-right" style={{flex: 1, display:'flex', justifyContent:'center'}}>
            <div className="profile-image-frame">
              <img id="profile-image" className="profile-image" src="/assets/images/IMG_0378 2.jpg" alt="Profile" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="about-card">
          <h2>About</h2>
          <p>
            I'm a product person passionate about turning ideas into meaningful, user-centric solutions.
            Recently, I've been building real products, learning fast, and growing even faster.
            Still early in the journey, but already deep in the game.
          </p>
        </div>
      </section>

      <Experience />

      <Volunteering />

      <footer className="footer-bar" id="contact" style={{padding:'1rem'}}>
        <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div className="footer-left" style={{display:'flex', gap:'0.5rem', alignItems:'center'}}>
            <img src="/assets/images/Screenshot 1447-01-20 at 2.09.29 PM.png" alt="Logo" className="footer-logo" width="38" height="38" />
            <span className="footer-name">Basel Alghamdi</span>
          </div>
          <div className="footer-right" style={{display:'flex', gap:'0.75rem'}}>
            <a href="mailto:baseelaziz1@gmail.com" className="footer-icon" aria-label="Email" target="_blank" rel="noopener">Email</a>
            <a href="https://x.com/baseelaziz1" className="footer-icon" aria-label="X (Twitter)" target="_blank" rel="noopener">X</a>
            <a href="https://www.linkedin.com/in/basel-alghamdi1" className="footer-icon" aria-label="LinkedIn" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </div>
      </footer>
    </ThemeProvider>
  )
}
