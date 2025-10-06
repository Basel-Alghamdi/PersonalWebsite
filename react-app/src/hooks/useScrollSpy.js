import { useEffect, useRef, useState } from 'react'

export default function useScrollSpy(ids) {
  const [active, setActive] = useState('')
  const sectionsRef = useRef([])
  useEffect(() => {
    sectionsRef.current = ids.map(id => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id))
    }, { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 })
    sectionsRef.current.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [ids])

  useEffect(() => {
    const links = Array.from(document.querySelectorAll('.nav-menu .nav-link'))
    links.forEach(link => {
      const href = link.getAttribute('href')?.replace('#','').toLowerCase().trim()
      if (href && active && href === active.toLowerCase().trim()) link.classList.add('active')
      else link.classList.remove('active')
    })
  }, [active])
  return active
}

