/* ========== SCROLL REVEAL ========== */
(function () {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  els.forEach(el => io.observe(el));
})();

/* ========== NAVBAR ========== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ========== HAMBURGER ========== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger && hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks && navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ========== HERO BG SWITCHER ========== */
let currentBg = 0;
const bgImgs = document.querySelectorAll('.hero-bg-img');
const dots    = document.querySelectorAll('.hero-dots .dot');

function switchBg(idx) {
  bgImgs[currentBg].classList.remove('active');
  dots[currentBg].classList.remove('active');
  currentBg = (idx + bgImgs.length) % bgImgs.length;
  bgImgs[currentBg].classList.add('active');
  dots[currentBg].classList.add('active');
}
let heroTimer = setInterval(() => switchBg(currentBg + 1), 5000);
dots.forEach((d, i) => d.addEventListener('click', () => {
  clearInterval(heroTimer);
  switchBg(i);
  heroTimer = setInterval(() => switchBg(currentBg + 1), 5000);
}));

/* ========== GALLERY SLIDER ========== */
const slides  = Array.from(document.querySelectorAll('.gal-slide'));
const galDots = document.getElementById('galDots');
let curSlide  = 0;

// Build dots
if (galDots && slides.length) {
  slides.forEach((_, i) => {
    const d = document.createElement('span');
    if (i === 0) d.classList.add('active');
    d.addEventListener('click', () => goSlide(i));
    galDots.appendChild(d);
  });
}

function goSlide(idx) {
  slides.forEach(s => s.classList.remove('active', 'prev', 'next'));
  galDots && galDots.querySelectorAll('span').forEach(d => d.classList.remove('active'));
  curSlide = (idx + slides.length) % slides.length;
  const p = (curSlide - 1 + slides.length) % slides.length;
  const n = (curSlide + 1) % slides.length;
  slides[curSlide].classList.add('active');
  slides[p].classList.add('prev');
  slides[n].classList.add('next');
  const dotEls = galDots && galDots.querySelectorAll('span');
  if (dotEls) dotEls[curSlide].classList.add('active');
}

function slideGal(dir) { goSlide(curSlide + dir); }
goSlide(0); // Init

/* ========== FORM SUBMIT ========== */
function handleForm(e, form) {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
    btn.style.background = '#2D5016';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 3000);
  }, 1500);
}

/* ========== SMOOTH SCROLL ========== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ========== PARALLAX HERO ========== */
const activeBg = () => document.querySelector('.hero-bg-img.active');
window.addEventListener('scroll', () => {
  const bg = activeBg();
  if (bg && window.scrollY < window.innerHeight) {
    bg.style.transform = `scale(1.08) translateY(${window.scrollY * 0.15}px)`;
  }
}, { passive: true });
