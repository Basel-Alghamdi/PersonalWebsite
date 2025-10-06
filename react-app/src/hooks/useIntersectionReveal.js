import { useEffect } from 'react'

export default function useIntersectionReveal(selector = '.timeline-entry') {
  useEffect(() => {
    const nodes = document.querySelectorAll(selector)
    nodes.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    })
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.3 })
    nodes.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [selector])
}

