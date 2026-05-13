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
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const result = document.getElementById('formResult');
      const origHTML = btn ? btn.innerHTML : '';
      if (btn) { btn.innerHTML = 'Sending…'; btn.disabled = true; }
      if (result) { result.style.display = 'none'; }
      const data = new FormData(form);
      try {
        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
        const json = await res.json();
        if (json.success) {
          if (result) {
            result.style.display = 'block';
            result.style.background = '#EAF3DE';
            result.style.color = '#3B6D11';
            result.style.border = '1px solid #3B6D11';
            result.innerHTML = '✓ Thank you — your enquiry has been sent to Natalie. She will be in touch shortly.';
          }
          form.reset();
          const counter = document.getElementById('msgCounter');
          if (counter) counter.textContent = '0';
        } else {
          if (result) {
            result.style.display = 'block';
            result.style.background = '#FCEBEB';
            result.style.color = '#A32D2D';
            result.style.border = '1px solid #A32D2D';
            result.innerHTML = 'Something went wrong — please call Natalie directly on 07890 178306 or email natalie@feetfirstsurgery.co.uk';
          }
        }
      } catch (err) {
        if (result) {
          result.style.display = 'block';
          result.style.background = '#FCEBEB';
          result.style.color = '#A32D2D';
          result.style.border = '1px solid #A32D2D';
          result.innerHTML = 'Could not send — please call Natalie on 07890 178306 or email natalie@feetfirstsurgery.co.uk';
        }
      }
      if (btn) { btn.innerHTML = origHTML; btn.disabled = false; }
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
