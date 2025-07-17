// Portfolio Website JS
// Author: Basel Alghamdi
// Handles: scroll-spy, smooth scroll, hamburger menu, profile image subtle animation, timeline animations

// --- Scroll-Spy Navigation ---
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('.section'));
const header = document.querySelector('.site-header');

// Throttle function to limit scroll event calls
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

function setActiveNav() {
  const scrollY = window.scrollY + header.offsetHeight + 50;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // Remove active class from ALL links first
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Check if we're at the bottom of the page (Contact section) - but only if we're actually scrolling
  if (scrollY > 200 && scrollY + windowHeight >= documentHeight - 250) {
    const contactLink = document.querySelector('a[href="#contact"]');
    if (contactLink) {
      contactLink.classList.add('active');
      console.log('Activated: Contact');
    }
    return;
  }
  
  // Get all sections
  const homeSection = document.getElementById('home');
  const aboutSection = document.getElementById('about');
  const experienceSection = document.getElementById('Experience');
  
  // Calculate section boundaries with overlap to prevent gaps
  const sections = [
    {
      id: 'home',
      element: homeSection,
      start: homeSection ? homeSection.offsetTop - 250 : 0,
      end: homeSection ? homeSection.offsetTop + homeSection.offsetHeight - 50 : 0
    },
    {
      id: 'about',
      element: aboutSection,
      start: aboutSection ? aboutSection.offsetTop - 50 : 0,
      end: aboutSection ? aboutSection.offsetTop + aboutSection.offsetHeight - 50 : 0
    },
    {
      id: 'Experience',
      element: experienceSection,
      start: experienceSection ? experienceSection.offsetTop - 50 : 0,
      end: experienceSection ? experienceSection.offsetTop + experienceSection.offsetHeight - 50 : 0
    }
  ];
  
  // Find which section we're currently in
  let activeSection = null;
  for (let section of sections) {
    if (scrollY >= section.start && scrollY < section.end) {
      activeSection = section;
      break;
    }
  }
  
  // If no section found, find the closest one
  if (!activeSection) {
    let closestSection = sections[0];
    let minDistance = Math.abs(scrollY - sections[0].start);
    
    for (let section of sections) {
      const distance = Math.abs(scrollY - section.start);
      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    }
    activeSection = closestSection;
  }
  
  // Activate the appropriate link
  if (activeSection) {
    const link = document.querySelector(`a[href="#${activeSection.id}"]`);
    if (link) {
      link.classList.add('active');
      console.log(`Activated: ${activeSection.id}`);
    }
  }
}

// Initialize navigation on page load
function initNavigation() {
  // Ensure page starts at top when refreshed
  if (window.scrollY === 0) {
    window.scrollTo(0, 0);
  }
  
  // Remove any existing active classes
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Set initial active state with a small delay to ensure DOM is ready
  setTimeout(() => {
    setActiveNav();
  }, 100);
}

// Use faster scroll event for immediate response
window.addEventListener('scroll', throttle(setActiveNav, 30)); // تقليل التأخير لاستجابة أسرع
window.addEventListener('resize', setActiveNav);
document.addEventListener('DOMContentLoaded', initNavigation);

// Also handle page load event to ensure proper initialization
window.addEventListener('load', () => {
  // Force scroll to top if we're at the bottom
  if (window.scrollY > document.documentElement.scrollHeight - window.innerHeight - 100) {
    window.scrollTo(0, 0);
  }
  setActiveNav();
});

// --- Smooth Scroll for Nav Links ---
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      let y = targetSection.offsetTop - headerHeight + 1;
      if (targetId === 'about') {
        y -= 100; // تعويض أكبر لقسم About
      } else if (targetId === 'Experience') {
        y += 60; // تعويض موجب لقسم Experience
      }
      window.scrollTo({ top: y, behavior: 'smooth' });
      // Close mobile nav after click
      navMenu.classList.remove('open');
      
      // Don't add active class here - let scroll event handle it
    }
  });
});

// --- Hamburger Menu (Mobile) ---
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// --- Subtle Profile Image Mousemove Animation (Desktop Only) ---
const profileImage = document.getElementById('profile-image');
let targetX = 0;
let currentX = 0;
const maxShift = 10; // px, subtle
const speed = 0.10; // smoothness

function animateProfileImage() {
  currentX += (targetX - currentX) * speed;
  profileImage.style.transform = `translateX(${currentX}px)`;
  requestAnimationFrame(animateProfileImage);
}

function handleMouseMove(e) {
  const vw = window.innerWidth;
  const mouseX = e.clientX;
  targetX = ((mouseX / vw) - 0.5) * 2 * maxShift;
}

function enableProfileImageAnimation() {
  window.addEventListener('mousemove', handleMouseMove);
  animateProfileImage();
}

function disableProfileImageAnimation() {
  window.removeEventListener('mousemove', handleMouseMove);
  profileImage.style.transform = 'translateX(0)';
}

function checkProfileImageAnimation() {
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    enableProfileImageAnimation();
  } else {
    disableProfileImageAnimation();
  }
}

checkProfileImageAnimation();
window.addEventListener('resize', checkProfileImageAnimation);

// --- Timeline Scroll Animations ---
function initTimelineAnimations() {
  const timelineEntries = document.querySelectorAll('.timeline-entry');
  
  if (timelineEntries.length === 0) return;
  
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        // Add staggered delay for each entry
        const entryNumber = entry.target.getAttribute('data-entry');
        const delay = (entryNumber - 1) * 200; // 200ms delay between entries
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, delay);
      }
    });
  }, observerOptions);
  
  timelineEntries.forEach(entry => {
    timelineObserver.observe(entry);
  });
}

// Initialize timeline animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTimelineAnimations();
});

// --- Volunteering Cards Expand/Collapse ---
// Mobile volunteering stack interaction
const volCards = document.querySelectorAll('.vol-card');
const isMobile = () => window.innerWidth < 768;

volCards.forEach(card => {
  const cover = card.querySelector('.vol-card-cover');
  // Mobile: expand/collapse on cover click
  if (cover) {
    cover.addEventListener('click', function(e) {
      if (!isMobile()) return;
      volCards.forEach(c => { if (c !== card) c.classList.remove('expanded'); });
      card.classList.toggle('expanded');
    });
  }
  // Desktop: expand/collapse on card click (anywhere)
  card.addEventListener('click', function(e) {
    if (isMobile()) return;
    // Prevent double toggle if cover was clicked (already handled above)
    if (e.target.closest('.vol-card-cover')) return;
    if (card.classList.contains('expanded')) {
      card.classList.remove('expanded');
      return;
    }
    volCards.forEach(c => c.classList.remove('expanded'));
    card.classList.add('expanded');
  });
});
// To replace cover images: update the src attribute in each <img> in .vol-card-cover.
// To edit article text: change the content in .vol-card-article-text in the volunteering section.

// --- Volunteering Cards Popup Modal ---
// Handles popup modal for volunteering cards
const volunteeringModal = document.getElementById('volunteering-modal');

function createModalContent(card) {
  // Extract title
  const title = card.querySelector('.vol-card-title').textContent;
  // Extract images and captions
  const imgs = Array.from(card.querySelectorAll('.vol-card-img'));
  // Build modal grid
  let gridHTML = '<div class="vol-modal-grid">';
  imgs.forEach(imgDiv => {
    if (imgDiv.classList.contains('empty')) {
      gridHTML += '<div class="vol-modal-img empty"></div>';
    } else {
      const img = imgDiv.querySelector('img');
      const caption = imgDiv.querySelector('.vol-card-caption').textContent;
      gridHTML += `<div class="vol-modal-img"><img src="${img.src}" alt="${img.alt}" /><div class="vol-modal-caption">${caption}</div></div>`;
    }
  });
  gridHTML += '</div>';
  // Modal HTML
  return `
    <div class="vol-modal-content">
      <div class="vol-modal-header">
        <span class="vol-modal-title">${title}</span>
        <button class="vol-modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="vol-modal-body">
        ${gridHTML}
      </div>
    </div>
  `;
}

function openVolunteeringModal(card) {
  // Prevent multiple modals
  if (volunteeringModal.classList.contains('open')) return;
  volunteeringModal.innerHTML = createModalContent(card);
  volunteeringModal.style.display = 'flex';
  setTimeout(() => volunteeringModal.classList.add('open'), 10);
  document.body.style.overflow = 'hidden'; // Prevent background scroll

  // Close handlers
  const closeBtn = volunteeringModal.querySelector('.vol-modal-close');
  closeBtn.addEventListener('click', closeVolunteeringModal);
  volunteeringModal.addEventListener('mousedown', function(e) {
    if (e.target === volunteeringModal) closeVolunteeringModal();
  });
  // ESC key closes modal
  document.addEventListener('keydown', escCloseHandler);
}

function closeVolunteeringModal() {
  volunteeringModal.classList.remove('open');
  document.body.style.overflow = '';
  // Wait for animation to finish before hiding
  setTimeout(() => {
    volunteeringModal.style.display = 'none';
    volunteeringModal.innerHTML = '';
  }, 350);
  document.removeEventListener('keydown', escCloseHandler);
}

function escCloseHandler(e) {
  if (e.key === 'Escape') closeVolunteeringModal();
}

// Attach click handler to each volunteering card
volCards.forEach(card => {
  card.addEventListener('click', function(e) {
    e.stopPropagation();
    openVolunteeringModal(card);
  });
});

// Instructions:
// - To adjust modal size: edit max-width, max-height, or width in .vol-modal-content in styles.css
// - To adjust animation: edit transition/animation durations in .vol-modal-content and .volunteering-modal.open in styles.css
// - To change images/captions: edit the volunteering section in index.html

// --- Volunteering Gallery Modal Logic (multiple independent popups) ---
const galleryTiles = document.querySelectorAll('.vol-gallery-tile');
const overlays = [
  document.getElementById('vol-modal-overlay-1'),
  document.getElementById('vol-modal-overlay-2'),
  document.getElementById('vol-modal-overlay-3')
];

// Open the corresponding modal
function openVolModal(idx) {
  overlays[idx].classList.add('open');
  overlays[idx].setAttribute('aria-hidden', 'false');
  overlays[idx].querySelector('.vol-modal').focus();
}
// Close all modals
function closeAllVolModals() {
  overlays.forEach(overlay => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  });
}
// Tile click opens its modal
galleryTiles.forEach((tile, i) => {
  tile.addEventListener('click', () => openVolModal(i));
  tile.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openVolModal(i);
    }
  });
});
// Overlay click closes modal
overlays.forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeAllVolModals();
  });
});
// Escape closes modal
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllVolModals();
});
// Prevent modal click from closing
overlays.forEach(overlay => {
  const modal = overlay.querySelector('.vol-modal');
  if (modal) modal.addEventListener('click', e => e.stopPropagation());
});

// --- Accessibility: Close nav on outside click (mobile) ---
document.addEventListener('click', (e) => {
  if (window.innerWidth > 800) return;
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    navMenu.classList.remove('open');
  }
}); 