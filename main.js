/* ═══════════════════════════════════════════
   GRANDIFY — MAIN.JS  (Light theme edition)
═══════════════════════════════════════════ */

/* ── NAVBAR SCROLL BORDER ── */
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });

/* ── MOBILE DRAWER ── */
const hamburger      = document.getElementById('hamburger');
const drawer         = document.getElementById('drawer');
const drawerOverlay  = document.getElementById('drawerOverlay');

function openDrawer() {
  drawer.classList.add('open');
  drawerOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
  // Animate to X
  const [a, b] = hamburger.querySelectorAll('span');
  a.style.transform = 'translateY(3.75px) rotate(45deg)';
  b.style.transform = 'translateY(-3.75px) rotate(-45deg)';
}

function closeDrawer() {
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('visible');
  document.body.style.overflow = '';
  hamburger.querySelectorAll('span').forEach(s => s.style.transform = '');
}

hamburger.addEventListener('click', () =>
  drawer.classList.contains('open') ? closeDrawer() : openDrawer()
);
drawerOverlay.addEventListener('click', closeDrawer);
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');

const revealIO = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;
    const delay = parseInt(target.dataset.delay ?? 0, 10);
    setTimeout(() => target.classList.add('visible'), delay);
    revealIO.unobserve(target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

revealEls.forEach(el => revealIO.observe(el));

/* ── STAT COUNTERS ── */
const counters = document.querySelectorAll('.count');

const countIO = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;
    animateCount(target);
    countIO.unobserve(target);
  });
}, { threshold: 0.6 });

counters.forEach(el => countIO.observe(el));

function animateCount(el) {
  const end      = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const t0       = performance.now();

  (function tick(now) {
    const p = Math.min((now - t0) / duration, 1);
    // ease-out quart
    const e = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(e * end);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = end;
  })(t0);
}

/* ── CONTACT FORM ── */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn      = form.querySelector('button[type="submit"]');
  btn.disabled   = true;
  btn.textContent = 'Sending…';

  // Replace timeout with real fetch / EmailJS call
  setTimeout(() => {
    form.style.display = 'none';
    formSuccess.classList.add('show');
  }, 1100);
});

/* ── ACTIVE NAV LINKS ── */
const sections = [...document.querySelectorAll('section[id]')];
const navAs    = [...document.querySelectorAll('.nav-links a[href^="#"]')];

const sectionIO = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;
    navAs.forEach(a => {
      const active = a.getAttribute('href') === `#${target.id}`;
      if (!a.classList.contains('nav-cta')) {
        a.style.color = active ? 'var(--gray-900)' : '';
      }
    });
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionIO.observe(s));
