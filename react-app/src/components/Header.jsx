import React from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Header({ onOpenMobile }) {
  const { theme, toggle } = useTheme()
  return (
    <header className="site-header">
      <a href="#home" className="skip-link" style={{position:'absolute',left:'-10000px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}}>Skip to content</a>
      <div className="header-container">
        <div className="logo">
          <img src="/assets/images/Screenshot 1447-01-20 at 2.09.29 PM.png" alt="Basel Alghamdi Logo" className="logo-image" width="48" height="48" />
        </div>
        <div className="flex-spacer" />
        <nav className="nav-menu" id="nav-menu" aria-label="Primary">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#Experience" className="nav-link">Experience</a>
          <a href="#Volunteering" className="nav-link">Volunteering</a>
        </nav>
        <button
          id="theme-toggle"
          className="theme-toggle"
          type="button"
          aria-label="Toggle dark mode"
          aria-pressed={theme === 'dark'}
          onClick={toggle}
        >
          <svg className="icon sun" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M12 4.5V2m0 20v-2.5M4.5 12H2m20 0h-2.5M5.6 5.6 4 4m16 16-1.6-1.6M18.4 5.6 20 4M4 20l1.6-1.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="4" fill="currentColor"/>
          </svg>
          <svg className="icon moon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M21 12.6A8.5 8.5 0 1 1 11.4 3 6.8 6.8 0 0 0 21 12.6Z" fill="currentColor"/>
          </svg>
        </button>
        <div className="flex-spacer" />
        <button
          className="hamburger"
          id="hamburger"
          aria-label="Open navigation"
          aria-controls="mobile-nav"
          aria-expanded="false"
          onClick={onOpenMobile}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}

