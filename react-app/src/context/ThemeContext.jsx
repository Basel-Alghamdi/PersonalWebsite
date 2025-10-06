import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext({ theme: 'light', toggle: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'light' } catch { return 'light' }
  })
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.setAttribute('data-theme', 'dark')
    else root.removeAttribute('data-theme')
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])
  const value = useMemo(() => ({ theme, toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')) }), [theme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

