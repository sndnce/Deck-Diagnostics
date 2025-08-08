document.addEventListener('DOMContentLoaded', () => {
    const slides = Array.from(document.querySelectorAll('#carousel .fade-slide'));
    if (!slides.length) return;
  
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 4000);
  });