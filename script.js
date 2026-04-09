// Cursor
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
    function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); }
    animRing();

    // Navbar scroll
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 50); });

    // Mobile menu
    document.getElementById('menuBtn').addEventListener('click', () => document.getElementById('mobileMenu').classList.add('open'));
    document.getElementById('menuClose').addEventListener('click', closeMobileMenu);
    function closeMobileMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // Language toggle
    let isEN = true;
    function toggleLang() {
      isEN = !isEN;
      document.getElementById('langBtn').textContent = isEN ? 'ES' : 'EN';
      const lang = isEN ? 'en' : 'es';
      document.querySelectorAll('[data-en]').forEach(el => {
        const val = el.getAttribute('data-' + lang);
        if (val) { el.innerHTML = val; }
      });
      document.querySelectorAll('[data-placeholder-en]').forEach(el => {
        el.placeholder = el.getAttribute('data-placeholder-' + lang) || el.placeholder;
      });
    }

    // Form
    function handleFormSubmit(btn) {
      const originalText = btn.querySelector('span').textContent;
      btn.querySelector('span').textContent = isEN ? 'Sending...' : 'Enviando...';
      btn.disabled = true;
      setTimeout(() => {
        btn.querySelector('span').textContent = isEN ? 'Message Sent âœ“' : 'Mensaje Enviado ✓'
        btn.style.background = '#1a6e3c';
        setTimeout(() => {
          btn.querySelector('span').textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    }

    // Smooth hover sound effect (subtle visual pulse on nav items)
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('mouseenter', () => { a.style.letterSpacing = '0.22em'; });
      a.addEventListener('mouseleave', () => { a.style.letterSpacing = '0.18em'; });
    });
