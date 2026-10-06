/* ==========================================================================
   ROYAL GRAND EVENTS - INTERACTIVE SCRIPT
   - Royal Intro Experience & Gold Particle Engine
   - WhatsApp Quick Quote Generator
   - Mobile Navigation Drawer
   - Gallery Lightbox Preview
   - Header Scroll States
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initRoyalIntro();
  initMobileNavigation();
  initScrollHeader();
  initGalleryLightbox();
});

/* ==========================================================================
   1. ROYAL INTRO SEQUENCE & GOLDEN SPARKLES CANVAS
   ========================================================================== */
function initRoyalIntro() {
  const introEl = document.getElementById('royal-intro');
  const enterBtn = document.getElementById('btn-enter-site');
  const skipBtn = document.getElementById('btn-skip-intro');
  const replayBtn = document.getElementById('btn-replay-intro');
  const progressBar = document.getElementById('intro-progress-bar');
  const canvas = document.getElementById('intro-particles-canvas');

  if (!introEl) return;

  // Golden Particle Canvas
  let animationFrameId;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(window.innerWidth < 768 ? 40 : 80, 100);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        color: Math.random() > 0.4 ? '#F3E5AB' : '#D4AF37',
        speedY: Math.random() * 0.8 + 0.3,
        speedX: (Math.random() - 0.5) * 0.6,
        opacity: Math.random() * 0.8 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        angle: Math.random() * Math.PI * 2
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.angle += p.pulseSpeed;
        p.y -= p.speedY;
        p.x += Math.sin(p.angle) * 0.4;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * (0.6 + Math.sin(p.angle) * 0.4);
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  // Trigger progress bar fill
  setTimeout(() => {
    if (progressBar) progressBar.style.width = '100%';
  }, 100);

  // Auto transition after 3.2 seconds
  const autoDismissTimer = setTimeout(() => {
    closeIntro();
  }, 3200);

  function closeIntro() {
    clearTimeout(autoDismissTimer);
    introEl.classList.add('fade-out');
    setTimeout(() => {
      introEl.style.display = 'none';
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    }, 850);
  }

  if (enterBtn) enterBtn.addEventListener('click', closeIntro);
  if (skipBtn) skipBtn.addEventListener('click', closeIntro);

  // Replay Intro button
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      introEl.style.display = 'flex';
      introEl.classList.remove('fade-out');
      if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.transition = 'width 2.4s linear';
          progressBar.style.width = '100%';
        }, 50);
      }
      setTimeout(closeIntro, 3400);
    });
  }
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-nav-btn');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function openMenu() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   3. STICKY HEADER SCROLL STATE
   ========================================================================== */
function initScrollHeader() {
  const header = document.getElementById('royal-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}



/* ==========================================================================
   5. GALLERY LIGHTBOX
   ========================================================================== */
function initGalleryLightbox() {
  const modal = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!modal || !lightboxImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      if (src) {
        lightboxImg.src = src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
