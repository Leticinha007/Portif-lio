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

  const POINTS = 1800;

  let rotation = 0;

  // Cria pontos aleatórios na esfera
  const particles = [];

  for (let i = 0; i < POINTS; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    particles.push({
      theta,
      phi
    });
  }

  function project(theta, phi) {
    // Coordenadas 3D
    const x =
      R * Math.sin(phi) * Math.cos(theta + rotation);

    const y =
      R * Math.cos(phi);

    const z =
      R * Math.sin(phi) * Math.sin(theta + rotation);

    // Perspectiva
    const scale = 0.7 + ((z + R) / (2 * R)) * 0.6;

    return {
      x: cx + x,
      y: cy + y,
      z,
      scale
    };
  }

  function drawGlow(x, y, size, alpha) {
    const glow = ctx.createRadialGradient(
      x,
      y,
      0,
      x,
      y,
      size * 4
    );

    glow.addColorStop(
      0,
      `rgba(57,255,20,${alpha})`
    );

    glow.addColorStop(
      1,
      'rgba(57,255,20,0)'
    );

    ctx.fillStyle = glow;

    ctx.beginPath();
    ctx.arc(x, y, size * 4, 0, Math.PI * 2);
    ctx.fill();
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    // Fundo transparente
    ctx.save();

    // Desenha partículas
    particles.forEach((p) => {
      const pos = project(p.theta, p.phi);

      // brilho baseado na profundidade
      const alpha = 0.15 + ((pos.z + R) / (2 * R)) * 0.85;

      const size = 0.7 + pos.scale * 1.2;

      // glow
      drawGlow(pos.x, pos.y, size, alpha * 0.25);

      // ponto principal
      ctx.beginPath();

      ctx.fillStyle =
        `rgba(57,255,20,${alpha})`;

      ctx.arc(
        pos.x,
        pos.y,
        size,
        0,
        Math.PI * 2
      );

      ctx.fill();
    });

    // brilho externo
    const outerGlow = ctx.createRadialGradient(
      cx,
      cy,
      R * 0.7,
      cx,
      cy,
      R * 1.2
    );

    outerGlow.addColorStop(
      0,
      'rgba(57,255,20,0)'
    );

    outerGlow.addColorStop(
      1,
      'rgba(57,255,20,0.08)'
    );

    ctx.fillStyle = outerGlow;

    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    rotation += 0.0035;

    requestAnimationFrame(frame);
  }

  frame();
})();
