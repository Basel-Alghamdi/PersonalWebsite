// COMPLETE WEBSITE FUNCTIONALITY (moved from inline <script> in index.html)
document.addEventListener('DOMContentLoaded', function () {
  // === THEME: light/dark ===
  (function () {
    const root = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    const storageKey = 'theme';
    const apply = (theme) => {
      if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        btn && btn.setAttribute('aria-pressed', 'true');
      } else {
        root.removeAttribute('data-theme');
        btn && btn.setAttribute('aria-pressed', 'false');
      }
    };
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        apply(saved);
      } else {
        apply('light');
      }
    } catch (e) {}

    btn && btn.addEventListener('click', function () {
      const nowDark = !document.documentElement.hasAttribute('data-theme');
      apply(nowDark ? 'dark' : 'light');
      try {
        localStorage.setItem(storageKey, nowDark ? 'dark' : 'light');
      } catch (e) {}
    });

    // Ignore OS changes; user controls theme explicitly via toggle
  })();

  // === HEADER FUNCTIONALITY ===
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const openMobileNav = () => {
    if (!mobileNavOverlay) return;
    mobileNavOverlay.classList.add('open');
    mobileNavOverlay.setAttribute('aria-hidden', 'false');
    // lock scroll
    document.body.style.overflow = 'hidden';
  };
  const closeMobileNav = () => {
    if (!mobileNavOverlay) return;
    mobileNavOverlay.classList.remove('open');
    mobileNavOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  if (hamburger && mobileNavOverlay) {
    hamburger.addEventListener('click', openMobileNav);
    // Close when clicking outside the panel
    mobileNavOverlay.addEventListener('click', function (e) {
      if (e.target === mobileNavOverlay) closeMobileNav();
    });
    // Close when clicking a link
    const mobileNavLinks = mobileNavOverlay.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
    // Staggered reveal on open
    hamburger.addEventListener('click', function () {
      const items = mobileNavOverlay.querySelectorAll('.mobile-nav-item');
      items.forEach(function (item) {
        item.classList.remove('show');
      });
      setTimeout(function () {
        items.forEach(function (item, idx) {
          setTimeout(function () {
            item.classList.add('show');
          }, 80 + idx * 70);
        });
      }, 10);
    });
  }

  // === TIMELINE ANIMATIONS (Experience Images) ===
  const timelineEntries = document.querySelectorAll('.timeline-entry');
  timelineEntries.forEach(function (entry) {
    entry.style.opacity = '0';
    entry.style.transform = 'translateY(30px)';
    entry.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const timelineObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.3 });

  timelineEntries.forEach(function (entry) {
    timelineObserver.observe(entry);
  });

  // === VOLUNTEERING POPUPS ===
  const tiles = document.querySelectorAll('.vol-gallery-tile');

  tiles.forEach(function (tile) {
    tile.onclick = function () {
      const orgId = this.getAttribute('data-org');
      const modal = document.getElementById('vol-modal-overlay-' + orgId);
      if (modal) {
        // Move overlay to body to avoid stacking/containment issues
        if (modal.parentElement !== document.body) {
          document.body.appendChild(modal);
        }
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    };
    // Keyboard support for accessibility (Enter/Space to open)
    tile.onkeydown = function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const orgId = this.getAttribute('data-org');
        const modal = document.getElementById('vol-modal-overlay-' + orgId);
        if (modal) {
          if (modal.parentElement !== document.body) {
            document.body.appendChild(modal);
          }
          modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      }
    };
  });

  // Close modals
  const overlays = document.querySelectorAll('.vol-modal-overlay');

  overlays.forEach(function (overlay) {
    overlay.onclick = function (e) {
      if (e.target === this) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    };
  });

  // Escape key
  document.onkeydown = function (e) {
    if (e.key === 'Escape') {
      overlays.forEach(function (overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
      // Close mobile nav if open
      if (mobileNavOverlay && mobileNavOverlay.classList.contains('open')) {
        closeMobileNav();
      }
      // Close nav menu if open
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger && hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  };

  // === PROFILE IMAGE ANIMATION ===
  const profileImage = document.getElementById('profile-image');
  if (profileImage && window.innerWidth > 768) {
    let targetX = 0;
    let currentX = 0;
    const maxShift = 10;
    const speed = 0.10;

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

    window.addEventListener('mousemove', handleMouseMove);
    animateProfileImage();
  }

  // === HOME ROLE ROTATOR ===
  (function () {
    const roleEl = document.getElementById('role-rotator');
    if (!roleEl) return;
    const roles = [
      'Software Engineer.',
      'Associate Product Manager.'
    ];
    let i = 0;
    function switchRole() {
      const next = (i + 1) % roles.length;
      roleEl.classList.add('fade-out');
      setTimeout(() => {
        roleEl.textContent = roles[next];
        roleEl.classList.remove('fade-out');
        roleEl.classList.add('fade-in');
        setTimeout(() => roleEl.classList.remove('fade-in'), 260);
        i = next;
      }, 220);
    }
    setInterval(switchRole, 2600);
  })();
});

// كود IntersectionObserver الجديد:
(function () {
  'use strict';
  const headerNav = document.querySelector('.nav-menu');
  if (!headerNav) return;
  const navLinksHeader = Array.from(headerNav.querySelectorAll('.nav-link'));
  const headerSectionIds = navLinksHeader.map(link => link.getAttribute('href').replace('#', ''));
  const headerSections = headerSectionIds.map(id => document.getElementById(id)).filter(Boolean);

  // إعداد المراقب
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // يجعل التفعيل عند دخول القسم أعلى الثلث العلوي من الشاشة
    threshold: 0
  };

  function setActive(id) {
    navLinksHeader.forEach(link => {
      const href = link.getAttribute('href').replace('#', '').toLowerCase().trim();
      if (id && id.toLowerCase().trim() === href) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, observerOptions);

  headerSections.forEach(section => observer.observe(section));

  navLinksHeader.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const target = document.getElementById(href.replace('#', ''));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
