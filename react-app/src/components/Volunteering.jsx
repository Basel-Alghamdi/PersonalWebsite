import React, { useEffect, useRef, useState } from 'react'

const ORGS = {
  1: [
    { src: '/assets/images/Screenshot 1447-01-20 at 5.25.43 PM.png', alt: 'Org1 Image 1', caption: 'FTC Talks \n An enriching talk with Engineer Sami Al-Husain at Mozn.' },
    { src: '/assets/images/Screenshot 1447-01-20 at 7.06.49 PM.png', alt: 'Org1 Image 2', caption: 'FTC Talks \n An enriching session with Dr. Abdullah Elyas, Co-founder of Careem, hosted by VOV.' },
    { src: '/assets/images/Screenshot 1447-01-20 at 6.39.29 PM.png', alt: 'Org1 Image 3', caption: 'Eduthon x T2 \n I worked as a team lead at Hackathon Eduthon in collaboration with T2 company.' },
    { src: '/assets/images/Screenshot 1447-01-20 at 7.04.56 PM.png', alt: 'Org1 Image 4', caption: 'Certificate of Working Hours \n A certificate documenting the hours completed within the club.' },
    { src: '/assets/images/Screenshot 1447-01-20 at 9.21.59 PM.png', alt: 'Org1 Image 5', caption: 'Volunteer Certificate \n A volunteer certificate for contributing to the organization of the Eduthon Hackathon.' },
  ],
  2: [
    { src: '/assets/images/Screenshot 1447-01-24 at 1.24.18 AM.png', alt: 'Org2 Image 1', caption: 'F&B hackathon x Jahez \n I worked as an organizer in a food and beverage hackathon in cooperation with Jahez Company.' },
    { src: '/assets/images/Screenshot 1447-01-22 at 2.21.56 AM.png', alt: 'Org2 Image 2', caption: 'Certificate of Appreciation & Volunteer Hours \n A certificate of appreciation acknowledging the volunteer hours contributed.' },
  ],
  3: [
    { src: '/assets/images/Screenshot 1447-01-22 at 2.28.34 AM.png', alt: 'Org3 Image 1', caption: "Panel Talk x Monsha'at \n A panel discussion with Engineer Rayan Labbad at the Monsha'at headquarters." },
    { src: '/assets/images/Screenshot 1447-01-22 at 2.25.48 AM.png', alt: 'Org3 Image 2', caption: "Certificate of Appreciation \n A certificate of appreciation for delivering a talk at the Innovation Unit in collaboration with Monsha'at Center." },
  ],
}

function FocusTrapOverlay({ open, onClose, children, label }) {
  const overlayRef = useRef(null)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const overlay = overlayRef.current
    const focusables = overlay.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')
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
    const onClick = (e) => { if (e.target === overlay) onClose() }
    overlay.addEventListener('keydown', onKeyDown)
    overlay.addEventListener('click', onClick)
    return () => { overlay.removeEventListener('keydown', onKeyDown); overlay.removeEventListener('click', onClick) }
  }, [open, onClose])

  return (
    <div
      ref={overlayRef}
      className={`vol-modal-overlay ${open ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-hidden={!open}
    >
      <div className="vol-modal">
        <div className="popup-body">{children}</div>
      </div>
    </div>
  )
}

export default function Volunteering() {
  const [open, setOpen] = useState(0)
  return (
    <section id="Volunteering" className="section volunteering-section">
      <div id="volunteering-anchor"></div>
      <h2>Volunteering</h2>
      <div className="vol-gallery">
        {[1,2,3].map(org => (
          <div className="vol-gallery-tile" key={org} data-org={org} tabIndex={0}
               onClick={() => setOpen(org)}
               onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(org) } }}>
            <img src={
              org === 1 ? '/assets/images/IMG_FDAA4363AB1E-1.jpeg' :
              org === 2 ? '/assets/images/IMG_C318F1D92210-1.jpeg' :
                          '/assets/images/IMG_8639 2.jpg'
            } alt={`Organization ${org} Cover`} loading="lazy" decoding="async" width="320" height="200" />
          </div>
        ))}
      </div>

      {[1,2,3].map(org => (
        <FocusTrapOverlay key={org} open={open === org} onClose={() => setOpen(0)} label={`Organization ${org} gallery`}>
          {ORGS[org].map((item, idx) => (
            <div key={idx} className="popup-img-block">
              <img src={item.src} alt={item.alt} className="popup-img" loading={idx === 0 ? 'eager' : 'lazy'} fetchpriority={idx === 0 ? 'high' : undefined} decoding="async" width="800" height="600" />
              <div className="popup-img-caption" dangerouslySetInnerHTML={{ __html: item.caption.replace(/\n/g, '<br>') }} />
            </div>
          ))}
        </FocusTrapOverlay>
      ))}
    </section>
  )
}

