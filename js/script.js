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
const themeBtn = document.getElementById('theme-toggle');

function safeGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch (e) { /* sem storage */ }
}

// ícone da aba acompanha o tema do site
const favicon = document.getElementById('favicon');
function updateFavicon() {
  if (!favicon) return;
  const light = document.body.classList.contains('light-mode');
  favicon.href = light ? './images/favicon-light.png' : './images/favicon-dark.png';
}

if (safeGet('theme') === 'light') document.body.classList.add('light-mode');
updateFavicon();

themeBtn.addEventListener('click', () => {
  const light = document.body.classList.toggle('light-mode');
  safeSet('theme', light ? 'light' : 'dark');
  updateFavicon();
});

// ===== ANIMAÇÃO DE DIGITAÇÃO =====
// Ajusta a largura da animação ao tamanho do texto (muda com o idioma)
const typingEl = document.querySelector('#home .typing');

function restartTyping() {
  if (!typingEl) return;
  typingEl.style.setProperty('--typing-w', typingEl.scrollWidth + 'px');
  typingEl.classList.remove('typing');
  void typingEl.offsetWidth; // força o navegador a reiniciar a animação
  typingEl.classList.add('typing');
}

// ===== IDIOMA PT / EN =====
// O português fica no próprio HTML. Aqui estão só as traduções para inglês,
// usando o texto original em português como chave. Se você mudar um texto no
// HTML, atualize a chave correspondente aqui também (senão ele fica em português).
const EN = {
  // menu
  'Sobre': 'About',
  'Trajetória': 'Journey',
  'Projetos': 'Projects',
  'Contato': 'Contact',
  'Mudar tema': 'Toggle theme',
  'Abrir menu': 'Open menu',
  'Fechar menu': 'Close menu',

  // início
  '“Não havia escolha a não ser sermos pioneiros; não havia tempo para sermos iniciantes.”':
    '“There was no choice but to be pioneers; no time to be beginners.”',
  'Eu sou Letícia Rebeka,': "I'm Letícia Rebeka,",
  'Engenheira de Software': 'Software Engineer',
  'Fale comigo': 'Get in touch',
  'Globo animado': 'Animated globe',

  // sobre
  'Analyst Junior SAP IS-U WM na Accenture, com foco em SAP Utilities. Também atuo como desenvolvedora de software freelancer, criando sites e aplicações web para clientes. Cursando Análise e Desenvolvimento de Sistemas pela UNINTER, com experiência em JavaScript, Python, Java, Spring Boot, Angular e TypeScript.':
    'Junior SAP IS-U WM Analyst at Accenture, focused on SAP Utilities. I also work as a freelance software developer, building websites and web applications for clients. Studying Systems Analysis and Development at UNINTER, with experience in JavaScript, Python, Java, Spring Boot, Angular and TypeScript.',
  'Foto de Letícia Rebeka sorrindo': 'Photo of Letícia Rebeka smiling',

  // experiência
  'Atual': 'Current',
  'Atuo no projeto de implementação do SAP na Sabesp, maior empresa de saneamento do Brasil — construindo a solução SAP Utilities que vai sustentar cadastro, medição, faturamento e arrecadação de milhões de clientes. Configuração, requisitos e testes em squads ágeis, com SAP Fiori e SAP GUI.':
    "Part of the SAP implementation project at Sabesp, Brazil's largest sanitation company — building the SAP Utilities solution that will support registration, metering, billing and collections for millions of customers. Configuration, requirements and testing in agile squads, with SAP Fiori and SAP GUI.",
  '2026 — atual': '2026 — now',
  'Desenvolvedora de Software': 'Software Developer',
  "Criação de sites e aplicações web para clientes, como o site do salão D'Marvy.": "Building websites and web applications for clients, such as the D'Marvy salon website.",

  // projetos
  'O que eu construí': "What I've built",
  'Aqui estão alguns projetos desenvolvidos por mim.<br>Acesse o <a href="https://github.com/Leticinha007" target="_blank">meu GitHub</a> para ver mais.':
    'Here are some projects I have built.<br>Visit <a href="https://github.com/Leticinha007" target="_blank">my GitHub</a> to see more.',
  'Visitar': 'Visit',
  'Site institucional para um abrigo de cães com banco de dados de mais de 70 animais.': 'Institutional website for a dog shelter, with a database of more than 70 animals.',
  'Site de adoção para um abrigo de gatos com banco de dados dos animais, filtros por porte/idade/sexo, apadrinhamento e doações.': 'Adoption website for a cat shelter, with an animal database, filters by size/age/sex, sponsorship and donations.',
  'Encomenda de Artes': 'Art commissions',
  'Portfólio responsivo para artista visual com exibição imersiva de trabalhos, currículo criativo e integração com redes sociais.': 'Responsive portfolio for a visual artist, with an immersive showcase of works, a creative résumé and social media integration.',
  'Sistema Bancário': 'Banking System',
  'Gerenciador de Tarefas': 'Banking system',
  'Sistema bancário para gerenciamento de contas, transações e clientes. Projeto desenvolvido para praticar lógica de programação e estrutura de dados.': 'Banking system for managing accounts, transactions and customers. Built to practice programming logic and data structures.',
  'Haunted Mansion é um jogo 2D de sobrevivência/fuga desenvolvido em Python com a biblioteca Pygame, no qual o jogador precisa explorar uma mansão assombrada enquanto foge e sobrevive a fantasmas e monstros.': 'Haunted Mansion is a 2D survival/escape game built in Python with the Pygame library, in which the player explores a haunted mansion while fleeing from and surviving ghosts and monsters.',
  'Portifólio': 'Portfolio',
  'O presente site que desenvolvi para apresentar a mim e meus projetos.': 'This very website, which I built to present myself and my projects.',
  'Em breve...': 'Coming soon...',
  'Carregando': 'Loading',
  'Aprendizado constante!': 'Always learning!',
  'Em breve muitos outros projetos.': 'Many more projects coming soon.',
  'Ver mais no GitHub': 'See more on GitHub',

  // certificados
  'Certificações': 'Certifications',
  'Java Programação na Linguagem da Web': 'Java: Programming in the Language of the Web',
  'Desenvolvimento de APIs com Spring Framework': 'API Development with Spring Framework',
  'Integração de Sistemas com Bancos de Dados': 'Systems Integration with Databases',
  'Serviços Cloud com foco em IA': 'Cloud Services with a Focus on AI',
  'Python Avançado': 'Advanced Python',
  'Contribuindo em Open Source no GitHub': 'Contributing to Open Source on GitHub',
  'Manipulação de Strings e Estruturas de Dados': 'String Manipulation and Data Structures',
  'Criando API com FastAPI Python e Docker (TDD)': 'Building an API with FastAPI, Python and Docker (TDD)',
  'Sintaxe com Python': 'Python Syntax',
  'Trabalhando com Coleções em Python': 'Working with Collections in Python',
  'Programação Orientada a Objetos com Python': 'Object-Oriented Programming with Python',

  // ferramentas
  'Minha stack': 'My stack',
  'Ferramentas do dia a dia': 'Tools I work with',
  'Metodologias Ágeis': 'Agile Methodologies',
  'Pacote Office': 'Microsoft Office',

  // contato e rodapé
  'Fale comigo!': "Let's talk!",
  'Enviar e-mail': 'Send an email',
  'Fazer ligação': 'Call me',
  'Me chama no WhatsApp!': 'Message me on WhatsApp!',
  'Ícone.': 'Icon.',
  'Voltar ao topo': 'Back to top',
  '©2026 por Letícia Rebeka.<br>Todos os direitos reservados.': '©2026 by Letícia Rebeka.<br>All rights reserved.',
  'Letícia Rebeka // Portfólio': 'Letícia Rebeka // Portfolio',
};

const I18N_TEXT = 'nav .menu a, #home h1, #home .typing, #home .button, section h4, section h2, section h3, section p, #experience .badge, #experience .period, #experience .role, #certificates li, #knowledge .chip, footer p';
const I18N_ATTRS = ['title', 'alt', 'aria-label'];
const norm = s => s.replace(/\s+/g, ' ').replace(/\s*<br\s*\/?>\s*/g, '<br>').trim();
const attrKey = a => 'pt_' + a.replace('-', '_');

// guarda o português original de cada elemento
const textNodes = [...document.querySelectorAll(I18N_TEXT)];
textNodes.forEach(el => { el.dataset.pt = el.innerHTML; });

const attrNodes = [...document.querySelectorAll(I18N_ATTRS.map(a => `[${a}]`).join(','))]
  .filter(el => el.id !== 'lang-toggle');
attrNodes.forEach(el => {
  I18N_ATTRS.forEach(a => {
    if (el.hasAttribute(a)) el.dataset[attrKey(a)] = el.getAttribute(a);
  });
});
const ptTitle = document.title;

const langBtn = document.getElementById('lang-toggle');

function setLang(lang) {
  const en = lang === 'en';
  textNodes.forEach(el => {
    const tr = EN[norm(el.dataset.pt)];
    el.innerHTML = en && tr ? tr : el.dataset.pt;
  });
  attrNodes.forEach(el => {
    I18N_ATTRS.forEach(a => {
      const pt = el.dataset[attrKey(a)];
      if (pt === undefined) return;
      el.setAttribute(a, en && EN[pt] ? EN[pt] : pt);
    });
  });
  document.title = en && EN[ptTitle] ? EN[ptTitle] : ptTitle;
  document.documentElement.lang = en ? 'en' : 'pt-br';
  langBtn.textContent = en ? 'PT' : 'EN';
  langBtn.setAttribute('aria-label', en ? 'Mudar para português' : 'Switch to English');
  safeSet('lang', lang);
  restartTyping();
}

langBtn.addEventListener('click', () => {
  setLang(document.documentElement.lang === 'en' ? 'pt' : 'en');
});

setLang(safeGet('lang') === 'en' ? 'en' : 'pt');

// a largura do texto muda quando a fonte termina de carregar
if (document.fonts && typingEl) {
  document.fonts.ready.then(() => {
    typingEl.style.setProperty('--typing-w', typingEl.scrollWidth + 'px');
  });
}

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

sr.reveal('#experience header', { delay: 200 });
sr.reveal('#experience .job',  { delay: 200, interval: 150 });

sr.reveal('#projects header',   { delay: 200 });
sr.reveal('#projects .card',    { delay: 200, interval: 150 });
sr.reveal('#projects .button',  { delay: 200 });

sr.reveal('#certificates header', { delay: 200 });
sr.reveal('#certificates .card', { delay: 200, interval: 150 });

sr.reveal('#knowledge header',  { delay: 200 });
sr.reveal('#knowledge .chip',   { delay: 200, interval: 40 });

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
  // Cores por tema: no escuro um roxo vibrante; no claro um roxo mais
  // profundo e opaco para contrastar com o fundo claro
  const THEMES = {
    dark:  { dot: 'rgb(160,70,240)', glow: '160,70,240', glowA: 0.09, minA: 0 },
    light: { dot: 'rgb(98,20,180)',  glow: '98,20,180',  glowA: 0.12, minA: 0.35 },
  };
  function makeGlow(c) {
    const g = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.2);
    g.addColorStop(0, `rgba(${c.glow},0)`);
    g.addColorStop(1, `rgba(${c.glow},${c.glowA})`);
    return g;
  }
  const glows = { dark: makeGlow(THEMES.dark), light: makeGlow(THEMES.light) };

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
    const mode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    const theme = THEMES[mode];
    ctx.fillStyle = theme.dot;
    for (let b = 0; b < BUCKETS; b++) {
      const alpha = theme.minA + (1 - theme.minA) * (b + 0.5) / BUCKETS;
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
    ctx.fillStyle = glows[mode];
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2);
    ctx.fill();

    rotation += 0.007;
  }

  requestAnimationFrame(frame);
})();
