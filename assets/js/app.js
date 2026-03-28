/* ============================================================
   FeetFirst Surgery — app.js
   Shared JS: active nav, FAQ accordion, enquiry form,
              maps button, cookie banner, scroll-to-map
   ============================================================ */

/* ── Active navigation state ── */
(function() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const navLinks = document.querySelectorAll('.site-nav a[data-page]');
  const pageMap = {
    '':              'home',
    '/services':     'services',
    '/how-it-works': 'how-it-works',
    '/pricing':      'pricing',
    '/about':        'about',
    '/reviews':      'reviews',
    '/book-enquiry': 'contact',
    '/privacy':      'privacy',
    '/cookies':      'cookies',
  };
  const currentPage = pageMap[path] || 'home';
  navLinks.forEach(a => {
    if (a.dataset.page === currentPage) a.classList.add('active');
  });
})();

/* ── Mobile nav toggle ── */
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = btn.classList.contains('open');
      // Close all others
      document.querySelectorAll('.faq-question.open').forEach(b => {
        b.classList.remove('open');
        b.closest('.faq-item').querySelector('.faq-answer').classList.remove('open');
      });
      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
      }
    });
  });

  /* ── Enquiry form ── */
  const form = document.getElementById('enquiryForm');
  if (form) {
    // Character counter
    const msgTa = document.getElementById('message');
    const msgCounter = document.getElementById('msgCounter');
    if (msgTa && msgCounter) {
      msgTa.addEventListener('input', () => {
        msgCounter.textContent = msgTa.value.length;
      });
    }
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const v = (n) => (this.querySelector('[name="' + n + '"]')?.value || '').trim();
      const subject = encodeURIComponent('Surgery Enquiry — ' + v('name'));
      const body = encodeURIComponent(
'FeetFirst Surgery — New Enquiry\n' +
'================================\n' +
'Name:           ' + v('name') + '\n' +
'Email:          ' + v('email') + '\n' +
'Phone:          ' + (v('phone') || 'Not provided') + '\n\n' +
'Message:\n' + v('message') + '\n\n' +
'---\nSent via feetfirstsurgery.co.uk');
      window.location.href = 'mailto:Natalie@feetfirstsurgery.co.uk?subject=' + subject + '&body=' + body;
    });
  }

  /* ── Maps button (device-aware) ── */
  const link = document.getElementById('openMapsBtn');
  if (link) {
    const label = 'FeetFirst Surgery';
    const appleUrl = 'https://maps.apple.com/?ll=52.465686,0.100939&q=' + encodeURIComponent(label);
    const googleUrl = 'https://www.google.com/maps/search/?api=1&query=52.465686%2C0.100939';
    const ua = navigator.userAgent || '';
    const isApple = /iPad|iPhone|iPod|Macintosh/.test(ua) && !/Windows/.test(ua);
    link.href = isApple ? appleUrl : googleUrl;
    link.textContent = isApple ? 'Open in Apple Maps' : 'Open in Google Maps';
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
  }

  /* ── Scroll to map if arriving via footer address link ── */
  if (window.location.hash === '#map') {
    const el = document.getElementById('openMapsBtn');
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350);
    }
  }

  /* ── Cookie banner ── */
  const banner = document.getElementById('cookieBanner');
  if (banner && !localStorage.getItem('ffs_cookies')) {
    setTimeout(() => banner.classList.add('show'), 1500);
  }
  document.getElementById('cookieAccept')?.addEventListener('click', () => {
    localStorage.setItem('ffs_cookies', 'accepted');
    banner?.classList.remove('show');
  });
  document.getElementById('cookieDecline')?.addEventListener('click', () => {
    localStorage.setItem('ffs_cookies', 'declined');
    banner?.classList.remove('show');
  });

  /* ── Scroll fade-in animations ── */
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.animation = 'fadeInUp 0.6s ease both';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => {
      el.style.opacity = '0';
      obs.observe(el);
    });
  }

});
