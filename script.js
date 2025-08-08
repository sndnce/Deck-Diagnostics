document.addEventListener('DOMContentLoaded', () => {
    const toggle  = document.querySelector('.nav-toggle');
    const panel   = document.getElementById('offcanvas');
    const backdrop= document.querySelector('.backdrop');
    const closeBtn= document.querySelector('.nav-close');
    const links   = panel?.querySelectorAll('a') || [];
  
    function openMenu(){
      panel.classList.add('open');
      panel.setAttribute('aria-hidden','false');
      backdrop.classList.add('show');
      toggle.setAttribute('aria-expanded','true');
      // focus first link for accessibility
      links[0]?.focus();
    }
    function closeMenu(){
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden','true');
      backdrop.classList.remove('show');
      toggle.setAttribute('aria-expanded','false');
      toggle.focus();
    }
  
    toggle?.addEventListener('click', (e)=> {
      const open = panel.classList.contains('open');
      open ? closeMenu() : openMenu();
    });
    closeBtn?.addEventListener('click', closeMenu);
    backdrop?.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e)=> {
      if (e.key === 'Escape') closeMenu();
    });
  
    // auto-mark current page active in BOTH menus
    const here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.menu-list a, .footer-nav a').forEach(a=>{
      if (a.getAttribute('href') === here) a.classList.add('active');
    });
  });