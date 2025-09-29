// ANIMAÇÃO DOS PATROCINADORES
(function() {
    'use strict';
    
    console.log('🎯 Script dos patrocinadores carregado');
    
    let currentIndex = 0;
    let animationTimer;
    
    function initAnimation() {
        console.log('🚀 Iniciando animação...');
        
        const items = document.querySelectorAll('#sponsorAnimationCenter .sponsor-item');
        const dots = document.querySelectorAll('.sponsor-indicators .indicator');
        
        console.log(`Patrocinadores encontrados: ${items.length}`);
        console.log(`Indicadores encontrados: ${dots.length}`);
        
        if (items.length === 0) {
            console.log('❌ Nenhum patrocinador encontrado');
            return;
        }
        
        // Função para mostrar um patrocinador específico
        function showSponsor(index) {
            console.log(`📍 Mostrando patrocinador ${index + 1}`);
            
            // Esconde todos os itens
            items.forEach((item, i) => {
                if (i === index) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                    item.style.visibility = 'visible';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Atualiza indicadores
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Função para próximo patrocinador
        function nextSponsor() {
            currentIndex = (currentIndex + 1) % items.length;
            showSponsor(currentIndex);
        }
        
        // Inicia com o primeiro
        showSponsor(0);
        
        // Configura timer automático (2 segundos)
        animationTimer = setInterval(nextSponsor, 2000);
        
        // Cliques nos indicadores
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                console.log(`🖱️ Clicou no indicador ${index + 1}`);
                currentIndex = index;
                showSponsor(currentIndex);
                
                // Reinicia timer
                clearInterval(animationTimer);
                animationTimer = setInterval(nextSponsor, 2000);
            });
        });
        
        console.log('✅ Animação configurada com sucesso!');
    }
    
    // Aguarda página carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initAnimation, 500);
        });
    } else {
        setTimeout(initAnimation, 500);
    }
    
})();