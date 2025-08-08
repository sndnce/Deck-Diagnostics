document.addEventListener('DOMContentLoaded', () => {
    // --- Contact form handler (unchanged) ---
    const form  = document.getElementById('contactForm');
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
        if (!emailOK) { alert('Please enter a valid email.'); form.email.focus(); return; }
        await new Promise(r => setTimeout(r, 500));
        form.reset();
        if (toast) { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2800); }
      });
    }
  
    // --- Hours highlight (red glow on today's row), order- and spelling-agnostic ---
    const todayShort = new Date().toLocaleString('en-US', { weekday: 'short' }).toLowerCase(); // "mon"
    document.querySelectorAll('.hours-card .row').forEach(row => {
      const label = row.querySelector('strong')?.textContent.trim().toLowerCase();
      if (!label) return;
      // match either full name (monday) or short (mon)
      if (label.startsWith(todayShort)) {
        row.classList.add('today');
      }
    });
  });
  