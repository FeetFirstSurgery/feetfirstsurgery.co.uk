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
      const name = v('name');
      const email = v('email');
      const phone = v('phone') || 'Not provided';
      const message = v('message');
      const subject = encodeURIComponent('Surgery Enquiry — ' + name);
      const body = encodeURIComponent(
'FeetFirst Surgery — New Enquiry\n' +
'================================\n' +
'Name:           ' + name + '\n' +
'Email:          ' + email + '\n' +
'Phone:          ' + phone + '\n\n' +
'Message:\n' + message + '\n\n' +
'---\nSent via feetfirstsurgery.co.uk');
      const mailtoUrl = 'mailto:natalie@feetfirstsurgery.co.uk?subject=' + subject + '&body=' + body;
      const a = document.createElement('a');
      a.href = mailtoUrl;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => document.body.removeChild(a), 200);
      const btn = form.querySelector('.form-submit');
      const origHTML = btn ? btn.innerHTML : '';
      if (btn) {
        btn.innerHTML = '&#10003; Email client opening…';
        btn.disabled = true;
        setTimeout(() => { btn.innerHTML = origHTML; btn.disabled = false; }, 3500);
      }
    });
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
