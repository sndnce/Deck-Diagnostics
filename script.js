document.addEventListener('DOMContentLoaded', () => {
  // ===== CONTACT FORM HANDLER =====
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        name: (form.name?.value || '').trim(),
        email: (form.email?.value || '').trim(),
        message: (form.message?.value || '').trim(),
      };
      const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
      if (!emailOK) {
        alert('Please enter a valid email.');
        form.email.focus();
        return;
      }
      await new Promise(r => setTimeout(r, 500)); // Fake delay
      form.reset();
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2800);
      }
    });
  }

  // ===== TODAY'S HOURS HIGHLIGHT =====
  const todayShort = new Date().toLocaleString('en-US', { weekday: 'short' }).toLowerCase();
  document.querySelectorAll('.hours-card .row').forEach(row => {
    const label = row.querySelector('strong')?.textContent.trim().toLowerCase();
    if (label?.startsWith(todayShort)) {
      row.classList.add('today');
    }
  });

  // ===== OFFCANVAS NAVIGATION =====
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.getElementById('offcanvas');
  const closeBtn = panel?.querySelector('.nav-close');
  const backdrop = document.querySelector('.backdrop');
  const links = panel?.querySelectorAll('.nav-link') || [];

  function openMenu() {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    toggle?.setAttribute('aria-expanded', 'true');
    backdrop.classList.add('show');
    links[0]?.focus();
  }

  function closeMenu() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    toggle?.setAttribute('aria-expanded', 'false');
    backdrop.classList.remove('show');
    toggle?.focus();
  }

  toggle?.addEventListener('click', () => {
    panel.classList.contains('open') ? closeMenu() : openMenu();
  });
  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeMenu();
  });

  // Make clicked nav item persist as `.current`
  links.forEach(a => {
    a.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('current'));
      a.classList.add('current');
      closeMenu(); // optional: auto-close after clicking
    });
  });

  // ===== HERO CAROUSEL (FADE EFFECT) =====
  const hero = document.querySelector('.hero');
  const slides = Array.from(document.querySelectorAll('#carousel .fade-slide'));
  if (slides.length) {
    let i = 0, timer;
    const DURATION = 4000;

    const show = (idx) => {
      slides.forEach((el, n) => el.classList.toggle('active', n === idx));
    };
    const next = () => {
      i = (i + 1) % slides.length;
      show(i);
    };
    const start = () => { timer = setInterval(next, DURATION); };
    const stop = () => { clearInterval(timer); };

    show(0);
    start();
    hero?.addEventListener('mouseenter', stop);
    hero?.addEventListener('mouseleave', start);
  }
});

