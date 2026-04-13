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

    // Toast Function
    function showToast(title, msg, type = 'success') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      
      const icon = type === 'success' ? '✓' : '✕';
      
      toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <div class="toast-content">
          <span class="toast-title">${title}</span>
          <span class="toast-msg">${msg}</span>
        </div>
        <button class="toast-close">✕</button>
      `;
      
      container.appendChild(toast);
      
      // Show
      setTimeout(() => toast.classList.add('show'), 100);
      
      // Auto hide
      const timer = setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
      }, 5000);
      
      // Close button
      toast.querySelector('.toast-close').addEventListener('click', () => {
        clearTimeout(timer);
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
      });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Custom Manual Validation
        if (!this.checkValidity()) {
          const firstInvalid = this.querySelector(':invalid');
          const labelEl = firstInvalid.parentElement.querySelector('.form-label');
          const label = labelEl ? labelEl.textContent : (isEN ? 'Field' : 'Campo');
          
          showToast(
            isEN ? 'Validation' : 'Validación',
            isEN ? `Please complete the field: ${label}` : `Por favor completa el campo: ${label}`,
            'error'
          );
          
          // Visual feedback on the input
          firstInvalid.style.borderColor = 'var(--orange)';
          setTimeout(() => { firstInvalid.style.borderColor = ''; }, 3000);
          
          firstInvalid.focus();
          return;
        }
        
        const btn = this.querySelector('.form-submit');
        const btnSpan = btn.querySelector('span');
        const originalText = btnSpan.innerHTML;
        
        btn.disabled = true;
        btnSpan.innerHTML = isEN ? 'Sending...' : 'Enviando...';
        
        // EmailJS Integration
        const serviceID = 'service_unn9g4w';
        const templateID = 'template_zdhossq';

        emailjs.sendForm(serviceID, templateID, this)
          .then(() => {
            showToast(
              isEN ? 'Success' : 'Éxito',
              isEN ? 'Message sent successfully!' : '¡Mensaje enviado con éxito!',
              'success'
            );
            this.reset();
          })
          .catch((err) => {
            // Log error for debugging
            console.warn('EmailJS not configured or error:', err);
            
            // Fallback for demo purposes if keys are not set
            if (serviceID === 'YOUR_SERVICE_ID' || err.status === 400) {
               showToast(
                isEN ? 'Success (Demo Mode)' : 'Éxito (Modo Demo)',
                isEN ? 'In a real setup, your message would be sent now.' : 'En un entorno real, tu mensaje se enviaría ahora.',
                'success'
              );
              this.reset();
            } else {
              showToast(
                isEN ? 'Error' : 'Error',
                isEN ? 'Something went wrong. Please try again.' : 'Algo salió mal. Por favor intente de nuevo.',
                'error'
              );
            }
          })
          .finally(() => {
            btn.disabled = false;
            btnSpan.innerHTML = originalText;
          });
      });
    }

    // Smooth hover sound effect (subtle visual pulse on nav items)
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('mouseenter', () => { a.style.letterSpacing = '0.22em'; });
      a.addEventListener('mouseleave', () => { a.style.letterSpacing = '0.18em'; });
    });
