document.addEventListener('DOMContentLoaded', () => {
  const toggle   = document.querySelector('.nav-toggle');
  const panel    = document.getElementById('offcanvas');
  const closeBtn = panel?.querySelector('.nav-close');
  const backdrop = document.querySelector('.backdrop');
  const links    = panel?.querySelectorAll('.nav-link') || [];

  function openMenu(){
    panel.classList.add('open');
    panel.setAttribute('aria-hidden','false');
    toggle?.setAttribute('aria-expanded','true');
    backdrop.classList.add('show');
    links[0]?.focus();
  }
  function closeMenu(){
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden','true');
    toggle?.setAttribute('aria-expanded','false');
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

  // “On click, bold persists” — mark clicked link as .current
  links.forEach(a => {
    a.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('current'));
      a.classList.add('current');
      // optional: close the menu after clicking
      closeMenu();
    });
  });
});
