// ===== AGUARDA O CARREGAMENTO DA PÁGINA =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. MENU RESPONSIVO (HAMBURGUER) =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menuLinks = document.querySelector('.menu-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            menuLinks.classList.toggle('active');
            // Muda o ícone do botão
            mobileMenuBtn.textContent = menuLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Fecha o menu ao clicar em qualquer link
    document.querySelectorAll('.menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        });
    });

    // ===== 2. TEMA CLARO/ESCURO =====
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Verifica se já existe uma preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️ Claro';
    }
    
    // Alterna o tema ao clicar no botão
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        themeToggle.textContent = isDark ? '☀️ Claro' : '🌙 Escuro';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // ===== 3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO =====
    const formContato = document.getElementById('form-contato');
    const mensagemRetorno = document.getElementById('mensagem-retorno');
    
    if (formContato) {
        formContato.addEventListener('submit', function(event) {
            // Impede o envio tradicional do formulário
            event.preventDefault();
            
            // Pega os valores dos campos
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            let isValid = true;
            limparErros();
            
            // Validação do NOME
            if (nome === '') {
                mostrarErro('nome', 'O nome é obrigatório');
                isValid = false;
            } else if (nome.length < 3) {
                mostrarErro('nome', 'O nome deve ter pelo menos 3 caracteres');
                isValid = false;
            }
            
            // Validação do EMAIL
            if (email === '') {
                mostrarErro('email', 'O e-mail é obrigatório');
                isValid = false;
            } else if (!validarEmail(email)) {
                mostrarErro('email', 'Digite um e-mail válido (ex: usuario@dominio.com)');
                isValid = false;
            }
            
            // Validação da MENSAGEM
            if (mensagem === '') {
                mostrarErro('mensagem', 'A mensagem é obrigatória');
                isValid = false;
            } else if (mensagem.length < 10) {
                mostrarErro('mensagem', 'A mensagem deve ter pelo menos 10 caracteres');
                isValid = false;
            }
            
            // Se tudo estiver válido, simula o envio
            if (isValid) {
                simularEnvio();
            }
        });
    }
    
    // Função para validar formato do email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Função para mostrar mensagem de erro
    function mostrarErro(campoId, mensagem) {
        const campo = document.getElementById(campoId);
        const erroSpan = document.getElementById(`erro-${campoId}`);
        campo.classList.add('invalido');
        erroSpan.textContent = mensagem;
    }
    
    // Função para limpar erros anteriores
    function limparErros() {
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(campo => {
            campo.classList.remove('invalido');
        });
        document.querySelectorAll('.erro').forEach(erro => {
            erro.textContent = '';
        });
    }
    
    // Função que simula o envio do formulário
    function simularEnvio() {
        // Limpa os campos
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('mensagem').value = '';
        
        // Mostra mensagem de sucesso
        mensagemRetorno.textContent = '✅ Mensagem enviada com sucesso!';
        mensagemRetorno.className = 'mensagem-retorno sucesso';
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            mensagemRetorno.textContent = '';
            mensagemRetorno.className = 'mensagem-retorno';
        }, 5000);
    }

    // ===== 4. SCROLL SUAVE PARA AS ÂNCORAS =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const elemento = document.querySelector(href);
            if (elemento) {
                const menuHeight = document.querySelector('.menu').offsetHeight;
                window.scrollTo({
                    top: elemento.offsetTop - menuHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== 5. DESTACAR LINK ATIVO NO MENU =====
    function destacarLinkAtivo() {
        const scrollPos = window.scrollY;
        const menuHeight = document.querySelector('.menu').offsetHeight;
        
        document.querySelectorAll('.section').forEach(secao => {
            const top = secao.offsetTop - menuHeight - 10;
            const bottom = top + secao.offsetHeight;
            const id = secao.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < bottom) {
                document.querySelectorAll('.menu-links a').forEach(link => {
                    link.classList.remove('ativo');
                });
                const linkAtivo = document.querySelector(`.menu-links a[href="#${id}"]`);
                if (linkAtivo) linkAtivo.classList.add('ativo');
            }
        });
    }
    
    window.addEventListener('scroll', destacarLinkAtivo);
    destacarLinkAtivo();
});