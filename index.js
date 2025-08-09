document.addEventListener('DOMContentLoaded', () => {
  /* ====== OFFCANVAS NAV ====== */
  const toggle   = document.querySelector('.nav-toggle');
  const panel    = document.getElementById('offcanvas');
  const closeBtn = panel?.querySelector('.nav-close');
  const backdrop = document.querySelector('.backdrop');
  const links    = panel?.querySelectorAll('.nav-link') || [];

  const openMenu = () => {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden','false');
    toggle?.setAttribute('aria-expanded','true');
    backdrop.classList.add('show');
    links[0]?.focus();
  };
  const closeMenu = () => {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden','true');
    toggle?.setAttribute('aria-expanded','false');
    backdrop.classList.remove('show');
    toggle?.focus();
  };

  toggle?.addEventListener('click', () =>
    panel.classList.contains('open') ? closeMenu() : openMenu()
  );
  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeMenu();
  });
  links.forEach(a => {
    a.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('current'));
      a.classList.add('current');
      closeMenu();
    });
  });

  /* ====== HERO CAROUSEL (fade) ====== */
  const hero = document.querySelector('.hero');
  const slides = Array.from(document.querySelectorAll('#carousel .fade-slide'));
  if (slides.length) {
    let i = 0, timer;
    const DURATION = 4000;

    const show = (idx) => {
      slides.forEach((el, n) => el.classList.toggle('active', n === idx));
    };
    const next = () => { i = (i + 1) % slides.length; show(i); };
    const start = () => { timer = setInterval(next, DURATION); };
    const stop  = () => { clearInterval(timer); };

    show(0);
    start();
    hero?.addEventListener('mouseenter', stop);
    hero?.addEventListener('mouseleave', start);
  }
});
