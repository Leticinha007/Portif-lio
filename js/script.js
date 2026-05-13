// ===== NAVEGAÇÃO COM BLUR AO ROLAR =====
const nav = document.querySelector('nav#navigation');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scroll', window.scrollY > 0);
});

// ===== BOTÃO VOLTAR AO TOPO =====
const backToTopButton = document.getElementById('backToTopButton');

window.addEventListener('scroll', () => {
  backToTopButton.classList.toggle('show', window.scrollY > 500);
});

// ===== MENU MOBILE =====
const openMenuBtn = document.querySelector('.open-menu');
const closeMenuBtn = document.querySelector('.close-menu');

openMenuBtn.addEventListener('click', () => {
  document.body.classList.add('menu-expanded');
});

closeMenuBtn.addEventListener('click', () => {
  document.body.classList.remove('menu-expanded');
});

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('menu-expanded');
  });
});

// ===== TOGGLE TEMA CLARO/ESCURO =====
const checkbox = document.getElementById('sw-checkbox');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  checkbox.checked = true;
}

checkbox.addEventListener('change', function () {
  if (this.checked) {
    document.body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
  }
});

// ===== LINK ATIVO NO MENU =====
function setActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav .menu ul:first-child a');
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`nav .menu ul:first-child a[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', setActiveNavLink);

// ===== SCROLL REVEAL =====
const sr = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: false,
});

sr.reveal('#home .col-a',       { delay: 200 });
sr.reveal('#home .col-b',       { delay: 500, origin: 'right' });

sr.reveal('#about header',      { delay: 200, origin: 'left' });
sr.reveal('#about .content',    { delay: 300, origin: 'left' });
sr.reveal('#about .col-b',      { delay: 400, origin: 'right' });

sr.reveal('#projects header',   { delay: 200 });
sr.reveal('#projects .card',    { delay: 200, interval: 150 });
sr.reveal('#projects .button',  { delay: 200 });

sr.reveal('#certificates header', { delay: 200 });
sr.reveal('#certificates .card', { delay: 200, interval: 150 });

sr.reveal('#knowledge header',  { delay: 200 });
sr.reveal('#knowledge .card',   { delay: 200, interval: 150 });

sr.reveal('#contact .col-a',    { delay: 200, origin: 'left' });
sr.reveal('#contact .col-b',    { delay: 400, origin: 'right' });

sr.reveal('footer .col-a',      { delay: 200, origin: 'left' });
sr.reveal('footer .col-b',      { delay: 400, origin: 'right' });

// ===== GLOBO 3D DE PARTÍCULAS =====
(function () {
  const canvas = document.getElementById('globe-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2;
  const R = W * 0.36;
  const POINTS = 1000;
  const BUCKETS = 8;
  const TARGET_MS = 1000 / 30; // 30fps

  let rotation = 0;
  let lastTime = 0;

  const particles = [];
  for (let i = 0; i < POINTS; i++) {
    particles.push({
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(Math.random() * 2 - 1),
    });
  }

  // Glow externo pré-criado uma vez
  const outerGlow = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.2);
  outerGlow.addColorStop(0, 'rgba(57,255,20,0)');
  outerGlow.addColorStop(1, 'rgba(57,255,20,0.09)');

  function frame(now) {
    requestAnimationFrame(frame);
    if (now - lastTime < TARGET_MS) return;
    lastTime = now;

    ctx.clearRect(0, 0, W, H);

    // Projeta todas as partículas e agrupa por bucket de alpha
    const buckets = Array.from({ length: BUCKETS }, () => []);

    for (let i = 0; i < POINTS; i++) {
      const p = particles[i];
      const sinPhi = Math.sin(p.phi);
      const x = R * sinPhi * Math.cos(p.theta + rotation);
      const y = R * Math.cos(p.phi);
      const z = R * sinPhi * Math.sin(p.theta + rotation);
      const t = (z + R) / (2 * R);           // 0 (fundo) → 1 (frente)
      const alpha = 0.12 + t * 0.88;
      const size  = 0.6 + t * 1.6;
      const bi = Math.min(BUCKETS - 1, (t * BUCKETS) | 0);
      buckets[bi].push(cx + x, cy + y, size);
    }

    // Um beginPath + fill por bucket (8 draws em vez de 1000)
    ctx.fillStyle = 'rgb(57,255,20)';
    for (let b = 0; b < BUCKETS; b++) {
      const alpha = (b + 0.5) / BUCKETS;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      const arr = buckets[b];
      for (let j = 0; j < arr.length; j += 3) {
        ctx.moveTo(arr[j] + arr[j + 2], arr[j + 1]);
        ctx.arc(arr[j], arr[j + 1], arr[j + 2], 0, Math.PI * 2);
      }
      ctx.fill();
    }

    // Halo externo (um único gradient pré-compilado)
    ctx.globalAlpha = 1;
    ctx.fillStyle = outerGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2);
    ctx.fill();

    rotation += 0.007;
  }

  requestAnimationFrame(frame);
})();
