

// ====================================================
// 🎵 RÁDIO SANTO AMARO FM - SISTEMA PRINCIPAL
// ====================================================

// Variáveis globais do player
let isPlaying = false;
let isMuted = false;
let radioAudio = null;

// Inicialização principal quando DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎵 Iniciando sistema principal da Rádio Santo Amaro FM...');
    
    // 1. Configurar navegação e Bootstrap
    initNavigation();
    
    // 2. Inicializar AOS com configurações otimizadas
    initAOS();
    
    // 3. Configurar player de rádio
    initRadioPlayer();
    
    // 4. Garantir visibilidade das seções principais
    ensureMainSectionsVisibility();
    
    // 5. Configurar animações e contadores
    initAnimations();
    
    // 6. Configurar sistema de carregamento
    initRadioLoader();
    
    console.log('✅ Sistema principal inicializado com sucesso!');
});

// ====================================================
// CONFIGURAÇÃO DE NAVEGAÇÃO E BOOTSTRAP
// ====================================================
function initNavigation() {
    // Navbar shrink on scroll
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) return;
        
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    // ScrollSpy
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Responsive nav items
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link.smooth-scroll')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // SimpleLightbox
    if (typeof SimpleLightbox !== 'undefined') {
        new SimpleLightbox({
            elements: '#portfolio a.portfolio-box'
        });
    }

    // Smooth scrolling
    document.querySelectorAll('.smooth-scroll').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('✅ Navegação configurada');
}
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });

            // Função específica para garantir visibilidade das seções principais
            function ensureMainSectionsVisibility() {
                console.log('🎯 Configurando seções principais...');
                
                // Seção SOBRE
                const aboutSection = document.getElementById('sobre');
                const aboutContent = document.querySelector('.about-content');
                const aboutVisual = document.querySelector('.about-visual');
                const statItems = document.querySelectorAll('.stat-item');
                const featureItems = document.querySelectorAll('.feature-item');
                
                if (aboutSection) {
                    aboutSection.style.opacity = '1';
                    aboutSection.style.transform = 'none';
                    aboutSection.style.display = 'block';
                    aboutSection.style.visibility = 'visible';
                    console.log('✅ Seção sobre configurada');
                }
                
                // Força visibilidade dos elementos da seção sobre
                [aboutContent, aboutVisual, ...statItems, ...featureItems].forEach(element => {
                    if (element) {
                        element.style.opacity = '1';
                        element.style.transform = 'none';
                        element.style.display = 'block';
                        element.style.visibility = 'visible';
                    }
                });
                
                // Seção PROGRAMAÇÃO  
                const programmingSection = document.getElementById('programacao');
                const programmingCards = document.querySelectorAll('.program-card');
                const programmingTimeline = document.querySelector('.programming-timeline');
                
                if (programmingSection) {
                    // Remove qualquer configuração de AOS que possa estar impedindo a visualização
                    programmingSection.style.opacity = '1';
                    programmingSection.style.transform = 'none';
                    programmingSection.style.display = 'block';
                    programmingSection.style.visibility = 'visible';
                    
                    console.log('✅ Seção programação configurada');
                }
                
                if (programmingTimeline) {
                    programmingTimeline.style.opacity = '1';
                    programmingTimeline.style.transform = 'none';
                    programmingTimeline.style.display = 'block';
                }
                
                // Garante que todos os cards sejam visíveis
                programmingCards.forEach((card, index) => {
                    card.style.opacity = '1';
                    card.style.transform = 'none';
                    card.style.display = 'block';
                    card.style.visibility = 'visible';
                    
                    // Remove atributos data-aos temporariamente se necessário
                    const aosAttr = card.getAttribute('data-aos');
                    if (aosAttr) {
                        card.setAttribute('data-aos-backup', aosAttr);
                        card.removeAttribute('data-aos');
                        
                        // Reaplica depois de um tempo
                        setTimeout(() => {
                            card.setAttribute('data-aos', card.getAttribute('data-aos-backup'));
                            card.removeAttribute('data-aos-backup');
                        }, 1000);
                    }
                });
                
                console.log(`📋 ${programmingCards.length} cards de programação configurados`);
                console.log(`📊 ${statItems.length} itens de estatística configurados`);
                console.log(`🎯 ${featureItems.length} itens de recursos configurados`);
            }

            // Executa a função após o AOS inicializar
            setTimeout(ensureMainSectionsVisibility, 500);
            
            // Executa também quando a janela carregar completamente
            window.addEventListener('load', () => {
                setTimeout(ensureMainSectionsVisibility, 1000);
            });

            // Executa quando o usuário rola para qualquer seção
            window.addEventListener('scroll', () => {
                const sections = ['sobre', 'programacao'];
                
                sections.forEach(sectionId => {
                    const section = document.getElementById(sectionId);
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        const windowHeight = window.innerHeight;
                        
                        // Se a seção estiver no viewport
                        if (rect.top <= windowHeight && rect.bottom >= 0) {
                            ensureMainSectionsVisibility();
                        }
                    }
                });
            });
            
            // Função para garantir que a seção programação apareça
            function showProgrammingSection() {
                console.log('🎯 Verificando seção de programação...');
                
                const programmingSection = document.getElementById('programacao');
                const programmingCards = document.querySelectorAll('.program-card');
                
                if (programmingSection) {
                    // Força a visibilidade da seção
                    programmingSection.style.display = 'block';
                    programmingSection.style.visibility = 'visible';
                    programmingSection.style.opacity = '1';
                    
                    console.log('✅ Seção programação configurada para aparecer');
                } else {
                    console.warn('⚠️ Seção programação não encontrada');
                }
                
                // Força a visibilidade dos cards de programação
                programmingCards.forEach((card, index) => {
                    card.style.display = 'block';
                    card.style.visibility = 'visible';
                    card.style.opacity = '1';
                    card.style.transform = 'none';
                });
                
                console.log(`📋 ${programmingCards.length} cards de programação configurados`);
            }
            
            // Executa após o AOS inicializar
            setTimeout(showProgrammingSection, 500);
            
            // Executa também no load da janela
            window.addEventListener('load', () => {
                setTimeout(showProgrammingSection, 1000);
            });

            let isPlaying = false;
            let isMuted = false;
            let radioAudio = null;
            
            document.addEventListener('DOMContentLoaded', function() {
                console.log('🎵 Inicializando player da rádio...');
                
                radioAudio = document.getElementById('radioStream');
                if (!radioAudio) {
                    console.error('❌ Elemento de áudio não encontrado!');
                    return;
                }
                
                radioAudio.volume = 0.7;
                console.log('✅ Volume inicial definido: 70%');
                
                radioAudio.addEventListener('canplay', function() {
                    updateStatus('Pronto para reproduzir', 'text-success');
                });
                
                radioAudio.addEventListener('playing', function() {
                    updateStatus('🎵 Ao vivo - Santo Amaro FM', 'text-success');
                });
                
                radioAudio.addEventListener('pause', function() {
                    updateStatus('Pausado', 'text-muted');
                });
                
                radioAudio.addEventListener('error', function() {
                    updateStatus('Erro na conexão', 'text-danger');
                    resetPlayer();
                });
                
                radioAudio.addEventListener('waiting', function() {
                    updateStatus('Carregando...', 'text-warning');
                });
                
                console.log('✅ Player inicializado com sucesso!');
            });
            
            function togglePlay() {
                console.log('🎵 togglePlay chamado, isPlaying:', isPlaying);
                
                if (!radioAudio) {
                    console.error('❌ Áudio não disponível');
                    alert('Erro: Player não inicializado');
                    return;
                }
                
                if (!isPlaying) {
                    startPlayback();
                } else {
                    stopPlayback();
                }
            }
            
            function startPlayback() {
                console.log('▶️ Iniciando reprodução...');
                updateStatus('Conectando...', 'text-warning');
                
                radioAudio.load();
                radioAudio.play().then(() => {
                    console.log('✅ Reprodução iniciada com sucesso');
                    isPlaying = true;
                    updatePlayerUI();
                    updateAllButtons();
                }).catch(error => {
                    console.error('❌ Erro na reprodução:', error);
                    updateStatus('Erro: Clique novamente', 'text-danger');
                    alert('Erro ao conectar com a rádio. Tente novamente.');
                });
            }
            
            function stopPlayback() {
                console.log('⏹️ Parando reprodução...');
                radioAudio.pause();
                isPlaying = false;
                updatePlayerUI();
                updateAllButtons();
                updateStatus('Pausado', 'text-muted');
            }
            
            function updatePlayerUI() {
                const playIcon = document.querySelector('.play-icon');
                const pauseIcon = document.querySelector('.pause-icon');
                const waves = document.querySelectorAll('.wave');
                const songTitle = document.querySelector('.song-title');
                
                if (isPlaying) {
                    if (playIcon) playIcon.classList.add('d-none');
                    if (pauseIcon) pauseIcon.classList.remove('d-none');
                    waves.forEach(wave => wave.classList.add('active'));
                    if (songTitle) songTitle.textContent = '🎵 Ouvindo ao vivo';
                } else {
                    if (playIcon) playIcon.classList.remove('d-none');
                    if (pauseIcon) pauseIcon.classList.add('d-none');
                    waves.forEach(wave => wave.classList.remove('active'));
                    if (songTitle) songTitle.textContent = 'Clique para ouvir ao vivo';
                }
            }
            
            function updateAllButtons() {
                const liveIcon = document.querySelector('.live-icon');
                const liveText = document.querySelector('.live-text');
                
                if (liveIcon && liveText) {
                    if (isPlaying) {
                        liveIcon.className = 'fas fa-pause me-1 live-icon';
                        liveText.textContent = 'PAUSAR';
                    } else {
                        liveIcon.className = 'fas fa-play me-1 live-icon';
                        liveText.textContent = 'AO VIVO';
                    }
                }
                
                const onlineBtn = document.getElementById('onlinePlayBtn');
                if (onlineBtn) {
                    if (isPlaying) {
                        onlineBtn.innerHTML = '<i class="fas fa-pause me-2"></i>Pausar Stream';
                    } else {
                        onlineBtn.innerHTML = '<i class="fas fa-play me-2"></i>Ouvir Online';
                    }
                }
            }
            
            function changeVolume(value) {
                if (!radioAudio) return;
                
                radioAudio.volume = value / 100;
                
                const volumeIcon = document.querySelector('.volume-icon');
                if (volumeIcon) {
                    if (value == 0) {
                        volumeIcon.className = 'fas fa-volume-mute volume-icon';
                    } else if (value < 50) {
                        volumeIcon.className = 'fas fa-volume-down volume-icon';
                    } else {
                        volumeIcon.className = 'fas fa-volume-up volume-icon';
                    }
                }
                console.log('🔊 Volume alterado para:', value + '%');
            }
            
            function toggleMute() {
                if (!radioAudio) return;
                
                const volumeSlider = document.querySelector('.volume-slider');
                const volumeIcon = document.querySelector('.volume-icon');
                
                if (!isMuted) {
                    radioAudio.muted = true;
                    isMuted = true;
                    if (volumeIcon) volumeIcon.className = 'fas fa-volume-mute volume-icon';
                    console.log('🔇 Áudio mutado');
                } else {
                    radioAudio.muted = false;
                    isMuted = false;
                    if (volumeSlider) changeVolume(volumeSlider.value);
                    console.log('🔊 Áudio desmutado');
                }
            }
            
            function resetPlayer() {
                isPlaying = false;
                updatePlayerUI();
                updateAllButtons();
            }
            
            function updateStatus(message, className) {
                const statusText = document.querySelector('.status-text');
                if (statusText) {
                    statusText.textContent = `Status: ${message}`;
                    statusText.className = `status-text ${className}`;
                }
            }
            
            // Make functions globally available
            window.togglePlay = togglePlay;
            window.changeVolume = changeVolume;
            window.toggleMute = toggleMute;
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('.smooth-scroll').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
            
            // Navbar background on scroll
            window.addEventListener('scroll', function() {
                const navbar = document.getElementById('mainNav');
                if (window.scrollY > 100) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            });
            
            function animateCounters() {
                const counters = document.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = counter.textContent;
                    const numericTarget = parseInt(target.replace(/\D/g, ''));
                    let current = 0;
                    const increment = numericTarget / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericTarget) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
                        }
                    }, 30);
                });
            }
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            const statsSection = document.querySelector('.stats-grid');
            if (statsSection) {
                observer.observe(statsSection);
            }
            const featureData = {
                locutores: {
                    title: "Locutores Experientes",
                    icon: "fas fa-microphone-alt",
                    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop&crop=center",
                    description: "Nossa equipe é formada por profissionais apaixonados pelo rádio, com mais de 10 anos de experiência cada um. Locutores que conhecem a comunidade e sabem exatamente o que nossos ouvintes querem escutar.",
                    features: [
                        { icon: "fas fa-star", text: "Mais de 10 anos de experiência" },
                        { icon: "fas fa-heart", text: "Paixão genuína pelo rádio" },
                        { icon: "fas fa-users", text: "Conhecimento da comunidade local" },
                        { icon: "fas fa-clock", text: "Disponíveis 24/7" }
                    ]
                },
                musica: {
                    title: "Música Diversificada",
                    icon: "fas fa-music",
                    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center",
                    description: "Do sertanejo ao pop internacional, do rock clássico às novidades do momento. Nossa programação musical é cuidadosamente selecionada para agradar todos os gostos e idades, 24 horas por dia.",
                    features: [
                        { icon: "fas fa-guitar", text: "Sertanejo e música brasileira" },
                        { icon: "fas fa-globe", text: "Sucessos internacionais" },
                        { icon: "fas fa-fire", text: "Hits do momento" },
                        { icon: "fas fa-history", text: "Clássicos atemporais" }
                    ]
                },
                noticias: {
                    title: "Notícias Locais",
                    icon: "fas fa-newspaper",
                    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop&crop=center",
                    description: "Mantenha-se sempre informado sobre o que acontece em Santo Amaro e região. Nossa equipe de jornalismo traz notícias precisas, clima do tempo e informações que impactam seu dia a dia.",
                    features: [
                        { icon: "fas fa-map-marker-alt", text: "Notícias de Santo Amaro e região" },
                        { icon: "fas fa-cloud-sun", text: "Previsão do tempo atualizada" },
                        { icon: "fas fa-car", text: "Informações de trânsito" },
                        { icon: "fas fa-bullhorn", text: "Avisos da comunidade" }
                    ]
                },
                comunidade: {
                    title: "Conexão Comunitária",
                    icon: "fas fa-heart",
                    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop&crop=center",
                    description: "Somos mais que uma rádio - somos parte da família de Santo Amaro. Promovemos eventos, apoiamos causas sociais e criamos pontes entre as pessoas da nossa comunidade.",
                    features: [
                        { icon: "fas fa-hands-helping", text: "Apoio a causas sociais" },
                        { icon: "fas fa-calendar-check", text: "Eventos comunitários" },
                        { icon: "fas fa-phone", text: "Participação dos ouvintes" },
                        { icon: "fas fa-gift", text: "Sorteios e promoções" }
                    ]
                }
            };

            function showFeatureModal(featureKey) {
                const feature = featureData[featureKey];
                if (!feature) return;

                // Update modal content
                document.getElementById('modalIcon').className = feature.icon + ' me-2';
                document.getElementById('modalTitle').textContent = feature.title;
                document.getElementById('modalImage').src = feature.image;
                document.getElementById('modalImage').alt = feature.title;
                document.getElementById('modalDescription').textContent = feature.description;

                // Update features list
                const featuresContainer = document.getElementById('modalFeatures');
                featuresContainer.innerHTML = '';
                feature.features.forEach(item => {
                    const featureElement = document.createElement('div');
                    featureElement.className = 'highlight-item';
                    featureElement.innerHTML = `
                        <i class="${item.icon}"></i>
                        <span>${item.text}</span>
                    `;
                    featuresContainer.appendChild(featureElement);
                });

                // Show modal
                const modal = new bootstrap.Modal(document.getElementById('featureModal'));
                modal.show();
            }

            function scrollToContact() {
                // Close modal first
                const modal = bootstrap.Modal.getInstance(document.getElementById('featureModal'));
                if (modal) modal.hide();
                
                // Scroll to contact section
                setTimeout(() => {
                    document.getElementById('contact').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }

            // Make functions globally available
            window.showFeatureModal = showFeatureModal;
            window.scrollToContact = scrollToContact;

             // Força a visibilidade das seções principais imediatamente
            document.addEventListener('DOMContentLoaded', function() {
                console.log('🎵 Forçando visibilidade das seções principais...');
                
                // Seção de Programação
                const programmingSection = document.getElementById('programacao');
                if (programmingSection) {
                    programmingSection.style.display = 'block';
                    programmingSection.style.visibility = 'visible';
                    programmingSection.style.opacity = '1';
                    
                    // Força todos os elementos filhos a serem visíveis
                    const programmingElements = programmingSection.querySelectorAll('*');
                    programmingElements.forEach(element => {
                        element.style.visibility = 'visible';
                        element.style.opacity = '1';
                    });
                    
                    console.log('✅ Seção de programação forçada para ser visível');
                }

                // Seção Sobre
                const aboutSection = document.getElementById('sobre');
                if (aboutSection) {
                    aboutSection.style.display = 'block';
                    aboutSection.style.visibility = 'visible';
                    aboutSection.style.opacity = '1';
                    
                    // Força todos os elementos filhos a serem visíveis
                    const aboutElements = aboutSection.querySelectorAll('*');
                    aboutElements.forEach(element => {
                        element.style.visibility = 'visible';
                        element.style.opacity = '1';
                    });

                    // Força especialmente os elementos com animações
                    const statsItems = aboutSection.querySelectorAll('.stat-item');
                    const featureItems = aboutSection.querySelectorAll('.feature-item');
                    
                    [...statsItems, ...featureItems].forEach(element => {
                        element.style.display = 'block';
                        element.style.visibility = 'visible';
                        element.style.opacity = '1';
                        element.style.transform = 'none';
                    });
                    
                    console.log('✅ Seção sobre forçada para ser visível');
                }
            });

            // Função adicional para garantir visibilidade durante o scroll
            function ensureAllSectionsVisibility() {
                const sections = ['sobre', 'programacao'];
                
                sections.forEach(sectionId => {
                    const section = document.getElementById(sectionId);
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        const windowHeight = window.innerHeight;
                        
                        // Se a seção estiver no viewport
                        if (rect.top <= windowHeight && rect.bottom >= 0) {
                            section.style.display = 'block';
                            section.style.visibility = 'visible';
                            section.style.opacity = '1';
                            
                            // Remove atributos AOS temporariamente se necessário
                            const elementsWithAOS = section.querySelectorAll('[data-aos]');
                            elementsWithAOS.forEach(element => {
                                element.style.opacity = '1';
                                element.style.transform = 'none';
                            });
                        }
                    }
                });
            }

            // Executa a verificação no scroll
            window.addEventListener('scroll', ensureAllSectionsVisibility);
            
            // Executa também após um tempo para garantir
            setTimeout(ensureAllSectionsVisibility, 2000);
        </script>
        
        <!-- Script para envio por email -->
        <script>
            function enviarPorEmail() {
                // Coletando os dados do formulário
                const nome = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const telefone = document.getElementById('phone').value;
                const assunto = document.getElementById('subject').value;
                const mensagem = document.getElementById('message').value;
                
                // Validação básica
                if (!nome || !email || !telefone || !assunto || !mensagem) {
                    alert('❌ Por favor, preencha todos os campos obrigatórios!');
                    return;
                }
                
                // Validação de email
                if (!email.includes('@')) {
                    alert('❌ Por favor, digite um email válido!');
                    return;
                }
                
                // Convertendo o assunto para texto legível
                let assuntoTexto = '';
                switch(assunto) {
                    case 'participacao': assuntoTexto = 'Participar da Programação'; break;
                    case 'patrocinio': assuntoTexto = 'Patrocínio/Publicidade'; break;
                    case 'sugestao': assuntoTexto = 'Sugestão Musical'; break;
                    case 'reclamacao': assuntoTexto = 'Reclamação'; break;
                    case 'outros': assuntoTexto = 'Outros'; break;
                    default: assuntoTexto = assunto;
                }
                
                // Montando o corpo do email
                const corpoEmail = `🎵 CONTATO - RÁDIO SANTO AMARO FM 102.5

📝 DADOS DO CONTATO:
👤 Nome: ${nome}
📧 E-mail: ${email}
📱 Telefone/WhatsApp: ${telefone}
🎯 Assunto: ${assuntoTexto}

💬 MENSAGEM:
${mensagem}

---
Enviado através do site da Rádio Santo Amaro FM
Data: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`;
                
                // Email da rádio (COLOQUE SEU EMAIL AQUI)
                const emailRadio = 'seu-email@gmail.com';
                
                // Criando o link mailto
                const mailtoLink = `mailto:${emailRadio}?subject=${encodeURIComponent('🎵 Contato Site - ' + assuntoTexto)}&body=${encodeURIComponent(corpoEmail)}`;
                
                // Abrindo o cliente de email
                window.location.href = mailtoLink;
                
                // Feedback ao usuário
                setTimeout(() => {
                    alert('✅ Seu cliente de email foi aberto!\n\nRevise os dados e clique em ENVIAR no seu programa de email.');
                    
                    // Limpar o formulário após envio
                    document.getElementById('contactForm').reset();
                }, 1000);
            }

         // Controle da animação de carregamento da rádio
            class RadioLoader {
                constructor() {
                    this.frequencies = [88.0, 91.5, 94.2, 97.8, 101.3, 102.5];
                    this.messages = [
                        'Sintonizando...',
                        'Conectando antena...',
                        'Ajustando frequência...',
                        'Eliminando ruídos...',
                        'Quase lá...',
                        'Conectado! 🎵'
                    ];
                    this.currentStep = 0;
                    this.init();
                }
                
                init() {
                    console.log('🎵 Iniciando animação de carregamento da rádio...');
                    this.startLoading();
                }
                
                startLoading() {
                    const frequencyElement = document.getElementById('loadingFrequency');
                    const messageElement = document.getElementById('loadingMessage');
                    
                    // Anima a mudança de frequência e mensagens
                    const interval = setInterval(() => {
                        if (this.currentStep < this.frequencies.length) {
                            // Atualiza frequência
                            if (frequencyElement) {
                                frequencyElement.textContent = this.frequencies[this.currentStep].toFixed(1);
                            }
                            
                            // Atualiza mensagem
                            if (messageElement) {
                                messageElement.textContent = this.messages[this.currentStep];
                            }
                            
                            this.currentStep++;
                        } else {
                            clearInterval(interval);
                            // Finaliza o carregamento após a última mensagem
                            setTimeout(() => {
                                this.hideLoader();
                            }, 1000);
                        }
                    }, 500);
                }
                
                hideLoader() {
                    const loader = document.getElementById('radioLoader');
                    if (loader) {
                        console.log('✅ Ocultando tela de carregamento...');
                        loader.classList.add('fade-out');
                        
                        // Remove o elemento após a animação
                        setTimeout(() => {
                            loader.style.display = 'none';
                            document.body.style.overflow = 'auto';
                        }, 500);
                    }
                }
            }
            
            // Inicialização quando a página carregar
            document.addEventListener('DOMContentLoaded', function() {
                // Esconde o scroll durante o carregamento
                document.body.style.overflow = 'hidden';
                
                // Simula um tempo mínimo de carregamento para mostrar a animação
                const minLoadingTime = 3000; // 3 segundos mínimo
                const startTime = Date.now();
                
                // Inicia a animação
                new RadioLoader();
                
                // Aguarda o carregamento completo da página
                window.addEventListener('load', function() {
                    const loadTime = Date.now() - startTime;
                    const remainingTime = Math.max(0, minLoadingTime - loadTime);
                    
                    console.log(`🎵 Página carregada em ${loadTime}ms, aguardando mais ${remainingTime}ms...`);
                });
            });
            
            // Função para mostrar o loader quando necessário (ex: navegação)
            function showRadioLoader() {
                const loader = document.getElementById('radioLoader');
                if (loader) {
                    loader.style.display = 'flex';
                    loader.classList.remove('fade-out');
                    document.body.style.overflow = 'hidden';
                    new RadioLoader();
                }
            }
            
            // Escuta mudanças de hash na URL para reativar o loader se necessário
            window.addEventListener('hashchange', function() {
                // Opcional: reativar loader em mudanças de seção
                // showRadioLoader();
            });
            
            console.log('🎵 Sistema de carregamento da rádio inicializado!');    