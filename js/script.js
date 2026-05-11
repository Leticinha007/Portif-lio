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

sr.reveal('#knowledge header',  { delay: 200 });
sr.reveal('#knowledge .card',   { delay: 200, interval: 150 });

sr.reveal('#contact .col-a',    { delay: 200, origin: 'left' });
sr.reveal('#contact .col-b',    { delay: 400, origin: 'right' });

sr.reveal('footer .col-a',      { delay: 200, origin: 'left' });
sr.reveal('footer .col-b',      { delay: 400, origin: 'right' });
