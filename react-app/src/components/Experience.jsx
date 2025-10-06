import React from 'react'
import useIntersectionReveal from '../hooks/useIntersectionReveal'

const entries = [
  {
    company: 'Rekaz',
    role: 'Product Intern',
    period: 'Jul 2024 - Oct 2024',
    logo: '/assets/images/Screenshot 1447-01-20 at 4.47.19 AM.png',
    alt: 'Rekaz'
  },
  {
    company: 'Olo',
    role: 'Associate Product Manager',
    period: 'May 2025 - Present',
    logo: '/assets/images/Screenshot 1447-01-20 at 4.51.12 AM.png',
    alt: 'Olo'
  }
]

export default function Experience() {
  useIntersectionReveal('.timeline-entry')
  return (
    <section id="Experience" className="section experience-section">
      <h2>Experience</h2>
      <div className="timeline">
        {entries.map((e, idx) => (
          <div className="timeline-entry" data-entry={idx + 1} key={e.company}>
            <div className="timeline-dot">
              <img src={e.logo} alt={e.alt} className="company-logo" loading="lazy" decoding="async" width="90" height="90" />
            </div>
            <div className="timeline-content">
              <h3 className="company-name">{e.company}</h3>
              <p className="role-title">{e.role} <br /> {e.period}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

