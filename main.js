// REAL ESTATE MAROC - Shared JS

// Mobile navigation toggle + animate icon
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (navToggle && nav) {
  const toggleMenu = (force) => {
    const open = typeof force === 'boolean' ? force : !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  navToggle.addEventListener('click', () => toggleMenu());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });
}

// Highlight active nav link by pathname
const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === current) a.classList.add('active');
});

// Reveal on scroll for elements with .reveal
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contact form validation and mailto fallback
const form = document.querySelector('#contact-form');
if (form) {
  const nameEl = form.querySelector('#name');
  const emailEl = form.querySelector('#email');
  const phoneEl = form.querySelector('#phone');
  const msgEl = form.querySelector('#message');
  const status = form.querySelector('#form-status');

  const setError = (el, msg) => {
    const field = el.closest('.field');
    field.classList.add('invalid');
    field.querySelector('.error').textContent = msg;
  };
  const clearError = (el) => {
    const field = el.closest('.field');
    field.classList.remove('invalid');
  };

  const emailOk = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const phoneOk = (val) => /^\+?[0-9\s()-]{6,}$/.test(val);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    clearError(nameEl); clearError(emailEl); clearError(phoneEl); clearError(msgEl);

    if (!nameEl.value.trim()) { setError(nameEl, 'Please enter your name.'); ok = false; }
    if (!emailEl.value.trim() || !emailOk(emailEl.value.trim())) { setError(emailEl, 'Enter a valid email.'); ok = false; }
    if (phoneEl.value.trim() && !phoneOk(phoneEl.value.trim())) { setError(phoneEl, 'Enter a valid phone number.'); ok = false; }
    if (!msgEl.value.trim()) { setError(msgEl, 'Please write a message.'); ok = false; }

    if (!ok) return;

    // Success UI feedback
    status.textContent = 'Thank you. Your message is ready to send via email.';
    status.classList.add('success');

    // Compose mailto with the form content
    const to = 'support@reelestatemaroc.org'; // Official support email
    const subject = encodeURIComponent('Website Contact - REAL ESTATE MAROC');
    const body = encodeURIComponent(
      `Name: ${nameEl.value.trim()}\nEmail: ${emailEl.value.trim()}\nPhone: ${phoneEl.value.trim()}\n\nMessage:\n${msgEl.value.trim()}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    form.reset();
  });
}

// Back to top button
const backBtn = document.getElementById('backToTop');
if (backBtn) {
  const onScroll = () => {
    if (window.scrollY > 300) backBtn.classList.add('show');
    else backBtn.classList.remove('show');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  onScroll();
}
