

window.addEventListener('DOMContentLoaded', event => {

    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    navbarShrink();

    document.addEventListener('scroll', navbarShrink);

    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

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

    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });

            // Função específica para garantir visibilidade das seções da página de sorteio
            function ensureSorteioSectionsVisibility() {
                console.log('� Configurando seções da página de sorteio...');
                
                // Seções principais da página de sorteio
                const sorteioSections = [
                    'youtube-live',
                    'como-participar', 
                    'ganhadores',
                    'patrocinadores-sorteio',
                    'regras'
                ];
                
                sorteioSections.forEach(sectionId => {
                    const section = document.getElementById(sectionId);
                    if (section) {
                        section.style.opacity = '1';
                        section.style.transform = 'none';
                        section.style.display = 'block';
                        section.style.visibility = 'visible';
                        console.log(`✅ Seção ${sectionId} configurada`);
                    }
                });
                
                // Força visibilidade dos elementos específicos do sorteio
                const participationSteps = document.querySelectorAll('.participation-step');
                const sponsorCards = document.querySelectorAll('.sponsor-card-sorteio');
                const carouselItems = document.querySelectorAll('.carousel-item');
                const accordionItems = document.querySelectorAll('.accordion-item');
                
                // Configura elementos de participação
                participationSteps.forEach((step, index) => {
                    step.style.opacity = '1';
                    step.style.transform = 'none';
                    step.style.display = 'block';
                    step.style.visibility = 'visible';
                });
                
                // Configura cards de patrocinadores
                sponsorCards.forEach((card, index) => {
                    card.style.opacity = '1';
                    card.style.transform = 'none';
                    card.style.display = 'block';
                    card.style.visibility = 'visible';
                });
                
                // Configura itens do carrossel
                carouselItems.forEach((item, index) => {
                    item.style.opacity = '1';
                    item.style.transform = 'none';
                    item.style.display = 'block';
                    item.style.visibility = 'visible';
                });
                
                // Força visibilidade de elementos com AOS
                const aosElements = document.querySelectorAll('[data-aos]');
                aosElements.forEach(element => {
                    element.style.opacity = '1';
                    element.style.transform = 'none';
                    element.style.visibility = 'visible';
                });
                
                console.log(`🎯 ${participationSteps.length} passos de participação configurados`);
                console.log(`🤝 ${sponsorCards.length} cards de patrocinadores configurados`);
                console.log(`🏆 ${carouselItems.length} itens do carrossel configurados`);
                console.log(`📄 ${accordionItems.length} itens do acordeão configurados`);
            }

            // Executa a função após o AOS inicializar
            setTimeout(ensureSorteioSectionsVisibility, 500);
            
            // Executa também quando a janela carregar completamente
            window.addEventListener('load', () => {
                setTimeout(ensureSorteioSectionsVisibility, 1000);
            });

            // Executa quando o usuário rola para qualquer seção
            window.addEventListener('scroll', () => {
                const sections = ['youtube-live', 'como-participar', 'ganhadores', 'patrocinadores-sorteio', 'regras'];
                
                sections.forEach(sectionId => {
                    const section = document.getElementById(sectionId);
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        const windowHeight = window.innerHeight;
                        
                        // Se a seção estiver no viewport
                        if (rect.top <= windowHeight && rect.bottom >= 0) {
                            ensureSorteioSectionsVisibility();
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

             // Initialize AOS
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });

            // Global Variables for Audio Player
            let isPlaying = false;
            let isMuted = false;
            let radioAudio = null;
            
            // Audio Player Functions (simplified for this page)
            function togglePlay() {
                // Redirect to main page for full player functionality
                window.location.href = 'index.html';
            }

            // Smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
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

            // Carrossel automático dos ganhadores
            document.addEventListener('DOMContentLoaded', function() {
                const ganhadoresCarousel = document.getElementById('ganhadoresCarousel');
                const autoPlayToggle = document.getElementById('autoPlayToggle');
                
                if (ganhadoresCarousel) {
                    let isAutoPlaying = true;
                    
                    // Inicializar o carrossel do Bootstrap
                    const carousel = new bootstrap.Carousel(ganhadoresCarousel, {
                        interval: 4000, // Troca a cada 4 segundos
                        wrap: true,     // Loop infinito
                        touch: true,    // Permite navegação por toque em dispositivos móveis
                        pause: false    // Não pausar automaticamente no hover (controlamos manualmente)
                    });

                    // Controle manual do botão play/pause
                    if (autoPlayToggle) {
                        autoPlayToggle.addEventListener('click', function() {
                            if (isAutoPlaying) {
                                carousel.pause();
                                this.innerHTML = '<i class="fas fa-play"></i>';
                                this.title = 'Reproduzir automaticamente';
                                ganhadoresCarousel.classList.add('paused');
                                isAutoPlaying = false;
                            } else {
                                carousel.cycle();
                                this.innerHTML = '<i class="fas fa-pause"></i>';
                                this.title = 'Pausar reprodução automática';
                                ganhadoresCarousel.classList.remove('paused');
                                isAutoPlaying = true;
                            }
                        });
                    }

                    // Adicionar efeitos de transição suave
                    ganhadoresCarousel.addEventListener('slide.bs.carousel', function (e) {
                        // Adicionar classe para animação suave
                        const activeItem = e.target.querySelector('.carousel-item.active');
                        const nextItem = e.relatedTarget;
                        
                        if (activeItem) {
                            activeItem.style.transition = 'transform 0.8s ease-in-out';
                        }
                        if (nextItem) {
                            nextItem.style.transition = 'transform 0.8s ease-in-out';
                        }
                    });

                    // Pausar temporariamente ao passar o mouse (apenas se estiver em auto-play)
                    ganhadoresCarousel.addEventListener('mouseenter', function() {
                        if (isAutoPlaying) {
                            carousel.pause();
                        }
                    });
                    
                    ganhadoresCarousel.addEventListener('mouseleave', function() {
                        if (isAutoPlaying) {
                            carousel.cycle();
                        }
                    });

                    // Para dispositivos móveis - pausar temporariamente ao tocar
                    ganhadoresCarousel.addEventListener('touchstart', function() {
                        if (isAutoPlaying) {
                            carousel.pause();
                            setTimeout(function() {
                                if (isAutoPlaying) {
                                    carousel.cycle();
                                }
                            }, 6000); // Retoma após 6 segundos no mobile
                        }
                    });

                    // Indicador visual de reprodução/pausa
                    ganhadoresCarousel.addEventListener('slide.bs.carousel', function() {
                        // Adicionar efeito visual quando troca de slide
                        const progressBar = ganhadoresCarousel.querySelector('::after');
                        if (progressBar) {
                            progressBar.style.animation = 'none';
                            setTimeout(() => {
                                progressBar.style.animation = 'progressBar 4s linear';
                            }, 50);
                        }
                    });
                }
            });

            // Controle do player de rádio
            let radioIsPlaying = false;
            const radioPlayer = document.getElementById('radioPlayer');
            const liveBtn = document.getElementById('navLiveBtn');
            const liveIcon = liveBtn.querySelector('.live-icon');
            const liveText = liveBtn.querySelector('.live-text');

            function togglePlay() {
                if (radioIsPlaying) {
                    radioPlayer.pause();
                    radioPlayer.currentTime = 0;
                    radioIsPlaying = false;
                    liveIcon.className = 'fas fa-play me-1 live-icon';
                    liveText.textContent = 'AO VIVO';
                    liveBtn.classList.remove('playing');
                } else {
                    radioPlayer.play()
                        .then(() => {
                            radioIsPlaying = true;
                            liveIcon.className = 'fas fa-stop me-1 live-icon';
                            liveText.textContent = 'PARAR';
                            liveBtn.classList.add('playing');
                        })
                        .catch(error => {
                            console.error('Erro ao reproduzir a rádio:', error);
                            alert('Não foi possível conectar à rádio. Tente novamente.');
                        });
                }
            }

            // Lidar com erro de carregamento do áudio
            radioPlayer.addEventListener('error', function() {
                console.error('Erro ao carregar stream da rádio');
                radioIsPlaying = false;
                liveIcon.className = 'fas fa-play me-1 live-icon';
                liveText.textContent = 'AO VIVO';
                liveBtn.classList.remove('playing');
                alert('Erro ao conectar com a rádio. Verifique sua conexão.');
            });

            // Quando o áudio é pausado ou termina
            radioPlayer.addEventListener('ended', function() {
                radioIsPlaying = false;
                liveIcon.className = 'fas fa-play me-1 live-icon';
                liveText.textContent = 'AO VIVO';
                liveBtn.classList.remove('playing');
            });

             // Força a visibilidade das seções imediatamente
            document.addEventListener('DOMContentLoaded', function() {
                console.log('🎁 Forçando visibilidade das seções do sorteio...');
                
                // Seções principais do sorteio
                const sorteioSections = ['youtube-live', 'como-participar', 'ganhadores', 'patrocinadores-sorteio', 'regras'];
                
                sorteioSections.forEach(sectionId => {
                    const section = document.getElementById(sectionId);
                    if (section) {
                        section.style.visibility = 'visible';
                        section.style.opacity = '1';
                        
                        // Força todos os elementos filhos a serem visíveis
                        const allElements = section.querySelectorAll('*');
                        allElements.forEach(element => {
                            element.style.visibility = 'visible';
                            element.style.opacity = '1';
                        });
                        
                        console.log(`✅ Seção ${sectionId} forçada para ser visível`);
                    }
                });

                // Força visibilidade de elementos específicos
                const specificElements = [
                    '.participation-step',
                    '.sponsor-card-sorteio', 
                    '.carousel-item',
                    '.accordion-item',
                    '.youtube-container',
                    '[data-aos]'
                ];

                specificElements.forEach(selector => {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(element => {
                        element.style.visibility = 'visible';
                        element.style.opacity = '1';
                        element.style.transform = 'none';
                        element.style.position = 'relative';
                        element.style.textAlign = 'center';
                        element.style.margin = '0 auto';
                    });
                });

                // Força centralização das colunas Bootstrap
                const columns = document.querySelectorAll('.col-lg-4, .col-md-6, .col-lg-3');
                columns.forEach(col => {
                    col.style.justifyContent = 'center';
                    col.style.alignItems = 'center';
                });

                // Força exibição das seções que podem estar ocultas
                const hiddenElements = document.querySelectorAll('[style*="display: none"]');
                hiddenElements.forEach(element => {
                    element.style.visibility = 'visible';
                    element.style.opacity = '1';
                });
            });

            // Função adicional para garantir visibilidade durante o scroll
            function ensureAllSorteioSectionsVisibility() {
                const sections = ['youtube-live', 'como-participar', 'ganhadores', 'patrocinadores-sorteio', 'regras'];
                
                sections.forEach(sectionId => {
                    const section = document.getElementById(sectionId);
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        const windowHeight = window.innerHeight;
                        
                        // Se a seção estiver no viewport
                        if (rect.top <= windowHeight && rect.bottom >= 0) {
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
            window.addEventListener('scroll', ensureAllSorteioSectionsVisibility);
            
            // Executa também após um tempo para garantir
            setTimeout(ensureAllSorteioSectionsVisibility, 2000);

            // ========== ANIMAÇÃO SIMPLES DOS PATROCINADORES ==========
            let sponsorIndex = 0;
            let sponsorInterval;
            
            function startSponsorAnimation() {
                console.log('🎯 Iniciando animação dos patrocinadores...');
                
                const items = document.querySelectorAll('.sponsor-item');
                const indicators = document.querySelectorAll('.indicator');
                
                console.log(`Encontrados ${items.length} patrocinadores`);
                
                if (items.length === 0) {
                    console.log('❌ Nenhum patrocinador encontrado!');
                    return;
                }
                
                function showCurrentSponsor() {
                    // Esconde todos
                    items.forEach(item => {
                        item.style.display = 'none';
                    });
                    
                    indicators.forEach(indicator => {
                        indicator.classList.remove('active');
                    });
                    
                    // Mostra o atual
                    if (items[sponsorIndex]) {
                        items[sponsorIndex].style.display = 'block';
                        items[sponsorIndex].style.opacity = '1';
                        items[sponsorIndex].style.visibility = 'visible';
                        
                        console.log(`✅ Mostrando patrocinador ${sponsorIndex + 1}: ${items[sponsorIndex].querySelector('.sponsor-name').textContent}`);
                    }
                    
                    if (indicators[sponsorIndex]) {
                        indicators[sponsorIndex].classList.add('active');
                    }
                }
                
                function nextSponsor() {
                    sponsorIndex = (sponsorIndex + 1) % items.length;
                    showCurrentSponsor();
                }
                
                // Inicializa mostrando o primeiro
                showCurrentSponsor();
                
                // Configura intervalo
                sponsorInterval = setInterval(nextSponsor, 2000);
                
                // Adiciona cliques nos indicadores
                indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => {
                        sponsorIndex = index;
                        showCurrentSponsor();
                        
                        // Reinicia intervalo
                        clearInterval(sponsorInterval);
                        sponsorInterval = setInterval(nextSponsor, 2000);
                    });
                });
                
                console.log('✅ Animação iniciada com sucesso!');
            }
            
            // Aguarda a página carregar completamente
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(startSponsorAnimation, 1000);
                });
            } else {
                setTimeout(startSponsorAnimation, 1000);
            }
                
                // Inicializa o carrossel de ganhadores se existir
                const ganhadoresCarousel = document.getElementById('ganhadoresCarousel');
                if (ganhadoresCarousel) {
                    console.log('🎠 Inicializando carrossel de ganhadores...');
                    
                    const carousel = new bootstrap.Carousel(ganhadoresCarousel, {
                        interval: 5000,   // 5 segundos entre slides
                        pause: 'hover',   
                        wrap: true,       
                        touch: true       
                    });
                    
                    console.log('✅ Carrossel de ganhadores inicializado!');
                }
            });
