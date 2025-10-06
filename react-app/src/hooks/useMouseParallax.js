import { useEffect } from 'react'

export default function useMouseParallax(selector = '#profile-image', { maxShift = 10, speed = 0.1 } = {}) {
  useEffect(() => {
    const el = document.querySelector(selector)
    if (!el || window.innerWidth <= 768) return
    let targetX = 0
    let currentX = 0
    let raf = 0
    const animate = () => {
      currentX += (targetX - currentX) * speed
      el.style.transform = `translateX(${currentX}px)`
      raf = requestAnimationFrame(animate)
    }
    const onMove = (e) => {
      const vw = window.innerWidth
      const mouseX = e.clientX
      targetX = ((mouseX / vw) - 0.5) * 2 * maxShift
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove) }
  }, [selector, maxShift, speed])
}

