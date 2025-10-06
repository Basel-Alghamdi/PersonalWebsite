import React, { useEffect, useRef } from 'react'

function getFocusable(container) {
  return container.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  )
}

export default function MobileNav({ open, onClose }) {
  const overlayRef = useRef(null)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const overlay = overlayRef.current
    const focusables = getFocusable(overlay)
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    first?.focus()
    const onKeyDown = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    overlay.addEventListener('keydown', onKeyDown)
    return () => overlay.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <div
      id="mobile-nav"
      ref={overlayRef}
      className={`mobile-nav-overlay ${open ? 'open' : ''}`}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mobile-nav-panel">
        <nav className="mobile-nav-menu">
          {['home','about','Experience','Volunteering'].map(id => (
            <a key={id} href={`#${id}`} className="mobile-nav-item nav-link" onClick={onClose}>{id}</a>
          ))}
        </nav>
      </div>
    </div>
  )
}

