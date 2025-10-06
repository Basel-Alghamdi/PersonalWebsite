import React, { useEffect, useState } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

export default function RoleRotator({ roles = [], interval = 2600 }) {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState('')
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setFade('fade-out')
      setTimeout(() => {
        setIndex(i => (i + 1) % roles.length)
        setFade('fade-in')
        setTimeout(() => setFade(''), 260)
      }, 220)
    }, interval)
    return () => clearInterval(id)
  }, [roles, interval, reduced])

  return <span className={`role-rotator ${fade}`} aria-live="polite">{roles[index] || ''}</span>
}
