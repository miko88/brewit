// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('open');
});

// Close menu on link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('open');
  });
});

// Header shadow on scroll
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Contact form — AJAX submit via Formspree
const lang = document.documentElement.lang === 'en' ? 'en' : 'sk';
const t = {
  sk: {
    sending: 'Odosielam...',
    error: 'Nepodarilo sa odoslať správu. Skúste to znova neskôr.'
  },
  en: {
    sending: 'Sending...',
    error: 'Failed to send message. Please try again later.'
  }
}[lang];

document.querySelectorAll('.contact-form').forEach(form => {
  const success = form.parentElement.querySelector('.form-success');
  const button = form.querySelector('button[type="submit"]');
  const errorBox = form.querySelector('.form-error');
  const originalLabel = button ? button.textContent : '';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (errorBox) errorBox.hidden = true;
    button.disabled = true;
    button.textContent = t.sending;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('network');

      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } catch (err) {
      button.disabled = false;
      button.textContent = originalLabel;
      if (errorBox) {
        errorBox.textContent = t.error;
        errorBox.hidden = false;
      }
    }
  });
});
