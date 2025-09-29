// Sistema de Rádio Persistente - Rádio Santo Amaro FM
// Mantém a rádio tocando entre diferentes páginas do site

class GlobalRadioManager {
    constructor() {
        this.storageKey = 'radioSantoAmaroFM_state';
        this.broadcastChannel = null;
        this.setupBroadcastChannel();
        console.log('🎵 GlobalRadioManager inicializado');
    }
    
    setupBroadcastChannel() {
        // Usa BroadcastChannel para comunicação entre abas (se suportado)
        if ('BroadcastChannel' in window) {
            this.broadcastChannel = new BroadcastChannel('radioSantoAmaroFM');
            
            this.broadcastChannel.addEventListener('message', (event) => {
                console.log('📡 Mensagem recebida via BroadcastChannel:', event.data);
                
                if (event.data.type === 'state_change') {
                    this.handleStateChange(event.data.state);
                }
            });
            
            console.log('✅ BroadcastChannel configurado');
        } else {
            console.log('⚠️ BroadcastChannel não suportado, usando localStorage events');
        }
    }
    
    broadcastStateChange(state) {
        // Envia mudanças de estado para outras abas
        if (this.broadcastChannel) {
            this.broadcastChannel.postMessage({
                type: 'state_change',
                state: state,
                timestamp: Date.now()
            });
        }
        
        // Também salva no localStorage para compatibilidade
        this.saveToStorage(state);
    }
    
    saveToStorage(state) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify({
                ...state,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.error('❌ Erro ao salvar no localStorage:', error);
        }
    }
    
    loadFromStorage() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('❌ Erro ao carregar do localStorage:', error);
            return null;
        }
    }
    
    handleStateChange(state) {
        // Implementado pelas classes filhas
        console.log('🔄 Estado alterado:', state);
    }
    
    // Método utilitário para detectar se é a página principal
    isMainPage() {
        return window.location.pathname.includes('index.html') || 
               window.location.pathname === '/' || 
               window.location.pathname.endsWith('/');
    }
    
    // Método utilitário para atualizar UI
    updateUIElements(isPlaying) {
        // Atualiza ícones de play/pause
        const playIcons = document.querySelectorAll('.play-icon, .live-icon');
        const pauseIcons = document.querySelectorAll('.pause-icon');
        
        playIcons.forEach(icon => {
            icon.classList.toggle('d-none', isPlaying);
        });
        
        pauseIcons.forEach(icon => {
            icon.classList.toggle('d-none', !isPlaying);
        });
        
        // Atualiza textos
        const liveTexts = document.querySelectorAll('.live-text');
        liveTexts.forEach(text => {
            text.textContent = isPlaying ? 'PAUSAR' : 'AO VIVO';
        });
        
        // Atualiza ondas sonoras
        const waves = document.querySelectorAll('.wave, .sound-waves .wave');
        waves.forEach(wave => {
            wave.style.animationPlayState = isPlaying ? 'running' : 'paused';
        });
        
        // Atualiza status
        const statusElements = document.querySelectorAll('.status-text');
        statusElements.forEach(element => {
            element.textContent = isPlaying ? 'Status: Ao Vivo 🔴' : 'Status: Pronto para conectar';
        });
        
        console.log(`🎵 UI atualizada - ${isPlaying ? 'Tocando' : 'Pausado'}`);
    }
}

// Disponibiliza globalmente
window.GlobalRadioManager = GlobalRadioManager;

// Configurações globais
window.RADIO_CONFIG = {
    streamUrl: 'https://live.hunter.fm/sertanejo_normal',
    defaultVolume: 0.7,
    stationName: 'Rádio Santo Amaro FM',
    frequency: '102.5 FM'
};

console.log('📻 Sistema de rádio persistente carregado!');